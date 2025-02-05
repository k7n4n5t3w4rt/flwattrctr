import { b as getDefaultExportFromCjs, c as createCommonjsModule } from '../common/_commonjsHelpers-0597c316.js';
import { o as out$1 } from '../common/index-624d559c.js';
import '../common/tslib.es6-4369c616.js';

var out = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

const isRequestPayload = (request) => {
    return typeof request.payload === 'object' && request.payload.product && request.payload.fetchUrl;
};
const defaultFunctions = {
    __request: async (request) => {
        if (!isRequestPayload(request)) {
            throw new Error('Invalid payload specified for request');
        }
        const { payload } = request;
        const productApis = {
            jira: (0, out$1.asUser)().requestJira,
            confluence: (0, out$1.asUser)().requestConfluence
        };
        const response = await productApis[payload.product]((0, out$1.assumeTrustedRoute)(payload.fetchUrl), payload.fetchOptions);
        let body = await response.text();
        try {
            body = JSON.parse(body);
        }
        catch (e) { }
        return { ...response, body };
    }
};
class Resolver {
    functions;
    constructor() {
        this.functions = {
            ...defaultFunctions
        };
    }
    define(functionKey, cb) {
        if (!cb || typeof cb !== 'function') {
            throw new Error(`Resolver definition '${functionKey}' callback must be a 'function'. Received '${typeof cb}'.`);
        }
        if (functionKey in this.functions) {
            throw new Error(`Resolver definition '${functionKey}' already exists.`);
        }
        this.functions[functionKey] = cb;
        return this;
    }
    getFunction(functionKey) {
        if (functionKey in this.functions) {
            return this.functions[functionKey];
        }
        throw new Error(`Resolver has no definition for '${functionKey}'.`);
    }
    sanitizeObject(object) {
        return JSON.parse(JSON.stringify(object));
    }
    getDefinitions() {
        const resolve = async ({ call: { functionKey, payload: callPayload, jobId }, context }, backendRuntimePayload) => {
            const cb = this.getFunction(functionKey);
            const result = await cb({
                payload: callPayload || {},
                context: {
                    ...context,
                    installContext: backendRuntimePayload?.installContext,
                    accountId: backendRuntimePayload?.principal?.accountId,
                    license: backendRuntimePayload?.license,
                    jobId: jobId
                }
            });
            if (typeof result === 'object') {
                return this.sanitizeObject(result);
            }
            return result;
        };
        return resolve;
    }
}
exports.default = Resolver;
});

var index = /*@__PURE__*/getDefaultExportFromCjs(out);

export default index;
