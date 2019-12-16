import * as React from 'react';
import { connect } from 'react-redux';
import { ProcessState, Payload, message, Message } from '../process/Base';
import { fixNowAndRandom } from './../process/Arena';

// a button that sends a process-to-process(es) message. 
// if in a form, then values from most of the form elements 
// will be converted to message parameters with names of the 
// elements as keys (input with name zzz will be converted
// to { "zzz": "" }).
// if value starts with {, it will be parsed as JSON
// for select-multiple the value is a list of values of all
// selected options.
// for checkbox the value is split on the first | and first half 
// will be used if box is checked and the other half (if present) 
// if not.

interface SendProps<S, M extends Payload> {
  arena: string;
  owner: ProcessState<S>;
  target?: string | string[];
  className?: string;
  message: (values?: any) => M;
  text: string;
  messageToAction: (props: SendProps<S, M>, values?: any) => Message<M>;
  onClick?: (ev?: any) => void;
  title?: string;
}

function fixTarget(owner: ProcessState<any>, target?: string | string[]): string[] {
  if (target !== undefined && typeof target === 'string') {
    return [target];
  }

  if (target === undefined || target.length === 0) {
    return [owner.name];
  }

  return target;
}

function messageToAction<S, M extends Payload>(props: SendProps<S, M>, values: Partial<M>): Message<M> {
  return fixNowAndRandom<M>(message(
    props.arena,
    props.owner,
    fixTarget(props.owner, props.target),
    props.message(values)
  ));
}

function parseOrRaw(s: any): any {
  if (typeof s === "string" && s.startsWith("{")) {
    return JSON.parse(s);
  }

  return s;
}

function values(f: HTMLFormElement): any {
  if (f === undefined || f === null) {
    return {};
  }

  return Array.from(f.elements)
    .map((u, i) => f.elements[i] as any as {
      name: string;
      value: any;
      type: string;
      options?: HTMLOptionsCollection;
      checked?: boolean;
    })
    .filter(e => (e.name !== undefined && e.name !== null && e.name !== "" && !e.name.startsWith("_")))
    .map(e => {
      if (e.type === "select-multiple") {
        let out: any[] = [];
        let i: number;
        for (i = 0; i < e.options!.length; i++) {
          if (e.options![i].selected) {
            out.push(parseOrRaw(e.options![i].value));
          }
        }
        return { [e.name]: out };
      }

      if (e.type === "checkbox") {
        let values: (string | undefined)[] = e.value.split("|", 2);
        if (values.length === 1) {
          values.push(undefined);
        }
        return { [e.name]: parseOrRaw(values[e.checked ? 0 : 1]) }
      }
      return { [e.name]: parseOrRaw(e.value) }
    })
    .reduce((o, c) => ({ ...o, ...c }), {});
}

class Send<S, M extends Payload> extends React.Component<SendProps<S, M>> {

  handleClick(ev: any) {
    ev.preventDefault();
    this.props.messageToAction(this.props, values(ev.currentTarget.form));
    if (this.props.onClick) this.props.onClick(ev);
  };

  render() {
    return <button
      className={this.props.className === undefined ? "btn btn-primary" : this.props.className}
      onClick={(ev) => this.handleClick(ev)}
      title={this.props.title}
    >{this.props.text}</button>
  }
}

export const SimpleSend = connect(null, { messageToAction })(Send);

