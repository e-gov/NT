import * as React from "react";
import { ProcessAndArena, Message, message } from "../Base";
import { ClientState } from "./types";
import { Modal, Button } from "react-bootstrap";
import { SimpleSend } from "../../components/SendButton";
import { loginMessage, selectServiceMessage, fetchConsentReference, executeRequest, generateRequestReference } from "./messages";
import { connect } from "react-redux";
import { __, fullname } from "../../i18n";

interface ClientViewProps extends ProcessAndArena<ClientState> {
  t: any;
  send: (props: ClientViewProps, values?: any) => Message<any>;
}


const LOGIN: ClientViewState = "login";  // no authenticated user
const SELECT_SERVICE: ClientViewState = "selectService"; // user authenticated, service not selected
const WAIT_FOR_CONSENT_REF: ClientViewState = "waitForConsent"; //  no idea if user has consent
const CONSENT_NOT_FOUND: ClientViewState = "consentNotFound"; // prompt for consent
const SERVICE_V1: ClientViewState = "serviceV1";

type ClientViewState = "login" | "selectService" | "waitForConsent" | "consentNotFound" | "serviceV1";

interface State {
  view: ClientViewState;
  loading: boolean;
}

const Header = ({ t, props }: { t: any; props: ClientViewProps }) => (
  <div className="app-header">
    <SimpleSend
      arena={props.arena}
      owner={props.process}
      className="btn btn-success btn-health"
      text={t('logout')}
      message={loginMessage()} />
    <div className="app-user-icon">
      <img alt="user icon" src={require('./../../static/assets/images/user-icon.svg')} />
    </div>
    <p className="app-user">{t('hello').replace("USERNAME", fullname(props.process.mem.ui.user!))}</p>
  </div>
);

function send(props: ClientViewProps, values?: any): Message<any> {
  return message(props.arena, props.process, [props.process.name], values());
}

function currentView(m: ClientState): ClientViewState {
  if (m.ui.user === undefined) {
    return LOGIN;
  } else if (m.ui.service === undefined) {
    return SELECT_SERVICE;
  } else if (m.db.consentRefByUser[m.ui.user] === undefined ||
    m.db.consentRefByUser[m.ui.user][m.ui.service] === undefined) {
    return WAIT_FOR_CONSENT_REF;
  } else if (m.db.consentRefByUser[m.ui.user][m.ui.service] === null) {
    return CONSENT_NOT_FOUND;
  } else {
    return SERVICE_V1;
  }
}

class ClientView_ extends React.PureComponent<ClientViewProps, State> {

  constructor(props: ClientViewProps) {
    super(props);
    this.state = { loading: false, view: currentView(props.process.mem) };
    switch (this.state.view) {
      case WAIT_FOR_CONSENT_REF:
        this.sendMessagesFor(this.state.view);
    }
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let actualView = currentView(this.props.process.mem);
    if (actualView !== this.state.view) {
      this.setState({ view: actualView });
    }
  }

  sendMessagesFor = (view: ClientViewState) => {
    const mem = this.props.process.mem;
    switch (view) {
      case WAIT_FOR_CONSENT_REF:
        if (mem.ui.user !== undefined && mem.ui.service !== undefined && (
          mem.db.consentRefByUser[mem.ui.user] === undefined ||
          mem.db.consentRefByUser[mem.ui.user][mem.ui.service] === undefined ||
          mem.db.consentRefByUser[mem.ui.user][mem.ui.service] === null)
        ) {
          this.props.send(this.props, fetchConsentReference({ purposeDeclarationId: mem.ui.service }));
        }
        return;

      case SERVICE_V1:
        this.props.send(this.props, executeRequest({
          requestReference: generateRequestReference(),
          purposeId: mem.ui.service
        }));
        return;
    }
  }

  state = {
    view: LOGIN,
    loading: false
  };

  changeView = (view: ClientViewState, withMessages = true) => {
    this.setState({ loading: true });
    if (withMessages) {
      this.sendMessagesFor(view);
    }
    setTimeout(() => {
      this.setState({ loading: false, view: view });
    }, 600);
  };

