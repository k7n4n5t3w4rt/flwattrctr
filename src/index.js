import Resolver from "@forge/resolver";
import { storage, WhereConditions, SortOrder } from "@forge/api";

const resolver = new Resolver();

resolver.define("exampleFunctionKey", ({ payload, context }) => {
  payload.statuses.forEach(async (status) => {
    try {
      const result = await storage.set(`status:${status.id}`, {
        statusId: status.id,
        name: status.name,
        statusCategory: status.statusCategory.key,
        used: true, // Assuming all fetched statuses are currently used
        orderWeight: 0, // This should be set based on your business logic
      });
      console.log(`Status saved: ${result}`);
    } catch (error) {
      console.error(`Error saving status ${status.id}:`, error);
    }
  });
  return { statuses: payload.statuses };
});

export const handler = resolver.getDefinitions();
