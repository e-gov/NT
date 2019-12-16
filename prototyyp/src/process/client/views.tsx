import { ProcessAndArena } from "../Base";
import { ClientState, ClientPS, PurposeDeclarationTemplate, ClientConfig } from "./types";
import React from "react";
import { Modal, Button, Dropdown, ButtonProps } from "react-bootstrap";
import { SimpleSend } from "../../components/SendButton";
import { declarePurpose, executeRequest, fetchConsentReference, generateRequestReference, updateConsentRefInCache, validateConsentRef } from "./messages";
import EnduserUI from "./EnduserUI";
import { __, business, Translator } from "../../i18n";
import { address2org } from "../../util";


interface ClientViewProps extends ProcessAndArena<ClientState> {
  process: ClientPS;
}

type SDRef = {
  serviceProviderId: string;
  serviceDeclarationId: string;
}

function addSDRef(ev: any, opts: SDRef[], setOpts: React.Dispatch<React.SetStateAction<SDRef[]>>) {
  ev.preventDefault();
  let f = ev.currentTarget.form;

  let spId = f._spId.value;
  let sdId = f._sdId.value;

  if (!spId.match("^[!-~]+$") || !sdId.match("^[!-~]+$")) {
    return;
  }

  setOpts(old => old.concat({ serviceProviderId: spId, serviceDeclarationId: sdId }));
  f._spId.value = f._sdId.value = "";
}

function prefillPurposeDeclaration(ev: any, decls: PurposeDeclarationTemplate[] | undefined, setOpts: React.Dispatch<React.SetStateAction<SDRef[]>>) {
  ev.preventDefault();

  let declId = ev.currentTarget.value;

  let form = ev.currentTarget.form;
  let decl = decls!.find(d => d.purposeDeclarationId! === declId);
  if (decl === undefined) {
    return;
  }

  form["name"].value = decl.name;
  form["purposeDeclarationId"].value = decl.purposeDeclarationId;
  form["description"].value = decl.description;
  if (decl.services !== undefined) {
    setOpts(decl.services);
  }
}

function declarationPrefill(t: Translator, sp: ClientPS, setOpts: React.Dispatch<React.SetStateAction<SDRef[]>>) {
  if (sp.mem.declTemplate === undefined || sp.mem.declTemplate.length === 0) {
    return <></>;
  }

  return (
    <div className="form-group text-danger">
      <label htmlFor="prefilled">{t('pd-prefill')}</label>
      <select
        className="form-control"
        id="prefilled"
        onChange={ev => prefillPurposeDeclaration(ev, sp.mem.declTemplate, setOpts)}
        defaultValue="">
        <option key="none" value="">{t('pd-choose-prefill')}</option>
        {
          sp.mem.declTemplate.map(dt => (
            <option key={dt.purposeDeclarationId} value={dt.purposeDeclarationId}>{dt.name!}</option>
          ))
        }
      </select>
    </div>
  );
}


