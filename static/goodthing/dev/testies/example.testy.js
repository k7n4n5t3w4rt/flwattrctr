// @flow
import { test, testPromise, should } from "../testy.js";

test("Nothing | Just a simple test example", () /*: any */ => {
  const aString /*: string */ = "This is a testy test test.";
  const anotherString /*: string */ = "It looks like this test is working.";

  const result /*: string */ = aString + " " + anotherString;

  should(result).be.exactly(
    "This is a testy test test. It looks like this test is working.",
  );
});
