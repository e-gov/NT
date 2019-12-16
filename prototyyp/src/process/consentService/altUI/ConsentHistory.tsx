import { ConsentServiceBackend } from './backendAPI';
import { UsageRecord, PurposeDeclaration } from '../types';
import React from 'react';
import { formatDateTime } from './CSEnduserUI';
import { ConsentModal } from './ConsentModal';
import { business, TranslatorWithParams } from '../../../i18n';
import { iso2epoch } from '../../../util';


function header(t_: TranslatorWithParams, u: UsageRecord, backend: ConsentServiceBackend, p?: PurposeDeclaration) {
  return formatDateTime(iso2epoch(u.usageTime)) + " " + business(u.clientId, "name") +
    (p ? t_(['purpose-in-usage-log'], { purposeName: p.name }) : "");
}

function usageRecordDescription(t_: TranslatorWithParams, u: UsageRecord, backend: ConsentServiceBackend) {
  const c = backend.getConsents().find(c => c.consentReference === u.consentReference);
  if (!c) {
    return header(t_, u, backend) + t_(['reason-no-consent'], {});
  }
  const p = backend.getPurposeDeclaration({ clientId: u.clientId, purposeDeclarationId: c.purposeDeclarationId });
  if (u.result === 'OK') {
    return header(t_, u, backend, p) + t_(['reason-ok'], {});
  } else {
    return header(t_, u, backend, p) + t_(['reason-consent-not-valid'], {});
  }
}

export const ConsentHistory = (backend: ConsentServiceBackend) => {
  const [t, t_] = backend.tRefs();

  const Modal = (backend: ConsentServiceBackend, consentReference: string) => {
    if (!backend.mem) {
      return;
    }
    const con = backend.mem.db.consents.find(c => c.consentReference === consentReference);
    if (!con) {
      return;
    }
    return (<td><ConsentModal backend={backend} consent={con} buttonText={t('usage-open-consent')} /></td>)
  }

  const Body = (backend: ConsentServiceBackend) => {
    if (backend.getUsageLogRecords().length === 0) {
      return (
        <p>{t('no-consent-use-events')}</p>
      )
    }
    return (
      <>
        <h4>{t('use-history')}</h4>
        <table className="table align-middle">
          <tbody>
            {
              backend.getUsageLogRecords().map(
                u => (
                  <tr key={u.clientId}>
                    <td>{usageRecordDescription(t_, u, backend)}</td>
                    {u.consentReference ? Modal(backend, u.consentReference) : (<></>)}
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </>
    )
  }

  return (
    <div label={t('tab-consent-usage-log')} id="tab-usagelog" key="tab-usagelog">
      {Body(backend)}
    </div>
  );
};
