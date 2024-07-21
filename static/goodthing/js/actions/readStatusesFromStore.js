//@flow
//---------------------------------------------------------------------
// FORGE
//---------------------------------------------------------------------
import { requestJira, invoke } from "../../web_modules/@forge/bridge.js";

const readStatusesFromStore = async () /*: Promise<Array<StatusEntity>> */ => {
  const returnedData /*: { results: Array<StatusEntity> } */ = await invoke(
    "readStatusesFunctionKey",
    {},
  );

  console.log("[FlwAttrctr] Statuses:", returnedData);
  return returnedData.results;
  // .map(
  //   (result /*: ReadStatusesFromStoreResult */) /*: StatusEntity */ => ({
  //     key: result.key,
  //     value: {
  //       name: result.value.name,
  //       statusCategory: result.value.statusCategory,
  //       used: result.value.used,
  //       orderWeight: result.value.orderWeight,
  //     },
  //   }),
  // );
};

export default readStatusesFromStore;
