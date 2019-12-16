import { Store } from 'redux';
import { ProcessState, MESSAGE, Message, reduceMessage, Payload } from './Base';
import { ByNameStore, addByName, reduceByName, fromArray } from '../byNameStore';


// Arena -- ports protsesse, mis omavahel sõnumeid vahetavad. 
// arenal on nimi?

const MESSAGE_DELAY = 300; // ms


type ProcessStore = ByNameStore<ProcessState<any>>;
const createProcess: (old: ProcessStore, init: ProcessState<any>) => ProcessStore = addByName;
const reduceProcesses: (old: ProcessStore, reducer: (p: ProcessState<any>) => ProcessState<any>) => ProcessStore = reduceByName;

export interface ArenaState {
  name: string;
  process: ProcessStore;
  log: Message<any>[];
}

export function createArena(name: string, ps: ProcessState<any>[]): ArenaState {
  return { name: name, process: fromArray(ps), log: [] };
}

export const CREATE_PROCESS = "Arena/CREATE_PROCESS";

export interface CreateProcess {
  type: typeof CREATE_PROCESS;
  arena: string;
  process: ProcessState<any>;
}

export const FLUSH_QUEUE = "Arena/FLUSH_QUEUE";
export interface FlushQueue {
  type: typeof FLUSH_QUEUE;
  arena: string;
}

export type ArenaActionType = CreateProcess | FlushQueue | Message<any>;


export function reduceArena(state: ArenaState, action: ArenaActionType): ArenaState {
  if (action.arena !== state.name) {
    return state;
  }

  switch (action.type) {
    case CREATE_PROCESS:
      return { ...state, process: createProcess(state.process, action.process) };
    case FLUSH_QUEUE:
      return { ...state, process: reduceProcesses(state.process, (p) => ({ ...p, queue: [] })) };
    case MESSAGE:
      return { ...state, process: reduceProcesses(state.process, (p) => reduceMessage(p, action)), log: state.log.concat([action]) };
    default:
      return state;
  }
}

function getQueuedForArena(p: ProcessStore): Message<any>[] {
  return p.allNames.map((n) => p.byName[n].queue).flat(1).filter((d) => d !== undefined);
}

function getQueued(arenas: ByNameStore<ArenaState>): Message<any>[] {
  return arenas.allNames.map(n => getQueuedForArena(arenas.byName[n].process)).flat(1);
}

export function fixNowAndRandom<P extends Payload>(m: Message<P>): Message<P> {
  return { ...m, now: (Date.now() / 1000) | 0, random: "" + Math.random() };
}

export function queueListener(store: Store) {
  let queued = getQueued(store.getState().theatre.arenas);

  if (queued.length === 0) {
    return;
  }

  let arenas = Object.keys(Object.assign({}, ...queued.map((m) => ({ [m.arena]: 1 }))))

  arenas.forEach((a) => store.dispatch({ type: FLUSH_QUEUE, arena: a } as FlushQueue));

  // queued.forEach((m) => store.dispatch(m));

  const delayedSender = (store: Store, queue: Message<any>[]) => {
    if (queue.length > 0) {
      store.dispatch(fixNowAndRandom(queue.shift()!))
      window.setTimeout(() => { delayedSender(store, queue); }, MESSAGE_DELAY);
    }
  };

  window.setTimeout(() => { delayedSender(store, queued); }, MESSAGE_DELAY);
}
