import { ArenaState, reduceArena, ArenaActionType } from './Arena';
import { ByNameStore, reduceByName } from '../byNameStore';
import { initialTheatre } from '../config';
import { AnyAction } from 'redux';
import { AppState } from '../store';

type Arenas = ByNameStore<ArenaState>;

export interface TheatreState {
  name: string;
  arenas: Arenas;
  active: string;
}

export function arenaFromState(state: AppState, arena: string) {
  return state.theatre.arenas.byName[arena];
}

const SELECT_ARENA = "Theatre/SELECT_ARENA";
interface SelectArenaAction extends AnyAction {
  type: typeof SELECT_ARENA;
  arena: string;
}

export function selectArenaMessage(arena: string): SelectArenaAction {
  return { type: SELECT_ARENA, arena: arena };
}

export function reduceTheatre(state: TheatreState = initialTheatre(), action: any): TheatreState {
  switch (action.type) {
    case SELECT_ARENA:
      return ({ ...state, active: action.arena });
    default:
      return ({ ...state, arenas: reduceByName(state.arenas, (a) => reduceArena(a, action as ArenaActionType)) });
  }
}

