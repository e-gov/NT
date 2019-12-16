import { GenericMessageHandler, Payload, Message, message, addHandlerClass, ErrorPayload } from "../Base";
import { ServiceProviderState, ServiceProviderPS, ServiceProviderIS, SecretRecord, ServiceRequest, requestTypeName, RequestState, ServiceConfig } from "./types";
import { addServiceDeclaration } from "../consentService/declarationAPI";
import { validateConsentReference, ValidationResponse, ValidationResponseTypeName } from "../consentService/validationAPI";
import { reportServiceUse } from "../consentService/reportingAPI";
import { submitResponse } from "../client/messages";
import { hash, address2org } from "../../util";
import { UsageRecord } from "../consentService/types";

interface DataPayload extends Payload {
  type: typeof DataEntryHandler.name;
  key: string;
  datatype?: string;
  subject?: string;
  data?: any;
}

class DataEntryHandler extends GenericMessageHandler<ServiceProviderState, ServiceProviderPS, DataPayload, DataEntryHandler> {
  name = "ServiceProvider/UI/addData";

  handle(spis: ServiceProviderPS, action: Message<DataPayload>): ServiceProviderPS {
    if (action.message.datatype === undefined || action.message.datatype === "") {
      return { ...spis, mem: { ...spis.mem, db: spis.mem.db.filter(r => (r.key !== action.message.key)) } };
    }

    let rec = action.message;
    let dbrec: SecretRecord = { key: rec.key, type: rec.datatype!, subject: rec.subject!, data: rec.data! };

    return { ...spis, mem: { ...spis.mem, db: spis.mem.db.concat(dbrec) } }
  }
}

export const addData = addHandlerClass<DataPayload, DataEntryHandler>(ServiceProviderIS, DataEntryHandler);

class SendDeclarationHandler extends GenericMessageHandler<ServiceProviderState, ServiceProviderPS, Payload, SendDeclarationHandler> {
  name = "ServiceProvider/UI/declareService";

  handle(spis: ServiceProviderPS, action: Message<Payload>): ServiceProviderPS {
    // FIXME: korrektne CS väärtus
    return this.send(spis, message(action.arena, spis, [spis.mem.services[0].consentService], addServiceDeclaration()(action.message)))
  }
}

export const declareService = addHandlerClass(ServiceProviderIS, SendDeclarationHandler);

function requestId(req: ServiceRequest, service: ServiceConfig): string {
  let input = req.clientId + req.consentReference + req.requestReference +
    req.serviceName + req.subjectId + service.consentService;

  return hash(input);
}

class ProtectedRequestHandler extends GenericMessageHandler<ServiceProviderState, ServiceProviderPS, ServiceRequest, ProtectedRequestHandler> {
  name = requestTypeName;
  handle(spis: ServiceProviderPS, action: Message<ServiceRequest>): ServiceProviderPS {

    function _send<P extends Payload>(receivers: string[], m: P): Message<P> {
      return message(action.arena, spis, receivers, m);
    }

    let req: ServiceRequest = action.message;
    // validate request (find service record from config)
    let service = spis.mem.services.find(s => s.serviceName === req.serviceName);
    if (service === undefined) {
      // no reporting -- "the request did not reach the relevant endpoint"
      return this.withErrorResponse(spis, action, "invalid_request");
    }

    if (req.clientId !== address2org(action.sender)) {
      // FIXME: here we COULD report something?
      return this.withErrorResponse(spis, action, "invalid_request");
    }

    if (!req.consentReference) {
      const report: UsageRecord = {
        result: "ACCESS_DENIED",
        clientId: req.clientId,
        subjectId: req.subjectId,
        serviceDeclarationIds: service.requiredServiceDeclarationIds,
        requestReference: req.requestReference,
        serviceProviderId: address2org(spis.name),
        usageTime: new Date(action.now! * 1000).toISOString(),
      }
      return this.send(
        this.send(
          spis,
          _send([service.consentService], reportServiceUse()(report))
        ),
        _send<ErrorPayload>([action.sender], { type: "error", error: "ACCESS_DENIED" })
      )
    }

    // store inflight query
    // spis.mem.inflight += [inflight]
    let reqState: RequestState = {
      ...req,
      validationRequestId: requestId(req, service),
      clientAddress: action.sender,
    }
    let withInfligh: ServiceProviderPS = {
      ...spis, mem: { ...spis.mem, inflight: spis.mem.inflight.concat(reqState) }
    };

    // send consent reference validation request
    return this.send(
      withInfligh,
      message(
        action.arena,
        withInfligh,
        [service.consentService],
        validateConsentReference()({
          asyncId: reqState.validationRequestId,
          partyId: spis.name,
          consentReference: req.consentReference,
          requestReference: req.requestReference,
        })
      )
    );
  }
}

