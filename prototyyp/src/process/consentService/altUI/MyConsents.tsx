import { ConsentServiceBackend } from './backendAPI';
import React from 'react';
import { Consent } from '../types';
import { formatDate } from './CSEnduserUI';
import { ConsentModal } from './ConsentModal';
import { business, TranslatorWithParams, Translator } from '../../../i18n';
import { iso2epoch } from '../../../util';

export function isConsentActive(consent: Consent) {
  return !consent.revoked && consent.validUntil > new Date().toISOString();
}

function consentDescription(t: Translator, t_: TranslatorWithParams, backend: ConsentServiceBackend, c: Consent) {
  const a = backend.getPurposeDeclaration({ clientId: c.clientId, purposeDeclarationId: c.purposeDeclarationId });
  return t_(['consent-description-line'], {
    clientName: business(c.clientId, "name"),
    purposeDeclName: a!.name,
    endName: t(c.revoked ? 'consent-desc-withdrawn-at' : 'consent-desc-valid-until'),
    validFrom: formatDate(iso2epoch(c.validFrom)),
    validUntil: formatDate(iso2epoch(c.validUntil))
  });
}

export const MyConsents = (backend: ConsentServiceBackend) => {
  const [t, t_] = backend.tRefs();

  const Table = (consents: Consent[], header: JSX.Element) => {
    return (
      <>
        <h4>{header}</h4>
        <table className="table align-middle">
          <tbody>
            {consents.map(c => (
              <tr key={c.clientId}>
                <td>{consentDescription(t, t_, backend, c)}</td>
                <td><ConsentModal backend={backend} consent={c} buttonText={t('consent-open-details')} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }

  const Body = (backend: ConsentServiceBackend) => {

    if (backend.getConsents().length === 0) {
      return (
        <p>{t('no-consents-found')}</p>
      )
    }

    const header = (title: string, length: number) => (
      <h4>
        <span>{title}</span>
        {length === 0 &&
          <span className="badge badge-default ml-2">
            <span className="badge-text">{t('consents-missing-badge')}</span>
          </span>
        }
      </h4>
    )

    return (
      <>
        {Table(backend.getConsents(true), header(t('valid-consents'), backend.getConsents(true).length))}
        {Table(backend.getConsents(false), header(t('invalid-consents'), backend.getConsents(false).length))}
      </>
    )
  }

  return (
    <div label={t('tab-my-consents')} id="tab-my-consents" key="tab-my-consents"> {Body(backend)} </div>
  )
}
