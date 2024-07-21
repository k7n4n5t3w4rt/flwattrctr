//@flow
//---------------------------------------------------------------------
// FORGE
//---------------------------------------------------------------------
// Import necessary Forge API and resolver
import Resolver from "@forge/resolver";
import { storage } from "@forge/api";

const resolver = new Resolver();

resolver.define(
  "saveStatusesFunctionKey",
  async ({
    payload,
  } /*: SaveStatusesPayload */) /*: Promise<Array<boolean>> */ => {
    const results = await Promise.all(
      payload.statuses.map(
        async (status /*: StatusEntity */) /*: Promise<boolean> */ => {
          try {
            await storage.entity("status_v2").set(status.key, {
              name: status.value.name,
              statusCategory: status.value.statusCategory,
              used: status.value.used,
              orderWeight: status.value.orderWeight,
            });
            return true; // Return true if the operation is successful
          } catch (error) {
            console.error(`Error saving status ${status.key}:`, error);
            return false; // Return false if there's an error
          }
        },
      ),
    );

    return results; // This will be an array of booleans indicating success or failure for each status
  },
);

resolver.define(
  "readStatusesFunctionKey",
  async ({
    payload,
    context,
  } /*: {
    payload?: Object,
    context?: Object,
  } */) /*: Promise<Array<JiraStatus>> */ => {
    // const { used } = payload; // Example payload might include filtering by 'used'
    // let query = storage.entity("status_v2").query();
    // // Apply filter if 'usedFilter' is specified
    // if (used !== undefined) {
    //   query = query.index("by-used-and-order", {
    //     partition: [used], // Assume 'used' is boolean true or false
    //   });
    // } else {
    //   // Default to sorting without filter, requires an appropriate index to be defined
    //   // You might need a separate index just for orderWeight if no filter is used
    //   query = query.index("statusId");
    // }

    // // Execute the query and sort by orderWeight
    // const results /*: Result */ = await query.sort("ASC").getMany();

    const results = await storage
      .entity("status_v2")
      .query()
      .index("name") // Using 'name' assuming it covers all entries straightforwardly.
      .getMany();

    return results;
  },
);

export const handler: Function = resolver.getDefinitions();
