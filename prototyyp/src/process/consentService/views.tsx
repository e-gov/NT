import { ConsentServicePS, ConsentServiceState } from './types';
import { ProcessAndArena } from '../Base';
import React from 'react';
import { UILink } from '../../components/Process';
import { __ } from '../../i18n';

export interface CSViewProps extends ProcessAndArena<ConsentServiceState> {
  process: ConsentServicePS;
}

export const ConsentServiceRenderer: React.FC<CSViewProps> = ({ process, arena }) => {
  const t = (...k: string[]) => __({ process, arena }, k);

  const now = new Date().toISOString();

  return (<div>
    <p>{process.mem.ui.user !== undefined ? `${t('active-user')} : ${process.mem.ui.user}` : `${t('no-active-user')}.`}</p>
    <p className="small">
      {process.mem.db.serviceDeclarations.length} {t('service-declarations')}, <br />
      {process.mem.db.purposeDeclarations.length} {t('purpose-declarations')}, <br />
      {process.mem.db.consents.filter(c => (!c.revoked && c.validFrom <= now && c.validUntil >= now)).length} {t('active-consents')}, <br />
      {process.mem.db.consents.length} {t('total-consents')}
    </p>
    <UILink process={process} arena={arena} button={true}> {t('open-end-user-view')}</UILink>
  </div>);
}

