// @flow
import conf from "./config.js";
import http from "http";
import fs from "fs";
import finalHandler from "finalhandler";
import serveStatic from "serve-static";
import { h } from "../web_modules/preact.js";
import { html } from "../web_modules/htm/preact.js";
import render from "../web_modules/preact-render-to-string.js";
import App from "../js/App.js";
import { goodthingElement, cacheTtl, appPaths } from "./static_config.js";

var serveAsStatic = serveStatic(".", {
  index: false,
});

const requestHandler = (req /*: Object */, res /*: Object */) => {
  req.url = req.url.replace(/\/$/, "");
  // NOTE: The trailing "/" doesn't seem to matter
  // to `preact-router` when `/js/App.js` is being
  // rendered server-side
  const [urlPath, queryString] /*: [string,string] */ = req.url.split("?");
  if (typeof queryString !== "undefined") {
    queryString.split("&").forEach((keyVal /*: string */) => {
      const [key, value] = keyVal.split("=");
    });
  }
  if (urlPath.match(/.+\..+$/) !== null) {
    serveAsStatic(req, res, finalHandler(req, res));
  } else {
    const output = renderToString(urlPath);
    res.end(output);
  }
};

const server = http.createServer(requestHandler);

server.listen(conf.PORT, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${conf.PORT}`);
});

// ----------------------------------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------------------------------

const renderToString = (url /*: string */) /*: string */ => {
  const index /*: string */ = fs.readFileSync("./index.html", "utf8");
  let renderedContent = index;

  // Server-side rendering
  // [1] Swap the placeholder copy with the rendered output
  const gtStartElement = `<${goodthingElement} id="goodthing" data-goodthing>`;
  const gtStartElementRe = `<${goodthingElement} id="goodthing" data-goodthing>`;
  const gtEndElement = `</${goodthingElement} data-goodthing>`;
  const gtEndElementRe = `<\\/${goodthingElement} data-goodthing>`;
  const reString = `${gtStartElementRe}[\\s\\S]*${gtEndElementRe}`;
  const re = new RegExp(reString, "g");
  renderedContent = index.replace(
    re,
    `${gtStartElement}` +
      render(App({ url }), {}, { pretty: true }) +
      `${gtEndElement}`,
  );

  // Do the ENVs
  const re_env_NODE_ENV = new RegExp("_NODE_ENV_", "g");
  renderedContent = renderedContent.replace(re_env_NODE_ENV, conf.NODE_ENV);
  const re_env_REMEMBER_ME = new RegExp("_REMEMBER_ME_", "g");
  renderedContent = renderedContent.replace(
    re_env_REMEMBER_ME,
    conf.REMEMBER_ME.toString(),
  );
  return renderedContent;
};
