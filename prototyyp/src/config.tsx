import { ProcessState } from "./process/Base";
import { createArena } from "./process/Arena";
import { fromArray } from "./byNameStore";
import { TheatreState } from "./process/Theatre";
import { LogRendererMap, addLogRenderers } from "./components/LogRows";
import { createDemoArena } from "./config/demo";

// initial configuration

type ConfigType = {
  defaultArena: string;
  arenas: { [name: string]: { processes: ProcessState<any>[]; logRenderers?: LogRendererMap }; }
};

const config: ConfigType = {
  defaultArena: "demo",
  // arenas: arena -> [process]
  arenas: {
    "demo": createDemoArena(),
  }
};

export function initialTheatre(): TheatreState {
  return {
    name: "theatre",
    arenas: fromArray(Object.keys(config.arenas).map(a => createArena(a, config.arenas[a].processes))),
    active: config.defaultArena,
  }
}

Object.keys(config.arenas).forEach(arena => {
  if (config.arenas[arena].logRenderers !== undefined) {
    addLogRenderers(arena, config.arenas[arena].logRenderers!);
  }
})
