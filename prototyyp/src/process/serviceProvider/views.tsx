import React from "react";
import { Modal, Button } from "react-bootstrap";

import { ProcessAndArena } from "../Base";
import { SimpleSend } from "../../components/SendButton";

import { ServiceProviderState, ServiceProviderPS, ServiceDeclarationTemplate } from "./types";
import { declareService, addData } from './messages';
import { __, business, Translator } from "../../i18n";
import { address2org } from "../../util";

export interface ServiceProviderViewProps extends ProcessAndArena<ServiceProviderState> {
  process: ServiceProviderPS;
}

const updateMaxDuration = (ev: any) => {
  let f = ev.currentTarget.form!;
  let v = f["consentMaxDurationSeconds"].value =
    (f["_mdValue"].value - 0) * (f["_mdUnit"].value) * 24 * 3600;
  f["_mdValue"].className = "form-control" + (v < 1 ? " is-invalid" : "");
};

function prefillServiceDeclaration(ev: any, decls?: ServiceDeclarationTemplate[]) {
  ev.preventDefault();

  let declId = ev.currentTarget.value;

  let form = ev.currentTarget.form;
  let decl = decls!.find(d => d.serviceDeclarationId! === declId);
  if (decl === undefined) {
    return;
  }

  form["name"].value = decl.name;
  form["serviceDeclarationId"].value = decl.serviceDeclarationId;
  form["technicalDescription"].value = decl.technicalDescription;
  form["description"].value = decl.description;
  form["needSignature"].checked = decl.needSignature === true;
  let md = decl.consentMaxDurationSeconds || (1 * 365 * 24 * 3600);
  md = ((md / (24 * 3600)) | 0);
  if (md > 365) {
    form["_mdValue"].value = ((md / 365) | 0);
    form["_mdUnit"].value = 365;
  } else if (md > 30) {
    form["_mdValue"].value = ((md / 30) | 0);
    form["_mdUnit"].value = 30;
  } else {
    form["_mdValue"].value = md;
    form["_mdUnit"].value = 1;
  }

  updateMaxDuration({ currentTarget: form["consentMaxDurationSeconds"] });
}

function declarationPrefill(t: Translator, sp: ServiceProviderPS) {
  if (sp.mem.declTemplate === undefined || sp.mem.declTemplate.length === 0) {
    return <></>;
  }

  return (
    <div className="form-group text-danger">
      <label htmlFor="prefilled">{t('sd-prefill')}</label>
      <select className="form-control" id="prefilled" onChange={ev => prefillServiceDeclaration(ev, sp.mem.declTemplate)} defaultValue="">
        <option key="none" value="">{t('sd-choose-prefill')}</option>
        {
          sp.mem.declTemplate.map(dt => (
            <option key={dt.serviceDeclarationId} value={dt.serviceDeclarationId}>{dt.name!}</option>
          ))
        }
      </select>
    </div>
  );
}

