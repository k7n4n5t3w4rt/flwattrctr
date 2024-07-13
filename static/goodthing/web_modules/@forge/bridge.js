import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../common/_commonjsHelpers-913f9c4a.js';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

var tslib_es6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    __extends: __extends,
    get __assign () { return __assign; },
    __rest: __rest,
    __decorate: __decorate,
    __param: __param,
    __metadata: __metadata,
    __awaiter: __awaiter,
    __generator: __generator,
    __createBinding: __createBinding,
    __exportStar: __exportStar,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __spreadArrays: __spreadArrays,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet
});

var errors = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeAPIError = void 0;
class BridgeAPIError extends Error {
}
exports.BridgeAPIError = BridgeAPIError;
});

var bridge = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallBridge = void 0;

function isBridgeAvailable(bridge) {
    return !!(bridge === null || bridge === void 0 ? void 0 : bridge.callBridge);
}
const getCallBridge = () => {
    if (!isBridgeAvailable(window.__bridge)) {
        throw new errors.BridgeAPIError(`
      Unable to establish a connection with the Custom UI bridge.
      If you are trying to run your app locally, Forge apps only work in the context of Atlassian products. Refer to https://go.atlassian.com/forge-tunneling-with-custom-ui for how to tunnel when using a local development server.
    `);
    }
    return window.__bridge.callBridge;
};
exports.getCallBridge = getCallBridge;
});

var utils = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRateLimiter = void 0;


const withRateLimiter = (wrappedFn, maxOps, intervalInMs, exceededErrorMessage) => {
    let start = Date.now();
    let numOps = 0;
    return (...args) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        const now = Date.now();
        const elapsed = now - start;
        if (elapsed > intervalInMs) {
            start = now;
            numOps = 0;
        }
        if (numOps >= maxOps) {
            throw new errors.BridgeAPIError(exceededErrorMessage || 'Too many invocations.');
        }
        numOps = numOps + 1;
        return wrappedFn(...args);
    });
};
exports.withRateLimiter = withRateLimiter;
});

var invoke = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoke = void 0;



const callBridge = (0, bridge.getCallBridge)();
const validatePayload = (payload) => {
    if (!payload)
        return;
    if (Object.values(payload).some((val) => typeof val === 'function')) {
        throw new errors.BridgeAPIError('Passing functions as part of the payload is not supported!');
    }
};
const _invoke = (functionKey, payload) => {
    if (typeof functionKey !== 'string') {
        throw new errors.BridgeAPIError('functionKey must be a string!');
    }
    validatePayload(payload);
    return callBridge('invoke', { functionKey, payload });
};
exports.invoke = (0, utils.withRateLimiter)(_invoke, 500, 1000 * 25, 'Resolver calls are rate limited at 500req/25s');
});

var invoke$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(invoke, exports);
});

var invokeRemote = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeRemote = void 0;




const MAX_NUM_OPERATIONS = 500;
const OPERATION_INTERVAL_MS = 1000 * 25;
const callBridge = (0, bridge.getCallBridge)();
const validatePayload = (payload) => {
    if (!payload)
        return;
    if (Object.values(payload).some((val) => typeof val === 'function')) {
        throw new errors.BridgeAPIError('Passing functions as part of the payload is not supported!');
    }
};
const _invokeRemote = (input) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    validatePayload(input);
    const { success, payload, error } = (_a = (yield callBridge('invoke', input))) !== null && _a !== void 0 ? _a : {};
    const response = Object.assign({}, (success ? payload : error));
    if (response && response.headers) {
        for (const header in response.headers) {
            if (Array.isArray(response.headers[header])) {
                response.headers[header] = response.headers[header].join(',');
            }
        }
    }
    return response;
});
exports.invokeRemote = (0, utils.withRateLimiter)(_invokeRemote, MAX_NUM_OPERATIONS, OPERATION_INTERVAL_MS, 'Remote invocation calls are rate limited at 500req/25s');
});

var invokeRemote$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(invokeRemote, exports);
});

var submit_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.submit = void 0;



const callBridge = (0, bridge.getCallBridge)();
const submit = (payload) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
    const success = yield callBridge('submit', payload);
    if (success === false) {
        throw new errors.BridgeAPIError("this resource's view is not submittable.");
    }
});
exports.submit = submit;
});

var close_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = void 0;



