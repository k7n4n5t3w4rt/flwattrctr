import { c as createCommonjsModule, b as getDefaultExportFromCjs } from '../common/_commonjsHelpers-0597c316.js';
import { t as tslib_es6 } from '../common/tslib.es6-4369c616.js';

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
