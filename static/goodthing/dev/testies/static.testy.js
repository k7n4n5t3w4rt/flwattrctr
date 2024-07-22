// @flow
import { test, testPromise, should } from "../testy.js";
import requestPromise from "../testy_request_promise.js";
import fs, { read } from "fs";

// test("Cache | Writing to and reading from /index.html", () /*: any */ => {
//   const cachedFilePath /*: string */ = "/";

//   const result = staticCache.writeToCache(cachedFilePath, "Testy test");
//   should(result).be.exactly(true);
//   should(staticCache.readFromCache(cachedFilePath, 0, true)).be.exactly(
//     "Testy test",
//   );
//   fs.unlink(
//     "./public" + cachedFilePath + "index.html",
//     (e /*: Error | null | typeof undefined */) /*: void */ => {
//       if (e) {
//         console.error(e);
//       }
//     },
//   );
//   return true;
// });
