// @flow
import { h } from "../web_modules/preact.js";
import Counter from "./Counter.js";
import Router from "../web_modules/preact-router.js";
import { route } from "../web_modules/preact-router.js";
import { useEffect, useState } from "../web_modules/preact/hooks.js";
import { html } from "../web_modules/htm/preact.js";
import { requestJira, view } from "../web_modules/@forge/bridge.js";
import { AppProvider } from "./AppContext.js";

// // Function to fetch in-progress issues
// async function fetchInProgressIssues() {
//   try {
//     // Update the JQL query according to your project specifics
//     const jql = "status = 'In Progress'";
//     const response = await requestJira(
//       `/rest/api/3/search?jql=${encodeURIComponent(jql)}`,
//     );

//     // Parse the JSON response
//     const data = await response.json();

//     // Logging to check the response
//     console.log("FlwAttrctr v0.1.2:", data);

//     // Handle the data, e.g., display it in your UI
//     return data;
//   } catch (error) {
//     console.error("Error fetching in-progress issues:", error);
//   }
// }

// // Call the function to fetch issues
// fetchInProgressIssues();

/*::
type Props = {
  url: string,
};
*/
const App = (props /*: Props */) /*: string */ => {
  useEffect(() => {
    view.createHistory().then((history) => {
      // The first time the history is set, we need to manually route
      route(history.location.pathname);
      // From then on, we can listen to changes in the URL
      history.listen((location, action) => {
        route(history.location.pathname);
      });
    });
  }, []);

  return html`
    <${AppProvider} >
      <${Router}>
        <${Counter} count="2" path="/in-progress" />
        <${Counter} count="3" path="/done" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
