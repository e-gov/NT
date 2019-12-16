import * as React from 'react';
import { connect } from 'react-redux';
import { ProcessState, Message, Payload } from '../process/Base';
import { AppState } from '../store';
import { arenaFromState } from '../process/Theatre';
import { LogRow, receivers, formatLogtime } from './LogRows';
import { Modal, Button, ModalFooter } from 'react-bootstrap';
import { __ } from '../i18n';

interface LogProps {
  arena: string;
  owner?: ProcessState<any>;
  showSelf?: boolean;
  maxRows?: number;
  rows?: Message<any>[];
  t?: any;
  className?: string;
  scroll?: boolean;
}


class LogView extends React.Component<LogProps> {

  ref: React.RefObject<any> = React.createRef();

  state = {
    msg: undefined as (Message<any> | undefined)
  }

  closePopup() {
    this.setState({ msg: undefined });
  }

  showPopup(msg: Message<any>) {
    this.setState({ msg });
  }

  componentDidUpdate() {
    this.scollToBottom();
  }

  componentDidMount() {
    if (this.props.scroll) {
      setTimeout(() => {
        this.scollToBottom();
      })
    }
  }

  scollToBottom() {
    if (this.ref.current) this.ref.current.scroll(0, this.ref.current.scrollHeight);
  }

  filterFn: (msg: Message<Payload>) => boolean = (msg) => {
    if (msg.receivers.length === 1 && msg.receivers.includes(msg.sender) && !this.props.showSelf) {
      return false;
    }

    if (this.props.owner !== undefined && !(msg.sender === this.props.owner.name || msg.receivers.includes(this.props.owner.name))) {
      return false;
    }

    return true;
  }

  formatLogLine(msg: Message<Payload>, index: number, owner?: ProcessState<any>) {
    const _this = this;
    return (<li className="log-item" key={index}>
      {LogRow(this.props.arena, index, msg, owner, msg => { _this.showPopup(msg) })}
    </li>);
  }

  popup() {
    const msg = this.state.msg;
    const _this = this;
    const t = this.props.t || ((a: string) => a);

    return (
      <Modal show={msg !== undefined} onHide={() => _this.closePopup()} size="lg">
        <Modal.Body>
          {msg === undefined ? "No message?" : (
            <div>
              <div className="log-details">
                <div className="row">
                  <div className="col">
                    <h4>{t('msg-log.sender')}:</h4>
                    <p>{msg!.sender}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h4>{t('msg-log.receivers')}:</h4>
                    <p>{receivers(msg!.receivers)}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h4>{t('msg-log.type')}:</h4>
                    <p>{msg!.message.type}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h4>{t('msg-log.time')}:</h4>
                    <p>{formatLogtime(msg.now!)}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <pre className="text-left">
                    {JSON.stringify({
                      ...msg,
                      type: undefined,
                      statusUpdateChannel: undefined,
                      arena: undefined,
                      now: undefined,
                      random: undefined,
                    }, undefined, "  ")}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(ev: any) => _this.closePopup()}>{t('close')}</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const logLines = (this.props.rows!
      .filter(this.filterFn)
      .slice(-(this.props.maxRows || 4)));

    if (logLines.length === 0) {
      return (
        <span className="no-msg-log">
          {__({ arena: this.props.arena, process: (this.props.owner || {}) as ProcessState<any> }, ["no-log-lines"])}
        </span>
      );
    }

    return (
      <>
        {this.popup()}
        <samp className="msg-log" ref={this.ref}>
          <ul className="log-view">
            {logLines.map((line, index) => this.formatLogLine(line, index, this.props.owner))}
          </ul>
        </samp>
      </>
    );
  }
}

function mapStateToProps(state: AppState, ownProps: LogProps) {
  return { rows: arenaFromState(state, ownProps.arena).log };
}

export const MessageLog = connect(mapStateToProps)(LogView);


export class LogButton extends React.PureComponent<LogProps, { show: boolean }> {
  state = { show: false };

  render() {
    const t = this.props.t;
    return (<>
      <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="lg">
        <Modal.Header>
          <Modal.Title>{__({ arena: this.props.arena, process: this.props.owner! }, ["log"])}: {
            this.props.owner !== undefined ? __({ arena: this.props.arena, process: this.props.owner }, ["title"]) : <></>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="msg-log-popup">
            <MessageLog {...this.props} scroll={true} />
          </div>
        </Modal.Body>
        <ModalFooter>
          <Button variant="secondary" onClick={(ev: any) => this.setState({ show: false })}>{t('close')}</Button>
        </ModalFooter>
      </Modal>
      <Button className={this.props.className} onClick={(ev: any) => this.setState({ show: true })}>{this.props.children}</Button>
    </>)
  }
}