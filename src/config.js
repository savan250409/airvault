// API base URL — resolved automatically, so the same build works everywhere.
//
//   Local dev (localhost / 127.0.0.1) -> Node backend on http://localhost:8090
//   Any deployed server               -> the site's own origin (e.g. https://airvlt.com)
//
// Because the live API lives under the same domain (/api/...), using the current
// origin means you never have to edit this file when the domain changes.

const LOCAL_API = "http://localhost:8090";
const LOCAL_HOSTS = ["localhost", "127.0.0.1", "::1"];
const FALLBACK_API = "https://airvlt.com"; // used only if `window` is unavailable

const hasWindow = typeof window !== "undefined";
const isLocal = hasWindow && LOCAL_HOSTS.includes(window.location.hostname);

const BASE_URI = isLocal
  ? LOCAL_API
  : hasWindow
    ? window.location.origin
    : FALLBACK_API;

export default BASE_URI;