  render() {
    const cis = this.props.process;
    const m = cis.mem;
    const t = this.props.t;

    const returnButton = (
      <SimpleSend
        arena={this.props.arena}
        owner={this.props.process}
        className="btn btn-light border"
        onClick={() => this.changeView(SELECT_SERVICE)}
        message={selectServiceMessage()}
        text={t("return")}
      />
    );

    switch (this.state.loading) {
      case true:
        return (
          <div className="d-flex align-items-center">
            <strong>Loading...</strong>
            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
          </div>
        );
      default:
        switch (this.state.view) {
          case LOGIN:
            return (
              <div><form>
                <h4>{t("please_login")}</h4>
                <div>
                  <div className="input-group">
                    <input className="form-control" size={10} name="user" defaultValue="47302200234" />
                    <div className="input-group-append">
                      <SimpleSend
                        arena={this.props.arena}
                        owner={this.props.process}
                        className="btn btn-light border"
                        onClick={() => this.changeView(SELECT_SERVICE)}
                        message={loginMessage()}
                        text={t("login")}
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-4 mb-0">
                  <img alt="illustration" src={require('./../../static/assets/images/login.svg')} width="280" />
                </p>
              </form></div>
            );
          case SELECT_SERVICE:
            return (
              <div>
                <Header t={t} props={this.props} />
                <h4>{t("choose_service")}</h4>
                {
                  this.props.process.mem.config.map(
                    service => {
                      return (
                        <SimpleSend
                          key={service.purposeDeclarationId}
                          className="btn btn-dark mt-2 mr-2"
                          arena={this.props.arena}
                          owner={this.props.process}
                          onClick={() => this.changeView(WAIT_FOR_CONSENT_REF)}
                          message={selectServiceMessage({ service: service.purposeDeclarationId })}
                          text={t("service", service.purposeDeclarationId, "name")}
                        />
                      )
                    }
                  )
                }
              </div>
            );
          case WAIT_FOR_CONSENT_REF:
            return (
              <div>
                <Header t={t} props={this.props} />
                <h4>{t("checking_consent")}</h4>
                <p className="text-left">{t("retry_if_timed_out")}</p>
                <SimpleSend
                  className="btn btn-dark"
                  arena={this.props.arena}
                  owner={this.props.process}
                  message={fetchConsentReference({ purposeDeclarationId: m.ui.service })}
                  text={t('retry-fetch')}
                />
              </div>
            );
          case CONSENT_NOT_FOUND:
            return (
              <div>
                <Header t={t} props={this.props} />
                <h4>{t("service", m.ui.service!, "consent-header")}</h4>
                <p className="text-left">
                  <small dangerouslySetInnerHTML={{ __html: t("service", m.ui.service!, "consent-intro") }} />
                </p>
                <p>
                  <button
                    className="btn btn-lg btn-success btn-health"
                    onClick={ev => window.open("ui/csui/", this.props.arena + " - " + m.db.consentServiceId)}
                  >{t('ill_give_consent')}
                    </button>
                </p>
                <p>{returnButton}</p>
              </div>
            );
          case SERVICE_V1:
            return (
              <div>
                <Header t={t} props={this.props} />
                <h4>{t("consented_data")}</h4>
                {
                  (m.ui.response || []).filter(
                    r => r.purposeDeclarationId === m.ui.service
                  ).map(
                    r => (
                      <span className="card mb-2" key={r.serviceAddress + " " + r.serviceName}>
                        <pre className="text-left scroll-pre">
                          {r.serviceAddress}/{r.serviceName}: {JSON.stringify(r.data, undefined, " ")}
                        </pre>
                      </span>
                    )
                  )
                }
                <p>
                  <SimpleSend
                    owner={this.props.process}
                    arena={this.props.arena}
                    className="btn btn-success btn-health"
                    message={executeRequest({
                      requestReference: generateRequestReference(),
                      purposeId: m.ui.service
                    })} text={t('load-consented-data')} />
                </p>
                <p>{returnButton}</p>
              </div>
            )
          default:
            return <div>Unimplemented view: {this.state.view}</div>
        }
    }
  }
}

const ClientView = connect(null, { send })(ClientView_);

const EnduserUI: React.FC<ProcessAndArena<ClientState>> = ({ process, arena }) => {

  const t = (...k: string[]) => __({ arena, process }, k);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" bsPrefix="client-app modal">
        <Modal.Header>
          <Modal.Title>{t('title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientView arena={arena} process={process} t={t} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>{t('close')}</Button>
        </Modal.Footer>
      </Modal>
      <Button variant="success" className="mr-2 btn-health" onClick={handleShow}>{t('open-end-user-view')}</Button>
    </>
  )
}


export default EnduserUI;