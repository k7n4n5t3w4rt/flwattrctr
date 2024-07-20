//@flow
//---------------------------------------------------------------------
// FORGE
//---------------------------------------------------------------------
import { requestJira, invoke } from "../../web_modules/@forge/bridge.js";

/*::
type Status = {
  id: string,
  name: string,
  statusCategory: string,
  used: boolean,
  orderWeight: number,
};
*/

const saveStatusesToStore = async (
  statuses /*: Array<Status> */,
) /*: Promise<Array<Status>> */ => {
  const results = await invoke("saveStatusesFunctionKey", { statuses });
  console.log("[Flw] `results`", results);

  return statuses;
};

export default saveStatusesToStore;
