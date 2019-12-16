import { UsageRecord, ConsentServiceState, ConsentServicePS, ConsentService } from "./types";
import { GenericMessageHandler, Message, addHandlerClass, Payload, updateDb } from "../Base";

interface ServiceUseMessage extends UsageRecord, Payload {
  type: typeof ReportServiceUseMessage.name;
}

class ReportServiceUseMessage extends GenericMessageHandler<ConsentServiceState, ConsentServicePS, ServiceUseMessage, ReportServiceUseMessage> {
  name: string = "CS/reportServiceUsage";

  addUsageRecord(cs: ConsentServicePS, sd: UsageRecord) {
    return updateDb(cs, { usageLog: cs.mem.db.usageLog.concat(sd) });
  }

  handle(cs: ConsentServicePS, msg: Message<ServiceUseMessage>) {
    return this.withOkResponse(this.addUsageRecord(cs, { ...msg.message, type: undefined } as UsageRecord), msg);
  }
}

export const reportServiceUse = addHandlerClass<ServiceUseMessage, ReportServiceUseMessage>(ConsentService, ReportServiceUseMessage);

