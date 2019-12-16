import { Payload, GenericMessageHandler, Message, addHandlerClass, message, updateDb } from '../Base';
import { ConsentServiceState, ConsentServicePS, ConsentService, findFrom, Consent, PurposeDeclarationRef, ActivePurposeDeclarationRef } from './types';
import { fetchConsentReference } from '../client/messages';

// messages that the ConsentService UI can send 

export interface LoginMessage extends Payload {
  type: typeof LoginMessageHandler.name;
  user?: string;
}

class LoginMessageHandler extends GenericMessageHandler<ConsentServiceState, ConsentServicePS, LoginMessage, LoginMessageHandler> {
  name = "CS/UI/login";

  handle(cs: ConsentServicePS, action: Message<LoginMessage>): ConsentServicePS {
    console.log("login message: ", action);
    return { ...cs, mem: { ...cs.mem, ui: { ...cs.mem.ui, user: action.message.user } } };
  }
}

export const loginMessage = addHandlerClass<LoginMessage, LoginMessageHandler>(ConsentService, LoginMessageHandler);

interface ConsentMessage extends Consent, Payload {
  type: typeof GiveConsentMessageHandler.name;
}

class GiveConsentMessageHandler extends GenericMessageHandler<ConsentServiceState, ConsentServicePS, ConsentMessage, GiveConsentMessageHandler> {
  name: string = "CS/UI/giveConsent";

  addConsent(cs: ConsentServicePS, con: Consent): ConsentServicePS {
    return updateDb<typeof cs.mem.db, ConsentServiceState>(cs, { consents: cs.mem.db.consents.concat(con) });
  }

  handle(cs: ConsentServicePS, msg: Message<ConsentMessage>): ConsentServicePS {
    let newConsent = msg.message;
    if (findFrom(cs.mem.db.purposeDeclarations, {
      clientId: newConsent.clientId,
      purposeDeclarationId: newConsent.purposeDeclarationId
    }) === undefined) {
      console.error("Attempt to add consent for unknown purpose declaration: ", newConsent);
      return cs;
    }

    if (findFrom(cs.mem.db.consents, {
      clientId: msg.message.clientId,
      purposeDeclarationId: msg.message.purposeDeclarationId,
      dataSubject: msg.message.dataSubject,
      revoked: false
    }) !== undefined) {
      console.error("Attempt to add duplicate consent?");
      return cs;
    }

    console.log("Adding consent: ", msg.message);

    let updatedCS = this.addConsent(cs, { ...msg.message, type: undefined } as Consent);

    let activeUser = cs.mem.ui.user;
    if (activeUser === undefined || cs.mem.ui.activePurposeDeclaration[activeUser] === undefined) {
      // no user, no active pd --> no callback
      return updatedCS;
    }

    let decl = cs.mem.ui.activePurposeDeclaration[activeUser];

    // forget that we had pd selected.
    let updatedCS2 = setActivePD(updatedCS, activeUser, undefined);

    if (decl.clientId !== msg.message.clientId || decl.purposeDeclarationId !== msg.message.purposeDeclarationId
      || decl.callbackURL === undefined) {
      return updatedCS2;
    }

    // if the client application asked for callback, we send it a message about the 
    // consent being signed. reusing UI message from client implementation.
    return this.send(updatedCS2, message(msg.arena, updatedCS, [decl.callbackURL],
      fetchConsentReference({ purposeDeclarationId: decl.purposeDeclarationId })()
    ));

  }
}

export const giveConsentMessage = addHandlerClass<ConsentMessage, GiveConsentMessageHandler>(ConsentService, GiveConsentMessageHandler);


interface RevokeConsentMessage extends Payload {
  type: typeof RevokeConsentMessageHandler.name;
  consentReference: string;
  revokeAt: string;
}

class RevokeConsentMessageHandler extends GenericMessageHandler<ConsentServiceState, ConsentServicePS, RevokeConsentMessage, RevokeConsentMessageHandler> {
  name: string = "CS/UI/revokeConsent";

  revokeIfReferenceEquals(con: Consent, ref: RevokeConsentMessage): Consent {
    if (con.consentReference === ref.consentReference) {
      return { ...con, revoked: true, validUntil: ref.revokeAt };
    }

    return con;
  }

  revokeConsent(cs: ConsentServicePS, ref: RevokeConsentMessage): ConsentServicePS {
    return updateDb(cs, { consents: cs.mem.db.consents.map(a => this.revokeIfReferenceEquals(a, ref)) });
  }

  handle(cs: ConsentServicePS, msg: Message<RevokeConsentMessage>): ConsentServicePS {
    return this.revokeConsent(cs, msg.message);
  }
}

export const revokeConsentMessage = addHandlerClass<RevokeConsentMessage, RevokeConsentMessageHandler>(ConsentService, RevokeConsentMessageHandler);

function updateAPDforUser<R extends { [user: string]: ActivePurposeDeclarationRef }>(refs: R, user: string, ref?: ActivePurposeDeclarationRef): R {
  return { ...refs, [user]: ref };
}

export function setActivePD(cs: ConsentServicePS, user: string, ref?: ActivePurposeDeclarationRef): ConsentServicePS {
  return {
    ...cs, mem: {
      ...cs.mem, ui: {
        ...cs.mem.ui,
        activePurposeDeclaration: updateAPDforUser(cs.mem.ui.activePurposeDeclaration, user, ref)
      }
    }
  }
}

interface ActivatePurposeDeclaration extends Payload, PurposeDeclarationRef {
  type: typeof ActivatePurposeDeclarationHandler.name;
  user?: string;
}

class ActivatePurposeDeclarationHandler extends GenericMessageHandler<ConsentServiceState, ConsentServicePS, ActivatePurposeDeclaration, ActivatePurposeDeclarationHandler> {
  name = "CS/UI/activatePurposeDeclaration";

  handle(cs: ConsentServicePS, action: Message<ActivatePurposeDeclaration>): ConsentServicePS {
    return setActivePD(
      cs,
      action.message.user === undefined ? cs.mem.ui.user! : action.message.user,
      {
        clientId: action.message.clientId,
        purposeDeclarationId: action.message.purposeDeclarationId,
      }
    );
  }
}

export const activatePurposeDeclarationMessage = addHandlerClass<ActivatePurposeDeclaration, ActivatePurposeDeclarationHandler>(ConsentService, ActivatePurposeDeclarationHandler);