const callBridge = (0, bridge.getCallBridge)();
const close = (payload) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield callBridge('close', payload);
        if (success === false) {
            throw new errors.BridgeAPIError("this resource's view is not closable.");
        }
    }
    catch (e) {
        throw new errors.BridgeAPIError("this resource's view is not closable.");
    }
});
exports.close = close;
});

var refresh_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;



const callBridge = (0, bridge.getCallBridge)();
const refresh = (payload) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
    const success = yield callBridge('refresh', payload);
    if (success === false) {
        throw new errors.BridgeAPIError("this resource's view is not refreshable.");
    }
});
exports.refresh = refresh;
});

var createHistory_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHistory = void 0;


const callBridge = (0, bridge.getCallBridge)();
const createHistory = () => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
    const history = yield callBridge('createHistory');
    history.listen((location) => {
        history.location = location;
    });
    return history;
});
exports.createHistory = createHistory;
});

var getContext_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext = void 0;

const callBridge = (0, bridge.getCallBridge)();
const getContext = () => {
    return callBridge('getContext');
};
exports.getContext = getContext;
});

var theme = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = void 0;

const callBridge = (0, bridge.getCallBridge)();
exports.theme = {
    enable: () => callBridge('enableTheming')
};
});

var view = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = void 0;






exports.view = {
    submit: submit_1.submit,
    close: close_1.close,
    refresh: refresh_1.refresh,
    createHistory: createHistory_1.createHistory,
    getContext: getContext_1.getContext,
    theme: theme.theme
};
});

var view$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(view, exports);
});

var router = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;


const callBridge = (0, bridge.getCallBridge)();
const navigate = (url) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () { return callBridge('navigate', { url, type: 'same-tab' }); });
const open = (url) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () { return callBridge('navigate', { url, type: 'new-tab' }); });
const reload = () => tslib_es6.__awaiter(void 0, void 0, void 0, function* () { return callBridge('reload'); });
exports.router = {
    navigate,
    open,
    reload
};
});

var router$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(router, exports);
});

var modal = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;



const callBridge = (0, bridge.getCallBridge)();
const noop = () => { };
class Modal {
    constructor(opts) {
        var _a, _b;
        this.resource = (opts === null || opts === void 0 ? void 0 : opts.resource) || null;
        this.onClose = (opts === null || opts === void 0 ? void 0 : opts.onClose) || noop;
        this.size = (opts === null || opts === void 0 ? void 0 : opts.size) || 'medium';
        this.context = (opts === null || opts === void 0 ? void 0 : opts.context) || {};
        this.closeOnEscape = (_a = opts === null || opts === void 0 ? void 0 : opts.closeOnEscape) !== null && _a !== void 0 ? _a : true;
        this.closeOnOverlayClick = (_b = opts === null || opts === void 0 ? void 0 : opts.closeOnOverlayClick) !== null && _b !== void 0 ? _b : true;
    }
    open() {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield callBridge('openModal', {
                    resource: this.resource,
                    onClose: this.onClose,
                    size: this.size,
                    context: this.context,
                    closeOnEscape: this.closeOnEscape,
                    closeOnOverlayClick: this.closeOnOverlayClick
                });
                if (success === false) {
                    throw new errors.BridgeAPIError('Unable to open modal.');
                }
            }
            catch (err) {
                throw new errors.BridgeAPIError('Unable to open modal.');
            }
        });
    }
}
exports.Modal = Modal;
});

var modal$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(modal, exports);
});

var blobParser = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.blobToBase64 = exports.base64ToBlob = void 0;
const base64ToBlob = (b64string, mimeType) => {
    if (!b64string) {
        return null;
    }
    const base64Data = b64string.includes(';base64') ? b64string.split(',')[1] : b64string;
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
};
exports.base64ToBlob = base64ToBlob;
const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
exports.blobToBase64 = blobToBase64;
});

var fetch = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFetchApi = void 0;


