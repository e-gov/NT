import * as React from 'react';

import { ProcessState, ProcessRenderer, findRenderer, uiMap } from '../process/Base';
import { useStore } from 'react-redux';
import { launchUI } from '../postMessage';
import { __ } from '../i18n';
import { LogButton } from './MessageLog';
import { Modal, ModalFooter, Button } from 'react-bootstrap';

function render<S>({ process, arena }: ProcessUIProps<S>): ReturnType<ProcessRenderer<S>> {
  return (findRenderer(process))({ process, arena });
}

// Protsessi-kasti komponent. 

export interface ProcessUIProps<S> {
  process: ProcessState<S>;
  arena: string; // current arena.
  children?: any;
  button?: boolean;
}



export function ProcessUI({ process, arena }: ProcessUIProps<any>) {
  const t = (...keys: string[]) => __({ arena, process }, keys);
  const [visible, setVisible] = React.useState(false);
  return (
    <div className="col">
      <div className={`card process style-${t('stylename')}`} id={`proc-${process.name}`}>
        <div className="card-header">
          <Modal show={visible} onHide={() => setVisible(false)} size="lg">
            <Modal.Header>
              <Modal.Title>{t("internal-state")}: {t('title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="msg-log-popup">
                <pre className="msg-log">{JSON.stringify(process, undefined, "  ")}</pre>
              </div>
            </Modal.Body>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setVisible(false)}>{t('close')}</Button>
            </ModalFooter>
          </Modal>
          <span
            className="process-name"
            onClick={() => setVisible(true)}>
            {t("title")}
          </span>
          <LogButton
            arena={arena}
            owner={process}
            showSelf={true}
            maxRows={100}
            t={t}
            className="btn-log btn-light btn-sm"
          >{t('msg-log.log-button')}</LogButton>
        </div>
        <div className="card-body">
          <span className="process-state">{render({ process, arena })}</span>
        </div>
      </div>
    </div>
  );
}

export function UILink({ arena, process, children, button }: ProcessUIProps<any>) {
  const store = useStore();
  function launch() {
    launchUI(arena, process.name, uiMap[process.type], store);
  }

  const el = button === true ? 'button' : 'div'

  if (uiMap[process.type] === undefined) {
    return <></>;
  } else {
    return React.createElement(el, {
      className: button !== true ? "process-uilink" : "btn btn-primary",
      onClick: () => launch()
    }, children === undefined ? "\u2398" : children);
  }
}

