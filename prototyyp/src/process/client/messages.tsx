import { addHandlerClass, Payload, GenericMessageHandler, Message, message, ErrorPayload, updateDb } from "../Base";
import { ClientIS, ClientState, ClientPS } from "./types";

import { addPurposeDeclaration } from "../consentService/declarationAPI";
import { getConsentReference, ConsentReferenceResponse, ConsentReferenceResponseTypeName } from "../consentService/referenceAPI";

import { submitRequest } from "../serviceProvider/messages";
import { ServiceResponse, responseTypeName } from "../serviceProvider/types";

import { hash, address2org } from "../../util";
import { validateConsentReference } from "../consentService/validationAPI";


interface LoginMessage extends Payload {
  type: typeof LoginMessageHandler.name;
  user?: string;
}

class LoginMessageHandler extends GenericMessageHandler<ClientState, ClientPS, LoginMessage, LoginMessageHandler> {
  name = "Client/UI/login";

  handle(cs: ClientPS, action: Message<LoginMessage>): ClientPS {
    // reset cached responses when logging in.
    return { ...cs, mem: { ...cs.mem, ui: { ...cs.mem.ui, user: action.message.user, service: undefined, response: [] } } };
  }
}

export const loginMessage = addHandlerClass<LoginMessage, LoginMessageHandler>(ClientIS, LoginMessageHandler);

interface SelectServiceMessage extends Payload {
  type: typeof SelectServiceMessageHandler.name;
  service?: string;
}

class SelectServiceMessageHandler extends GenericMessageHandler<ClientState, ClientPS, SelectServiceMessage, SelectServiceMessageHandler> {
  name = "Client/UI/selectService";

  handle(cs: ClientPS, action: Message<SelectServiceMessage>): ClientPS {
    let _cs = { ...cs, mem: { ...cs.mem, ui: { ...cs.mem.ui, service: action.message.service, response: [] } } };

    if (_cs.mem.ui.service !== undefined) {
      // if cached consentref is missing (not asked or known to not exist), ask automatically for new
      let cachedConsentRefs = _cs.mem.db.consentRefByUser[_cs.mem.ui.user!];
      let cachedConsentRef = cachedConsentRefs === undefined ? undefined : cachedConsentRefs[_cs.mem.ui.service!];
      if (cachedConsentRef === undefined || cachedConsentRef === null) {
        return this.send(_cs, message(action.arena, cs, [cs.mem.db.consentServiceId],
          getConsentReference({
            clientId: address2org(cs.name),
            subjectId: cs.mem.ui.user,
            purposeDeclarationId: action.message.service,
            callbackURL: cs.name, // actual address for callback message
          })()
        ));
      }
    }

    return _cs;
  }
}

export const selectServiceMessage = addHandlerClass<SelectServiceMessage, SelectServiceMessageHandler>(ClientIS, SelectServiceMessageHandler);



class SendDeclarationHandler extends GenericMessageHandler<ClientState, ClientPS, Payload, SendDeclarationHandler> {
  name = "Client/UI/declarePurpose";

  handle(cis: ClientPS, action: Message<Payload>): ClientPS {
    return this.send(cis, message(action.arena, cis, [cis.mem.db.consentServiceId], addPurposeDeclaration()(action.message)))
  }
}

export const declarePurpose = addHandlerClass(ClientIS, SendDeclarationHandler);

interface FetchConsentReferencePayload extends Payload {
  type: typeof FetchConsentReferenceHandler.name;
  purposeDeclarationId: string;
}

class FetchConsentReferenceHandler extends GenericMessageHandler<ClientState, ClientPS, FetchConsentReferencePayload, FetchConsentReferenceHandler> {
  name = "Client/UI/fetchConsentReference";

