// @flow
//---------------------------------------------------------------------
// STYLESHEET
//---------------------------------------------------------------------
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import simpleStylesSeed from "../calculations/simpleStyles.js";
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
import { AppContext } from "../AppContext.js";
//---------------------------------------------------------------------
// ACTIONS
//---------------------------------------------------------------------
import fetchWorkflowStatuses from "../actions/fetchWorkflowStatuses.js";
import saveStatusesToStore from "../actions/saveStatusesToStore.js";
import readStatusesFromStore from "../actions/readStatusesFromStore.js";

const Workflow = (props /*: { count: number } */) /*: string */ => {
  const [state, dispatch] /*: [Object, Function] */ = useContext(AppContext);
  const [statusEntities, setStatusEntities] /*: [
    Array<StatusEntity>,
    Function,
  ] */ = useState([]);
  const [statusNames, setStatusNames] /*: [
    Array<string>,
    Function,
  ] */ = useState([]);
  const [context, setContext] /*: [Object, Function] */ = useState({});

  // On the first render, fetch the statuses and issues
  useEffect(async () => {
    // const statusEntities /*: Array<StatusEntity> */ = await fetchWorkflowStatuses();
    // setStatusEntities(statusEntities);
    const statusesFromStore /*: Array<StatusEntity> */ = await readStatusesFromStore();
    dispatch(state, statusesFromStore);
    // await saveStatusesToStore(statusEntities);
  }, []);

  return html`
    <ul>
      ${statusEntities.map(
        (statusEntity) => html`
          <li>
            ${statusEntity.value.name}
          </li>
        `,
      )}
    </ul>
  `;
};

export default Workflow;

//---------------------------------------------------------------------
// STYLES
//---------------------------------------------------------------------
rawStyles({
  ul: {
    display: "auto",
  },
  li: {
    display: "auto",
  },
});

const [styles] = createStyles({
  statusEntity: {
    display: "auto",
  },
});
