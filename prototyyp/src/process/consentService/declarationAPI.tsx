import { ServiceDeclaration, ConsentServiceState, findFrom, PurposeDeclaration, ConsentService, ConsentServicePS } from './types'
import { GenericMessageHandler, Message, addHandlerClass, updateDb } from '../Base';
import { address2org } from '../../util';

// {Service,Purpose}Declaration API messages and their processing

interface ServiceDeclarationMessage extends ServiceDeclaration {
  type: typeof AddServiceDeclarationMessage.name;
}

class AddServiceDeclarationMessage extends GenericMessageHandler<ConsentServiceState, ConsentServicePS, ServiceDeclarationMessage, AddServiceDeclarationMessage> {
  name = "CS/addServiceDeclaration";

  addServiceDeclaration(cs: ConsentServicePS, sd: ServiceDeclaration): ConsentServicePS {
    return updateDb(cs, { serviceDeclarations: cs.mem.db.serviceDeclarations.concat(sd) });
  }

  handle(cs: ConsentServicePS, msg: Message<ServiceDeclarationMessage>) {
    console.log(`addServiceDeclaration: ${JSON.stringify(msg)}`);

    let decl = msg.message;

    if (findFrom(
      cs.mem.db.serviceDeclarations,
      { serviceProviderId: decl.serviceProviderId, serviceDeclarationId: decl.serviceDeclarationId }) !== undefined) {

      return this.withErrorResponse(cs, msg, "duplicate_declaration");
    }

    if (decl.serviceProviderId !== address2org(msg.sender)) {
      return this.withErrorResponse(cs, msg, "invalid_request", {
        msg: "serviceProvcderId in declaration and message do not match"
      });
    }

    if (decl.serviceDeclarationId === undefined || !decl.serviceDeclarationId.match("^[!-~]+$")) {
      return this.withErrorResponse(cs, msg, "invalid_request", { msg: "Invalid service declaration id" });
    }

    return this.withOkResponse(this.addServiceDeclaration(cs, { ...msg.message, type: undefined } as ServiceDeclaration), msg);
  }
}

export const addServiceDeclaration = addHandlerClass(ConsentService, AddServiceDeclarationMessage);

interface PurposeDeclarationMessage extends PurposeDeclaration {
  type: typeof AddPurposeDeclarationMessage.name;
}

class AddPurposeDeclarationMessage extends GenericMessageHandler<ConsentServiceState, ConsentServicePS, PurposeDeclarationMessage, AddPurposeDeclarationMessage> {
  name = "CS/addPurposeDeclaration";

  addPurposeDeclaration(cs: ConsentServicePS, pd: PurposeDeclaration): ConsentServicePS {
    return updateDb(cs, { purposeDeclarations: cs.mem.db.purposeDeclarations.concat(pd) });
  }

  handle(cs: ConsentServicePS, msg: Message<PurposeDeclarationMessage>) {
    console.log(`addPurposeDeclaration: ${JSON.stringify(msg)}`);

    let decl = msg.message;

    if (findFrom(
      cs.mem.db.purposeDeclarations,
      { clientId: decl.clientId, purposeDeclarationId: decl.purposeDeclarationId }) !== undefined) {

      return this.withErrorResponse(cs, msg, "duplicate_declaration");
    }

    if (decl.clientId !== address2org(msg.sender)) {
      return this.withErrorResponse(cs, msg, "invalid_request", { msg: "clientId in declaration and message do not match" });
    }

    if (decl.purposeDeclarationId === undefined || !decl.purposeDeclarationId.match("^[!-~]+$")) {
      return this.withErrorResponse(cs, msg, "invalid_request", { msg: "Invalid purpose declaration id" });
    }

    if (decl.services.length === 0 || decl.services.find(sdRef => {
      // true if sdRerf does not match with any of existing servicedeclarations
      return findFrom(cs.mem.db.serviceDeclarations, sdRef) === undefined;
    }) !== undefined) {

      return this.withErrorResponse(cs, msg, "invalid_request", { msg: "Invalid or missing SD reference(s)" });
    }

    return this.withOkResponse(this.addPurposeDeclaration(cs, { ...msg.message, type: undefined } as PurposeDeclaration), msg);
  }
}

export const addPurposeDeclaration = addHandlerClass(ConsentService, AddPurposeDeclarationMessage);
