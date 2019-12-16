import { ViewName, ProcessImplName, ProcessState } from '../Base';

export const ConsentService: ProcessImplName = "ConsentService";
export const ConsentServiceDefaultView: ViewName = "loginView";


export interface ConsentServicePS extends ProcessState<ConsentServiceState> {
  type: typeof ConsentService;
  view: typeof ConsentServiceDefaultView;
}

export interface ServiceDeclaration {
  serviceProviderId: string;
  serviceDeclarationId: string;
  name: string;
  description: string;
  technicalDescription: string;
  consentMaxDurationSeconds: number; // integer
  needSignature: boolean;
  validUntil?: number; // timestamp as seconds from unix epoch?
  maxCacheSeconds?: number;
}

export interface ServiceDeclarationRef {
  serviceProviderId: string;
  serviceDeclarationId: string;
}

export interface PurposeDeclaration {
  clientId: string;
  purposeDeclarationId: string;
  name: string;
  description: string;
  services: ServiceDeclarationRef[];
  validUntil?: string; // seconds from unix epoch
  options: any;
}

export interface Consent {
  dataSubject: string;
  clientId: string;
  purposeDeclarationId: string;
  validFrom: string;
  validUntil: string;
  revoked: boolean;
  consentReference: string; // used only in protocol
}

export interface UsageRecord {
  usageTime: string; // ISO 8601 timestamp
  serviceProviderId: string;
  requestReference: string;
  consentReference?: string;
  subjectId: string;
  clientId: string;
  serviceDeclarationIds: string[];
  result: "OK" | "ACCESS_DENIED" | "OTHER_FAIL";
}

export interface PurposeDeclarationRef {
  clientId: string;
  purposeDeclarationId: string;
}

export interface ActivePurposeDeclarationRef extends PurposeDeclarationRef {
  callbackURL?: string;
}

export interface ConsentServiceState {
  ui: {
    user?: string;
    activePurposeDeclaration: {
      [userid: string]: ActivePurposeDeclarationRef;
    };
  }

  db: {
    serviceDeclarations: ServiceDeclaration[];
    purposeDeclarations: PurposeDeclaration[];
    consents: Consent[];
    usageLog: UsageRecord[];
  }
}

export function findFrom<T extends U, U extends any>(items: T[], example: U): T | undefined {
  return items.find(
    i => {
      return Object.keys(example).filter(
        k => (i as T)[k] !== (example as U)[k]
      ).length === 0
    }
  );
}


