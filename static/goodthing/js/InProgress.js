// @flow
//---------------------------------------------------------------------
// STYLESHEET
//---------------------------------------------------------------------
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import simpleStylesSeed from "./calculations/simpleStyles.js";
// Set the seed for the styles
setSeed(simpleStylesSeed("in-progress"));
//---------------------------------------------------------------------
// “REACT” - It's an alias for preact/compat
//---------------------------------------------------------------------
import React from "../web_modules/react.js";
import ReactDom from "../web_modules/react-dom.js";
import { useContext, useEffect, useState } from "../web_modules/react.js";
//---------------------------------------------------------------------
// PREACT
//---------------------------------------------------------------------
import { html } from "../web_modules/htm/preact.js";
//---------------------------------------------------------------------
// FORGE
//---------------------------------------------------------------------
import { view } from "../web_modules/@forge/bridge.js";
//---------------------------------------------------------------------
// COMPONENTS
//---------------------------------------------------------------------
import { AppContext } from "./AppContext.js";
// import Workflow from "./components/Workflow.js";
//---------------------------------------------------------------------
// HOOKS
//---------------------------------------------------------------------
import { useReactTable } from "../web_modules/@tanstack/react-table.js";
//---------------------------------------------------------------------
// ACTIONS
//---------------------------------------------------------------------
import fetchInProgressIssues from "./actions/fetchInProgressIssues.js";
import fetchWorkflowStatuses from "./actions/fetchWorkflowStatuses.js";
import saveStatusesToStore from "./actions/saveStatusesToStore.js";
import readStatusesFromStore from "./actions/readStatusesFromStore.js";

const InProgress = (props /*: { count: number } */) /*: string */ => {
  // const [state, dispatch] /*: [Object, Function] */ = useContext(AppContext);
  const [statusEntities, setStatusEntities] /*: [
    Array<StatusEntity>,
    Function,
  ] */ = useState([]);
  const [statusNames, setStatusNames] /*: [
    Array<string>,
    Function,
  ] */ = useState([]);
  const [issues, setIssues] /*: [Array<Object>, Function] */ = useState([]);
  const [context, setContext] /*: [Object, Function] */ = useState({});

  useReactTable();

  // On the first render, fetch the statuses and issues
  useEffect(async () => {
    const statusEntities /*: Array<StatusEntity> */ = await fetchWorkflowStatuses();
    setStatusEntities(statusEntities);
    // We'll use this later
    // await saveStatusesToStore(statusEntities);
    // const statusesFromStore /*: Array<StatusEntity> */ = await readStatusesFromStore();
    const statusNames /*: Array<string> */ = statusEntities.map(
      (status) => status.value.name,
    );
    setStatusNames(statusNames);
    const issues /*: Array<Object> */ = await fetchInProgressIssues(
      statusNames,
    );
    setIssues(issues);
    const context = await view.getContext();
    setContext(context);
  }, []);

  return html`
    <div className="${styles.container}">
      <table>
        <thead>
          <tr>
            <th data-cy="key-header">Key</th>
            <th data-cy="summary-header">Summary</th>
            <th data-cy="type-header">Type</th>
            ${statusNames.map((name) => html` <th>${name}</th> `)}
          </tr>
        </thead>
        <tbody>
          ${issues.map(
            (issue) => html`
              <tr>
                <td>
                  <a
                    href="${context.siteUrl}/browse/${issue.key}"
                    target="_blank"
                    >${issue.key}</a
                  >
                </td>
                <td><p>${issue.fields.summary}</p></td>
                <td>${issue.fields.issuetype.name}</td>
              </tr>
            `,
          )}
        </tbody>
      </table>
    </div>
  `;
};

export default InProgress;

//---------------------------------------------------------------------
// STYLES
//---------------------------------------------------------------------
rawStyles({
  html: {
    height: "100%",
  },
  body: {
    height: "100%",
  },
});

const [styles] = createStyles({
  container: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