  handle(cis: ClientPS, action: Message<FetchConsentReferencePayload>): ClientPS {
    return this.send(
      updateDb<typeof cis.mem.db, ClientState>({
        ...cis,
        mem: {
          ...cis.mem,
          ui: {
            ...cis.mem.ui,
            service: action.message.purposeDeclarationId
          }
        }
      }, {
        consentRefByUser: updateCSRef(
          cis.mem.db.consentRefByUser,
          cis.mem.ui.user!,
          action.message.purposeDeclarationId,
          undefined
        )
      }),
      message(action.arena, cis, [cis.mem.db.consentServiceId], getConsentReference({
        clientId: address2org(cis.name),
        purposeDeclarationId: action.message.purposeDeclarationId,
        subjectId: cis.mem.ui.user,
        callbackURL: cis.name, // actual address for callback message
      })()
      ))
  }
}

export const fetchConsentReference = addHandlerClass<FetchConsentReferencePayload, FetchConsentReferenceHandler>(ClientIS, FetchConsentReferenceHandler);

function updateCSRef<T extends { [k: string]: any }>(csByUser: T, user: string, purposeDeclarationId: string, consentReference?: string | null): T {
  return {
    ...csByUser,
    [user]: { ...csByUser[user], [purposeDeclarationId]: consentReference }
  };
}

class ConsentReferenceResponseHandler extends GenericMessageHandler<ClientState, ClientPS, ConsentReferenceResponse, ConsentReferenceResponseHandler> {
  name = ConsentReferenceResponseTypeName;

  handle(cis: ClientPS, action: Message<ConsentReferenceResponse>): ClientPS {
    return {
      ...cis, mem: {
        ...cis.mem, db: {
          ...cis.mem.db,
          consentRefByUser: updateCSRef(
            cis.mem.db.consentRefByUser,
            cis.mem.ui.user!,
            action.message.purposeDeclarationId,
            action.message.consentReference
          )
        }
      }
    };
  }
}

export const handleConsentRefernceResponse = addHandlerClass<ConsentReferenceResponse, ConsentReferenceResponseHandler>(ClientIS, ConsentReferenceResponseHandler);

interface ExecuteMessage extends Payload {
  type: typeof ExecuteRequestHandler.name;
  requestReference: string; // generated in UI because it should not be done here.
  purposeId: string;
  serviceAddress?: string; // only execute one request.
  serviceName?: string;
}

class ExecuteRequestHandler extends GenericMessageHandler<ClientState, ClientPS, ExecuteMessage, ExecuteRequestHandler> {
  name = "Client/UI/executeRequest";

  handle(cis: ClientPS, action: Message<ExecuteMessage>): ClientPS {
    let req = action.message;

    let userConsentRefs = cis.mem.db.consentRefByUser[cis.mem.ui.user!];
    let consentReference = userConsentRefs === undefined ? undefined : userConsentRefs[req.purposeId];

    let conf = cis.mem.config.find(c => c.purposeDeclarationId === req.purposeId);
    if (conf === undefined) {
      console.error("Unknown purpose? ", req);
      return cis;
    }

    // send request for all services defined in configuration, or to those that match.
    return (conf.services
      .filter(service => ((req.serviceAddress === undefined || req.serviceAddress === service.serviceAddress)
        && (req.serviceName === undefined || req.serviceName === service.serviceName)))
      .reduce((_cis, service) => {
        let requestReference = hash(req.requestReference + service.serviceName + service.serviceAddress);
        // eslint-disable-next-line
        let cis = undefined;

        // replace or add response record for this particular purpose/serviceprovider/service
        let newResponses = (_cis.mem.ui.response || []).filter(
          r => !(r.purposeDeclarationId === req.purposeId
            && r.serviceAddress === service.serviceAddress
            && r.serviceName === service.serviceName)
        ).concat({
          requestReferenceId: requestReference,
          purposeDeclarationId: req.purposeId,
          serviceAddress: service.serviceAddress,
          serviceName: service.serviceName,
          data: null,
        })

        let __cis = {
          ..._cis, mem: {
            ..._cis.mem, ui: {
              ..._cis.mem.ui,
              response: newResponses,
            }
          }
        };

        return this.send(__cis, message(action.arena, __cis, [service.serviceAddress], submitRequest({
          clientId: address2org(__cis.name),
          serviceName: service.serviceName,
          subjectId: __cis.mem.ui.user,
          consentReference: consentReference!,
          requestReference: requestReference,
        })()))
      }, cis));
  }
}

