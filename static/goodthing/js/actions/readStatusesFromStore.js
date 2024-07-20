//@flow
//---------------------------------------------------------------------
// FORGE
//---------------------------------------------------------------------
import { requestJira, invoke } from "../../web_modules/@forge/bridge.js";

/*::
type JiraStatus = {
  id: string,
  name: string,
  statusCategory: {
    key: string
  }
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
  orderWeight: number
};

type Result = {
  key: string,
  value: {
    name: string,
    statusCategory: string,
    used: boolean,
    orderWeight: number
  }
}

type ReturnedData = {
  results: Array<Result>
};
*/

const readStatusesFromStore = async (
) /*: Promise<Array<Status>> */ => {
  const returnedData /*: ReturnedData */ = await invoke("readStatusesFunctionKey", {});

  console.log("[FlwAttrctr] Statuses:", returnedData);
    // Convert results to a more friendly format if necessary
  return returnedData.results.map((result /*: Result */) /*: Status */ => ({
      id: result.key,
      name: result.value.name,
      statusCategory: result.value.statusCategory,
      used: result.value.used,
      orderWeight: result.value.orderWeight,
    })
  );
};

export default readStatusesFromStore;
