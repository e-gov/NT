import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { queueListener } from "./process/Arena";
import { reduceTheatre } from "./process/Theatre";
import { registerGlobalListener } from "./postMessage";

const rootReducer = combineReducers({
  theatre: reduceTheatre,
});


export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  store.subscribe(() => queueListener(store));

  registerGlobalListener(store);

  return store;
}