export const executeRequest = addHandlerClass<ExecuteMessage, ExecuteRequestHandler>(ClientIS, ExecuteRequestHandler);
export function generateRequestReference(): string {
  return hash("" + ((Math.random() * 1000000) | 0));
}


class ServiceResponseHandler extends GenericMessageHandler<ClientState, ClientPS, ServiceResponse, ServiceResponseHandler> {
  name = responseTypeName;

  handle(cis: ClientPS, action: Message<ServiceResponse>): ClientPS {
    return {
      ...cis, mem: {
        ...cis.mem, ui: {
          ...cis.mem.ui,
          response: (cis.mem.ui.response || []).map(
            r => {
              if (r.requestReferenceId === action.message.asyncId) {
                return { ...r, data: action.message.records }
              } else {
                return r;
              }
            }
          )
        }
      }
    }
  }

}

export const submitResponse = addHandlerClass<ServiceResponse, ServiceResponseHandler>(ClientIS, ServiceResponseHandler);

class ErrorResponseHandler extends GenericMessageHandler<ClientState, ClientPS, ErrorPayload, ErrorResponseHandler> {
  name = "error";

  handle(cis: ClientPS, action: Message<ErrorPayload>): ClientPS {
    switch (action.message.error) {
      // assume the respone came for logged in user and for selected service
      case "consent_not_found":
        return updateDb<typeof cis.mem.db, ClientState>(cis, {
          consentRefByUser: updateCSRef(
            cis.mem.db.consentRefByUser,
            cis.mem.ui.user!,
            cis.mem.ui.service!,
            null
          )
        });
    }

    console.log("Unknown error, ignoring: ", action);
    return cis;
  }
}

addHandlerClass<ErrorPayload, ErrorResponseHandler>(ClientIS, ErrorResponseHandler);

interface UpdateConsentReferencePayload extends Payload {
  type: typeof UpdateConsentReferenceHandler.name;
  purposeDeclarationId?: string;
  consentReference?: string;
}

class UpdateConsentReferenceHandler extends GenericMessageHandler<ClientState, ClientPS, UpdateConsentReferencePayload, UpdateConsentReferenceHandler> {
  name = "CS/UI/dumpConsentRefCache";

  handle(cis: ClientPS, action: Message<UpdateConsentReferencePayload>): ClientPS {
    if (action.message.purposeDeclarationId !== undefined) {
      return updateDb<typeof cis.mem.db, ClientState>(cis, {
        consentRefByUser: updateCSRef(
          cis.mem.db.consentRefByUser,
          cis.mem.ui.user!,
          action.message.purposeDeclarationId,
          action.message.consentReference
        )
      });
    }
    return updateDb<typeof cis.mem.db, ClientState>(cis, { consentRefByUser: {} });
  }
}

export const updateConsentRefInCache = addHandlerClass<UpdateConsentReferencePayload, UpdateConsentReferenceHandler>(ClientIS, UpdateConsentReferenceHandler);

interface ValidateConsentRefMessage extends Payload {
  consentServiceId: string;
  consentReference: string;
}

class ValidateConsentRefMessageHandler extends GenericMessageHandler<ClientState, ClientPS, ValidateConsentRefMessage, ValidateConsentRefMessageHandler> {
  name = "Client/UI/validateConsentRef";

  handle(cis: ClientPS, action: Message<ValidateConsentRefMessage>): ClientPS {
    return this.send(
      cis,
      message(action.arena, cis, [action.message.consentServiceId || cis.mem.db.consentServiceId],
        validateConsentReference({
          partyId: cis.name,
          consentReference: action.message.consentReference
        })()
      )
    );
  }
}

export const validateConsentRef = addHandlerClass<ValidateConsentRefMessage, ValidateConsentRefMessageHandler>(ClientIS, ValidateConsentRefMessageHandler);
