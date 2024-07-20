//@flow
import { requestJira } from "../../web_modules/@forge/bridge.js";

// Function to fetch in-progress issues
const fetchInProgressIssues = async (
  statusNames /*: Array<string> */,
) /*: Promise<Array<Object>> */ => {
  const statusNamesString = `'` + statusNames.join("','") + `'`;
  try {
    // Update the JQL query according to your project specifics
    const jql = `status IN(${statusNamesString})`;
    const response = await requestJira(
      `/rest/api/3/search?jql=${encodeURIComponent(jql)}`,
    );

    // Parse the JSON response
    const data = await response.json();

    // Logging to check the response
    console.log(
      "[Flw] fetchInProgressIssues: In Progress issues:",
      data.issues,
    );

    // Handle the data, e.g., display it in your UI
    return data.issues;
  } catch (error) {
    console.error("Error fetching in-progress issues:", error);
    return [];
  }
};

export default fetchInProgressIssues;
