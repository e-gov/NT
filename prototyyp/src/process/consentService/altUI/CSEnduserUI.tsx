import React from 'react';
import { BackendStateUpdater } from '../../../postMessage';
import { ConsentServiceState, PurposeDeclaration } from '../types';
import { ConsentServiceBackend, Backend, CSBackend } from './backendAPI';
import VeeraLayout from './veera/layout';
import Tabs from './tabs/Tabs';
import { MyConsents } from './MyConsents';
import { ConsentHistory } from './ConsentHistory';
import { business, Translator, TranslatorWithParams } from '../../../i18n';
import { renderText, iso2epoch } from '../../../util';
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';


function LoginScreen(t: Translator) {
  return (
    <div className="section">
      <h4>{t('please-login')}</h4>
      <p className="mt-3"><a href="../ria/" className="btn btn-primary">{t('login')}</a></p>
    </div>
  );
}

interface APDProps {
  backend: ConsentServiceBackend;
  activeDecl?: PurposeDeclaration;
  tabRef: React.RefObject<Tabs>;
  label: string;
  id: string;
  t: Translator;
  t_: TranslatorWithParams;
}

interface State {
  signPopup: boolean;
  returnPopup: boolean;
  savedClientId?: string;
}

class ActivePurposeDeclaration extends React.PureComponent<APDProps, State> {
  state: State = {
    signPopup: false,
    returnPopup: false,
  };

  constructor(props: APDProps) {
    super(props);
    this.showConsentTab = this.showConsentTab.bind(this);
  }

  showSignPopup(show: boolean) {
    this.setState(s => ({ ...s, signPopup: show }));
  }

  showReturnPopup(show = true, clientId?: string) {
    this.setState(s => ({ ...s, returnPopup: show, savedClientId: clientId }))
  }

  toggleSignPopup() {
    this.setState(s => ({ ...s, signPopup: !s.signPopup }))
  }

  showConsentTab(ev: any) {
    ev.preventDefault();
    if (this.props.tabRef.current) this.props.tabRef.current.onClickTabItem("tab-my-consents");
  };

  Popover() {
    return (
      <>
        <Modal show={this.state.signPopup} onHide={() => this.toggleSignPopup()}>
          <Modal.Body>
            <h4>{this.props.t("consent-request-sign-digitally")}</h4>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={(ev) => {
              this.props.backend.giveConsentByPurpose(
                ev,
                this.props.activeDecl!.services,
                this.props.activeDecl!.clientId,
                this.props.activeDecl!.purposeDeclarationId
              );
              this.toggleSignPopup();
              this.showReturnPopup(true, this.props.activeDecl!.clientId);
            }}>{this.props.t('consent-request-sign')}</button>
            <Button variant="secondary" onClick={(ev: any) => this.toggleSignPopup()}>
              {this.props.t('consent-request-back')}
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="primary" className="mr-2" onClick={(ev: any) => this.toggleSignPopup()}>
          {this.props.t('consent-request-give')}
        </Button>
        <Button variant="secondary" onClick={(ev: any) => window.close()}>
          {this.props.t('consent-request-do-not-give')}
        </Button>
      </>
    );
  }

  ReturnScreen() {
    let t = this.props.t;
    return (
      <div>
        <h4>{t('consent-to')}{business(this.state.savedClientId!, "name")}{t('consent-to-after')}</h4>
        <p>{t('consent-given-all-consents')}<a href="../../ui/csui" onClick={this.showConsentTab}>{t('tab-my-consents')}</a>{t('consent-given-all-consents-after')}</p>
        <button className="btn btn-primary" onClick={() => {
          window.close();
          this.showReturnPopup(false);
        }}>{t('consent-given-return')}</button>
      </div>
    );
  }

