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

const fetchWorkflowStatuses = async () /*: Promise<Array<Status>> */ => {
  try {
    const response = await requestJira(`/rest/api/3/status`, {
      headers: {
        Accept: "application/json",
      },
    });

    const data /*: Array<JiraStatus> */ = await response.json();
    console.log(
      `[Flw] fetchWorkflowStatuses - Response: ${response.status} ${response.statusText}`,
    );
    let orderWeight = 0;
    return data.map((status /*: JiraStatus */) /*: Status */ => ({
      key: status.id,
      value: {
        name: status.name,
        statusCategory: status.statusCategory.name,
        used: true,
        orderWeight: orderWeight++,
      },
    }));
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return [];
  }
};

export default fetchWorkflowStatuses;
