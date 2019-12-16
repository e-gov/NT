import { GenericMessageHandler, Message, Payload, addHandlerClass, updateDb } from "../Base";
import { ConsentServiceState, ConsentServicePS, findFrom, ConsentService, Consent } from "./types";
import { setActivePD } from "./ui";

interface ConsentReferenceRequest extends Payload {
  type: typeof GetConsentReferenceMessage.name;
  clientId: string;
  purposeDeclarationId: string;
  subjectId: string;
  callbackURL?: string;
  code?: string;
}

export const ConsentReferenceResponseTypeName = "CS/getConsentReference/response";
export interface ConsentReferenceResponse extends Payload {
  type: typeof ConsentReferenceResponseTypeName;
  clientId: string;
  purposeDeclarationId: string;
  consentReference: string;
}

export function fixRevoked(now: string): ((c: Consent) => Consent) {
  return (c => ((!c.revoked && c.validUntil < now) ? { ...c, revoked: true } : c));
}

class GetConsentReferenceMessage extends GenericMessageHandler<ConsentServiceState, ConsentServicePS, ConsentReferenceRequest, GetConsentReferenceMessage> {
  name: string = "CS/getConsentReference";

  handle(cs: ConsentServicePS, msg: Message<ConsentReferenceRequest>): ConsentServicePS {

    let req = msg.message;

    // mark expired consents as revoked, as optimization
    let _cs: ConsentServicePS = updateDb<typeof cs.mem.db, ConsentServiceState>(
      cs, { consents: cs.mem.db.consents.map(fixRevoked(new Date(msg.now! * 1000).toISOString())) }
    );

    const consent = findFrom(
      _cs.mem.db.consents,
      {
        purposeDeclarationId: req.purposeDeclarationId,
        dataSubject: req.subjectId,
        revoked: false,
      }
    );

    if (consent === undefined) {
      return this.withErrorResponse(
        setActivePD(_cs, req.subjectId, {
          clientId: req.clientId,
          purposeDeclarationId: req.purposeDeclarationId,
          callbackURL: req.callbackURL
        }),
        msg,
        "consent_not_found"
      );
    }

    return this.withResponse<ConsentReferenceResponse>(
      _cs,
      msg,
      {
        type: ConsentReferenceResponseTypeName,
        clientId: msg.message.clientId,
        purposeDeclarationId: msg.message.purposeDeclarationId,
        consentReference: consent.consentReference
      })
  }
}

export const getConsentReference = addHandlerClass<ConsentReferenceRequest, GetConsentReferenceMessage>(ConsentService, GetConsentReferenceMessage);

