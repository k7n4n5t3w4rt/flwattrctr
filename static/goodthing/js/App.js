// @flow
//---------------------------------------------------------------------
// “REACT” - It's an alias for preact/compat
//---------------------------------------------------------------------
import React from "../web_modules/react.js";
import ReactDom from "../web_modules/react-dom.js";
import { useEffect, useState } from "../web_modules/react.js";
//---------------------------------------------------------------------
// PREACT
//---------------------------------------------------------------------
import Router from "../web_modules/preact-router.js";
import { route } from "../web_modules/preact-router.js";
import { html } from "../web_modules/htm/preact.js";
//---------------------------------------------------------------------
// FORGE
//---------------------------------------------------------------------
import { view } from "../web_modules/@forge/bridge.js";
//---------------------------------------------------------------------
// COMPONENTS
//---------------------------------------------------------------------
import InProgress from "./InProgress.js";
import { AppProvider } from "./AppContext.js";

const App = (props /*: { url: string } */) /*: string */ => {
  useEffect(() => {
    view.createHistory().then((history) => {
      // The first time the history is set, we need to manually route
      route(history.location.pathname);
      // From then on, we can listen to changes in the URL
      history.listen((location, action) => {
        route(history.location.pathname);
      });
    });
  }, []);

  return html`
    <${AppProvider} >
      <${Router}>
        <${InProgress} count="2" path="/in-progress" />
        <${InProgress} count="3" path="/done" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
