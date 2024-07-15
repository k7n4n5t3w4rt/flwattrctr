// @flow
import { h, render } from "../web_modules/preact.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import { html } from "../web_modules/htm/preact.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import { AppContext } from "./AppContext.js";

const seed /*: number */ = parseInt(
  "counter".split("").reduce(
    (acc /*:  string */, letter /*: string */) /*: string */ => {
      const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
      return acc + letterCode.toString();
    },
    "",
  ),
);
setSeed(seed);

rawStyles({
  html: {
    height: "100%",
  },
  body: {
    height: "100%",
  },
});

const [styles] = createStyles({
  container: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "2em",
    color: "gold",
  },
  counter: {
    fontSize: "7em",
    color: "silver",
  },
  buttons: {
    fontSize: "2em",
  },
});

/*::
type Props = {
  count: number | typeof undefined,
};
*/
const Counter = (props /*: Props */) /*: string */ => {
  // const [state, dispatch] /*: [Object, Function] */ = useContext(AppContext);
  const [count, setCount] /*: [number, Function] */ = useState(props.count);

  // On every render, set the count to the prop value
  useEffect(() => {
    setCount(props.count);
  });

  return html`
    <div className="${styles.container}">
      <div>
        <h2 data-cy="number-display" className="${styles.counter}">${count}</h2>
      </div>
    </div>
  `;
};

export default Counter;
