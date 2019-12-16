import { Store } from 'redux';
import { InstanceName, ViewName, MESSAGE, Message, Payload, ProcessImplName, ProcessState } from './process/Base';
import { AppState } from './store';
import { __, Translator, TranslatorWithParams } from './i18n';

export const STATE_UPDATE = "STATE_UPDATE";
export const INITIALIZED = "INITIALIZED";

type MessagingTarget = Window | ServiceWorker | null;

export class StateUpdateMessage<P> {
  type!: typeof STATE_UPDATE;
  name!: InstanceName;
  impl!: ProcessImplName;
  view!: ViewName;
  mem?: P;
  statusUpdateChannel?: number;
}

function selectProcess(state: AppState, arena: string, process: InstanceName): StateUpdateMessage<any> {
  let ps = state.theatre.arenas.byName[arena].process.byName[process];
  if (ps === undefined) {
    // no such process?
    return { type: STATE_UPDATE, name: process, impl: "", view: "" };
  }
  return { type: STATE_UPDATE, name: process, impl: ps.type, view: ps.view, mem: ps.mem }
}

class StateUpdater {
  arena: string;
  process: InstanceName;
  store: Store;
  url: URL;
  ui: MessagingTarget;

  _cachedState: any;
  _storeUnsubscriber: any = null;
  _messageListener: ((message: MessageEvent) => any) | null = null;
  _channel: number;

  constructor(arena: string, process: InstanceName, store: Store, url: string, ui?: MessagingTarget) {
    this.arena = arena;
    this.process = process;
    this.store = store;
    this.url = new URL(url, window.location.href);
    if (ui === undefined) {
      this.ui = window.open(url, `${arena} - ${process}`);
    } else {
      this.ui = ui;
    }
    this._channel = Math.random();
  }

  registerListeners() {
    this._storeUnsubscriber = this.store.subscribe(() => { this.stateChanged(); })
    this._messageListener = (message) => { this.processMessage(message); };
    window.addEventListener("message", this._messageListener);
    return this;
  }

  unregisterListeners() {
    this._storeUnsubscriber();
    this._storeUnsubscriber = null;

    if (this._messageListener !== null) {
      window.removeEventListener("message", this._messageListener);
      this._messageListener = null;
    }

    return this;
  }

  stateChanged() {
    let state = selectProcess(this.store.getState(), this.arena, this.process);
    if (state !== this._cachedState) {
      // postMessage originiga, mis ei ole "*" ei tööta ffga?
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Example lõpp
      try {
        this.ui!.postMessage({ ...state, statusUpdateChannel: this._channel }, this.url.origin);
      } catch (e) {
        console.error("Error posting message, stopping", e);
        this.unregisterListeners();
      }
      this._cachedState = state;
    }
    return this;
  }

  processMessage(msg: MessageEvent): void {
    switch (msg.data.type) {
      case INITIALIZED:
        this._cachedState = undefined; // force state update
        this.stateChanged();
        return;

      default:
        if (msg.data.statusUpdateChannel !== this._channel) {
          // not for us. 
          return;
        }

        // only messages to self.
        this.store.dispatch({
          type: MESSAGE,
          arena: this.arena,
          sender: this.process,
          receivers: [this.process],
          message: { ...msg.data, statusUpdateChannel: undefined },
        } as Message<Payload>);
    }
  }
}

const registeredUpdaters: StateUpdater[] = [];

export function registerGlobalListener(store: Store) {
  window.addEventListener("message", ev => {
    if (ev.data.type === INITIALIZED) {
      let [arena, process] = ev.data.target.split(' - ');
      let url = ev.data.url;
      if (registeredUpdaters.find(su => su.arena === arena && su.process === process && su.ui === ev.source) === undefined) {
        console.log("Unregistered childwindow, registering: ", ev.data);
        registeredUpdaters.push(
          new StateUpdater(arena, process, store, url, ev.source as Window)
            .registerListeners()
            .stateChanged()
        );
        ev.preventDefault();
      }
    }
  });
}

export function launchUI(arena: string, process: InstanceName, url: string, store: Store) {
  registeredUpdaters.push(new StateUpdater(arena, process, store, url).registerListeners());
}


export class BackendStateUpdater<S, C extends BackendAPI<S>> {
  state!: StateUpdateMessage<S>;

  setter: (newState: BackendAPI<S>) => void;
  caster: { new(s: StateUpdateMessage<S>): C };

  constructor(setter: (newState: BackendAPI<S>) => void, caster: { new(s: StateUpdateMessage<S>): C }) {
    this.setter = setter;
    this.caster = caster;
    console.log("setting listener");
    window.addEventListener("message", (ev) => { this.receiveNewState(ev); });
  }

  setState(newState: StateUpdateMessage<S>) {
    console.log("updating state:", newState);
    this.state = newState;
    this.setter(new this.caster(newState).withUpdater(this));
  }

  resetState() {
    this.postMessage(INITIALIZED, { target: window.name, url: window.location.href });
  }

  postMessage(type: string, message?: any) {
    if (window.opener === null) {
      this.setState({ type: STATE_UPDATE, view: "", mem: { "error": "NO OPENER WINDOW", ui: {} } } as any);
      return;
    }

    const channelId = this.state !== undefined ? { statusUpdateChannel: this.state.statusUpdateChannel } : {};

    let msg = Object.assign({}, (message === undefined ? {} : message), { type }, channelId);
    console.log("posting message:", msg);
    window.opener.postMessage(msg);
  }

  receiveNewState(ev: MessageEvent) {
    if (ev.data.type === STATE_UPDATE) {
      this.setState(ev.data);
    }
  }
}

export class BackendAPI<S> extends StateUpdateMessage<S> {
  updater!: BackendStateUpdater<S, BackendAPI<S>>;

  constructor(msg?: StateUpdateMessage<S>) {
    super();
    Object.assign(this, msg);
  }

  withUpdater(updater: BackendStateUpdater<S, BackendAPI<S>>) {
    this.updater = updater;
    return this;
  }

  post(msg: () => Payload) {
    let m = msg();
    this.updater.postMessage(m.type, m);
  }


  arena(): string {
    return window.name.split(" - ")[0];
  }

  tRefs(): [Translator, TranslatorWithParams] {
    let _this = this;
    let arena = this.arena();
    let props = { arena: arena, process: { name: _this.name, type: _this.impl } as ProcessState<any> };

    return [(...k) => __(props, k), (k, o) => __(props, k, o)];
  }
}
