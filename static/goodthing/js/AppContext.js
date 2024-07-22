// @flow
//---------------------------------------------------------------------
// PREACT
//---------------------------------------------------------------------
import { h, render, createContext } from "../web_modules/preact.js";
import { useReducer } from "../web_modules/preact/hooks.js";
import { html } from "../web_modules/htm/preact.js";
import Router from "../web_modules/preact-router.js";
//---------------------------------------------------------------------
// 3RD PARTY
//---------------------------------------------------------------------
import produce from "../web_modules/immer.js";
//---------------------------------------------------------------------
// ACTIONS
//---------------------------------------------------------------------
import conf from "./config.js";
import stateStorage from "./state_storage.js";

// A context for the state global management
// $FlowFixMe
const AppContext = createContext([{}, () => {}]);

const reducer = (
  state /*: { count: number } */,
  action /*: { type: string, payload: { somevalue?: any } } */,
) =>
  // immer is for immutables ~ https://www.pika.dev/npm/@vve/immer
  produce(state, (draft) => {
    if (action.type === "reset") {
      draft.count = action.payload.somevalue;
    }
  });
const AppProvider /*: Function */ = (props /*: {
  children: Array<Function>,
} */) => {
  const [state, dispatch] = useReducer(reducer, {});

  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    // If this is the first reload, load the state from the stateStorage.
    if (JSON.stringify(state) === JSON.stringify({})) {
      //
      // Load data from stateStorage
      // https://developer.mozilla.org/en-US/docs/Web/API/Storage
      let sessionStateString /*:
        | string
        | null
        | typeof undefined */ = stateStorage.getItem("state", state.rememberme);
      if (
        JSON.stringify(state) === JSON.stringify({}) &&
        (typeof sessionStateString === "undefined" ||
          sessionStateString === null)
      ) {
        // The state is, as yet, unset and there
        // was nothing in the session state, so
        // try the localStorage
        sessionStateString = stateStorage.getItem("state", true);
      }

      // To stop Flow complaining about potentially passing
      /// `null` or `typeof undefined` to JSON.parse()
      if (
        typeof sessionStateString !== "undefined" &&
        sessionStateString !== null
      ) {
        // The string coming from sessionStateStorage might
        // not be JSON.
        try {
          dispatch({ type: "reset", payload: JSON.parse(sessionStateString) });
        } catch (e) {
          stateStorage.clear(state.rememberme);
        }
      }
    }

    if (JSON.stringify(state) !== JSON.stringify({})) {
      // Store the state in stateStorage on every render-loop
      stateStorage.setItem("state", JSON.stringify(state), conf.REMEMBER_ME);
    }
  }

  return html`
      <${AppContext.Provider} value=${[state, dispatch]}>
				${props.children}
      </${AppContext.Provider}>
  `;
};

export { AppContext, AppProvider };
