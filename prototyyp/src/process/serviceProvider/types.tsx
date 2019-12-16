import { ProcessImplName, ViewName, ProcessState, Payload } from "../Base";
import { ServiceDeclaration } from "../consentService/types";


export const ServiceProviderIS: ProcessImplName = "ServiceProviderIS";
export const ServiceProviderDefaultView: ViewName = "defaultView";

export interface ServiceProviderPS extends ProcessState<ServiceProviderState> {
  type: typeof ServiceProviderIS;
  view: typeof ServiceProviderDefaultView;
}


export interface SecretRecord {
  key: string;
  type: string;
  subject: string;
  data: any;
}

export interface ServiceConfig {
  consentService: string;
  serviceName: string;
  requiredServiceDeclarationIds: string[];
  returnedDatatypes: string[];
}

export const requestTypeName = "SP/request";

export interface ServiceRequest extends Payload {
  type: typeof requestTypeName;
  clientId: string;
  serviceName: string;
  subjectId: string;
  consentReference?: string;
  requestReference: string;
}

export const responseTypeName = "SP/request/response";

export interface ServiceResponse extends Payload {
  asyncId: string; // response correlation id
  records: SecretRecord[];
}

export interface RequestState extends ServiceRequest {
  validationRequestId: string; // internal, to match response
  validationResponse?: any;
  clientAddress: string;
}

export type ServiceDeclarationTemplate = Partial<ServiceDeclaration> & { serviceDeclarationId: string };

export interface ServiceProviderState {
  db: SecretRecord[];
  services: ServiceConfig[];
  inflight: RequestState[]; // requests received but not properly responded
  declTemplate?: ServiceDeclarationTemplate[];
}
