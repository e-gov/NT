import { AnyAction } from 'redux';

export type InstanceName = string;
export type ProcessImplName = string;
export type ViewName = string;

// state

export interface ProcessState<S> {
  name: string; // instantsi nimi
  title: string;
  type: ProcessImplName; // implementatsiooni nimi?
  view: ViewName; // "olek", tegelikult defineerib vaate
  mem: S; // sisuline olek
  queue: Message<any>[]; // outbound queue, reduceritest kasutamiseks?
}

// sõnumi-action

export const MESSAGE = "Process/SEND_MESSAGE";

export interface Message<PL extends Payload> extends AnyAction {
  type: typeof MESSAGE;
  arena: string;
  sender: string;
  receivers: string[];
  message: PL;
  now?: number;
  random?: string;
}

export interface Payload {
  type: string;
}

export interface ErrorPayload extends Payload {
  type: "error";
  error: string;
}

export interface OKPayload extends Payload {
  type: "ack"
  response: "OK";
}

export type MessageHandler<S, M extends Payload> = (process: ProcessState<S>, action: Message<M>) => ProcessState<S>;

const handlers: { [impl: string]: { [type: string]: MessageHandler<any, any> } } = {};

export function addHandler<P extends Payload>(impl: ProcessImplName, type: string, handler: MessageHandler<any, P>) {
  if (handlers[impl] === undefined) {
    handlers[impl] = {};
  }

  handlers[impl][type] = handler;
}

export function addHandlerClass<P extends Payload, T extends GenericMessageHandler<any, ProcessState<any>, P, T>>(impl: ProcessImplName, c: { new(): T }) {
  let handler = new c();
  addHandler<P>(impl, handler.name, (p, a) => handler.handle(p, a));
  return (obj?: Partial<P>) => ((values?: Partial<P>) => handler.createMessage({ ...(values === undefined ? {} : values), ...(obj === undefined ? {} : obj) }));
}

export function reduceMessage<T>(process: ProcessState<T>, action: Message<Payload>): ProcessState<T> {
  //	console.log(`reduceMessage ${JSON.stringify(process)}, ${JSON.stringify(action)}`);
  if (action.type !== MESSAGE || !action.receivers.includes(process.name)) {
    return process;
  }

  if (handlers[process.type] === undefined) {
    console.error(`No handler for ${process.name} (${process.type})`);
    return process;
  }

  if (handlers[process.type][action.message.type] === undefined) {
    console.error(`No handler for ${process.name} (${process.type}) for message ${action.message.type} (${JSON.stringify(action.message)})`);
    return process;
  }

  return handlers[process.type][action.message.type](process, action);
}

export function message<M extends Payload>(arena: string, sender: ProcessState<any>, receivers: string[], message: M): Message<M> {
  return {
    type: MESSAGE,
    arena: arena,
    sender: sender.name,
    receivers: receivers.length === 0 ? [sender.name] : receivers,
    message: message
  };
}

export abstract class GenericMessageHandler<S, PS extends ProcessState<S>, M extends Payload, GMH extends GenericMessageHandler<S, PS, M, GMH>> {
  abstract name: string;

  createMessage(obj: any): (M & { type: GMH["name"] }) { return { ...obj, type: this.name }; };
  handle(process: PS, action: Message<M>): PS { return { ...process, mem: this.updateMem(process.mem, action) }; };
  updateMem(mem: S, action: Message<M>): S { return mem; };

  send<NM extends Payload>(process: PS, message: Message<NM>): PS {
    return { ...process, queue: process.queue.concat(message) };
  }

  withResponse<NM extends Payload>(process: PS, action: Message<M>, payload: NM): PS {
    return this.send(process, message<NM>(action.arena, process, [action.sender], payload));
  }

  withErrorResponse(process: PS, action: Message<M>, error: string, extra?: any) {
    return this.withResponse<ErrorPayload>(process, action, { type: "error", error: error, ...extra });
  }

  withOkResponse(process: PS, action: Message<M>) {
    return this.withResponse<OKPayload>(process, action, { type: "ack", response: "OK" });
  }

}


// UId
export const uiMap: { [type: string /* ProcessImplName */]: string /* URL */ } = {};

export function addUi(impl: ProcessImplName, url: string) {
  uiMap[impl] = url;
}

// renderdus

export interface ProcessAndArena<S> {
  process: ProcessState<S>;
  arena: string;
}

export type ProcessRenderer<S> = React.FC<ProcessAndArena<S>> | ((props: ProcessAndArena<S>) => string);

const defaultRender: ProcessRenderer<any> = ({ process }: ProcessAndArena<any>) => JSON.stringify(process.mem);

const renderers: { [impl: string /* ProcessImplName */]: { [view: string /* ViewName */]: ProcessRenderer<any> } } = {};

export function addRenderer(impl: ProcessImplName, view: ViewName, renderer: ProcessRenderer<any>) {
  if (renderers[impl] === undefined) {
    renderers[impl] = {};
  }

  renderers[impl][view] = renderer;
}

export function findRenderer<S>(process: ProcessState<S>): ProcessRenderer<S> {
  if (renderers[process.type] === undefined) {
    console.error(`No renderer for ${process.type}`);
    return defaultRender;
  }

  if (renderers[process.type][process.view] === undefined) {
    console.error(`No renderer for ${process.type} and view ${process.view}`);
    return defaultRender;
  }

  return renderers[process.type][process.view];
}

export function updateMem<S>(process: ProcessState<S>, mem: Partial<S>): ProcessState<S> {
  return { ...process, mem: { ...process.mem, ...mem } };
}

export function updateDb<T, S extends ({ db: T; })>(process: ProcessState<S>, newdb: Partial<T>): ProcessState<S> {
  return updateMem<S>(process, { db: { ...process.mem.db, ...newdb } } as Partial<S>);
}