export const submitRequest = addHandlerClass<ServiceRequest, ProtectedRequestHandler>(ServiceProviderIS, ProtectedRequestHandler);


class ValidationResponseHandler extends GenericMessageHandler<ServiceProviderState, ServiceProviderPS, ValidationResponse, ValidationResponseHandler> {
  name = ValidationResponseTypeName;

  handle(spis: ServiceProviderPS, action: Message<ValidationResponse>): ServiceProviderPS {

    function _send<P extends Payload>(receivers: string[], m: P): Message<P> {
      return message(action.arena, spis, receivers, m);
    }

    const reqState = spis.mem.inflight.find(ifr => ifr.validationRequestId === action.message.asyncId);
    const resp = action.message;

    function removeInflight(spis: ServiceProviderPS): ServiceProviderPS {
      return {
        ...spis, mem: {
          ...spis.mem, inflight: spis.mem.inflight.filter(
            ifr => (reqState === undefined || ifr.requestReference !== reqState.requestReference)
          )
        }
      };
    }


    if (reqState === undefined) {
      console.error("Failed to find original inflight request, ignoring the response.");
      return spis;
    }

    const service = spis.mem.services.find(s => s.serviceName === reqState.serviceName);
    if (service === undefined) {
      console.error("Failed to find the service specified in the original inflight request, ignoring the response.");
      return removeInflight(spis);
    }

    const usageReport: UsageRecord = {
      result: "OK", // will be overwritten
      clientId: reqState.clientId,
      subjectId: reqState.subjectId,
      serviceDeclarationIds: service.requiredServiceDeclarationIds,
      consentReference: reqState.consentReference,
      requestReference: reqState.requestReference,
      serviceProviderId: address2org(spis.name),
      usageTime: new Date(action.now! * 1000).toISOString(),
    }

    if (!resp.valid
      || resp.clientId !== reqState.clientId
      || resp.consentReference !== reqState.consentReference
      || resp.dataSubjectId !== reqState.subjectId
      || resp.serviceDeclarationId === undefined
      // (there is a required serviceDeclarationId that is not on the consent)
      || service.requiredServiceDeclarationIds
        .find(sd => !resp.serviceDeclarationId!.includes(sd))
    ) {
      return this.send(
        this.send(
          removeInflight(spis),
          _send([service.consentService], reportServiceUse()({ ...usageReport, result: "ACCESS_DENIED" }))
        ),
        _send<ErrorPayload>([reqState.clientAddress], { type: "error", error: "ACCESS_DENIED" })
      )
    };

    return this.send(
      this.send(
        removeInflight(spis),
        _send([service.consentService], reportServiceUse()({ ...usageReport, result: "OK" }))
      ),
      _send(
        [reqState.clientAddress],
        submitResponse()({
          records: spis.mem.db
            .filter(x => x.subject === reqState.subjectId)
            .filter(x => service.returnedDatatypes.includes(x.type)),
          asyncId: reqState.requestReference
        })
      )
    );
  }
}

export const validationResponse = addHandlerClass<ValidationResponse, ValidationResponseHandler>(ServiceProviderIS, ValidationResponseHandler);