  render() {

    const activeDecl = this.props.activeDecl;

    if (activeDecl === undefined) {
      if (this.state.returnPopup) {
        return this.ReturnScreen();
      } else {
        return (<div>{this.props.t('no-open-consent-request')}</div>);
      }
    }

    return (
      <div className="tab-info">
        <h4 className="mb-4 title">{
          this.props.t_(['asks-for-consent'], {
            clientName: business(activeDecl.clientId, "name"),
            clientNTR: business(activeDecl.clientId, "ntr")
          })
        }</h4>
        <div className="row">
          <div className="col-md">
            <div className="d-flex align-items-baseline">
              <div><h4>{this.props.t('purpose-of-use')}</h4></div>
              <div>
                {renderText(activeDecl.description)}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md">
            <div className="d-flex align-items-end">
              <div><h4>{this.props.t('validity')}</h4></div>
              <div>{activeDecl.validUntil && `${this.props.t('valid-until')}${formatTimestamp(iso2epoch(activeDecl.validUntil))}`}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <div className="d-flex align-items-end">
              <div><h4>{
                this.props.t_(['gets-under-consent'], {
                  clientName: business(activeDecl.clientId, "name"),
                  clientNTR: business(activeDecl.clientId, "ntr")
                })
              }
              </h4></div>
              <div>
                {
                  activeDecl.services.map(sdref => {
                    const sd = this.props.backend.getServiceDeclaration(sdref);
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
                }
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md mt-4 mb-2 text-muted">
            {this.props.t('you-can-withdraw')}<a href="../../ui/csui" onClick={this.showConsentTab}>{this.props.t('tab-my-consents')}</a>
          </div>
        </div>
        <p className="mt-4">
          {this.Popover()}
        </p>
      </div>
    );
  }
};

const MainView = (props: { backend: Backend; tabRef: any}) => {

  useTranslation();

  let backendUse = props.backend.use();

  if (backendUse === null || backendUse === undefined) {
    return (
      <>
        <div className="section">Wait, or reinit the client UI from the main window... '{window.name}'</div>
      </>
    );
  }

  const [t, t_] = backendUse.tRefs();

  if (backendUse.mem!.ui.user === undefined) {
    return LoginScreen(t);
  }

  const activeDecl = backendUse.getActivePurposeDeclaration();

  return (
    <Tabs ref={props.tabRef}>
      <div label={t('tab-open-consent-requests')} id="tab-open-requests" key="tab-open-requests">
        <ActivePurposeDeclaration
          label={t('tab-open-consent-requests')}
          id="tab-open-requests"
          backend={backendUse}
          activeDecl={activeDecl}
          tabRef={props.tabRef}
          t={t} t_={t_} />
      </div>
      {MyConsents(backendUse)}
      {ConsentHistory(backendUse)}
    </Tabs>
  )
}



export class CSEnduserUI extends React.PureComponent<{}, ConsentServiceBackend> {
  backendLink: BackendStateUpdater<ConsentServiceState, ConsentServiceBackend>;
  backend: Backend;
  ref: React.RefObject<any>;

  constructor(props: any, context?: any) {
    super(props, context);
    this.backendLink = new BackendStateUpdater(
      csb => { this.setState(csb as ConsentServiceBackend); },
      ConsentServiceBackend
    );
    this.backend = new Backend();
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (process.env.NODE_ENV === "development") {
      require('../../../static/css/mta_visuaal.css');
    }
    document.body.classList.add('temp');
    this.backendLink.resetState();
  }

  render() {
    return (
      <CSBackend.Provider value={this.state}>
        <VeeraLayout backend={this.backend}>
          <MainView backend={this.backend} tabRef={this.ref} />
        </VeeraLayout>
      </CSBackend.Provider>
    );
  }
}

export function formatTimestamp(timestamp: number, withTime?: boolean) {
  if (withTime) {
    return Intl.DateTimeFormat(
      'et',
      {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    ).format(new Date(timestamp * 1000));
  }
  // FIXME: language code should come from translation file?
  return Intl.DateTimeFormat('et').format(new Date(timestamp * 1000));
}

export function formatDate(timestamp: number) {
  return formatTimestamp(timestamp, false);
}

export function formatDateTime(timestamp: number) {
  return formatTimestamp(timestamp, true);
}