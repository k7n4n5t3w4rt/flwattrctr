//@flow
//---------------------------------------------------------------------
// FORGE
//---------------------------------------------------------------------
import { requestJira, invoke } from "../../web_modules/@forge/bridge.js";

/*::
*/

const saveStatusesToStore = async (
  statuses /*: Array<StatusEntity> */,
) /*: Promise<Array<StatusEntity>> */ => {
  const results = await invoke("saveStatusesFunctionKey", { statuses });
  console.log("[Flw] `results`", results);

  return statuses;
};

export default saveStatusesToStore;
