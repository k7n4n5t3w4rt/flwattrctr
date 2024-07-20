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
// PREACT
//---------------------------------------------------------------------
import { h, render } from "../web_modules/preact.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import { html } from "../web_modules/htm/preact.js";
//---------------------------------------------------------------------
// FORGE
//---------------------------------------------------------------------
import { view } from "../web_modules/@forge/bridge.js";
//---------------------------------------------------------------------
// COMPONENTS
//---------------------------------------------------------------------
import { AppContext } from "./AppContext.js";
//---------------------------------------------------------------------
// ACTIONS
//---------------------------------------------------------------------
import fetchInProgressIssues from "./actions/fetchInProgressIssues.js";
import fetchWorkflowStatuses from "./actions/fetchWorkflowStatuses.js";
import saveStatusesToStore from "./actions/saveStatusesToStore.js";
import readStatusesFromStore from "./actions/readStatusesFromStore.js";

/*::
type JiraStatus = {
  id: string,
  name: string,
  statusCategory: {name: string},
};

type StoredStatus = {
  name: string,
  statusCategory: string,
  used: boolean,
  orderWeight: number,
};

type Status = {
  id: string,
  name: string,
  statusCategory: string,
  used: boolean,
  orderWeight: number,
};

type ReturnedData = {
  results: Array<StoredStatus>
};
type Props = {
  count: number | typeof undefined,
};
*/
const InProgress = (props /*: Props */) /*: string */ => {
  // const [state, dispatch] /*: [Object, Function] */ = useContext(AppContext);
  const [statuses, setStatuses] /*: [Array<Object>, Function] */ = useState([]);
  const [issues, setIssues] /*: [Array<Object>, Function] */ = useState([]);
  const [context, setContext] /*: [Object, Function] */ = useState({});

  // On the first render, fetch the statuses and issues
  useEffect(async () => {
    const statuses /*: Array<Status> */ = await fetchWorkflowStatuses();
    await saveStatusesToStore(statuses);
    const statusesFromStore /*: Array<Status> */ =
      await readStatusesFromStore();
    setStatuses(statusesFromStore);
    const statusNames /*: Array<string> */ = statuses.map(
      (status) => status.name,
    );
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
            <th>Key</th>
            <th>Summary</th>
            <th>Type</th>
            ${statuses.map((status) => html` <th>${status.name}</th> `)}
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
  // heading: {
  //   fontSize: "2em",
  //   color: "gold",
  // },
  // issues: {
  //   fontSize: "7em",
  //   color: "silver",
  // },
  // buttons: {
  //   fontSize: "2em",
  // },
});
