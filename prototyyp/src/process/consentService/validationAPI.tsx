import { GenericMessageHandler, Payload, Message, addHandlerClass } from "../Base";
import { ConsentServicePS, ConsentServiceState, ConsentService } from "./types";
import { address2org } from "../../util";


export interface ValidationRequest extends Payload {
  type: typeof ValidationRequestHandler.name;
  asyncId: string; // internal identifier to help SP to match answer to a request
  partyId: string;
  consentReference: string;
  requestReference: string;
}

export const ValidationResponseTypeName = "CS/validateConsentReference/response";
export interface ValidationResponse extends Payload {
  type: typeof ValidationResponseTypeName;
  asyncId: string; // internal identifier. same as in the request
  valid: boolean;
  consentReference?: string;
  consentExpiration?: string; // timestamp
  validationExpiration?: string;
  dataSubjectId?: string;
  clientId?: string;
  purposeDeclarationId?: string;
  serviceDeclarationId?: string[];
}

const NotValidResponse: ValidationResponse = {
  type: ValidationResponseTypeName,
  asyncId: "",
  valid: false,
}

class ValidationRequestHandler extends GenericMessageHandler<ConsentServiceState, ConsentServicePS, ValidationRequest, ValidationRequestHandler> {
  name = "CS/validateConsentReference";

  notValid(cs: ConsentServicePS, action: Message<ValidationRequest>): ConsentServicePS {
    return this.withResponse<ValidationResponse>(cs, action, { ...NotValidResponse, asyncId: action.message.asyncId });
  }

  handle(cs: ConsentServicePS, action: Message<ValidationRequest>): ConsentServicePS {
    let consent = cs.mem.db.consents.find(c => c.consentReference === action.message.consentReference);

    if (consent === undefined) {
      console.log("No such consent found: ", action.message.consentReference);
      return this.notValid(cs, action);
    }

    let now = new Date(action.now! * 1000).toISOString();

    if (consent.revoked || now < consent.validFrom || now > consent.validUntil) {
      console.log(`Consent ${consent} is not valid`);
      return this.notValid(cs, action);
    }

    let sender = address2org(action.sender);

    // find services that the sender of the request is allowed to provide under the consent in question
    let purposeDeclaration = cs.mem.db.purposeDeclarations.find(
      pd => (pd.clientId === consent!.clientId && pd.purposeDeclarationId === consent!.purposeDeclarationId)
    );

    if (purposeDeclaration === undefined) {
      console.error("Cannot find purposeDeclaration that matches to an existing consent?");
      return this.notValid(cs, action);
    }

    // services that the asking party is allowed to provide with this consent
    let services = (purposeDeclaration.services
      .filter(s => s.serviceProviderId === sender)
      .map(s => s.serviceDeclarationId)
    );

    if (sender === consent.clientId) {
      let response: ValidationResponse = {
        type: ValidationResponseTypeName,
        asyncId: action.message.asyncId,
        valid: true,
        consentReference: action.message.consentReference,
        consentExpiration: consent.validUntil,
        dataSubjectId: consent.dataSubject,
        clientId: consent.clientId,
        purposeDeclarationId: consent.purposeDeclarationId,
        // this is not empty if the client and service provider are the same
        // (data repurposing using the consent)
        serviceDeclarationId: services,
      }
      return this.withResponse(cs, action, response);
    }

    // it was not the party that declared the purpose. if it is party whose service declaration was
    // referenced from the purpose declaration, then it still might get the answer
    if (services.length > 0) {
      let response: ValidationResponse = {
        type: ValidationResponseTypeName,
        asyncId: action.message.asyncId,
        valid: true,
        consentReference: action.message.consentReference,
        consentExpiration: consent.validUntil,
        dataSubjectId: consent.dataSubject,
        clientId: consent.clientId,
        serviceDeclarationId: services,
      }
      return this.withResponse(cs, action, response);
    }

    // not the client, not the service provider => not authorized to get anything.
    return this.notValid(cs, action);
  }
}

export const validateConsentReference = addHandlerClass<ValidationRequest, ValidationRequestHandler>(ConsentService, ValidationRequestHandler);