const DeclarePurposePopup: React.FC<ClientViewProps> = ({ process, arena }) => {

  const t = (...k: string[]) => __({ arena, process }, k);
  const [show, setShow] = React.useState(false);
  const [sdrefs, setSDRefs] = React.useState([] as SDRef[]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{t('pd-declaring')}</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="row">
              <div className="col">
                <small>
                  {t('purpose-decl-intro')}
                </small>
              </div>
            </div>
            <div className="row border-bottom mt-4 mb-2">
              <div className="col">
                <h6>{t('declarer')} {business(address2org(process.name), "name")} ({address2org(process.name)})</h6>
                <input name="clientId" type="hidden" value={address2org(process.name)} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                {declarationPrefill(t, process, setSDRefs)}
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="dIdentifier">{t('pd-decl-id')}</label>
                  <input name="purposeDeclarationId" type="text" className="form-control" id="dIdentifier" />
                  <small id="dIdentifierHelp" className="form-text text-muted">{t('pd-decl-id-help')}</small>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="dName">{t('pd-decl-name')}</label>
                  <input name="name" type="text" className="form-control" id="dName" />
                  <small id="dNameHelp" className="form-text text-muted">{t('pd-decl-name-help')}</small>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="dataUsage">{t('pd-purpose')}</label>
                  <textarea name="description" className="form-control" id="dataUsage" rows={3} />
                  <small id="dataUsageHelp" className="form-text text-muted">{t('pd-purpose-help')}</small>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="services">{t('pd-services')}</label>
                  <select name="services"
                    className="custom-select"
                    multiple
                    id="services"
                    value={sdrefs.map(s => JSON.stringify(s))}
                    onChange={() => { /* nop. use X button and adding. */ }}
                  >
                    {
                      sdrefs.map(sdref => (
                        <option
                          key={JSON.stringify(sdref)}
                          value={JSON.stringify(sdref)}
                        >
                          {sdref.serviceProviderId} {sdref.serviceDeclarationId}
                        </option>
                      ))
                    }
                  </select>
                  <input name="_spId" placeholder={t('pd-sp-id')} size={10} />
                  <input name="_sdId" placeholder={t('pd-sd-id')} size={10} />
                  <button className="btn-sm" onClick={ev => addSDRef(ev, sdrefs, setSDRefs)}>+</button>
                  <button className="btn-sm" onClick={ev => { ev.preventDefault(); setSDRefs([]); }} title={t('clear')}>X</button>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <SimpleSend arena={arena} owner={process} onClick={() => handleClose()} text={t('declare')} message={declarePurpose()} />
          </Modal.Footer>
        </form>
      </Modal>
      <Button variant="dark" onClick={handleShow}>
        {t('declare')}
      </Button>
    </>
  )
}

/*
function countConsentRefs(cis: ClientPS): number {
    let out : number = 0;
    Object.keys(cis.mem.db.consentRefByUser).forEach(
        k => { out += Object.keys(cis.mem.db.consentRefByUser[k]).filter(
            pd => !!(cis.mem.db.consentRefByUser[k][pd])
        ).length; }
    );
    return out;
}
*/

