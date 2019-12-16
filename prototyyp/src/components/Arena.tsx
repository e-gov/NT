import * as React from 'react';
import { connect } from 'react-redux';

import { ProcessUI } from './Process';
import { MessageLog } from './MessageLog';

import { AppState } from '../store';
import { arenaFromState } from '../process/Theatre';
import { useTranslation } from 'react-i18next';
import { ArenaState } from '../process/Arena';


interface ArenaProps {
  arena: ArenaState;
}

function ArenaElement({ arena }: ArenaProps) {
  const { t } = useTranslation();
  const processes = arena.process.allNames.map(
    (p) => (<ProcessUI process={arena.process.byName[p]} arena={arena.name} key={p} />)
  );
  return (
    <div>
      <div className="row align-self-stretch">{processes}</div>
      <div className="card w-100 mt-4 mb-2">
        <div className="card-body">
          <h5 className="card-title">{t('msg-log.title')}</h5>
          {arena.log.length === 0 &&
            <div className="d-flex align-items-center">
              <div className="spinner-grow spinner-grow-sm" role="status"></div>
              <p className="card-text ml-1">{t('msg-log.empty')}</p>
            </div>
          }
          <MessageLog arena={arena.name} showSelf={false} maxRows={1000} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: AppState, props: ArenaProps) {
  return { log: arenaFromState(state, props.arena.name).log };
}

export const Arena = connect(mapStateToProps)(ArenaElement);