const parseFormData = (form) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
    const parsed = {};
    for (const [key, value] of form.entries()) {
        if (key === 'file') {
            const fileName = value.name;
            const fileType = value.type;
            parsed['file'] = yield (0, blobParser.blobToBase64)(value);
            parsed['__fileName'] = fileName;
            parsed['__fileType'] = fileType;
        }
        else {
            parsed[key] = value;
        }
    }
    return JSON.stringify(parsed);
});
const parseRequest = (init) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
    const isFormData = (init === null || init === void 0 ? void 0 : init.body) instanceof FormData ? true : false;
    const requestBody = isFormData ? yield parseFormData(init === null || init === void 0 ? void 0 : init.body) : init === null || init === void 0 ? void 0 : init.body;
    const req = new Request('', { body: requestBody, method: init === null || init === void 0 ? void 0 : init.method, headers: init === null || init === void 0 ? void 0 : init.headers });
    const headers = Object.fromEntries(req.headers.entries());
    const body = req.method !== 'GET' ? yield req.text() : null;
    return {
        body,
        headers: new Headers(headers),
        isMultipartFormData: isFormData
    };
});
const productFetchApi = (callBridge) => {
    const fetch = (product, restPath, init) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        const { body: requestBody, headers: requestHeaders, isMultipartFormData } = yield parseRequest(init);
        if (!requestHeaders.has('X-Atlassian-Token')) {
            requestHeaders.set('X-Atlassian-Token', 'no-check');
        }
        const fetchPayload = {
            product,
            restPath,
            fetchRequestInit: Object.assign(Object.assign({}, init), { body: requestBody, headers: [...requestHeaders.entries()] }),
            isMultipartFormData
        };
        const { body, headers, statusText, status, isAttachment } = yield callBridge('fetchProduct', fetchPayload);
        const responseBody = isAttachment ? (0, blobParser.base64ToBlob)(body, headers['content-type']) : body;
        return new Response(responseBody || null, { headers, status, statusText });
    });
    return {
        requestConfluence: (restPath, fetchOptions) => fetch('confluence', restPath, fetchOptions),
        requestJira: (restPath, fetchOptions) => fetch('jira', restPath, fetchOptions),
        requestBitbucket: (restPath, fetchOptions) => fetch('bitbucket', restPath, fetchOptions)
    };
};
exports.productFetchApi = productFetchApi;
});

var fetch$1 = createCommonjsModule(function (module, exports) {
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestBitbucket = exports.requestJira = exports.requestConfluence = void 0;


_a = (0, fetch.productFetchApi)((0, bridge.getCallBridge)()), exports.requestConfluence = _a.requestConfluence, exports.requestJira = _a.requestJira, exports.requestBitbucket = _a.requestBitbucket;
});

var flag = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.showFlag = void 0;



const callBridge = (0, bridge.getCallBridge)();
const showFlag = (options) => {
    var _a;
    if (!options.id) {
        throw new errors.BridgeAPIError('"id" must be defined in flag options');
    }
    const result = callBridge('showFlag', Object.assign(Object.assign({}, options), { type: (_a = options.type) !== null && _a !== void 0 ? _a : 'info' }));
    return {
        close: () => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
            yield result;
            return callBridge('closeFlag', { id: options.id });
        })
    };
};
exports.showFlag = showFlag;
});

var flag$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.showFlag = void 0;

Object.defineProperty(exports, "showFlag", { enumerable: true, get: function () { return flag.showFlag; } });
});

var events = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;

const callBridge = (0, bridge.getCallBridge)();
const emit = (event, payload) => {
    return callBridge('emit', { event, payload });
};
const on = (event, callback) => {
    return callBridge('on', { event, callback });
};
exports.events = {
    emit,
    on
};
});

var events$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(events, exports);
});

var out = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(invoke$1, exports);
tslib_es6.__exportStar(invokeRemote$1, exports);
tslib_es6.__exportStar(view$1, exports);
tslib_es6.__exportStar(router$1, exports);
tslib_es6.__exportStar(modal$1, exports);
tslib_es6.__exportStar(fetch$1, exports);
tslib_es6.__exportStar(flag$1, exports);
tslib_es6.__exportStar(events$1, exports);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(out);

var Modal = out.Modal;
export default __pika_web_default_export_for_treeshaking__;
var events$2 = out.events;
var invoke$2 = out.invoke;
var invokeRemote$2 = out.invokeRemote;
var requestBitbucket = out.requestBitbucket;
var requestConfluence = out.requestConfluence;
var requestJira = out.requestJira;
var router$2 = out.router;
var showFlag = out.showFlag;
var view$2 = out.view;
export { Modal, out as __moduleExports, events$2 as events, invoke$2 as invoke, invokeRemote$2 as invokeRemote, requestBitbucket, requestConfluence, requestJira, router$2 as router, showFlag, view$2 as view };