function purposeView(t: any, purpose: ClientConfig, process: ClientPS, arena: any): React.ReactElement {
  const consentRef = (process.mem.db.consentRefByUser[process.mem.ui.user!] || {})[purpose.purposeDeclarationId];
  const consentRefDesc = (consentRef === undefined ? t('consent-ref-not-asked') : consentRef === null ? t('consent-ref-not-found') : consentRef);

  const dropdownToggle = React.forwardRef<HTMLButtonElement, ButtonProps & { onClick?: any }>(({ children, onClick }, ref) => (
    <button className="btn-link" onClick={onClick} ref={ref}>{children}</button>
  ));


  const updateConsentRefDropdown = React.forwardRef<HTMLDivElement, any>(
    ({ style, className }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
        >
          <div className="row no-gutters flex-nowrap">
            <form>
              <div className="form-group">
                <input type="text" size={6} className="form-control" name="consentReference" />
                <SimpleSend className="btn btn-sm btn-outline-secondary ml-1 dropdown-close"
                  owner={process} arena={arena}
                  message={updateConsentRefInCache({
                    purposeDeclarationId: purpose.purposeDeclarationId
                  })} text="Set" />
              </div>
            </form>
          </div>
        </div>
      );
    },
  );

  return (
    <span className="card small mt-2" key={purpose.purposeDeclarationId}>
      <div className="w-100 row no-gutters p-1 align-items-center">
        <div className="col-auto flex-fill">
          {t("service", purpose.purposeDeclarationId, "name")}<br />
          {t('consent-ref')}
          <Dropdown className="d-inline-block">
            <Dropdown.Toggle as={dropdownToggle} id={`consentref-update-dropdown-${purpose.purposeDeclarationId}`}>{consentRefDesc}</Dropdown.Toggle>
            <Dropdown.Menu as={updateConsentRefDropdown} />
          </Dropdown>
        </div>
        <div className="col-auto">
          <SimpleSend className="btn btn-sm btn-outline-secondary" owner={process} arena={arena} message={executeRequest({
            requestReference: generateRequestReference(),
            purposeId: purpose.purposeDeclarationId
          })} text="GO" title="Tee päring kõigile selle eesmärgi teenustele" />
          <SimpleSend className="btn btn-sm btn-outline-secondary ml-1" owner={process} arena={arena} message={fetchConsentReference({
            purposeDeclarationId: purpose.purposeDeclarationId
          })} text={t('fcr')}
            title="Küsi nõusolekuviide uuesti"
          />
          {consentRef &&
            <SimpleSend className="btn btn-sm btn-outline-secondary ml-1" owner={process} arena={arena} message={validateConsentRef({
              consentReference: consentRef
            })} text="vcr"
              title="Valideeri nõusolekuviide nõusolekuteenuses"
            />
          }
          {consentRef &&
            <SimpleSend className="btn btn-sm btn-outline-secondary ml-1" owner={process} arena={arena} message={updateConsentRefInCache({
              purposeDeclarationId: purpose.purposeDeclarationId
            })} text="rcr"
              title="Unusta see nõusolekuviide"
            />
          }

        </div>
      </div>
      { /*
            
            <table className="table">
                <tbody>
                    { purpose.services.map(
                        s => {
                            const resp = findFrom((process.mem.ui.response || []), { 
                                purposeDeclarationId: purpose.purposeDeclarationId,
                                serviceAddress: s.serviceAddress,
                                serviceName: s.serviceName,
                            });

                            return (
                                <tr>
                                    <td>{ s.serviceAddress }<br/>{ s.serviceName }</td>
                                    <td>{ resp && resp.requestReferenceId }</td>
                                    <td>{ resp && 
                                        (resp.data === null 
                                            ? t('response-has-no-data') 
                                            : <>{ resp.data.length }{t('data-items-returned')}</>
                                        )
                                    }</td>
                                    <td>
                                        <SimpleSend 
                                            className="btn btn-sm"
                                            owner={process}
                                            arena={arena}
                                            message={executeRequest({
                                                requestReference: generateRequestReference(),
                                                purposeId: purpose.purposeDeclarationId,
                                                serviceAddress: s.serviceAddress,
                                                serviceName: s.serviceName,
                                            })} text="GO"
                                            title="Ainult see päring"
                                        />
                                    </td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>

                    */}
    </span>
  )
}

function hasUser(cis: ClientPS): boolean {
  return cis.mem.ui.user !== undefined;
}

export const ClientRenderer: React.FC<ClientViewProps> = ({ process, arena }) => {
  const t = (...k: string[]) => __({ arena, process }, k);

  /* 
  const serviceCount = Object.keys(process.mem.db.purpose).length;
  const consentRefCount = countConsentRefs(process);
  const responseCount = (process.mem.ui.response || []).filter(r => r.data !== null).length;
  */

  return (<div>
    <p>{hasUser(process) ? `${t('active-user')} : ${process.mem.ui.user}` : `${t('no-active-user')}.`}</p>
    { /*
        <p className="small">
            { serviceCount } { t('services-configured') }<br/> 
            { consentRefCount } { t('consent-refs-cached') }{ consentRefCount > 0 && <SimpleSend className="btn-link mt-2" owner={process} arena={arena} message={dumpConsentRefCache()} text={ t('dump-consent-ref-cache') }/> }<br/>
            { responseCount } { t('responses-cached') }{ responseCount > 0 && <SimpleSend className="btn-link mt-2" owner={process} arena={arena} message={selectServiceMessage({ service: process.mem.ui.service })} text={ t('dump-response-cache') }/> }
          
        </p>
         */ }
    <div className="row mx-1">
      <EnduserUI arena={arena} process={process} />
      <DeclarePurposePopup arena={arena} process={process} />
    </div>
    {hasUser(process) && process.mem.config.map(p => purposeView(t, p, process, arena))}
  </div>);
}


