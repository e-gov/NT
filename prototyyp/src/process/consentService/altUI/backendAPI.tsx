import { BackendAPI } from "../../../postMessage";
import { ConsentServiceState, PurposeDeclaration, Consent, UsageRecord, PurposeDeclarationRef, findFrom, ServiceDeclarationRef, ServiceDeclaration } from "../types";
import React, { useContext } from "react";
import { loginMessage, giveConsentMessage, revokeConsentMessage, activatePurposeDeclarationMessage } from "../ui";
import { hash } from "../../../util";
import { fixRevoked } from "../referenceAPI";

export class ConsentServiceBackend extends BackendAPI<ConsentServiceState> {
  login(ev: any, user?: string) {
    console.log("login(", user, ")");
    ev.preventDefault();
    this.post(loginMessage({ user }));
  }

  giveConsentByPurpose(ev: any, services: ServiceDeclarationRef[], clientId: string, purposeDeclarationId: string) {
    console.log(`giveConsent(${clientId}, ${purposeDeclarationId})`);
    ev.preventDefault();
    this.post(giveConsentMessage({
      dataSubject: this.mem!.ui.user,
      clientId: clientId,
      purposeDeclarationId: purposeDeclarationId,
      validFrom: new Date().toISOString(),
      validUntil: this.getValidUntil(services),
      revoked: false,
      // for technical reasons, we issue consentReference here. 
      // in real system it happens in (real) backend. 
      consentReference: hash(clientId + purposeDeclarationId + Date.now())
    }))
  }

  revokeConsent(ev: any, consentReference: string) {
    console.log(`revokeConsent(${consentReference})`);
    ev.preventDefault();
    this.post(revokeConsentMessage({ consentReference, revokeAt: new Date().toISOString() }))
  }

  // parameetrita/valid === undefined -> kõik aktiivse kasutaja konsendid
  // parameetriga -> ainult need, mis kas kehtivad v]i mitte
  getConsents(valid?: boolean): Consent[] {
    if (this.mem === undefined) {
      return [];
    }

    let now = new Date().toISOString();
    let user = this.mem.ui.user!;

    return (this.mem.db.consents
      .map(fixRevoked(now))
      .filter(
        c => (c.dataSubject === user
          && (valid === undefined
            || (valid === (c.validFrom <= now && c.validUntil >= now && !c.revoked))))
      ));
  }

  // need asjad kõlbavad consendi andmiseks (nõusolekutaotlused)
  getPDsWithoutValidConsent(): PurposeDeclaration[] {
    if (this.mem === undefined) {
      console.error("Not connected? No local state yet");
      return [];
    }

    let consents = this.getConsents(true);

    return this.mem!.db.purposeDeclarations.filter(
      pd => (
        consents.find(
          c => (c.clientId === pd.clientId && c.purposeDeclarationId === pd.purposeDeclarationId)
        ) === undefined
      )
    );
  }

  getUsageLogRecords(): UsageRecord[] {
    if (this.mem === undefined) {
      return [];
    }

    return this.mem.db.usageLog.filter(ur => ur.subjectId === this.mem!.ui.user);
  }

  activatePurposeDeclaration(ev: any, ref: PurposeDeclarationRef) {
    ev.preventDefault();
    if (this.mem === undefined) {
      return;
    }

    this.post(activatePurposeDeclarationMessage(ref));
  }

  getActivePurposeDeclaration(): PurposeDeclaration | undefined {
    if (this.mem === undefined
      || this.mem.ui.activePurposeDeclaration === undefined
      || this.mem.ui.activePurposeDeclaration[this.mem.ui.user!] === undefined) {
      return undefined;
    }

    let candidate = findFrom(
      this.mem.db.purposeDeclarations,
      {
        ...this.mem.ui.activePurposeDeclaration[this.mem.ui.user!],
        callbackURL: undefined
      } as PurposeDeclarationRef
    );

    if (candidate === undefined ||
      findFrom(this.getConsents(true), { // if there is a valid consent for that candidate
        clientId: candidate.clientId,
        purposeDeclarationId: candidate.purposeDeclarationId
      }) !== undefined) {

      return undefined;
    }
    return {
      ...candidate,
      validUntil: this.getValidUntil(this.mem.db.serviceDeclarations)
    };
  }

  getServiceDeclaration(ref: ServiceDeclarationRef): ServiceDeclaration | undefined {
    if (this.mem === undefined) {
      return undefined;
    }

    return findFrom(this.mem.db.serviceDeclarations, ref);
  }

  getPurposeDeclaration(ref: PurposeDeclarationRef): PurposeDeclaration | undefined {
    if (this.mem === undefined) {
      return undefined;
    }

    return findFrom(this.mem.db.purposeDeclarations, ref);
  }

  getValidUntil(services: ServiceDeclarationRef[]): string {
    const expiresIn = services.map(s => this.getServiceDeclaration(s)!.consentMaxDurationSeconds).sort()[0];
    return new Date(Date.now() + (expiresIn * 1000)).toISOString()
  }
}

export const CSBackend = React.createContext(undefined as (ConsentServiceBackend | undefined));

export class Backend {
  use() {
    const ctx = useContext(CSBackend);
    return (ctx === undefined || ctx === null) ? ctx : new ConsentServiceBackend(ctx);
  }
}
