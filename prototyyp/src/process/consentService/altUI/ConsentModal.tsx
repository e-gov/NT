import { ConsentServiceBackend } from "./backendAPI";
import { Consent } from "../types";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { formatDate } from "./CSEnduserUI";
import { isConsentActive } from "./MyConsents";
import { business } from "../../../i18n";
import { renderText, iso2epoch } from "../../../util";

export const ConsentModal: React.FC<{ backend: ConsentServiceBackend, consent: Consent, buttonText: string }> = ({ backend, consent, buttonText }) => {
  const [t, t_] = backend.tRefs();
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRevoke = (ev: any) => {
    setShow(false);
    backend.revokeConsent(ev, consent.consentReference);
  }

  if (backend.mem === undefined) {
    return null;
  }
  const dec = backend.mem.db.purposeDeclarations.find(p => p.purposeDeclarationId === consent.purposeDeclarationId);
  if (dec === undefined) {
    return null;
  }

  const rowView = (name: string, value: any, last?: boolean) => {
    return (
      <div className="row" key={name}>
        <div className="col-md">
          <div className={last ? "d-flex align-items-end" : "d-flex align-items-baseline"}>
            <div><h4> {name}</h4></div>
            <div>{value}</div>
          </div>
        </div>
      </div>
    )
  }

  const Body = () => {
    let services = dec.services.map(sdref => {
      const sd = backend.getServiceDeclaration(sdref);
      if (sd === undefined) {
        return <></>;
      }
      return (
        <>
          <h4>{sd.name}</h4>
          {renderText(sd.description)}
        </>
      )
    })
    return (
      <div className="tab-info">
        {rowView(t('consent-client'), `${business(dec.clientId, "name")} (${business(dec.clientId, "ntr")})`)}
        {rowView(t('consent-purpose-name'), `${dec.name}`)}
        {rowView(t('consent-given-at'), formatDate(iso2epoch(consent.validFrom)))}
        {isConsentActive(consent)
          ? rowView(t('consent-valid-until'), formatDate(iso2epoch(consent.validUntil)))
          : rowView(t('consent-withdrawn-at'), formatDate(iso2epoch(consent.validUntil)))}
        {rowView(t('consent-purpose-text'), renderText(dec.description), true)}
        {rowView(t_(['gets-under-consent'], {
          clientName: business(dec.clientId, "name")
        }), services, true)}
      </div>
    )
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{t('consent-details')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Body />
        </Modal.Body>
        <Modal.Footer>
          {isConsentActive(consent) &&
            <Button variant="primary" onClick={(ev: any) => handleRevoke(ev)}>
              {t('consent-withdraw-consent')}
            </Button>
          }
          <Button variant="secondary" onClick={handleClose}>
            {t('close')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleShow}>
        {buttonText}
      </Button>
    </>
  )
};