//@flow
//---------------------------------------------------------------------
// FORGE
//---------------------------------------------------------------------
import { requestJira, invoke } from "../../web_modules/@forge/bridge.js";
import {
  storage,
  WhereConditions,
  SortOrder,
} from "../../web_modules/@forge/api.js";
// import api, { route } from "../../web_modules/@forge/api";

/*::
type ListResult = {
  results: Array<{ key: string, value: Object }>,
  nextCursor?: string
};

type Result = {
  key: string,
  value: Object
};
*/

const getStatusesUsedSorted /*: () => Promise<ListResult> */ = async () => {
  const result /*: ListResult */ = await storage
    .entity("status")
    .query()
    .index("by-used-and-order", {
      partition: [false], // Assuming 'used' is a boolean
    })
    .sort("ASC")
    .getMany();

  return result;
};

/*::
type JiraStatus = {
  id: string,
  name: string,
  statusCategory: {
    key: string
  }
};
*/

const fetchWorkflowStatuses = async () /*: Promise<Array<JiraStatus>> */ => {
  try {
    const response = await requestJira(`/rest/api/3/status`, {
      headers: {
        Accept: "application/json",
      },
    });

    const data /*: Array<JiraStatus> */ = await response.json();
    console.log(`Response: ${response.status} ${response.statusText}`);
    return data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return [];
  }
};

const saveStatusesToStore = async (
  statuses /*: Array<JiraStatus> */,
) /*: Promise<Array<JiraStatus>> */ => {
  invoke("exampleFunctionKey", { statuses })
    .then((returnedData /*: Object */) /*: void */ => {
      console.log("[FlwAttrctr] Statuses:", returnedData.statuses);
  });

  return statuses;
};

export { saveStatusesToStore, fetchWorkflowStatuses, getStatusesUsedSorted };
