import { ProcessImplName, ViewName, ProcessState } from "../Base";
import { PurposeDeclaration } from "../consentService/types";


export const ClientIS: ProcessImplName = "ClientIS";
export const ClientDefaultView: ViewName = "loginView";

export type PurposeDeclarationTemplate = Partial<PurposeDeclaration> & { purposeDeclarationId: string; }

// the Client "implements" requests as defined in config
export interface ClientConfig {
  // purpose declaration
  purposeDeclarationId: string;
  services: { // services it needs
    serviceAddress: string;
    serviceName: string;
  }[];
}
export interface ClientState {
  ui: {
    user?: string; // authenticated data subject id or null
    service?: string;
    response?: {
      // used to match async messag
      requestReferenceId: string;
      purposeDeclarationId: string;
      serviceAddress: string;
      serviceName: string;
      data: any;
    }[];
  };

  db: {
    consentServiceId: string; // should be per purpose
    consentRefByUser: { [key: string]: { [key: string]: string | null; } }; // userid -> purposedeclarationid -> consentref
    purpose: { // purposedeclarationid -> servicedesc[]
      [key: string]: {
        serviceAddress: string; // the actual communication address
        serviceId: string;      // actual "service"
      }[];
    }
  };

  declTemplate?: PurposeDeclarationTemplate[];

  config: ClientConfig[];
}

export interface ClientPS extends ProcessState<ClientState> {
  type: typeof ClientIS;
  view: typeof ClientDefaultView;
}
