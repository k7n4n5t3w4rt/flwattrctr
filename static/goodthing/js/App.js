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
  const [history, setHistory] = useState(null);

  useEffect(() => {
    view.createHistory().then((newHistory) => {
      setHistory(newHistory);
    });
  }, []);

  const [historyState, setHistoryState] = useState(null);

  useEffect(() => {
    if (!historyState && history) {
      setHistoryState({
        action: history.action,
        location: history.location,
      });
    }
  }, [history, historyState]);

  useEffect(() => {
    if (history) {
      history.listen((location, action) => {
        setHistoryState({
          action,
          location,
        });
      });
    }
  }, [history]);
  const [currentUrl, setCurrentUrl] = useState("/");

  useEffect(() => {
    let history;
    let unlisten;

    const setupHistory = async () => {
      history = await view.createHistory();
      unlisten = history.listen((location, action) => {
        if (action === "PUSH" || action === "REPLACE") {
          setCurrentUrl(location.pathname);
          route(location.pathname);
        }
      });
    };

    setupHistory();

    // Cleanup function to stop listening to history changes on component unmount
    return () => {
      if (unlisten) unlisten();
    };
  }, []);

  const handleRoute = (e /*: any */) => {
    setCurrentUrl(e.url);
    view.createHistory().then((history) => {
      history.push(e.url);
    });
  };

  return html`
    <${AppProvider} >
      <${Router} onChange="${handleRoute}" url="${currentUrl}">
        <${Counter} count="1" path="/" />
        <${Counter} count="2" path="/in-progress" />
        <${Counter} count="3" path="/done" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
