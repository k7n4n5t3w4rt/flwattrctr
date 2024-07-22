// @flow
let REMEMBER_ME /*: boolean */ = false;
// Browser only
if (typeof process === "undefined" || process.release.name !== "node") {
  REMEMBER_ME = window.REMEMBER_ME;
}

export default {
  REMEMBER_ME,
};