const DeclareServicePopup: React.FC<ServiceProviderViewProps> = ({ process, arena }) => {

  const t = (...k: string[]) => __({ process, arena }, k);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{t('declare-service-declaration')}</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="row">
              <div className="col">
                <small>
                  {t('service-decl-intro')}
                </small>
              </div>
            </div>

            <div className="row border-bottom mt-4 mb-2">
              <div className="col">
                <h6>{t('declarer')} {business(address2org(process.name), "name")} ({address2org(process.name)})</h6>
                <input name="serviceProviderId" type="hidden" value={address2org(process.name)} />
              </div>
            </div>

            <div className="row">
              <div className="col">
                {declarationPrefill(t, process)}
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="sdIdentifier">{t('service-declaration-id')}</label>
                  <input name="serviceDeclarationId" type="text" className="form-control" id="sdIdentifier" />
                  <small id="sdIdentifierHelp" className="form-text text-muted">{t('service-declaration-id-help')}</small>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="sdName">{t('service-declaration-name')}</label>
                  <input name="name" type="text" className="form-control" id="sdName" />
                  <small id="sdNameHelp" className="form-text text-muted">{t('service-declaration-name-help')}</small>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="sdTechDescription">{t('sd-tech-description')}</label>
                  <textarea name="technicalDescription" className="form-control" id="sdTechDescription" rows={3} />
                  <small id="sdTechDescriptionHelp" className="form-text text-muted">{t('sd-tech-description-help')}</small>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="sdDescription">{t('sd-description')}</label>
                  <textarea name="description" className="form-control" id="sdDescription" rows={3} />
                  <small id="sdDescriptionHelp" className="form-text text-muted">{t('sd-description-help')}</small>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <input type="hidden" name="consentMaxDurationSeconds" value={1 * 365 * 24 * 3600} />
                  <label htmlFor="maxDuration">{t('sd-max-validity')}</label>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <input type="number" size={3} className="form-control" id="maxDuration" name="_mdValue" onChange={updateMaxDuration} defaultValue={1} />
                    </div>
                    <div className="form-group col-md">
                      <select name="_mdUnit" className="form-control input-group-append" onChange={updateMaxDuration}>
                        <option value={365}>{t('year')}</option>
                        <option value={30}>{t('month')}</option>
                        <option value={1}>{t('day')}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input name="needSignature" className="form-check-input" type="checkbox" id="signature" value="true|false" />
                    <label className="form-check-label" htmlFor="signature">{t('sd-need-signature')}</label>
                    <small id="signatureHelp" className="form-text text-muted">{t('sd-need-signature-help')}</small>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>{t('close')}</Button>
            <SimpleSend arena={arena} owner={process} onClick={() => handleClose()} text={t('declare')} message={declareService()} />
          </Modal.Footer>
        </form>
      </Modal>
      <Button variant="dark" onClick={handleShow}>
        {t('declare')}
      </Button>

    </>
  )
}


function cutAt(s: string, n: number) {
  if (s && s.length < n) {
    return s;
  }

  return <span onClick={ev => alert(s)}>{s.substring(0, n) + ".."}</span>;
}

export const ServiceProviderRenderer: React.FC<ServiceProviderViewProps> = ({ process, arena }) => {
  const t = (...k: string[]) => __({ process, arena }, k);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const allValues: string[] = (() => {
    let values = process.mem.services.map(s => s.returnedDatatypes).flat().concat(process.mem.db.map(r => r.type));
    values.sort();
    let out: string[] = [];
    values.forEach((v) => { if (out.length === 0 || v !== out[out.length - 1]) out.push(v); });
    return out;
  })();
  return (<div>
    <p className="small">
      {/* process.mem.services.length } { t('services-defined') }<br/> //FIXME: Confusing for demo audience?*/}
      {process.mem.db.length} <button className="btn-link" onClick={handleShow}>{t('records-in-db')}</button>
    </p>
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>{t('database')}: {t('title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <table className="table">
            <thead>
              <tr>
                <th className="border-top-0">id</th>
                <th className="border-top-0">type</th>
                <th className="border-top-0">subject</th>
                <th className="border-top-0">data</th>
                <th className="border-top-0"></th>
              </tr>
            </thead>
            <tbody>
              {
                process.mem.db.map(r => (
                  <tr key={r.key}>
                    <td>{r.key}</td>
                    <td>{r.type}</td>
                    <td>{r.subject}</td>
                    <td>{cutAt(JSON.stringify(r.data, undefined, " "), 40)}</td>
                    <td>
                      <SimpleSend arena={arena} owner={process} text="-" message={
                        addData({ key: r.key, datatype: undefined, subject: undefined, data: undefined })
                      } />
                    </td>
                  </tr>
                ))
              }
              <tr key="add">
                <td><input className="form-control" type="text" size={10} name="key" defaultValue={(Math.random() * 10000) | 0} /></td>
                <td><input className="form-control" type="text" size={8} name="datatype"
                  defaultValue={allValues.length > 0 ? allValues[0] : ""} /></td>
                <td><input className="form-control" type="text" size={10} name="subject" /></td>
                <td><input className="form-control" type="text" size={10} name="data" /></td>
                <td><SimpleSend arena={arena} owner={process} text="+" message={addData()} onClick={(ev) => {
                  let f = ev.currentTarget.form;
                  f.key.value = (Math.random() * 10000) | 0;
                  f.datatype.value = "";
                  f.subject.value = "";
                  f.data.value = "";
                }} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>{t('close')}</Button>
      </Modal.Footer>
    </Modal>
    <DeclareServicePopup arena={arena} process={process} />
  </div>);
}

