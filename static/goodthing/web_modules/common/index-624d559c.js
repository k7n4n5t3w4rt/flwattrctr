import { c as createCommonjsModule, a as commonjsGlobal, g as getDefaultExportFromNamespaceIfNotNamed, b as getDefaultExportFromCjs } from './_commonjsHelpers-0597c316.js';
import { t as tslib_es6$2 } from './tslib.es6-4369c616.js';

var queryApi = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEntityBuilder = exports.CustomEntityIndexBuilder = void 0;
class CustomEntityQueryBuilder {
    constructor(globalStorage, queryOptions = {}) {
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = Object.assign({}, queryOptions);
    }
    clone(overrides) {
        return new (Object.getPrototypeOf(this).constructor)(this.globalStorage, Object.assign(Object.assign({}, this.queryOptions), overrides));
    }
    where(condition) {
        return this.clone({
            range: Object.assign({}, condition)
        });
    }
    sort(sort) {
        return this.clone({
            sort
        });
    }
    cursor(cursor) {
        return this.clone({
            cursor
        });
    }
    limit(limit) {
        return this.clone({
            limit
        });
    }
    async getOne() {
        const { results } = await this.limit(1).getMany();
        return results === null || results === void 0 ? void 0 : results[0];
    }
    async getMany() {
        if (!this.queryOptions.entityName) {
            throw new Error('entityName is mandatory');
        }
        if (!this.queryOptions.indexName) {
            throw new Error('indexName is mandatory');
        }
        const queryOptions = Object.assign({}, this.queryOptions);
        if (!queryOptions.filterOperator && queryOptions.filters) {
            queryOptions.filterOperator = 'and';
        }
        return this.globalStorage.listCustomEntities(this.queryOptions);
    }
}
class CustomEntityAndFilterQueryBuilder extends CustomEntityQueryBuilder {
    constructor(globalStorage, queryOptions = {}) {
        super(globalStorage, queryOptions);
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = Object.assign({}, queryOptions);
    }
    andFilter(field, condition) {
        var _a;
        const newQueryOptions = Object.assign({}, this.queryOptions);
        newQueryOptions.filters = [...((_a = this.queryOptions.filters) !== null && _a !== void 0 ? _a : []), Object.assign({ property: field }, condition)];
        newQueryOptions.filterOperator = 'and';
        return new CustomEntityAndFilterQueryBuilder(this.globalStorage, newQueryOptions);
    }
}
class CustomEntityOrFilterQueryBuilder extends CustomEntityQueryBuilder {
    constructor(globalStorage, queryOptions = {}) {
        super(globalStorage, queryOptions);
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = Object.assign({}, queryOptions);
    }
    orFilter(field, condition) {
        var _a;
        const newQueryOptions = Object.assign({}, this.queryOptions);
        newQueryOptions.filters = [...((_a = this.queryOptions.filters) !== null && _a !== void 0 ? _a : []), Object.assign({ property: field }, condition)];
        newQueryOptions.filterOperator = 'or';
        return new CustomEntityOrFilterQueryBuilder(this.globalStorage, newQueryOptions);
    }
}
class CustomEntityFilterQueryBuilder extends CustomEntityQueryBuilder {
    constructor(globalStorage, queryOptions = {}) {
        super(globalStorage, queryOptions);
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = Object.assign({}, queryOptions);
    }
    andFilter(field, condition) {
        return new CustomEntityAndFilterQueryBuilder(this.globalStorage, this.queryOptions).andFilter(field, condition);
    }
    orFilter(field, condition) {
        return new CustomEntityOrFilterQueryBuilder(this.globalStorage, this.queryOptions).orFilter(field, condition);
    }
}
class CustomEntityIndexBuilder {
    constructor(globalStorage, queryOptions = {}) {
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = Object.assign({}, queryOptions);
    }
    index(name, indexOptions) {
        const indexProperties = indexOptions ? Object.assign({ indexName: name }, indexOptions) : { indexName: name };
        return new CustomEntityFilterQueryBuilder(this.globalStorage, Object.assign(Object.assign({}, this.queryOptions), indexProperties));
    }
}
exports.CustomEntityIndexBuilder = CustomEntityIndexBuilder;
class CustomEntityBuilder {
    constructor(globalStorage, queryOptions = {}) {
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = Object.assign({}, queryOptions);
    }
    entity(name) {
        return new CustomEntityIndexBuilder(this.globalStorage, Object.assign(Object.assign({}, this.queryOptions), { entityName: name }));
    }
}
exports.CustomEntityBuilder = CustomEntityBuilder;
});

var storageBuilder = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityStorageBuilder = void 0;

class EntityStorageBuilder {
    constructor(entityName, globalStorage) {
        this.entityName = entityName;
        this.globalStorage = globalStorage;
    }
    query() {
        return new queryApi.CustomEntityBuilder(this.globalStorage).entity(this.entityName);
    }
    get(entityKey) {
        return this.globalStorage.getEntity(this.entityName, entityKey);
    }
    set(entityKey, value) {
        return this.globalStorage.setEntity(this.entityName, entityKey, value);
    }
    delete(entityKey) {
        return this.globalStorage.deleteEntity(this.entityName, entityKey);
    }
}
exports.EntityStorageBuilder = EntityStorageBuilder;
});

var entityStorage = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityStorageBuilder = void 0;

Object.defineProperty(exports, "EntityStorageBuilder", { enumerable: true, get: function () { return storageBuilder.EntityStorageBuilder; } });
});

var queryApi$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultQueryBuilder = void 0;
class DefaultQueryBuilder {
    constructor(globalStorage, queryOptions = {}) {
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
    }
    where(field, where) {
        return new DefaultQueryBuilder(this.globalStorage, Object.assign(Object.assign({}, this.queryOptions), { where: [
                Object.assign({ field }, where)
            ] }));
    }
    cursor(cursor) {
        return new DefaultQueryBuilder(this.globalStorage, Object.assign(Object.assign({}, this.queryOptions), { cursor }));
    }
    limit(limit) {
        return new DefaultQueryBuilder(this.globalStorage, Object.assign(Object.assign({}, this.queryOptions), { limit }));
    }
    async getOne() {
        const { results } = await this.limit(1).getMany();
        if (results && results.length > 0) {
            return results[0];
        }
    }
    async getMany() {
        return this.globalStorage.list(this.queryOptions);
    }
}
exports.DefaultQueryBuilder = DefaultQueryBuilder;
});

/* SNOWPACK PROCESS POLYFILL (based on https://github.com/calvinmetcalf/node-process-es6) */
function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
var globalContext;
if (typeof window !== 'undefined') {
    globalContext = window;
} else if (typeof self !== 'undefined') {
    globalContext = self;
} else {
    globalContext = {};
}
if (typeof globalContext.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof globalContext.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = globalContext.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: {"NODE_ENV":"production"},
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var errors = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = exports.getErrorMessage = exports.getErrorMessageFromCode = void 0;
const getErrorMessageFromCode = (code, message) => {
    return message !== null && message !== void 0 ? message : code;
};
exports.getErrorMessageFromCode = getErrorMessageFromCode;
const getErrorMessage = (statusCode) => {
    switch (statusCode) {
        case 400:
        case 413:
            return 'Bad request';
        case 401:
            return 'Authentication error';
        case 403:
        case 404:
            return 'Permissions error or key does not exist';
        case 409:
            return 'Conflicting update occurred';
        case 500:
            return 'Internal server error';
        default:
            return `Unknown error. Received status code '${statusCode}'`;
    }
};
exports.getErrorMessage = getErrorMessage;
class APIError extends Error {
    constructor(message) {
        super(message);
    }
    static forStatus(status) {
        return new APIError((0, exports.getErrorMessage)(status));
    }
    static forErrorCode(code, message) {
        return new APIError((0, exports.getErrorMessageFromCode)(code, message));
    }
    static forUnexpected(message) {
        return new APIError(message);
    }
}
exports.APIError = APIError;
});

var gqlQueries = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEntityQueries = exports.UntypedQueries = void 0;
class UntypedQueries {
}
exports.UntypedQueries = UntypedQueries;
UntypedQueries.get = (contextAri, key, encrypted) => ({
    query: `
      query forge_app_getApplicationStorageEntity($contextAri: ID!, $key: ID!, $encrypted: Boolean!) {
        appStoredEntity(contextAri: $contextAri, key: $key, encrypted: $encrypted) {
          key
          value
        }
      }
    `,
    variables: {
        contextAri,
        key,
        encrypted
    }
});
UntypedQueries.set = (contextAri, key, value, encrypted) => ({
    query: `
      mutation forge_app_setApplicationStorageEntity($input: SetAppStoredEntityMutationInput!) {
        appStorage{
          setAppStoredEntity(input: $input) {
            success

            errors {
              message
              extensions {
                errorType
                statusCode
              }
            }
          }
        }
      }
    `,
    variables: {
        input: {
            contextAri,
            key,
            value,
            encrypted
        }
    }
});
UntypedQueries.delete = (contextAri, key, encrypted) => ({
    query: `
      mutation forge_app_deleteApplicationStorageEntity($input: DeleteAppStoredEntityMutationInput!) {
        appStorage {
          deleteAppStoredEntity(input: $input) {
            success
  
            errors {
              message
              extensions {
                errorType
                statusCode
              }
            }
          }
        }
      }
    `,
    variables: {
        input: {
            contextAri,
            key,
            encrypted
        }
    }
});
UntypedQueries.listQuery = (contextAri, options) => {
    var _a, _b, _c;
    return ({
        query: `
      query forge_app_getApplicationStorageEntities($contextAri: ID!, $where: [AppStoredEntityFilter!], $cursor: String, $limit: Int) {
        appStoredEntities(contextAri: $contextAri, where: $where, after: $cursor, first: $limit) {
          edges {
            node {
              value
              key
            }
  
            cursor
          }
        }
      }
    `,
        variables: {
            contextAri,
            where: (_a = options.where) !== null && _a !== void 0 ? _a : null,
            cursor: (_b = options.cursor) !== null && _b !== void 0 ? _b : null,
            limit: (_c = options.limit) !== null && _c !== void 0 ? _c : null
        }
    });
};
UntypedQueries.listQueryForCleanup = (contextAri, options) => {
    var _a, _b, _c;
    return ({
        query: `
      query forge_app_getApplicationStorageEntitiesForCleanup($contextAri: ID!, $where: [AppStoredEntityFilter!], $cursor: String, $limit: Int) {
        appStoredEntitiesForCleanup(contextAri: $contextAri, where: $where, after: $cursor, first: $limit) {
          edges {
            node {
              value
              key
            }
  
            cursor
          }
        }
      }
    `,
        variables: {
            contextAri,
            where: (_a = options.where) !== null && _a !== void 0 ? _a : null,
            cursor: (_b = options.cursor) !== null && _b !== void 0 ? _b : null,
            limit: (_c = options.limit) !== null && _c !== void 0 ? _c : null
        }
    });
};
class CustomEntityQueries {
}
exports.CustomEntityQueries = CustomEntityQueries;
CustomEntityQueries.get = (contextAri, entityName, key) => ({
    query: `
    query forge_app_getApplicationStorageCustomEntity ($contextAri: ID!, $key: ID!, $entityName: String!) {
      appStoredCustomEntity(contextAri: $contextAri, key: $key, entityName: $entityName) {
          value
          entityName
          key
      }
  }
    `,
    variables: {
        contextAri,
        entityName,
        key
    }
});
CustomEntityQueries.set = (contextAri, entityName, key, value) => ({
    query: `
      mutation forge_app_setApplicationStorageCustomEntity($input: SetAppStoredCustomEntityMutationInput!) {
        appStorageCustomEntity{
          setAppStoredCustomEntity(input: $input) {
            success
  
            errors {
              message
              extensions {
                errorType
                statusCode
              }
            }
          }
        }
      }
    `,
    variables: {
        input: {
            contextAri,
            entityName,
            key,
            value
        }
    }
});
CustomEntityQueries.delete = (contextAri, entityName, key) => ({
    query: `
      mutation forge_app_deleteApplicationStorageCustomEntity($input: DeleteAppStoredCustomEntityMutationInput!) {
        appStorageCustomEntity {
          deleteAppStoredCustomEntity(input: $input) {
            success
  
            errors {
              message
              extensions {
                errorType
                statusCode
              }
            }
          }
        }
      }
    `,
    variables: {
        input: {
            contextAri,
            entityName,
            key
        }
    }
});
CustomEntityQueries.listQuery = (contextAri, options) => {
    return {
        query: `
      query AppStorageCustomEntityQueries ($contextAri: ID!, $entityName: String!, $indexName: String!, $range: AppStoredCustomEntityRange, $filters: AppStoredCustomEntityFilters, $sort:SortOrder, $limit: Int, $cursor: String, $partition: [AppStoredCustomEntityFieldValue!]) {
        appStoredCustomEntities(contextAri: $contextAri, entityName: $entityName, indexName: $indexName, range: $range, filters: $filters, sort:$sort, limit: $limit, cursor: $cursor, partition: $partition) {
            edges {
                node {
                    key
                    value
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            totalCount
            cursor
        }
  } 
      `,
        variables: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ contextAri, entityName: options.entityName, indexName: options.indexName, range: options.range }, (options.filters && options.filters.length
            ? {
                filters: {
                    [options.filterOperator || 'and']: options.filters
                }
            }
            : {})), (options.partition ? { partition: options.partition } : {})), (options.sort ? { sort: options.sort } : {})), (options.cursor ? { cursor: options.cursor } : {})), (options.limit ? { limit: options.limit } : {}))
    };
};
});

var globalStorage = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStorage = void 0;


function assertNoErrors(errors$1) {
    if (errors$1 && errors$1.length > 0) {
        const { message, extensions: { errorType } } = errors$1[0];
        throw errors.APIError.forErrorCode(errorType, message);
    }
}
async function getResponseBody(response) {
    if (response.status !== 200) {
        throw errors.APIError.forStatus(response.status);
    }
    const responseText = await response.text();
    let responseBody;
    try {
        responseBody = JSON.parse(responseText);
    }
    catch (error) {
        throw errors.APIError.forUnexpected(`Response text was not a valid JSON: ${responseText}`);
    }
    assertNoErrors(responseBody.errors);
    return responseBody.data;
}
class GlobalStorage {
    constructor(getAppContextAri, apiClient) {
        this.getAppContextAri = getAppContextAri;
        this.apiClient = apiClient;
        this.endpoint = '/forge/entities/graphql';
    }
    doGetAppContextAri() {
        return typeof this.getAppContextAri === 'function' ? this.getAppContextAri() : this.getAppContextAri;
    }
    async get(key) {
        return this.getInternal(key, false);
    }
    async getSecret(key) {
        return this.getInternal(key, true);
    }
    async list(options) {
        const requestBody =  gqlQueries.UntypedQueries.listQuery(this.doGetAppContextAri(), options);
        const response = await this.query(requestBody);
        const edges =  response.appStoredEntities.edges;
        const nextCursor = edges.length > 0 ? edges[edges.length - 1].cursor : undefined;
        const results = edges.map(({ node }) => node);
        return {
            results,
            nextCursor
        };
    }
    async listCustomEntities(options) {
        const requestBody = gqlQueries.CustomEntityQueries.listQuery(this.doGetAppContextAri(), options);
        const response = await this.query(requestBody);
        const edges = response.appStoredCustomEntities.edges;
        const results = edges.map(({ node }) => node);
        return {
            results,
            nextCursor: response.appStoredCustomEntities.cursor || null
        };
    }
    async set(key, value) {
        const requestBody = gqlQueries.UntypedQueries.set(this.doGetAppContextAri(), key, value, false);
        await this.mutation(requestBody, 'appStorage', 'setAppStoredEntity');
    }
    async setSecret(key, value) {
        const requestBody = gqlQueries.UntypedQueries.set(this.doGetAppContextAri(), key, value, true);
        await this.mutation(requestBody, 'appStorage', 'setAppStoredEntity');
    }
    async delete(key) {
        const requestBody = gqlQueries.UntypedQueries.delete(this.doGetAppContextAri(), key, false);
        await this.mutation(requestBody, 'appStorage', 'deleteAppStoredEntity');
    }
    async deleteSecret(key) {
        const requestBody = gqlQueries.UntypedQueries.delete(this.doGetAppContextAri(), key, true);
        await this.mutation(requestBody, 'appStorage', 'deleteAppStoredEntity');
    }
    async getEntity(entityName, entityKey) {
        return this.getEntityInternal(entityName, entityKey);
    }
    async setEntity(entityName, entityKey, value) {
        const requestBody = gqlQueries.CustomEntityQueries.set(this.doGetAppContextAri(), entityName, entityKey, value);
        await this.mutation(requestBody, 'appStorageCustomEntity', 'setAppStoredCustomEntity');
    }
    async deleteEntity(entityName, entityKey) {
        const requestBody = gqlQueries.CustomEntityQueries.delete(this.doGetAppContextAri(), entityName, entityKey);
        await this.mutation(requestBody, 'appStorageCustomEntity', 'deleteAppStoredCustomEntity');
    }
    async getInternal(key, encrypted) {
        const requestBody = gqlQueries.UntypedQueries.get(this.doGetAppContextAri(), key, encrypted);
        const { appStoredEntity: { value } } = await this.query(requestBody);
        return value !== null && value !== void 0 ? value : undefined;
    }
    async getEntityInternal(entityName, entityKey) {
        const requestBody = gqlQueries.CustomEntityQueries.get(this.doGetAppContextAri(), entityName, entityKey);
        const { appStoredCustomEntity: { value } } = await this.query(requestBody);
        return value !== null && value !== void 0 ? value : undefined;
    }
    buildRequest(requestBody) {
        return {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
        };
    }
    async query(body) {
        const response = await this.apiClient(this.endpoint, this.buildRequest(body));
        return await getResponseBody(response);
    }
    async mutation(body, namespace, mutationMethod) {
        const response = await this.apiClient(this.endpoint, this.buildRequest(body));
        const { [namespace]: { [mutationMethod]: { success, errors: errors$1 } } } = await getResponseBody(response);
        assertNoErrors(errors$1);
        if (!success) {
            throw errors.APIError.forStatus(500);
        }
        return response;
    }
}
exports.GlobalStorage = GlobalStorage;
});

var conditions = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.startsWith = void 0;
function startsWith(value) {
    return {
        condition: 'STARTS_WITH',
        value: value
    };
}
exports.startsWith = startsWith;
});

var conditions$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterConditions = exports.WhereConditions = exports.isIn = exports.isNotEqualTo = void 0;
function isNotEqualTo(value) {
    return {
        condition: 'NOT_EQUAL_TO',
        value
    };
}
exports.isNotEqualTo = isNotEqualTo;
function isIn(values) {
    return {
        condition: 'IN',
        value: values
    };
}
exports.isIn = isIn;
function beginsWith(value) {
    return {
        condition: 'BEGINS_WITH',
        values: [value]
    };
}
function between(values) {
    return {
        condition: 'BETWEEN',
        values
    };
}
function exists() {
    return {
        condition: 'EXISTS',
        values: [true]
    };
}
function doesNotExist() {
    return {
        condition: 'NOT_EXISTS',
        values: [true]
    };
}
function isGreaterThan(value) {
    return {
        condition: 'GREATER_THAN',
        values: [value]
    };
}
function isGreaterThanEqualTo(value) {
    return {
        condition: 'GREATER_THAN_EQUAL_TO',
        values: [value]
    };
}
function isLessThan(value) {
    return {
        condition: 'LESS_THAN',
        values: [value]
    };
}
function isLessThanEqualTo(value) {
    return {
        condition: 'LESS_THAN_EQUAL_TO',
        values: [value]
    };
}
function contains(value) {
    return {
        condition: 'CONTAINS',
        values: [value]
    };
}
function doesNotContain(value) {
    return {
        condition: 'NOT_CONTAINS',
        values: [value]
    };
}
function equalsTo(value) {
    return {
        condition: 'EQUAL_TO',
        values: [value]
    };
}
function notEqualsTo(value) {
    return {
        condition: 'NOT_EQUAL_TO',
        values: [value]
    };
}
exports.WhereConditions = {
    beginsWith,
    between,
    equalsTo,
    isGreaterThan,
    isGreaterThanEqualTo,
    isLessThan,
    isLessThanEqualTo
};
exports.FilterConditions = {
    beginsWith,
    between,
    contains,
    doesNotContain,
    equalsTo,
    notEqualsTo,
    exists,
    doesNotExist,
    isGreaterThan,
    isGreaterThanEqualTo,
    isLessThan,
    isLessThanEqualTo
};
});

var queryInterfaces = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortOrder = void 0;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(exports.SortOrder || (exports.SortOrder = {}));
});

var out = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEntityIndexBuilder = exports.APIError = exports.SortOrder = exports.EntityStorageBuilder = exports.FilterConditions = exports.WhereConditions = exports.startsWith = exports.GlobalStorage = exports.getStorageInstanceWithQuery = void 0;


const getStorageInstanceWithQuery = (adapter) => {
    return {
        get: adapter.get.bind(adapter),
        set: adapter.set.bind(adapter),
        delete: adapter.delete.bind(adapter),
        getSecret: adapter.getSecret.bind(adapter),
        setSecret: adapter.setSecret.bind(adapter),
        deleteSecret: adapter.deleteSecret.bind(adapter),
        query: () => new queryApi$1.DefaultQueryBuilder(adapter),
        entity: (entityName) => new entityStorage.EntityStorageBuilder(entityName, adapter)
    };
};
exports.getStorageInstanceWithQuery = getStorageInstanceWithQuery;

Object.defineProperty(exports, "GlobalStorage", { enumerable: true, get: function () { return globalStorage.GlobalStorage; } });

Object.defineProperty(exports, "startsWith", { enumerable: true, get: function () { return conditions.startsWith; } });

Object.defineProperty(exports, "WhereConditions", { enumerable: true, get: function () { return conditions$1.WhereConditions; } });
Object.defineProperty(exports, "FilterConditions", { enumerable: true, get: function () { return conditions$1.FilterConditions; } });
var entity_storage_2 = entityStorage;
Object.defineProperty(exports, "EntityStorageBuilder", { enumerable: true, get: function () { return entity_storage_2.EntityStorageBuilder; } });

Object.defineProperty(exports, "SortOrder", { enumerable: true, get: function () { return queryInterfaces.SortOrder; } });

Object.defineProperty(exports, "APIError", { enumerable: true, get: function () { return errors.APIError; } });

Object.defineProperty(exports, "CustomEntityIndexBuilder", { enumerable: true, get: function () { return queryApi.CustomEntityIndexBuilder; } });
});

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
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

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
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
var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;

}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while (env.stack.length) {
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
            }
            catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}

var tslib_es6 = {
    __extends: __extends,
    __assign: __assign,
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
    __spreadArray: __spreadArray,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet,
    __classPrivateFieldIn: __classPrivateFieldIn,
    __addDisposableResource: __addDisposableResource,
    __disposeResources: __disposeResources,
};

var tslib_es6$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    __extends: __extends,
    get __assign () { return __assign; },
    __rest: __rest,
    __decorate: __decorate,
    __param: __param,
    __esDecorate: __esDecorate,
    __runInitializers: __runInitializers,
    __propKey: __propKey,
    __setFunctionName: __setFunctionName,
    __metadata: __metadata,
    __awaiter: __awaiter,
    __generator: __generator,
    __createBinding: __createBinding,
    __exportStar: __exportStar,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __spreadArrays: __spreadArrays,
    __spreadArray: __spreadArray,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet,
    __classPrivateFieldIn: __classPrivateFieldIn,
    __addDisposableResource: __addDisposableResource,
    __disposeResources: __disposeResources,
    'default': tslib_es6
});

var api = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiMethods = void 0;
const fromEntries = (array) => {
    return array.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
};
const createApiMethods = (methodToPermissionMap, permissionCheckFactory) => {
    const apiMethodEntries = Object.entries(methodToPermissionMap).map(([methodName, permission]) => [methodName, permissionCheckFactory(permission)]);
    return fromEntries(apiMethodEntries);
};
exports.createApiMethods = createApiMethods;
});

var permissions = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
const API_PERMISSIONS_MAP = {
    canRead: 'read',
    canUpdate: 'update',
    canDelete: 'delete'
};
exports.default = API_PERMISSIONS_MAP;
});

var confluence = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeConfluenceWithFetch = void 0;


const permissions_1 = tslib_es6$1.__importDefault(permissions);
const checkConfluencePermissions = async (requestConfluence, accountId, contentId, permission) => {
    const res = await requestConfluence(`/rest/api/content/${contentId}/permission/check`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            subject: {
                type: 'user',
                identifier: accountId
            },
            operation: permission
        })
    });
    return res;
};
const getPermissionsCheckFactory = (requestConfluence, accountId, contentId) => (permission) => {
    return async () => {
        const res = await checkConfluencePermissions(requestConfluence, accountId, contentId, permission);
        return Boolean(res === null || res === void 0 ? void 0 : res.hasPermission);
    };
};
const authorizeConfluenceWithFetch = (requestConfluence, accountId) => {
    return {
        onConfluenceContent: (contentId) => (0, api.createApiMethods)(permissions_1.default, getPermissionsCheckFactory(requestConfluence, accountId, contentId))
    };
};
exports.authorizeConfluenceWithFetch = authorizeConfluenceWithFetch;
});

var permissions$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_PROJECTS_PERMISSIONS_MAP = exports.API_ISSUES_PERMISSIONS_MAP = void 0;
const API_ISSUES_PERMISSIONS_MAP = {
    canAssign: 'ASSIGN_ISSUES',
    canCreate: 'CREATE_ISSUES',
    canEdit: 'EDIT_ISSUES',
    canMove: 'MOVE_ISSUES',
    canDelete: 'DELETE_ISSUES',
    canAddComments: 'ADD_COMMENTS',
    canEditAllComments: 'EDIT_ALL_COMMENTS',
    canDeleteAllComments: 'DELETE_ALL_COMMENTS',
    canCreateAttachments: 'CREATE_ATTACHMENTS',
    canDeleteAllAttachments: 'DELETE_ALL_ATTACHMENTS'
};
exports.API_ISSUES_PERMISSIONS_MAP = API_ISSUES_PERMISSIONS_MAP;
const API_PROJECTS_PERMISSIONS_MAP = {
    canAssignIssues: 'ASSIGN_ISSUES',
    canCreateIssues: 'CREATE_ISSUES',
    canEditIssues: 'EDIT_ISSUES',
    canMoveIssues: 'MOVE_ISSUES',
    canDeleteIssues: 'DELETE_ISSUES',
    canAddComments: 'ADD_COMMENTS',
    canEditAllComments: 'EDIT_ALL_COMMENTS',
    canDeleteAllComments: 'DELETE_ALL_COMMENTS',
    canCreateAttachments: 'CREATE_ATTACHMENTS',
    canDeleteAllAttachments: 'DELETE_ALL_ATTACHMENTS'
};
exports.API_PROJECTS_PERMISSIONS_MAP = API_PROJECTS_PERMISSIONS_MAP;
});

var jira = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeJiraWithFetch = void 0;


const arrayEquals = (a, b) => {
    return JSON.stringify(Array.from(a.map(String)).sort()) === JSON.stringify(Array.from(b.map(String)).sort());
};
const checkJiraPermissions = async (requestJira, accountId, projectPermissions) => {
    const res = await requestJira('/rest/api/3/permissions/check', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            accountId,
            projectPermissions
        })
    });
    return res;
};
const hasPermissionsForEntities = (projectPermissions, permission, type, entities) => {
    var _a;
    if (!entities || entities.length === 0)
        return true;
    const allowedEntities = (_a = projectPermissions.find((permissionResponse) => permissionResponse.permission === permission)) === null || _a === void 0 ? void 0 : _a[type];
    return !!allowedEntities && arrayEquals(allowedEntities, entities);
};
const getPermissionCheckFactory = (requestJira, accountId, type, entities) => (permission) => {
    return async () => {
        const { projectPermissions } = await checkJiraPermissions(requestJira, accountId, [
            {
                permissions: [permission],
                [type]: entities
            }
        ]);
        return hasPermissionsForEntities(projectPermissions, permission, type, entities);
    };
};
const toArray = (id) => (Array.isArray(id) ? id : [id]);
const authorizeJiraWithFetch = (requestJira, accountId) => {
    return {
        onJira: async (projectPermissionsInput) => {
            const result = await checkJiraPermissions(requestJira, accountId, projectPermissionsInput);
            return result.projectPermissions || [];
        },
        onJiraProject: (projects) => (0, api.createApiMethods)(permissions$1.API_PROJECTS_PERMISSIONS_MAP, getPermissionCheckFactory(requestJira, accountId, 'projects', toArray(projects))),
        onJiraIssue: (issues) => (0, api.createApiMethods)(permissions$1.API_ISSUES_PERMISSIONS_MAP, getPermissionCheckFactory(requestJira, accountId, 'issues', toArray(issues)))
    };
};
exports.authorizeJiraWithFetch = authorizeJiraWithFetch;
});

var out$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeJiraWithFetch = exports.authorizeConfluenceWithFetch = void 0;

Object.defineProperty(exports, "authorizeConfluenceWithFetch", { enumerable: true, get: function () { return confluence.authorizeConfluenceWithFetch; } });

Object.defineProperty(exports, "authorizeJiraWithFetch", { enumerable: true, get: function () { return jira.authorizeJiraWithFetch; } });
});

var authorization = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;


const authorize = () => {
    let accountId;
    if (commonjsGlobal.api) {
        accountId = process.env.__CURRENT_USER_ACCOUNT_ID;
    }
    else {
        accountId = (0, out$2.__getRuntime)().aaid;
    }
    if (!accountId) {
        throw new Error(`Couldn’t find the accountId of the invoking user. This API can only be used inside user-invoked modules.`);
    }
    return {
        ...(0, out$1.authorizeConfluenceWithFetch)(async (path, opts) => {
            const res = await (0, out$2.asUser)().requestConfluence((0, out$2.assumeTrustedRoute)(path), opts);
            return res.json();
        }, accountId),
        ...(0, out$1.authorizeJiraWithFetch)(async (path, opts) => {
            const res = await (0, out$2.asUser)().requestJira((0, out$2.assumeTrustedRoute)(path), opts);
            return res.json();
        }, accountId)
    };
};
exports.authorize = authorize;
});

var productScopedStorage = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductScopedStorage = void 0;

class ProductScopedStorage {
    storageApiPath;
    apiClient;
    constructor(storageApiPath, apiClient) {
        this.storageApiPath = storageApiPath;
        this.apiClient = apiClient;
    }
    async get(key) {
        const response = await this.apiClient(this.storageApiPath(key));
        if (!response.ok) {
            if (/403|404/.test(response.status.toString())) {
                return undefined;
            }
            throw out.APIError.forStatus(response.status);
        }
        const { value } = await response.json();
        return value;
    }
    async set(key, value) {
        const response = await this.apiClient(this.storageApiPath(key), this.buildSetRequestOptions(value, 'PUT'));
        if (!response.ok) {
            throw out.APIError.forStatus(response.status);
        }
    }
    async delete(key) {
        const response = await this.apiClient(this.storageApiPath(key), { method: 'DELETE' });
        if (!response.ok) {
            throw out.APIError.forStatus(response.status);
        }
    }
    buildSetRequestOptions(requestBody, requestMethod) {
        return {
            method: requestMethod,
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
        };
    }
}
exports.ProductScopedStorage = ProductScopedStorage;
});

var safeUrl = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.assumeTrustedRoute = exports.requireSafeUrl = exports.route = exports.routeFromAbsolute = exports.isRoute = void 0;
class ReadonlyRoute {
    value_;
    constructor(value_) {
        this.value_ = value_;
    }
    set value(_) {
        throw new Error('modification of a Route is not allowed');
    }
    get value() {
        return this.value_;
    }
}
function isRoute(x) {
    return x instanceof ReadonlyRoute;
}
exports.isRoute = isRoute;
function routeFromAbsolute(absolutePath) {
    const absoluteURL = new URL(absolutePath);
    return assumeTrustedRoute(`${absoluteURL.pathname}${absoluteURL.search}`);
}
exports.routeFromAbsolute = routeFromAbsolute;
const DOUBLE_DOT = ['..', '.%2e', '%2e.', '%2e%2e', '.%2E', '%2E.', '%2E%2e'];
const DIRECTORY_PATH = ['/', '\\'];
const ENDS_PATH = ['?', '#'];
function containsOneOf(needles, haystack) {
    return needles.some((needle) => haystack.includes(needle));
}
function escapeParameter(parameter, mode) {
    switch (mode) {
        case 'path':
            if (isRoute(parameter)) {
                return parameter.value;
            }
            parameter = String(parameter);
            if (containsOneOf(DOUBLE_DOT, parameter) ||
                containsOneOf(ENDS_PATH, parameter) ||
                containsOneOf(DIRECTORY_PATH, parameter)) {
                throw new Error('Disallowing path manipulation attempt. For more information see: https://go.atlassian.com/product-fetch-api-route');
            }
            return parameter;
        case 'query':
            if (isRoute(parameter)) {
                return encodeURIComponent(parameter.value);
            }
            else if (parameter instanceof URLSearchParams) {
                return parameter.toString();
            }
            else {
                return encodeURIComponent(parameter);
            }
    }
}
function route(template, ...parameters) {
    let mode = 'path';
    let result = '';
    for (let i = 0; i < template.length; i++) {
        const templateFragment = template[i];
        if (containsOneOf(ENDS_PATH, templateFragment)) {
            mode = 'query';
        }
        result += templateFragment;
        if (i >= parameters.length) {
            break;
        }
        result += escapeParameter(parameters[i], mode);
    }
    return new ReadonlyRoute(result);
}
exports.route = route;
function requireSafeUrl(url) {
    if (url instanceof ReadonlyRoute) {
        return url;
    }
    throw new Error(`You must create your route using the 'route' export from '@forge/api'.
See https://go.atlassian.com/forge-fetch-route for more information.`);
}
exports.requireSafeUrl = requireSafeUrl;
function assumeTrustedRoute(route) {
    return new ReadonlyRoute(route);
}
exports.assumeTrustedRoute = assumeTrustedRoute;
});

var jiraIssue = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraIssueStorage = void 0;


class JiraIssueStorage extends productScopedStorage.ProductScopedStorage {
    constructor(issueKey, apiClient) {
        const storageApiPath = (key) => (safeUrl.route) `/rest/api/3/issue/${issueKey}/properties/${key}`;
        super(storageApiPath, apiClient);
    }
}
exports.JiraIssueStorage = JiraIssueStorage;
});

var jiraProject = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraProjectStorage = void 0;


class JiraProjectStorage extends productScopedStorage.ProductScopedStorage {
    constructor(projectKey, apiClient) {
        const storageApiPath = (key) => (safeUrl.route) `/rest/api/3/project/${projectKey}/properties/${key}`;
        super(storageApiPath, apiClient);
    }
}
exports.JiraProjectStorage = JiraProjectStorage;
});

var confluenceVersionedStorage = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluenceVersionedStorage = void 0;


class ConfluenceVersionedStorage extends productScopedStorage.ProductScopedStorage {
    async versionedSet(key, value) {
        const versionResponse = await this.apiClient(this.storageApiPath(key));
        if (!versionResponse.ok && versionResponse.status !== 404) {
            throw out.APIError.forStatus(versionResponse.status);
        }
        const updatedVersionNumber = await this.getUpdatedVersion(versionResponse);
        const requestMethod = versionResponse.ok ? 'PUT' : 'POST';
        const requestBody = {
            value,
            version: {
                number: updatedVersionNumber
            }
        };
        const response = await this.apiClient(this.storageApiPath(key), this.buildSetRequestOptions(requestBody, requestMethod));
        if (!response.ok) {
            throw out.APIError.forStatus(response.status);
        }
    }
    async getUpdatedVersion(versionResponse) {
        if (!versionResponse.ok) {
            return 1;
        }
        else {
            const data = await versionResponse.json();
            return data.version.number + 1;
        }
    }
}
exports.ConfluenceVersionedStorage = ConfluenceVersionedStorage;
});

var confluencePage = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluencePageStorage = void 0;


class ConfluencePageStorage extends confluenceVersionedStorage.ConfluenceVersionedStorage {
    constructor(pageId, apiClient) {
        const storageApiPath = (key) => (safeUrl.route) `/wiki/rest/api/content/${pageId}/property/${key}`;
        super(storageApiPath, apiClient);
    }
    async set(key, value) {
        await this.versionedSet(key, value);
    }
}
exports.ConfluencePageStorage = ConfluencePageStorage;
});

var confluenceSpace = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluenceSpaceStorage = void 0;


class ConfluenceSpaceStorage extends confluenceVersionedStorage.ConfluenceVersionedStorage {
    constructor(spaceId, apiClient) {
        const storageApiPath = (key) => (safeUrl.route) `/wiki/rest/api/space/${spaceId}/property/${key}`;
        super(storageApiPath, apiClient);
    }
    async set(key, value) {
        await this.versionedSet(key, value);
    }
}
exports.ConfluenceSpaceStorage = ConfluenceSpaceStorage;
});

var sanitizedKey_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizedKey = void 0;
const sanitizedKey = (input) => {
    const regex = /^(~)?[A-Za-z0-9_\-\.]+$/;
    if (!regex.test(input)) {
        throw new Error('Invalid context/property key');
    }
    return input;
};
exports.sanitizedKey = sanitizedKey;
});

var properties = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertiesApi = void 0;






const getPropertiesInstance = (adapter) => {
    console.warn('The @forge/api Properties API is deprecated, you shoud now call product REST APIs directly.');
    const storage = {
        get: (key) => adapter.get((0, sanitizedKey_1.sanitizedKey)(key)),
        set: (key, value) => adapter.set((0, sanitizedKey_1.sanitizedKey)(key), value),
        delete: (key) => adapter.delete((0, sanitizedKey_1.sanitizedKey)(key))
    };
    return storage;
};
exports.propertiesApi = {
    onJiraIssue: (issueKey) => getPropertiesInstance(new jiraIssue.JiraIssueStorage((0, sanitizedKey_1.sanitizedKey)(issueKey), (0, out$2.asApp)().requestJira)),
    onJiraProject: (projectKey) => getPropertiesInstance(new jiraProject.JiraProjectStorage(projectKey, (0, out$2.asApp)().requestJira)),
    onConfluencePage: (pageId) => getPropertiesInstance(new confluencePage.ConfluencePageStorage((0, sanitizedKey_1.sanitizedKey)(pageId), (0, out$2.asApp)().requestConfluence)),
    onConfluenceSpace: (spaceId) => getPropertiesInstance(new confluenceSpace.ConfluenceSpaceStorage((0, sanitizedKey_1.sanitizedKey)(spaceId), (0, out$2.asApp)().requestConfluence))
};
});

var privacy = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReportPersonalData = exports.LIMIT = exports.URL = void 0;
exports.URL = '/app/report-accounts';
exports.LIMIT = 90;
const createReportPersonalData = (requestAtlassian) => {
    return function fetchUpdates(accounts) {
        if (accounts.length === 0) {
            return Promise.resolve([]);
        }
        const request = requestAtlassian(exports.URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ accounts: accounts.slice(0, exports.LIMIT) })
        }).then(async (resp) => {
            if (resp.status === 200) {
                return (await resp.json()).accounts;
            }
            if (resp.status === 204) {
                return [];
            }
            return Promise.reject(resp);
        });
        return Promise.all([request, fetchUpdates(accounts.slice(exports.LIMIT))]).then(([first, second]) => first.concat(second));
    };
};
exports.createReportPersonalData = createReportPersonalData;
});

var errors$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyRequestError = exports.InvalidRemoteError = exports.NeedsAuthenticationError = exports.InvalidWorkspaceRequestedError = exports.RequestProductNotAllowedError = exports.ProductEndpointNotAllowedError = exports.ExternalEndpointNotAllowedError = exports.NotAllowedError = exports.FetchError = exports.HttpError = exports.isExpectedError = exports.isHostedCodeError = exports.isForgePlatformError = exports.PROXY_ERR = exports.INVALID_REMOTE_ERR = exports.NEEDS_AUTHENTICATION_ERR = exports.FUNCTION_FETCH_ERR = exports.REQUEST_EGRESS_ALLOWLIST_ERR = exports.FUNCTION_ERR = void 0;
exports.FUNCTION_ERR = 'FUNCTION_ERR';
exports.REQUEST_EGRESS_ALLOWLIST_ERR = 'REQUEST_EGRESS_ALLOWLIST_ERR';
exports.FUNCTION_FETCH_ERR = 'FUNCTION_FETCH_ERR';
exports.NEEDS_AUTHENTICATION_ERR = 'NEEDS_AUTHENTICATION_ERR';
exports.INVALID_REMOTE_ERR = 'INVALID_REMOTE_ERR';
exports.PROXY_ERR = 'PROXY_ERR';
function isForgePlatformError(err) {
    return [exports.REQUEST_EGRESS_ALLOWLIST_ERR, exports.FUNCTION_FETCH_ERR, exports.NEEDS_AUTHENTICATION_ERR, exports.PROXY_ERR].includes(err.name);
}
exports.isForgePlatformError = isForgePlatformError;
function isHostedCodeError(err) {
    return [exports.FUNCTION_ERR, exports.REQUEST_EGRESS_ALLOWLIST_ERR, exports.FUNCTION_FETCH_ERR, exports.NEEDS_AUTHENTICATION_ERR].includes(typeof err === 'string' ? err : err.name);
}
exports.isHostedCodeError = isHostedCodeError;
function isExpectedError(err) {
    return err.name === exports.NEEDS_AUTHENTICATION_ERR && !!err.options?.isExpectedError;
}
exports.isExpectedError = isExpectedError;
class HttpError extends Error {
    status;
    constructor(message) {
        super(message);
    }
}
exports.HttpError = HttpError;
class FetchError extends Error {
    constructor(cause) {
        super(cause);
        this.stack = undefined;
        this.name = exports.FUNCTION_FETCH_ERR;
    }
}
exports.FetchError = FetchError;
class NotAllowedError extends HttpError {
    constructor(message) {
        super(message);
        this.stack = undefined;
        this.name = exports.REQUEST_EGRESS_ALLOWLIST_ERR;
        this.status = 403;
    }
}
exports.NotAllowedError = NotAllowedError;
class ExternalEndpointNotAllowedError extends NotAllowedError {
    constructor(failedURL) {
        super(`URL not included in the external fetch backend permissions: ${failedURL}. Visit go.atlassian.com/forge-egress for more information.`);
    }
}
exports.ExternalEndpointNotAllowedError = ExternalEndpointNotAllowedError;
class ProductEndpointNotAllowedError extends NotAllowedError {
    constructor(failedURL) {
        super(`URL not allowed: ${failedURL}.`);
    }
}
exports.ProductEndpointNotAllowedError = ProductEndpointNotAllowedError;
class RequestProductNotAllowedError extends NotAllowedError {
    constructor(requestedProduct, invocationProduct) {
        super(`Request ${requestedProduct} is not allowed from ${invocationProduct} context.`);
    }
}
exports.RequestProductNotAllowedError = RequestProductNotAllowedError;
class InvalidWorkspaceRequestedError extends NotAllowedError {
    constructor(failedURL) {
        super(`Invalid workspace requested in URL: ${failedURL}.`);
    }
}
exports.InvalidWorkspaceRequestedError = InvalidWorkspaceRequestedError;
class NeedsAuthenticationError extends HttpError {
    serviceKey;
    options;
    constructor(error, serviceKey, options) {
        super(error);
        this.serviceKey = serviceKey;
        this.options = options;
        this.stack = undefined;
        this.name = exports.NEEDS_AUTHENTICATION_ERR;
        this.status = 401;
    }
}
exports.NeedsAuthenticationError = NeedsAuthenticationError;
class InvalidRemoteError extends HttpError {
    remoteKey;
    constructor(error, remoteKey) {
        super(error);
        this.remoteKey = remoteKey;
        this.name = exports.INVALID_REMOTE_ERR;
        this.status = 400;
    }
}
exports.InvalidRemoteError = InvalidRemoteError;
class ProxyRequestError extends HttpError {
    status;
    errorCode;
    constructor(status, errorCode) {
        super(`Forge platform failed to process runtime HTTP request - ${status} - ${errorCode}`);
        this.status = status;
        this.errorCode = errorCode;
        this.name = exports.PROXY_ERR;
    }
}
exports.ProxyRequestError = ProxyRequestError;
});

// native patch for: node-fetch, whatwg-fetch
// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
var global = getGlobal();
var nodeFetch = global.fetch.bind(global);
const Headers = global.Headers;
const Request = global.Request;
const Response = global.Response;

var nodeFetch$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': nodeFetch,
    Headers: Headers,
    Request: Request,
    Response: Response
});

// src/virtual-agent/intent-question-projection/types.ts
var VirtualAgentIntentQuestionProjectionAriResourceOwner = "virtual-agent", VirtualAgentIntentQuestionProjectionAriResourceType = "intent-question-projection";

// src/errors.ts
var ValidationError = class extends Error {
};

// src/core/rules/platform-qualifier.ts
function validatePlatformQualifier(qualifier) {
  if (qualifier !== "cloud" && qualifier !== "third-party")
    throw new ValidationError(`Identifier must have a qualifier of 'cloud' or 'third-party'. Received: ${qualifier}`);
}

// src/core/rules/qualifier.ts
function validateAtiQualifier(qualifier) {
  if (qualifier !== "ati")
    throw new ValidationError(`ATI must have a qualifier of 'ati'. Received: ${qualifier}`);
}
function validateAriQualifier(qualifier) {
  if (qualifier !== "ari")
    throw new ValidationError(`ARI must have a qualifier of 'ari'. Received: ${qualifier}`);
}
function validateArmQualifier(qualifier) {
  if (qualifier !== "arm")
    throw new ValidationError(`ARM must have a qualifier of 'arm'. Received: ${qualifier}`);
}

// src/core/parser/base.ts
var NUMBER_OF_BASE_SEGMENTS = 5, SEGMENT_SEPARATOR = ":", BaseParser = class {
  static getIdentifierSegments(inputStr, numberOfSegmentsRequired) {
    let allSegments = inputStr.split(SEGMENT_SEPARATOR);
    if (allSegments.length < numberOfSegmentsRequired)
      throw new ValidationError(`Input string must have ${numberOfSegmentsRequired} segments.`);
    if (allSegments.length > numberOfSegmentsRequired) {
      let segments = allSegments.slice(0, NUMBER_OF_BASE_SEGMENTS - 1), segmentsForResourceId = allSegments.slice(NUMBER_OF_BASE_SEGMENTS - 1, allSegments.length);
      return [...segments, segmentsForResourceId.join(SEGMENT_SEPARATOR)];
    }
    return allSegments;
  }
};

// src/core/rules/cloud-id.ts
function validateCloudId(cloudId, format = new RegExp("^[a-zA-Z0-9\\-]*$")) {
  if (!cloudId.match(format))
    throw new ValidationError(`Invalid cloud ID, expected ID of format ${format}.`);
}

// src/core/rules/resource-id.ts
function validateResourceId(id, format = new RegExp("[a-zA-Z0-9\\-_.~@:{}=]+(/[a-zA-Z0-9\\-_.~@:{}=]+)*" /* ANY_RESOURCE_ID */), key = "resourceId") {
  let formatWithCarets = new RegExp(`^${format.source}$`);
  if (!id.match(formatWithCarets))
    throw new ValidationError(`Invalid ${key} - ${id}, expected ID of format ${formatWithCarets}.`);
}

// src/core/rules/resource-id-segments.ts
function validateResourceIdSegments(resourceIdSegmentValues, resourceIdSegmentFormats) {
  Object.entries(resourceIdSegmentValues).forEach(([resourceIdKey, resourceIdValue]) => {
    validateResourceId(resourceIdValue, resourceIdSegmentFormats == null ? void 0 : resourceIdSegmentFormats[resourceIdKey], resourceIdKey);
  });
}

// src/core/rules/resource-owner.ts
function validateResourceOwner(owner, expectedResourceOwner) {
  if (expectedResourceOwner && owner !== expectedResourceOwner)
    throw new ValidationError(`Invalid resource owner - ${owner}, expected ${expectedResourceOwner}.`);
}

// src/core/rules/resource-type.ts
function validateResourceType(type, expectedResourceType) {
  if (expectedResourceType && type !== expectedResourceType)
    throw new ValidationError(`Invalid resource type - ${type}, expected ${expectedResourceType}.`);
}

// src/core/parser/ari.ts
var NUMBER_OF_ARI_SEGMENTS = 5, AriParser = class extends BaseParser {
  static fromString(maybeAri, ariProperties) {
    let segments = this.getIdentifierSegments(maybeAri, NUMBER_OF_ARI_SEGMENTS), [qualifier, platformQualifier, resourceOwner, cloudId, resourceTypeAndId] = segments, [resourceType, ...resourceIdSegments] = resourceTypeAndId.split("/"), maybeAriDerivedProperties = {
      qualifier,
      platformQualifier,
      cloudId,
      resourceOwner,
      resourceType,
      resourceId: resourceIdSegments.join("/"),
      resourceIdSegmentValues: ariProperties != null && ariProperties.resourceIdSlug ? this.ariSegmentValuesFromSlug(
        ariProperties.resourceIdSlug,
        resourceIdSegments.join("/"),
        Object.keys(ariProperties.resourceIdSegmentFormats)
      ) : {}
    };
    return this.fromOpts(maybeAriDerivedProperties, ariProperties);
  }
  static fromOpts(maybeAriOpts, ariProperties) {
    let {
      qualifier = "ari",
      platformQualifier = "cloud",
      resourceOwner,
      cloudId,
      resourceId,
      resourceIdSegmentValues,
      resourceType
    } = maybeAriOpts;
    return validateAriQualifier(qualifier), validatePlatformQualifier(platformQualifier), validateCloudId(maybeAriOpts.cloudId || "", ariProperties == null ? void 0 : ariProperties.cloudId), validateResourceOwner(resourceOwner, ariProperties == null ? void 0 : ariProperties.resourceOwner), validateResourceType(resourceType, ariProperties == null ? void 0 : ariProperties.resourceType), validateResourceIdSegments(resourceIdSegmentValues, ariProperties == null ? void 0 : ariProperties.resourceIdSegmentFormats), {
      qualifier,
      resourceOwner,
      resourceType,
      platformQualifier,
      cloudId,
      resourceId,
      resourceIdSegmentValues
    };
  }
  static ariSegmentValuesFromSlug(slug, incomingSegments, expectedKeys) {
    let regexpResult = new RegExp("^" + slug.replace(/\{(.*?)\}/g, "(?<$1>.*?)") + "$").exec(incomingSegments);
    if (!regexpResult)
      throw new ValidationError(`Segment '${incomingSegments}' don't match expected slug: ${slug}`);
    return expectedKeys.forEach((expectedKey) => {
      var _a;
      if (!((_a = regexpResult.groups) != null && _a[expectedKey]))
        throw new ValidationError(`No value supplied for '${expectedKey}' based on slug ${slug}`);
    }), regexpResult.groups || {};
  }
};

// src/core/parser/ati.ts
var NUMBER_OF_ATI_SEGMENTS = 4, AtiParser = class extends BaseParser {
  static fromString(inputStr, atiOpts) {
    let segments = this.getIdentifierSegments(inputStr, NUMBER_OF_ATI_SEGMENTS), [qualifier = "ati", platformQualifier = "cloud", resourceOwner, resourceType] = segments;
    return validateAtiQualifier(qualifier), validatePlatformQualifier(platformQualifier), validateResourceOwner(resourceOwner, atiOpts == null ? void 0 : atiOpts.resourceOwner), validateResourceType(resourceType, atiOpts == null ? void 0 : atiOpts.resourceType), { platformQualifier, resourceOwner, resourceType };
  }
  static fromOpts(maybeAtiOpts, atiOpts) {
    let { qualifier, platformQualifier, resourceOwner, resourceType } = maybeAtiOpts;
    return validateAtiQualifier(qualifier), validatePlatformQualifier(platformQualifier), validateResourceOwner(resourceOwner, atiOpts == null ? void 0 : atiOpts.resourceOwner), validateResourceType(resourceType, atiOpts == null ? void 0 : atiOpts.resourceType), {
      platformQualifier,
      resourceOwner,
      resourceType
    };
  }
};

// src/ati.ts
var Ati = class _Ati {
  constructor(platformQualifier, resourceOwner, resourceType) {
    this._platformQualifier = platformQualifier, this._resourceOwner = resourceOwner, this._resourceType = resourceType;
  }
  get platformQualifier() {
    return this._platformQualifier;
  }
  get resourceOwner() {
    return this._resourceOwner;
  }
  get resourceType() {
    return this._resourceType;
  }
  static create(opts) {
    return new _Ati(opts.platformQualifier || "cloud", opts.resourceOwner, opts.resourceType);
  }
  static parse(maybeAti, atiOpts) {
    let opts = AtiParser.fromString(maybeAti, atiOpts);
    return new _Ati(opts.platformQualifier, opts.resourceOwner, opts.resourceType);
  }
  toString() {
    return `ati:${this.platformQualifier}:${this.resourceOwner}:${this.resourceType}`;
  }
  toJSON() {
    return this.toString();
  }
  toOpts() {
    return {
      platformQualifier: this._platformQualifier,
      resourceOwner: this._resourceOwner,
      resourceType: this._resourceType
    };
  }
};

// src/core/ari.ts
var Ari = class {
  constructor(opts) {
    this._ati = Ati.create({
      platformQualifier: opts.platformQualifier || "cloud",
      resourceOwner: opts.resourceOwner,
      resourceType: opts.resourceType
    }), this._cloudId = opts.cloudId !== "" ? opts.cloudId : void 0, this._resourceId = opts.resourceId;
  }
  get platformQualifier() {
    return this._ati.platformQualifier;
  }
  get cloudId() {
    return this._cloudId;
  }
  get resourceOwner() {
    return this._ati.resourceOwner;
  }
  get resourceType() {
    return this._ati.resourceType;
  }
  get resourceId() {
    return this._resourceId;
  }
  get ati() {
    return this._ati;
  }
  equals(other) {
    return this.toString() === other.toString();
  }
  toString() {
    return `ari:${this.platformQualifier}:${this.resourceOwner}:${this.cloudId || ""}:${this.resourceType}/${this.resourceId}`;
  }
  toJSON() {
    return this.toString();
  }
  toOpts() {
    return {
      platformQualifier: this.platformQualifier,
      resourceOwner: this.resourceOwner,
      cloudId: this.cloudId,
      resourceType: this.resourceType,
      resourceId: this.resourceId
    };
  }
};

// src/any-ari.ts
var AnyAri = class _AnyAri extends Ari {
  constructor(opts) {
    super(opts);
  }
  static create(ariOpts, ariStaticOpts) {
    let ariOptsWithDefaults = { ...ariOpts, resourceIdSegmentValues: {} }, validatedOpts = AriParser.fromOpts(ariOptsWithDefaults, ariStaticOpts);
    return new _AnyAri(validatedOpts);
  }
  static parse(maybeAri, ariStaticOpts) {
    let validatedOpts = AriParser.fromString(maybeAri, ariStaticOpts);
    return new _AnyAri(validatedOpts);
  }
  static check(maybeAri) {
    try {
      return _AnyAri.parse(maybeAri.toString()), !0;
    } catch (err) {
      return !1;
    }
  }
  asAnyAri() {
    return this;
  }
};

// src/core/registered-ari.ts
var RegisteredAri = class extends Ari {
  static check(maybeAri) {
    try {
      return this.parse(maybeAri.toString()), !0;
    } catch (err) {
      return !1;
    }
  }
  asAnyAri() {
    return AnyAri.parse(this.toString());
  }
};

// src/virtual-agent/intent-question-projection/manifest.ts
var virtualAgentIntentQuestionProjectionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: VirtualAgentIntentQuestionProjectionAriResourceOwner,
  resourceType: VirtualAgentIntentQuestionProjectionAriResourceType,
  resourceIdSlug: "{activationId}/{configurationId}/{intentQuestionId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    configurationId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    intentQuestionId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/virtual-agent/intent-question-projection/index.ts
var VirtualAgentIntentQuestionProjectionAri = class _VirtualAgentIntentQuestionProjectionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._configurationId = opts.resourceIdSegmentValues.configurationId, this._intentQuestionId = opts.resourceIdSegmentValues.intentQuestionId;
  }
  get activationId() {
    return this._activationId;
  }
  get configurationId() {
    return this._configurationId;
  }
  get intentQuestionId() {
    return this._intentQuestionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: virtualAgentIntentQuestionProjectionAriStaticOpts.qualifier,
      platformQualifier: virtualAgentIntentQuestionProjectionAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: virtualAgentIntentQuestionProjectionAriStaticOpts.resourceOwner,
      resourceType: virtualAgentIntentQuestionProjectionAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.configurationId}/${opts.intentQuestionId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        configurationId: opts.configurationId,
        intentQuestionId: opts.intentQuestionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, virtualAgentIntentQuestionProjectionAriStaticOpts);
    return new _VirtualAgentIntentQuestionProjectionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, virtualAgentIntentQuestionProjectionAriStaticOpts);
    return new _VirtualAgentIntentQuestionProjectionAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      configurationId: this.configurationId,
      intentQuestionId: this.intentQuestionId
    };
  }
};

// src/virtual-agent/intent-rule-projection/types.ts
var VirtualAgentIntentRuleProjectionAriResourceOwner = "virtual-agent", VirtualAgentIntentRuleProjectionAriResourceType = "intent-rule-projection";

// src/virtual-agent/intent-rule-projection/manifest.ts
var virtualAgentIntentRuleProjectionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: VirtualAgentIntentRuleProjectionAriResourceOwner,
  resourceType: VirtualAgentIntentRuleProjectionAriResourceType,
  resourceIdSlug: "{activationId}/{configurationId}/{intentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    configurationId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    intentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/virtual-agent/intent-rule-projection/index.ts
var VirtualAgentIntentRuleProjectionAri = class _VirtualAgentIntentRuleProjectionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._configurationId = opts.resourceIdSegmentValues.configurationId, this._intentId = opts.resourceIdSegmentValues.intentId;
  }
  get activationId() {
    return this._activationId;
  }
  get configurationId() {
    return this._configurationId;
  }
  get intentId() {
    return this._intentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: virtualAgentIntentRuleProjectionAriStaticOpts.qualifier,
      platformQualifier: virtualAgentIntentRuleProjectionAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: virtualAgentIntentRuleProjectionAriStaticOpts.resourceOwner,
      resourceType: virtualAgentIntentRuleProjectionAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.configurationId}/${opts.intentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        configurationId: opts.configurationId,
        intentId: opts.intentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, virtualAgentIntentRuleProjectionAriStaticOpts);
    return new _VirtualAgentIntentRuleProjectionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, virtualAgentIntentRuleProjectionAriStaticOpts);
    return new _VirtualAgentIntentRuleProjectionAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      configurationId: this.configurationId,
      intentId: this.intentId
    };
  }
};

// src/virtual-agent/intent-template/types.ts
var VirtualAgentIntentTemplateAriResourceOwner = "virtual-agent", VirtualAgentIntentTemplateAriResourceType = "intent-template";

// src/virtual-agent/intent-template/manifest.ts
var virtualAgentIntentTemplateAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: VirtualAgentIntentTemplateAriResourceOwner,
  resourceType: VirtualAgentIntentTemplateAriResourceType,
  resourceIdSlug: "{activationId}/{intentTemplateId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    intentTemplateId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/virtual-agent/intent-template/index.ts
var VirtualAgentIntentTemplateAri = class _VirtualAgentIntentTemplateAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._intentTemplateId = opts.resourceIdSegmentValues.intentTemplateId;
  }
  get activationId() {
    return this._activationId;
  }
  get intentTemplateId() {
    return this._intentTemplateId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: virtualAgentIntentTemplateAriStaticOpts.qualifier,
      platformQualifier: virtualAgentIntentTemplateAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: virtualAgentIntentTemplateAriStaticOpts.resourceOwner,
      resourceType: virtualAgentIntentTemplateAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.intentTemplateId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        intentTemplateId: opts.intentTemplateId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, virtualAgentIntentTemplateAriStaticOpts);
    return new _VirtualAgentIntentTemplateAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, virtualAgentIntentTemplateAriStaticOpts);
    return new _VirtualAgentIntentTemplateAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      intentTemplateId: this.intentTemplateId
    };
  }
};

// src/virtual-agent/configuration/types.ts
var VirtualAgentConfigurationAriResourceOwner = "virtual-agent", VirtualAgentConfigurationAriResourceType = "configuration";

// src/virtual-agent/configuration/manifest.ts
var virtualAgentConfigurationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: VirtualAgentConfigurationAriResourceOwner,
  resourceType: VirtualAgentConfigurationAriResourceType,
  resourceIdSlug: "{activationId}/{configurationId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    configurationId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/virtual-agent/configuration/index.ts
var VirtualAgentConfigurationAri = class _VirtualAgentConfigurationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._configurationId = opts.resourceIdSegmentValues.configurationId;
  }
  get activationId() {
    return this._activationId;
  }
  get configurationId() {
    return this._configurationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: virtualAgentConfigurationAriStaticOpts.qualifier,
      platformQualifier: virtualAgentConfigurationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: virtualAgentConfigurationAriStaticOpts.resourceOwner,
      resourceType: virtualAgentConfigurationAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.configurationId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        configurationId: opts.configurationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, virtualAgentConfigurationAriStaticOpts);
    return new _VirtualAgentConfigurationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, virtualAgentConfigurationAriStaticOpts);
    return new _VirtualAgentConfigurationAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      configurationId: this.configurationId
    };
  }
};

// src/virtual-agent/conversation/types.ts
var VirtualAgentConversationAriResourceOwner = "virtual-agent", VirtualAgentConversationAriResourceType = "conversation";

// src/virtual-agent/conversation/manifest.ts
var virtualAgentConversationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: VirtualAgentConversationAriResourceOwner,
  resourceType: VirtualAgentConversationAriResourceType,
  resourceIdSlug: "{activationId}/{configurationId}/{conversationId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    configurationId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    conversationId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/virtual-agent/conversation/index.ts
var VirtualAgentConversationAri = class _VirtualAgentConversationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._configurationId = opts.resourceIdSegmentValues.configurationId, this._conversationId = opts.resourceIdSegmentValues.conversationId;
  }
  get activationId() {
    return this._activationId;
  }
  get configurationId() {
    return this._configurationId;
  }
  get conversationId() {
    return this._conversationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: virtualAgentConversationAriStaticOpts.qualifier,
      platformQualifier: virtualAgentConversationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: virtualAgentConversationAriStaticOpts.resourceOwner,
      resourceType: virtualAgentConversationAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.configurationId}/${opts.conversationId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        configurationId: opts.configurationId,
        conversationId: opts.conversationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, virtualAgentConversationAriStaticOpts);
    return new _VirtualAgentConversationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, virtualAgentConversationAriStaticOpts);
    return new _VirtualAgentConversationAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      configurationId: this.configurationId,
      conversationId: this.conversationId
    };
  }
};

// src/virtual-agent/flow-editor/types.ts
var VirtualAgentFlowEditorAriResourceOwner = "virtual-agent", VirtualAgentFlowEditorAriResourceType = "flow-editor";

// src/virtual-agent/flow-editor/manifest.ts
var virtualAgentFlowEditorAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: VirtualAgentFlowEditorAriResourceOwner,
  resourceType: VirtualAgentFlowEditorAriResourceType,
  resourceIdSlug: "{activationId}/{configurationId}/{flowEditorId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    configurationId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    flowEditorId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/virtual-agent/flow-editor/index.ts
var VirtualAgentFlowEditorAri = class _VirtualAgentFlowEditorAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._configurationId = opts.resourceIdSegmentValues.configurationId, this._flowEditorId = opts.resourceIdSegmentValues.flowEditorId;
  }
  get activationId() {
    return this._activationId;
  }
  get configurationId() {
    return this._configurationId;
  }
  get flowEditorId() {
    return this._flowEditorId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: virtualAgentFlowEditorAriStaticOpts.qualifier,
      platformQualifier: virtualAgentFlowEditorAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: virtualAgentFlowEditorAriStaticOpts.resourceOwner,
      resourceType: virtualAgentFlowEditorAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.configurationId}/${opts.flowEditorId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        configurationId: opts.configurationId,
        flowEditorId: opts.flowEditorId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, virtualAgentFlowEditorAriStaticOpts);
    return new _VirtualAgentFlowEditorAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, virtualAgentFlowEditorAriStaticOpts);
    return new _VirtualAgentFlowEditorAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      configurationId: this.configurationId,
      flowEditorId: this.flowEditorId
    };
  }
};

// src/virtual-agent/intent-projection/types.ts
var VirtualAgentIntentProjectionAriResourceOwner = "virtual-agent", VirtualAgentIntentProjectionAriResourceType = "intent-projection";

// src/virtual-agent/intent-projection/manifest.ts
var virtualAgentIntentProjectionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: VirtualAgentIntentProjectionAriResourceOwner,
  resourceType: VirtualAgentIntentProjectionAriResourceType,
  resourceIdSlug: "{activationId}/{configurationId}/{intentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    configurationId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    intentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/virtual-agent/intent-projection/index.ts
var VirtualAgentIntentProjectionAri = class _VirtualAgentIntentProjectionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._configurationId = opts.resourceIdSegmentValues.configurationId, this._intentId = opts.resourceIdSegmentValues.intentId;
  }
  get activationId() {
    return this._activationId;
  }
  get configurationId() {
    return this._configurationId;
  }
  get intentId() {
    return this._intentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: virtualAgentIntentProjectionAriStaticOpts.qualifier,
      platformQualifier: virtualAgentIntentProjectionAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: virtualAgentIntentProjectionAriStaticOpts.resourceOwner,
      resourceType: virtualAgentIntentProjectionAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.configurationId}/${opts.intentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        configurationId: opts.configurationId,
        intentId: opts.intentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, virtualAgentIntentProjectionAriStaticOpts);
    return new _VirtualAgentIntentProjectionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, virtualAgentIntentProjectionAriStaticOpts);
    return new _VirtualAgentIntentProjectionAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      configurationId: this.configurationId,
      intentId: this.intentId
    };
  }
};

// src/unified-help/role/types.ts
var UnifiedHelpRoleAriResourceOwner = "unified-help", UnifiedHelpRoleAriResourceType = "role";

// src/unified-help/role/manifest.ts
var unifiedHelpRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: UnifiedHelpRoleAriResourceOwner,
  resourceType: UnifiedHelpRoleAriResourceType,
  resourceIdSlug: "product/{roleType}",
  resourceIdSegmentFormats: {
    roleType: /(?:member|admin)/
    // eslint-disable-line no-useless-escape
  }
};

// src/unified-help/role/index.ts
var UnifiedHelpRoleAri = class _UnifiedHelpRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleType = opts.resourceIdSegmentValues.roleType;
  }
  get roleType() {
    return this._roleType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: unifiedHelpRoleAriStaticOpts.qualifier,
      platformQualifier: unifiedHelpRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: unifiedHelpRoleAriStaticOpts.resourceOwner,
      resourceType: unifiedHelpRoleAriStaticOpts.resourceType,
      resourceId: `product/${opts.roleType}`,
      resourceIdSegmentValues: {
        roleType: opts.roleType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, unifiedHelpRoleAriStaticOpts);
    return new _UnifiedHelpRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, unifiedHelpRoleAriStaticOpts);
    return new _UnifiedHelpRoleAri(opts);
  }
  getVariables() {
    return {
      roleType: this.roleType
    };
  }
};

// src/unified-help/site/types.ts
var UnifiedHelpSiteAriResourceOwner = "unified-help", UnifiedHelpSiteAriResourceType = "site";

// src/unified-help/site/manifest.ts
var unifiedHelpSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: UnifiedHelpSiteAriResourceOwner,
  resourceType: UnifiedHelpSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/unified-help/site/index.ts
var UnifiedHelpSiteAri = class _UnifiedHelpSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: unifiedHelpSiteAriStaticOpts.qualifier,
      platformQualifier: unifiedHelpSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: unifiedHelpSiteAriStaticOpts.resourceOwner,
      resourceType: unifiedHelpSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, unifiedHelpSiteAriStaticOpts);
    return new _UnifiedHelpSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, unifiedHelpSiteAriStaticOpts);
    return new _UnifiedHelpSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/unified-help/workspace/types.ts
var UnifiedHelpWorkspaceAriResourceOwner = "unified-help", UnifiedHelpWorkspaceAriResourceType = "workspace";

// src/unified-help/workspace/manifest.ts
var unifiedHelpWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: UnifiedHelpWorkspaceAriResourceOwner,
  resourceType: UnifiedHelpWorkspaceAriResourceType,
  resourceIdSlug: "{activationId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/unified-help/workspace/index.ts
var UnifiedHelpWorkspaceAri = class _UnifiedHelpWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId;
  }
  get activationId() {
    return this._activationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: unifiedHelpWorkspaceAriStaticOpts.qualifier,
      platformQualifier: unifiedHelpWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: unifiedHelpWorkspaceAriStaticOpts.resourceOwner,
      resourceType: unifiedHelpWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, unifiedHelpWorkspaceAriStaticOpts);
    return new _UnifiedHelpWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, unifiedHelpWorkspaceAriStaticOpts);
    return new _UnifiedHelpWorkspaceAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId
    };
  }
};

// src/trello/role/types.ts
var TrelloRoleAriResourceOwner = "trello", TrelloRoleAriResourceType = "role";

// src/trello/role/manifest.ts
var trelloRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TrelloRoleAriResourceOwner,
  resourceType: TrelloRoleAriResourceType,
  resourceIdSlug: "{roleGroup}/{roleType}",
  resourceIdSegmentFormats: {
    roleGroup: /(?:workspace|enterprise|product)/,
    // eslint-disable-line no-useless-escape
    roleType: /(?:member|admin)/
    // eslint-disable-line no-useless-escape
  }
};

// src/trello/role/index.ts
var TrelloRoleAri = class _TrelloRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleGroup = opts.resourceIdSegmentValues.roleGroup, this._roleType = opts.resourceIdSegmentValues.roleType;
  }
  get roleGroup() {
    return this._roleGroup;
  }
  get roleType() {
    return this._roleType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: trelloRoleAriStaticOpts.qualifier,
      platformQualifier: trelloRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: trelloRoleAriStaticOpts.resourceOwner,
      resourceType: trelloRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleGroup}/${opts.roleType}`,
      resourceIdSegmentValues: {
        roleGroup: opts.roleGroup,
        roleType: opts.roleType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, trelloRoleAriStaticOpts);
    return new _TrelloRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, trelloRoleAriStaticOpts);
    return new _TrelloRoleAri(opts);
  }
  getVariables() {
    return {
      roleGroup: this.roleGroup,
      roleType: this.roleType
    };
  }
};

// src/trello/site/types.ts
var TrelloSiteAriResourceOwner = "trello", TrelloSiteAriResourceType = "site";

// src/trello/site/manifest.ts
var trelloSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TrelloSiteAriResourceOwner,
  resourceType: TrelloSiteAriResourceType,
  resourceIdSlug: "trello",
  resourceIdSegmentFormats: {}
};

// src/trello/site/index.ts
var TrelloSiteAri = class _TrelloSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: trelloSiteAriStaticOpts.qualifier,
      platformQualifier: trelloSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: trelloSiteAriStaticOpts.resourceOwner,
      resourceType: trelloSiteAriStaticOpts.resourceType,
      resourceId: "trello",
      resourceIdSegmentValues: {}
    }, ariOpts = AriParser.fromOpts(derivedOpts, trelloSiteAriStaticOpts);
    return new _TrelloSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, trelloSiteAriStaticOpts);
    return new _TrelloSiteAri(opts);
  }
  getVariables() {
    return {};
  }
};

// src/trello/user/types.ts
var TrelloUserAriResourceOwner = "trello", TrelloUserAriResourceType = "user";

// src/trello/user/manifest.ts
var trelloUserAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TrelloUserAriResourceOwner,
  resourceType: TrelloUserAriResourceType,
  resourceIdSlug: "{userId}",
  resourceIdSegmentFormats: {
    userId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/trello/user/index.ts
var TrelloUserAri = class _TrelloUserAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._userId = opts.resourceIdSegmentValues.userId;
  }
  get userId() {
    return this._userId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: trelloUserAriStaticOpts.qualifier,
      platformQualifier: trelloUserAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: trelloUserAriStaticOpts.resourceOwner,
      resourceType: trelloUserAriStaticOpts.resourceType,
      resourceId: `${opts.userId}`,
      resourceIdSegmentValues: {
        userId: opts.userId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, trelloUserAriStaticOpts);
    return new _TrelloUserAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, trelloUserAriStaticOpts);
    return new _TrelloUserAri(opts);
  }
  getVariables() {
    return {
      userId: this.userId
    };
  }
};

// src/trello/workspace/types.ts
var TrelloWorkspaceAriResourceOwner = "trello", TrelloWorkspaceAriResourceType = "workspace";

// src/trello/workspace/manifest.ts
var trelloWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TrelloWorkspaceAriResourceOwner,
  resourceType: TrelloWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/trello/workspace/index.ts
var TrelloWorkspaceAri = class _TrelloWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: trelloWorkspaceAriStaticOpts.qualifier,
      platformQualifier: trelloWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: trelloWorkspaceAriStaticOpts.resourceOwner,
      resourceType: trelloWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, trelloWorkspaceAriStaticOpts);
    return new _TrelloWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, trelloWorkspaceAriStaticOpts);
    return new _TrelloWorkspaceAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId
    };
  }
};

// src/trello/board/types.ts
var TrelloBoardAriResourceOwner = "trello", TrelloBoardAriResourceType = "board";

// src/trello/board/manifest.ts
var trelloBoardAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TrelloBoardAriResourceOwner,
  resourceType: TrelloBoardAriResourceType,
  resourceIdSlug: "workspace/{workspaceId}/{boardId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-_.]*/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.]*/
    // eslint-disable-line no-useless-escape
  }
};

// src/trello/board/index.ts
var TrelloBoardAri = class _TrelloBoardAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._boardId = opts.resourceIdSegmentValues.boardId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get boardId() {
    return this._boardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: trelloBoardAriStaticOpts.qualifier,
      platformQualifier: trelloBoardAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: trelloBoardAriStaticOpts.resourceOwner,
      resourceType: trelloBoardAriStaticOpts.resourceType,
      resourceId: `workspace/${opts.workspaceId}/${opts.boardId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId || "",
        boardId: opts.boardId || ""
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, trelloBoardAriStaticOpts);
    return new _TrelloBoardAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, trelloBoardAriStaticOpts);
    return new _TrelloBoardAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      boardId: this.boardId
    };
  }
};

// src/trello/card/types.ts
var TrelloCardAriResourceOwner = "trello", TrelloCardAriResourceType = "card";

// src/trello/card/manifest.ts
var trelloCardAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TrelloCardAriResourceOwner,
  resourceType: TrelloCardAriResourceType,
  resourceIdSlug: "workspace/{workspaceId}/{cardId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-_.]*/,
    // eslint-disable-line no-useless-escape
    cardId: /[a-zA-Z0-9\-_.]*/
    // eslint-disable-line no-useless-escape
  }
};

// src/trello/card/index.ts
var TrelloCardAri = class _TrelloCardAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._cardId = opts.resourceIdSegmentValues.cardId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get cardId() {
    return this._cardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: trelloCardAriStaticOpts.qualifier,
      platformQualifier: trelloCardAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: trelloCardAriStaticOpts.resourceOwner,
      resourceType: trelloCardAriStaticOpts.resourceType,
      resourceId: `workspace/${opts.workspaceId}/${opts.cardId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId || "",
        cardId: opts.cardId || ""
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, trelloCardAriStaticOpts);
    return new _TrelloCardAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, trelloCardAriStaticOpts);
    return new _TrelloCardAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      cardId: this.cardId
    };
  }
};

// src/trello/enterprise/types.ts
var TrelloEnterpriseAriResourceOwner = "trello", TrelloEnterpriseAriResourceType = "enterprise";

// src/trello/enterprise/manifest.ts
var trelloEnterpriseAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TrelloEnterpriseAriResourceOwner,
  resourceType: TrelloEnterpriseAriResourceType,
  resourceIdSlug: "{enterpriseId}",
  resourceIdSegmentFormats: {
    enterpriseId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/trello/enterprise/index.ts
var TrelloEnterpriseAri = class _TrelloEnterpriseAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._enterpriseId = opts.resourceIdSegmentValues.enterpriseId;
  }
  get enterpriseId() {
    return this._enterpriseId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: trelloEnterpriseAriStaticOpts.qualifier,
      platformQualifier: trelloEnterpriseAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: trelloEnterpriseAriStaticOpts.resourceOwner,
      resourceType: trelloEnterpriseAriStaticOpts.resourceType,
      resourceId: `${opts.enterpriseId}`,
      resourceIdSegmentValues: {
        enterpriseId: opts.enterpriseId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, trelloEnterpriseAriStaticOpts);
    return new _TrelloEnterpriseAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, trelloEnterpriseAriStaticOpts);
    return new _TrelloEnterpriseAri(opts);
  }
  getVariables() {
    return {
      enterpriseId: this.enterpriseId
    };
  }
};

// src/trello/list/types.ts
var TrelloListAriResourceOwner = "trello", TrelloListAriResourceType = "list";

// src/trello/list/manifest.ts
var trelloListAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TrelloListAriResourceOwner,
  resourceType: TrelloListAriResourceType,
  resourceIdSlug: "workspace/{workspaceId}/{listId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-_.]*/,
    // eslint-disable-line no-useless-escape
    listId: /[a-zA-Z0-9\-_.]*/
    // eslint-disable-line no-useless-escape
  }
};

// src/trello/list/index.ts
var TrelloListAri = class _TrelloListAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._listId = opts.resourceIdSegmentValues.listId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get listId() {
    return this._listId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: trelloListAriStaticOpts.qualifier,
      platformQualifier: trelloListAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: trelloListAriStaticOpts.resourceOwner,
      resourceType: trelloListAriStaticOpts.resourceType,
      resourceId: `workspace/${opts.workspaceId}/${opts.listId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId || "",
        listId: opts.listId || ""
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, trelloListAriStaticOpts);
    return new _TrelloListAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, trelloListAriStaticOpts);
    return new _TrelloListAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      listId: this.listId
    };
  }
};

// src/townsquare/question/types.ts
var TownsquareQuestionAriResourceOwner = "townsquare", TownsquareQuestionAriResourceType = "question";

// src/townsquare/question/manifest.ts
var townsquareQuestionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: TownsquareQuestionAriResourceOwner,
  resourceType: TownsquareQuestionAriResourceType,
  resourceIdSlug: "{questionUuid}",
  resourceIdSegmentFormats: {
    questionUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/townsquare/question/index.ts
var TownsquareQuestionAri = class _TownsquareQuestionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._questionUuid = opts.resourceIdSegmentValues.questionUuid;
  }
  get siteId() {
    return this._siteId;
  }
  get questionUuid() {
    return this._questionUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: townsquareQuestionAriStaticOpts.qualifier,
      platformQualifier: townsquareQuestionAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: townsquareQuestionAriStaticOpts.resourceOwner,
      resourceType: townsquareQuestionAriStaticOpts.resourceType,
      resourceId: `${opts.questionUuid}`,
      resourceIdSegmentValues: {
        questionUuid: opts.questionUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, townsquareQuestionAriStaticOpts);
    return new _TownsquareQuestionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, townsquareQuestionAriStaticOpts);
    return new _TownsquareQuestionAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      questionUuid: this.questionUuid
    };
  }
};

// src/townsquare/role/types.ts
var TownsquareRoleAriResourceOwner = "townsquare", TownsquareRoleAriResourceType = "role";

// src/townsquare/role/manifest.ts
var townsquareRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TownsquareRoleAriResourceOwner,
  resourceType: TownsquareRoleAriResourceType,
  resourceIdSlug: "product/{roleType}",
  resourceIdSegmentFormats: {
    roleType: /(?:member|admin)/
    // eslint-disable-line no-useless-escape
  }
};

// src/townsquare/role/index.ts
var TownsquareRoleAri = class _TownsquareRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleType = opts.resourceIdSegmentValues.roleType;
  }
  get roleType() {
    return this._roleType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: townsquareRoleAriStaticOpts.qualifier,
      platformQualifier: townsquareRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: townsquareRoleAriStaticOpts.resourceOwner,
      resourceType: townsquareRoleAriStaticOpts.resourceType,
      resourceId: `product/${opts.roleType}`,
      resourceIdSegmentValues: {
        roleType: opts.roleType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, townsquareRoleAriStaticOpts);
    return new _TownsquareRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, townsquareRoleAriStaticOpts);
    return new _TownsquareRoleAri(opts);
  }
  getVariables() {
    return {
      roleType: this.roleType
    };
  }
};

// src/townsquare/site/types.ts
var TownsquareSiteAriResourceOwner = "townsquare", TownsquareSiteAriResourceType = "site";

// src/townsquare/site/manifest.ts
var townsquareSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TownsquareSiteAriResourceOwner,
  resourceType: TownsquareSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/townsquare/site/index.ts
var TownsquareSiteAri = class _TownsquareSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: townsquareSiteAriStaticOpts.qualifier,
      platformQualifier: townsquareSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: townsquareSiteAriStaticOpts.resourceOwner,
      resourceType: townsquareSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, townsquareSiteAriStaticOpts);
    return new _TownsquareSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, townsquareSiteAriStaticOpts);
    return new _TownsquareSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/townsquare/tag/types.ts
var TownsquareTagAriResourceOwner = "townsquare", TownsquareTagAriResourceType = "tag";

// src/townsquare/tag/manifest.ts
var townsquareTagAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: TownsquareTagAriResourceOwner,
  resourceType: TownsquareTagAriResourceType,
  resourceIdSlug: "{tagUuid}",
  resourceIdSegmentFormats: {
    tagUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/townsquare/tag/index.ts
var TownsquareTagAri = class _TownsquareTagAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._tagUuid = opts.resourceIdSegmentValues.tagUuid;
  }
  get siteId() {
    return this._siteId;
  }
  get tagUuid() {
    return this._tagUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: townsquareTagAriStaticOpts.qualifier,
      platformQualifier: townsquareTagAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: townsquareTagAriStaticOpts.resourceOwner,
      resourceType: townsquareTagAriStaticOpts.resourceType,
      resourceId: `${opts.tagUuid}`,
      resourceIdSegmentValues: {
        tagUuid: opts.tagUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, townsquareTagAriStaticOpts);
    return new _TownsquareTagAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, townsquareTagAriStaticOpts);
    return new _TownsquareTagAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      tagUuid: this.tagUuid
    };
  }
};

// src/townsquare/help-pointer/types.ts
var TownsquareHelpPointerAriResourceOwner = "townsquare", TownsquareHelpPointerAriResourceType = "help-pointer";

// src/townsquare/help-pointer/manifest.ts
var townsquareHelpPointerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: TownsquareHelpPointerAriResourceOwner,
  resourceType: TownsquareHelpPointerAriResourceType,
  resourceIdSlug: "{helpPointerUuid}",
  resourceIdSegmentFormats: {
    helpPointerUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/townsquare/help-pointer/index.ts
var TownsquareHelpPointerAri = class _TownsquareHelpPointerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._helpPointerUuid = opts.resourceIdSegmentValues.helpPointerUuid;
  }
  get siteId() {
    return this._siteId;
  }
  get helpPointerUuid() {
    return this._helpPointerUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: townsquareHelpPointerAriStaticOpts.qualifier,
      platformQualifier: townsquareHelpPointerAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: townsquareHelpPointerAriStaticOpts.resourceOwner,
      resourceType: townsquareHelpPointerAriStaticOpts.resourceType,
      resourceId: `${opts.helpPointerUuid}`,
      resourceIdSegmentValues: {
        helpPointerUuid: opts.helpPointerUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, townsquareHelpPointerAriStaticOpts);
    return new _TownsquareHelpPointerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, townsquareHelpPointerAriStaticOpts);
    return new _TownsquareHelpPointerAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      helpPointerUuid: this.helpPointerUuid
    };
  }
};

// src/townsquare/learning/types.ts
var TownsquareLearningAriResourceOwner = "townsquare", TownsquareLearningAriResourceType = "learning";

// src/townsquare/learning/manifest.ts
var townsquareLearningAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: TownsquareLearningAriResourceOwner,
  resourceType: TownsquareLearningAriResourceType,
  resourceIdSlug: "{learningUuid}",
  resourceIdSegmentFormats: {
    learningUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/townsquare/learning/index.ts
var TownsquareLearningAri = class _TownsquareLearningAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._learningUuid = opts.resourceIdSegmentValues.learningUuid;
  }
  get siteId() {
    return this._siteId;
  }
  get learningUuid() {
    return this._learningUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: townsquareLearningAriStaticOpts.qualifier,
      platformQualifier: townsquareLearningAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: townsquareLearningAriStaticOpts.resourceOwner,
      resourceType: townsquareLearningAriStaticOpts.resourceType,
      resourceId: `${opts.learningUuid}`,
      resourceIdSegmentValues: {
        learningUuid: opts.learningUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, townsquareLearningAriStaticOpts);
    return new _TownsquareLearningAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, townsquareLearningAriStaticOpts);
    return new _TownsquareLearningAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      learningUuid: this.learningUuid
    };
  }
};

// src/townsquare/project/types.ts
var TownsquareProjectAriResourceOwner = "townsquare", TownsquareProjectAriResourceType = "project";

// src/townsquare/project/manifest.ts
var townsquareProjectAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: TownsquareProjectAriResourceOwner,
  resourceType: TownsquareProjectAriResourceType,
  resourceIdSlug: "{projectUuid}",
  resourceIdSegmentFormats: {
    projectUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/townsquare/project/index.ts
var TownsquareProjectAri = class _TownsquareProjectAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._projectUuid = opts.resourceIdSegmentValues.projectUuid;
  }
  get siteId() {
    return this._siteId;
  }
  get projectUuid() {
    return this._projectUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: townsquareProjectAriStaticOpts.qualifier,
      platformQualifier: townsquareProjectAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: townsquareProjectAriStaticOpts.resourceOwner,
      resourceType: townsquareProjectAriStaticOpts.resourceType,
      resourceId: `${opts.projectUuid}`,
      resourceIdSegmentValues: {
        projectUuid: opts.projectUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, townsquareProjectAriStaticOpts);
    return new _TownsquareProjectAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, townsquareProjectAriStaticOpts);
    return new _TownsquareProjectAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      projectUuid: this.projectUuid
    };
  }
};

// src/teams/team/types.ts
var TeamsTeamAriResourceOwner = "teams", TeamsTeamAriResourceType = "team";

// src/teams/team/manifest.ts
var teamsTeamAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: TeamsTeamAriResourceOwner,
  resourceType: TeamsTeamAriResourceType,
  resourceIdSlug: "{teamId}",
  resourceIdSegmentFormats: {
    teamId: /[a-zA-Z0-9.\-_~]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/teams/team/index.ts
var TeamsTeamAri = class _TeamsTeamAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._teamId = opts.resourceIdSegmentValues.teamId;
  }
  get teamId() {
    return this._teamId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: teamsTeamAriStaticOpts.qualifier,
      platformQualifier: teamsTeamAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: teamsTeamAriStaticOpts.resourceOwner,
      resourceType: teamsTeamAriStaticOpts.resourceType,
      resourceId: `${opts.teamId}`,
      resourceIdSegmentValues: {
        teamId: opts.teamId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, teamsTeamAriStaticOpts);
    return new _TeamsTeamAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, teamsTeamAriStaticOpts);
    return new _TeamsTeamAri(opts);
  }
  getVariables() {
    return {
      teamId: this.teamId
    };
  }
};

// src/townsquare/comment/types.ts
var TownsquareCommentAriResourceOwner = "townsquare", TownsquareCommentAriResourceType = "comment";

// src/townsquare/comment/manifest.ts
var townsquareCommentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: TownsquareCommentAriResourceOwner,
  resourceType: TownsquareCommentAriResourceType,
  resourceIdSlug: "{commentUuid}",
  resourceIdSegmentFormats: {
    commentUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/townsquare/comment/index.ts
var TownsquareCommentAri = class _TownsquareCommentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._commentUuid = opts.resourceIdSegmentValues.commentUuid;
  }
  get siteId() {
    return this._siteId;
  }
  get commentUuid() {
    return this._commentUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: townsquareCommentAriStaticOpts.qualifier,
      platformQualifier: townsquareCommentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: townsquareCommentAriStaticOpts.resourceOwner,
      resourceType: townsquareCommentAriStaticOpts.resourceType,
      resourceId: `${opts.commentUuid}`,
      resourceIdSegmentValues: {
        commentUuid: opts.commentUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, townsquareCommentAriStaticOpts);
    return new _TownsquareCommentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, townsquareCommentAriStaticOpts);
    return new _TownsquareCommentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      commentUuid: this.commentUuid
    };
  }
};

// src/townsquare/goal/types.ts
var TownsquareGoalAriResourceOwner = "townsquare", TownsquareGoalAriResourceType = "goal";

// src/townsquare/goal/manifest.ts
var townsquareGoalAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: TownsquareGoalAriResourceOwner,
  resourceType: TownsquareGoalAriResourceType,
  resourceIdSlug: "{goalUuid}",
  resourceIdSegmentFormats: {
    goalUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/townsquare/goal/index.ts
var TownsquareGoalAri = class _TownsquareGoalAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._goalUuid = opts.resourceIdSegmentValues.goalUuid;
  }
  get siteId() {
    return this._siteId;
  }
  get goalUuid() {
    return this._goalUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: townsquareGoalAriStaticOpts.qualifier,
      platformQualifier: townsquareGoalAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: townsquareGoalAriStaticOpts.resourceOwner,
      resourceType: townsquareGoalAriStaticOpts.resourceType,
      resourceId: `${opts.goalUuid}`,
      resourceIdSegmentValues: {
        goalUuid: opts.goalUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, townsquareGoalAriStaticOpts);
    return new _TownsquareGoalAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, townsquareGoalAriStaticOpts);
    return new _TownsquareGoalAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      goalUuid: this.goalUuid
    };
  }
};

// src/statuspage/role/types.ts
var StatuspageRoleAriResourceOwner = "statuspage", StatuspageRoleAriResourceType = "role";

// src/statuspage/role/manifest.ts
var statuspageRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: StatuspageRoleAriResourceOwner,
  resourceType: StatuspageRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/statuspage/role/index.ts
var StatuspageRoleAri = class _StatuspageRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: statuspageRoleAriStaticOpts.qualifier,
      platformQualifier: statuspageRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: statuspageRoleAriStaticOpts.resourceOwner,
      resourceType: statuspageRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, statuspageRoleAriStaticOpts);
    return new _StatuspageRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, statuspageRoleAriStaticOpts);
    return new _StatuspageRoleAri(opts);
  }
  getVariables() {
    return {
      roleId: this.roleId
    };
  }
};

// src/statuspage/site/types.ts
var StatuspageSiteAriResourceOwner = "statuspage", StatuspageSiteAriResourceType = "site";

// src/statuspage/site/manifest.ts
var statuspageSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: StatuspageSiteAriResourceOwner,
  resourceType: StatuspageSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/statuspage/site/index.ts
var StatuspageSiteAri = class _StatuspageSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: statuspageSiteAriStaticOpts.qualifier,
      platformQualifier: statuspageSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: statuspageSiteAriStaticOpts.resourceOwner,
      resourceType: statuspageSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, statuspageSiteAriStaticOpts);
    return new _StatuspageSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, statuspageSiteAriStaticOpts);
    return new _StatuspageSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/support/customer/types.ts
var SupportCustomerAriResourceOwner = "support", SupportCustomerAriResourceType = "customer";

// src/support/customer/manifest.ts
var supportCustomerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: SupportCustomerAriResourceOwner,
  resourceType: SupportCustomerAriResourceType,
  resourceIdSlug: "{resourceName}",
  resourceIdSegmentFormats: {
    resourceName: /[a-zA-Z0-9\-_.]*/
    // eslint-disable-line no-useless-escape
  }
};

// src/support/customer/index.ts
var SupportCustomerAri = class _SupportCustomerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._resourceName = opts.resourceIdSegmentValues.resourceName;
  }
  get resourceName() {
    return this._resourceName;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: supportCustomerAriStaticOpts.qualifier,
      platformQualifier: supportCustomerAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: supportCustomerAriStaticOpts.resourceOwner,
      resourceType: supportCustomerAriStaticOpts.resourceType,
      resourceId: `${opts.resourceName}`,
      resourceIdSegmentValues: {
        resourceName: opts.resourceName || ""
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, supportCustomerAriStaticOpts);
    return new _SupportCustomerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, supportCustomerAriStaticOpts);
    return new _SupportCustomerAri(opts);
  }
  getVariables() {
    return {
      resourceName: this.resourceName
    };
  }
};

// src/runtime-auth-client/role/types.ts
var RuntimeAuthClientRoleAriResourceOwner = "runtime-auth-client", RuntimeAuthClientRoleAriResourceType = "role";

// src/runtime-auth-client/role/manifest.ts
var runtimeAuthClientRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: RuntimeAuthClientRoleAriResourceOwner,
  resourceType: RuntimeAuthClientRoleAriResourceType,
  resourceIdSlug: "product/{roleType}",
  resourceIdSegmentFormats: {
    roleType: /(?:member|admin)/
    // eslint-disable-line no-useless-escape
  }
};

// src/runtime-auth-client/role/index.ts
var RuntimeAuthClientRoleAri = class _RuntimeAuthClientRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleType = opts.resourceIdSegmentValues.roleType;
  }
  get roleType() {
    return this._roleType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: runtimeAuthClientRoleAriStaticOpts.qualifier,
      platformQualifier: runtimeAuthClientRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: runtimeAuthClientRoleAriStaticOpts.resourceOwner,
      resourceType: runtimeAuthClientRoleAriStaticOpts.resourceType,
      resourceId: `product/${opts.roleType}`,
      resourceIdSegmentValues: {
        roleType: opts.roleType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, runtimeAuthClientRoleAriStaticOpts);
    return new _RuntimeAuthClientRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, runtimeAuthClientRoleAriStaticOpts);
    return new _RuntimeAuthClientRoleAri(opts);
  }
  getVariables() {
    return {
      roleType: this.roleType
    };
  }
};

// src/search/event/types.ts
var SearchEventAriResourceOwner = "search", SearchEventAriResourceType = "event";

// src/search/event/manifest.ts
var searchEventAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: SearchEventAriResourceOwner,
  resourceType: SearchEventAriResourceType,
  resourceIdSlug: "{eventType}/{eventId}",
  resourceIdSegmentFormats: {
    eventType: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    eventId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/search/event/index.ts
var SearchEventAri = class _SearchEventAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._eventType = opts.resourceIdSegmentValues.eventType, this._eventId = opts.resourceIdSegmentValues.eventId;
  }
  get eventType() {
    return this._eventType;
  }
  get eventId() {
    return this._eventId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: searchEventAriStaticOpts.qualifier,
      platformQualifier: searchEventAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: searchEventAriStaticOpts.resourceOwner,
      resourceType: searchEventAriStaticOpts.resourceType,
      resourceId: `${opts.eventType}/${opts.eventId}`,
      resourceIdSegmentValues: {
        eventType: opts.eventType,
        eventId: opts.eventId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, searchEventAriStaticOpts);
    return new _SearchEventAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, searchEventAriStaticOpts);
    return new _SearchEventAri(opts);
  }
  getVariables() {
    return {
      eventType: this.eventType,
      eventId: this.eventId
    };
  }
};

// src/pollinator/check/types.ts
var PollinatorCheckAriResourceOwner = "pollinator", PollinatorCheckAriResourceType = "check";

// src/pollinator/check/manifest.ts
var pollinatorCheckAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PollinatorCheckAriResourceOwner,
  resourceType: PollinatorCheckAriResourceType,
  resourceIdSlug: "{checkId}",
  resourceIdSegmentFormats: {
    checkId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/pollinator/check/index.ts
var PollinatorCheckAri = class _PollinatorCheckAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._checkId = opts.resourceIdSegmentValues.checkId;
  }
  get checkId() {
    return this._checkId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: pollinatorCheckAriStaticOpts.qualifier,
      platformQualifier: pollinatorCheckAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: pollinatorCheckAriStaticOpts.resourceOwner,
      resourceType: pollinatorCheckAriStaticOpts.resourceType,
      resourceId: `${opts.checkId}`,
      resourceIdSegmentValues: {
        checkId: opts.checkId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, pollinatorCheckAriStaticOpts);
    return new _PollinatorCheckAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, pollinatorCheckAriStaticOpts);
    return new _PollinatorCheckAri(opts);
  }
  getVariables() {
    return {
      checkId: this.checkId
    };
  }
};

// src/post-office/message-template/types.ts
var PostOfficeMessageTemplateAriResourceOwner = "post-office", PostOfficeMessageTemplateAriResourceType = "message-template";

// src/post-office/message-template/manifest.ts
var postOfficeMessageTemplateAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PostOfficeMessageTemplateAriResourceOwner,
  resourceType: PostOfficeMessageTemplateAriResourceType,
  resourceIdSlug: "{messageTemplateId}",
  resourceIdSegmentFormats: {
    messageTemplateId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/post-office/message-template/index.ts
var PostOfficeMessageTemplateAri = class _PostOfficeMessageTemplateAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._messageTemplateId = opts.resourceIdSegmentValues.messageTemplateId;
  }
  get messageTemplateId() {
    return this._messageTemplateId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: postOfficeMessageTemplateAriStaticOpts.qualifier,
      platformQualifier: postOfficeMessageTemplateAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: postOfficeMessageTemplateAriStaticOpts.resourceOwner,
      resourceType: postOfficeMessageTemplateAriStaticOpts.resourceType,
      resourceId: `${opts.messageTemplateId}`,
      resourceIdSegmentValues: {
        messageTemplateId: opts.messageTemplateId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, postOfficeMessageTemplateAriStaticOpts);
    return new _PostOfficeMessageTemplateAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, postOfficeMessageTemplateAriStaticOpts);
    return new _PostOfficeMessageTemplateAri(opts);
  }
  getVariables() {
    return {
      messageTemplateId: this.messageTemplateId
    };
  }
};

// src/post-office/message-instance/types.ts
var PostOfficeMessageInstanceAriResourceOwner = "post-office", PostOfficeMessageInstanceAriResourceType = "message-instance";

// src/post-office/message-instance/manifest.ts
var postOfficeMessageInstanceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PostOfficeMessageInstanceAriResourceOwner,
  resourceType: PostOfficeMessageInstanceAriResourceType,
  resourceIdSlug: "{messageTemplateId}/{messageInstanceId}",
  resourceIdSegmentFormats: {
    messageTemplateId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    messageInstanceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/post-office/message-instance/index.ts
var PostOfficeMessageInstanceAri = class _PostOfficeMessageInstanceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._messageTemplateId = opts.resourceIdSegmentValues.messageTemplateId, this._messageInstanceId = opts.resourceIdSegmentValues.messageInstanceId;
  }
  get messageTemplateId() {
    return this._messageTemplateId;
  }
  get messageInstanceId() {
    return this._messageInstanceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: postOfficeMessageInstanceAriStaticOpts.qualifier,
      platformQualifier: postOfficeMessageInstanceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: postOfficeMessageInstanceAriStaticOpts.resourceOwner,
      resourceType: postOfficeMessageInstanceAriStaticOpts.resourceType,
      resourceId: `${opts.messageTemplateId}/${opts.messageInstanceId}`,
      resourceIdSegmentValues: {
        messageTemplateId: opts.messageTemplateId,
        messageInstanceId: opts.messageInstanceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, postOfficeMessageInstanceAriStaticOpts);
    return new _PostOfficeMessageInstanceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, postOfficeMessageInstanceAriStaticOpts);
    return new _PostOfficeMessageInstanceAri(opts);
  }
  getVariables() {
    return {
      messageTemplateId: this.messageTemplateId,
      messageInstanceId: this.messageInstanceId
    };
  }
};

// src/platform/site/types.ts
var PlatformSiteAriResourceOwner = "platform", PlatformSiteAriResourceType = "site";

// src/platform/site/manifest.ts
var platformSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PlatformSiteAriResourceOwner,
  resourceType: PlatformSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/platform/site/index.ts
var PlatformSiteAri = class _PlatformSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: platformSiteAriStaticOpts.qualifier,
      platformQualifier: platformSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: platformSiteAriStaticOpts.resourceOwner,
      resourceType: platformSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, platformSiteAriStaticOpts);
    return new _PlatformSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, platformSiteAriStaticOpts);
    return new _PlatformSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/platform/lifecycle-resource/types.ts
var PlatformLifecycleResourceAriResourceOwner = "platform", PlatformLifecycleResourceAriResourceType = "lifecycle-resource";

// src/platform/lifecycle-resource/manifest.ts
var platformLifecycleResourceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PlatformLifecycleResourceAriResourceOwner,
  resourceType: PlatformLifecycleResourceAriResourceType,
  resourceIdSlug: "{lifecycleResourceId}",
  resourceIdSegmentFormats: {
    lifecycleResourceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/platform/lifecycle-resource/index.ts
var PlatformLifecycleResourceAri = class _PlatformLifecycleResourceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._lifecycleResourceId = opts.resourceIdSegmentValues.lifecycleResourceId;
  }
  get lifecycleResourceId() {
    return this._lifecycleResourceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: platformLifecycleResourceAriStaticOpts.qualifier,
      platformQualifier: platformLifecycleResourceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: platformLifecycleResourceAriStaticOpts.resourceOwner,
      resourceType: platformLifecycleResourceAriStaticOpts.resourceType,
      resourceId: `${opts.lifecycleResourceId}`,
      resourceIdSegmentValues: {
        lifecycleResourceId: opts.lifecycleResourceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, platformLifecycleResourceAriStaticOpts);
    return new _PlatformLifecycleResourceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, platformLifecycleResourceAriStaticOpts);
    return new _PlatformLifecycleResourceAri(opts);
  }
  getVariables() {
    return {
      lifecycleResourceId: this.lifecycleResourceId
    };
  }
};

// src/platform/org-user/types.ts
var PlatformOrgUserAriResourceOwner = "platform", PlatformOrgUserAriResourceType = "org-user";

// src/platform/org-user/manifest.ts
var platformOrgUserAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PlatformOrgUserAriResourceOwner,
  resourceType: PlatformOrgUserAriResourceType,
  resourceIdSlug: "{orgId}/{userId}",
  resourceIdSegmentFormats: {
    orgId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    userId: /[a-zA-Z0-9_\-\:]{1,128}/
    // eslint-disable-line no-useless-escape
  }
};

// src/platform/org-user/index.ts
var PlatformOrgUserAri = class _PlatformOrgUserAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._orgId = opts.resourceIdSegmentValues.orgId, this._userId = opts.resourceIdSegmentValues.userId;
  }
  get orgId() {
    return this._orgId;
  }
  get userId() {
    return this._userId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: platformOrgUserAriStaticOpts.qualifier,
      platformQualifier: platformOrgUserAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: platformOrgUserAriStaticOpts.resourceOwner,
      resourceType: platformOrgUserAriStaticOpts.resourceType,
      resourceId: `${opts.orgId}/${opts.userId}`,
      resourceIdSegmentValues: {
        orgId: opts.orgId,
        userId: opts.userId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, platformOrgUserAriStaticOpts);
    return new _PlatformOrgUserAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, platformOrgUserAriStaticOpts);
    return new _PlatformOrgUserAri(opts);
  }
  getVariables() {
    return {
      orgId: this.orgId,
      userId: this.userId
    };
  }
};

// src/platform/org/types.ts
var PlatformOrgAriResourceOwner = "platform", PlatformOrgAriResourceType = "org";

// src/platform/org/manifest.ts
var platformOrgAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PlatformOrgAriResourceOwner,
  resourceType: PlatformOrgAriResourceType,
  resourceIdSlug: "{orgId}",
  resourceIdSegmentFormats: {
    orgId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/platform/org/index.ts
var PlatformOrgAri = class _PlatformOrgAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._orgId = opts.resourceIdSegmentValues.orgId;
  }
  get orgId() {
    return this._orgId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: platformOrgAriStaticOpts.qualifier,
      platformQualifier: platformOrgAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: platformOrgAriStaticOpts.resourceOwner,
      resourceType: platformOrgAriStaticOpts.resourceType,
      resourceId: `${opts.orgId}`,
      resourceIdSegmentValues: {
        orgId: opts.orgId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, platformOrgAriStaticOpts);
    return new _PlatformOrgAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, platformOrgAriStaticOpts);
    return new _PlatformOrgAri(opts);
  }
  getVariables() {
    return {
      orgId: this.orgId
    };
  }
};

// src/platform/secure-tunnel/types.ts
var PlatformSecureTunnelAriResourceOwner = "platform", PlatformSecureTunnelAriResourceType = "secure-tunnel";

// src/platform/secure-tunnel/manifest.ts
var platformSecureTunnelAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PlatformSecureTunnelAriResourceOwner,
  resourceType: PlatformSecureTunnelAriResourceType,
  resourceIdSlug: "{secureTunnelId}",
  resourceIdSegmentFormats: {
    secureTunnelId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/platform/secure-tunnel/index.ts
var PlatformSecureTunnelAri = class _PlatformSecureTunnelAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._secureTunnelId = opts.resourceIdSegmentValues.secureTunnelId;
  }
  get secureTunnelId() {
    return this._secureTunnelId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: platformSecureTunnelAriStaticOpts.qualifier,
      platformQualifier: platformSecureTunnelAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: platformSecureTunnelAriStaticOpts.resourceOwner,
      resourceType: platformSecureTunnelAriStaticOpts.resourceType,
      resourceId: `${opts.secureTunnelId}`,
      resourceIdSegmentValues: {
        secureTunnelId: opts.secureTunnelId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, platformSecureTunnelAriStaticOpts);
    return new _PlatformSecureTunnelAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, platformSecureTunnelAriStaticOpts);
    return new _PlatformSecureTunnelAri(opts);
  }
  getVariables() {
    return {
      secureTunnelId: this.secureTunnelId
    };
  }
};

// src/platform/classification-tag/types.ts
var PlatformClassificationTagAriResourceOwner = "platform", PlatformClassificationTagAriResourceType = "classification-tag";

// src/platform/classification-tag/manifest.ts
var platformClassificationTagAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PlatformClassificationTagAriResourceOwner,
  resourceType: PlatformClassificationTagAriResourceType,
  resourceIdSlug: "{tagId}",
  resourceIdSegmentFormats: {
    tagId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/platform/classification-tag/index.ts
var PlatformClassificationTagAri = class _PlatformClassificationTagAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._tagId = opts.resourceIdSegmentValues.tagId;
  }
  get tagId() {
    return this._tagId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: platformClassificationTagAriStaticOpts.qualifier,
      platformQualifier: platformClassificationTagAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: platformClassificationTagAriStaticOpts.resourceOwner,
      resourceType: platformClassificationTagAriStaticOpts.resourceType,
      resourceId: `${opts.tagId}`,
      resourceIdSegmentValues: {
        tagId: opts.tagId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, platformClassificationTagAriStaticOpts);
    return new _PlatformClassificationTagAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, platformClassificationTagAriStaticOpts);
    return new _PlatformClassificationTagAri(opts);
  }
  getVariables() {
    return {
      tagId: this.tagId
    };
  }
};

// src/platform/lifecycle-resource-package-type/types.ts
var PlatformLifecycleResourcePackageTypeAriResourceOwner = "platform", PlatformLifecycleResourcePackageTypeAriResourceType = "lifecycle-resource-package-type";

// src/platform/lifecycle-resource-package-type/manifest.ts
var platformLifecycleResourcePackageTypeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PlatformLifecycleResourcePackageTypeAriResourceOwner,
  resourceType: PlatformLifecycleResourcePackageTypeAriResourceType,
  resourceIdSlug: "{resourcePackageTypeId}",
  resourceIdSegmentFormats: {
    resourcePackageTypeId: /[a-zA-Z.\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/platform/lifecycle-resource-package-type/index.ts
var PlatformLifecycleResourcePackageTypeAri = class _PlatformLifecycleResourcePackageTypeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._resourcePackageTypeId = opts.resourceIdSegmentValues.resourcePackageTypeId;
  }
  get resourcePackageTypeId() {
    return this._resourcePackageTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: platformLifecycleResourcePackageTypeAriStaticOpts.qualifier,
      platformQualifier: platformLifecycleResourcePackageTypeAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: platformLifecycleResourcePackageTypeAriStaticOpts.resourceOwner,
      resourceType: platformLifecycleResourcePackageTypeAriStaticOpts.resourceType,
      resourceId: `${opts.resourcePackageTypeId}`,
      resourceIdSegmentValues: {
        resourcePackageTypeId: opts.resourcePackageTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, platformLifecycleResourcePackageTypeAriStaticOpts);
    return new _PlatformLifecycleResourcePackageTypeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, platformLifecycleResourcePackageTypeAriStaticOpts);
    return new _PlatformLifecycleResourcePackageTypeAri(opts);
  }
  getVariables() {
    return {
      resourcePackageTypeId: this.resourcePackageTypeId
    };
  }
};

// src/platform/lifecycle-resource-package/types.ts
var PlatformLifecycleResourcePackageAriResourceOwner = "platform", PlatformLifecycleResourcePackageAriResourceType = "lifecycle-resource-package";

// src/platform/lifecycle-resource-package/manifest.ts
var platformLifecycleResourcePackageAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PlatformLifecycleResourcePackageAriResourceOwner,
  resourceType: PlatformLifecycleResourcePackageAriResourceType,
  resourceIdSlug: "{lifecycleResourcePackageId}",
  resourceIdSegmentFormats: {
    lifecycleResourcePackageId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/platform/lifecycle-resource-package/index.ts
var PlatformLifecycleResourcePackageAri = class _PlatformLifecycleResourcePackageAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._lifecycleResourcePackageId = opts.resourceIdSegmentValues.lifecycleResourcePackageId;
  }
  get lifecycleResourcePackageId() {
    return this._lifecycleResourcePackageId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: platformLifecycleResourcePackageAriStaticOpts.qualifier,
      platformQualifier: platformLifecycleResourcePackageAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: platformLifecycleResourcePackageAriStaticOpts.resourceOwner,
      resourceType: platformLifecycleResourcePackageAriStaticOpts.resourceType,
      resourceId: `${opts.lifecycleResourcePackageId}`,
      resourceIdSegmentValues: {
        lifecycleResourcePackageId: opts.lifecycleResourcePackageId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, platformLifecycleResourcePackageAriStaticOpts);
    return new _PlatformLifecycleResourcePackageAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, platformLifecycleResourcePackageAriStaticOpts);
    return new _PlatformLifecycleResourcePackageAri(opts);
  }
  getVariables() {
    return {
      lifecycleResourcePackageId: this.lifecycleResourcePackageId
    };
  }
};

// src/people-perftool/calibration/types.ts
var PeoplePerftoolCalibrationAriResourceOwner = "people-perftool", PeoplePerftoolCalibrationAriResourceType = "calibration";

// src/people-perftool/calibration/manifest.ts
var peoplePerftoolCalibrationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PeoplePerftoolCalibrationAriResourceOwner,
  resourceType: PeoplePerftoolCalibrationAriResourceType,
  resourceIdSlug: "{id}",
  resourceIdSegmentFormats: {
    id: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/people-perftool/calibration/index.ts
var PeoplePerftoolCalibrationAri = class _PeoplePerftoolCalibrationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._id = opts.resourceIdSegmentValues.id;
  }
  get id() {
    return this._id;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: peoplePerftoolCalibrationAriStaticOpts.qualifier,
      platformQualifier: peoplePerftoolCalibrationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: peoplePerftoolCalibrationAriStaticOpts.resourceOwner,
      resourceType: peoplePerftoolCalibrationAriStaticOpts.resourceType,
      resourceId: `${opts.id}`,
      resourceIdSegmentValues: {
        id: opts.id
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, peoplePerftoolCalibrationAriStaticOpts);
    return new _PeoplePerftoolCalibrationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, peoplePerftoolCalibrationAriStaticOpts);
    return new _PeoplePerftoolCalibrationAri(opts);
  }
  getVariables() {
    return {
      id: this.id
    };
  }
};

// src/people-perftool/feedback/types.ts
var PeoplePerftoolFeedbackAriResourceOwner = "people-perftool", PeoplePerftoolFeedbackAriResourceType = "feedback";

// src/people-perftool/feedback/manifest.ts
var peoplePerftoolFeedbackAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PeoplePerftoolFeedbackAriResourceOwner,
  resourceType: PeoplePerftoolFeedbackAriResourceType,
  resourceIdSlug: "{id}",
  resourceIdSegmentFormats: {
    id: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/people-perftool/feedback/index.ts
var PeoplePerftoolFeedbackAri = class _PeoplePerftoolFeedbackAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._id = opts.resourceIdSegmentValues.id;
  }
  get id() {
    return this._id;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: peoplePerftoolFeedbackAriStaticOpts.qualifier,
      platformQualifier: peoplePerftoolFeedbackAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: peoplePerftoolFeedbackAriStaticOpts.resourceOwner,
      resourceType: peoplePerftoolFeedbackAriStaticOpts.resourceType,
      resourceId: `${opts.id}`,
      resourceIdSegmentValues: {
        id: opts.id
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, peoplePerftoolFeedbackAriStaticOpts);
    return new _PeoplePerftoolFeedbackAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, peoplePerftoolFeedbackAriStaticOpts);
    return new _PeoplePerftoolFeedbackAri(opts);
  }
  getVariables() {
    return {
      id: this.id
    };
  }
};

// src/people-perftool/performance/types.ts
var PeoplePerftoolPerformanceAriResourceOwner = "people-perftool", PeoplePerftoolPerformanceAriResourceType = "performance";

// src/people-perftool/performance/manifest.ts
var peoplePerftoolPerformanceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PeoplePerftoolPerformanceAriResourceOwner,
  resourceType: PeoplePerftoolPerformanceAriResourceType,
  resourceIdSlug: "{id}",
  resourceIdSegmentFormats: {
    id: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/people-perftool/performance/index.ts
var PeoplePerftoolPerformanceAri = class _PeoplePerftoolPerformanceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._id = opts.resourceIdSegmentValues.id;
  }
  get id() {
    return this._id;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: peoplePerftoolPerformanceAriStaticOpts.qualifier,
      platformQualifier: peoplePerftoolPerformanceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: peoplePerftoolPerformanceAriStaticOpts.resourceOwner,
      resourceType: peoplePerftoolPerformanceAriStaticOpts.resourceType,
      resourceId: `${opts.id}`,
      resourceIdSegmentValues: {
        id: opts.id
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, peoplePerftoolPerformanceAriStaticOpts);
    return new _PeoplePerftoolPerformanceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, peoplePerftoolPerformanceAriStaticOpts);
    return new _PeoplePerftoolPerformanceAri(opts);
  }
  getVariables() {
    return {
      id: this.id
    };
  }
};

// src/platform-services/streamhub-schema/types.ts
var PlatformServicesStreamhubSchemaAriResourceOwner = "platform-services", PlatformServicesStreamhubSchemaAriResourceType = "streamhub-schema";

// src/platform-services/streamhub-schema/manifest.ts
var platformServicesStreamhubSchemaAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PlatformServicesStreamhubSchemaAriResourceOwner,
  resourceType: PlatformServicesStreamhubSchemaAriResourceType,
  resourceIdSlug: "{streamhubSchemaId}",
  resourceIdSegmentFormats: {
    streamhubSchemaId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/platform-services/streamhub-schema/index.ts
var PlatformServicesStreamhubSchemaAri = class _PlatformServicesStreamhubSchemaAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._streamhubSchemaId = opts.resourceIdSegmentValues.streamhubSchemaId;
  }
  get streamhubSchemaId() {
    return this._streamhubSchemaId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: platformServicesStreamhubSchemaAriStaticOpts.qualifier,
      platformQualifier: platformServicesStreamhubSchemaAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: platformServicesStreamhubSchemaAriStaticOpts.resourceOwner,
      resourceType: platformServicesStreamhubSchemaAriStaticOpts.resourceType,
      resourceId: `${opts.streamhubSchemaId}`,
      resourceIdSegmentValues: {
        streamhubSchemaId: opts.streamhubSchemaId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, platformServicesStreamhubSchemaAriStaticOpts);
    return new _PlatformServicesStreamhubSchemaAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, platformServicesStreamhubSchemaAriStaticOpts);
    return new _PlatformServicesStreamhubSchemaAri(opts);
  }
  getVariables() {
    return {
      streamhubSchemaId: this.streamhubSchemaId
    };
  }
};

// src/papi/api/types.ts
var PapiApiAriResourceOwner = "papi", PapiApiAriResourceType = "api";

// src/papi/api/manifest.ts
var papiApiAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PapiApiAriResourceOwner,
  resourceType: PapiApiAriResourceType,
  resourceIdSlug: "catalog/{uuid}",
  resourceIdSegmentFormats: {
    uuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/papi/api/index.ts
var PapiApiAri = class _PapiApiAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._uuid = opts.resourceIdSegmentValues.uuid;
  }
  get uuid() {
    return this._uuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: papiApiAriStaticOpts.qualifier,
      platformQualifier: papiApiAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: papiApiAriStaticOpts.resourceOwner,
      resourceType: papiApiAriStaticOpts.resourceType,
      resourceId: `catalog/${opts.uuid}`,
      resourceIdSegmentValues: {
        uuid: opts.uuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, papiApiAriStaticOpts);
    return new _PapiApiAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, papiApiAriStaticOpts);
    return new _PapiApiAri(opts);
  }
  getVariables() {
    return {
      uuid: this.uuid
    };
  }
};

// src/papi/role/types.ts
var PapiRoleAriResourceOwner = "papi", PapiRoleAriResourceType = "role";

// src/papi/role/manifest.ts
var papiRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PapiRoleAriResourceOwner,
  resourceType: PapiRoleAriResourceType,
  resourceIdSlug: "partner",
  resourceIdSegmentFormats: {}
};

// src/papi/role/index.ts
var PapiRoleAri = class _PapiRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: papiRoleAriStaticOpts.qualifier,
      platformQualifier: papiRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: papiRoleAriStaticOpts.resourceOwner,
      resourceType: papiRoleAriStaticOpts.resourceType,
      resourceId: "partner",
      resourceIdSegmentValues: {}
    }, ariOpts = AriParser.fromOpts(derivedOpts, papiRoleAriStaticOpts);
    return new _PapiRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, papiRoleAriStaticOpts);
    return new _PapiRoleAri(opts);
  }
  getVariables() {
    return {};
  }
};

// src/passionfruit/user/types.ts
var PassionfruitUserAriResourceOwner = "passionfruit", PassionfruitUserAriResourceType = "user";

// src/passionfruit/user/manifest.ts
var passionfruitUserAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: PassionfruitUserAriResourceOwner,
  resourceType: PassionfruitUserAriResourceType,
  resourceIdSlug: "{userId}",
  resourceIdSegmentFormats: {
    userId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/passionfruit/user/index.ts
var PassionfruitUserAri = class _PassionfruitUserAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._userId = opts.resourceIdSegmentValues.userId;
  }
  get userId() {
    return this._userId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: passionfruitUserAriStaticOpts.qualifier,
      platformQualifier: passionfruitUserAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: passionfruitUserAriStaticOpts.resourceOwner,
      resourceType: passionfruitUserAriStaticOpts.resourceType,
      resourceId: `${opts.userId}`,
      resourceIdSegmentValues: {
        userId: opts.userId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, passionfruitUserAriStaticOpts);
    return new _PassionfruitUserAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, passionfruitUserAriStaticOpts);
    return new _PassionfruitUserAri(opts);
  }
  getVariables() {
    return {
      userId: this.userId
    };
  }
};

// src/opsgenie/site/types.ts
var OpsgenieSiteAriResourceOwner = "opsgenie", OpsgenieSiteAriResourceType = "site";

// src/opsgenie/site/manifest.ts
var opsgenieSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieSiteAriResourceOwner,
  resourceType: OpsgenieSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/site/index.ts
var OpsgenieSiteAri = class _OpsgenieSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieSiteAriStaticOpts.qualifier,
      platformQualifier: opsgenieSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieSiteAriStaticOpts.resourceOwner,
      resourceType: opsgenieSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieSiteAriStaticOpts);
    return new _OpsgenieSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieSiteAriStaticOpts);
    return new _OpsgenieSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/opsgenie/team/types.ts
var OpsgenieTeamAriResourceOwner = "opsgenie", OpsgenieTeamAriResourceType = "team";

// src/opsgenie/team/manifest.ts
var opsgenieTeamAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: OpsgenieTeamAriResourceOwner,
  resourceType: OpsgenieTeamAriResourceType,
  resourceIdSlug: "{opsgenieTeamId}",
  resourceIdSegmentFormats: {
    opsgenieTeamId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/team/index.ts
var OpsgenieTeamAri = class _OpsgenieTeamAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._opsgenieTeamId = opts.resourceIdSegmentValues.opsgenieTeamId;
  }
  get siteId() {
    return this._siteId;
  }
  get opsgenieTeamId() {
    return this._opsgenieTeamId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieTeamAriStaticOpts.qualifier,
      platformQualifier: opsgenieTeamAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: opsgenieTeamAriStaticOpts.resourceOwner,
      resourceType: opsgenieTeamAriStaticOpts.resourceType,
      resourceId: `${opts.opsgenieTeamId}`,
      resourceIdSegmentValues: {
        opsgenieTeamId: opts.opsgenieTeamId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieTeamAriStaticOpts);
    return new _OpsgenieTeamAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieTeamAriStaticOpts);
    return new _OpsgenieTeamAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      opsgenieTeamId: this.opsgenieTeamId
    };
  }
};

// src/opsgenie/timeline/types.ts
var OpsgenieTimelineAriResourceOwner = "opsgenie", OpsgenieTimelineAriResourceType = "timeline";

// src/opsgenie/timeline/manifest.ts
var opsgenieTimelineAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieTimelineAriResourceOwner,
  resourceType: OpsgenieTimelineAriResourceType,
  resourceIdSlug: "{workspaceId}/{timelineEntryId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    timelineEntryId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/timeline/index.ts
var OpsgenieTimelineAri = class _OpsgenieTimelineAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._timelineEntryId = opts.resourceIdSegmentValues.timelineEntryId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get timelineEntryId() {
    return this._timelineEntryId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieTimelineAriStaticOpts.qualifier,
      platformQualifier: opsgenieTimelineAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieTimelineAriStaticOpts.resourceOwner,
      resourceType: opsgenieTimelineAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.timelineEntryId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        timelineEntryId: opts.timelineEntryId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieTimelineAriStaticOpts);
    return new _OpsgenieTimelineAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieTimelineAriStaticOpts);
    return new _OpsgenieTimelineAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      timelineEntryId: this.timelineEntryId
    };
  }
};

// src/opsgenie/workspace/types.ts
var OpsgenieWorkspaceAriResourceOwner = "opsgenie", OpsgenieWorkspaceAriResourceType = "workspace";

// src/opsgenie/workspace/manifest.ts
var opsgenieWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieWorkspaceAriResourceOwner,
  resourceType: OpsgenieWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/workspace/index.ts
var OpsgenieWorkspaceAri = class _OpsgenieWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieWorkspaceAriStaticOpts.qualifier,
      platformQualifier: opsgenieWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieWorkspaceAriStaticOpts.resourceOwner,
      resourceType: opsgenieWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieWorkspaceAriStaticOpts);
    return new _OpsgenieWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieWorkspaceAriStaticOpts);
    return new _OpsgenieWorkspaceAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId
    };
  }
};

// src/opsgenie/notification/types.ts
var OpsgenieNotificationAriResourceOwner = "opsgenie", OpsgenieNotificationAriResourceType = "notification";

// src/opsgenie/notification/manifest.ts
var opsgenieNotificationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieNotificationAriResourceOwner,
  resourceType: OpsgenieNotificationAriResourceType,
  resourceIdSlug: "{workspaceId}/{notificationId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    notificationId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/notification/index.ts
var OpsgenieNotificationAri = class _OpsgenieNotificationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._notificationId = opts.resourceIdSegmentValues.notificationId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get notificationId() {
    return this._notificationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieNotificationAriStaticOpts.qualifier,
      platformQualifier: opsgenieNotificationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieNotificationAriStaticOpts.resourceOwner,
      resourceType: opsgenieNotificationAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.notificationId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        notificationId: opts.notificationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieNotificationAriStaticOpts);
    return new _OpsgenieNotificationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieNotificationAriStaticOpts);
    return new _OpsgenieNotificationAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      notificationId: this.notificationId
    };
  }
};

// src/opsgenie/role/types.ts
var OpsgenieRoleAriResourceOwner = "opsgenie", OpsgenieRoleAriResourceType = "role";

// src/opsgenie/role/manifest.ts
var opsgenieRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieRoleAriResourceOwner,
  resourceType: OpsgenieRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/role/index.ts
var OpsgenieRoleAri = class _OpsgenieRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieRoleAriStaticOpts.qualifier,
      platformQualifier: opsgenieRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieRoleAriStaticOpts.resourceOwner,
      resourceType: opsgenieRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieRoleAriStaticOpts);
    return new _OpsgenieRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieRoleAriStaticOpts);
    return new _OpsgenieRoleAri(opts);
  }
  getVariables() {
    return {
      roleId: this.roleId
    };
  }
};

// src/opsgenie/schedule-rotation/types.ts
var OpsgenieScheduleRotationAriResourceOwner = "opsgenie", OpsgenieScheduleRotationAriResourceType = "schedule-rotation";

// src/opsgenie/schedule-rotation/manifest.ts
var opsgenieScheduleRotationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieScheduleRotationAriResourceOwner,
  resourceType: OpsgenieScheduleRotationAriResourceType,
  resourceIdSlug: "{workspaceId}/{scheduleRotationId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    scheduleRotationId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/schedule-rotation/index.ts
var OpsgenieScheduleRotationAri = class _OpsgenieScheduleRotationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._scheduleRotationId = opts.resourceIdSegmentValues.scheduleRotationId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get scheduleRotationId() {
    return this._scheduleRotationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieScheduleRotationAriStaticOpts.qualifier,
      platformQualifier: opsgenieScheduleRotationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieScheduleRotationAriStaticOpts.resourceOwner,
      resourceType: opsgenieScheduleRotationAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.scheduleRotationId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        scheduleRotationId: opts.scheduleRotationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieScheduleRotationAriStaticOpts);
    return new _OpsgenieScheduleRotationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieScheduleRotationAriStaticOpts);
    return new _OpsgenieScheduleRotationAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      scheduleRotationId: this.scheduleRotationId
    };
  }
};

// src/opsgenie/schedule/types.ts
var OpsgenieScheduleAriResourceOwner = "opsgenie", OpsgenieScheduleAriResourceType = "schedule";

// src/opsgenie/schedule/manifest.ts
var opsgenieScheduleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieScheduleAriResourceOwner,
  resourceType: OpsgenieScheduleAriResourceType,
  resourceIdSlug: "{workspaceId}/{scheduleId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    scheduleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/schedule/index.ts
var OpsgenieScheduleAri = class _OpsgenieScheduleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._scheduleId = opts.resourceIdSegmentValues.scheduleId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get scheduleId() {
    return this._scheduleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieScheduleAriStaticOpts.qualifier,
      platformQualifier: opsgenieScheduleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieScheduleAriStaticOpts.resourceOwner,
      resourceType: opsgenieScheduleAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.scheduleId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        scheduleId: opts.scheduleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieScheduleAriStaticOpts);
    return new _OpsgenieScheduleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieScheduleAriStaticOpts);
    return new _OpsgenieScheduleAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      scheduleId: this.scheduleId
    };
  }
};

// src/opsgenie/incident/types.ts
var OpsgenieIncidentAriResourceOwner = "opsgenie", OpsgenieIncidentAriResourceType = "incident";

// src/opsgenie/incident/manifest.ts
var opsgenieIncidentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieIncidentAriResourceOwner,
  resourceType: OpsgenieIncidentAriResourceType,
  resourceIdSlug: "{workspaceId}/{incidentId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    incidentId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/incident/index.ts
var OpsgenieIncidentAri = class _OpsgenieIncidentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._incidentId = opts.resourceIdSegmentValues.incidentId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get incidentId() {
    return this._incidentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieIncidentAriStaticOpts.qualifier,
      platformQualifier: opsgenieIncidentAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieIncidentAriStaticOpts.resourceOwner,
      resourceType: opsgenieIncidentAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.incidentId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        incidentId: opts.incidentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieIncidentAriStaticOpts);
    return new _OpsgenieIncidentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieIncidentAriStaticOpts);
    return new _OpsgenieIncidentAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      incidentId: this.incidentId
    };
  }
};

// src/opsgenie/incoming-call-history/types.ts
var OpsgenieIncomingCallHistoryAriResourceOwner = "opsgenie", OpsgenieIncomingCallHistoryAriResourceType = "incoming-call-history";

// src/opsgenie/incoming-call-history/manifest.ts
var opsgenieIncomingCallHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieIncomingCallHistoryAriResourceOwner,
  resourceType: OpsgenieIncomingCallHistoryAriResourceType,
  resourceIdSlug: "{workspaceId}/{incomingCallEventId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    incomingCallEventId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/incoming-call-history/index.ts
var OpsgenieIncomingCallHistoryAri = class _OpsgenieIncomingCallHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._incomingCallEventId = opts.resourceIdSegmentValues.incomingCallEventId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get incomingCallEventId() {
    return this._incomingCallEventId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieIncomingCallHistoryAriStaticOpts.qualifier,
      platformQualifier: opsgenieIncomingCallHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieIncomingCallHistoryAriStaticOpts.resourceOwner,
      resourceType: opsgenieIncomingCallHistoryAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.incomingCallEventId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        incomingCallEventId: opts.incomingCallEventId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieIncomingCallHistoryAriStaticOpts);
    return new _OpsgenieIncomingCallHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieIncomingCallHistoryAriStaticOpts);
    return new _OpsgenieIncomingCallHistoryAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      incomingCallEventId: this.incomingCallEventId
    };
  }
};

// src/opsgenie/integration/types.ts
var OpsgenieIntegrationAriResourceOwner = "opsgenie", OpsgenieIntegrationAriResourceType = "integration";

// src/opsgenie/integration/manifest.ts
var opsgenieIntegrationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieIntegrationAriResourceOwner,
  resourceType: OpsgenieIntegrationAriResourceType,
  resourceIdSlug: "{workspaceId}/{integrationId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    integrationId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/integration/index.ts
var OpsgenieIntegrationAri = class _OpsgenieIntegrationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._integrationId = opts.resourceIdSegmentValues.integrationId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get integrationId() {
    return this._integrationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieIntegrationAriStaticOpts.qualifier,
      platformQualifier: opsgenieIntegrationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieIntegrationAriStaticOpts.resourceOwner,
      resourceType: opsgenieIntegrationAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.integrationId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        integrationId: opts.integrationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieIntegrationAriStaticOpts);
    return new _OpsgenieIntegrationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieIntegrationAriStaticOpts);
    return new _OpsgenieIntegrationAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      integrationId: this.integrationId
    };
  }
};

// src/opsgenie/escalation/types.ts
var OpsgenieEscalationAriResourceOwner = "opsgenie", OpsgenieEscalationAriResourceType = "escalation";

// src/opsgenie/escalation/manifest.ts
var opsgenieEscalationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieEscalationAriResourceOwner,
  resourceType: OpsgenieEscalationAriResourceType,
  resourceIdSlug: "{workspaceId}/{escalationId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    escalationId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/escalation/index.ts
var OpsgenieEscalationAri = class _OpsgenieEscalationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._escalationId = opts.resourceIdSegmentValues.escalationId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get escalationId() {
    return this._escalationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieEscalationAriStaticOpts.qualifier,
      platformQualifier: opsgenieEscalationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieEscalationAriStaticOpts.resourceOwner,
      resourceType: opsgenieEscalationAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.escalationId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        escalationId: opts.escalationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieEscalationAriStaticOpts);
    return new _OpsgenieEscalationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieEscalationAriStaticOpts);
    return new _OpsgenieEscalationAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      escalationId: this.escalationId
    };
  }
};

// src/opsgenie/event/types.ts
var OpsgenieEventAriResourceOwner = "opsgenie", OpsgenieEventAriResourceType = "event";

// src/opsgenie/event/manifest.ts
var opsgenieEventAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieEventAriResourceOwner,
  resourceType: OpsgenieEventAriResourceType,
  resourceIdSlug: "{eventType}/workspace/{workspaceId}/event/{eventId}",
  resourceIdSegmentFormats: {
    eventType: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    eventId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/event/index.ts
var OpsgenieEventAri = class _OpsgenieEventAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._eventType = opts.resourceIdSegmentValues.eventType, this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._eventId = opts.resourceIdSegmentValues.eventId;
  }
  get eventType() {
    return this._eventType;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get eventId() {
    return this._eventId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieEventAriStaticOpts.qualifier,
      platformQualifier: opsgenieEventAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieEventAriStaticOpts.resourceOwner,
      resourceType: opsgenieEventAriStaticOpts.resourceType,
      resourceId: `${opts.eventType}/workspace/${opts.workspaceId}/event/${opts.eventId}`,
      resourceIdSegmentValues: {
        eventType: opts.eventType,
        workspaceId: opts.workspaceId,
        eventId: opts.eventId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieEventAriStaticOpts);
    return new _OpsgenieEventAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieEventAriStaticOpts);
    return new _OpsgenieEventAri(opts);
  }
  getVariables() {
    return {
      eventType: this.eventType,
      workspaceId: this.workspaceId,
      eventId: this.eventId
    };
  }
};

// src/opsgenie/incident-alert-link/types.ts
var OpsgenieIncidentAlertLinkAriResourceOwner = "opsgenie", OpsgenieIncidentAlertLinkAriResourceType = "incident-alert-link";

// src/opsgenie/incident-alert-link/manifest.ts
var opsgenieIncidentAlertLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieIncidentAlertLinkAriResourceOwner,
  resourceType: OpsgenieIncidentAlertLinkAriResourceType,
  resourceIdSlug: "{workspaceId}/{incidentId}/{alertId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    incidentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    alertId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}(-[0-9]*)?/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/incident-alert-link/index.ts
var OpsgenieIncidentAlertLinkAri = class _OpsgenieIncidentAlertLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._incidentId = opts.resourceIdSegmentValues.incidentId, this._alertId = opts.resourceIdSegmentValues.alertId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get incidentId() {
    return this._incidentId;
  }
  get alertId() {
    return this._alertId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieIncidentAlertLinkAriStaticOpts.qualifier,
      platformQualifier: opsgenieIncidentAlertLinkAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieIncidentAlertLinkAriStaticOpts.resourceOwner,
      resourceType: opsgenieIncidentAlertLinkAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.incidentId}/${opts.alertId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        incidentId: opts.incidentId,
        alertId: opts.alertId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieIncidentAlertLinkAriStaticOpts);
    return new _OpsgenieIncidentAlertLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieIncidentAlertLinkAriStaticOpts);
    return new _OpsgenieIncidentAlertLinkAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      incidentId: this.incidentId,
      alertId: this.alertId
    };
  }
};

// src/opsgenie/incident-status-update/types.ts
var OpsgenieIncidentStatusUpdateAriResourceOwner = "opsgenie", OpsgenieIncidentStatusUpdateAriResourceType = "incident-status-update";

// src/opsgenie/incident-status-update/manifest.ts
var opsgenieIncidentStatusUpdateAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieIncidentStatusUpdateAriResourceOwner,
  resourceType: OpsgenieIncidentStatusUpdateAriResourceType,
  resourceIdSlug: "{workspaceId}/{incidentStatusUpdateId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    incidentStatusUpdateId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/incident-status-update/index.ts
var OpsgenieIncidentStatusUpdateAri = class _OpsgenieIncidentStatusUpdateAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._incidentStatusUpdateId = opts.resourceIdSegmentValues.incidentStatusUpdateId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get incidentStatusUpdateId() {
    return this._incidentStatusUpdateId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieIncidentStatusUpdateAriStaticOpts.qualifier,
      platformQualifier: opsgenieIncidentStatusUpdateAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieIncidentStatusUpdateAriStaticOpts.resourceOwner,
      resourceType: opsgenieIncidentStatusUpdateAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.incidentStatusUpdateId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        incidentStatusUpdateId: opts.incidentStatusUpdateId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieIncidentStatusUpdateAriStaticOpts);
    return new _OpsgenieIncidentStatusUpdateAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieIncidentStatusUpdateAriStaticOpts);
    return new _OpsgenieIncidentStatusUpdateAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      incidentStatusUpdateId: this.incidentStatusUpdateId
    };
  }
};

// src/opsgenie/call-routing/types.ts
var OpsgenieCallRoutingAriResourceOwner = "opsgenie", OpsgenieCallRoutingAriResourceType = "call-routing";

// src/opsgenie/call-routing/manifest.ts
var opsgenieCallRoutingAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieCallRoutingAriResourceOwner,
  resourceType: OpsgenieCallRoutingAriResourceType,
  resourceIdSlug: "{workspaceId}/{callRoutingId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    callRoutingId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/call-routing/index.ts
var OpsgenieCallRoutingAri = class _OpsgenieCallRoutingAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._callRoutingId = opts.resourceIdSegmentValues.callRoutingId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get callRoutingId() {
    return this._callRoutingId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieCallRoutingAriStaticOpts.qualifier,
      platformQualifier: opsgenieCallRoutingAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieCallRoutingAriStaticOpts.resourceOwner,
      resourceType: opsgenieCallRoutingAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.callRoutingId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        callRoutingId: opts.callRoutingId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieCallRoutingAriStaticOpts);
    return new _OpsgenieCallRoutingAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieCallRoutingAriStaticOpts);
    return new _OpsgenieCallRoutingAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      callRoutingId: this.callRoutingId
    };
  }
};

// src/opsgenie/custom-role/types.ts
var OpsgenieCustomRoleAriResourceOwner = "opsgenie", OpsgenieCustomRoleAriResourceType = "custom-role";

// src/opsgenie/custom-role/manifest.ts
var opsgenieCustomRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieCustomRoleAriResourceOwner,
  resourceType: OpsgenieCustomRoleAriResourceType,
  resourceIdSlug: "{workspaceId}/{opsgenieRoleType}/{customRoleId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    opsgenieRoleType: /(?:account|team|responder)/,
    // eslint-disable-line no-useless-escape
    customRoleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/custom-role/index.ts
var OpsgenieCustomRoleAri = class _OpsgenieCustomRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._opsgenieRoleType = opts.resourceIdSegmentValues.opsgenieRoleType, this._customRoleId = opts.resourceIdSegmentValues.customRoleId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get opsgenieRoleType() {
    return this._opsgenieRoleType;
  }
  get customRoleId() {
    return this._customRoleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieCustomRoleAriStaticOpts.qualifier,
      platformQualifier: opsgenieCustomRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieCustomRoleAriStaticOpts.resourceOwner,
      resourceType: opsgenieCustomRoleAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.opsgenieRoleType}/${opts.customRoleId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        opsgenieRoleType: opts.opsgenieRoleType,
        customRoleId: opts.customRoleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieCustomRoleAriStaticOpts);
    return new _OpsgenieCustomRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieCustomRoleAriStaticOpts);
    return new _OpsgenieCustomRoleAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      opsgenieRoleType: this.opsgenieRoleType,
      customRoleId: this.customRoleId
    };
  }
};

// src/opsgenie/deployment-service-link/types.ts
var OpsgenieDeploymentServiceLinkAriResourceOwner = "opsgenie", OpsgenieDeploymentServiceLinkAriResourceType = "deployment-service-link";

// src/opsgenie/deployment-service-link/manifest.ts
var opsgenieDeploymentServiceLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieDeploymentServiceLinkAriResourceOwner,
  resourceType: OpsgenieDeploymentServiceLinkAriResourceType,
  resourceIdSlug: "{workspaceId}/{deploymentId}/{serviceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    deploymentId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    serviceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/deployment-service-link/index.ts
var OpsgenieDeploymentServiceLinkAri = class _OpsgenieDeploymentServiceLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._deploymentId = opts.resourceIdSegmentValues.deploymentId, this._serviceId = opts.resourceIdSegmentValues.serviceId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get deploymentId() {
    return this._deploymentId;
  }
  get serviceId() {
    return this._serviceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieDeploymentServiceLinkAriStaticOpts.qualifier,
      platformQualifier: opsgenieDeploymentServiceLinkAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieDeploymentServiceLinkAriStaticOpts.resourceOwner,
      resourceType: opsgenieDeploymentServiceLinkAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.deploymentId}/${opts.serviceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        deploymentId: opts.deploymentId,
        serviceId: opts.serviceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieDeploymentServiceLinkAriStaticOpts);
    return new _OpsgenieDeploymentServiceLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieDeploymentServiceLinkAriStaticOpts);
    return new _OpsgenieDeploymentServiceLinkAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      deploymentId: this.deploymentId,
      serviceId: this.serviceId
    };
  }
};

// src/opsgenie/deployment/types.ts
var OpsgenieDeploymentAriResourceOwner = "opsgenie", OpsgenieDeploymentAriResourceType = "deployment";

// src/opsgenie/deployment/manifest.ts
var opsgenieDeploymentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieDeploymentAriResourceOwner,
  resourceType: OpsgenieDeploymentAriResourceType,
  resourceIdSlug: "{workspaceId}/{deploymentId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    deploymentId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/deployment/index.ts
var OpsgenieDeploymentAri = class _OpsgenieDeploymentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._deploymentId = opts.resourceIdSegmentValues.deploymentId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get deploymentId() {
    return this._deploymentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieDeploymentAriStaticOpts.qualifier,
      platformQualifier: opsgenieDeploymentAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieDeploymentAriStaticOpts.resourceOwner,
      resourceType: opsgenieDeploymentAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.deploymentId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        deploymentId: opts.deploymentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieDeploymentAriStaticOpts);
    return new _OpsgenieDeploymentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieDeploymentAriStaticOpts);
    return new _OpsgenieDeploymentAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      deploymentId: this.deploymentId
    };
  }
};

// src/opsgenie/account-settings/types.ts
var OpsgenieAccountSettingsAriResourceOwner = "opsgenie", OpsgenieAccountSettingsAriResourceType = "account-settings";

// src/opsgenie/account-settings/manifest.ts
var opsgenieAccountSettingsAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieAccountSettingsAriResourceOwner,
  resourceType: OpsgenieAccountSettingsAriResourceType,
  resourceIdSlug: "{workspaceId}/{accountSettingsId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    accountSettingsId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/account-settings/index.ts
var OpsgenieAccountSettingsAri = class _OpsgenieAccountSettingsAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._accountSettingsId = opts.resourceIdSegmentValues.accountSettingsId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get accountSettingsId() {
    return this._accountSettingsId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieAccountSettingsAriStaticOpts.qualifier,
      platformQualifier: opsgenieAccountSettingsAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieAccountSettingsAriStaticOpts.resourceOwner,
      resourceType: opsgenieAccountSettingsAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.accountSettingsId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        accountSettingsId: opts.accountSettingsId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieAccountSettingsAriStaticOpts);
    return new _OpsgenieAccountSettingsAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieAccountSettingsAriStaticOpts);
    return new _OpsgenieAccountSettingsAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      accountSettingsId: this.accountSettingsId
    };
  }
};

// src/opsgenie/alert-recipient-link/types.ts
var OpsgenieAlertRecipientLinkAriResourceOwner = "opsgenie", OpsgenieAlertRecipientLinkAriResourceType = "alert-recipient-link";

// src/opsgenie/alert-recipient-link/manifest.ts
var opsgenieAlertRecipientLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieAlertRecipientLinkAriResourceOwner,
  resourceType: OpsgenieAlertRecipientLinkAriResourceType,
  resourceIdSlug: "{workspaceId}/{alertId}/{recipientType}/{recipientId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    alertId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}(-[0-9]*)?/,
    // eslint-disable-line no-useless-escape
    recipientType: /(?:user|team)/,
    // eslint-disable-line no-useless-escape
    recipientId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/alert-recipient-link/index.ts
var OpsgenieAlertRecipientLinkAri = class _OpsgenieAlertRecipientLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._alertId = opts.resourceIdSegmentValues.alertId, this._recipientType = opts.resourceIdSegmentValues.recipientType, this._recipientId = opts.resourceIdSegmentValues.recipientId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get alertId() {
    return this._alertId;
  }
  get recipientType() {
    return this._recipientType;
  }
  get recipientId() {
    return this._recipientId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieAlertRecipientLinkAriStaticOpts.qualifier,
      platformQualifier: opsgenieAlertRecipientLinkAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieAlertRecipientLinkAriStaticOpts.resourceOwner,
      resourceType: opsgenieAlertRecipientLinkAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.alertId}/${opts.recipientType}/${opts.recipientId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        alertId: opts.alertId,
        recipientType: opts.recipientType,
        recipientId: opts.recipientId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieAlertRecipientLinkAriStaticOpts);
    return new _OpsgenieAlertRecipientLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieAlertRecipientLinkAriStaticOpts);
    return new _OpsgenieAlertRecipientLinkAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      alertId: this.alertId,
      recipientType: this.recipientType,
      recipientId: this.recipientId
    };
  }
};

// src/opsgenie/alert/types.ts
var OpsgenieAlertAriResourceOwner = "opsgenie", OpsgenieAlertAriResourceType = "alert";

// src/opsgenie/alert/manifest.ts
var opsgenieAlertAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieAlertAriResourceOwner,
  resourceType: OpsgenieAlertAriResourceType,
  resourceIdSlug: "{workspaceId}/{alertId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    alertId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/alert/index.ts
var OpsgenieAlertAri = class _OpsgenieAlertAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._alertId = opts.resourceIdSegmentValues.alertId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get alertId() {
    return this._alertId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieAlertAriStaticOpts.qualifier,
      platformQualifier: opsgenieAlertAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieAlertAriStaticOpts.resourceOwner,
      resourceType: opsgenieAlertAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.alertId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        alertId: opts.alertId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieAlertAriStaticOpts);
    return new _OpsgenieAlertAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieAlertAriStaticOpts);
    return new _OpsgenieAlertAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      alertId: this.alertId
    };
  }
};

// src/opsgenie/api-request-metric/types.ts
var OpsgenieApiRequestMetricAriResourceOwner = "opsgenie", OpsgenieApiRequestMetricAriResourceType = "api-request-metric";

// src/opsgenie/api-request-metric/manifest.ts
var opsgenieApiRequestMetricAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieApiRequestMetricAriResourceOwner,
  resourceType: OpsgenieApiRequestMetricAriResourceType,
  resourceIdSlug: "{workspaceId}/{apiRequestMetricId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    apiRequestMetricId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/api-request-metric/index.ts
var OpsgenieApiRequestMetricAri = class _OpsgenieApiRequestMetricAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._apiRequestMetricId = opts.resourceIdSegmentValues.apiRequestMetricId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get apiRequestMetricId() {
    return this._apiRequestMetricId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieApiRequestMetricAriStaticOpts.qualifier,
      platformQualifier: opsgenieApiRequestMetricAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieApiRequestMetricAriStaticOpts.resourceOwner,
      resourceType: opsgenieApiRequestMetricAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.apiRequestMetricId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        apiRequestMetricId: opts.apiRequestMetricId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieApiRequestMetricAriStaticOpts);
    return new _OpsgenieApiRequestMetricAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieApiRequestMetricAriStaticOpts);
    return new _OpsgenieApiRequestMetricAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      apiRequestMetricId: this.apiRequestMetricId
    };
  }
};

// src/oauth/client/types.ts
var OauthClientAriResourceOwner = "oauth", OauthClientAriResourceType = "client";

// src/oauth/client/manifest.ts
var oauthClientAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OauthClientAriResourceOwner,
  resourceType: OauthClientAriResourceType,
  resourceIdSlug: "{clientId}",
  resourceIdSegmentFormats: {
    clientId: /[0-9a-zA-Z-_]{5,50}/
    // eslint-disable-line no-useless-escape
  }
};

// src/oauth/client/index.ts
var OauthClientAri = class _OauthClientAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._clientId = opts.resourceIdSegmentValues.clientId;
  }
  get clientId() {
    return this._clientId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: oauthClientAriStaticOpts.qualifier,
      platformQualifier: oauthClientAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: oauthClientAriStaticOpts.resourceOwner,
      resourceType: oauthClientAriStaticOpts.resourceType,
      resourceId: `${opts.clientId}`,
      resourceIdSegmentValues: {
        clientId: opts.clientId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, oauthClientAriStaticOpts);
    return new _OauthClientAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, oauthClientAriStaticOpts);
    return new _OauthClientAri(opts);
  }
  getVariables() {
    return {
      clientId: this.clientId
    };
  }
};

// src/opsgenie/account-login/types.ts
var OpsgenieAccountLoginAriResourceOwner = "opsgenie", OpsgenieAccountLoginAriResourceType = "account-login";

// src/opsgenie/account-login/manifest.ts
var opsgenieAccountLoginAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: OpsgenieAccountLoginAriResourceOwner,
  resourceType: OpsgenieAccountLoginAriResourceType,
  resourceIdSlug: "{workspaceId}/{accountLoginId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    accountLoginId: /[a-zA-Z0-9\-\:]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/opsgenie/account-login/index.ts
var OpsgenieAccountLoginAri = class _OpsgenieAccountLoginAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._accountLoginId = opts.resourceIdSegmentValues.accountLoginId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get accountLoginId() {
    return this._accountLoginId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: opsgenieAccountLoginAriStaticOpts.qualifier,
      platformQualifier: opsgenieAccountLoginAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: opsgenieAccountLoginAriStaticOpts.resourceOwner,
      resourceType: opsgenieAccountLoginAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.accountLoginId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        accountLoginId: opts.accountLoginId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, opsgenieAccountLoginAriStaticOpts);
    return new _OpsgenieAccountLoginAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, opsgenieAccountLoginAriStaticOpts);
    return new _OpsgenieAccountLoginAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      accountLoginId: this.accountLoginId
    };
  }
};

// src/mercury/role/types.ts
var MercuryRoleAriResourceOwner = "mercury", MercuryRoleAriResourceType = "role";

// src/mercury/role/manifest.ts
var mercuryRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: MercuryRoleAriResourceOwner,
  resourceType: MercuryRoleAriResourceType,
  resourceIdSlug: "product/{roleType}",
  resourceIdSegmentFormats: {
    roleType: /(?:member|admin)/
    // eslint-disable-line no-useless-escape
  }
};

// src/mercury/role/index.ts
var MercuryRoleAri = class _MercuryRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleType = opts.resourceIdSegmentValues.roleType;
  }
  get roleType() {
    return this._roleType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: mercuryRoleAriStaticOpts.qualifier,
      platformQualifier: mercuryRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: mercuryRoleAriStaticOpts.resourceOwner,
      resourceType: mercuryRoleAriStaticOpts.resourceType,
      resourceId: `product/${opts.roleType}`,
      resourceIdSegmentValues: {
        roleType: opts.roleType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, mercuryRoleAriStaticOpts);
    return new _MercuryRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, mercuryRoleAriStaticOpts);
    return new _MercuryRoleAri(opts);
  }
  getVariables() {
    return {
      roleType: this.roleType
    };
  }
};

// src/mercury/site/types.ts
var MercurySiteAriResourceOwner = "mercury", MercurySiteAriResourceType = "site";

// src/mercury/site/manifest.ts
var mercurySiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: MercurySiteAriResourceOwner,
  resourceType: MercurySiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/mercury/site/index.ts
var MercurySiteAri = class _MercurySiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: mercurySiteAriStaticOpts.qualifier,
      platformQualifier: mercurySiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: mercurySiteAriStaticOpts.resourceOwner,
      resourceType: mercurySiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, mercurySiteAriStaticOpts);
    return new _MercurySiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, mercurySiteAriStaticOpts);
    return new _MercurySiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/mercury/comment/types.ts
var MercuryCommentAriResourceOwner = "mercury", MercuryCommentAriResourceType = "comment";

// src/mercury/comment/manifest.ts
var mercuryCommentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: MercuryCommentAriResourceOwner,
  resourceType: MercuryCommentAriResourceType,
  resourceIdSlug: "workspace/{workspaceId}/{commentUuid}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    commentUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/mercury/comment/index.ts
var MercuryCommentAri = class _MercuryCommentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._commentUuid = opts.resourceIdSegmentValues.commentUuid;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get commentUuid() {
    return this._commentUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: mercuryCommentAriStaticOpts.qualifier,
      platformQualifier: mercuryCommentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: mercuryCommentAriStaticOpts.resourceOwner,
      resourceType: mercuryCommentAriStaticOpts.resourceType,
      resourceId: `workspace/${opts.workspaceId}/${opts.commentUuid}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        commentUuid: opts.commentUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, mercuryCommentAriStaticOpts);
    return new _MercuryCommentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, mercuryCommentAriStaticOpts);
    return new _MercuryCommentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      commentUuid: this.commentUuid
    };
  }
};

// src/mercury/program-status-update/types.ts
var MercuryProgramStatusUpdateAriResourceOwner = "mercury", MercuryProgramStatusUpdateAriResourceType = "program-status-update";

// src/mercury/program-status-update/manifest.ts
var mercuryProgramStatusUpdateAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: MercuryProgramStatusUpdateAriResourceOwner,
  resourceType: MercuryProgramStatusUpdateAriResourceType,
  resourceIdSlug: "workspace/{workspaceId}/{programStatusUpdateId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    programStatusUpdateId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/mercury/program-status-update/index.ts
var MercuryProgramStatusUpdateAri = class _MercuryProgramStatusUpdateAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._programStatusUpdateId = opts.resourceIdSegmentValues.programStatusUpdateId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get programStatusUpdateId() {
    return this._programStatusUpdateId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: mercuryProgramStatusUpdateAriStaticOpts.qualifier,
      platformQualifier: mercuryProgramStatusUpdateAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: mercuryProgramStatusUpdateAriStaticOpts.resourceOwner,
      resourceType: mercuryProgramStatusUpdateAriStaticOpts.resourceType,
      resourceId: `workspace/${opts.workspaceId}/${opts.programStatusUpdateId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        programStatusUpdateId: opts.programStatusUpdateId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, mercuryProgramStatusUpdateAriStaticOpts);
    return new _MercuryProgramStatusUpdateAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, mercuryProgramStatusUpdateAriStaticOpts);
    return new _MercuryProgramStatusUpdateAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      programStatusUpdateId: this.programStatusUpdateId
    };
  }
};

// src/mercury/program/types.ts
var MercuryProgramAriResourceOwner = "mercury", MercuryProgramAriResourceType = "program";

// src/mercury/program/manifest.ts
var mercuryProgramAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: MercuryProgramAriResourceOwner,
  resourceType: MercuryProgramAriResourceType,
  resourceIdSlug: "workspace/{workspaceId}/{programId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    programId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/mercury/program/index.ts
var MercuryProgramAri = class _MercuryProgramAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._programId = opts.resourceIdSegmentValues.programId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get programId() {
    return this._programId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: mercuryProgramAriStaticOpts.qualifier,
      platformQualifier: mercuryProgramAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: mercuryProgramAriStaticOpts.resourceOwner,
      resourceType: mercuryProgramAriStaticOpts.resourceType,
      resourceId: `workspace/${opts.workspaceId}/${opts.programId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        programId: opts.programId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, mercuryProgramAriStaticOpts);
    return new _MercuryProgramAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, mercuryProgramAriStaticOpts);
    return new _MercuryProgramAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      programId: this.programId
    };
  }
};

// src/measurement/site-user/types.ts
var MeasurementSiteUserAriResourceOwner = "measurement", MeasurementSiteUserAriResourceType = "site-user";

// src/measurement/site-user/manifest.ts
var measurementSiteUserAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: MeasurementSiteUserAriResourceOwner,
  resourceType: MeasurementSiteUserAriResourceType,
  resourceIdSlug: "{siteId}/{aaId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    aaId: /[a-zA-Z0-9_\-\:]{1,128}/
    // eslint-disable-line no-useless-escape
  }
};

// src/measurement/site-user/index.ts
var MeasurementSiteUserAri = class _MeasurementSiteUserAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId, this._aaId = opts.resourceIdSegmentValues.aaId;
  }
  get siteId() {
    return this._siteId;
  }
  get aaId() {
    return this._aaId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: measurementSiteUserAriStaticOpts.qualifier,
      platformQualifier: measurementSiteUserAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: measurementSiteUserAriStaticOpts.resourceOwner,
      resourceType: measurementSiteUserAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}/${opts.aaId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId,
        aaId: opts.aaId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, measurementSiteUserAriStaticOpts);
    return new _MeasurementSiteUserAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, measurementSiteUserAriStaticOpts);
    return new _MeasurementSiteUserAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      aaId: this.aaId
    };
  }
};

// src/measurement/user/types.ts
var MeasurementUserAriResourceOwner = "measurement", MeasurementUserAriResourceType = "user";

// src/measurement/user/manifest.ts
var measurementUserAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: MeasurementUserAriResourceOwner,
  resourceType: MeasurementUserAriResourceType,
  resourceIdSlug: "ff-client-anonymous/{anonUserId}",
  resourceIdSegmentFormats: {
    anonUserId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/measurement/user/index.ts
var MeasurementUserAri = class _MeasurementUserAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._anonUserId = opts.resourceIdSegmentValues.anonUserId;
  }
  get anonUserId() {
    return this._anonUserId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: measurementUserAriStaticOpts.qualifier,
      platformQualifier: measurementUserAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: measurementUserAriStaticOpts.resourceOwner,
      resourceType: measurementUserAriStaticOpts.resourceType,
      resourceId: `ff-client-anonymous/${opts.anonUserId}`,
      resourceIdSegmentValues: {
        anonUserId: opts.anonUserId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, measurementUserAriStaticOpts);
    return new _MeasurementUserAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, measurementUserAriStaticOpts);
    return new _MeasurementUserAri(opts);
  }
  getVariables() {
    return {
      anonUserId: this.anonUserId
    };
  }
};

// src/media/file/types.ts
var MediaFileAriResourceOwner = "media", MediaFileAriResourceType = "file";

// src/media/file/manifest.ts
var mediaFileAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: MediaFileAriResourceOwner,
  resourceType: MediaFileAriResourceType,
  resourceIdSlug: "{fileId}",
  resourceIdSegmentFormats: {
    fileId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/media/file/index.ts
var MediaFileAri = class _MediaFileAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._fileId = opts.resourceIdSegmentValues.fileId;
  }
  get fileId() {
    return this._fileId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: mediaFileAriStaticOpts.qualifier,
      platformQualifier: mediaFileAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: mediaFileAriStaticOpts.resourceOwner,
      resourceType: mediaFileAriStaticOpts.resourceType,
      resourceId: `${opts.fileId}`,
      resourceIdSegmentValues: {
        fileId: opts.fileId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, mediaFileAriStaticOpts);
    return new _MediaFileAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, mediaFileAriStaticOpts);
    return new _MediaFileAri(opts);
  }
  getVariables() {
    return {
      fileId: this.fileId
    };
  }
};

// src/marketing/customer-domain/types.ts
var MarketingCustomerDomainAriResourceOwner = "marketing", MarketingCustomerDomainAriResourceType = "customer-domain";

// src/marketing/customer-domain/manifest.ts
var marketingCustomerDomainAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: MarketingCustomerDomainAriResourceOwner,
  resourceType: MarketingCustomerDomainAriResourceType,
  resourceIdSlug: "{domainBase64}",
  resourceIdSegmentFormats: {
    domainBase64: /[a-zA-Z0-9=]+={0,1}/
    // eslint-disable-line no-useless-escape
  }
};

// src/marketing/customer-domain/index.ts
var MarketingCustomerDomainAri = class _MarketingCustomerDomainAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._domainBase64 = opts.resourceIdSegmentValues.domainBase64;
  }
  get domainBase64() {
    return this._domainBase64;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: marketingCustomerDomainAriStaticOpts.qualifier,
      platformQualifier: marketingCustomerDomainAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: marketingCustomerDomainAriStaticOpts.resourceOwner,
      resourceType: marketingCustomerDomainAriStaticOpts.resourceType,
      resourceId: `${opts.domainBase64}`,
      resourceIdSegmentValues: {
        domainBase64: opts.domainBase64
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, marketingCustomerDomainAriStaticOpts);
    return new _MarketingCustomerDomainAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, marketingCustomerDomainAriStaticOpts);
    return new _MarketingCustomerDomainAri(opts);
  }
  getVariables() {
    return {
      domainBase64: this.domainBase64
    };
  }
};

// src/marketplace/team/types.ts
var MarketplaceTeamAriResourceOwner = "marketplace", MarketplaceTeamAriResourceType = "team";

// src/marketplace/team/manifest.ts
var marketplaceTeamAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: MarketplaceTeamAriResourceOwner,
  resourceType: MarketplaceTeamAriResourceType,
  resourceIdSlug: "{teamId}",
  resourceIdSegmentFormats: {
    teamId: /[a-zA-Z0-9.\-_~]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/marketplace/team/index.ts
var MarketplaceTeamAri = class _MarketplaceTeamAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._teamId = opts.resourceIdSegmentValues.teamId;
  }
  get teamId() {
    return this._teamId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: marketplaceTeamAriStaticOpts.qualifier,
      platformQualifier: marketplaceTeamAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: marketplaceTeamAriStaticOpts.resourceOwner,
      resourceType: marketplaceTeamAriStaticOpts.resourceType,
      resourceId: `${opts.teamId}`,
      resourceIdSegmentValues: {
        teamId: opts.teamId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, marketplaceTeamAriStaticOpts);
    return new _MarketplaceTeamAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, marketplaceTeamAriStaticOpts);
    return new _MarketplaceTeamAri(opts);
  }
  getVariables() {
    return {
      teamId: this.teamId
    };
  }
};

// src/measurement/email-uuid/types.ts
var MeasurementEmailUuidAriResourceOwner = "measurement", MeasurementEmailUuidAriResourceType = "email-uuid";

// src/measurement/email-uuid/manifest.ts
var measurementEmailUuidAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: MeasurementEmailUuidAriResourceOwner,
  resourceType: MeasurementEmailUuidAriResourceType,
  resourceIdSlug: "{emailId}",
  resourceIdSegmentFormats: {
    emailId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/measurement/email-uuid/index.ts
var MeasurementEmailUuidAri = class _MeasurementEmailUuidAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._emailId = opts.resourceIdSegmentValues.emailId;
  }
  get emailId() {
    return this._emailId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: measurementEmailUuidAriStaticOpts.qualifier,
      platformQualifier: measurementEmailUuidAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: measurementEmailUuidAriStaticOpts.resourceOwner,
      resourceType: measurementEmailUuidAriStaticOpts.resourceType,
      resourceId: `${opts.emailId}`,
      resourceIdSegmentValues: {
        emailId: opts.emailId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, measurementEmailUuidAriStaticOpts);
    return new _MeasurementEmailUuidAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, measurementEmailUuidAriStaticOpts);
    return new _MeasurementEmailUuidAri(opts);
  }
  getVariables() {
    return {
      emailId: this.emailId
    };
  }
};

// src/linking-platform/datasource/types.ts
var LinkingPlatformDatasourceAriResourceOwner = "linking-platform", LinkingPlatformDatasourceAriResourceType = "datasource";

// src/linking-platform/datasource/manifest.ts
var linkingPlatformDatasourceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: LinkingPlatformDatasourceAriResourceOwner,
  resourceType: LinkingPlatformDatasourceAriResourceType,
  resourceIdSlug: "{datasourceId}",
  resourceIdSegmentFormats: {
    datasourceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/linking-platform/datasource/index.ts
var LinkingPlatformDatasourceAri = class _LinkingPlatformDatasourceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._datasourceId = opts.resourceIdSegmentValues.datasourceId;
  }
  get datasourceId() {
    return this._datasourceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: linkingPlatformDatasourceAriStaticOpts.qualifier,
      platformQualifier: linkingPlatformDatasourceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: linkingPlatformDatasourceAriStaticOpts.resourceOwner,
      resourceType: linkingPlatformDatasourceAriStaticOpts.resourceType,
      resourceId: `${opts.datasourceId}`,
      resourceIdSegmentValues: {
        datasourceId: opts.datasourceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, linkingPlatformDatasourceAriStaticOpts);
    return new _LinkingPlatformDatasourceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, linkingPlatformDatasourceAriStaticOpts);
    return new _LinkingPlatformDatasourceAri(opts);
  }
  getVariables() {
    return {
      datasourceId: this.datasourceId
    };
  }
};

// src/maker-space/group/types.ts
var MakerSpaceGroupAriResourceOwner = "maker-space", MakerSpaceGroupAriResourceType = "group";

// src/maker-space/group/manifest.ts
var makerSpaceGroupAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: MakerSpaceGroupAriResourceOwner,
  resourceType: MakerSpaceGroupAriResourceType,
  resourceIdSlug: "{groupId}",
  resourceIdSegmentFormats: {
    groupId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/maker-space/group/index.ts
var MakerSpaceGroupAri = class _MakerSpaceGroupAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._groupId = opts.resourceIdSegmentValues.groupId;
  }
  get groupId() {
    return this._groupId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: makerSpaceGroupAriStaticOpts.qualifier,
      platformQualifier: makerSpaceGroupAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: makerSpaceGroupAriStaticOpts.resourceOwner,
      resourceType: makerSpaceGroupAriStaticOpts.resourceType,
      resourceId: `${opts.groupId}`,
      resourceIdSegmentValues: {
        groupId: opts.groupId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, makerSpaceGroupAriStaticOpts);
    return new _MakerSpaceGroupAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, makerSpaceGroupAriStaticOpts);
    return new _MakerSpaceGroupAri(opts);
  }
  getVariables() {
    return {
      groupId: this.groupId
    };
  }
};

// src/jira/workspace/types.ts
var JiraWorkspaceAriResourceOwner = "jira", JiraWorkspaceAriResourceType = "workspace";

// src/jira/workspace/manifest.ts
var jiraWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraWorkspaceAriResourceOwner,
  resourceType: JiraWorkspaceAriResourceType,
  resourceIdSlug: "{activationId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/workspace/index.ts
var JiraWorkspaceAri = class _JiraWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraWorkspaceAriStaticOpts.qualifier,
      platformQualifier: jiraWorkspaceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraWorkspaceAriStaticOpts.resourceOwner,
      resourceType: jiraWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraWorkspaceAriStaticOpts);
    return new _JiraWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraWorkspaceAriStaticOpts);
    return new _JiraWorkspaceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId
    };
  }
};

// src/jira/vulnerability/types.ts
var JiraVulnerabilityAriResourceOwner = "jira", JiraVulnerabilityAriResourceType = "vulnerability";

// src/jira/vulnerability/manifest.ts
var jiraVulnerabilityAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraVulnerabilityAriResourceOwner,
  resourceType: JiraVulnerabilityAriResourceType,
  resourceIdSlug: "activation/{activationId}/{vulnerabilityId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    vulnerabilityId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/vulnerability/index.ts
var JiraVulnerabilityAri = class _JiraVulnerabilityAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._vulnerabilityId = opts.resourceIdSegmentValues.vulnerabilityId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get vulnerabilityId() {
    return this._vulnerabilityId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraVulnerabilityAriStaticOpts.qualifier,
      platformQualifier: jiraVulnerabilityAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraVulnerabilityAriStaticOpts.resourceOwner,
      resourceType: jiraVulnerabilityAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.vulnerabilityId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        vulnerabilityId: opts.vulnerabilityId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraVulnerabilityAriStaticOpts);
    return new _JiraVulnerabilityAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraVulnerabilityAriStaticOpts);
    return new _JiraVulnerabilityAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      vulnerabilityId: this.vulnerabilityId
    };
  }
};

// src/jira/workflow-scheme/types.ts
var JiraWorkflowSchemeAriResourceOwner = "jira", JiraWorkflowSchemeAriResourceType = "workflow-scheme";

// src/jira/workflow-scheme/manifest.ts
var jiraWorkflowSchemeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraWorkflowSchemeAriResourceOwner,
  resourceType: JiraWorkflowSchemeAriResourceType,
  resourceIdSlug: "activation/{activationId}/{workflowSchemeId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    workflowSchemeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/workflow-scheme/index.ts
var JiraWorkflowSchemeAri = class _JiraWorkflowSchemeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._workflowSchemeId = opts.resourceIdSegmentValues.workflowSchemeId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get workflowSchemeId() {
    return this._workflowSchemeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraWorkflowSchemeAriStaticOpts.qualifier,
      platformQualifier: jiraWorkflowSchemeAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraWorkflowSchemeAriStaticOpts.resourceOwner,
      resourceType: jiraWorkflowSchemeAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.workflowSchemeId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        workflowSchemeId: opts.workflowSchemeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraWorkflowSchemeAriStaticOpts);
    return new _JiraWorkflowSchemeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraWorkflowSchemeAriStaticOpts);
    return new _JiraWorkflowSchemeAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      workflowSchemeId: this.workflowSchemeId
    };
  }
};

// src/jira/workflow/types.ts
var JiraWorkflowAriResourceOwner = "jira", JiraWorkflowAriResourceType = "workflow";

// src/jira/workflow/manifest.ts
var jiraWorkflowAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraWorkflowAriResourceOwner,
  resourceType: JiraWorkflowAriResourceType,
  resourceIdSlug: "activation/{activationId}/{workflowId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    workflowId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/workflow/index.ts
var JiraWorkflowAri = class _JiraWorkflowAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._workflowId = opts.resourceIdSegmentValues.workflowId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get workflowId() {
    return this._workflowId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraWorkflowAriStaticOpts.qualifier,
      platformQualifier: jiraWorkflowAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraWorkflowAriStaticOpts.resourceOwner,
      resourceType: jiraWorkflowAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.workflowId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        workflowId: opts.workflowId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraWorkflowAriStaticOpts);
    return new _JiraWorkflowAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraWorkflowAriStaticOpts);
    return new _JiraWorkflowAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      workflowId: this.workflowId
    };
  }
};

// src/jira/worklog/types.ts
var JiraWorklogAriResourceOwner = "jira", JiraWorklogAriResourceType = "worklog";

// src/jira/worklog/manifest.ts
var jiraWorklogAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraWorklogAriResourceOwner,
  resourceType: JiraWorklogAriResourceType,
  resourceIdSlug: "{worklogId}",
  resourceIdSegmentFormats: {
    worklogId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/worklog/index.ts
var JiraWorklogAri = class _JiraWorklogAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._worklogId = opts.resourceIdSegmentValues.worklogId;
  }
  get siteId() {
    return this._siteId;
  }
  get worklogId() {
    return this._worklogId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraWorklogAriStaticOpts.qualifier,
      platformQualifier: jiraWorklogAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraWorklogAriStaticOpts.resourceOwner,
      resourceType: jiraWorklogAriStaticOpts.resourceType,
      resourceId: `${opts.worklogId}`,
      resourceIdSegmentValues: {
        worklogId: opts.worklogId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraWorklogAriStaticOpts);
    return new _JiraWorklogAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraWorklogAriStaticOpts);
    return new _JiraWorklogAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      worklogId: this.worklogId
    };
  }
};

// src/jira/user-broadcast-message/types.ts
var JiraUserBroadcastMessageAriResourceOwner = "jira", JiraUserBroadcastMessageAriResourceType = "user-broadcast-message";

// src/jira/user-broadcast-message/manifest.ts
var jiraUserBroadcastMessageAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraUserBroadcastMessageAriResourceOwner,
  resourceType: JiraUserBroadcastMessageAriResourceType,
  resourceIdSlug: "activation/{activationId}/{broadcastMessageId}/{userId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    broadcastMessageId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    userId: /[a-zA-Z0-9_\-\:]{1,128}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/user-broadcast-message/index.ts
var JiraUserBroadcastMessageAri = class _JiraUserBroadcastMessageAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._broadcastMessageId = opts.resourceIdSegmentValues.broadcastMessageId, this._userId = opts.resourceIdSegmentValues.userId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get broadcastMessageId() {
    return this._broadcastMessageId;
  }
  get userId() {
    return this._userId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraUserBroadcastMessageAriStaticOpts.qualifier,
      platformQualifier: jiraUserBroadcastMessageAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraUserBroadcastMessageAriStaticOpts.resourceOwner,
      resourceType: jiraUserBroadcastMessageAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.broadcastMessageId}/${opts.userId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        broadcastMessageId: opts.broadcastMessageId,
        userId: opts.userId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraUserBroadcastMessageAriStaticOpts);
    return new _JiraUserBroadcastMessageAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraUserBroadcastMessageAriStaticOpts);
    return new _JiraUserBroadcastMessageAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      broadcastMessageId: this.broadcastMessageId,
      userId: this.userId
    };
  }
};

// src/jira/version-approver/types.ts
var JiraVersionApproverAriResourceOwner = "jira", JiraVersionApproverAriResourceType = "version-approver";

// src/jira/version-approver/manifest.ts
var jiraVersionApproverAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraVersionApproverAriResourceOwner,
  resourceType: JiraVersionApproverAriResourceType,
  resourceIdSlug: "activation/{activationId}/{versionId}/{approverId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    versionId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    approverId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/version-approver/index.ts
var JiraVersionApproverAri = class _JiraVersionApproverAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._versionId = opts.resourceIdSegmentValues.versionId, this._approverId = opts.resourceIdSegmentValues.approverId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get versionId() {
    return this._versionId;
  }
  get approverId() {
    return this._approverId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraVersionApproverAriStaticOpts.qualifier,
      platformQualifier: jiraVersionApproverAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraVersionApproverAriStaticOpts.resourceOwner,
      resourceType: jiraVersionApproverAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.versionId}/${opts.approverId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        versionId: opts.versionId,
        approverId: opts.approverId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraVersionApproverAriStaticOpts);
    return new _JiraVersionApproverAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraVersionApproverAriStaticOpts);
    return new _JiraVersionApproverAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      versionId: this.versionId,
      approverId: this.approverId
    };
  }
};

// src/jira/version/types.ts
var JiraVersionAriResourceOwner = "jira", JiraVersionAriResourceType = "version";

// src/jira/version/manifest.ts
var jiraVersionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraVersionAriResourceOwner,
  resourceType: JiraVersionAriResourceType,
  resourceIdSlug: "activation/{activationId}/{versionId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    versionId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/version/index.ts
var JiraVersionAri = class _JiraVersionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._versionId = opts.resourceIdSegmentValues.versionId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get versionId() {
    return this._versionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraVersionAriStaticOpts.qualifier,
      platformQualifier: jiraVersionAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraVersionAriStaticOpts.resourceOwner,
      resourceType: jiraVersionAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.versionId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        versionId: opts.versionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraVersionAriStaticOpts);
    return new _JiraVersionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraVersionAriStaticOpts);
    return new _JiraVersionAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      versionId: this.versionId
    };
  }
};

// src/jira/vulnerability-history/types.ts
var JiraVulnerabilityHistoryAriResourceOwner = "jira", JiraVulnerabilityHistoryAriResourceType = "vulnerability-history";

// src/jira/vulnerability-history/manifest.ts
var jiraVulnerabilityHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraVulnerabilityHistoryAriResourceOwner,
  resourceType: JiraVulnerabilityHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{vulnerabilityId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    vulnerabilityId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/vulnerability-history/index.ts
var JiraVulnerabilityHistoryAri = class _JiraVulnerabilityHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._vulnerabilityId = opts.resourceIdSegmentValues.vulnerabilityId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get vulnerabilityId() {
    return this._vulnerabilityId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraVulnerabilityHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraVulnerabilityHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraVulnerabilityHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraVulnerabilityHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.vulnerabilityId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        vulnerabilityId: opts.vulnerabilityId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraVulnerabilityHistoryAriStaticOpts);
    return new _JiraVulnerabilityHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraVulnerabilityHistoryAriStaticOpts);
    return new _JiraVulnerabilityHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      vulnerabilityId: this.vulnerabilityId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/security-level/types.ts
var JiraSecurityLevelAriResourceOwner = "jira", JiraSecurityLevelAriResourceType = "security-level";

// src/jira/security-level/manifest.ts
var jiraSecurityLevelAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSecurityLevelAriResourceOwner,
  resourceType: JiraSecurityLevelAriResourceType,
  resourceIdSlug: "activation/{activationId}/{securityLevelId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    securityLevelId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/security-level/index.ts
var JiraSecurityLevelAri = class _JiraSecurityLevelAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._securityLevelId = opts.resourceIdSegmentValues.securityLevelId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get securityLevelId() {
    return this._securityLevelId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSecurityLevelAriStaticOpts.qualifier,
      platformQualifier: jiraSecurityLevelAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSecurityLevelAriStaticOpts.resourceOwner,
      resourceType: jiraSecurityLevelAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.securityLevelId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        securityLevelId: opts.securityLevelId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSecurityLevelAriStaticOpts);
    return new _JiraSecurityLevelAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSecurityLevelAriStaticOpts);
    return new _JiraSecurityLevelAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      securityLevelId: this.securityLevelId
    };
  }
};

// src/jira/security-workspace/types.ts
var JiraSecurityWorkspaceAriResourceOwner = "jira", JiraSecurityWorkspaceAriResourceType = "security-workspace";

// src/jira/security-workspace/manifest.ts
var jiraSecurityWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSecurityWorkspaceAriResourceOwner,
  resourceType: JiraSecurityWorkspaceAriResourceType,
  resourceIdSlug: "activation/{activationId}/{providerAppId}/{securityWorkspaceId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    providerAppId: /[a-zA-Z0-9-._]+/,
    // eslint-disable-line no-useless-escape
    securityWorkspaceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/security-workspace/index.ts
var JiraSecurityWorkspaceAri = class _JiraSecurityWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._providerAppId = opts.resourceIdSegmentValues.providerAppId, this._securityWorkspaceId = opts.resourceIdSegmentValues.securityWorkspaceId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get providerAppId() {
    return this._providerAppId;
  }
  get securityWorkspaceId() {
    return this._securityWorkspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSecurityWorkspaceAriStaticOpts.qualifier,
      platformQualifier: jiraSecurityWorkspaceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSecurityWorkspaceAriStaticOpts.resourceOwner,
      resourceType: jiraSecurityWorkspaceAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.providerAppId}/${opts.securityWorkspaceId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        providerAppId: opts.providerAppId,
        securityWorkspaceId: opts.securityWorkspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSecurityWorkspaceAriStaticOpts);
    return new _JiraSecurityWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSecurityWorkspaceAriStaticOpts);
    return new _JiraSecurityWorkspaceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      providerAppId: this.providerAppId,
      securityWorkspaceId: this.securityWorkspaceId
    };
  }
};

// src/jira/site/types.ts
var JiraSiteAriResourceOwner = "jira", JiraSiteAriResourceType = "site";

// src/jira/site/manifest.ts
var jiraSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraSiteAriResourceOwner,
  resourceType: JiraSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/site/index.ts
var JiraSiteAri = class _JiraSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSiteAriStaticOpts.qualifier,
      platformQualifier: jiraSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraSiteAriStaticOpts.resourceOwner,
      resourceType: jiraSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSiteAriStaticOpts);
    return new _JiraSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSiteAriStaticOpts);
    return new _JiraSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/jira/sprint/types.ts
var JiraSprintAriResourceOwner = "jira", JiraSprintAriResourceType = "sprint";

// src/jira/sprint/manifest.ts
var jiraSprintAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSprintAriResourceOwner,
  resourceType: JiraSprintAriResourceType,
  resourceIdSlug: "activation/{activationId}/{sprintId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    sprintId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/sprint/index.ts
var JiraSprintAri = class _JiraSprintAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._sprintId = opts.resourceIdSegmentValues.sprintId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get sprintId() {
    return this._sprintId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSprintAriStaticOpts.qualifier,
      platformQualifier: jiraSprintAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSprintAriStaticOpts.resourceOwner,
      resourceType: jiraSprintAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.sprintId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        sprintId: opts.sprintId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSprintAriStaticOpts);
    return new _JiraSprintAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSprintAriStaticOpts);
    return new _JiraSprintAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      sprintId: this.sprintId
    };
  }
};

// src/jira/resource-usage-metric/types.ts
var JiraResourceUsageMetricAriResourceOwner = "jira", JiraResourceUsageMetricAriResourceType = "resource-usage-metric";

// src/jira/resource-usage-metric/manifest.ts
var jiraResourceUsageMetricAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraResourceUsageMetricAriResourceOwner,
  resourceType: JiraResourceUsageMetricAriResourceType,
  resourceIdSlug: "activation/{activationId}/{metricKey}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    metricKey: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/resource-usage-metric/index.ts
var JiraResourceUsageMetricAri = class _JiraResourceUsageMetricAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._metricKey = opts.resourceIdSegmentValues.metricKey;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get metricKey() {
    return this._metricKey;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraResourceUsageMetricAriStaticOpts.qualifier,
      platformQualifier: jiraResourceUsageMetricAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraResourceUsageMetricAriStaticOpts.resourceOwner,
      resourceType: jiraResourceUsageMetricAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.metricKey}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        metricKey: opts.metricKey
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraResourceUsageMetricAriStaticOpts);
    return new _JiraResourceUsageMetricAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraResourceUsageMetricAriStaticOpts);
    return new _JiraResourceUsageMetricAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      metricKey: this.metricKey
    };
  }
};

// src/jira/resource-usage-recommendation/types.ts
var JiraResourceUsageRecommendationAriResourceOwner = "jira", JiraResourceUsageRecommendationAriResourceType = "resource-usage-recommendation";

// src/jira/resource-usage-recommendation/manifest.ts
var jiraResourceUsageRecommendationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraResourceUsageRecommendationAriResourceOwner,
  resourceType: JiraResourceUsageRecommendationAriResourceType,
  resourceIdSlug: "activation/{activationId}/{recommendationId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    recommendationId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/resource-usage-recommendation/index.ts
var JiraResourceUsageRecommendationAri = class _JiraResourceUsageRecommendationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._recommendationId = opts.resourceIdSegmentValues.recommendationId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get recommendationId() {
    return this._recommendationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraResourceUsageRecommendationAriStaticOpts.qualifier,
      platformQualifier: jiraResourceUsageRecommendationAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraResourceUsageRecommendationAriStaticOpts.resourceOwner,
      resourceType: jiraResourceUsageRecommendationAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.recommendationId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        recommendationId: opts.recommendationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraResourceUsageRecommendationAriStaticOpts);
    return new _JiraResourceUsageRecommendationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraResourceUsageRecommendationAriStaticOpts);
    return new _JiraResourceUsageRecommendationAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      recommendationId: this.recommendationId
    };
  }
};

// src/jira/role/types.ts
var JiraRoleAriResourceOwner = "jira", JiraRoleAriResourceType = "role";

// src/jira/role/manifest.ts
var jiraRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]*$"),
  resourceOwner: JiraRoleAriResourceOwner,
  resourceType: JiraRoleAriResourceType,
  resourceIdSlug: "{jiraRoleType}/{jiraRoleTypeId}",
  resourceIdSegmentFormats: {
    jiraRoleType: /(?:scope|product|projectrole-by-project|project-lead|principal-grant|project-role|application-access|jsm-customer-context-helpseeker-project-permission|jsm-customer-context-anonymous-project-permission|role-type-for-perms-pollinator-test)/,
    // eslint-disable-line no-useless-escape
    jiraRoleTypeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/role/index.ts
var JiraRoleAri = class _JiraRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._optionalSiteId = opts.cloudId || "", this._jiraRoleType = opts.resourceIdSegmentValues.jiraRoleType, this._jiraRoleTypeId = opts.resourceIdSegmentValues.jiraRoleTypeId;
  }
  get optionalSiteId() {
    return this._optionalSiteId;
  }
  get jiraRoleType() {
    return this._jiraRoleType;
  }
  get jiraRoleTypeId() {
    return this._jiraRoleTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraRoleAriStaticOpts.qualifier,
      platformQualifier: jiraRoleAriStaticOpts.platformQualifier,
      cloudId: opts.optionalSiteId,
      resourceOwner: jiraRoleAriStaticOpts.resourceOwner,
      resourceType: jiraRoleAriStaticOpts.resourceType,
      resourceId: `${opts.jiraRoleType}/${opts.jiraRoleTypeId}`,
      resourceIdSegmentValues: {
        jiraRoleType: opts.jiraRoleType,
        jiraRoleTypeId: opts.jiraRoleTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraRoleAriStaticOpts);
    return new _JiraRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraRoleAriStaticOpts);
    return new _JiraRoleAri(opts);
  }
  getVariables() {
    return {
      optionalSiteId: this.optionalSiteId,
      jiraRoleType: this.jiraRoleType,
      jiraRoleTypeId: this.jiraRoleTypeId
    };
  }
};

// src/jira/security-container/types.ts
var JiraSecurityContainerAriResourceOwner = "jira", JiraSecurityContainerAriResourceType = "security-container";

// src/jira/security-container/manifest.ts
var jiraSecurityContainerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSecurityContainerAriResourceOwner,
  resourceType: JiraSecurityContainerAriResourceType,
  resourceIdSlug: "activation/{activationId}/{providerAppId}/{securityContainerId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    providerAppId: /[a-zA-Z0-9-._]+/,
    // eslint-disable-line no-useless-escape
    securityContainerId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/security-container/index.ts
var JiraSecurityContainerAri = class _JiraSecurityContainerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._providerAppId = opts.resourceIdSegmentValues.providerAppId, this._securityContainerId = opts.resourceIdSegmentValues.securityContainerId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get providerAppId() {
    return this._providerAppId;
  }
  get securityContainerId() {
    return this._securityContainerId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSecurityContainerAriStaticOpts.qualifier,
      platformQualifier: jiraSecurityContainerAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSecurityContainerAriStaticOpts.resourceOwner,
      resourceType: jiraSecurityContainerAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.providerAppId}/${opts.securityContainerId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        providerAppId: opts.providerAppId,
        securityContainerId: opts.securityContainerId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSecurityContainerAriStaticOpts);
    return new _JiraSecurityContainerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSecurityContainerAriStaticOpts);
    return new _JiraSecurityContainerAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      providerAppId: this.providerAppId,
      securityContainerId: this.securityContainerId
    };
  }
};

// src/jira/remote-link-history/types.ts
var JiraRemoteLinkHistoryAriResourceOwner = "jira", JiraRemoteLinkHistoryAriResourceType = "remote-link-history";

// src/jira/remote-link-history/manifest.ts
var jiraRemoteLinkHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraRemoteLinkHistoryAriResourceOwner,
  resourceType: JiraRemoteLinkHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{remoteLinkId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    remoteLinkId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/remote-link-history/index.ts
var JiraRemoteLinkHistoryAri = class _JiraRemoteLinkHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._remoteLinkId = opts.resourceIdSegmentValues.remoteLinkId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get remoteLinkId() {
    return this._remoteLinkId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraRemoteLinkHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraRemoteLinkHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraRemoteLinkHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraRemoteLinkHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.remoteLinkId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        remoteLinkId: opts.remoteLinkId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraRemoteLinkHistoryAriStaticOpts);
    return new _JiraRemoteLinkHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraRemoteLinkHistoryAriStaticOpts);
    return new _JiraRemoteLinkHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      remoteLinkId: this.remoteLinkId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/remote-link/types.ts
var JiraRemoteLinkAriResourceOwner = "jira", JiraRemoteLinkAriResourceType = "remote-link";

// src/jira/remote-link/manifest.ts
var jiraRemoteLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraRemoteLinkAriResourceOwner,
  resourceType: JiraRemoteLinkAriResourceType,
  resourceIdSlug: "activation/{activationId}/{remoteLinkId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    remoteLinkId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/remote-link/index.ts
var JiraRemoteLinkAri = class _JiraRemoteLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._remoteLinkId = opts.resourceIdSegmentValues.remoteLinkId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get remoteLinkId() {
    return this._remoteLinkId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraRemoteLinkAriStaticOpts.qualifier,
      platformQualifier: jiraRemoteLinkAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraRemoteLinkAriStaticOpts.resourceOwner,
      resourceType: jiraRemoteLinkAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.remoteLinkId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        remoteLinkId: opts.remoteLinkId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraRemoteLinkAriStaticOpts);
    return new _JiraRemoteLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraRemoteLinkAriStaticOpts);
    return new _JiraRemoteLinkAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      remoteLinkId: this.remoteLinkId
    };
  }
};

// src/jira/repository/types.ts
var JiraRepositoryAriResourceOwner = "jira", JiraRepositoryAriResourceType = "repository";

// src/jira/repository/manifest.ts
var jiraRepositoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraRepositoryAriResourceOwner,
  resourceType: JiraRepositoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{repositoryId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    repositoryId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/repository/index.ts
var JiraRepositoryAri = class _JiraRepositoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._repositoryId = opts.resourceIdSegmentValues.repositoryId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get repositoryId() {
    return this._repositoryId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraRepositoryAriStaticOpts.qualifier,
      platformQualifier: jiraRepositoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraRepositoryAriStaticOpts.resourceOwner,
      resourceType: jiraRepositoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.repositoryId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        repositoryId: opts.repositoryId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraRepositoryAriStaticOpts);
    return new _JiraRepositoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraRepositoryAriStaticOpts);
    return new _JiraRepositoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      repositoryId: this.repositoryId
    };
  }
};

// src/jira/resolution/types.ts
var JiraResolutionAriResourceOwner = "jira", JiraResolutionAriResourceType = "resolution";

// src/jira/resolution/manifest.ts
var jiraResolutionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraResolutionAriResourceOwner,
  resourceType: JiraResolutionAriResourceType,
  resourceIdSlug: "activation/{activationId}/{resolutionId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    resolutionId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/resolution/index.ts
var JiraResolutionAri = class _JiraResolutionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._resolutionId = opts.resourceIdSegmentValues.resolutionId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get resolutionId() {
    return this._resolutionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraResolutionAriStaticOpts.qualifier,
      platformQualifier: jiraResolutionAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraResolutionAriStaticOpts.resourceOwner,
      resourceType: jiraResolutionAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.resolutionId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        resolutionId: opts.resolutionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraResolutionAriStaticOpts);
    return new _JiraResolutionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraResolutionAriStaticOpts);
    return new _JiraResolutionAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      resolutionId: this.resolutionId
    };
  }
};

// src/jira/project-type/types.ts
var JiraProjectTypeAriResourceOwner = "jira", JiraProjectTypeAriResourceType = "project-type";

// src/jira/project-type/manifest.ts
var jiraProjectTypeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraProjectTypeAriResourceOwner,
  resourceType: JiraProjectTypeAriResourceType,
  resourceIdSlug: "{projectTypeId}",
  resourceIdSegmentFormats: {
    projectTypeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/project-type/index.ts
var JiraProjectTypeAri = class _JiraProjectTypeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._projectTypeId = opts.resourceIdSegmentValues.projectTypeId;
  }
  get siteId() {
    return this._siteId;
  }
  get projectTypeId() {
    return this._projectTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraProjectTypeAriStaticOpts.qualifier,
      platformQualifier: jiraProjectTypeAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraProjectTypeAriStaticOpts.resourceOwner,
      resourceType: jiraProjectTypeAriStaticOpts.resourceType,
      resourceId: `${opts.projectTypeId}`,
      resourceIdSegmentValues: {
        projectTypeId: opts.projectTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraProjectTypeAriStaticOpts);
    return new _JiraProjectTypeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraProjectTypeAriStaticOpts);
    return new _JiraProjectTypeAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      projectTypeId: this.projectTypeId
    };
  }
};

// src/jira/project/types.ts
var JiraProjectAriResourceOwner = "jira", JiraProjectAriResourceType = "project";

// src/jira/project/manifest.ts
var jiraProjectAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraProjectAriResourceOwner,
  resourceType: JiraProjectAriResourceType,
  resourceIdSlug: "{projectId}",
  resourceIdSegmentFormats: {
    projectId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/project/index.ts
var JiraProjectAri = class _JiraProjectAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._projectId = opts.resourceIdSegmentValues.projectId;
  }
  get siteId() {
    return this._siteId;
  }
  get projectId() {
    return this._projectId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraProjectAriStaticOpts.qualifier,
      platformQualifier: jiraProjectAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraProjectAriStaticOpts.resourceOwner,
      resourceType: jiraProjectAriStaticOpts.resourceType,
      resourceId: `${opts.projectId}`,
      resourceIdSegmentValues: {
        projectId: opts.projectId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraProjectAriStaticOpts);
    return new _JiraProjectAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraProjectAriStaticOpts);
    return new _JiraProjectAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      projectId: this.projectId
    };
  }
};

// src/jira/pull-request-history/types.ts
var JiraPullRequestHistoryAriResourceOwner = "jira", JiraPullRequestHistoryAriResourceType = "pull-request-history";

// src/jira/pull-request-history/manifest.ts
var jiraPullRequestHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraPullRequestHistoryAriResourceOwner,
  resourceType: JiraPullRequestHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{pullRequestId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    pullRequestId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/pull-request-history/index.ts
var JiraPullRequestHistoryAri = class _JiraPullRequestHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._pullRequestId = opts.resourceIdSegmentValues.pullRequestId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get pullRequestId() {
    return this._pullRequestId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraPullRequestHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraPullRequestHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraPullRequestHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraPullRequestHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.pullRequestId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        pullRequestId: opts.pullRequestId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraPullRequestHistoryAriStaticOpts);
    return new _JiraPullRequestHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraPullRequestHistoryAriStaticOpts);
    return new _JiraPullRequestHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      pullRequestId: this.pullRequestId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/pull-request/types.ts
var JiraPullRequestAriResourceOwner = "jira", JiraPullRequestAriResourceType = "pull-request";

// src/jira/pull-request/manifest.ts
var jiraPullRequestAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraPullRequestAriResourceOwner,
  resourceType: JiraPullRequestAriResourceType,
  resourceIdSlug: "activation/{activationId}/{pullRequestId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    pullRequestId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/pull-request/index.ts
var JiraPullRequestAri = class _JiraPullRequestAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._pullRequestId = opts.resourceIdSegmentValues.pullRequestId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get pullRequestId() {
    return this._pullRequestId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraPullRequestAriStaticOpts.qualifier,
      platformQualifier: jiraPullRequestAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraPullRequestAriStaticOpts.resourceOwner,
      resourceType: jiraPullRequestAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.pullRequestId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        pullRequestId: opts.pullRequestId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraPullRequestAriStaticOpts);
    return new _JiraPullRequestAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraPullRequestAriStaticOpts);
    return new _JiraPullRequestAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      pullRequestId: this.pullRequestId
    };
  }
};

// src/jira/project-feature/types.ts
var JiraProjectFeatureAriResourceOwner = "jira", JiraProjectFeatureAriResourceType = "project-feature";

// src/jira/project-feature/manifest.ts
var jiraProjectFeatureAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraProjectFeatureAriResourceOwner,
  resourceType: JiraProjectFeatureAriResourceType,
  resourceIdSlug: "activation/{activationId}/{projectId}/featureKey/{featureKey}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    projectId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    featureKey: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/project-feature/index.ts
var JiraProjectFeatureAri = class _JiraProjectFeatureAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._projectId = opts.resourceIdSegmentValues.projectId, this._featureKey = opts.resourceIdSegmentValues.featureKey;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get projectId() {
    return this._projectId;
  }
  get featureKey() {
    return this._featureKey;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraProjectFeatureAriStaticOpts.qualifier,
      platformQualifier: jiraProjectFeatureAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraProjectFeatureAriStaticOpts.resourceOwner,
      resourceType: jiraProjectFeatureAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.projectId}/featureKey/${opts.featureKey}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        projectId: opts.projectId,
        featureKey: opts.featureKey
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraProjectFeatureAriStaticOpts);
    return new _JiraProjectFeatureAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraProjectFeatureAriStaticOpts);
    return new _JiraProjectFeatureAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      projectId: this.projectId,
      featureKey: this.featureKey
    };
  }
};

// src/jira/project-overview/types.ts
var JiraProjectOverviewAriResourceOwner = "jira", JiraProjectOverviewAriResourceType = "project-overview";

// src/jira/project-overview/manifest.ts
var jiraProjectOverviewAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraProjectOverviewAriResourceOwner,
  resourceType: JiraProjectOverviewAriResourceType,
  resourceIdSlug: "activation/{activationId}/{overviewId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    overviewId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/project-overview/index.ts
var JiraProjectOverviewAri = class _JiraProjectOverviewAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._overviewId = opts.resourceIdSegmentValues.overviewId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get overviewId() {
    return this._overviewId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraProjectOverviewAriStaticOpts.qualifier,
      platformQualifier: jiraProjectOverviewAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraProjectOverviewAriStaticOpts.resourceOwner,
      resourceType: jiraProjectOverviewAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.overviewId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        overviewId: opts.overviewId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraProjectOverviewAriStaticOpts);
    return new _JiraProjectOverviewAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraProjectOverviewAriStaticOpts);
    return new _JiraProjectOverviewAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      overviewId: this.overviewId
    };
  }
};

// src/jira/project-role-actor/types.ts
var JiraProjectRoleActorAriResourceOwner = "jira", JiraProjectRoleActorAriResourceType = "project-role-actor";

// src/jira/project-role-actor/manifest.ts
var jiraProjectRoleActorAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraProjectRoleActorAriResourceOwner,
  resourceType: JiraProjectRoleActorAriResourceType,
  resourceIdSlug: "activation/{activationId}/{projectRoleActorId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    projectRoleActorId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/project-role-actor/index.ts
var JiraProjectRoleActorAri = class _JiraProjectRoleActorAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._projectRoleActorId = opts.resourceIdSegmentValues.projectRoleActorId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get projectRoleActorId() {
    return this._projectRoleActorId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraProjectRoleActorAriStaticOpts.qualifier,
      platformQualifier: jiraProjectRoleActorAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraProjectRoleActorAriStaticOpts.resourceOwner,
      resourceType: jiraProjectRoleActorAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.projectRoleActorId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        projectRoleActorId: opts.projectRoleActorId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraProjectRoleActorAriStaticOpts);
    return new _JiraProjectRoleActorAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraProjectRoleActorAriStaticOpts);
    return new _JiraProjectRoleActorAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      projectRoleActorId: this.projectRoleActorId
    };
  }
};

// src/jira/project-shortcut/types.ts
var JiraProjectShortcutAriResourceOwner = "jira", JiraProjectShortcutAriResourceType = "project-shortcut";

// src/jira/project-shortcut/manifest.ts
var jiraProjectShortcutAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraProjectShortcutAriResourceOwner,
  resourceType: JiraProjectShortcutAriResourceType,
  resourceIdSlug: "activation/{activationId}/{shortcutId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    shortcutId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/project-shortcut/index.ts
var JiraProjectShortcutAri = class _JiraProjectShortcutAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._shortcutId = opts.resourceIdSegmentValues.shortcutId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get shortcutId() {
    return this._shortcutId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraProjectShortcutAriStaticOpts.qualifier,
      platformQualifier: jiraProjectShortcutAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraProjectShortcutAriStaticOpts.resourceOwner,
      resourceType: jiraProjectShortcutAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.shortcutId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        shortcutId: opts.shortcutId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraProjectShortcutAriStaticOpts);
    return new _JiraProjectShortcutAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraProjectShortcutAriStaticOpts);
    return new _JiraProjectShortcutAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      shortcutId: this.shortcutId
    };
  }
};

// src/jira/post-incident-review/types.ts
var JiraPostIncidentReviewAriResourceOwner = "jira", JiraPostIncidentReviewAriResourceType = "post-incident-review";

// src/jira/post-incident-review/manifest.ts
var jiraPostIncidentReviewAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraPostIncidentReviewAriResourceOwner,
  resourceType: JiraPostIncidentReviewAriResourceType,
  resourceIdSlug: "activation/{activationId}/{postIncidentReviewId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    postIncidentReviewId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/post-incident-review/index.ts
var JiraPostIncidentReviewAri = class _JiraPostIncidentReviewAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._postIncidentReviewId = opts.resourceIdSegmentValues.postIncidentReviewId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get postIncidentReviewId() {
    return this._postIncidentReviewId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraPostIncidentReviewAriStaticOpts.qualifier,
      platformQualifier: jiraPostIncidentReviewAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraPostIncidentReviewAriStaticOpts.resourceOwner,
      resourceType: jiraPostIncidentReviewAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.postIncidentReviewId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        postIncidentReviewId: opts.postIncidentReviewId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraPostIncidentReviewAriStaticOpts);
    return new _JiraPostIncidentReviewAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraPostIncidentReviewAriStaticOpts);
    return new _JiraPostIncidentReviewAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      postIncidentReviewId: this.postIncidentReviewId
    };
  }
};

// src/jira/priority/types.ts
var JiraPriorityAriResourceOwner = "jira", JiraPriorityAriResourceType = "priority";

// src/jira/priority/manifest.ts
var jiraPriorityAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraPriorityAriResourceOwner,
  resourceType: JiraPriorityAriResourceType,
  resourceIdSlug: "activation/{activationId}/{priorityId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    priorityId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/priority/index.ts
var JiraPriorityAri = class _JiraPriorityAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._priorityId = opts.resourceIdSegmentValues.priorityId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get priorityId() {
    return this._priorityId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraPriorityAriStaticOpts.qualifier,
      platformQualifier: jiraPriorityAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraPriorityAriStaticOpts.resourceOwner,
      resourceType: jiraPriorityAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.priorityId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        priorityId: opts.priorityId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraPriorityAriStaticOpts);
    return new _JiraPriorityAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraPriorityAriStaticOpts);
    return new _JiraPriorityAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      priorityId: this.priorityId
    };
  }
};

// src/jira/product/types.ts
var JiraProductAriResourceOwner = "jira", JiraProductAriResourceType = "product";

// src/jira/product/manifest.ts
var jiraProductAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraProductAriResourceOwner,
  resourceType: JiraProductAriResourceType,
  resourceIdSlug: "activation/{activationId}/{productId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    productId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/product/index.ts
var JiraProductAri = class _JiraProductAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._productId = opts.resourceIdSegmentValues.productId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get productId() {
    return this._productId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraProductAriStaticOpts.qualifier,
      platformQualifier: jiraProductAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraProductAriStaticOpts.resourceOwner,
      resourceType: jiraProductAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.productId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        productId: opts.productId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraProductAriStaticOpts);
    return new _JiraProductAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraProductAriStaticOpts);
    return new _JiraProductAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      productId: this.productId
    };
  }
};

// src/jira/project-category/types.ts
var JiraProjectCategoryAriResourceOwner = "jira", JiraProjectCategoryAriResourceType = "project-category";

// src/jira/project-category/manifest.ts
var jiraProjectCategoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraProjectCategoryAriResourceOwner,
  resourceType: JiraProjectCategoryAriResourceType,
  resourceIdSlug: "{projectCategoryId}",
  resourceIdSegmentFormats: {
    projectCategoryId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/project-category/index.ts
var JiraProjectCategoryAri = class _JiraProjectCategoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._projectCategoryId = opts.resourceIdSegmentValues.projectCategoryId;
  }
  get siteId() {
    return this._siteId;
  }
  get projectCategoryId() {
    return this._projectCategoryId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraProjectCategoryAriStaticOpts.qualifier,
      platformQualifier: jiraProjectCategoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraProjectCategoryAriStaticOpts.resourceOwner,
      resourceType: jiraProjectCategoryAriStaticOpts.resourceType,
      resourceId: `${opts.projectCategoryId}`,
      resourceIdSegmentValues: {
        projectCategoryId: opts.projectCategoryId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraProjectCategoryAriStaticOpts);
    return new _JiraProjectCategoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraProjectCategoryAriStaticOpts);
    return new _JiraProjectCategoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      projectCategoryId: this.projectCategoryId
    };
  }
};

// src/jira/permission-scheme/types.ts
var JiraPermissionSchemeAriResourceOwner = "jira", JiraPermissionSchemeAriResourceType = "permission-scheme";

// src/jira/permission-scheme/manifest.ts
var jiraPermissionSchemeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraPermissionSchemeAriResourceOwner,
  resourceType: JiraPermissionSchemeAriResourceType,
  resourceIdSlug: "activation/{activationId}/{schemeId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    schemeId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/permission-scheme/index.ts
var JiraPermissionSchemeAri = class _JiraPermissionSchemeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._schemeId = opts.resourceIdSegmentValues.schemeId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get schemeId() {
    return this._schemeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraPermissionSchemeAriStaticOpts.qualifier,
      platformQualifier: jiraPermissionSchemeAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraPermissionSchemeAriStaticOpts.resourceOwner,
      resourceType: jiraPermissionSchemeAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.schemeId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        schemeId: opts.schemeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraPermissionSchemeAriStaticOpts);
    return new _JiraPermissionSchemeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraPermissionSchemeAriStaticOpts);
    return new _JiraPermissionSchemeAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      schemeId: this.schemeId
    };
  }
};

// src/jira/plan/types.ts
var JiraPlanAriResourceOwner = "jira", JiraPlanAriResourceType = "plan";

// src/jira/plan/manifest.ts
var jiraPlanAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraPlanAriResourceOwner,
  resourceType: JiraPlanAriResourceType,
  resourceIdSlug: "activation/{activationId}/{planId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    planId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/plan/index.ts
var JiraPlanAri = class _JiraPlanAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._planId = opts.resourceIdSegmentValues.planId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get planId() {
    return this._planId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraPlanAriStaticOpts.qualifier,
      platformQualifier: jiraPlanAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraPlanAriStaticOpts.resourceOwner,
      resourceType: jiraPlanAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.planId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        planId: opts.planId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraPlanAriStaticOpts);
    return new _JiraPlanAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraPlanAriStaticOpts);
    return new _JiraPlanAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      planId: this.planId
    };
  }
};

// src/jira/post-incident-review-history/types.ts
var JiraPostIncidentReviewHistoryAriResourceOwner = "jira", JiraPostIncidentReviewHistoryAriResourceType = "post-incident-review-history";

// src/jira/post-incident-review-history/manifest.ts
var jiraPostIncidentReviewHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraPostIncidentReviewHistoryAriResourceOwner,
  resourceType: JiraPostIncidentReviewHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{postIncidentReviewId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    postIncidentReviewId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/post-incident-review-history/index.ts
var JiraPostIncidentReviewHistoryAri = class _JiraPostIncidentReviewHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._postIncidentReviewId = opts.resourceIdSegmentValues.postIncidentReviewId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get postIncidentReviewId() {
    return this._postIncidentReviewId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraPostIncidentReviewHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraPostIncidentReviewHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraPostIncidentReviewHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraPostIncidentReviewHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.postIncidentReviewId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        postIncidentReviewId: opts.postIncidentReviewId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraPostIncidentReviewHistoryAriStaticOpts);
    return new _JiraPostIncidentReviewHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraPostIncidentReviewHistoryAriStaticOpts);
    return new _JiraPostIncidentReviewHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      postIncidentReviewId: this.postIncidentReviewId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/post-incident-review-link/types.ts
var JiraPostIncidentReviewLinkAriResourceOwner = "jira", JiraPostIncidentReviewLinkAriResourceType = "post-incident-review-link";

// src/jira/post-incident-review-link/manifest.ts
var jiraPostIncidentReviewLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraPostIncidentReviewLinkAriResourceOwner,
  resourceType: JiraPostIncidentReviewLinkAriResourceType,
  resourceIdSlug: "activation/{activationId}/{postIncidentReviewLinkId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    postIncidentReviewLinkId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/post-incident-review-link/index.ts
var JiraPostIncidentReviewLinkAri = class _JiraPostIncidentReviewLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._postIncidentReviewLinkId = opts.resourceIdSegmentValues.postIncidentReviewLinkId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get postIncidentReviewLinkId() {
    return this._postIncidentReviewLinkId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraPostIncidentReviewLinkAriStaticOpts.qualifier,
      platformQualifier: jiraPostIncidentReviewLinkAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraPostIncidentReviewLinkAriStaticOpts.resourceOwner,
      resourceType: jiraPostIncidentReviewLinkAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.postIncidentReviewLinkId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        postIncidentReviewLinkId: opts.postIncidentReviewLinkId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraPostIncidentReviewLinkAriStaticOpts);
    return new _JiraPostIncidentReviewLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraPostIncidentReviewLinkAriStaticOpts);
    return new _JiraPostIncidentReviewLinkAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      postIncidentReviewLinkId: this.postIncidentReviewLinkId
    };
  }
};

// src/jira/notification-type-scheme/types.ts
var JiraNotificationTypeSchemeAriResourceOwner = "jira", JiraNotificationTypeSchemeAriResourceType = "notification-type-scheme";

// src/jira/notification-type-scheme/manifest.ts
var jiraNotificationTypeSchemeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraNotificationTypeSchemeAriResourceOwner,
  resourceType: JiraNotificationTypeSchemeAriResourceType,
  resourceIdSlug: "activation/{activationId}/{notificationTypeSchemeId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    notificationTypeSchemeId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/notification-type-scheme/index.ts
var JiraNotificationTypeSchemeAri = class _JiraNotificationTypeSchemeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._notificationTypeSchemeId = opts.resourceIdSegmentValues.notificationTypeSchemeId;
  }
  get activationId() {
    return this._activationId;
  }
  get notificationTypeSchemeId() {
    return this._notificationTypeSchemeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraNotificationTypeSchemeAriStaticOpts.qualifier,
      platformQualifier: jiraNotificationTypeSchemeAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraNotificationTypeSchemeAriStaticOpts.resourceOwner,
      resourceType: jiraNotificationTypeSchemeAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.notificationTypeSchemeId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        notificationTypeSchemeId: opts.notificationTypeSchemeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraNotificationTypeSchemeAriStaticOpts);
    return new _JiraNotificationTypeSchemeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraNotificationTypeSchemeAriStaticOpts);
    return new _JiraNotificationTypeSchemeAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      notificationTypeSchemeId: this.notificationTypeSchemeId
    };
  }
};

// src/jira/notification-type/types.ts
var JiraNotificationTypeAriResourceOwner = "jira", JiraNotificationTypeAriResourceType = "notification-type";

// src/jira/notification-type/manifest.ts
var jiraNotificationTypeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraNotificationTypeAriResourceOwner,
  resourceType: JiraNotificationTypeAriResourceType,
  resourceIdSlug: "activation/{activationId}/{notificationTypeId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    notificationTypeId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/notification-type/index.ts
var JiraNotificationTypeAri = class _JiraNotificationTypeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._notificationTypeId = opts.resourceIdSegmentValues.notificationTypeId;
  }
  get activationId() {
    return this._activationId;
  }
  get notificationTypeId() {
    return this._notificationTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraNotificationTypeAriStaticOpts.qualifier,
      platformQualifier: jiraNotificationTypeAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraNotificationTypeAriStaticOpts.resourceOwner,
      resourceType: jiraNotificationTypeAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.notificationTypeId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        notificationTypeId: opts.notificationTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraNotificationTypeAriStaticOpts);
    return new _JiraNotificationTypeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraNotificationTypeAriStaticOpts);
    return new _JiraNotificationTypeAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      notificationTypeId: this.notificationTypeId
    };
  }
};

// src/jira/notification-user-preference/types.ts
var JiraNotificationUserPreferenceAriResourceOwner = "jira", JiraNotificationUserPreferenceAriResourceType = "notification-user-preference";

// src/jira/notification-user-preference/manifest.ts
var jiraNotificationUserPreferenceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraNotificationUserPreferenceAriResourceOwner,
  resourceType: JiraNotificationUserPreferenceAriResourceType,
  resourceIdSlug: "activation/{activationId}/{notificationUserPreferenceId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    notificationUserPreferenceId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/notification-user-preference/index.ts
var JiraNotificationUserPreferenceAri = class _JiraNotificationUserPreferenceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._notificationUserPreferenceId = opts.resourceIdSegmentValues.notificationUserPreferenceId;
  }
  get activationId() {
    return this._activationId;
  }
  get notificationUserPreferenceId() {
    return this._notificationUserPreferenceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraNotificationUserPreferenceAriStaticOpts.qualifier,
      platformQualifier: jiraNotificationUserPreferenceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraNotificationUserPreferenceAriStaticOpts.resourceOwner,
      resourceType: jiraNotificationUserPreferenceAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.notificationUserPreferenceId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        notificationUserPreferenceId: opts.notificationUserPreferenceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraNotificationUserPreferenceAriStaticOpts);
    return new _JiraNotificationUserPreferenceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraNotificationUserPreferenceAriStaticOpts);
    return new _JiraNotificationUserPreferenceAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      notificationUserPreferenceId: this.notificationUserPreferenceId
    };
  }
};

// src/jira/operations-workspace/types.ts
var JiraOperationsWorkspaceAriResourceOwner = "jira", JiraOperationsWorkspaceAriResourceType = "operations-workspace";

// src/jira/operations-workspace/manifest.ts
var jiraOperationsWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraOperationsWorkspaceAriResourceOwner,
  resourceType: JiraOperationsWorkspaceAriResourceType,
  resourceIdSlug: "activation/{activationId}/{providerAppId}/{operationsWorkspaceId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    providerAppId: /[a-zA-Z0-9-._]+/,
    // eslint-disable-line no-useless-escape
    operationsWorkspaceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/operations-workspace/index.ts
var JiraOperationsWorkspaceAri = class _JiraOperationsWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._providerAppId = opts.resourceIdSegmentValues.providerAppId, this._operationsWorkspaceId = opts.resourceIdSegmentValues.operationsWorkspaceId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get providerAppId() {
    return this._providerAppId;
  }
  get operationsWorkspaceId() {
    return this._operationsWorkspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraOperationsWorkspaceAriStaticOpts.qualifier,
      platformQualifier: jiraOperationsWorkspaceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraOperationsWorkspaceAriStaticOpts.resourceOwner,
      resourceType: jiraOperationsWorkspaceAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.providerAppId}/${opts.operationsWorkspaceId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        providerAppId: opts.providerAppId,
        operationsWorkspaceId: opts.operationsWorkspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraOperationsWorkspaceAriStaticOpts);
    return new _JiraOperationsWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraOperationsWorkspaceAriStaticOpts);
    return new _JiraOperationsWorkspaceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      providerAppId: this.providerAppId,
      operationsWorkspaceId: this.operationsWorkspaceId
    };
  }
};

// src/jira/issue-worklog/types.ts
var JiraIssueWorklogAriResourceOwner = "jira", JiraIssueWorklogAriResourceType = "issue-worklog";

// src/jira/issue-worklog/manifest.ts
var jiraIssueWorklogAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueWorklogAriResourceOwner,
  resourceType: JiraIssueWorklogAriResourceType,
  resourceIdSlug: "{issueId}/{worklogId}",
  resourceIdSegmentFormats: {
    issueId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    worklogId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-worklog/index.ts
var JiraIssueWorklogAri = class _JiraIssueWorklogAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._issueId = opts.resourceIdSegmentValues.issueId, this._worklogId = opts.resourceIdSegmentValues.worklogId;
  }
  get siteId() {
    return this._siteId;
  }
  get issueId() {
    return this._issueId;
  }
  get worklogId() {
    return this._worklogId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueWorklogAriStaticOpts.qualifier,
      platformQualifier: jiraIssueWorklogAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueWorklogAriStaticOpts.resourceOwner,
      resourceType: jiraIssueWorklogAriStaticOpts.resourceType,
      resourceId: `${opts.issueId}/${opts.worklogId}`,
      resourceIdSegmentValues: {
        issueId: opts.issueId,
        worklogId: opts.worklogId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueWorklogAriStaticOpts);
    return new _JiraIssueWorklogAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueWorklogAriStaticOpts);
    return new _JiraIssueWorklogAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      issueId: this.issueId,
      worklogId: this.worklogId
    };
  }
};

// src/jira/issue/types.ts
var JiraIssueAriResourceOwner = "jira", JiraIssueAriResourceType = "issue";

// src/jira/issue/manifest.ts
var jiraIssueAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueAriResourceOwner,
  resourceType: JiraIssueAriResourceType,
  resourceIdSlug: "{issueId}",
  resourceIdSegmentFormats: {
    issueId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue/index.ts
var JiraIssueAri = class _JiraIssueAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._issueId = opts.resourceIdSegmentValues.issueId;
  }
  get siteId() {
    return this._siteId;
  }
  get issueId() {
    return this._issueId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueAriStaticOpts.qualifier,
      platformQualifier: jiraIssueAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueAriStaticOpts.resourceOwner,
      resourceType: jiraIssueAriStaticOpts.resourceType,
      resourceId: `${opts.issueId}`,
      resourceIdSegmentValues: {
        issueId: opts.issueId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueAriStaticOpts);
    return new _JiraIssueAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueAriStaticOpts);
    return new _JiraIssueAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      issueId: this.issueId
    };
  }
};

// src/jira/issuefieldvalue/types.ts
var JiraIssuefieldvalueAriResourceOwner = "jira", JiraIssuefieldvalueAriResourceType = "issuefieldvalue";

// src/jira/issuefieldvalue/manifest.ts
var jiraIssuefieldvalueAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssuefieldvalueAriResourceOwner,
  resourceType: JiraIssuefieldvalueAriResourceType,
  resourceIdSlug: "{issueId}/{fieldId}",
  resourceIdSegmentFormats: {
    issueId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    fieldId: /[a-zA-Z0-9_]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issuefieldvalue/index.ts
var JiraIssuefieldvalueAri = class _JiraIssuefieldvalueAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._issueId = opts.resourceIdSegmentValues.issueId, this._fieldId = opts.resourceIdSegmentValues.fieldId;
  }
  get siteId() {
    return this._siteId;
  }
  get issueId() {
    return this._issueId;
  }
  get fieldId() {
    return this._fieldId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssuefieldvalueAriStaticOpts.qualifier,
      platformQualifier: jiraIssuefieldvalueAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssuefieldvalueAriStaticOpts.resourceOwner,
      resourceType: jiraIssuefieldvalueAriStaticOpts.resourceType,
      resourceId: `${opts.issueId}/${opts.fieldId}`,
      resourceIdSegmentValues: {
        issueId: opts.issueId,
        fieldId: opts.fieldId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssuefieldvalueAriStaticOpts);
    return new _JiraIssuefieldvalueAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssuefieldvalueAriStaticOpts);
    return new _JiraIssuefieldvalueAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      issueId: this.issueId,
      fieldId: this.fieldId
    };
  }
};

// src/jira/navigation-item/types.ts
var JiraNavigationItemAriResourceOwner = "jira", JiraNavigationItemAriResourceType = "navigation-item";

// src/jira/navigation-item/manifest.ts
var jiraNavigationItemAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraNavigationItemAriResourceOwner,
  resourceType: JiraNavigationItemAriResourceType,
  resourceIdSlug: "activation/{activationId}/{scopeType}/{scopeId}/{itemId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    scopeType: /(?:project|board)/,
    // eslint-disable-line no-useless-escape
    scopeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    itemId: /(?:[a-zA-Z.\-]+|[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/navigation-item/index.ts
var JiraNavigationItemAri = class _JiraNavigationItemAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._scopeType = opts.resourceIdSegmentValues.scopeType, this._scopeId = opts.resourceIdSegmentValues.scopeId, this._itemId = opts.resourceIdSegmentValues.itemId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get scopeType() {
    return this._scopeType;
  }
  get scopeId() {
    return this._scopeId;
  }
  get itemId() {
    return this._itemId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraNavigationItemAriStaticOpts.qualifier,
      platformQualifier: jiraNavigationItemAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraNavigationItemAriStaticOpts.resourceOwner,
      resourceType: jiraNavigationItemAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.scopeType}/${opts.scopeId}/${opts.itemId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        scopeType: opts.scopeType,
        scopeId: opts.scopeId,
        itemId: opts.itemId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraNavigationItemAriStaticOpts);
    return new _JiraNavigationItemAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraNavigationItemAriStaticOpts);
    return new _JiraNavigationItemAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      scopeType: this.scopeType,
      scopeId: this.scopeId,
      itemId: this.itemId
    };
  }
};

// src/jira/issue-status/types.ts
var JiraIssueStatusAriResourceOwner = "jira", JiraIssueStatusAriResourceType = "issue-status";

// src/jira/issue-status/manifest.ts
var jiraIssueStatusAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueStatusAriResourceOwner,
  resourceType: JiraIssueStatusAriResourceType,
  resourceIdSlug: "activation/{activationId}/{issuestatusId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    issuestatusId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-status/index.ts
var JiraIssueStatusAri = class _JiraIssueStatusAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._issuestatusId = opts.resourceIdSegmentValues.issuestatusId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get issuestatusId() {
    return this._issuestatusId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueStatusAriStaticOpts.qualifier,
      platformQualifier: jiraIssueStatusAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueStatusAriStaticOpts.resourceOwner,
      resourceType: jiraIssueStatusAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.issuestatusId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        issuestatusId: opts.issuestatusId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueStatusAriStaticOpts);
    return new _JiraIssueStatusAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueStatusAriStaticOpts);
    return new _JiraIssueStatusAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      issuestatusId: this.issuestatusId
    };
  }
};

// src/jira/issue-type-scheme-mapping/types.ts
var JiraIssueTypeSchemeMappingAriResourceOwner = "jira", JiraIssueTypeSchemeMappingAriResourceType = "issue-type-scheme-mapping";

// src/jira/issue-type-scheme-mapping/manifest.ts
var jiraIssueTypeSchemeMappingAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueTypeSchemeMappingAriResourceOwner,
  resourceType: JiraIssueTypeSchemeMappingAriResourceType,
  resourceIdSlug: "activation/{activationId}/{issueTypeSchemeId}/{issueTypeId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    issueTypeSchemeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    issueTypeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-type-scheme-mapping/index.ts
var JiraIssueTypeSchemeMappingAri = class _JiraIssueTypeSchemeMappingAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._issueTypeSchemeId = opts.resourceIdSegmentValues.issueTypeSchemeId, this._issueTypeId = opts.resourceIdSegmentValues.issueTypeId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get issueTypeSchemeId() {
    return this._issueTypeSchemeId;
  }
  get issueTypeId() {
    return this._issueTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueTypeSchemeMappingAriStaticOpts.qualifier,
      platformQualifier: jiraIssueTypeSchemeMappingAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueTypeSchemeMappingAriStaticOpts.resourceOwner,
      resourceType: jiraIssueTypeSchemeMappingAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.issueTypeSchemeId}/${opts.issueTypeId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        issueTypeSchemeId: opts.issueTypeSchemeId,
        issueTypeId: opts.issueTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueTypeSchemeMappingAriStaticOpts);
    return new _JiraIssueTypeSchemeMappingAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueTypeSchemeMappingAriStaticOpts);
    return new _JiraIssueTypeSchemeMappingAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      issueTypeSchemeId: this.issueTypeSchemeId,
      issueTypeId: this.issueTypeId
    };
  }
};

// src/jira/issue-type-scheme/types.ts
var JiraIssueTypeSchemeAriResourceOwner = "jira", JiraIssueTypeSchemeAriResourceType = "issue-type-scheme";

// src/jira/issue-type-scheme/manifest.ts
var jiraIssueTypeSchemeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueTypeSchemeAriResourceOwner,
  resourceType: JiraIssueTypeSchemeAriResourceType,
  resourceIdSlug: "activation/{activationId}/{issueTypeSchemeId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    issueTypeSchemeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-type-scheme/index.ts
var JiraIssueTypeSchemeAri = class _JiraIssueTypeSchemeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._issueTypeSchemeId = opts.resourceIdSegmentValues.issueTypeSchemeId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get issueTypeSchemeId() {
    return this._issueTypeSchemeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueTypeSchemeAriStaticOpts.qualifier,
      platformQualifier: jiraIssueTypeSchemeAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueTypeSchemeAriStaticOpts.resourceOwner,
      resourceType: jiraIssueTypeSchemeAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.issueTypeSchemeId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        issueTypeSchemeId: opts.issueTypeSchemeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueTypeSchemeAriStaticOpts);
    return new _JiraIssueTypeSchemeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueTypeSchemeAriStaticOpts);
    return new _JiraIssueTypeSchemeAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      issueTypeSchemeId: this.issueTypeSchemeId
    };
  }
};

// src/jira/issue-type/types.ts
var JiraIssueTypeAriResourceOwner = "jira", JiraIssueTypeAriResourceType = "issue-type";

// src/jira/issue-type/manifest.ts
var jiraIssueTypeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueTypeAriResourceOwner,
  resourceType: JiraIssueTypeAriResourceType,
  resourceIdSlug: "{issueTypeId}",
  resourceIdSegmentFormats: {
    issueTypeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-type/index.ts
var JiraIssueTypeAri = class _JiraIssueTypeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._issueTypeId = opts.resourceIdSegmentValues.issueTypeId;
  }
  get siteId() {
    return this._siteId;
  }
  get issueTypeId() {
    return this._issueTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueTypeAriStaticOpts.qualifier,
      platformQualifier: jiraIssueTypeAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueTypeAriStaticOpts.resourceOwner,
      resourceType: jiraIssueTypeAriStaticOpts.resourceType,
      resourceId: `${opts.issueTypeId}`,
      resourceIdSegmentValues: {
        issueTypeId: opts.issueTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueTypeAriStaticOpts);
    return new _JiraIssueTypeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueTypeAriStaticOpts);
    return new _JiraIssueTypeAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      issueTypeId: this.issueTypeId
    };
  }
};

// src/jira/issue-link-type/types.ts
var JiraIssueLinkTypeAriResourceOwner = "jira", JiraIssueLinkTypeAriResourceType = "issue-link-type";

// src/jira/issue-link-type/manifest.ts
var jiraIssueLinkTypeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueLinkTypeAriResourceOwner,
  resourceType: JiraIssueLinkTypeAriResourceType,
  resourceIdSlug: "activation/{activationId}/{issueLinkTypeId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    issueLinkTypeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-link-type/index.ts
var JiraIssueLinkTypeAri = class _JiraIssueLinkTypeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._issueLinkTypeId = opts.resourceIdSegmentValues.issueLinkTypeId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get issueLinkTypeId() {
    return this._issueLinkTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueLinkTypeAriStaticOpts.qualifier,
      platformQualifier: jiraIssueLinkTypeAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueLinkTypeAriStaticOpts.resourceOwner,
      resourceType: jiraIssueLinkTypeAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.issueLinkTypeId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        issueLinkTypeId: opts.issueLinkTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueLinkTypeAriStaticOpts);
    return new _JiraIssueLinkTypeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueLinkTypeAriStaticOpts);
    return new _JiraIssueLinkTypeAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      issueLinkTypeId: this.issueLinkTypeId
    };
  }
};

// src/jira/issue-link/types.ts
var JiraIssueLinkAriResourceOwner = "jira", JiraIssueLinkAriResourceType = "issue-link";

// src/jira/issue-link/manifest.ts
var jiraIssueLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueLinkAriResourceOwner,
  resourceType: JiraIssueLinkAriResourceType,
  resourceIdSlug: "activation/{activationId}/{issueId}/{linkId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    issueId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    linkId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-link/index.ts
var JiraIssueLinkAri = class _JiraIssueLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._issueId = opts.resourceIdSegmentValues.issueId, this._linkId = opts.resourceIdSegmentValues.linkId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get issueId() {
    return this._issueId;
  }
  get linkId() {
    return this._linkId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueLinkAriStaticOpts.qualifier,
      platformQualifier: jiraIssueLinkAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueLinkAriStaticOpts.resourceOwner,
      resourceType: jiraIssueLinkAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.issueId}/${opts.linkId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        issueId: opts.issueId,
        linkId: opts.linkId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueLinkAriStaticOpts);
    return new _JiraIssueLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueLinkAriStaticOpts);
    return new _JiraIssueLinkAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      issueId: this.issueId,
      linkId: this.linkId
    };
  }
};

// src/jira/issue-remote-link/types.ts
var JiraIssueRemoteLinkAriResourceOwner = "jira", JiraIssueRemoteLinkAriResourceType = "issue-remote-link";

// src/jira/issue-remote-link/manifest.ts
var jiraIssueRemoteLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueRemoteLinkAriResourceOwner,
  resourceType: JiraIssueRemoteLinkAriResourceType,
  resourceIdSlug: "activation/{activationId}/{issueId}/{linkId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    issueId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    linkId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-remote-link/index.ts
var JiraIssueRemoteLinkAri = class _JiraIssueRemoteLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._issueId = opts.resourceIdSegmentValues.issueId, this._linkId = opts.resourceIdSegmentValues.linkId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get issueId() {
    return this._issueId;
  }
  get linkId() {
    return this._linkId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueRemoteLinkAriStaticOpts.qualifier,
      platformQualifier: jiraIssueRemoteLinkAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueRemoteLinkAriStaticOpts.resourceOwner,
      resourceType: jiraIssueRemoteLinkAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.issueId}/${opts.linkId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        issueId: opts.issueId,
        linkId: opts.linkId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueRemoteLinkAriStaticOpts);
    return new _JiraIssueRemoteLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueRemoteLinkAriStaticOpts);
    return new _JiraIssueRemoteLinkAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      issueId: this.issueId,
      linkId: this.linkId
    };
  }
};

// src/jira/issue-search-view/types.ts
var JiraIssueSearchViewAriResourceOwner = "jira", JiraIssueSearchViewAriResourceType = "issue-search-view";

// src/jira/issue-search-view/manifest.ts
var jiraIssueSearchViewAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueSearchViewAriResourceOwner,
  resourceType: JiraIssueSearchViewAriResourceType,
  resourceIdSlug: "activation/{activationId}/{namespaceId}/{viewId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    namespaceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    viewId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-search-view/index.ts
var JiraIssueSearchViewAri = class _JiraIssueSearchViewAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._namespaceId = opts.resourceIdSegmentValues.namespaceId, this._viewId = opts.resourceIdSegmentValues.viewId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get namespaceId() {
    return this._namespaceId;
  }
  get viewId() {
    return this._viewId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueSearchViewAriStaticOpts.qualifier,
      platformQualifier: jiraIssueSearchViewAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueSearchViewAriStaticOpts.resourceOwner,
      resourceType: jiraIssueSearchViewAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.namespaceId}/${opts.viewId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        namespaceId: opts.namespaceId,
        viewId: opts.viewId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueSearchViewAriStaticOpts);
    return new _JiraIssueSearchViewAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueSearchViewAriStaticOpts);
    return new _JiraIssueSearchViewAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      namespaceId: this.namespaceId,
      viewId: this.viewId
    };
  }
};

// src/jira/issue-comment/types.ts
var JiraIssueCommentAriResourceOwner = "jira", JiraIssueCommentAriResourceType = "issue-comment";

// src/jira/issue-comment/manifest.ts
var jiraIssueCommentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueCommentAriResourceOwner,
  resourceType: JiraIssueCommentAriResourceType,
  resourceIdSlug: "{issueId}/{commentId}",
  resourceIdSegmentFormats: {
    issueId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    commentId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-comment/index.ts
var JiraIssueCommentAri = class _JiraIssueCommentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._issueId = opts.resourceIdSegmentValues.issueId, this._commentId = opts.resourceIdSegmentValues.commentId;
  }
  get siteId() {
    return this._siteId;
  }
  get issueId() {
    return this._issueId;
  }
  get commentId() {
    return this._commentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueCommentAriStaticOpts.qualifier,
      platformQualifier: jiraIssueCommentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueCommentAriStaticOpts.resourceOwner,
      resourceType: jiraIssueCommentAriStaticOpts.resourceType,
      resourceId: `${opts.issueId}/${opts.commentId}`,
      resourceIdSegmentValues: {
        issueId: opts.issueId,
        commentId: opts.commentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueCommentAriStaticOpts);
    return new _JiraIssueCommentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueCommentAriStaticOpts);
    return new _JiraIssueCommentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      issueId: this.issueId,
      commentId: this.commentId
    };
  }
};

// src/jira/issue-field-metadata/types.ts
var JiraIssueFieldMetadataAriResourceOwner = "jira", JiraIssueFieldMetadataAriResourceType = "issue-field-metadata";

// src/jira/issue-field-metadata/manifest.ts
var jiraIssueFieldMetadataAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueFieldMetadataAriResourceOwner,
  resourceType: JiraIssueFieldMetadataAriResourceType,
  resourceIdSlug: "activation/{activationId}/{fieldId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    fieldId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-field-metadata/index.ts
var JiraIssueFieldMetadataAri = class _JiraIssueFieldMetadataAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._fieldId = opts.resourceIdSegmentValues.fieldId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get fieldId() {
    return this._fieldId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueFieldMetadataAriStaticOpts.qualifier,
      platformQualifier: jiraIssueFieldMetadataAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueFieldMetadataAriStaticOpts.resourceOwner,
      resourceType: jiraIssueFieldMetadataAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.fieldId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        fieldId: opts.fieldId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueFieldMetadataAriStaticOpts);
    return new _JiraIssueFieldMetadataAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueFieldMetadataAriStaticOpts);
    return new _JiraIssueFieldMetadataAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      fieldId: this.fieldId
    };
  }
};

// src/jira/issue-field-option/types.ts
var JiraIssueFieldOptionAriResourceOwner = "jira", JiraIssueFieldOptionAriResourceType = "issue-field-option";

// src/jira/issue-field-option/manifest.ts
var jiraIssueFieldOptionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueFieldOptionAriResourceOwner,
  resourceType: JiraIssueFieldOptionAriResourceType,
  resourceIdSlug: "activation/{activationId}/{fieldId}/{optionId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    fieldId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    optionId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-field-option/index.ts
var JiraIssueFieldOptionAri = class _JiraIssueFieldOptionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._fieldId = opts.resourceIdSegmentValues.fieldId, this._optionId = opts.resourceIdSegmentValues.optionId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get fieldId() {
    return this._fieldId;
  }
  get optionId() {
    return this._optionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueFieldOptionAriStaticOpts.qualifier,
      platformQualifier: jiraIssueFieldOptionAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueFieldOptionAriStaticOpts.resourceOwner,
      resourceType: jiraIssueFieldOptionAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.fieldId}/${opts.optionId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        fieldId: opts.fieldId,
        optionId: opts.optionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueFieldOptionAriStaticOpts);
    return new _JiraIssueFieldOptionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueFieldOptionAriStaticOpts);
    return new _JiraIssueFieldOptionAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      fieldId: this.fieldId,
      optionId: this.optionId
    };
  }
};

// src/jira/issue-history/types.ts
var JiraIssueHistoryAriResourceOwner = "jira", JiraIssueHistoryAriResourceType = "issue-history";

// src/jira/issue-history/manifest.ts
var jiraIssueHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueHistoryAriResourceOwner,
  resourceType: JiraIssueHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{issueId}/{changeGroupId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    issueId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    changeGroupId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-history/index.ts
var JiraIssueHistoryAri = class _JiraIssueHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._issueId = opts.resourceIdSegmentValues.issueId, this._changeGroupId = opts.resourceIdSegmentValues.changeGroupId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get issueId() {
    return this._issueId;
  }
  get changeGroupId() {
    return this._changeGroupId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraIssueHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraIssueHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.issueId}/${opts.changeGroupId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        issueId: opts.issueId,
        changeGroupId: opts.changeGroupId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueHistoryAriStaticOpts);
    return new _JiraIssueHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueHistoryAriStaticOpts);
    return new _JiraIssueHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      issueId: this.issueId,
      changeGroupId: this.changeGroupId
    };
  }
};

// src/jira/filter/types.ts
var JiraFilterAriResourceOwner = "jira", JiraFilterAriResourceType = "filter";

// src/jira/filter/manifest.ts
var jiraFilterAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraFilterAriResourceOwner,
  resourceType: JiraFilterAriResourceType,
  resourceIdSlug: "activation/{activationId}/{filterId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    filterId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/filter/index.ts
var JiraFilterAri = class _JiraFilterAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._filterId = opts.resourceIdSegmentValues.filterId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get filterId() {
    return this._filterId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraFilterAriStaticOpts.qualifier,
      platformQualifier: jiraFilterAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraFilterAriStaticOpts.resourceOwner,
      resourceType: jiraFilterAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.filterId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        filterId: opts.filterId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraFilterAriStaticOpts);
    return new _JiraFilterAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraFilterAriStaticOpts);
    return new _JiraFilterAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      filterId: this.filterId
    };
  }
};

// src/jira/incident-history/types.ts
var JiraIncidentHistoryAriResourceOwner = "jira", JiraIncidentHistoryAriResourceType = "incident-history";

// src/jira/incident-history/manifest.ts
var jiraIncidentHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIncidentHistoryAriResourceOwner,
  resourceType: JiraIncidentHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{incidentId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    incidentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/incident-history/index.ts
var JiraIncidentHistoryAri = class _JiraIncidentHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._incidentId = opts.resourceIdSegmentValues.incidentId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get incidentId() {
    return this._incidentId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIncidentHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraIncidentHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIncidentHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraIncidentHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.incidentId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        incidentId: opts.incidentId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIncidentHistoryAriStaticOpts);
    return new _JiraIncidentHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIncidentHistoryAriStaticOpts);
    return new _JiraIncidentHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      incidentId: this.incidentId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/incident/types.ts
var JiraIncidentAriResourceOwner = "jira", JiraIncidentAriResourceType = "incident";

// src/jira/incident/manifest.ts
var jiraIncidentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIncidentAriResourceOwner,
  resourceType: JiraIncidentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{incidentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    incidentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/incident/index.ts
var JiraIncidentAri = class _JiraIncidentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._incidentId = opts.resourceIdSegmentValues.incidentId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get incidentId() {
    return this._incidentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIncidentAriStaticOpts.qualifier,
      platformQualifier: jiraIncidentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIncidentAriStaticOpts.resourceOwner,
      resourceType: jiraIncidentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.incidentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        incidentId: opts.incidentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIncidentAriStaticOpts);
    return new _JiraIncidentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIncidentAriStaticOpts);
    return new _JiraIncidentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      incidentId: this.incidentId
    };
  }
};

// src/jira/issue-attachment/types.ts
var JiraIssueAttachmentAriResourceOwner = "jira", JiraIssueAttachmentAriResourceType = "issue-attachment";

// src/jira/issue-attachment/manifest.ts
var jiraIssueAttachmentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraIssueAttachmentAriResourceOwner,
  resourceType: JiraIssueAttachmentAriResourceType,
  resourceIdSlug: "{issueId}/{attachmentId}",
  resourceIdSegmentFormats: {
    issueId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    attachmentId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/issue-attachment/index.ts
var JiraIssueAttachmentAri = class _JiraIssueAttachmentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._issueId = opts.resourceIdSegmentValues.issueId, this._attachmentId = opts.resourceIdSegmentValues.attachmentId;
  }
  get siteId() {
    return this._siteId;
  }
  get issueId() {
    return this._issueId;
  }
  get attachmentId() {
    return this._attachmentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraIssueAttachmentAriStaticOpts.qualifier,
      platformQualifier: jiraIssueAttachmentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraIssueAttachmentAriStaticOpts.resourceOwner,
      resourceType: jiraIssueAttachmentAriStaticOpts.resourceType,
      resourceId: `${opts.issueId}/${opts.attachmentId}`,
      resourceIdSegmentValues: {
        issueId: opts.issueId,
        attachmentId: opts.attachmentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraIssueAttachmentAriStaticOpts);
    return new _JiraIssueAttachmentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraIssueAttachmentAriStaticOpts);
    return new _JiraIssueAttachmentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      issueId: this.issueId,
      attachmentId: this.attachmentId
    };
  }
};

// src/jira/favourite/types.ts
var JiraFavouriteAriResourceOwner = "jira", JiraFavouriteAriResourceType = "favourite";

// src/jira/favourite/manifest.ts
var jiraFavouriteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraFavouriteAriResourceOwner,
  resourceType: JiraFavouriteAriResourceType,
  resourceIdSlug: "activation/{activationId}/{favouriteId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    favouriteId: /[a-zA-Z0-9_\|\-\:~]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/favourite/index.ts
var JiraFavouriteAri = class _JiraFavouriteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._favouriteId = opts.resourceIdSegmentValues.favouriteId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get favouriteId() {
    return this._favouriteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraFavouriteAriStaticOpts.qualifier,
      platformQualifier: jiraFavouriteAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraFavouriteAriStaticOpts.resourceOwner,
      resourceType: jiraFavouriteAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.favouriteId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        favouriteId: opts.favouriteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraFavouriteAriStaticOpts);
    return new _JiraFavouriteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraFavouriteAriStaticOpts);
    return new _JiraFavouriteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      favouriteId: this.favouriteId
    };
  }
};

// src/jira/feature-flag-history/types.ts
var JiraFeatureFlagHistoryAriResourceOwner = "jira", JiraFeatureFlagHistoryAriResourceType = "feature-flag-history";

// src/jira/feature-flag-history/manifest.ts
var jiraFeatureFlagHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraFeatureFlagHistoryAriResourceOwner,
  resourceType: JiraFeatureFlagHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{featureFlagId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    featureFlagId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/feature-flag-history/index.ts
var JiraFeatureFlagHistoryAri = class _JiraFeatureFlagHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._featureFlagId = opts.resourceIdSegmentValues.featureFlagId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get featureFlagId() {
    return this._featureFlagId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraFeatureFlagHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraFeatureFlagHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraFeatureFlagHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraFeatureFlagHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.featureFlagId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        featureFlagId: opts.featureFlagId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraFeatureFlagHistoryAriStaticOpts);
    return new _JiraFeatureFlagHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraFeatureFlagHistoryAriStaticOpts);
    return new _JiraFeatureFlagHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      featureFlagId: this.featureFlagId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/feature-flag/types.ts
var JiraFeatureFlagAriResourceOwner = "jira", JiraFeatureFlagAriResourceType = "feature-flag";

// src/jira/feature-flag/manifest.ts
var jiraFeatureFlagAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraFeatureFlagAriResourceOwner,
  resourceType: JiraFeatureFlagAriResourceType,
  resourceIdSlug: "activation/{activationId}/{featureFlagId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    featureFlagId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/feature-flag/index.ts
var JiraFeatureFlagAri = class _JiraFeatureFlagAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._featureFlagId = opts.resourceIdSegmentValues.featureFlagId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get featureFlagId() {
    return this._featureFlagId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraFeatureFlagAriStaticOpts.qualifier,
      platformQualifier: jiraFeatureFlagAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraFeatureFlagAriStaticOpts.resourceOwner,
      resourceType: jiraFeatureFlagAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.featureFlagId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        featureFlagId: opts.featureFlagId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraFeatureFlagAriStaticOpts);
    return new _JiraFeatureFlagAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraFeatureFlagAriStaticOpts);
    return new _JiraFeatureFlagAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      featureFlagId: this.featureFlagId
    };
  }
};

// src/jira/filter-email-subscription/types.ts
var JiraFilterEmailSubscriptionAriResourceOwner = "jira", JiraFilterEmailSubscriptionAriResourceType = "filter-email-subscription";

// src/jira/filter-email-subscription/manifest.ts
var jiraFilterEmailSubscriptionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraFilterEmailSubscriptionAriResourceOwner,
  resourceType: JiraFilterEmailSubscriptionAriResourceType,
  resourceIdSlug: "activation/{activationId}/{filterEmailSubscriptionId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    filterEmailSubscriptionId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/filter-email-subscription/index.ts
var JiraFilterEmailSubscriptionAri = class _JiraFilterEmailSubscriptionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._filterEmailSubscriptionId = opts.resourceIdSegmentValues.filterEmailSubscriptionId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get filterEmailSubscriptionId() {
    return this._filterEmailSubscriptionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraFilterEmailSubscriptionAriStaticOpts.qualifier,
      platformQualifier: jiraFilterEmailSubscriptionAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraFilterEmailSubscriptionAriStaticOpts.resourceOwner,
      resourceType: jiraFilterEmailSubscriptionAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.filterEmailSubscriptionId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        filterEmailSubscriptionId: opts.filterEmailSubscriptionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraFilterEmailSubscriptionAriStaticOpts);
    return new _JiraFilterEmailSubscriptionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraFilterEmailSubscriptionAriStaticOpts);
    return new _JiraFilterEmailSubscriptionAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      filterEmailSubscriptionId: this.filterEmailSubscriptionId
    };
  }
};

// src/jira/devops-component/types.ts
var JiraDevopsComponentAriResourceOwner = "jira", JiraDevopsComponentAriResourceType = "devops-component";

// src/jira/devops-component/manifest.ts
var jiraDevopsComponentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraDevopsComponentAriResourceOwner,
  resourceType: JiraDevopsComponentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{devopsComponentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    devopsComponentId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/devops-component/index.ts
var JiraDevopsComponentAri = class _JiraDevopsComponentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._devopsComponentId = opts.resourceIdSegmentValues.devopsComponentId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get devopsComponentId() {
    return this._devopsComponentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraDevopsComponentAriStaticOpts.qualifier,
      platformQualifier: jiraDevopsComponentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraDevopsComponentAriStaticOpts.resourceOwner,
      resourceType: jiraDevopsComponentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.devopsComponentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        devopsComponentId: opts.devopsComponentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraDevopsComponentAriStaticOpts);
    return new _JiraDevopsComponentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraDevopsComponentAriStaticOpts);
    return new _JiraDevopsComponentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      devopsComponentId: this.devopsComponentId
    };
  }
};

// src/jira/document-history/types.ts
var JiraDocumentHistoryAriResourceOwner = "jira", JiraDocumentHistoryAriResourceType = "document-history";

// src/jira/document-history/manifest.ts
var jiraDocumentHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraDocumentHistoryAriResourceOwner,
  resourceType: JiraDocumentHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{documentId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    documentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/document-history/index.ts
var JiraDocumentHistoryAri = class _JiraDocumentHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._documentId = opts.resourceIdSegmentValues.documentId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get documentId() {
    return this._documentId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraDocumentHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraDocumentHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraDocumentHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraDocumentHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.documentId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        documentId: opts.documentId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraDocumentHistoryAriStaticOpts);
    return new _JiraDocumentHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraDocumentHistoryAriStaticOpts);
    return new _JiraDocumentHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      documentId: this.documentId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/document/types.ts
var JiraDocumentAriResourceOwner = "jira", JiraDocumentAriResourceType = "document";

// src/jira/document/manifest.ts
var jiraDocumentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraDocumentAriResourceOwner,
  resourceType: JiraDocumentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{documentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    documentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/document/index.ts
var JiraDocumentAri = class _JiraDocumentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._documentId = opts.resourceIdSegmentValues.documentId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get documentId() {
    return this._documentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraDocumentAriStaticOpts.qualifier,
      platformQualifier: jiraDocumentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraDocumentAriStaticOpts.resourceOwner,
      resourceType: jiraDocumentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.documentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        documentId: opts.documentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraDocumentAriStaticOpts);
    return new _JiraDocumentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraDocumentAriStaticOpts);
    return new _JiraDocumentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      documentId: this.documentId
    };
  }
};

// src/jira/entity-property/types.ts
var JiraEntityPropertyAriResourceOwner = "jira", JiraEntityPropertyAriResourceType = "entity-property";

// src/jira/entity-property/manifest.ts
var jiraEntityPropertyAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraEntityPropertyAriResourceOwner,
  resourceType: JiraEntityPropertyAriResourceType,
  resourceIdSlug: "activation/{activationId}/{entityType}/{entityId}/{propertyKey}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    entityType: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    entityId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    propertyKey: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/entity-property/index.ts
var JiraEntityPropertyAri = class _JiraEntityPropertyAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._entityType = opts.resourceIdSegmentValues.entityType, this._entityId = opts.resourceIdSegmentValues.entityId, this._propertyKey = opts.resourceIdSegmentValues.propertyKey;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get entityType() {
    return this._entityType;
  }
  get entityId() {
    return this._entityId;
  }
  get propertyKey() {
    return this._propertyKey;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraEntityPropertyAriStaticOpts.qualifier,
      platformQualifier: jiraEntityPropertyAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraEntityPropertyAriStaticOpts.resourceOwner,
      resourceType: jiraEntityPropertyAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.entityType}/${opts.entityId}/${opts.propertyKey}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        entityType: opts.entityType,
        entityId: opts.entityId,
        propertyKey: opts.propertyKey
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraEntityPropertyAriStaticOpts);
    return new _JiraEntityPropertyAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraEntityPropertyAriStaticOpts);
    return new _JiraEntityPropertyAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      entityType: this.entityType,
      entityId: this.entityId,
      propertyKey: this.propertyKey
    };
  }
};

// src/jira/deployment-history/types.ts
var JiraDeploymentHistoryAriResourceOwner = "jira", JiraDeploymentHistoryAriResourceType = "deployment-history";

// src/jira/deployment-history/manifest.ts
var jiraDeploymentHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraDeploymentHistoryAriResourceOwner,
  resourceType: JiraDeploymentHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{deploymentId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    deploymentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/deployment-history/index.ts
var JiraDeploymentHistoryAri = class _JiraDeploymentHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._deploymentId = opts.resourceIdSegmentValues.deploymentId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get deploymentId() {
    return this._deploymentId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraDeploymentHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraDeploymentHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraDeploymentHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraDeploymentHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.deploymentId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        deploymentId: opts.deploymentId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraDeploymentHistoryAriStaticOpts);
    return new _JiraDeploymentHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraDeploymentHistoryAriStaticOpts);
    return new _JiraDeploymentHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      deploymentId: this.deploymentId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/deployment/types.ts
var JiraDeploymentAriResourceOwner = "jira", JiraDeploymentAriResourceType = "deployment";

// src/jira/deployment/manifest.ts
var jiraDeploymentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraDeploymentAriResourceOwner,
  resourceType: JiraDeploymentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{deploymentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    deploymentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/deployment/index.ts
var JiraDeploymentAri = class _JiraDeploymentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._deploymentId = opts.resourceIdSegmentValues.deploymentId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get deploymentId() {
    return this._deploymentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraDeploymentAriStaticOpts.qualifier,
      platformQualifier: jiraDeploymentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraDeploymentAriStaticOpts.resourceOwner,
      resourceType: jiraDeploymentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.deploymentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        deploymentId: opts.deploymentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraDeploymentAriStaticOpts);
    return new _JiraDeploymentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraDeploymentAriStaticOpts);
    return new _JiraDeploymentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      deploymentId: this.deploymentId
    };
  }
};

// src/jira/design-history/types.ts
var JiraDesignHistoryAriResourceOwner = "jira", JiraDesignHistoryAriResourceType = "design-history";

// src/jira/design-history/manifest.ts
var jiraDesignHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraDesignHistoryAriResourceOwner,
  resourceType: JiraDesignHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{designId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    designId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/design-history/index.ts
var JiraDesignHistoryAri = class _JiraDesignHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._designId = opts.resourceIdSegmentValues.designId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get designId() {
    return this._designId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraDesignHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraDesignHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraDesignHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraDesignHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.designId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        designId: opts.designId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraDesignHistoryAriStaticOpts);
    return new _JiraDesignHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraDesignHistoryAriStaticOpts);
    return new _JiraDesignHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      designId: this.designId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/design/types.ts
var JiraDesignAriResourceOwner = "jira", JiraDesignAriResourceType = "design";

// src/jira/design/manifest.ts
var jiraDesignAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraDesignAriResourceOwner,
  resourceType: JiraDesignAriResourceType,
  resourceIdSlug: "activation/{activationId}/{designId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    designId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/design/index.ts
var JiraDesignAri = class _JiraDesignAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._designId = opts.resourceIdSegmentValues.designId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get designId() {
    return this._designId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraDesignAriStaticOpts.qualifier,
      platformQualifier: jiraDesignAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraDesignAriStaticOpts.resourceOwner,
      resourceType: jiraDesignAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.designId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        designId: opts.designId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraDesignAriStaticOpts);
    return new _JiraDesignAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraDesignAriStaticOpts);
    return new _JiraDesignAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      designId: this.designId
    };
  }
};

// src/jira/commit/types.ts
var JiraCommitAriResourceOwner = "jira", JiraCommitAriResourceType = "commit";

// src/jira/commit/manifest.ts
var jiraCommitAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraCommitAriResourceOwner,
  resourceType: JiraCommitAriResourceType,
  resourceIdSlug: "activation/{activationId}/{commitId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    commitId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/commit/index.ts
var JiraCommitAri = class _JiraCommitAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._commitId = opts.resourceIdSegmentValues.commitId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get commitId() {
    return this._commitId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraCommitAriStaticOpts.qualifier,
      platformQualifier: jiraCommitAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraCommitAriStaticOpts.resourceOwner,
      resourceType: jiraCommitAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.commitId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        commitId: opts.commitId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraCommitAriStaticOpts);
    return new _JiraCommitAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraCommitAriStaticOpts);
    return new _JiraCommitAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      commitId: this.commitId
    };
  }
};

// src/jira/component/types.ts
var JiraComponentAriResourceOwner = "jira", JiraComponentAriResourceType = "component";

// src/jira/component/manifest.ts
var jiraComponentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraComponentAriResourceOwner,
  resourceType: JiraComponentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{componentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    componentId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/component/index.ts
var JiraComponentAri = class _JiraComponentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._componentId = opts.resourceIdSegmentValues.componentId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get componentId() {
    return this._componentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraComponentAriStaticOpts.qualifier,
      platformQualifier: jiraComponentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraComponentAriStaticOpts.resourceOwner,
      resourceType: jiraComponentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.componentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        componentId: opts.componentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraComponentAriStaticOpts);
    return new _JiraComponentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraComponentAriStaticOpts);
    return new _JiraComponentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      componentId: this.componentId
    };
  }
};

// src/jira/connect-app/types.ts
var JiraConnectAppAriResourceOwner = "jira", JiraConnectAppAriResourceType = "connect-app";

// src/jira/connect-app/manifest.ts
var jiraConnectAppAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraConnectAppAriResourceOwner,
  resourceType: JiraConnectAppAriResourceType,
  resourceIdSlug: "activation/{activationId}/{appKey}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    appKey: /[a-zA-Z0-9-._]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/connect-app/index.ts
var JiraConnectAppAri = class _JiraConnectAppAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._appKey = opts.resourceIdSegmentValues.appKey;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get appKey() {
    return this._appKey;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraConnectAppAriStaticOpts.qualifier,
      platformQualifier: jiraConnectAppAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraConnectAppAriStaticOpts.resourceOwner,
      resourceType: jiraConnectAppAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.appKey}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        appKey: opts.appKey
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraConnectAppAriStaticOpts);
    return new _JiraConnectAppAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraConnectAppAriStaticOpts);
    return new _JiraConnectAppAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      appKey: this.appKey
    };
  }
};

// src/jira/dashboard/types.ts
var JiraDashboardAriResourceOwner = "jira", JiraDashboardAriResourceType = "dashboard";

// src/jira/dashboard/manifest.ts
var jiraDashboardAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraDashboardAriResourceOwner,
  resourceType: JiraDashboardAriResourceType,
  resourceIdSlug: "activation/{activationId}/{dashboardId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    dashboardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/dashboard/index.ts
var JiraDashboardAri = class _JiraDashboardAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._dashboardId = opts.resourceIdSegmentValues.dashboardId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get dashboardId() {
    return this._dashboardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraDashboardAriStaticOpts.qualifier,
      platformQualifier: jiraDashboardAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraDashboardAriStaticOpts.resourceOwner,
      resourceType: jiraDashboardAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.dashboardId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        dashboardId: opts.dashboardId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraDashboardAriStaticOpts);
    return new _JiraDashboardAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraDashboardAriStaticOpts);
    return new _JiraDashboardAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      dashboardId: this.dashboardId
    };
  }
};

// src/jira/build-history/types.ts
var JiraBuildHistoryAriResourceOwner = "jira", JiraBuildHistoryAriResourceType = "build-history";

// src/jira/build-history/manifest.ts
var jiraBuildHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraBuildHistoryAriResourceOwner,
  resourceType: JiraBuildHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{buildId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    buildId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/build-history/index.ts
var JiraBuildHistoryAri = class _JiraBuildHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._buildId = opts.resourceIdSegmentValues.buildId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get buildId() {
    return this._buildId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraBuildHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraBuildHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraBuildHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraBuildHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.buildId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        buildId: opts.buildId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraBuildHistoryAriStaticOpts);
    return new _JiraBuildHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraBuildHistoryAriStaticOpts);
    return new _JiraBuildHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      buildId: this.buildId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/build/types.ts
var JiraBuildAriResourceOwner = "jira", JiraBuildAriResourceType = "build";

// src/jira/build/manifest.ts
var jiraBuildAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraBuildAriResourceOwner,
  resourceType: JiraBuildAriResourceType,
  resourceIdSlug: "activation/{activationId}/{buildId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    buildId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/build/index.ts
var JiraBuildAri = class _JiraBuildAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._buildId = opts.resourceIdSegmentValues.buildId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get buildId() {
    return this._buildId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraBuildAriStaticOpts.qualifier,
      platformQualifier: jiraBuildAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraBuildAriStaticOpts.resourceOwner,
      resourceType: jiraBuildAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.buildId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        buildId: opts.buildId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraBuildAriStaticOpts);
    return new _JiraBuildAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraBuildAriStaticOpts);
    return new _JiraBuildAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      buildId: this.buildId
    };
  }
};

// src/jira/bulk-operation-task/types.ts
var JiraBulkOperationTaskAriResourceOwner = "jira", JiraBulkOperationTaskAriResourceType = "bulk-operation-task";

// src/jira/bulk-operation-task/manifest.ts
var jiraBulkOperationTaskAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraBulkOperationTaskAriResourceOwner,
  resourceType: JiraBulkOperationTaskAriResourceType,
  resourceIdSlug: "activation/{activationId}/{taskId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    taskId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/bulk-operation-task/index.ts
var JiraBulkOperationTaskAri = class _JiraBulkOperationTaskAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._taskId = opts.resourceIdSegmentValues.taskId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get taskId() {
    return this._taskId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraBulkOperationTaskAriStaticOpts.qualifier,
      platformQualifier: jiraBulkOperationTaskAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraBulkOperationTaskAriStaticOpts.resourceOwner,
      resourceType: jiraBulkOperationTaskAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.taskId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        taskId: opts.taskId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraBulkOperationTaskAriStaticOpts);
    return new _JiraBulkOperationTaskAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraBulkOperationTaskAriStaticOpts);
    return new _JiraBulkOperationTaskAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      taskId: this.taskId
    };
  }
};

// src/jira/comment/types.ts
var JiraCommentAriResourceOwner = "jira", JiraCommentAriResourceType = "comment";

// src/jira/comment/manifest.ts
var jiraCommentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraCommentAriResourceOwner,
  resourceType: JiraCommentAriResourceType,
  resourceIdSlug: "{commentId}",
  resourceIdSegmentFormats: {
    commentId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/comment/index.ts
var JiraCommentAri = class _JiraCommentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._commentId = opts.resourceIdSegmentValues.commentId;
  }
  get siteId() {
    return this._siteId;
  }
  get commentId() {
    return this._commentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraCommentAriStaticOpts.qualifier,
      platformQualifier: jiraCommentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraCommentAriStaticOpts.resourceOwner,
      resourceType: jiraCommentAriStaticOpts.resourceType,
      resourceId: `${opts.commentId}`,
      resourceIdSegmentValues: {
        commentId: opts.commentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraCommentAriStaticOpts);
    return new _JiraCommentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraCommentAriStaticOpts);
    return new _JiraCommentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      commentId: this.commentId
    };
  }
};

// src/jira/announcement-banner/types.ts
var JiraAnnouncementBannerAriResourceOwner = "jira", JiraAnnouncementBannerAriResourceType = "announcement-banner";

// src/jira/announcement-banner/manifest.ts
var jiraAnnouncementBannerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraAnnouncementBannerAriResourceOwner,
  resourceType: JiraAnnouncementBannerAriResourceType,
  resourceIdSlug: "activation/{activationId}/{announcementBannerHashId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    announcementBannerHashId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/announcement-banner/index.ts
var JiraAnnouncementBannerAri = class _JiraAnnouncementBannerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._announcementBannerHashId = opts.resourceIdSegmentValues.announcementBannerHashId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get announcementBannerHashId() {
    return this._announcementBannerHashId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraAnnouncementBannerAriStaticOpts.qualifier,
      platformQualifier: jiraAnnouncementBannerAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraAnnouncementBannerAriStaticOpts.resourceOwner,
      resourceType: jiraAnnouncementBannerAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.announcementBannerHashId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        announcementBannerHashId: opts.announcementBannerHashId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraAnnouncementBannerAriStaticOpts);
    return new _JiraAnnouncementBannerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraAnnouncementBannerAriStaticOpts);
    return new _JiraAnnouncementBannerAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      announcementBannerHashId: this.announcementBannerHashId
    };
  }
};

// src/jira/available-fields/types.ts
var JiraAvailableFieldsAriResourceOwner = "jira", JiraAvailableFieldsAriResourceType = "available-fields";

// src/jira/available-fields/manifest.ts
var jiraAvailableFieldsAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraAvailableFieldsAriResourceOwner,
  resourceType: JiraAvailableFieldsAriResourceType,
  resourceIdSlug: "activation/{activationId}/{projectId}/{issueTypeId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    projectId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    issueTypeId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/available-fields/index.ts
var JiraAvailableFieldsAri = class _JiraAvailableFieldsAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._projectId = opts.resourceIdSegmentValues.projectId, this._issueTypeId = opts.resourceIdSegmentValues.issueTypeId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get projectId() {
    return this._projectId;
  }
  get issueTypeId() {
    return this._issueTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraAvailableFieldsAriStaticOpts.qualifier,
      platformQualifier: jiraAvailableFieldsAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraAvailableFieldsAriStaticOpts.resourceOwner,
      resourceType: jiraAvailableFieldsAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.projectId}/${opts.issueTypeId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        projectId: opts.projectId,
        issueTypeId: opts.issueTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraAvailableFieldsAriStaticOpts);
    return new _JiraAvailableFieldsAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraAvailableFieldsAriStaticOpts);
    return new _JiraAvailableFieldsAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      projectId: this.projectId,
      issueTypeId: this.issueTypeId
    };
  }
};

// src/jira/branch-history/types.ts
var JiraBranchHistoryAriResourceOwner = "jira", JiraBranchHistoryAriResourceType = "branch-history";

// src/jira/branch-history/manifest.ts
var jiraBranchHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraBranchHistoryAriResourceOwner,
  resourceType: JiraBranchHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{branchId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    branchId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/branch-history/index.ts
var JiraBranchHistoryAri = class _JiraBranchHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._branchId = opts.resourceIdSegmentValues.branchId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get branchId() {
    return this._branchId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraBranchHistoryAriStaticOpts.qualifier,
      platformQualifier: jiraBranchHistoryAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraBranchHistoryAriStaticOpts.resourceOwner,
      resourceType: jiraBranchHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.branchId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        branchId: opts.branchId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraBranchHistoryAriStaticOpts);
    return new _JiraBranchHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraBranchHistoryAriStaticOpts);
    return new _JiraBranchHistoryAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      branchId: this.branchId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/jira/branch/types.ts
var JiraBranchAriResourceOwner = "jira", JiraBranchAriResourceType = "branch";

// src/jira/branch/manifest.ts
var jiraBranchAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraBranchAriResourceOwner,
  resourceType: JiraBranchAriResourceType,
  resourceIdSlug: "activation/{activationId}/{branchId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    branchId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira/branch/index.ts
var JiraBranchAri = class _JiraBranchAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._branchId = opts.resourceIdSegmentValues.branchId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get branchId() {
    return this._branchId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraBranchAriStaticOpts.qualifier,
      platformQualifier: jiraBranchAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraBranchAriStaticOpts.resourceOwner,
      resourceType: jiraBranchAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.branchId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        branchId: opts.branchId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraBranchAriStaticOpts);
    return new _JiraBranchAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraBranchAriStaticOpts);
    return new _JiraBranchAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      branchId: this.branchId
    };
  }
};

// src/jira-software/site/types.ts
var JiraSoftwareSiteAriResourceOwner = "jira-software", JiraSoftwareSiteAriResourceType = "site";

// src/jira-software/site/manifest.ts
var jiraSoftwareSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraSoftwareSiteAriResourceOwner,
  resourceType: JiraSoftwareSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/site/index.ts
var JiraSoftwareSiteAri = class _JiraSoftwareSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareSiteAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraSoftwareSiteAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareSiteAriStaticOpts);
    return new _JiraSoftwareSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareSiteAriStaticOpts);
    return new _JiraSoftwareSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/jira-software/swimlane/types.ts
var JiraSoftwareSwimlaneAriResourceOwner = "jira-software", JiraSoftwareSwimlaneAriResourceType = "swimlane";

// src/jira-software/swimlane/manifest.ts
var jiraSoftwareSwimlaneAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareSwimlaneAriResourceOwner,
  resourceType: JiraSoftwareSwimlaneAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/{swimlaneId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    swimlaneId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/swimlane/index.ts
var JiraSoftwareSwimlaneAri = class _JiraSoftwareSwimlaneAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._swimlaneId = opts.resourceIdSegmentValues.swimlaneId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get swimlaneId() {
    return this._swimlaneId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareSwimlaneAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareSwimlaneAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareSwimlaneAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareSwimlaneAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/${opts.swimlaneId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        swimlaneId: opts.swimlaneId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareSwimlaneAriStaticOpts);
    return new _JiraSoftwareSwimlaneAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareSwimlaneAriStaticOpts);
    return new _JiraSoftwareSwimlaneAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      swimlaneId: this.swimlaneId
    };
  }
};

// src/jira-software/user-board-config/types.ts
var JiraSoftwareUserBoardConfigAriResourceOwner = "jira-software", JiraSoftwareUserBoardConfigAriResourceType = "user-board-config";

// src/jira-software/user-board-config/manifest.ts
var jiraSoftwareUserBoardConfigAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareUserBoardConfigAriResourceOwner,
  resourceType: JiraSoftwareUserBoardConfigAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/user-board-config/index.ts
var JiraSoftwareUserBoardConfigAri = class _JiraSoftwareUserBoardConfigAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareUserBoardConfigAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareUserBoardConfigAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareUserBoardConfigAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareUserBoardConfigAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareUserBoardConfigAriStaticOpts);
    return new _JiraSoftwareUserBoardConfigAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareUserBoardConfigAriStaticOpts);
    return new _JiraSoftwareUserBoardConfigAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId
    };
  }
};

// src/jira-software/view-config/types.ts
var JiraSoftwareViewConfigAriResourceOwner = "jira-software", JiraSoftwareViewConfigAriResourceType = "view-config";

// src/jira-software/view-config/manifest.ts
var jiraSoftwareViewConfigAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareViewConfigAriResourceOwner,
  resourceType: JiraSoftwareViewConfigAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/{viewType}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    viewType: /(board|backlog|timeline)/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/view-config/index.ts
var JiraSoftwareViewConfigAri = class _JiraSoftwareViewConfigAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._viewType = opts.resourceIdSegmentValues.viewType;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get viewType() {
    return this._viewType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareViewConfigAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareViewConfigAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareViewConfigAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareViewConfigAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/${opts.viewType}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        viewType: opts.viewType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareViewConfigAriStaticOpts);
    return new _JiraSoftwareViewConfigAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareViewConfigAriStaticOpts);
    return new _JiraSoftwareViewConfigAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      viewType: this.viewType
    };
  }
};

// src/jira-software/column/types.ts
var JiraSoftwareColumnAriResourceOwner = "jira-software", JiraSoftwareColumnAriResourceType = "column";

// src/jira-software/column/manifest.ts
var jiraSoftwareColumnAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareColumnAriResourceOwner,
  resourceType: JiraSoftwareColumnAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/{columnId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    columnId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/column/index.ts
var JiraSoftwareColumnAri = class _JiraSoftwareColumnAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._columnId = opts.resourceIdSegmentValues.columnId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get columnId() {
    return this._columnId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareColumnAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareColumnAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareColumnAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareColumnAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/${opts.columnId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        columnId: opts.columnId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareColumnAriStaticOpts);
    return new _JiraSoftwareColumnAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareColumnAriStaticOpts);
    return new _JiraSoftwareColumnAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      columnId: this.columnId
    };
  }
};

// src/jira-software/custom-filter/types.ts
var JiraSoftwareCustomFilterAriResourceOwner = "jira-software", JiraSoftwareCustomFilterAriResourceType = "custom-filter";

// src/jira-software/custom-filter/manifest.ts
var jiraSoftwareCustomFilterAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareCustomFilterAriResourceOwner,
  resourceType: JiraSoftwareCustomFilterAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/{customFilterId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    customFilterId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/custom-filter/index.ts
var JiraSoftwareCustomFilterAri = class _JiraSoftwareCustomFilterAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._customFilterId = opts.resourceIdSegmentValues.customFilterId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get customFilterId() {
    return this._customFilterId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareCustomFilterAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareCustomFilterAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareCustomFilterAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareCustomFilterAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/${opts.customFilterId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        customFilterId: opts.customFilterId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareCustomFilterAriStaticOpts);
    return new _JiraSoftwareCustomFilterAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareCustomFilterAriStaticOpts);
    return new _JiraSoftwareCustomFilterAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      customFilterId: this.customFilterId
    };
  }
};

// src/jira-software/role/types.ts
var JiraSoftwareRoleAriResourceOwner = "jira-software", JiraSoftwareRoleAriResourceType = "role";

// src/jira-software/role/manifest.ts
var jiraSoftwareRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraSoftwareRoleAriResourceOwner,
  resourceType: JiraSoftwareRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/role/index.ts
var JiraSoftwareRoleAri = class _JiraSoftwareRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareRoleAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraSoftwareRoleAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareRoleAriStaticOpts);
    return new _JiraSoftwareRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareRoleAriStaticOpts);
    return new _JiraSoftwareRoleAri(opts);
  }
  getVariables() {
    return {
      roleId: this.roleId
    };
  }
};

// src/jira-software/card-color/types.ts
var JiraSoftwareCardColorAriResourceOwner = "jira-software", JiraSoftwareCardColorAriResourceType = "card-color";

// src/jira-software/card-color/manifest.ts
var jiraSoftwareCardColorAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareCardColorAriResourceOwner,
  resourceType: JiraSoftwareCardColorAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/{cardColorId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    cardColorId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/card-color/index.ts
var JiraSoftwareCardColorAri = class _JiraSoftwareCardColorAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._cardColorId = opts.resourceIdSegmentValues.cardColorId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get cardColorId() {
    return this._cardColorId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareCardColorAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareCardColorAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareCardColorAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareCardColorAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/${opts.cardColorId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        cardColorId: opts.cardColorId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareCardColorAriStaticOpts);
    return new _JiraSoftwareCardColorAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareCardColorAriStaticOpts);
    return new _JiraSoftwareCardColorAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      cardColorId: this.cardColorId
    };
  }
};

// src/jira-software/card-layout/types.ts
var JiraSoftwareCardLayoutAriResourceOwner = "jira-software", JiraSoftwareCardLayoutAriResourceType = "card-layout";

// src/jira-software/card-layout/manifest.ts
var jiraSoftwareCardLayoutAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareCardLayoutAriResourceOwner,
  resourceType: JiraSoftwareCardLayoutAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/{cardLayoutId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    cardLayoutId: /[a-zA-Z0-9_]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/card-layout/index.ts
var JiraSoftwareCardLayoutAri = class _JiraSoftwareCardLayoutAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._cardLayoutId = opts.resourceIdSegmentValues.cardLayoutId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get cardLayoutId() {
    return this._cardLayoutId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareCardLayoutAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareCardLayoutAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareCardLayoutAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareCardLayoutAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/${opts.cardLayoutId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        cardLayoutId: opts.cardLayoutId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareCardLayoutAriStaticOpts);
    return new _JiraSoftwareCardLayoutAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareCardLayoutAriStaticOpts);
    return new _JiraSoftwareCardLayoutAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      cardLayoutId: this.cardLayoutId
    };
  }
};

// src/jira-software/card-parent/types.ts
var JiraSoftwareCardParentAriResourceOwner = "jira-software", JiraSoftwareCardParentAriResourceType = "card-parent";

// src/jira-software/card-parent/manifest.ts
var jiraSoftwareCardParentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareCardParentAriResourceOwner,
  resourceType: JiraSoftwareCardParentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/{cardParentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    cardParentId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/card-parent/index.ts
var JiraSoftwareCardParentAri = class _JiraSoftwareCardParentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._cardParentId = opts.resourceIdSegmentValues.cardParentId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get cardParentId() {
    return this._cardParentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareCardParentAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareCardParentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareCardParentAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareCardParentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/${opts.cardParentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        cardParentId: opts.cardParentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareCardParentAriStaticOpts);
    return new _JiraSoftwareCardParentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareCardParentAriStaticOpts);
    return new _JiraSoftwareCardParentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      cardParentId: this.cardParentId
    };
  }
};

// src/jira-software/card/types.ts
var JiraSoftwareCardAriResourceOwner = "jira-software", JiraSoftwareCardAriResourceType = "card";

// src/jira-software/card/manifest.ts
var jiraSoftwareCardAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareCardAriResourceOwner,
  resourceType: JiraSoftwareCardAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/{cardId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    cardId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/card/index.ts
var JiraSoftwareCardAri = class _JiraSoftwareCardAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._cardId = opts.resourceIdSegmentValues.cardId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get cardId() {
    return this._cardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareCardAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareCardAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareCardAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareCardAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/${opts.cardId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        cardId: opts.cardId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareCardAriStaticOpts);
    return new _JiraSoftwareCardAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareCardAriStaticOpts);
    return new _JiraSoftwareCardAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      cardId: this.cardId
    };
  }
};

// src/jira-software/board-feature/types.ts
var JiraSoftwareBoardFeatureAriResourceOwner = "jira-software", JiraSoftwareBoardFeatureAriResourceType = "board-feature";

// src/jira-software/board-feature/manifest.ts
var jiraSoftwareBoardFeatureAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareBoardFeatureAriResourceOwner,
  resourceType: JiraSoftwareBoardFeatureAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/featureKey/{featureKey}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    featureKey: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/board-feature/index.ts
var JiraSoftwareBoardFeatureAri = class _JiraSoftwareBoardFeatureAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._featureKey = opts.resourceIdSegmentValues.featureKey;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get featureKey() {
    return this._featureKey;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareBoardFeatureAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareBoardFeatureAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareBoardFeatureAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareBoardFeatureAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/featureKey/${opts.featureKey}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        featureKey: opts.featureKey
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareBoardFeatureAriStaticOpts);
    return new _JiraSoftwareBoardFeatureAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareBoardFeatureAriStaticOpts);
    return new _JiraSoftwareBoardFeatureAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      featureKey: this.featureKey
    };
  }
};

// src/jira-software/board-issue-list/types.ts
var JiraSoftwareBoardIssueListAriResourceOwner = "jira-software", JiraSoftwareBoardIssueListAriResourceType = "board-issue-list";

// src/jira-software/board-issue-list/manifest.ts
var jiraSoftwareBoardIssueListAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareBoardIssueListAriResourceOwner,
  resourceType: JiraSoftwareBoardIssueListAriResourceType,
  resourceIdSlug: "activation/{activationId}/{boardId}/{issueListId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    issueListId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/board-issue-list/index.ts
var JiraSoftwareBoardIssueListAri = class _JiraSoftwareBoardIssueListAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._boardId = opts.resourceIdSegmentValues.boardId, this._issueListId = opts.resourceIdSegmentValues.issueListId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get boardId() {
    return this._boardId;
  }
  get issueListId() {
    return this._issueListId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareBoardIssueListAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareBoardIssueListAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareBoardIssueListAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareBoardIssueListAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.boardId}/${opts.issueListId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        boardId: opts.boardId,
        issueListId: opts.issueListId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareBoardIssueListAriStaticOpts);
    return new _JiraSoftwareBoardIssueListAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareBoardIssueListAriStaticOpts);
    return new _JiraSoftwareBoardIssueListAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      boardId: this.boardId,
      issueListId: this.issueListId
    };
  }
};

// src/jira-software/board/types.ts
var JiraSoftwareBoardAriResourceOwner = "jira-software", JiraSoftwareBoardAriResourceType = "board";

// src/jira-software/board/manifest.ts
var jiraSoftwareBoardAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraSoftwareBoardAriResourceOwner,
  resourceType: JiraSoftwareBoardAriResourceType,
  resourceIdSlug: "{boardId}",
  resourceIdSegmentFormats: {
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-software/board/index.ts
var JiraSoftwareBoardAri = class _JiraSoftwareBoardAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._boardId = opts.resourceIdSegmentValues.boardId;
  }
  get siteId() {
    return this._siteId;
  }
  get boardId() {
    return this._boardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraSoftwareBoardAriStaticOpts.qualifier,
      platformQualifier: jiraSoftwareBoardAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraSoftwareBoardAriStaticOpts.resourceOwner,
      resourceType: jiraSoftwareBoardAriStaticOpts.resourceType,
      resourceId: `${opts.boardId}`,
      resourceIdSegmentValues: {
        boardId: opts.boardId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraSoftwareBoardAriStaticOpts);
    return new _JiraSoftwareBoardAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraSoftwareBoardAriStaticOpts);
    return new _JiraSoftwareBoardAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      boardId: this.boardId
    };
  }
};

// src/jira-servicedesk/sla/types.ts
var JiraServicedeskSlaAriResourceOwner = "jira-servicedesk", JiraServicedeskSlaAriResourceType = "sla";

// src/jira-servicedesk/sla/manifest.ts
var jiraServicedeskSlaAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraServicedeskSlaAriResourceOwner,
  resourceType: JiraServicedeskSlaAriResourceType,
  resourceIdSlug: "activation/{activationId}/{slaId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    slaId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-servicedesk/sla/index.ts
var JiraServicedeskSlaAri = class _JiraServicedeskSlaAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._slaId = opts.resourceIdSegmentValues.slaId;
  }
  get activationId() {
    return this._activationId;
  }
  get slaId() {
    return this._slaId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraServicedeskSlaAriStaticOpts.qualifier,
      platformQualifier: jiraServicedeskSlaAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraServicedeskSlaAriStaticOpts.resourceOwner,
      resourceType: jiraServicedeskSlaAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.slaId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        slaId: opts.slaId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraServicedeskSlaAriStaticOpts);
    return new _JiraServicedeskSlaAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraServicedeskSlaAriStaticOpts);
    return new _JiraServicedeskSlaAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      slaId: this.slaId
    };
  }
};

// src/jira-servicedesk/queue/types.ts
var JiraServicedeskQueueAriResourceOwner = "jira-servicedesk", JiraServicedeskQueueAriResourceType = "queue";

// src/jira-servicedesk/queue/manifest.ts
var jiraServicedeskQueueAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: JiraServicedeskQueueAriResourceOwner,
  resourceType: JiraServicedeskQueueAriResourceType,
  resourceIdSlug: "activation/{activationId}/{queueId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    queueId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-servicedesk/queue/index.ts
var JiraServicedeskQueueAri = class _JiraServicedeskQueueAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._queueId = opts.resourceIdSegmentValues.queueId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get queueId() {
    return this._queueId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraServicedeskQueueAriStaticOpts.qualifier,
      platformQualifier: jiraServicedeskQueueAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: jiraServicedeskQueueAriStaticOpts.resourceOwner,
      resourceType: jiraServicedeskQueueAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.queueId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        queueId: opts.queueId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraServicedeskQueueAriStaticOpts);
    return new _JiraServicedeskQueueAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraServicedeskQueueAriStaticOpts);
    return new _JiraServicedeskQueueAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      queueId: this.queueId
    };
  }
};

// src/jira-servicedesk/request-type/types.ts
var JiraServicedeskRequestTypeAriResourceOwner = "jira-servicedesk", JiraServicedeskRequestTypeAriResourceType = "request-type";

// src/jira-servicedesk/request-type/manifest.ts
var jiraServicedeskRequestTypeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraServicedeskRequestTypeAriResourceOwner,
  resourceType: JiraServicedeskRequestTypeAriResourceType,
  resourceIdSlug: "activation/{activationId}/{requestTypeId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    requestTypeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-servicedesk/request-type/index.ts
var JiraServicedeskRequestTypeAri = class _JiraServicedeskRequestTypeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._requestTypeId = opts.resourceIdSegmentValues.requestTypeId;
  }
  get activationId() {
    return this._activationId;
  }
  get requestTypeId() {
    return this._requestTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraServicedeskRequestTypeAriStaticOpts.qualifier,
      platformQualifier: jiraServicedeskRequestTypeAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraServicedeskRequestTypeAriStaticOpts.resourceOwner,
      resourceType: jiraServicedeskRequestTypeAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.requestTypeId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        requestTypeId: opts.requestTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraServicedeskRequestTypeAriStaticOpts);
    return new _JiraServicedeskRequestTypeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraServicedeskRequestTypeAriStaticOpts);
    return new _JiraServicedeskRequestTypeAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      requestTypeId: this.requestTypeId
    };
  }
};

// src/jira-servicedesk/role/types.ts
var JiraServicedeskRoleAriResourceOwner = "jira-servicedesk", JiraServicedeskRoleAriResourceType = "role";

// src/jira-servicedesk/role/manifest.ts
var jiraServicedeskRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraServicedeskRoleAriResourceOwner,
  resourceType: JiraServicedeskRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-servicedesk/role/index.ts
var JiraServicedeskRoleAri = class _JiraServicedeskRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraServicedeskRoleAriStaticOpts.qualifier,
      platformQualifier: jiraServicedeskRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraServicedeskRoleAriStaticOpts.resourceOwner,
      resourceType: jiraServicedeskRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraServicedeskRoleAriStaticOpts);
    return new _JiraServicedeskRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraServicedeskRoleAriStaticOpts);
    return new _JiraServicedeskRoleAri(opts);
  }
  getVariables() {
    return {
      roleId: this.roleId
    };
  }
};

// src/jira-servicedesk/site/types.ts
var JiraServicedeskSiteAriResourceOwner = "jira-servicedesk", JiraServicedeskSiteAriResourceType = "site";

// src/jira-servicedesk/site/manifest.ts
var jiraServicedeskSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraServicedeskSiteAriResourceOwner,
  resourceType: JiraServicedeskSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-servicedesk/site/index.ts
var JiraServicedeskSiteAri = class _JiraServicedeskSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraServicedeskSiteAriStaticOpts.qualifier,
      platformQualifier: jiraServicedeskSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraServicedeskSiteAriStaticOpts.resourceOwner,
      resourceType: jiraServicedeskSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraServicedeskSiteAriStaticOpts);
    return new _JiraServicedeskSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraServicedeskSiteAriStaticOpts);
    return new _JiraServicedeskSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/jira-servicedesk/approval/types.ts
var JiraServicedeskApprovalAriResourceOwner = "jira-servicedesk", JiraServicedeskApprovalAriResourceType = "approval";

// src/jira-servicedesk/approval/manifest.ts
var jiraServicedeskApprovalAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraServicedeskApprovalAriResourceOwner,
  resourceType: JiraServicedeskApprovalAriResourceType,
  resourceIdSlug: "activation/{activationId}/{approvalId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    approvalId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-servicedesk/approval/index.ts
var JiraServicedeskApprovalAri = class _JiraServicedeskApprovalAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._approvalId = opts.resourceIdSegmentValues.approvalId;
  }
  get activationId() {
    return this._activationId;
  }
  get approvalId() {
    return this._approvalId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraServicedeskApprovalAriStaticOpts.qualifier,
      platformQualifier: jiraServicedeskApprovalAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraServicedeskApprovalAriStaticOpts.resourceOwner,
      resourceType: jiraServicedeskApprovalAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.approvalId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        approvalId: opts.approvalId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraServicedeskApprovalAriStaticOpts);
    return new _JiraServicedeskApprovalAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraServicedeskApprovalAriStaticOpts);
    return new _JiraServicedeskApprovalAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      approvalId: this.approvalId
    };
  }
};

// src/jira-servicedesk/calendar-event/types.ts
var JiraServicedeskCalendarEventAriResourceOwner = "jira-servicedesk", JiraServicedeskCalendarEventAriResourceType = "calendar-event";

// src/jira-servicedesk/calendar-event/manifest.ts
var jiraServicedeskCalendarEventAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraServicedeskCalendarEventAriResourceOwner,
  resourceType: JiraServicedeskCalendarEventAriResourceType,
  resourceIdSlug: "activation/{activationId}/{calendarEventId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    calendarEventId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-servicedesk/calendar-event/index.ts
var JiraServicedeskCalendarEventAri = class _JiraServicedeskCalendarEventAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._calendarEventId = opts.resourceIdSegmentValues.calendarEventId;
  }
  get activationId() {
    return this._activationId;
  }
  get calendarEventId() {
    return this._calendarEventId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraServicedeskCalendarEventAriStaticOpts.qualifier,
      platformQualifier: jiraServicedeskCalendarEventAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraServicedeskCalendarEventAriStaticOpts.resourceOwner,
      resourceType: jiraServicedeskCalendarEventAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.calendarEventId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        calendarEventId: opts.calendarEventId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraServicedeskCalendarEventAriStaticOpts);
    return new _JiraServicedeskCalendarEventAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraServicedeskCalendarEventAriStaticOpts);
    return new _JiraServicedeskCalendarEventAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      calendarEventId: this.calendarEventId
    };
  }
};

// src/jira-servicedesk/canned-response/types.ts
var JiraServicedeskCannedResponseAriResourceOwner = "jira-servicedesk", JiraServicedeskCannedResponseAriResourceType = "canned-response";

// src/jira-servicedesk/canned-response/manifest.ts
var jiraServicedeskCannedResponseAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraServicedeskCannedResponseAriResourceOwner,
  resourceType: JiraServicedeskCannedResponseAriResourceType,
  resourceIdSlug: "activation/{activationId}/{cannedResponseId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    cannedResponseId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-servicedesk/canned-response/index.ts
var JiraServicedeskCannedResponseAri = class _JiraServicedeskCannedResponseAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._cannedResponseId = opts.resourceIdSegmentValues.cannedResponseId;
  }
  get activationId() {
    return this._activationId;
  }
  get cannedResponseId() {
    return this._cannedResponseId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraServicedeskCannedResponseAriStaticOpts.qualifier,
      platformQualifier: jiraServicedeskCannedResponseAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraServicedeskCannedResponseAriStaticOpts.resourceOwner,
      resourceType: jiraServicedeskCannedResponseAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.cannedResponseId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        cannedResponseId: opts.cannedResponseId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraServicedeskCannedResponseAriStaticOpts);
    return new _JiraServicedeskCannedResponseAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraServicedeskCannedResponseAriStaticOpts);
    return new _JiraServicedeskCannedResponseAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      cannedResponseId: this.cannedResponseId
    };
  }
};

// src/jira-servicedesk/organization/types.ts
var JiraServicedeskOrganizationAriResourceOwner = "jira-servicedesk", JiraServicedeskOrganizationAriResourceType = "organization";

// src/jira-servicedesk/organization/manifest.ts
var jiraServicedeskOrganizationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraServicedeskOrganizationAriResourceOwner,
  resourceType: JiraServicedeskOrganizationAriResourceType,
  resourceIdSlug: "activation/{activationId}/{organizationId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    organizationId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-servicedesk/organization/index.ts
var JiraServicedeskOrganizationAri = class _JiraServicedeskOrganizationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._organizationId = opts.resourceIdSegmentValues.organizationId;
  }
  get activationId() {
    return this._activationId;
  }
  get organizationId() {
    return this._organizationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraServicedeskOrganizationAriStaticOpts.qualifier,
      platformQualifier: jiraServicedeskOrganizationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraServicedeskOrganizationAriStaticOpts.resourceOwner,
      resourceType: jiraServicedeskOrganizationAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.organizationId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        organizationId: opts.organizationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraServicedeskOrganizationAriStaticOpts);
    return new _JiraServicedeskOrganizationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraServicedeskOrganizationAriStaticOpts);
    return new _JiraServicedeskOrganizationAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      organizationId: this.organizationId
    };
  }
};

// src/jira-align/instance/types.ts
var JiraAlignInstanceAriResourceOwner = "jira-align", JiraAlignInstanceAriResourceType = "instance";

// src/jira-align/instance/manifest.ts
var jiraAlignInstanceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraAlignInstanceAriResourceOwner,
  resourceType: JiraAlignInstanceAriResourceType,
  resourceIdSlug: "{instanceId}",
  resourceIdSegmentFormats: {
    instanceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-align/instance/index.ts
var JiraAlignInstanceAri = class _JiraAlignInstanceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._instanceId = opts.resourceIdSegmentValues.instanceId;
  }
  get instanceId() {
    return this._instanceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraAlignInstanceAriStaticOpts.qualifier,
      platformQualifier: jiraAlignInstanceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraAlignInstanceAriStaticOpts.resourceOwner,
      resourceType: jiraAlignInstanceAriStaticOpts.resourceType,
      resourceId: `${opts.instanceId}`,
      resourceIdSegmentValues: {
        instanceId: opts.instanceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraAlignInstanceAriStaticOpts);
    return new _JiraAlignInstanceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraAlignInstanceAriStaticOpts);
    return new _JiraAlignInstanceAri(opts);
  }
  getVariables() {
    return {
      instanceId: this.instanceId
    };
  }
};

// src/jira-core/role/types.ts
var JiraCoreRoleAriResourceOwner = "jira-core", JiraCoreRoleAriResourceType = "role";

// src/jira-core/role/manifest.ts
var jiraCoreRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraCoreRoleAriResourceOwner,
  resourceType: JiraCoreRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-core/role/index.ts
var JiraCoreRoleAri = class _JiraCoreRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraCoreRoleAriStaticOpts.qualifier,
      platformQualifier: jiraCoreRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraCoreRoleAriStaticOpts.resourceOwner,
      resourceType: jiraCoreRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraCoreRoleAriStaticOpts);
    return new _JiraCoreRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraCoreRoleAriStaticOpts);
    return new _JiraCoreRoleAri(opts);
  }
  getVariables() {
    return {
      roleId: this.roleId
    };
  }
};

// src/jira-core/site/types.ts
var JiraCoreSiteAriResourceOwner = "jira-core", JiraCoreSiteAriResourceType = "site";

// src/jira-core/site/manifest.ts
var jiraCoreSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: JiraCoreSiteAriResourceOwner,
  resourceType: JiraCoreSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-core/site/index.ts
var JiraCoreSiteAri = class _JiraCoreSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraCoreSiteAriStaticOpts.qualifier,
      platformQualifier: jiraCoreSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: jiraCoreSiteAriStaticOpts.resourceOwner,
      resourceType: jiraCoreSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraCoreSiteAriStaticOpts);
    return new _JiraCoreSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraCoreSiteAriStaticOpts);
    return new _JiraCoreSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/jira-align/epic/types.ts
var JiraAlignEpicAriResourceOwner = "jira-align", JiraAlignEpicAriResourceType = "epic";

// src/jira-align/epic/manifest.ts
var jiraAlignEpicAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$"),
  resourceOwner: JiraAlignEpicAriResourceOwner,
  resourceType: JiraAlignEpicAriResourceType,
  resourceIdSlug: "{epicId}",
  resourceIdSegmentFormats: {
    epicId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/jira-align/epic/index.ts
var JiraAlignEpicAri = class _JiraAlignEpicAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._instanceId = opts.cloudId || "", this._epicId = opts.resourceIdSegmentValues.epicId;
  }
  get instanceId() {
    return this._instanceId;
  }
  get epicId() {
    return this._epicId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: jiraAlignEpicAriStaticOpts.qualifier,
      platformQualifier: jiraAlignEpicAriStaticOpts.platformQualifier,
      cloudId: opts.instanceId,
      resourceOwner: jiraAlignEpicAriStaticOpts.resourceOwner,
      resourceType: jiraAlignEpicAriStaticOpts.resourceType,
      resourceId: `${opts.epicId}`,
      resourceIdSegmentValues: {
        epicId: opts.epicId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, jiraAlignEpicAriStaticOpts);
    return new _JiraAlignEpicAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, jiraAlignEpicAriStaticOpts);
    return new _JiraAlignEpicAri(opts);
  }
  getVariables() {
    return {
      instanceId: this.instanceId,
      epicId: this.epicId
    };
  }
};

// src/identity/userGrant/types.ts
var IdentityUserGrantAriResourceOwner = "identity", IdentityUserGrantAriResourceType = "userGrant";

// src/identity/userGrant/manifest.ts
var identityUserGrantAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityUserGrantAriResourceOwner,
  resourceType: IdentityUserGrantAriResourceType,
  resourceIdSlug: "{userId}-{clientId}",
  resourceIdSegmentFormats: {
    userId: /[a-zA-Z0-9_\-\:]{1,128}/,
    // eslint-disable-line no-useless-escape
    clientId: /[0-9a-zA-Z-_]{5,50}/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/userGrant/index.ts
var IdentityUserGrantAri = class _IdentityUserGrantAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._userId = opts.resourceIdSegmentValues.userId, this._clientId = opts.resourceIdSegmentValues.clientId;
  }
  get userId() {
    return this._userId;
  }
  get clientId() {
    return this._clientId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityUserGrantAriStaticOpts.qualifier,
      platformQualifier: identityUserGrantAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityUserGrantAriStaticOpts.resourceOwner,
      resourceType: identityUserGrantAriStaticOpts.resourceType,
      resourceId: `${opts.userId}-${opts.clientId}`,
      resourceIdSegmentValues: {
        userId: opts.userId,
        clientId: opts.clientId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityUserGrantAriStaticOpts);
    return new _IdentityUserGrantAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityUserGrantAriStaticOpts);
    return new _IdentityUserGrantAri(opts);
  }
  getVariables() {
    return {
      userId: this.userId,
      clientId: this.clientId
    };
  }
};

// src/identity/userbase/types.ts
var IdentityUserbaseAriResourceOwner = "identity", IdentityUserbaseAriResourceType = "userbase";

// src/identity/userbase/manifest.ts
var identityUserbaseAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityUserbaseAriResourceOwner,
  resourceType: IdentityUserbaseAriResourceType,
  resourceIdSlug: "{userbaseId}",
  resourceIdSegmentFormats: {
    userbaseId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/userbase/index.ts
var IdentityUserbaseAri = class _IdentityUserbaseAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._userbaseId = opts.resourceIdSegmentValues.userbaseId;
  }
  get userbaseId() {
    return this._userbaseId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityUserbaseAriStaticOpts.qualifier,
      platformQualifier: identityUserbaseAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityUserbaseAriStaticOpts.resourceOwner,
      resourceType: identityUserbaseAriStaticOpts.resourceType,
      resourceId: `${opts.userbaseId}`,
      resourceIdSegmentValues: {
        userbaseId: opts.userbaseId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityUserbaseAriStaticOpts);
    return new _IdentityUserbaseAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityUserbaseAriStaticOpts);
    return new _IdentityUserbaseAri(opts);
  }
  getVariables() {
    return {
      userbaseId: this.userbaseId
    };
  }
};

// src/identity/site/types.ts
var IdentitySiteAriResourceOwner = "identity", IdentitySiteAriResourceType = "site";

// src/identity/site/manifest.ts
var identitySiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentitySiteAriResourceOwner,
  resourceType: IdentitySiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/site/index.ts
var IdentitySiteAri = class _IdentitySiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identitySiteAriStaticOpts.qualifier,
      platformQualifier: identitySiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identitySiteAriStaticOpts.resourceOwner,
      resourceType: identitySiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identitySiteAriStaticOpts);
    return new _IdentitySiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identitySiteAriStaticOpts);
    return new _IdentitySiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/identity/team-member/types.ts
var IdentityTeamMemberAriResourceOwner = "identity", IdentityTeamMemberAriResourceType = "team-member";

// src/identity/team-member/manifest.ts
var identityTeamMemberAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityTeamMemberAriResourceOwner,
  resourceType: IdentityTeamMemberAriResourceType,
  resourceIdSlug: "{teamId}/{userId}",
  resourceIdSegmentFormats: {
    teamId: /[a-zA-Z0-9.\-_~]+/,
    // eslint-disable-line no-useless-escape
    userId: /[a-zA-Z0-9_\-\:]{1,128}/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/team-member/index.ts
var IdentityTeamMemberAri = class _IdentityTeamMemberAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._teamId = opts.resourceIdSegmentValues.teamId, this._userId = opts.resourceIdSegmentValues.userId;
  }
  get teamId() {
    return this._teamId;
  }
  get userId() {
    return this._userId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityTeamMemberAriStaticOpts.qualifier,
      platformQualifier: identityTeamMemberAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityTeamMemberAriStaticOpts.resourceOwner,
      resourceType: identityTeamMemberAriStaticOpts.resourceType,
      resourceId: `${opts.teamId}/${opts.userId}`,
      resourceIdSegmentValues: {
        teamId: opts.teamId,
        userId: opts.userId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityTeamMemberAriStaticOpts);
    return new _IdentityTeamMemberAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityTeamMemberAriStaticOpts);
    return new _IdentityTeamMemberAri(opts);
  }
  getVariables() {
    return {
      teamId: this.teamId,
      userId: this.userId
    };
  }
};

// src/identity/team/types.ts
var IdentityTeamAriResourceOwner = "identity", IdentityTeamAriResourceType = "team";

// src/identity/team/manifest.ts
var identityTeamAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityTeamAriResourceOwner,
  resourceType: IdentityTeamAriResourceType,
  resourceIdSlug: "{teamId}",
  resourceIdSegmentFormats: {
    teamId: /[a-zA-Z0-9.\-_~]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/team/index.ts
var IdentityTeamAri = class _IdentityTeamAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._teamId = opts.resourceIdSegmentValues.teamId;
  }
  get teamId() {
    return this._teamId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityTeamAriStaticOpts.qualifier,
      platformQualifier: identityTeamAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityTeamAriStaticOpts.resourceOwner,
      resourceType: identityTeamAriStaticOpts.resourceType,
      resourceId: `${opts.teamId}`,
      resourceIdSegmentValues: {
        teamId: opts.teamId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityTeamAriStaticOpts);
    return new _IdentityTeamAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityTeamAriStaticOpts);
    return new _IdentityTeamAri(opts);
  }
  getVariables() {
    return {
      teamId: this.teamId
    };
  }
};

// src/identity/user/types.ts
var IdentityUserAriResourceOwner = "identity", IdentityUserAriResourceType = "user";

// src/identity/user/manifest.ts
var identityUserAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityUserAriResourceOwner,
  resourceType: IdentityUserAriResourceType,
  resourceIdSlug: "{userId}",
  resourceIdSegmentFormats: {
    userId: /[a-zA-Z0-9_\-\:]{1,128}/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/user/index.ts
var IdentityUserAri = class _IdentityUserAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._userId = opts.resourceIdSegmentValues.userId;
  }
  get userId() {
    return this._userId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityUserAriStaticOpts.qualifier,
      platformQualifier: identityUserAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityUserAriStaticOpts.resourceOwner,
      resourceType: identityUserAriStaticOpts.resourceType,
      resourceId: `${opts.userId}`,
      resourceIdSegmentValues: {
        userId: opts.userId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityUserAriStaticOpts);
    return new _IdentityUserAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityUserAriStaticOpts);
    return new _IdentityUserAri(opts);
  }
  getVariables() {
    return {
      userId: this.userId
    };
  }
};

// src/identity/domain/types.ts
var IdentityDomainAriResourceOwner = "identity", IdentityDomainAriResourceType = "domain";

// src/identity/domain/manifest.ts
var identityDomainAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityDomainAriResourceOwner,
  resourceType: IdentityDomainAriResourceType,
  resourceIdSlug: "{base64Domain}",
  resourceIdSegmentFormats: {
    base64Domain: /[a-zA-Z0-9=]+={0,1}/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/domain/index.ts
var IdentityDomainAri = class _IdentityDomainAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._base64Domain = opts.resourceIdSegmentValues.base64Domain;
  }
  get base64Domain() {
    return this._base64Domain;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityDomainAriStaticOpts.qualifier,
      platformQualifier: identityDomainAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityDomainAriStaticOpts.resourceOwner,
      resourceType: identityDomainAriStaticOpts.resourceType,
      resourceId: `${opts.base64Domain}`,
      resourceIdSegmentValues: {
        base64Domain: opts.base64Domain
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityDomainAriStaticOpts);
    return new _IdentityDomainAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityDomainAriStaticOpts);
    return new _IdentityDomainAri(opts);
  }
  getVariables() {
    return {
      base64Domain: this.base64Domain
    };
  }
};

// src/identity/group/types.ts
var IdentityGroupAriResourceOwner = "identity", IdentityGroupAriResourceType = "group";

// src/identity/group/manifest.ts
var identityGroupAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityGroupAriResourceOwner,
  resourceType: IdentityGroupAriResourceType,
  resourceIdSlug: "{groupId}",
  resourceIdSegmentFormats: {
    groupId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/group/index.ts
var IdentityGroupAri = class _IdentityGroupAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._groupId = opts.resourceIdSegmentValues.groupId;
  }
  get groupId() {
    return this._groupId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityGroupAriStaticOpts.qualifier,
      platformQualifier: identityGroupAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityGroupAriStaticOpts.resourceOwner,
      resourceType: identityGroupAriStaticOpts.resourceType,
      resourceId: `${opts.groupId}`,
      resourceIdSegmentValues: {
        groupId: opts.groupId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityGroupAriStaticOpts);
    return new _IdentityGroupAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityGroupAriStaticOpts);
    return new _IdentityGroupAri(opts);
  }
  getVariables() {
    return {
      groupId: this.groupId
    };
  }
};

// src/identity/oauthClient/types.ts
var IdentityOauthClientAriResourceOwner = "identity", IdentityOauthClientAriResourceType = "oauthClient";

// src/identity/oauthClient/manifest.ts
var identityOauthClientAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityOauthClientAriResourceOwner,
  resourceType: IdentityOauthClientAriResourceType,
  resourceIdSlug: "{clientId}",
  resourceIdSegmentFormats: {
    clientId: /[0-9a-zA-Z-_]{5,50}/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/oauthClient/index.ts
var IdentityOauthClientAri = class _IdentityOauthClientAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._clientId = opts.resourceIdSegmentValues.clientId;
  }
  get clientId() {
    return this._clientId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityOauthClientAriStaticOpts.qualifier,
      platformQualifier: identityOauthClientAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityOauthClientAriStaticOpts.resourceOwner,
      resourceType: identityOauthClientAriStaticOpts.resourceType,
      resourceId: `${opts.clientId}`,
      resourceIdSegmentValues: {
        clientId: opts.clientId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityOauthClientAriStaticOpts);
    return new _IdentityOauthClientAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityOauthClientAriStaticOpts);
    return new _IdentityOauthClientAri(opts);
  }
  getVariables() {
    return {
      clientId: this.clientId
    };
  }
};

// src/identity/role/types.ts
var IdentityRoleAriResourceOwner = "identity", IdentityRoleAriResourceType = "role";

// src/identity/role/manifest.ts
var identityRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]*$"),
  resourceOwner: IdentityRoleAriResourceOwner,
  resourceType: IdentityRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/role/index.ts
var IdentityRoleAri = class _IdentityRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._optionalSiteId = opts.cloudId || "", this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get optionalSiteId() {
    return this._optionalSiteId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityRoleAriStaticOpts.qualifier,
      platformQualifier: identityRoleAriStaticOpts.platformQualifier,
      cloudId: opts.optionalSiteId,
      resourceOwner: identityRoleAriStaticOpts.resourceOwner,
      resourceType: identityRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityRoleAriStaticOpts);
    return new _IdentityRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityRoleAriStaticOpts);
    return new _IdentityRoleAri(opts);
  }
  getVariables() {
    return {
      optionalSiteId: this.optionalSiteId,
      roleId: this.roleId
    };
  }
};

// src/identity/auth-policy/types.ts
var IdentityAuthPolicyAriResourceOwner = "identity", IdentityAuthPolicyAriResourceType = "auth-policy";

// src/identity/auth-policy/manifest.ts
var identityAuthPolicyAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityAuthPolicyAriResourceOwner,
  resourceType: IdentityAuthPolicyAriResourceType,
  resourceIdSlug: "{authPolicyId}",
  resourceIdSegmentFormats: {
    authPolicyId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/auth-policy/index.ts
var IdentityAuthPolicyAri = class _IdentityAuthPolicyAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._authPolicyId = opts.resourceIdSegmentValues.authPolicyId;
  }
  get authPolicyId() {
    return this._authPolicyId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityAuthPolicyAriStaticOpts.qualifier,
      platformQualifier: identityAuthPolicyAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityAuthPolicyAriStaticOpts.resourceOwner,
      resourceType: identityAuthPolicyAriStaticOpts.resourceType,
      resourceId: `${opts.authPolicyId}`,
      resourceIdSegmentValues: {
        authPolicyId: opts.authPolicyId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityAuthPolicyAriStaticOpts);
    return new _IdentityAuthPolicyAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityAuthPolicyAriStaticOpts);
    return new _IdentityAuthPolicyAri(opts);
  }
  getVariables() {
    return {
      authPolicyId: this.authPolicyId
    };
  }
};

// src/identity/customer-directory/types.ts
var IdentityCustomerDirectoryAriResourceOwner = "identity", IdentityCustomerDirectoryAriResourceType = "customer-directory";

// src/identity/customer-directory/manifest.ts
var identityCustomerDirectoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityCustomerDirectoryAriResourceOwner,
  resourceType: IdentityCustomerDirectoryAriResourceType,
  resourceIdSlug: "{customerDirectoryId}",
  resourceIdSegmentFormats: {
    customerDirectoryId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/customer-directory/index.ts
var IdentityCustomerDirectoryAri = class _IdentityCustomerDirectoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._customerDirectoryId = opts.resourceIdSegmentValues.customerDirectoryId;
  }
  get customerDirectoryId() {
    return this._customerDirectoryId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityCustomerDirectoryAriStaticOpts.qualifier,
      platformQualifier: identityCustomerDirectoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityCustomerDirectoryAriStaticOpts.resourceOwner,
      resourceType: identityCustomerDirectoryAriStaticOpts.resourceType,
      resourceId: `${opts.customerDirectoryId}`,
      resourceIdSegmentValues: {
        customerDirectoryId: opts.customerDirectoryId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityCustomerDirectoryAriStaticOpts);
    return new _IdentityCustomerDirectoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityCustomerDirectoryAriStaticOpts);
    return new _IdentityCustomerDirectoryAri(opts);
  }
  getVariables() {
    return {
      customerDirectoryId: this.customerDirectoryId
    };
  }
};

// src/identity/customer-organization/types.ts
var IdentityCustomerOrganizationAriResourceOwner = "identity", IdentityCustomerOrganizationAriResourceType = "customer-organization";

// src/identity/customer-organization/manifest.ts
var identityCustomerOrganizationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityCustomerOrganizationAriResourceOwner,
  resourceType: IdentityCustomerOrganizationAriResourceType,
  resourceIdSlug: "{customerOrganizationId}",
  resourceIdSegmentFormats: {
    customerOrganizationId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/customer-organization/index.ts
var IdentityCustomerOrganizationAri = class _IdentityCustomerOrganizationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._customerOrganizationId = opts.resourceIdSegmentValues.customerOrganizationId;
  }
  get customerOrganizationId() {
    return this._customerOrganizationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityCustomerOrganizationAriStaticOpts.qualifier,
      platformQualifier: identityCustomerOrganizationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityCustomerOrganizationAriStaticOpts.resourceOwner,
      resourceType: identityCustomerOrganizationAriStaticOpts.resourceType,
      resourceId: `${opts.customerOrganizationId}`,
      resourceIdSegmentValues: {
        customerOrganizationId: opts.customerOrganizationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityCustomerOrganizationAriStaticOpts);
    return new _IdentityCustomerOrganizationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityCustomerOrganizationAriStaticOpts);
    return new _IdentityCustomerOrganizationAri(opts);
  }
  getVariables() {
    return {
      customerOrganizationId: this.customerOrganizationId
    };
  }
};

// src/identity/directory/types.ts
var IdentityDirectoryAriResourceOwner = "identity", IdentityDirectoryAriResourceType = "directory";

// src/identity/directory/manifest.ts
var identityDirectoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityDirectoryAriResourceOwner,
  resourceType: IdentityDirectoryAriResourceType,
  resourceIdSlug: "{directoryId}",
  resourceIdSegmentFormats: {
    directoryId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/directory/index.ts
var IdentityDirectoryAri = class _IdentityDirectoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._directoryId = opts.resourceIdSegmentValues.directoryId;
  }
  get directoryId() {
    return this._directoryId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityDirectoryAriStaticOpts.qualifier,
      platformQualifier: identityDirectoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityDirectoryAriStaticOpts.resourceOwner,
      resourceType: identityDirectoryAriStaticOpts.resourceType,
      resourceId: `${opts.directoryId}`,
      resourceIdSegmentValues: {
        directoryId: opts.directoryId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityDirectoryAriStaticOpts);
    return new _IdentityDirectoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityDirectoryAriStaticOpts);
    return new _IdentityDirectoryAri(opts);
  }
  getVariables() {
    return {
      directoryId: this.directoryId
    };
  }
};

// src/identity/app/types.ts
var IdentityAppAriResourceOwner = "identity", IdentityAppAriResourceType = "app";

// src/identity/app/manifest.ts
var identityAppAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: IdentityAppAriResourceOwner,
  resourceType: IdentityAppAriResourceType,
  resourceIdSlug: "{platform}/{appId}",
  resourceIdSegmentFormats: {
    platform: /(android|ios|macos)/,
    // eslint-disable-line no-useless-escape
    appId: /(([a-zA-Z]+)\.)+([a-zA-Z]+)/
    // eslint-disable-line no-useless-escape
  }
};

// src/identity/app/index.ts
var IdentityAppAri = class _IdentityAppAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._platform = opts.resourceIdSegmentValues.platform, this._appId = opts.resourceIdSegmentValues.appId;
  }
  get platform() {
    return this._platform;
  }
  get appId() {
    return this._appId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: identityAppAriStaticOpts.qualifier,
      platformQualifier: identityAppAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: identityAppAriStaticOpts.resourceOwner,
      resourceType: identityAppAriStaticOpts.resourceType,
      resourceId: `${opts.platform}/${opts.appId}`,
      resourceIdSegmentValues: {
        platform: opts.platform,
        appId: opts.appId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, identityAppAriStaticOpts);
    return new _IdentityAppAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, identityAppAriStaticOpts);
    return new _IdentityAppAri(opts);
  }
  getVariables() {
    return {
      platform: this.platform,
      appId: this.appId
    };
  }
};

// src/help/layout/types.ts
var HelpLayoutAriResourceOwner = "help", HelpLayoutAriResourceType = "layout";

// src/help/layout/manifest.ts
var helpLayoutAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: HelpLayoutAriResourceOwner,
  resourceType: HelpLayoutAriResourceType,
  resourceIdSlug: "{activationId}/{layoutId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    layoutId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/help/layout/index.ts
var HelpLayoutAri = class _HelpLayoutAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._layoutId = opts.resourceIdSegmentValues.layoutId;
  }
  get activationId() {
    return this._activationId;
  }
  get layoutId() {
    return this._layoutId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: helpLayoutAriStaticOpts.qualifier,
      platformQualifier: helpLayoutAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: helpLayoutAriStaticOpts.resourceOwner,
      resourceType: helpLayoutAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.layoutId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        layoutId: opts.layoutId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, helpLayoutAriStaticOpts);
    return new _HelpLayoutAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, helpLayoutAriStaticOpts);
    return new _HelpLayoutAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      layoutId: this.layoutId
    };
  }
};

// src/help/portal/types.ts
var HelpPortalAriResourceOwner = "help", HelpPortalAriResourceType = "portal";

// src/help/portal/manifest.ts
var helpPortalAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: HelpPortalAriResourceOwner,
  resourceType: HelpPortalAriResourceType,
  resourceIdSlug: "{activationId}/{helpObjectId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    helpObjectId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/help/portal/index.ts
var HelpPortalAri = class _HelpPortalAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._helpObjectId = opts.resourceIdSegmentValues.helpObjectId;
  }
  get activationId() {
    return this._activationId;
  }
  get helpObjectId() {
    return this._helpObjectId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: helpPortalAriStaticOpts.qualifier,
      platformQualifier: helpPortalAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: helpPortalAriStaticOpts.resourceOwner,
      resourceType: helpPortalAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.helpObjectId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        helpObjectId: opts.helpObjectId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, helpPortalAriStaticOpts);
    return new _HelpPortalAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, helpPortalAriStaticOpts);
    return new _HelpPortalAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      helpObjectId: this.helpObjectId
    };
  }
};

// src/help/request-form/types.ts
var HelpRequestFormAriResourceOwner = "help", HelpRequestFormAriResourceType = "request-form";

// src/help/request-form/manifest.ts
var helpRequestFormAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: HelpRequestFormAriResourceOwner,
  resourceType: HelpRequestFormAriResourceType,
  resourceIdSlug: "{activationId}/{helpObjectId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    helpObjectId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/help/request-form/index.ts
var HelpRequestFormAri = class _HelpRequestFormAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._helpObjectId = opts.resourceIdSegmentValues.helpObjectId;
  }
  get activationId() {
    return this._activationId;
  }
  get helpObjectId() {
    return this._helpObjectId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: helpRequestFormAriStaticOpts.qualifier,
      platformQualifier: helpRequestFormAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: helpRequestFormAriStaticOpts.resourceOwner,
      resourceType: helpRequestFormAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.helpObjectId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        helpObjectId: opts.helpObjectId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, helpRequestFormAriStaticOpts);
    return new _HelpRequestFormAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, helpRequestFormAriStaticOpts);
    return new _HelpRequestFormAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      helpObjectId: this.helpObjectId
    };
  }
};

// src/help/channel/types.ts
var HelpChannelAriResourceOwner = "help", HelpChannelAriResourceType = "channel";

// src/help/channel/manifest.ts
var helpChannelAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: HelpChannelAriResourceOwner,
  resourceType: HelpChannelAriResourceType,
  resourceIdSlug: "{activationId}/{helpObjectId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    helpObjectId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/help/channel/index.ts
var HelpChannelAri = class _HelpChannelAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._helpObjectId = opts.resourceIdSegmentValues.helpObjectId;
  }
  get activationId() {
    return this._activationId;
  }
  get helpObjectId() {
    return this._helpObjectId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: helpChannelAriStaticOpts.qualifier,
      platformQualifier: helpChannelAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: helpChannelAriStaticOpts.resourceOwner,
      resourceType: helpChannelAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.helpObjectId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        helpObjectId: opts.helpObjectId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, helpChannelAriStaticOpts);
    return new _HelpChannelAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, helpChannelAriStaticOpts);
    return new _HelpChannelAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      helpObjectId: this.helpObjectId
    };
  }
};

// src/help/help-center/types.ts
var HelpHelpCenterAriResourceOwner = "help", HelpHelpCenterAriResourceType = "help-center";

// src/help/help-center/manifest.ts
var helpHelpCenterAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: HelpHelpCenterAriResourceOwner,
  resourceType: HelpHelpCenterAriResourceType,
  resourceIdSlug: "{activationId}/{helpCenterId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    helpCenterId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/help/help-center/index.ts
var HelpHelpCenterAri = class _HelpHelpCenterAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._helpCenterId = opts.resourceIdSegmentValues.helpCenterId;
  }
  get activationId() {
    return this._activationId;
  }
  get helpCenterId() {
    return this._helpCenterId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: helpHelpCenterAriStaticOpts.qualifier,
      platformQualifier: helpHelpCenterAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: helpHelpCenterAriStaticOpts.resourceOwner,
      resourceType: helpHelpCenterAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.helpCenterId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        helpCenterId: opts.helpCenterId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, helpHelpCenterAriStaticOpts);
    return new _HelpHelpCenterAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, helpHelpCenterAriStaticOpts);
    return new _HelpHelpCenterAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      helpCenterId: this.helpCenterId
    };
  }
};

// src/help/help-desk/types.ts
var HelpHelpDeskAriResourceOwner = "help", HelpHelpDeskAriResourceType = "help-desk";

// src/help/help-desk/manifest.ts
var helpHelpDeskAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: HelpHelpDeskAriResourceOwner,
  resourceType: HelpHelpDeskAriResourceType,
  resourceIdSlug: "{activationId}/{helpDeskId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    helpDeskId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/help/help-desk/index.ts
var HelpHelpDeskAri = class _HelpHelpDeskAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._helpDeskId = opts.resourceIdSegmentValues.helpDeskId;
  }
  get activationId() {
    return this._activationId;
  }
  get helpDeskId() {
    return this._helpDeskId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: helpHelpDeskAriStaticOpts.qualifier,
      platformQualifier: helpHelpDeskAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: helpHelpDeskAriStaticOpts.resourceOwner,
      resourceType: helpHelpDeskAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.helpDeskId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        helpDeskId: opts.helpDeskId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, helpHelpDeskAriStaticOpts);
    return new _HelpHelpDeskAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, helpHelpDeskAriStaticOpts);
    return new _HelpHelpDeskAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      helpDeskId: this.helpDeskId
    };
  }
};

// src/help/article/types.ts
var HelpArticleAriResourceOwner = "help", HelpArticleAriResourceType = "article";

// src/help/article/manifest.ts
var helpArticleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: HelpArticleAriResourceOwner,
  resourceType: HelpArticleAriResourceType,
  resourceIdSlug: "{activationId}/{helpObjectId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    helpObjectId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/help/article/index.ts
var HelpArticleAri = class _HelpArticleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._helpObjectId = opts.resourceIdSegmentValues.helpObjectId;
  }
  get activationId() {
    return this._activationId;
  }
  get helpObjectId() {
    return this._helpObjectId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: helpArticleAriStaticOpts.qualifier,
      platformQualifier: helpArticleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: helpArticleAriStaticOpts.resourceOwner,
      resourceType: helpArticleAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}/${opts.helpObjectId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        helpObjectId: opts.helpObjectId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, helpArticleAriStaticOpts);
    return new _HelpArticleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, helpArticleAriStaticOpts);
    return new _HelpArticleAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      helpObjectId: this.helpObjectId
    };
  }
};

// src/graph/vulnerability-history/types.ts
var GraphVulnerabilityHistoryAriResourceOwner = "graph", GraphVulnerabilityHistoryAriResourceType = "vulnerability-history";

// src/graph/vulnerability-history/manifest.ts
var graphVulnerabilityHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphVulnerabilityHistoryAriResourceOwner,
  resourceType: GraphVulnerabilityHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{vulnerabilityId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    vulnerabilityId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/vulnerability-history/index.ts
var GraphVulnerabilityHistoryAri = class _GraphVulnerabilityHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._vulnerabilityId = opts.resourceIdSegmentValues.vulnerabilityId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get vulnerabilityId() {
    return this._vulnerabilityId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphVulnerabilityHistoryAriStaticOpts.qualifier,
      platformQualifier: graphVulnerabilityHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphVulnerabilityHistoryAriStaticOpts.resourceOwner,
      resourceType: graphVulnerabilityHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.vulnerabilityId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        vulnerabilityId: opts.vulnerabilityId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphVulnerabilityHistoryAriStaticOpts);
    return new _GraphVulnerabilityHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphVulnerabilityHistoryAriStaticOpts);
    return new _GraphVulnerabilityHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      vulnerabilityId: this.vulnerabilityId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/vulnerability/types.ts
var GraphVulnerabilityAriResourceOwner = "graph", GraphVulnerabilityAriResourceType = "vulnerability";

// src/graph/vulnerability/manifest.ts
var graphVulnerabilityAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphVulnerabilityAriResourceOwner,
  resourceType: GraphVulnerabilityAriResourceType,
  resourceIdSlug: "activation/{activationId}/{vulnerabilityId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    vulnerabilityId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/vulnerability/index.ts
var GraphVulnerabilityAri = class _GraphVulnerabilityAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._vulnerabilityId = opts.resourceIdSegmentValues.vulnerabilityId;
  }
  get activationId() {
    return this._activationId;
  }
  get vulnerabilityId() {
    return this._vulnerabilityId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphVulnerabilityAriStaticOpts.qualifier,
      platformQualifier: graphVulnerabilityAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphVulnerabilityAriStaticOpts.resourceOwner,
      resourceType: graphVulnerabilityAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.vulnerabilityId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        vulnerabilityId: opts.vulnerabilityId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphVulnerabilityAriStaticOpts);
    return new _GraphVulnerabilityAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphVulnerabilityAriStaticOpts);
    return new _GraphVulnerabilityAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      vulnerabilityId: this.vulnerabilityId
    };
  }
};

// src/graph/workspace/types.ts
var GraphWorkspaceAriResourceOwner = "graph", GraphWorkspaceAriResourceType = "workspace";

// src/graph/workspace/manifest.ts
var graphWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphWorkspaceAriResourceOwner,
  resourceType: GraphWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/workspace/index.ts
var GraphWorkspaceAri = class _GraphWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphWorkspaceAriStaticOpts.qualifier,
      platformQualifier: graphWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphWorkspaceAriStaticOpts.resourceOwner,
      resourceType: graphWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphWorkspaceAriStaticOpts);
    return new _GraphWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphWorkspaceAriStaticOpts);
    return new _GraphWorkspaceAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId
    };
  }
};

// src/graph/service-and-operations-team-relationship/types.ts
var GraphServiceAndOperationsTeamRelationshipAriResourceOwner = "graph", GraphServiceAndOperationsTeamRelationshipAriResourceType = "service-and-operations-team-relationship";

// src/graph/service-and-operations-team-relationship/manifest.ts
var graphServiceAndOperationsTeamRelationshipAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphServiceAndOperationsTeamRelationshipAriResourceOwner,
  resourceType: GraphServiceAndOperationsTeamRelationshipAriResourceType,
  resourceIdSlug: "{workspaceId}/{relationshipId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    relationshipId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/service-and-operations-team-relationship/index.ts
var GraphServiceAndOperationsTeamRelationshipAri = class _GraphServiceAndOperationsTeamRelationshipAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._relationshipId = opts.resourceIdSegmentValues.relationshipId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get relationshipId() {
    return this._relationshipId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphServiceAndOperationsTeamRelationshipAriStaticOpts.qualifier,
      platformQualifier: graphServiceAndOperationsTeamRelationshipAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphServiceAndOperationsTeamRelationshipAriStaticOpts.resourceOwner,
      resourceType: graphServiceAndOperationsTeamRelationshipAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.relationshipId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        relationshipId: opts.relationshipId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphServiceAndOperationsTeamRelationshipAriStaticOpts);
    return new _GraphServiceAndOperationsTeamRelationshipAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphServiceAndOperationsTeamRelationshipAriStaticOpts);
    return new _GraphServiceAndOperationsTeamRelationshipAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      relationshipId: this.relationshipId
    };
  }
};

// src/graph/service-and-vcs-repository-relationship/types.ts
var GraphServiceAndVcsRepositoryRelationshipAriResourceOwner = "graph", GraphServiceAndVcsRepositoryRelationshipAriResourceType = "service-and-vcs-repository-relationship";

// src/graph/service-and-vcs-repository-relationship/manifest.ts
var graphServiceAndVcsRepositoryRelationshipAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphServiceAndVcsRepositoryRelationshipAriResourceOwner,
  resourceType: GraphServiceAndVcsRepositoryRelationshipAriResourceType,
  resourceIdSlug: "{workspaceId}/{relationshipId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    relationshipId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/service-and-vcs-repository-relationship/index.ts
var GraphServiceAndVcsRepositoryRelationshipAri = class _GraphServiceAndVcsRepositoryRelationshipAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._relationshipId = opts.resourceIdSegmentValues.relationshipId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get relationshipId() {
    return this._relationshipId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphServiceAndVcsRepositoryRelationshipAriStaticOpts.qualifier,
      platformQualifier: graphServiceAndVcsRepositoryRelationshipAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphServiceAndVcsRepositoryRelationshipAriStaticOpts.resourceOwner,
      resourceType: graphServiceAndVcsRepositoryRelationshipAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.relationshipId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        relationshipId: opts.relationshipId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphServiceAndVcsRepositoryRelationshipAriStaticOpts);
    return new _GraphServiceAndVcsRepositoryRelationshipAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphServiceAndVcsRepositoryRelationshipAriStaticOpts);
    return new _GraphServiceAndVcsRepositoryRelationshipAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      relationshipId: this.relationshipId
    };
  }
};

// src/graph/service-relationship/types.ts
var GraphServiceRelationshipAriResourceOwner = "graph", GraphServiceRelationshipAriResourceType = "service-relationship";

// src/graph/service-relationship/manifest.ts
var graphServiceRelationshipAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphServiceRelationshipAriResourceOwner,
  resourceType: GraphServiceRelationshipAriResourceType,
  resourceIdSlug: "{workspaceId}/{relationshipId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    relationshipId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/service-relationship/index.ts
var GraphServiceRelationshipAri = class _GraphServiceRelationshipAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._relationshipId = opts.resourceIdSegmentValues.relationshipId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get relationshipId() {
    return this._relationshipId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphServiceRelationshipAriStaticOpts.qualifier,
      platformQualifier: graphServiceRelationshipAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphServiceRelationshipAriStaticOpts.resourceOwner,
      resourceType: graphServiceRelationshipAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.relationshipId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        relationshipId: opts.relationshipId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphServiceRelationshipAriStaticOpts);
    return new _GraphServiceRelationshipAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphServiceRelationshipAriStaticOpts);
    return new _GraphServiceRelationshipAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      relationshipId: this.relationshipId
    };
  }
};

// src/graph/service/types.ts
var GraphServiceAriResourceOwner = "graph", GraphServiceAriResourceType = "service";

// src/graph/service/manifest.ts
var graphServiceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphServiceAriResourceOwner,
  resourceType: GraphServiceAriResourceType,
  resourceIdSlug: "{workspaceId}/{serviceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    serviceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/service/index.ts
var GraphServiceAri = class _GraphServiceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._serviceId = opts.resourceIdSegmentValues.serviceId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get serviceId() {
    return this._serviceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphServiceAriStaticOpts.qualifier,
      platformQualifier: graphServiceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphServiceAriStaticOpts.resourceOwner,
      resourceType: graphServiceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.serviceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        serviceId: opts.serviceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphServiceAriStaticOpts);
    return new _GraphServiceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphServiceAriStaticOpts);
    return new _GraphServiceAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      serviceId: this.serviceId
    };
  }
};

// src/graph/repository/types.ts
var GraphRepositoryAriResourceOwner = "graph", GraphRepositoryAriResourceType = "repository";

// src/graph/repository/manifest.ts
var graphRepositoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphRepositoryAriResourceOwner,
  resourceType: GraphRepositoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{repositoryId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    repositoryId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/repository/index.ts
var GraphRepositoryAri = class _GraphRepositoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._repositoryId = opts.resourceIdSegmentValues.repositoryId;
  }
  get activationId() {
    return this._activationId;
  }
  get repositoryId() {
    return this._repositoryId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphRepositoryAriStaticOpts.qualifier,
      platformQualifier: graphRepositoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphRepositoryAriStaticOpts.resourceOwner,
      resourceType: graphRepositoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.repositoryId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        repositoryId: opts.repositoryId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphRepositoryAriStaticOpts);
    return new _GraphRepositoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphRepositoryAriStaticOpts);
    return new _GraphRepositoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      repositoryId: this.repositoryId
    };
  }
};

// src/graph/security-container/types.ts
var GraphSecurityContainerAriResourceOwner = "graph", GraphSecurityContainerAriResourceType = "security-container";

// src/graph/security-container/manifest.ts
var graphSecurityContainerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphSecurityContainerAriResourceOwner,
  resourceType: GraphSecurityContainerAriResourceType,
  resourceIdSlug: "activation/{activationId}/{providerAppId}/{securityContainerId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    providerAppId: /[a-zA-Z0-9-._]+/,
    // eslint-disable-line no-useless-escape
    securityContainerId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/security-container/index.ts
var GraphSecurityContainerAri = class _GraphSecurityContainerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._providerAppId = opts.resourceIdSegmentValues.providerAppId, this._securityContainerId = opts.resourceIdSegmentValues.securityContainerId;
  }
  get activationId() {
    return this._activationId;
  }
  get providerAppId() {
    return this._providerAppId;
  }
  get securityContainerId() {
    return this._securityContainerId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphSecurityContainerAriStaticOpts.qualifier,
      platformQualifier: graphSecurityContainerAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphSecurityContainerAriStaticOpts.resourceOwner,
      resourceType: graphSecurityContainerAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.providerAppId}/${opts.securityContainerId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        providerAppId: opts.providerAppId,
        securityContainerId: opts.securityContainerId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphSecurityContainerAriStaticOpts);
    return new _GraphSecurityContainerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphSecurityContainerAriStaticOpts);
    return new _GraphSecurityContainerAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      providerAppId: this.providerAppId,
      securityContainerId: this.securityContainerId
    };
  }
};

// src/graph/security-workspace/types.ts
var GraphSecurityWorkspaceAriResourceOwner = "graph", GraphSecurityWorkspaceAriResourceType = "security-workspace";

// src/graph/security-workspace/manifest.ts
var graphSecurityWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphSecurityWorkspaceAriResourceOwner,
  resourceType: GraphSecurityWorkspaceAriResourceType,
  resourceIdSlug: "activation/{activationId}/{providerAppId}/{securityWorkspaceId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    providerAppId: /[a-zA-Z0-9-._]+/,
    // eslint-disable-line no-useless-escape
    securityWorkspaceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/security-workspace/index.ts
var GraphSecurityWorkspaceAri = class _GraphSecurityWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._providerAppId = opts.resourceIdSegmentValues.providerAppId, this._securityWorkspaceId = opts.resourceIdSegmentValues.securityWorkspaceId;
  }
  get activationId() {
    return this._activationId;
  }
  get providerAppId() {
    return this._providerAppId;
  }
  get securityWorkspaceId() {
    return this._securityWorkspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphSecurityWorkspaceAriStaticOpts.qualifier,
      platformQualifier: graphSecurityWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphSecurityWorkspaceAriStaticOpts.resourceOwner,
      resourceType: graphSecurityWorkspaceAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.providerAppId}/${opts.securityWorkspaceId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        providerAppId: opts.providerAppId,
        securityWorkspaceId: opts.securityWorkspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphSecurityWorkspaceAriStaticOpts);
    return new _GraphSecurityWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphSecurityWorkspaceAriStaticOpts);
    return new _GraphSecurityWorkspaceAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      providerAppId: this.providerAppId,
      securityWorkspaceId: this.securityWorkspaceId
    };
  }
};

// src/graph/service-and-jira-project-relationship/types.ts
var GraphServiceAndJiraProjectRelationshipAriResourceOwner = "graph", GraphServiceAndJiraProjectRelationshipAriResourceType = "service-and-jira-project-relationship";

// src/graph/service-and-jira-project-relationship/manifest.ts
var graphServiceAndJiraProjectRelationshipAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphServiceAndJiraProjectRelationshipAriResourceOwner,
  resourceType: GraphServiceAndJiraProjectRelationshipAriResourceType,
  resourceIdSlug: "{workspaceId}/{relationshipId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    relationshipId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/service-and-jira-project-relationship/index.ts
var GraphServiceAndJiraProjectRelationshipAri = class _GraphServiceAndJiraProjectRelationshipAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._relationshipId = opts.resourceIdSegmentValues.relationshipId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get relationshipId() {
    return this._relationshipId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphServiceAndJiraProjectRelationshipAriStaticOpts.qualifier,
      platformQualifier: graphServiceAndJiraProjectRelationshipAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphServiceAndJiraProjectRelationshipAriStaticOpts.resourceOwner,
      resourceType: graphServiceAndJiraProjectRelationshipAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.relationshipId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        relationshipId: opts.relationshipId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphServiceAndJiraProjectRelationshipAriStaticOpts);
    return new _GraphServiceAndJiraProjectRelationshipAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphServiceAndJiraProjectRelationshipAriStaticOpts);
    return new _GraphServiceAndJiraProjectRelationshipAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      relationshipId: this.relationshipId
    };
  }
};

// src/graph/pull-request-history/types.ts
var GraphPullRequestHistoryAriResourceOwner = "graph", GraphPullRequestHistoryAriResourceType = "pull-request-history";

// src/graph/pull-request-history/manifest.ts
var graphPullRequestHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphPullRequestHistoryAriResourceOwner,
  resourceType: GraphPullRequestHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{pullRequestId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    pullRequestId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/pull-request-history/index.ts
var GraphPullRequestHistoryAri = class _GraphPullRequestHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._pullRequestId = opts.resourceIdSegmentValues.pullRequestId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get pullRequestId() {
    return this._pullRequestId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphPullRequestHistoryAriStaticOpts.qualifier,
      platformQualifier: graphPullRequestHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphPullRequestHistoryAriStaticOpts.resourceOwner,
      resourceType: graphPullRequestHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.pullRequestId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        pullRequestId: opts.pullRequestId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphPullRequestHistoryAriStaticOpts);
    return new _GraphPullRequestHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphPullRequestHistoryAriStaticOpts);
    return new _GraphPullRequestHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      pullRequestId: this.pullRequestId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/pull-request/types.ts
var GraphPullRequestAriResourceOwner = "graph", GraphPullRequestAriResourceType = "pull-request";

// src/graph/pull-request/manifest.ts
var graphPullRequestAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphPullRequestAriResourceOwner,
  resourceType: GraphPullRequestAriResourceType,
  resourceIdSlug: "activation/{activationId}/{pullRequestId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    pullRequestId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/pull-request/index.ts
var GraphPullRequestAri = class _GraphPullRequestAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._pullRequestId = opts.resourceIdSegmentValues.pullRequestId;
  }
  get activationId() {
    return this._activationId;
  }
  get pullRequestId() {
    return this._pullRequestId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphPullRequestAriStaticOpts.qualifier,
      platformQualifier: graphPullRequestAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphPullRequestAriStaticOpts.resourceOwner,
      resourceType: graphPullRequestAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.pullRequestId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        pullRequestId: opts.pullRequestId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphPullRequestAriStaticOpts);
    return new _GraphPullRequestAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphPullRequestAriStaticOpts);
    return new _GraphPullRequestAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      pullRequestId: this.pullRequestId
    };
  }
};

// src/graph/remote-link-history/types.ts
var GraphRemoteLinkHistoryAriResourceOwner = "graph", GraphRemoteLinkHistoryAriResourceType = "remote-link-history";

// src/graph/remote-link-history/manifest.ts
var graphRemoteLinkHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphRemoteLinkHistoryAriResourceOwner,
  resourceType: GraphRemoteLinkHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{remoteLinkId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    remoteLinkId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/remote-link-history/index.ts
var GraphRemoteLinkHistoryAri = class _GraphRemoteLinkHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._remoteLinkId = opts.resourceIdSegmentValues.remoteLinkId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get remoteLinkId() {
    return this._remoteLinkId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphRemoteLinkHistoryAriStaticOpts.qualifier,
      platformQualifier: graphRemoteLinkHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphRemoteLinkHistoryAriStaticOpts.resourceOwner,
      resourceType: graphRemoteLinkHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.remoteLinkId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        remoteLinkId: opts.remoteLinkId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphRemoteLinkHistoryAriStaticOpts);
    return new _GraphRemoteLinkHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphRemoteLinkHistoryAriStaticOpts);
    return new _GraphRemoteLinkHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      remoteLinkId: this.remoteLinkId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/remote-link/types.ts
var GraphRemoteLinkAriResourceOwner = "graph", GraphRemoteLinkAriResourceType = "remote-link";

// src/graph/remote-link/manifest.ts
var graphRemoteLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphRemoteLinkAriResourceOwner,
  resourceType: GraphRemoteLinkAriResourceType,
  resourceIdSlug: "activation/{activationId}/{remoteLinkId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    remoteLinkId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/remote-link/index.ts
var GraphRemoteLinkAri = class _GraphRemoteLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._remoteLinkId = opts.resourceIdSegmentValues.remoteLinkId;
  }
  get activationId() {
    return this._activationId;
  }
  get remoteLinkId() {
    return this._remoteLinkId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphRemoteLinkAriStaticOpts.qualifier,
      platformQualifier: graphRemoteLinkAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphRemoteLinkAriStaticOpts.resourceOwner,
      resourceType: graphRemoteLinkAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.remoteLinkId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        remoteLinkId: opts.remoteLinkId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphRemoteLinkAriStaticOpts);
    return new _GraphRemoteLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphRemoteLinkAriStaticOpts);
    return new _GraphRemoteLinkAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      remoteLinkId: this.remoteLinkId
    };
  }
};

// src/graph/jira-project-and-vcs-repository-relationship/types.ts
var GraphJiraProjectAndVcsRepositoryRelationshipAriResourceOwner = "graph", GraphJiraProjectAndVcsRepositoryRelationshipAriResourceType = "jira-project-and-vcs-repository-relationship";

// src/graph/jira-project-and-vcs-repository-relationship/manifest.ts
var graphJiraProjectAndVcsRepositoryRelationshipAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphJiraProjectAndVcsRepositoryRelationshipAriResourceOwner,
  resourceType: GraphJiraProjectAndVcsRepositoryRelationshipAriResourceType,
  resourceIdSlug: "{workspaceId}/{relationshipId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    relationshipId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/jira-project-and-vcs-repository-relationship/index.ts
var GraphJiraProjectAndVcsRepositoryRelationshipAri = class _GraphJiraProjectAndVcsRepositoryRelationshipAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._relationshipId = opts.resourceIdSegmentValues.relationshipId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get relationshipId() {
    return this._relationshipId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphJiraProjectAndVcsRepositoryRelationshipAriStaticOpts.qualifier,
      platformQualifier: graphJiraProjectAndVcsRepositoryRelationshipAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphJiraProjectAndVcsRepositoryRelationshipAriStaticOpts.resourceOwner,
      resourceType: graphJiraProjectAndVcsRepositoryRelationshipAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.relationshipId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        relationshipId: opts.relationshipId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphJiraProjectAndVcsRepositoryRelationshipAriStaticOpts);
    return new _GraphJiraProjectAndVcsRepositoryRelationshipAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphJiraProjectAndVcsRepositoryRelationshipAriStaticOpts);
    return new _GraphJiraProjectAndVcsRepositoryRelationshipAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      relationshipId: this.relationshipId
    };
  }
};

// src/graph/operations-workspace/types.ts
var GraphOperationsWorkspaceAriResourceOwner = "graph", GraphOperationsWorkspaceAriResourceType = "operations-workspace";

// src/graph/operations-workspace/manifest.ts
var graphOperationsWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphOperationsWorkspaceAriResourceOwner,
  resourceType: GraphOperationsWorkspaceAriResourceType,
  resourceIdSlug: "activation/{activationId}/{providerAppId}/{operationsWorkspaceId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    providerAppId: /[a-zA-Z0-9-._]+/,
    // eslint-disable-line no-useless-escape
    operationsWorkspaceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/operations-workspace/index.ts
var GraphOperationsWorkspaceAri = class _GraphOperationsWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._providerAppId = opts.resourceIdSegmentValues.providerAppId, this._operationsWorkspaceId = opts.resourceIdSegmentValues.operationsWorkspaceId;
  }
  get activationId() {
    return this._activationId;
  }
  get providerAppId() {
    return this._providerAppId;
  }
  get operationsWorkspaceId() {
    return this._operationsWorkspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphOperationsWorkspaceAriStaticOpts.qualifier,
      platformQualifier: graphOperationsWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphOperationsWorkspaceAriStaticOpts.resourceOwner,
      resourceType: graphOperationsWorkspaceAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.providerAppId}/${opts.operationsWorkspaceId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        providerAppId: opts.providerAppId,
        operationsWorkspaceId: opts.operationsWorkspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphOperationsWorkspaceAriStaticOpts);
    return new _GraphOperationsWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphOperationsWorkspaceAriStaticOpts);
    return new _GraphOperationsWorkspaceAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      providerAppId: this.providerAppId,
      operationsWorkspaceId: this.operationsWorkspaceId
    };
  }
};

// src/graph/post-incident-review-history/types.ts
var GraphPostIncidentReviewHistoryAriResourceOwner = "graph", GraphPostIncidentReviewHistoryAriResourceType = "post-incident-review-history";

// src/graph/post-incident-review-history/manifest.ts
var graphPostIncidentReviewHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphPostIncidentReviewHistoryAriResourceOwner,
  resourceType: GraphPostIncidentReviewHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{postIncidentReviewId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    postIncidentReviewId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/post-incident-review-history/index.ts
var GraphPostIncidentReviewHistoryAri = class _GraphPostIncidentReviewHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._postIncidentReviewId = opts.resourceIdSegmentValues.postIncidentReviewId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get postIncidentReviewId() {
    return this._postIncidentReviewId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphPostIncidentReviewHistoryAriStaticOpts.qualifier,
      platformQualifier: graphPostIncidentReviewHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphPostIncidentReviewHistoryAriStaticOpts.resourceOwner,
      resourceType: graphPostIncidentReviewHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.postIncidentReviewId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        postIncidentReviewId: opts.postIncidentReviewId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphPostIncidentReviewHistoryAriStaticOpts);
    return new _GraphPostIncidentReviewHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphPostIncidentReviewHistoryAriStaticOpts);
    return new _GraphPostIncidentReviewHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      postIncidentReviewId: this.postIncidentReviewId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/post-incident-review/types.ts
var GraphPostIncidentReviewAriResourceOwner = "graph", GraphPostIncidentReviewAriResourceType = "post-incident-review";

// src/graph/post-incident-review/manifest.ts
var graphPostIncidentReviewAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphPostIncidentReviewAriResourceOwner,
  resourceType: GraphPostIncidentReviewAriResourceType,
  resourceIdSlug: "activation/{activationId}/{postIncidentReviewId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    postIncidentReviewId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/post-incident-review/index.ts
var GraphPostIncidentReviewAri = class _GraphPostIncidentReviewAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._postIncidentReviewId = opts.resourceIdSegmentValues.postIncidentReviewId;
  }
  get activationId() {
    return this._activationId;
  }
  get postIncidentReviewId() {
    return this._postIncidentReviewId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphPostIncidentReviewAriStaticOpts.qualifier,
      platformQualifier: graphPostIncidentReviewAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphPostIncidentReviewAriStaticOpts.resourceOwner,
      resourceType: graphPostIncidentReviewAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.postIncidentReviewId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        postIncidentReviewId: opts.postIncidentReviewId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphPostIncidentReviewAriStaticOpts);
    return new _GraphPostIncidentReviewAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphPostIncidentReviewAriStaticOpts);
    return new _GraphPostIncidentReviewAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      postIncidentReviewId: this.postIncidentReviewId
    };
  }
};

// src/graph/jira-project-and-devops-tool-relationship/types.ts
var GraphJiraProjectAndDevopsToolRelationshipAriResourceOwner = "graph", GraphJiraProjectAndDevopsToolRelationshipAriResourceType = "jira-project-and-devops-tool-relationship";

// src/graph/jira-project-and-devops-tool-relationship/manifest.ts
var graphJiraProjectAndDevopsToolRelationshipAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphJiraProjectAndDevopsToolRelationshipAriResourceOwner,
  resourceType: GraphJiraProjectAndDevopsToolRelationshipAriResourceType,
  resourceIdSlug: "{workspaceId}/{relationshipId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    relationshipId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/jira-project-and-devops-tool-relationship/index.ts
var GraphJiraProjectAndDevopsToolRelationshipAri = class _GraphJiraProjectAndDevopsToolRelationshipAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._relationshipId = opts.resourceIdSegmentValues.relationshipId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get relationshipId() {
    return this._relationshipId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphJiraProjectAndDevopsToolRelationshipAriStaticOpts.qualifier,
      platformQualifier: graphJiraProjectAndDevopsToolRelationshipAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphJiraProjectAndDevopsToolRelationshipAriStaticOpts.resourceOwner,
      resourceType: graphJiraProjectAndDevopsToolRelationshipAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.relationshipId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        relationshipId: opts.relationshipId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphJiraProjectAndDevopsToolRelationshipAriStaticOpts);
    return new _GraphJiraProjectAndDevopsToolRelationshipAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphJiraProjectAndDevopsToolRelationshipAriStaticOpts);
    return new _GraphJiraProjectAndDevopsToolRelationshipAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      relationshipId: this.relationshipId
    };
  }
};

// src/graph/jira-project-and-documentation-space-relationship/types.ts
var GraphJiraProjectAndDocumentationSpaceRelationshipAriResourceOwner = "graph", GraphJiraProjectAndDocumentationSpaceRelationshipAriResourceType = "jira-project-and-documentation-space-relationship";

// src/graph/jira-project-and-documentation-space-relationship/manifest.ts
var graphJiraProjectAndDocumentationSpaceRelationshipAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphJiraProjectAndDocumentationSpaceRelationshipAriResourceOwner,
  resourceType: GraphJiraProjectAndDocumentationSpaceRelationshipAriResourceType,
  resourceIdSlug: "{workspaceId}/{relationshipId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    relationshipId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/jira-project-and-documentation-space-relationship/index.ts
var GraphJiraProjectAndDocumentationSpaceRelationshipAri = class _GraphJiraProjectAndDocumentationSpaceRelationshipAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._relationshipId = opts.resourceIdSegmentValues.relationshipId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get relationshipId() {
    return this._relationshipId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphJiraProjectAndDocumentationSpaceRelationshipAriStaticOpts.qualifier,
      platformQualifier: graphJiraProjectAndDocumentationSpaceRelationshipAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphJiraProjectAndDocumentationSpaceRelationshipAriStaticOpts.resourceOwner,
      resourceType: graphJiraProjectAndDocumentationSpaceRelationshipAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.relationshipId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        relationshipId: opts.relationshipId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphJiraProjectAndDocumentationSpaceRelationshipAriStaticOpts);
    return new _GraphJiraProjectAndDocumentationSpaceRelationshipAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphJiraProjectAndDocumentationSpaceRelationshipAriStaticOpts);
    return new _GraphJiraProjectAndDocumentationSpaceRelationshipAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      relationshipId: this.relationshipId
    };
  }
};

// src/graph/jira-project-and-operations-team-relationship/types.ts
var GraphJiraProjectAndOperationsTeamRelationshipAriResourceOwner = "graph", GraphJiraProjectAndOperationsTeamRelationshipAriResourceType = "jira-project-and-operations-team-relationship";

// src/graph/jira-project-and-operations-team-relationship/manifest.ts
var graphJiraProjectAndOperationsTeamRelationshipAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphJiraProjectAndOperationsTeamRelationshipAriResourceOwner,
  resourceType: GraphJiraProjectAndOperationsTeamRelationshipAriResourceType,
  resourceIdSlug: "{workspaceId}/{relationshipId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    relationshipId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/jira-project-and-operations-team-relationship/index.ts
var GraphJiraProjectAndOperationsTeamRelationshipAri = class _GraphJiraProjectAndOperationsTeamRelationshipAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._relationshipId = opts.resourceIdSegmentValues.relationshipId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get relationshipId() {
    return this._relationshipId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphJiraProjectAndOperationsTeamRelationshipAriStaticOpts.qualifier,
      platformQualifier: graphJiraProjectAndOperationsTeamRelationshipAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphJiraProjectAndOperationsTeamRelationshipAriStaticOpts.resourceOwner,
      resourceType: graphJiraProjectAndOperationsTeamRelationshipAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.relationshipId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        relationshipId: opts.relationshipId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphJiraProjectAndOperationsTeamRelationshipAriStaticOpts);
    return new _GraphJiraProjectAndOperationsTeamRelationshipAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphJiraProjectAndOperationsTeamRelationshipAriStaticOpts);
    return new _GraphJiraProjectAndOperationsTeamRelationshipAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      relationshipId: this.relationshipId
    };
  }
};

// src/graph/jira-project-and-vcs-repository-relationship-temp-migration/types.ts
var GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriResourceOwner = "graph", GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriResourceType = "jira-project-and-vcs-repository-relationship-temp-migration";

// src/graph/jira-project-and-vcs-repository-relationship-temp-migration/manifest.ts
var graphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriResourceOwner,
  resourceType: GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriResourceType,
  resourceIdSlug: "{siteId}/{projectId}/{activationId}/{repositoryId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    projectId: /[0-9]+/,
    // eslint-disable-line no-useless-escape
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    repositoryId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/jira-project-and-vcs-repository-relationship-temp-migration/index.ts
var GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAri = class _GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId, this._projectId = opts.resourceIdSegmentValues.projectId, this._activationId = opts.resourceIdSegmentValues.activationId, this._repositoryId = opts.resourceIdSegmentValues.repositoryId;
  }
  get siteId() {
    return this._siteId;
  }
  get projectId() {
    return this._projectId;
  }
  get activationId() {
    return this._activationId;
  }
  get repositoryId() {
    return this._repositoryId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriStaticOpts.qualifier,
      platformQualifier: graphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriStaticOpts.resourceOwner,
      resourceType: graphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}/${opts.projectId}/${opts.activationId}/${opts.repositoryId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId,
        projectId: opts.projectId,
        activationId: opts.activationId,
        repositoryId: opts.repositoryId
      }
    }, ariOpts = AriParser.fromOpts(
      derivedOpts,
      graphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriStaticOpts
    );
    return new _GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphJiraProjectAndVcsRepositoryRelationshipTempMigrationAriStaticOpts);
    return new _GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      projectId: this.projectId,
      activationId: this.activationId,
      repositoryId: this.repositoryId
    };
  }
};

// src/graph/feature-flag-history/types.ts
var GraphFeatureFlagHistoryAriResourceOwner = "graph", GraphFeatureFlagHistoryAriResourceType = "feature-flag-history";

// src/graph/feature-flag-history/manifest.ts
var graphFeatureFlagHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphFeatureFlagHistoryAriResourceOwner,
  resourceType: GraphFeatureFlagHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{featureFlagId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    featureFlagId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/feature-flag-history/index.ts
var GraphFeatureFlagHistoryAri = class _GraphFeatureFlagHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._featureFlagId = opts.resourceIdSegmentValues.featureFlagId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get featureFlagId() {
    return this._featureFlagId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphFeatureFlagHistoryAriStaticOpts.qualifier,
      platformQualifier: graphFeatureFlagHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphFeatureFlagHistoryAriStaticOpts.resourceOwner,
      resourceType: graphFeatureFlagHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.featureFlagId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        featureFlagId: opts.featureFlagId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphFeatureFlagHistoryAriStaticOpts);
    return new _GraphFeatureFlagHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphFeatureFlagHistoryAriStaticOpts);
    return new _GraphFeatureFlagHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      featureFlagId: this.featureFlagId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/feature-flag/types.ts
var GraphFeatureFlagAriResourceOwner = "graph", GraphFeatureFlagAriResourceType = "feature-flag";

// src/graph/feature-flag/manifest.ts
var graphFeatureFlagAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphFeatureFlagAriResourceOwner,
  resourceType: GraphFeatureFlagAriResourceType,
  resourceIdSlug: "activation/{activationId}/{featureFlagId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    featureFlagId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/feature-flag/index.ts
var GraphFeatureFlagAri = class _GraphFeatureFlagAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._featureFlagId = opts.resourceIdSegmentValues.featureFlagId;
  }
  get activationId() {
    return this._activationId;
  }
  get featureFlagId() {
    return this._featureFlagId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphFeatureFlagAriStaticOpts.qualifier,
      platformQualifier: graphFeatureFlagAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphFeatureFlagAriStaticOpts.resourceOwner,
      resourceType: graphFeatureFlagAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.featureFlagId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        featureFlagId: opts.featureFlagId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphFeatureFlagAriStaticOpts);
    return new _GraphFeatureFlagAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphFeatureFlagAriStaticOpts);
    return new _GraphFeatureFlagAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      featureFlagId: this.featureFlagId
    };
  }
};

// src/graph/incident-history/types.ts
var GraphIncidentHistoryAriResourceOwner = "graph", GraphIncidentHistoryAriResourceType = "incident-history";

// src/graph/incident-history/manifest.ts
var graphIncidentHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphIncidentHistoryAriResourceOwner,
  resourceType: GraphIncidentHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{incidentId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    incidentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/incident-history/index.ts
var GraphIncidentHistoryAri = class _GraphIncidentHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._incidentId = opts.resourceIdSegmentValues.incidentId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get incidentId() {
    return this._incidentId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphIncidentHistoryAriStaticOpts.qualifier,
      platformQualifier: graphIncidentHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphIncidentHistoryAriStaticOpts.resourceOwner,
      resourceType: graphIncidentHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.incidentId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        incidentId: opts.incidentId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphIncidentHistoryAriStaticOpts);
    return new _GraphIncidentHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphIncidentHistoryAriStaticOpts);
    return new _GraphIncidentHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      incidentId: this.incidentId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/incident/types.ts
var GraphIncidentAriResourceOwner = "graph", GraphIncidentAriResourceType = "incident";

// src/graph/incident/manifest.ts
var graphIncidentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphIncidentAriResourceOwner,
  resourceType: GraphIncidentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{incidentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    incidentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/incident/index.ts
var GraphIncidentAri = class _GraphIncidentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._incidentId = opts.resourceIdSegmentValues.incidentId;
  }
  get activationId() {
    return this._activationId;
  }
  get incidentId() {
    return this._incidentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphIncidentAriStaticOpts.qualifier,
      platformQualifier: graphIncidentAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphIncidentAriStaticOpts.resourceOwner,
      resourceType: graphIncidentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.incidentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        incidentId: opts.incidentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphIncidentAriStaticOpts);
    return new _GraphIncidentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphIncidentAriStaticOpts);
    return new _GraphIncidentAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      incidentId: this.incidentId
    };
  }
};

// src/graph/design/types.ts
var GraphDesignAriResourceOwner = "graph", GraphDesignAriResourceType = "design";

// src/graph/design/manifest.ts
var graphDesignAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphDesignAriResourceOwner,
  resourceType: GraphDesignAriResourceType,
  resourceIdSlug: "activation/{activationId}/{designId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    designId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/design/index.ts
var GraphDesignAri = class _GraphDesignAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._designId = opts.resourceIdSegmentValues.designId;
  }
  get activationId() {
    return this._activationId;
  }
  get designId() {
    return this._designId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphDesignAriStaticOpts.qualifier,
      platformQualifier: graphDesignAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphDesignAriStaticOpts.resourceOwner,
      resourceType: graphDesignAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.designId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        designId: opts.designId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphDesignAriStaticOpts);
    return new _GraphDesignAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphDesignAriStaticOpts);
    return new _GraphDesignAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      designId: this.designId
    };
  }
};

// src/graph/devops-component/types.ts
var GraphDevopsComponentAriResourceOwner = "graph", GraphDevopsComponentAriResourceType = "devops-component";

// src/graph/devops-component/manifest.ts
var graphDevopsComponentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphDevopsComponentAriResourceOwner,
  resourceType: GraphDevopsComponentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{devopsComponentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    devopsComponentId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/devops-component/index.ts
var GraphDevopsComponentAri = class _GraphDevopsComponentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._devopsComponentId = opts.resourceIdSegmentValues.devopsComponentId;
  }
  get activationId() {
    return this._activationId;
  }
  get devopsComponentId() {
    return this._devopsComponentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphDevopsComponentAriStaticOpts.qualifier,
      platformQualifier: graphDevopsComponentAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphDevopsComponentAriStaticOpts.resourceOwner,
      resourceType: graphDevopsComponentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.devopsComponentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        devopsComponentId: opts.devopsComponentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphDevopsComponentAriStaticOpts);
    return new _GraphDevopsComponentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphDevopsComponentAriStaticOpts);
    return new _GraphDevopsComponentAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      devopsComponentId: this.devopsComponentId
    };
  }
};

// src/graph/document-history/types.ts
var GraphDocumentHistoryAriResourceOwner = "graph", GraphDocumentHistoryAriResourceType = "document-history";

// src/graph/document-history/manifest.ts
var graphDocumentHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphDocumentHistoryAriResourceOwner,
  resourceType: GraphDocumentHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{documentId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    documentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/document-history/index.ts
var GraphDocumentHistoryAri = class _GraphDocumentHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._documentId = opts.resourceIdSegmentValues.documentId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get documentId() {
    return this._documentId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphDocumentHistoryAriStaticOpts.qualifier,
      platformQualifier: graphDocumentHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphDocumentHistoryAriStaticOpts.resourceOwner,
      resourceType: graphDocumentHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.documentId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        documentId: opts.documentId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphDocumentHistoryAriStaticOpts);
    return new _GraphDocumentHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphDocumentHistoryAriStaticOpts);
    return new _GraphDocumentHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      documentId: this.documentId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/document/types.ts
var GraphDocumentAriResourceOwner = "graph", GraphDocumentAriResourceType = "document";

// src/graph/document/manifest.ts
var graphDocumentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphDocumentAriResourceOwner,
  resourceType: GraphDocumentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{documentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    documentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/document/index.ts
var GraphDocumentAri = class _GraphDocumentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._documentId = opts.resourceIdSegmentValues.documentId;
  }
  get activationId() {
    return this._activationId;
  }
  get documentId() {
    return this._documentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphDocumentAriStaticOpts.qualifier,
      platformQualifier: graphDocumentAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphDocumentAriStaticOpts.resourceOwner,
      resourceType: graphDocumentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.documentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        documentId: opts.documentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphDocumentAriStaticOpts);
    return new _GraphDocumentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphDocumentAriStaticOpts);
    return new _GraphDocumentAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      documentId: this.documentId
    };
  }
};

// src/graph/commit/types.ts
var GraphCommitAriResourceOwner = "graph", GraphCommitAriResourceType = "commit";

// src/graph/commit/manifest.ts
var graphCommitAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphCommitAriResourceOwner,
  resourceType: GraphCommitAriResourceType,
  resourceIdSlug: "activation/{activationId}/{commitId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    commitId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/commit/index.ts
var GraphCommitAri = class _GraphCommitAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._commitId = opts.resourceIdSegmentValues.commitId;
  }
  get activationId() {
    return this._activationId;
  }
  get commitId() {
    return this._commitId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphCommitAriStaticOpts.qualifier,
      platformQualifier: graphCommitAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphCommitAriStaticOpts.resourceOwner,
      resourceType: graphCommitAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.commitId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        commitId: opts.commitId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphCommitAriStaticOpts);
    return new _GraphCommitAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphCommitAriStaticOpts);
    return new _GraphCommitAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      commitId: this.commitId
    };
  }
};

// src/graph/deployment-history/types.ts
var GraphDeploymentHistoryAriResourceOwner = "graph", GraphDeploymentHistoryAriResourceType = "deployment-history";

// src/graph/deployment-history/manifest.ts
var graphDeploymentHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphDeploymentHistoryAriResourceOwner,
  resourceType: GraphDeploymentHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{deploymentId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    deploymentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/deployment-history/index.ts
var GraphDeploymentHistoryAri = class _GraphDeploymentHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._deploymentId = opts.resourceIdSegmentValues.deploymentId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get deploymentId() {
    return this._deploymentId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphDeploymentHistoryAriStaticOpts.qualifier,
      platformQualifier: graphDeploymentHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphDeploymentHistoryAriStaticOpts.resourceOwner,
      resourceType: graphDeploymentHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.deploymentId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        deploymentId: opts.deploymentId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphDeploymentHistoryAriStaticOpts);
    return new _GraphDeploymentHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphDeploymentHistoryAriStaticOpts);
    return new _GraphDeploymentHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      deploymentId: this.deploymentId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/deployment/types.ts
var GraphDeploymentAriResourceOwner = "graph", GraphDeploymentAriResourceType = "deployment";

// src/graph/deployment/manifest.ts
var graphDeploymentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphDeploymentAriResourceOwner,
  resourceType: GraphDeploymentAriResourceType,
  resourceIdSlug: "activation/{activationId}/{deploymentId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    deploymentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/deployment/index.ts
var GraphDeploymentAri = class _GraphDeploymentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._deploymentId = opts.resourceIdSegmentValues.deploymentId;
  }
  get activationId() {
    return this._activationId;
  }
  get deploymentId() {
    return this._deploymentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphDeploymentAriStaticOpts.qualifier,
      platformQualifier: graphDeploymentAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphDeploymentAriStaticOpts.resourceOwner,
      resourceType: graphDeploymentAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.deploymentId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        deploymentId: opts.deploymentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphDeploymentAriStaticOpts);
    return new _GraphDeploymentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphDeploymentAriStaticOpts);
    return new _GraphDeploymentAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      deploymentId: this.deploymentId
    };
  }
};

// src/graph/design-history/types.ts
var GraphDesignHistoryAriResourceOwner = "graph", GraphDesignHistoryAriResourceType = "design-history";

// src/graph/design-history/manifest.ts
var graphDesignHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphDesignHistoryAriResourceOwner,
  resourceType: GraphDesignHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{designId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    designId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/design-history/index.ts
var GraphDesignHistoryAri = class _GraphDesignHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._designId = opts.resourceIdSegmentValues.designId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get designId() {
    return this._designId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphDesignHistoryAriStaticOpts.qualifier,
      platformQualifier: graphDesignHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphDesignHistoryAriStaticOpts.resourceOwner,
      resourceType: graphDesignHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.designId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        designId: opts.designId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphDesignHistoryAriStaticOpts);
    return new _GraphDesignHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphDesignHistoryAriStaticOpts);
    return new _GraphDesignHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      designId: this.designId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/branch-history/types.ts
var GraphBranchHistoryAriResourceOwner = "graph", GraphBranchHistoryAriResourceType = "branch-history";

// src/graph/branch-history/manifest.ts
var graphBranchHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphBranchHistoryAriResourceOwner,
  resourceType: GraphBranchHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{branchId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    branchId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/branch-history/index.ts
var GraphBranchHistoryAri = class _GraphBranchHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._branchId = opts.resourceIdSegmentValues.branchId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get branchId() {
    return this._branchId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphBranchHistoryAriStaticOpts.qualifier,
      platformQualifier: graphBranchHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphBranchHistoryAriStaticOpts.resourceOwner,
      resourceType: graphBranchHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.branchId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        branchId: opts.branchId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphBranchHistoryAriStaticOpts);
    return new _GraphBranchHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphBranchHistoryAriStaticOpts);
    return new _GraphBranchHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      branchId: this.branchId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/branch/types.ts
var GraphBranchAriResourceOwner = "graph", GraphBranchAriResourceType = "branch";

// src/graph/branch/manifest.ts
var graphBranchAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphBranchAriResourceOwner,
  resourceType: GraphBranchAriResourceType,
  resourceIdSlug: "activation/{activationId}/{branchId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    branchId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/branch/index.ts
var GraphBranchAri = class _GraphBranchAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._branchId = opts.resourceIdSegmentValues.branchId;
  }
  get activationId() {
    return this._activationId;
  }
  get branchId() {
    return this._branchId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphBranchAriStaticOpts.qualifier,
      platformQualifier: graphBranchAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphBranchAriStaticOpts.resourceOwner,
      resourceType: graphBranchAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.branchId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        branchId: opts.branchId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphBranchAriStaticOpts);
    return new _GraphBranchAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphBranchAriStaticOpts);
    return new _GraphBranchAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      branchId: this.branchId
    };
  }
};

// src/graph/build-history/types.ts
var GraphBuildHistoryAriResourceOwner = "graph", GraphBuildHistoryAriResourceType = "build-history";

// src/graph/build-history/manifest.ts
var graphBuildHistoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphBuildHistoryAriResourceOwner,
  resourceType: GraphBuildHistoryAriResourceType,
  resourceIdSlug: "activation/{activationId}/{buildId}/{updateSequenceNumber}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    buildId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    updateSequenceNumber: /\d+/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/build-history/index.ts
var GraphBuildHistoryAri = class _GraphBuildHistoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._buildId = opts.resourceIdSegmentValues.buildId, this._updateSequenceNumber = opts.resourceIdSegmentValues.updateSequenceNumber;
  }
  get activationId() {
    return this._activationId;
  }
  get buildId() {
    return this._buildId;
  }
  get updateSequenceNumber() {
    return this._updateSequenceNumber;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphBuildHistoryAriStaticOpts.qualifier,
      platformQualifier: graphBuildHistoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphBuildHistoryAriStaticOpts.resourceOwner,
      resourceType: graphBuildHistoryAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.buildId}/${opts.updateSequenceNumber}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        buildId: opts.buildId,
        updateSequenceNumber: opts.updateSequenceNumber
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphBuildHistoryAriStaticOpts);
    return new _GraphBuildHistoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphBuildHistoryAriStaticOpts);
    return new _GraphBuildHistoryAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      buildId: this.buildId,
      updateSequenceNumber: this.updateSequenceNumber
    };
  }
};

// src/graph/build/types.ts
var GraphBuildAriResourceOwner = "graph", GraphBuildAriResourceType = "build";

// src/graph/build/manifest.ts
var graphBuildAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: GraphBuildAriResourceOwner,
  resourceType: GraphBuildAriResourceType,
  resourceIdSlug: "activation/{activationId}/{buildId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    buildId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/graph/build/index.ts
var GraphBuildAri = class _GraphBuildAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._activationId = opts.resourceIdSegmentValues.activationId, this._buildId = opts.resourceIdSegmentValues.buildId;
  }
  get activationId() {
    return this._activationId;
  }
  get buildId() {
    return this._buildId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: graphBuildAriStaticOpts.qualifier,
      platformQualifier: graphBuildAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: graphBuildAriStaticOpts.resourceOwner,
      resourceType: graphBuildAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.buildId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        buildId: opts.buildId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, graphBuildAriStaticOpts);
    return new _GraphBuildAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, graphBuildAriStaticOpts);
    return new _GraphBuildAri(opts);
  }
  getVariables() {
    return {
      activationId: this.activationId,
      buildId: this.buildId
    };
  }
};

// src/google/form/types.ts
var GoogleFormAriResourceOwner = "google", GoogleFormAriResourceType = "form";

// src/google/form/manifest.ts
var googleFormAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "third-party",
  cloudId: new RegExp("^$"),
  resourceOwner: GoogleFormAriResourceOwner,
  resourceType: GoogleFormAriResourceType,
  resourceIdSlug: "{docId}",
  resourceIdSegmentFormats: {
    docId: /[a-zA-Z0-9_-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/google/form/index.ts
var GoogleFormAri = class _GoogleFormAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._docId = opts.resourceIdSegmentValues.docId;
  }
  get docId() {
    return this._docId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: googleFormAriStaticOpts.qualifier,
      platformQualifier: googleFormAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: googleFormAriStaticOpts.resourceOwner,
      resourceType: googleFormAriStaticOpts.resourceType,
      resourceId: `${opts.docId}`,
      resourceIdSegmentValues: {
        docId: opts.docId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, googleFormAriStaticOpts);
    return new _GoogleFormAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, googleFormAriStaticOpts);
    return new _GoogleFormAri(opts);
  }
  getVariables() {
    return {
      docId: this.docId
    };
  }
};

// src/google/presentation/types.ts
var GooglePresentationAriResourceOwner = "google", GooglePresentationAriResourceType = "presentation";

// src/google/presentation/manifest.ts
var googlePresentationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "third-party",
  cloudId: new RegExp("^$"),
  resourceOwner: GooglePresentationAriResourceOwner,
  resourceType: GooglePresentationAriResourceType,
  resourceIdSlug: "{docId}",
  resourceIdSegmentFormats: {
    docId: /[a-zA-Z0-9_-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/google/presentation/index.ts
var GooglePresentationAri = class _GooglePresentationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._docId = opts.resourceIdSegmentValues.docId;
  }
  get docId() {
    return this._docId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: googlePresentationAriStaticOpts.qualifier,
      platformQualifier: googlePresentationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: googlePresentationAriStaticOpts.resourceOwner,
      resourceType: googlePresentationAriStaticOpts.resourceType,
      resourceId: `${opts.docId}`,
      resourceIdSegmentValues: {
        docId: opts.docId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, googlePresentationAriStaticOpts);
    return new _GooglePresentationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, googlePresentationAriStaticOpts);
    return new _GooglePresentationAri(opts);
  }
  getVariables() {
    return {
      docId: this.docId
    };
  }
};

// src/google/spreadsheet/types.ts
var GoogleSpreadsheetAriResourceOwner = "google", GoogleSpreadsheetAriResourceType = "spreadsheet";

// src/google/spreadsheet/manifest.ts
var googleSpreadsheetAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "third-party",
  cloudId: new RegExp("^$"),
  resourceOwner: GoogleSpreadsheetAriResourceOwner,
  resourceType: GoogleSpreadsheetAriResourceType,
  resourceIdSlug: "{docId}",
  resourceIdSegmentFormats: {
    docId: /[a-zA-Z0-9_-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/google/spreadsheet/index.ts
var GoogleSpreadsheetAri = class _GoogleSpreadsheetAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._docId = opts.resourceIdSegmentValues.docId;
  }
  get docId() {
    return this._docId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: googleSpreadsheetAriStaticOpts.qualifier,
      platformQualifier: googleSpreadsheetAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: googleSpreadsheetAriStaticOpts.resourceOwner,
      resourceType: googleSpreadsheetAriStaticOpts.resourceType,
      resourceId: `${opts.docId}`,
      resourceIdSegmentValues: {
        docId: opts.docId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, googleSpreadsheetAriStaticOpts);
    return new _GoogleSpreadsheetAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, googleSpreadsheetAriStaticOpts);
    return new _GoogleSpreadsheetAri(opts);
  }
  getVariables() {
    return {
      docId: this.docId
    };
  }
};

// src/exus-external/user/types.ts
var ExusExternalUserAriResourceOwner = "exus-external", ExusExternalUserAriResourceType = "user";

// src/exus-external/user/manifest.ts
var exusExternalUserAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: ExusExternalUserAriResourceOwner,
  resourceType: ExusExternalUserAriResourceType,
  resourceIdSlug: "{thirdPartySource}/{thirdPartyUserId}",
  resourceIdSegmentFormats: {
    thirdPartySource: /[a-z0-9-]+/,
    // eslint-disable-line no-useless-escape
    thirdPartyUserId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/exus-external/user/index.ts
var ExusExternalUserAri = class _ExusExternalUserAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._thirdPartySource = opts.resourceIdSegmentValues.thirdPartySource, this._thirdPartyUserId = opts.resourceIdSegmentValues.thirdPartyUserId;
  }
  get thirdPartySource() {
    return this._thirdPartySource;
  }
  get thirdPartyUserId() {
    return this._thirdPartyUserId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: exusExternalUserAriStaticOpts.qualifier,
      platformQualifier: exusExternalUserAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: exusExternalUserAriStaticOpts.resourceOwner,
      resourceType: exusExternalUserAriStaticOpts.resourceType,
      resourceId: `${opts.thirdPartySource}/${opts.thirdPartyUserId}`,
      resourceIdSegmentValues: {
        thirdPartySource: opts.thirdPartySource,
        thirdPartyUserId: opts.thirdPartyUserId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, exusExternalUserAriStaticOpts);
    return new _ExusExternalUserAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, exusExternalUserAriStaticOpts);
    return new _ExusExternalUserAri(opts);
  }
  getVariables() {
    return {
      thirdPartySource: this.thirdPartySource,
      thirdPartyUserId: this.thirdPartyUserId
    };
  }
};

// src/figma/file/types.ts
var FigmaFileAriResourceOwner = "figma", FigmaFileAriResourceType = "file";

// src/figma/file/manifest.ts
var figmaFileAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "third-party",
  cloudId: new RegExp("^$"),
  resourceOwner: FigmaFileAriResourceOwner,
  resourceType: FigmaFileAriResourceType,
  resourceIdSlug: "{fileId}",
  resourceIdSegmentFormats: {
    fileId: /[A-z0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/figma/file/index.ts
var FigmaFileAri = class _FigmaFileAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._fileId = opts.resourceIdSegmentValues.fileId;
  }
  get fileId() {
    return this._fileId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: figmaFileAriStaticOpts.qualifier,
      platformQualifier: figmaFileAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: figmaFileAriStaticOpts.resourceOwner,
      resourceType: figmaFileAriStaticOpts.resourceType,
      resourceId: `${opts.fileId}`,
      resourceIdSegmentValues: {
        fileId: opts.fileId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, figmaFileAriStaticOpts);
    return new _FigmaFileAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, figmaFileAriStaticOpts);
    return new _FigmaFileAri(opts);
  }
  getVariables() {
    return {
      fileId: this.fileId
    };
  }
};

// src/google/document/types.ts
var GoogleDocumentAriResourceOwner = "google", GoogleDocumentAriResourceType = "document";

// src/google/document/manifest.ts
var googleDocumentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "third-party",
  cloudId: new RegExp("^$"),
  resourceOwner: GoogleDocumentAriResourceOwner,
  resourceType: GoogleDocumentAriResourceType,
  resourceIdSlug: "{docId}",
  resourceIdSegmentFormats: {
    docId: /[a-zA-Z0-9_-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/google/document/index.ts
var GoogleDocumentAri = class _GoogleDocumentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._docId = opts.resourceIdSegmentValues.docId;
  }
  get docId() {
    return this._docId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: googleDocumentAriStaticOpts.qualifier,
      platformQualifier: googleDocumentAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: googleDocumentAriStaticOpts.resourceOwner,
      resourceType: googleDocumentAriStaticOpts.resourceType,
      resourceId: `${opts.docId}`,
      resourceIdSegmentValues: {
        docId: opts.docId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, googleDocumentAriStaticOpts);
    return new _GoogleDocumentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, googleDocumentAriStaticOpts);
    return new _GoogleDocumentAri(opts);
  }
  getVariables() {
    return {
      docId: this.docId
    };
  }
};

// src/ecosystem/extension/types.ts
var EcosystemExtensionAriResourceOwner = "ecosystem", EcosystemExtensionAriResourceType = "extension";

// src/ecosystem/extension/manifest.ts
var ecosystemExtensionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: EcosystemExtensionAriResourceOwner,
  resourceType: EcosystemExtensionAriResourceType,
  resourceIdSlug: "{appId}/{environmentId}/{groupId}/{extensionKey}",
  resourceIdSegmentFormats: {
    appId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    environmentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    groupId: /([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}|static)/,
    // eslint-disable-line no-useless-escape
    extensionKey: /[a-zA-Z0-9-._]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/ecosystem/extension/index.ts
var EcosystemExtensionAri = class _EcosystemExtensionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._appId = opts.resourceIdSegmentValues.appId, this._environmentId = opts.resourceIdSegmentValues.environmentId, this._groupId = opts.resourceIdSegmentValues.groupId, this._extensionKey = opts.resourceIdSegmentValues.extensionKey;
  }
  get appId() {
    return this._appId;
  }
  get environmentId() {
    return this._environmentId;
  }
  get groupId() {
    return this._groupId;
  }
  get extensionKey() {
    return this._extensionKey;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: ecosystemExtensionAriStaticOpts.qualifier,
      platformQualifier: ecosystemExtensionAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: ecosystemExtensionAriStaticOpts.resourceOwner,
      resourceType: ecosystemExtensionAriStaticOpts.resourceType,
      resourceId: `${opts.appId}/${opts.environmentId}/${opts.groupId}/${opts.extensionKey}`,
      resourceIdSegmentValues: {
        appId: opts.appId,
        environmentId: opts.environmentId,
        groupId: opts.groupId,
        extensionKey: opts.extensionKey
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, ecosystemExtensionAriStaticOpts);
    return new _EcosystemExtensionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, ecosystemExtensionAriStaticOpts);
    return new _EcosystemExtensionAri(opts);
  }
  getVariables() {
    return {
      appId: this.appId,
      environmentId: this.environmentId,
      groupId: this.groupId,
      extensionKey: this.extensionKey
    };
  }
};

// src/elements/custom-emoji-metadata/types.ts
var ElementsCustomEmojiMetadataAriResourceOwner = "elements", ElementsCustomEmojiMetadataAriResourceType = "custom-emoji-metadata";

// src/elements/custom-emoji-metadata/manifest.ts
var elementsCustomEmojiMetadataAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: ElementsCustomEmojiMetadataAriResourceOwner,
  resourceType: ElementsCustomEmojiMetadataAriResourceType,
  resourceIdSlug: "{customEmojiMetadataId}",
  resourceIdSegmentFormats: {
    customEmojiMetadataId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/elements/custom-emoji-metadata/index.ts
var ElementsCustomEmojiMetadataAri = class _ElementsCustomEmojiMetadataAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._customEmojiMetadataId = opts.resourceIdSegmentValues.customEmojiMetadataId;
  }
  get customEmojiMetadataId() {
    return this._customEmojiMetadataId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: elementsCustomEmojiMetadataAriStaticOpts.qualifier,
      platformQualifier: elementsCustomEmojiMetadataAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: elementsCustomEmojiMetadataAriStaticOpts.resourceOwner,
      resourceType: elementsCustomEmojiMetadataAriStaticOpts.resourceType,
      resourceId: `${opts.customEmojiMetadataId}`,
      resourceIdSegmentValues: {
        customEmojiMetadataId: opts.customEmojiMetadataId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, elementsCustomEmojiMetadataAriStaticOpts);
    return new _ElementsCustomEmojiMetadataAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, elementsCustomEmojiMetadataAriStaticOpts);
    return new _ElementsCustomEmojiMetadataAri(opts);
  }
  getVariables() {
    return {
      customEmojiMetadataId: this.customEmojiMetadataId
    };
  }
};

// src/elements/workspace/types.ts
var ElementsWorkspaceAriResourceOwner = "elements", ElementsWorkspaceAriResourceType = "workspace";

// src/elements/workspace/manifest.ts
var elementsWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: ElementsWorkspaceAriResourceOwner,
  resourceType: ElementsWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/elements/workspace/index.ts
var ElementsWorkspaceAri = class _ElementsWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: elementsWorkspaceAriStaticOpts.qualifier,
      platformQualifier: elementsWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: elementsWorkspaceAriStaticOpts.resourceOwner,
      resourceType: elementsWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, elementsWorkspaceAriStaticOpts);
    return new _ElementsWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, elementsWorkspaceAriStaticOpts);
    return new _ElementsWorkspaceAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId
    };
  }
};

// src/ecosystem/app/types.ts
var EcosystemAppAriResourceOwner = "ecosystem", EcosystemAppAriResourceType = "app";

// src/ecosystem/app/manifest.ts
var ecosystemAppAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: EcosystemAppAriResourceOwner,
  resourceType: EcosystemAppAriResourceType,
  resourceIdSlug: "{appId}",
  resourceIdSegmentFormats: {
    appId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/ecosystem/app/index.ts
var EcosystemAppAri = class _EcosystemAppAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._appId = opts.resourceIdSegmentValues.appId;
  }
  get appId() {
    return this._appId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: ecosystemAppAriStaticOpts.qualifier,
      platformQualifier: ecosystemAppAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: ecosystemAppAriStaticOpts.resourceOwner,
      resourceType: ecosystemAppAriStaticOpts.resourceType,
      resourceId: `${opts.appId}`,
      resourceIdSegmentValues: {
        appId: opts.appId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, ecosystemAppAriStaticOpts);
    return new _EcosystemAppAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, ecosystemAppAriStaticOpts);
    return new _EcosystemAppAri(opts);
  }
  getVariables() {
    return {
      appId: this.appId
    };
  }
};

// src/ecosystem/connect-app/types.ts
var EcosystemConnectAppAriResourceOwner = "ecosystem", EcosystemConnectAppAriResourceType = "connect-app";

// src/ecosystem/connect-app/manifest.ts
var ecosystemConnectAppAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: EcosystemConnectAppAriResourceOwner,
  resourceType: EcosystemConnectAppAriResourceType,
  resourceIdSlug: "{appKey}",
  resourceIdSegmentFormats: {
    appKey: /[a-zA-Z0-9-._]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/ecosystem/connect-app/index.ts
var EcosystemConnectAppAri = class _EcosystemConnectAppAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._appKey = opts.resourceIdSegmentValues.appKey;
  }
  get appKey() {
    return this._appKey;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: ecosystemConnectAppAriStaticOpts.qualifier,
      platformQualifier: ecosystemConnectAppAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: ecosystemConnectAppAriStaticOpts.resourceOwner,
      resourceType: ecosystemConnectAppAriStaticOpts.resourceType,
      resourceId: `${opts.appKey}`,
      resourceIdSegmentValues: {
        appKey: opts.appKey
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, ecosystemConnectAppAriStaticOpts);
    return new _EcosystemConnectAppAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, ecosystemConnectAppAriStaticOpts);
    return new _EcosystemConnectAppAri(opts);
  }
  getVariables() {
    return {
      appKey: this.appKey
    };
  }
};

// src/ecosystem/environment/types.ts
var EcosystemEnvironmentAriResourceOwner = "ecosystem", EcosystemEnvironmentAriResourceType = "environment";

// src/ecosystem/environment/manifest.ts
var ecosystemEnvironmentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: EcosystemEnvironmentAriResourceOwner,
  resourceType: EcosystemEnvironmentAriResourceType,
  resourceIdSlug: "{appId}/{environmentId}",
  resourceIdSegmentFormats: {
    appId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    environmentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/ecosystem/environment/index.ts
var EcosystemEnvironmentAri = class _EcosystemEnvironmentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._appId = opts.resourceIdSegmentValues.appId, this._environmentId = opts.resourceIdSegmentValues.environmentId;
  }
  get appId() {
    return this._appId;
  }
  get environmentId() {
    return this._environmentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: ecosystemEnvironmentAriStaticOpts.qualifier,
      platformQualifier: ecosystemEnvironmentAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: ecosystemEnvironmentAriStaticOpts.resourceOwner,
      resourceType: ecosystemEnvironmentAriStaticOpts.resourceType,
      resourceId: `${opts.appId}/${opts.environmentId}`,
      resourceIdSegmentValues: {
        appId: opts.appId,
        environmentId: opts.environmentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, ecosystemEnvironmentAriStaticOpts);
    return new _EcosystemEnvironmentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, ecosystemEnvironmentAriStaticOpts);
    return new _EcosystemEnvironmentAri(opts);
  }
  getVariables() {
    return {
      appId: this.appId,
      environmentId: this.environmentId
    };
  }
};

// src/ecosystem/extension-group/types.ts
var EcosystemExtensionGroupAriResourceOwner = "ecosystem", EcosystemExtensionGroupAriResourceType = "extension-group";

// src/ecosystem/extension-group/manifest.ts
var ecosystemExtensionGroupAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: EcosystemExtensionGroupAriResourceOwner,
  resourceType: EcosystemExtensionGroupAriResourceType,
  resourceIdSlug: "{appId}/{environmentId}/{groupId}",
  resourceIdSegmentFormats: {
    appId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    environmentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    groupId: /([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}|static)/
    // eslint-disable-line no-useless-escape
  }
};

// src/ecosystem/extension-group/index.ts
var EcosystemExtensionGroupAri = class _EcosystemExtensionGroupAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._appId = opts.resourceIdSegmentValues.appId, this._environmentId = opts.resourceIdSegmentValues.environmentId, this._groupId = opts.resourceIdSegmentValues.groupId;
  }
  get appId() {
    return this._appId;
  }
  get environmentId() {
    return this._environmentId;
  }
  get groupId() {
    return this._groupId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: ecosystemExtensionGroupAriStaticOpts.qualifier,
      platformQualifier: ecosystemExtensionGroupAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: ecosystemExtensionGroupAriStaticOpts.resourceOwner,
      resourceType: ecosystemExtensionGroupAriStaticOpts.resourceType,
      resourceId: `${opts.appId}/${opts.environmentId}/${opts.groupId}`,
      resourceIdSegmentValues: {
        appId: opts.appId,
        environmentId: opts.environmentId,
        groupId: opts.groupId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, ecosystemExtensionGroupAriStaticOpts);
    return new _EcosystemExtensionGroupAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, ecosystemExtensionGroupAriStaticOpts);
    return new _EcosystemExtensionGroupAri(opts);
  }
  getVariables() {
    return {
      appId: this.appId,
      environmentId: this.environmentId,
      groupId: this.groupId
    };
  }
};

// src/ecosystem/app-environment-version/types.ts
var EcosystemAppEnvironmentVersionAriResourceOwner = "ecosystem", EcosystemAppEnvironmentVersionAriResourceType = "app-environment-version";

// src/ecosystem/app-environment-version/manifest.ts
var ecosystemAppEnvironmentVersionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: EcosystemAppEnvironmentVersionAriResourceOwner,
  resourceType: EcosystemAppEnvironmentVersionAriResourceType,
  resourceIdSlug: "{appId}/{environmentId}/{versionId}",
  resourceIdSegmentFormats: {
    appId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    environmentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    versionId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/ecosystem/app-environment-version/index.ts
var EcosystemAppEnvironmentVersionAri = class _EcosystemAppEnvironmentVersionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._appId = opts.resourceIdSegmentValues.appId, this._environmentId = opts.resourceIdSegmentValues.environmentId, this._versionId = opts.resourceIdSegmentValues.versionId;
  }
  get appId() {
    return this._appId;
  }
  get environmentId() {
    return this._environmentId;
  }
  get versionId() {
    return this._versionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: ecosystemAppEnvironmentVersionAriStaticOpts.qualifier,
      platformQualifier: ecosystemAppEnvironmentVersionAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: ecosystemAppEnvironmentVersionAriStaticOpts.resourceOwner,
      resourceType: ecosystemAppEnvironmentVersionAriStaticOpts.resourceType,
      resourceId: `${opts.appId}/${opts.environmentId}/${opts.versionId}`,
      resourceIdSegmentValues: {
        appId: opts.appId,
        environmentId: opts.environmentId,
        versionId: opts.versionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, ecosystemAppEnvironmentVersionAriStaticOpts);
    return new _EcosystemAppEnvironmentVersionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, ecosystemAppEnvironmentVersionAriStaticOpts);
    return new _EcosystemAppEnvironmentVersionAri(opts);
  }
  getVariables() {
    return {
      appId: this.appId,
      environmentId: this.environmentId,
      versionId: this.versionId
    };
  }
};

// src/data-lake/lake-connection/types.ts
var DataLakeLakeConnectionAriResourceOwner = "data-lake", DataLakeLakeConnectionAriResourceType = "lake-connection";

// src/data-lake/lake-connection/manifest.ts
var dataLakeLakeConnectionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: DataLakeLakeConnectionAriResourceOwner,
  resourceType: DataLakeLakeConnectionAriResourceType,
  resourceIdSlug: "{lakeConnectionId}",
  resourceIdSegmentFormats: {
    lakeConnectionId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/data-lake/lake-connection/index.ts
var DataLakeLakeConnectionAri = class _DataLakeLakeConnectionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._lakeConnectionId = opts.resourceIdSegmentValues.lakeConnectionId;
  }
  get lakeConnectionId() {
    return this._lakeConnectionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: dataLakeLakeConnectionAriStaticOpts.qualifier,
      platformQualifier: dataLakeLakeConnectionAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: dataLakeLakeConnectionAriStaticOpts.resourceOwner,
      resourceType: dataLakeLakeConnectionAriStaticOpts.resourceType,
      resourceId: `${opts.lakeConnectionId}`,
      resourceIdSegmentValues: {
        lakeConnectionId: opts.lakeConnectionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, dataLakeLakeConnectionAriStaticOpts);
    return new _DataLakeLakeConnectionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, dataLakeLakeConnectionAriStaticOpts);
    return new _DataLakeLakeConnectionAri(opts);
  }
  getVariables() {
    return {
      lakeConnectionId: this.lakeConnectionId
    };
  }
};

// src/devops/provider/types.ts
var DevopsProviderAriResourceOwner = "devops", DevopsProviderAriResourceType = "provider";

// src/devops/provider/manifest.ts
var devopsProviderAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: DevopsProviderAriResourceOwner,
  resourceType: DevopsProviderAriResourceType,
  resourceIdSlug: "{providerNamespace}/{providerAppId}",
  resourceIdSegmentFormats: {
    providerNamespace: /(classic|forge|asap|oauth)/,
    // eslint-disable-line no-useless-escape
    providerAppId: /[a-zA-Z0-9-._]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/devops/provider/index.ts
var DevopsProviderAri = class _DevopsProviderAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._providerNamespace = opts.resourceIdSegmentValues.providerNamespace, this._providerAppId = opts.resourceIdSegmentValues.providerAppId;
  }
  get providerNamespace() {
    return this._providerNamespace;
  }
  get providerAppId() {
    return this._providerAppId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: devopsProviderAriStaticOpts.qualifier,
      platformQualifier: devopsProviderAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: devopsProviderAriStaticOpts.resourceOwner,
      resourceType: devopsProviderAriStaticOpts.resourceType,
      resourceId: `${opts.providerNamespace}/${opts.providerAppId}`,
      resourceIdSegmentValues: {
        providerNamespace: opts.providerNamespace,
        providerAppId: opts.providerAppId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, devopsProviderAriStaticOpts);
    return new _DevopsProviderAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, devopsProviderAriStaticOpts);
    return new _DevopsProviderAri(opts);
  }
  getVariables() {
    return {
      providerNamespace: this.providerNamespace,
      providerAppId: this.providerAppId
    };
  }
};

// src/devops/relationship/types.ts
var DevopsRelationshipAriResourceOwner = "devops", DevopsRelationshipAriResourceType = "relationship";

// src/devops/relationship/manifest.ts
var devopsRelationshipAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: DevopsRelationshipAriResourceOwner,
  resourceType: DevopsRelationshipAriResourceType,
  resourceIdSlug: "{relationshipId}",
  resourceIdSegmentFormats: {
    relationshipId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/devops/relationship/index.ts
var DevopsRelationshipAri = class _DevopsRelationshipAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._relationshipId = opts.resourceIdSegmentValues.relationshipId;
  }
  get relationshipId() {
    return this._relationshipId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: devopsRelationshipAriStaticOpts.qualifier,
      platformQualifier: devopsRelationshipAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: devopsRelationshipAriStaticOpts.resourceOwner,
      resourceType: devopsRelationshipAriStaticOpts.resourceType,
      resourceId: `${opts.relationshipId}`,
      resourceIdSegmentValues: {
        relationshipId: opts.relationshipId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, devopsRelationshipAriStaticOpts);
    return new _DevopsRelationshipAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, devopsRelationshipAriStaticOpts);
    return new _DevopsRelationshipAri(opts);
  }
  getVariables() {
    return {
      relationshipId: this.relationshipId
    };
  }
};

// src/devops/tool/types.ts
var DevopsToolAriResourceOwner = "devops", DevopsToolAriResourceType = "tool";

// src/devops/tool/manifest.ts
var devopsToolAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: DevopsToolAriResourceOwner,
  resourceType: DevopsToolAriResourceType,
  resourceIdSlug: "{toolId}",
  resourceIdSegmentFormats: {
    toolId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/devops/tool/index.ts
var DevopsToolAri = class _DevopsToolAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._toolId = opts.resourceIdSegmentValues.toolId;
  }
  get siteId() {
    return this._siteId;
  }
  get toolId() {
    return this._toolId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: devopsToolAriStaticOpts.qualifier,
      platformQualifier: devopsToolAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: devopsToolAriStaticOpts.resourceOwner,
      resourceType: devopsToolAriStaticOpts.resourceType,
      resourceId: `${opts.toolId}`,
      resourceIdSegmentValues: {
        toolId: opts.toolId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, devopsToolAriStaticOpts);
    return new _DevopsToolAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, devopsToolAriStaticOpts);
    return new _DevopsToolAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      toolId: this.toolId
    };
  }
};

// src/devops/container/types.ts
var DevopsContainerAriResourceOwner = "devops", DevopsContainerAriResourceType = "container";

// src/devops/container/manifest.ts
var devopsContainerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: DevopsContainerAriResourceOwner,
  resourceType: DevopsContainerAriResourceType,
  resourceIdSlug: "{containerId}",
  resourceIdSegmentFormats: {
    containerId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/devops/container/index.ts
var DevopsContainerAri = class _DevopsContainerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._containerId = opts.resourceIdSegmentValues.containerId;
  }
  get siteId() {
    return this._siteId;
  }
  get containerId() {
    return this._containerId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: devopsContainerAriStaticOpts.qualifier,
      platformQualifier: devopsContainerAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: devopsContainerAriStaticOpts.resourceOwner,
      resourceType: devopsContainerAriStaticOpts.resourceType,
      resourceId: `${opts.containerId}`,
      resourceIdSegmentValues: {
        containerId: opts.containerId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, devopsContainerAriStaticOpts);
    return new _DevopsContainerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, devopsContainerAriStaticOpts);
    return new _DevopsContainerAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      containerId: this.containerId
    };
  }
};

// src/devops/namespace/types.ts
var DevopsNamespaceAriResourceOwner = "devops", DevopsNamespaceAriResourceType = "namespace";

// src/devops/namespace/manifest.ts
var devopsNamespaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: DevopsNamespaceAriResourceOwner,
  resourceType: DevopsNamespaceAriResourceType,
  resourceIdSlug: "{namespaceId}",
  resourceIdSegmentFormats: {
    namespaceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/devops/namespace/index.ts
var DevopsNamespaceAri = class _DevopsNamespaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._namespaceId = opts.resourceIdSegmentValues.namespaceId;
  }
  get siteId() {
    return this._siteId;
  }
  get namespaceId() {
    return this._namespaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: devopsNamespaceAriStaticOpts.qualifier,
      platformQualifier: devopsNamespaceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: devopsNamespaceAriStaticOpts.resourceOwner,
      resourceType: devopsNamespaceAriStaticOpts.resourceType,
      resourceId: `${opts.namespaceId}`,
      resourceIdSegmentValues: {
        namespaceId: opts.namespaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, devopsNamespaceAriStaticOpts);
    return new _DevopsNamespaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, devopsNamespaceAriStaticOpts);
    return new _DevopsNamespaceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      namespaceId: this.namespaceId
    };
  }
};

// src/conversational-help/conversation-message/types.ts
var ConversationalHelpConversationMessageAriResourceOwner = "conversational-help", ConversationalHelpConversationMessageAriResourceType = "conversation-message";

// src/conversational-help/conversation-message/manifest.ts
var conversationalHelpConversationMessageAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConversationalHelpConversationMessageAriResourceOwner,
  resourceType: ConversationalHelpConversationMessageAriResourceType,
  resourceIdSlug: "{conversationMessageId}",
  resourceIdSegmentFormats: {
    conversationMessageId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/conversational-help/conversation-message/index.ts
var ConversationalHelpConversationMessageAri = class _ConversationalHelpConversationMessageAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._conversationMessageId = opts.resourceIdSegmentValues.conversationMessageId;
  }
  get siteId() {
    return this._siteId;
  }
  get conversationMessageId() {
    return this._conversationMessageId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: conversationalHelpConversationMessageAriStaticOpts.qualifier,
      platformQualifier: conversationalHelpConversationMessageAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: conversationalHelpConversationMessageAriStaticOpts.resourceOwner,
      resourceType: conversationalHelpConversationMessageAriStaticOpts.resourceType,
      resourceId: `${opts.conversationMessageId}`,
      resourceIdSegmentValues: {
        conversationMessageId: opts.conversationMessageId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, conversationalHelpConversationMessageAriStaticOpts);
    return new _ConversationalHelpConversationMessageAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, conversationalHelpConversationMessageAriStaticOpts);
    return new _ConversationalHelpConversationMessageAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      conversationMessageId: this.conversationMessageId
    };
  }
};

// src/conversational-help/conversation/types.ts
var ConversationalHelpConversationAriResourceOwner = "conversational-help", ConversationalHelpConversationAriResourceType = "conversation";

// src/conversational-help/conversation/manifest.ts
var conversationalHelpConversationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConversationalHelpConversationAriResourceOwner,
  resourceType: ConversationalHelpConversationAriResourceType,
  resourceIdSlug: "{conversationId}",
  resourceIdSegmentFormats: {
    conversationId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/conversational-help/conversation/index.ts
var ConversationalHelpConversationAri = class _ConversationalHelpConversationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._conversationId = opts.resourceIdSegmentValues.conversationId;
  }
  get siteId() {
    return this._siteId;
  }
  get conversationId() {
    return this._conversationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: conversationalHelpConversationAriStaticOpts.qualifier,
      platformQualifier: conversationalHelpConversationAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: conversationalHelpConversationAriStaticOpts.resourceOwner,
      resourceType: conversationalHelpConversationAriStaticOpts.resourceType,
      resourceId: `${opts.conversationId}`,
      resourceIdSegmentValues: {
        conversationId: opts.conversationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, conversationalHelpConversationAriStaticOpts);
    return new _ConversationalHelpConversationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, conversationalHelpConversationAriStaticOpts);
    return new _ConversationalHelpConversationAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      conversationId: this.conversationId
    };
  }
};

// src/confluence/workspace/types.ts
var ConfluenceWorkspaceAriResourceOwner = "confluence", ConfluenceWorkspaceAriResourceType = "workspace";

// src/confluence/workspace/manifest.ts
var confluenceWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceWorkspaceAriResourceOwner,
  resourceType: ConfluenceWorkspaceAriResourceType,
  resourceIdSlug: "{activationId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/workspace/index.ts
var ConfluenceWorkspaceAri = class _ConfluenceWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceWorkspaceAriStaticOpts.qualifier,
      platformQualifier: confluenceWorkspaceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceWorkspaceAriStaticOpts.resourceOwner,
      resourceType: confluenceWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.activationId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceWorkspaceAriStaticOpts);
    return new _ConfluenceWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceWorkspaceAriStaticOpts);
    return new _ConfluenceWorkspaceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId
    };
  }
};

// src/confluence/task/types.ts
var ConfluenceTaskAriResourceOwner = "confluence", ConfluenceTaskAriResourceType = "task";

// src/confluence/task/manifest.ts
var confluenceTaskAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceTaskAriResourceOwner,
  resourceType: ConfluenceTaskAriResourceType,
  resourceIdSlug: "{taskId}",
  resourceIdSegmentFormats: {
    taskId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/task/index.ts
var ConfluenceTaskAri = class _ConfluenceTaskAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._taskId = opts.resourceIdSegmentValues.taskId;
  }
  get siteId() {
    return this._siteId;
  }
  get taskId() {
    return this._taskId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceTaskAriStaticOpts.qualifier,
      platformQualifier: confluenceTaskAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceTaskAriStaticOpts.resourceOwner,
      resourceType: confluenceTaskAriStaticOpts.resourceType,
      resourceId: `${opts.taskId}`,
      resourceIdSegmentValues: {
        taskId: opts.taskId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceTaskAriStaticOpts);
    return new _ConfluenceTaskAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceTaskAriStaticOpts);
    return new _ConfluenceTaskAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      taskId: this.taskId
    };
  }
};

// src/confluence/team-calendar/types.ts
var ConfluenceTeamCalendarAriResourceOwner = "confluence", ConfluenceTeamCalendarAriResourceType = "team-calendar";

// src/confluence/team-calendar/manifest.ts
var confluenceTeamCalendarAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceTeamCalendarAriResourceOwner,
  resourceType: ConfluenceTeamCalendarAriResourceType,
  resourceIdSlug: "activation/{activationId}/{calendarId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    calendarId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/team-calendar/index.ts
var ConfluenceTeamCalendarAri = class _ConfluenceTeamCalendarAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._calendarId = opts.resourceIdSegmentValues.calendarId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get calendarId() {
    return this._calendarId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceTeamCalendarAriStaticOpts.qualifier,
      platformQualifier: confluenceTeamCalendarAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceTeamCalendarAriStaticOpts.resourceOwner,
      resourceType: confluenceTeamCalendarAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.calendarId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        calendarId: opts.calendarId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceTeamCalendarAriStaticOpts);
    return new _ConfluenceTeamCalendarAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceTeamCalendarAriStaticOpts);
    return new _ConfluenceTeamCalendarAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      calendarId: this.calendarId
    };
  }
};

// src/confluence/user-property/types.ts
var ConfluenceUserPropertyAriResourceOwner = "confluence", ConfluenceUserPropertyAriResourceType = "user-property";

// src/confluence/user-property/manifest.ts
var confluenceUserPropertyAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceUserPropertyAriResourceOwner,
  resourceType: ConfluenceUserPropertyAriResourceType,
  resourceIdSlug: "{userPropertyId}",
  resourceIdSegmentFormats: {
    userPropertyId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/user-property/index.ts
var ConfluenceUserPropertyAri = class _ConfluenceUserPropertyAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._userPropertyId = opts.resourceIdSegmentValues.userPropertyId;
  }
  get siteId() {
    return this._siteId;
  }
  get userPropertyId() {
    return this._userPropertyId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceUserPropertyAriStaticOpts.qualifier,
      platformQualifier: confluenceUserPropertyAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceUserPropertyAriStaticOpts.resourceOwner,
      resourceType: confluenceUserPropertyAriStaticOpts.resourceType,
      resourceId: `${opts.userPropertyId}`,
      resourceIdSegmentValues: {
        userPropertyId: opts.userPropertyId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceUserPropertyAriStaticOpts);
    return new _ConfluenceUserPropertyAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceUserPropertyAriStaticOpts);
    return new _ConfluenceUserPropertyAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      userPropertyId: this.userPropertyId
    };
  }
};

// src/confluence/whiteboard/types.ts
var ConfluenceWhiteboardAriResourceOwner = "confluence", ConfluenceWhiteboardAriResourceType = "whiteboard";

// src/confluence/whiteboard/manifest.ts
var confluenceWhiteboardAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceWhiteboardAriResourceOwner,
  resourceType: ConfluenceWhiteboardAriResourceType,
  resourceIdSlug: "{whiteboardId}",
  resourceIdSegmentFormats: {
    whiteboardId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/whiteboard/index.ts
var ConfluenceWhiteboardAri = class _ConfluenceWhiteboardAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._whiteboardId = opts.resourceIdSegmentValues.whiteboardId;
  }
  get siteId() {
    return this._siteId;
  }
  get whiteboardId() {
    return this._whiteboardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceWhiteboardAriStaticOpts.qualifier,
      platformQualifier: confluenceWhiteboardAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceWhiteboardAriStaticOpts.resourceOwner,
      resourceType: confluenceWhiteboardAriStaticOpts.resourceType,
      resourceId: `${opts.whiteboardId}`,
      resourceIdSegmentValues: {
        whiteboardId: opts.whiteboardId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceWhiteboardAriStaticOpts);
    return new _ConfluenceWhiteboardAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceWhiteboardAriStaticOpts);
    return new _ConfluenceWhiteboardAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      whiteboardId: this.whiteboardId
    };
  }
};

// src/confluence/public-link/types.ts
var ConfluencePublicLinkAriResourceOwner = "confluence", ConfluencePublicLinkAriResourceType = "public-link";

// src/confluence/public-link/manifest.ts
var confluencePublicLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluencePublicLinkAriResourceOwner,
  resourceType: ConfluencePublicLinkAriResourceType,
  resourceIdSlug: "activation/{activationId}/{publicLinkId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    publicLinkId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/public-link/index.ts
var ConfluencePublicLinkAri = class _ConfluencePublicLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._publicLinkId = opts.resourceIdSegmentValues.publicLinkId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get publicLinkId() {
    return this._publicLinkId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluencePublicLinkAriStaticOpts.qualifier,
      platformQualifier: confluencePublicLinkAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluencePublicLinkAriStaticOpts.resourceOwner,
      resourceType: confluencePublicLinkAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.publicLinkId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        publicLinkId: opts.publicLinkId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluencePublicLinkAriStaticOpts);
    return new _ConfluencePublicLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluencePublicLinkAriStaticOpts);
    return new _ConfluencePublicLinkAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      publicLinkId: this.publicLinkId
    };
  }
};

// src/confluence/role/types.ts
var ConfluenceRoleAriResourceOwner = "confluence", ConfluenceRoleAriResourceType = "role";

// src/confluence/role/manifest.ts
var confluenceRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]*$"),
  resourceOwner: ConfluenceRoleAriResourceOwner,
  resourceType: ConfluenceRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/role/index.ts
var ConfluenceRoleAri = class _ConfluenceRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._optionalSiteId = opts.cloudId || "", this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get optionalSiteId() {
    return this._optionalSiteId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceRoleAriStaticOpts.qualifier,
      platformQualifier: confluenceRoleAriStaticOpts.platformQualifier,
      cloudId: opts.optionalSiteId,
      resourceOwner: confluenceRoleAriStaticOpts.resourceOwner,
      resourceType: confluenceRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceRoleAriStaticOpts);
    return new _ConfluenceRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceRoleAriStaticOpts);
    return new _ConfluenceRoleAri(opts);
  }
  getVariables() {
    return {
      optionalSiteId: this.optionalSiteId,
      roleId: this.roleId
    };
  }
};

// src/confluence/site/types.ts
var ConfluenceSiteAriResourceOwner = "confluence", ConfluenceSiteAriResourceType = "site";

// src/confluence/site/manifest.ts
var confluenceSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: ConfluenceSiteAriResourceOwner,
  resourceType: ConfluenceSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/site/index.ts
var ConfluenceSiteAri = class _ConfluenceSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceSiteAriStaticOpts.qualifier,
      platformQualifier: confluenceSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: confluenceSiteAriStaticOpts.resourceOwner,
      resourceType: confluenceSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceSiteAriStaticOpts);
    return new _ConfluenceSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceSiteAriStaticOpts);
    return new _ConfluenceSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/confluence/space/types.ts
var ConfluenceSpaceAriResourceOwner = "confluence", ConfluenceSpaceAriResourceType = "space";

// src/confluence/space/manifest.ts
var confluenceSpaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceSpaceAriResourceOwner,
  resourceType: ConfluenceSpaceAriResourceType,
  resourceIdSlug: "{spaceId}",
  resourceIdSegmentFormats: {
    spaceId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/space/index.ts
var ConfluenceSpaceAri = class _ConfluenceSpaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._spaceId = opts.resourceIdSegmentValues.spaceId;
  }
  get siteId() {
    return this._siteId;
  }
  get spaceId() {
    return this._spaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceSpaceAriStaticOpts.qualifier,
      platformQualifier: confluenceSpaceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceSpaceAriStaticOpts.resourceOwner,
      resourceType: confluenceSpaceAriStaticOpts.resourceType,
      resourceId: `${opts.spaceId}`,
      resourceIdSegmentValues: {
        spaceId: opts.spaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceSpaceAriStaticOpts);
    return new _ConfluenceSpaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceSpaceAriStaticOpts);
    return new _ConfluenceSpaceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      spaceId: this.spaceId
    };
  }
};

// src/confluence/event/types.ts
var ConfluenceEventAriResourceOwner = "confluence", ConfluenceEventAriResourceType = "event";

// src/confluence/event/manifest.ts
var confluenceEventAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceEventAriResourceOwner,
  resourceType: ConfluenceEventAriResourceType,
  resourceIdSlug: "{eventType}/activation/{activationId}/event/{eventId}",
  resourceIdSegmentFormats: {
    eventType: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    eventId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/event/index.ts
var ConfluenceEventAri = class _ConfluenceEventAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._eventType = opts.resourceIdSegmentValues.eventType, this._activationId = opts.resourceIdSegmentValues.activationId, this._eventId = opts.resourceIdSegmentValues.eventId;
  }
  get siteId() {
    return this._siteId;
  }
  get eventType() {
    return this._eventType;
  }
  get activationId() {
    return this._activationId;
  }
  get eventId() {
    return this._eventId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceEventAriStaticOpts.qualifier,
      platformQualifier: confluenceEventAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceEventAriStaticOpts.resourceOwner,
      resourceType: confluenceEventAriStaticOpts.resourceType,
      resourceId: `${opts.eventType}/activation/${opts.activationId}/event/${opts.eventId}`,
      resourceIdSegmentValues: {
        eventType: opts.eventType,
        activationId: opts.activationId,
        eventId: opts.eventId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceEventAriStaticOpts);
    return new _ConfluenceEventAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceEventAriStaticOpts);
    return new _ConfluenceEventAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      eventType: this.eventType,
      activationId: this.activationId,
      eventId: this.eventId
    };
  }
};

// src/confluence/long-running-task/types.ts
var ConfluenceLongRunningTaskAriResourceOwner = "confluence", ConfluenceLongRunningTaskAriResourceType = "long-running-task";

// src/confluence/long-running-task/manifest.ts
var confluenceLongRunningTaskAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceLongRunningTaskAriResourceOwner,
  resourceType: ConfluenceLongRunningTaskAriResourceType,
  resourceIdSlug: "activation/{activationId}/{taskId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    taskId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/long-running-task/index.ts
var ConfluenceLongRunningTaskAri = class _ConfluenceLongRunningTaskAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._taskId = opts.resourceIdSegmentValues.taskId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get taskId() {
    return this._taskId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceLongRunningTaskAriStaticOpts.qualifier,
      platformQualifier: confluenceLongRunningTaskAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceLongRunningTaskAriStaticOpts.resourceOwner,
      resourceType: confluenceLongRunningTaskAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.taskId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        taskId: opts.taskId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceLongRunningTaskAriStaticOpts);
    return new _ConfluenceLongRunningTaskAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceLongRunningTaskAriStaticOpts);
    return new _ConfluenceLongRunningTaskAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      taskId: this.taskId
    };
  }
};

// src/confluence/note/types.ts
var ConfluenceNoteAriResourceOwner = "confluence", ConfluenceNoteAriResourceType = "note";

// src/confluence/note/manifest.ts
var confluenceNoteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceNoteAriResourceOwner,
  resourceType: ConfluenceNoteAriResourceType,
  resourceIdSlug: "activation/{activationId}/{noteId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    noteId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/note/index.ts
var ConfluenceNoteAri = class _ConfluenceNoteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._noteId = opts.resourceIdSegmentValues.noteId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get noteId() {
    return this._noteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceNoteAriStaticOpts.qualifier,
      platformQualifier: confluenceNoteAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceNoteAriStaticOpts.resourceOwner,
      resourceType: confluenceNoteAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.noteId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        noteId: opts.noteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceNoteAriStaticOpts);
    return new _ConfluenceNoteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceNoteAriStaticOpts);
    return new _ConfluenceNoteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      noteId: this.noteId
    };
  }
};

// src/confluence/page/types.ts
var ConfluencePageAriResourceOwner = "confluence", ConfluencePageAriResourceType = "page";

// src/confluence/page/manifest.ts
var confluencePageAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluencePageAriResourceOwner,
  resourceType: ConfluencePageAriResourceType,
  resourceIdSlug: "{pageId}",
  resourceIdSegmentFormats: {
    pageId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/page/index.ts
var ConfluencePageAri = class _ConfluencePageAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._pageId = opts.resourceIdSegmentValues.pageId;
  }
  get siteId() {
    return this._siteId;
  }
  get pageId() {
    return this._pageId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluencePageAriStaticOpts.qualifier,
      platformQualifier: confluencePageAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluencePageAriStaticOpts.resourceOwner,
      resourceType: confluencePageAriStaticOpts.resourceType,
      resourceId: `${opts.pageId}`,
      resourceIdSegmentValues: {
        pageId: opts.pageId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluencePageAriStaticOpts);
    return new _ConfluencePageAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluencePageAriStaticOpts);
    return new _ConfluencePageAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      pageId: this.pageId
    };
  }
};

// src/confluence/comment/types.ts
var ConfluenceCommentAriResourceOwner = "confluence", ConfluenceCommentAriResourceType = "comment";

// src/confluence/comment/manifest.ts
var confluenceCommentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceCommentAriResourceOwner,
  resourceType: ConfluenceCommentAriResourceType,
  resourceIdSlug: "{commentId}",
  resourceIdSegmentFormats: {
    commentId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/comment/index.ts
var ConfluenceCommentAri = class _ConfluenceCommentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._commentId = opts.resourceIdSegmentValues.commentId;
  }
  get siteId() {
    return this._siteId;
  }
  get commentId() {
    return this._commentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceCommentAriStaticOpts.qualifier,
      platformQualifier: confluenceCommentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceCommentAriStaticOpts.resourceOwner,
      resourceType: confluenceCommentAriStaticOpts.resourceType,
      resourceId: `${opts.commentId}`,
      resourceIdSegmentValues: {
        commentId: opts.commentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceCommentAriStaticOpts);
    return new _ConfluenceCommentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceCommentAriStaticOpts);
    return new _ConfluenceCommentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      commentId: this.commentId
    };
  }
};

// src/confluence/content/types.ts
var ConfluenceContentAriResourceOwner = "confluence", ConfluenceContentAriResourceType = "content";

// src/confluence/content/manifest.ts
var confluenceContentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceContentAriResourceOwner,
  resourceType: ConfluenceContentAriResourceType,
  resourceIdSlug: "{contentId}",
  resourceIdSegmentFormats: {
    contentId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/content/index.ts
var ConfluenceContentAri = class _ConfluenceContentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._contentId = opts.resourceIdSegmentValues.contentId;
  }
  get siteId() {
    return this._siteId;
  }
  get contentId() {
    return this._contentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceContentAriStaticOpts.qualifier,
      platformQualifier: confluenceContentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceContentAriStaticOpts.resourceOwner,
      resourceType: confluenceContentAriStaticOpts.resourceType,
      resourceId: `${opts.contentId}`,
      resourceIdSegmentValues: {
        contentId: opts.contentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceContentAriStaticOpts);
    return new _ConfluenceContentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceContentAriStaticOpts);
    return new _ConfluenceContentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      contentId: this.contentId
    };
  }
};

// src/confluence/database/types.ts
var ConfluenceDatabaseAriResourceOwner = "confluence", ConfluenceDatabaseAriResourceType = "database";

// src/confluence/database/manifest.ts
var confluenceDatabaseAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceDatabaseAriResourceOwner,
  resourceType: ConfluenceDatabaseAriResourceType,
  resourceIdSlug: "activation/{activationId}/{databaseId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    databaseId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/database/index.ts
var ConfluenceDatabaseAri = class _ConfluenceDatabaseAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._databaseId = opts.resourceIdSegmentValues.databaseId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get databaseId() {
    return this._databaseId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceDatabaseAriStaticOpts.qualifier,
      platformQualifier: confluenceDatabaseAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceDatabaseAriStaticOpts.resourceOwner,
      resourceType: confluenceDatabaseAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.databaseId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        databaseId: opts.databaseId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceDatabaseAriStaticOpts);
    return new _ConfluenceDatabaseAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceDatabaseAriStaticOpts);
    return new _ConfluenceDatabaseAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      databaseId: this.databaseId
    };
  }
};

// src/confluence/embed/types.ts
var ConfluenceEmbedAriResourceOwner = "confluence", ConfluenceEmbedAriResourceType = "embed";

// src/confluence/embed/manifest.ts
var confluenceEmbedAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceEmbedAriResourceOwner,
  resourceType: ConfluenceEmbedAriResourceType,
  resourceIdSlug: "activation/{activationId}/{embedId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    embedId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/embed/index.ts
var ConfluenceEmbedAri = class _ConfluenceEmbedAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._embedId = opts.resourceIdSegmentValues.embedId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get embedId() {
    return this._embedId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceEmbedAriStaticOpts.qualifier,
      platformQualifier: confluenceEmbedAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceEmbedAriStaticOpts.resourceOwner,
      resourceType: confluenceEmbedAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.embedId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        embedId: opts.embedId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceEmbedAriStaticOpts);
    return new _ConfluenceEmbedAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceEmbedAriStaticOpts);
    return new _ConfluenceEmbedAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      embedId: this.embedId
    };
  }
};

// src/confluence/admin-announcement-banner/types.ts
var ConfluenceAdminAnnouncementBannerAriResourceOwner = "confluence", ConfluenceAdminAnnouncementBannerAriResourceType = "admin-announcement-banner";

// src/confluence/admin-announcement-banner/manifest.ts
var confluenceAdminAnnouncementBannerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceAdminAnnouncementBannerAriResourceOwner,
  resourceType: ConfluenceAdminAnnouncementBannerAriResourceType,
  resourceIdSlug: "activation/{activationId}/{bannerId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    bannerId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/admin-announcement-banner/index.ts
var ConfluenceAdminAnnouncementBannerAri = class _ConfluenceAdminAnnouncementBannerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._bannerId = opts.resourceIdSegmentValues.bannerId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get bannerId() {
    return this._bannerId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceAdminAnnouncementBannerAriStaticOpts.qualifier,
      platformQualifier: confluenceAdminAnnouncementBannerAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceAdminAnnouncementBannerAriStaticOpts.resourceOwner,
      resourceType: confluenceAdminAnnouncementBannerAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.bannerId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        bannerId: opts.bannerId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceAdminAnnouncementBannerAriStaticOpts);
    return new _ConfluenceAdminAnnouncementBannerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceAdminAnnouncementBannerAriStaticOpts);
    return new _ConfluenceAdminAnnouncementBannerAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      bannerId: this.bannerId
    };
  }
};

// src/confluence/attachment/types.ts
var ConfluenceAttachmentAriResourceOwner = "confluence", ConfluenceAttachmentAriResourceType = "attachment";

// src/confluence/attachment/manifest.ts
var confluenceAttachmentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceAttachmentAriResourceOwner,
  resourceType: ConfluenceAttachmentAriResourceType,
  resourceIdSlug: "{attachmentId}",
  resourceIdSegmentFormats: {
    attachmentId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/attachment/index.ts
var ConfluenceAttachmentAri = class _ConfluenceAttachmentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._attachmentId = opts.resourceIdSegmentValues.attachmentId;
  }
  get siteId() {
    return this._siteId;
  }
  get attachmentId() {
    return this._attachmentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceAttachmentAriStaticOpts.qualifier,
      platformQualifier: confluenceAttachmentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceAttachmentAriStaticOpts.resourceOwner,
      resourceType: confluenceAttachmentAriStaticOpts.resourceType,
      resourceId: `${opts.attachmentId}`,
      resourceIdSegmentValues: {
        attachmentId: opts.attachmentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceAttachmentAriStaticOpts);
    return new _ConfluenceAttachmentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceAttachmentAriStaticOpts);
    return new _ConfluenceAttachmentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      attachmentId: this.attachmentId
    };
  }
};

// src/confluence/blogpost/types.ts
var ConfluenceBlogpostAriResourceOwner = "confluence", ConfluenceBlogpostAriResourceType = "blogpost";

// src/confluence/blogpost/manifest.ts
var confluenceBlogpostAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: ConfluenceBlogpostAriResourceOwner,
  resourceType: ConfluenceBlogpostAriResourceType,
  resourceIdSlug: "{blogpostId}",
  resourceIdSegmentFormats: {
    blogpostId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/confluence/blogpost/index.ts
var ConfluenceBlogpostAri = class _ConfluenceBlogpostAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._blogpostId = opts.resourceIdSegmentValues.blogpostId;
  }
  get siteId() {
    return this._siteId;
  }
  get blogpostId() {
    return this._blogpostId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: confluenceBlogpostAriStaticOpts.qualifier,
      platformQualifier: confluenceBlogpostAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: confluenceBlogpostAriStaticOpts.resourceOwner,
      resourceType: confluenceBlogpostAriStaticOpts.resourceType,
      resourceId: `${opts.blogpostId}`,
      resourceIdSegmentValues: {
        blogpostId: opts.blogpostId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, confluenceBlogpostAriStaticOpts);
    return new _ConfluenceBlogpostAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, confluenceBlogpostAriStaticOpts);
    return new _ConfluenceBlogpostAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      blogpostId: this.blogpostId
    };
  }
};

// src/compass/workspace/types.ts
var CompassWorkspaceAriResourceOwner = "compass", CompassWorkspaceAriResourceType = "workspace";

// src/compass/workspace/manifest.ts
var compassWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassWorkspaceAriResourceOwner,
  resourceType: CompassWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/workspace/index.ts
var CompassWorkspaceAri = class _CompassWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassWorkspaceAriStaticOpts.qualifier,
      platformQualifier: compassWorkspaceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassWorkspaceAriStaticOpts.resourceOwner,
      resourceType: compassWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassWorkspaceAriStaticOpts);
    return new _CompassWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassWorkspaceAriStaticOpts);
    return new _CompassWorkspaceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId
    };
  }
};

// src/compass/scorecard/types.ts
var CompassScorecardAriResourceOwner = "compass", CompassScorecardAriResourceType = "scorecard";

// src/compass/scorecard/manifest.ts
var compassScorecardAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassScorecardAriResourceOwner,
  resourceType: CompassScorecardAriResourceType,
  resourceIdSlug: "{workspaceId}/{scorecardId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    scorecardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/scorecard/index.ts
var CompassScorecardAri = class _CompassScorecardAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._scorecardId = opts.resourceIdSegmentValues.scorecardId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get scorecardId() {
    return this._scorecardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassScorecardAriStaticOpts.qualifier,
      platformQualifier: compassScorecardAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassScorecardAriStaticOpts.resourceOwner,
      resourceType: compassScorecardAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.scorecardId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        scorecardId: opts.scorecardId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassScorecardAriStaticOpts);
    return new _CompassScorecardAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassScorecardAriStaticOpts);
    return new _CompassScorecardAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      scorecardId: this.scorecardId
    };
  }
};

// src/compass/site/types.ts
var CompassSiteAriResourceOwner = "compass", CompassSiteAriResourceType = "site";

// src/compass/site/manifest.ts
var compassSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CompassSiteAriResourceOwner,
  resourceType: CompassSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/site/index.ts
var CompassSiteAri = class _CompassSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassSiteAriStaticOpts.qualifier,
      platformQualifier: compassSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: compassSiteAriStaticOpts.resourceOwner,
      resourceType: compassSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassSiteAriStaticOpts);
    return new _CompassSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassSiteAriStaticOpts);
    return new _CompassSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/compass/user-defined-parameter/types.ts
var CompassUserDefinedParameterAriResourceOwner = "compass", CompassUserDefinedParameterAriResourceType = "user-defined-parameter";

// src/compass/user-defined-parameter/manifest.ts
var compassUserDefinedParameterAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassUserDefinedParameterAriResourceOwner,
  resourceType: CompassUserDefinedParameterAriResourceType,
  resourceIdSlug: "{workspaceId}/{userDefinedParameterId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    userDefinedParameterId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/user-defined-parameter/index.ts
var CompassUserDefinedParameterAri = class _CompassUserDefinedParameterAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._userDefinedParameterId = opts.resourceIdSegmentValues.userDefinedParameterId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get userDefinedParameterId() {
    return this._userDefinedParameterId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassUserDefinedParameterAriStaticOpts.qualifier,
      platformQualifier: compassUserDefinedParameterAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassUserDefinedParameterAriStaticOpts.resourceOwner,
      resourceType: compassUserDefinedParameterAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.userDefinedParameterId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        userDefinedParameterId: opts.userDefinedParameterId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassUserDefinedParameterAriStaticOpts);
    return new _CompassUserDefinedParameterAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassUserDefinedParameterAriStaticOpts);
    return new _CompassUserDefinedParameterAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      userDefinedParameterId: this.userDefinedParameterId
    };
  }
};

// src/compass/webhook/types.ts
var CompassWebhookAriResourceOwner = "compass", CompassWebhookAriResourceType = "webhook";

// src/compass/webhook/manifest.ts
var compassWebhookAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassWebhookAriResourceOwner,
  resourceType: CompassWebhookAriResourceType,
  resourceIdSlug: "{workspaceId}/{webhookId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    webhookId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/webhook/index.ts
var CompassWebhookAri = class _CompassWebhookAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._webhookId = opts.resourceIdSegmentValues.webhookId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get webhookId() {
    return this._webhookId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassWebhookAriStaticOpts.qualifier,
      platformQualifier: compassWebhookAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassWebhookAriStaticOpts.resourceOwner,
      resourceType: compassWebhookAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.webhookId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        webhookId: opts.webhookId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassWebhookAriStaticOpts);
    return new _CompassWebhookAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassWebhookAriStaticOpts);
    return new _CompassWebhookAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      webhookId: this.webhookId
    };
  }
};

// src/compass/metric-definition/types.ts
var CompassMetricDefinitionAriResourceOwner = "compass", CompassMetricDefinitionAriResourceType = "metric-definition";

// src/compass/metric-definition/manifest.ts
var compassMetricDefinitionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]*$"),
  resourceOwner: CompassMetricDefinitionAriResourceOwner,
  resourceType: CompassMetricDefinitionAriResourceType,
  resourceIdSlug: "{containerId}/{definitionId}",
  resourceIdSegmentFormats: {
    containerId: /(?:builtin|forge|[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})/,
    // eslint-disable-line no-useless-escape
    definitionId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/metric-definition/index.ts
var CompassMetricDefinitionAri = class _CompassMetricDefinitionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._optionalSiteId = opts.cloudId || "", this._containerId = opts.resourceIdSegmentValues.containerId, this._definitionId = opts.resourceIdSegmentValues.definitionId;
  }
  get optionalSiteId() {
    return this._optionalSiteId;
  }
  get containerId() {
    return this._containerId;
  }
  get definitionId() {
    return this._definitionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassMetricDefinitionAriStaticOpts.qualifier,
      platformQualifier: compassMetricDefinitionAriStaticOpts.platformQualifier,
      cloudId: opts.optionalSiteId,
      resourceOwner: compassMetricDefinitionAriStaticOpts.resourceOwner,
      resourceType: compassMetricDefinitionAriStaticOpts.resourceType,
      resourceId: `${opts.containerId}/${opts.definitionId}`,
      resourceIdSegmentValues: {
        containerId: opts.containerId,
        definitionId: opts.definitionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassMetricDefinitionAriStaticOpts);
    return new _CompassMetricDefinitionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassMetricDefinitionAriStaticOpts);
    return new _CompassMetricDefinitionAri(opts);
  }
  getVariables() {
    return {
      optionalSiteId: this.optionalSiteId,
      containerId: this.containerId,
      definitionId: this.definitionId
    };
  }
};

// src/compass/metric-source/types.ts
var CompassMetricSourceAriResourceOwner = "compass", CompassMetricSourceAriResourceType = "metric-source";

// src/compass/metric-source/manifest.ts
var compassMetricSourceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassMetricSourceAriResourceOwner,
  resourceType: CompassMetricSourceAriResourceType,
  resourceIdSlug: "{workspaceId}/{metricSourceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    metricSourceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/metric-source/index.ts
var CompassMetricSourceAri = class _CompassMetricSourceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._metricSourceId = opts.resourceIdSegmentValues.metricSourceId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get metricSourceId() {
    return this._metricSourceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassMetricSourceAriStaticOpts.qualifier,
      platformQualifier: compassMetricSourceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassMetricSourceAriStaticOpts.resourceOwner,
      resourceType: compassMetricSourceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.metricSourceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        metricSourceId: opts.metricSourceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassMetricSourceAriStaticOpts);
    return new _CompassMetricSourceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassMetricSourceAriStaticOpts);
    return new _CompassMetricSourceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      metricSourceId: this.metricSourceId
    };
  }
};

// src/compass/role/types.ts
var CompassRoleAriResourceOwner = "compass", CompassRoleAriResourceType = "role";

// src/compass/role/manifest.ts
var compassRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CompassRoleAriResourceOwner,
  resourceType: CompassRoleAriResourceType,
  resourceIdSlug: "product/{roleType}",
  resourceIdSegmentFormats: {
    roleType: /(?:basic|member|admin)/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/role/index.ts
var CompassRoleAri = class _CompassRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleType = opts.resourceIdSegmentValues.roleType;
  }
  get roleType() {
    return this._roleType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassRoleAriStaticOpts.qualifier,
      platformQualifier: compassRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: compassRoleAriStaticOpts.resourceOwner,
      resourceType: compassRoleAriStaticOpts.resourceType,
      resourceId: `product/${opts.roleType}`,
      resourceIdSegmentValues: {
        roleType: opts.roleType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassRoleAriStaticOpts);
    return new _CompassRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassRoleAriStaticOpts);
    return new _CompassRoleAri(opts);
  }
  getVariables() {
    return {
      roleType: this.roleType
    };
  }
};

// src/compass/component/types.ts
var CompassComponentAriResourceOwner = "compass", CompassComponentAriResourceType = "component";

// src/compass/component/manifest.ts
var compassComponentAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassComponentAriResourceOwner,
  resourceType: CompassComponentAriResourceType,
  resourceIdSlug: "{workspaceId}/{componentId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    componentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/component/index.ts
var CompassComponentAri = class _CompassComponentAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._componentId = opts.resourceIdSegmentValues.componentId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get componentId() {
    return this._componentId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassComponentAriStaticOpts.qualifier,
      platformQualifier: compassComponentAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassComponentAriStaticOpts.resourceOwner,
      resourceType: compassComponentAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.componentId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        componentId: opts.componentId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassComponentAriStaticOpts);
    return new _CompassComponentAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassComponentAriStaticOpts);
    return new _CompassComponentAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      componentId: this.componentId
    };
  }
};

// src/compass/custom-field-definition/types.ts
var CompassCustomFieldDefinitionAriResourceOwner = "compass", CompassCustomFieldDefinitionAriResourceType = "custom-field-definition";

// src/compass/custom-field-definition/manifest.ts
var compassCustomFieldDefinitionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassCustomFieldDefinitionAriResourceOwner,
  resourceType: CompassCustomFieldDefinitionAriResourceType,
  resourceIdSlug: "{workspaceId}/{definitionId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    definitionId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/custom-field-definition/index.ts
var CompassCustomFieldDefinitionAri = class _CompassCustomFieldDefinitionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._definitionId = opts.resourceIdSegmentValues.definitionId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get definitionId() {
    return this._definitionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassCustomFieldDefinitionAriStaticOpts.qualifier,
      platformQualifier: compassCustomFieldDefinitionAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassCustomFieldDefinitionAriStaticOpts.resourceOwner,
      resourceType: compassCustomFieldDefinitionAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.definitionId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        definitionId: opts.definitionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassCustomFieldDefinitionAriStaticOpts);
    return new _CompassCustomFieldDefinitionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassCustomFieldDefinitionAriStaticOpts);
    return new _CompassCustomFieldDefinitionAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      definitionId: this.definitionId
    };
  }
};

// src/compass/event-source/types.ts
var CompassEventSourceAriResourceOwner = "compass", CompassEventSourceAriResourceType = "event-source";

// src/compass/event-source/manifest.ts
var compassEventSourceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassEventSourceAriResourceOwner,
  resourceType: CompassEventSourceAriResourceType,
  resourceIdSlug: "{workspaceId}/{eventSourceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    eventSourceId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/event-source/index.ts
var CompassEventSourceAri = class _CompassEventSourceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._eventSourceId = opts.resourceIdSegmentValues.eventSourceId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get eventSourceId() {
    return this._eventSourceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassEventSourceAriStaticOpts.qualifier,
      platformQualifier: compassEventSourceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassEventSourceAriStaticOpts.resourceOwner,
      resourceType: compassEventSourceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.eventSourceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        eventSourceId: opts.eventSourceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassEventSourceAriStaticOpts);
    return new _CompassEventSourceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassEventSourceAriStaticOpts);
    return new _CompassEventSourceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      eventSourceId: this.eventSourceId
    };
  }
};

// src/compass/incoming-webhook/types.ts
var CompassIncomingWebhookAriResourceOwner = "compass", CompassIncomingWebhookAriResourceType = "incoming-webhook";

// src/compass/incoming-webhook/manifest.ts
var compassIncomingWebhookAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassIncomingWebhookAriResourceOwner,
  resourceType: CompassIncomingWebhookAriResourceType,
  resourceIdSlug: "{workspaceId}/{incomingWebhookId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    incomingWebhookId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/incoming-webhook/index.ts
var CompassIncomingWebhookAri = class _CompassIncomingWebhookAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._incomingWebhookId = opts.resourceIdSegmentValues.incomingWebhookId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get incomingWebhookId() {
    return this._incomingWebhookId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassIncomingWebhookAriStaticOpts.qualifier,
      platformQualifier: compassIncomingWebhookAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassIncomingWebhookAriStaticOpts.resourceOwner,
      resourceType: compassIncomingWebhookAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.incomingWebhookId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        incomingWebhookId: opts.incomingWebhookId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassIncomingWebhookAriStaticOpts);
    return new _CompassIncomingWebhookAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassIncomingWebhookAriStaticOpts);
    return new _CompassIncomingWebhookAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      incomingWebhookId: this.incomingWebhookId
    };
  }
};

// src/compass/assistant-answer/types.ts
var CompassAssistantAnswerAriResourceOwner = "compass", CompassAssistantAnswerAriResourceType = "assistant-answer";

// src/compass/assistant-answer/manifest.ts
var compassAssistantAnswerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassAssistantAnswerAriResourceOwner,
  resourceType: CompassAssistantAnswerAriResourceType,
  resourceIdSlug: "{workspaceId}/{answerId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    answerId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/assistant-answer/index.ts
var CompassAssistantAnswerAri = class _CompassAssistantAnswerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._answerId = opts.resourceIdSegmentValues.answerId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get answerId() {
    return this._answerId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassAssistantAnswerAriStaticOpts.qualifier,
      platformQualifier: compassAssistantAnswerAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassAssistantAnswerAriStaticOpts.resourceOwner,
      resourceType: compassAssistantAnswerAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.answerId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        answerId: opts.answerId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassAssistantAnswerAriStaticOpts);
    return new _CompassAssistantAnswerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassAssistantAnswerAriStaticOpts);
    return new _CompassAssistantAnswerAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      answerId: this.answerId
    };
  }
};

// src/compass/component-label/types.ts
var CompassComponentLabelAriResourceOwner = "compass", CompassComponentLabelAriResourceType = "component-label";

// src/compass/component-label/manifest.ts
var compassComponentLabelAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassComponentLabelAriResourceOwner,
  resourceType: CompassComponentLabelAriResourceType,
  resourceIdSlug: "{workspaceId}/{labelId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    labelId: /[0-9a-f\-]{36,64}/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/component-label/index.ts
var CompassComponentLabelAri = class _CompassComponentLabelAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._labelId = opts.resourceIdSegmentValues.labelId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get labelId() {
    return this._labelId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassComponentLabelAriStaticOpts.qualifier,
      platformQualifier: compassComponentLabelAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassComponentLabelAriStaticOpts.resourceOwner,
      resourceType: compassComponentLabelAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.labelId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        labelId: opts.labelId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassComponentLabelAriStaticOpts);
    return new _CompassComponentLabelAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassComponentLabelAriStaticOpts);
    return new _CompassComponentLabelAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      labelId: this.labelId
    };
  }
};

// src/compass/component-link/types.ts
var CompassComponentLinkAriResourceOwner = "compass", CompassComponentLinkAriResourceType = "component-link";

// src/compass/component-link/manifest.ts
var compassComponentLinkAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CompassComponentLinkAriResourceOwner,
  resourceType: CompassComponentLinkAriResourceType,
  resourceIdSlug: "{workspaceId}/{componentId}/{componentLinkId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    componentId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    componentLinkId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/compass/component-link/index.ts
var CompassComponentLinkAri = class _CompassComponentLinkAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._componentId = opts.resourceIdSegmentValues.componentId, this._componentLinkId = opts.resourceIdSegmentValues.componentLinkId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get componentId() {
    return this._componentId;
  }
  get componentLinkId() {
    return this._componentLinkId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: compassComponentLinkAriStaticOpts.qualifier,
      platformQualifier: compassComponentLinkAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: compassComponentLinkAriStaticOpts.resourceOwner,
      resourceType: compassComponentLinkAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.componentId}/${opts.componentLinkId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        componentId: opts.componentId,
        componentLinkId: opts.componentLinkId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, compassComponentLinkAriStaticOpts);
    return new _CompassComponentLinkAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, compassComponentLinkAriStaticOpts);
    return new _CompassComponentLinkAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      componentId: this.componentId,
      componentLinkId: this.componentLinkId
    };
  }
};

// src/commerce/workbench-resource/types.ts
var CommerceWorkbenchResourceAriResourceOwner = "commerce", CommerceWorkbenchResourceAriResourceType = "workbench-resource";

// src/commerce/workbench-resource/manifest.ts
var commerceWorkbenchResourceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceWorkbenchResourceAriResourceOwner,
  resourceType: CommerceWorkbenchResourceAriResourceType,
  resourceIdSlug: "{resourceName}",
  resourceIdSegmentFormats: {
    resourceName: /(database)/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/workbench-resource/index.ts
var CommerceWorkbenchResourceAri = class _CommerceWorkbenchResourceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._resourceName = opts.resourceIdSegmentValues.resourceName;
  }
  get resourceName() {
    return this._resourceName;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceWorkbenchResourceAriStaticOpts.qualifier,
      platformQualifier: commerceWorkbenchResourceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceWorkbenchResourceAriStaticOpts.resourceOwner,
      resourceType: commerceWorkbenchResourceAriStaticOpts.resourceType,
      resourceId: `${opts.resourceName}`,
      resourceIdSegmentValues: {
        resourceName: opts.resourceName
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceWorkbenchResourceAriStaticOpts);
    return new _CommerceWorkbenchResourceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceWorkbenchResourceAriStaticOpts);
    return new _CommerceWorkbenchResourceAri(opts);
  }
  getVariables() {
    return {
      resourceName: this.resourceName
    };
  }
};

// src/commerce/quote/types.ts
var CommerceQuoteAriResourceOwner = "commerce", CommerceQuoteAriResourceType = "quote";

// src/commerce/quote/manifest.ts
var commerceQuoteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CommerceQuoteAriResourceOwner,
  resourceType: CommerceQuoteAriResourceType,
  resourceIdSlug: "{quoteId}",
  resourceIdSegmentFormats: {
    quoteId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/quote/index.ts
var CommerceQuoteAri = class _CommerceQuoteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._txaId = opts.cloudId || "", this._quoteId = opts.resourceIdSegmentValues.quoteId;
  }
  get txaId() {
    return this._txaId;
  }
  get quoteId() {
    return this._quoteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceQuoteAriStaticOpts.qualifier,
      platformQualifier: commerceQuoteAriStaticOpts.platformQualifier,
      cloudId: opts.txaId,
      resourceOwner: commerceQuoteAriStaticOpts.resourceOwner,
      resourceType: commerceQuoteAriStaticOpts.resourceType,
      resourceId: `${opts.quoteId}`,
      resourceIdSegmentValues: {
        quoteId: opts.quoteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceQuoteAriStaticOpts);
    return new _CommerceQuoteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceQuoteAriStaticOpts);
    return new _CommerceQuoteAri(opts);
  }
  getVariables() {
    return {
      txaId: this.txaId,
      quoteId: this.quoteId
    };
  }
};

// src/commerce/role/types.ts
var CommerceRoleAriResourceOwner = "commerce", CommerceRoleAriResourceType = "role";

// src/commerce/role/manifest.ts
var commerceRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceRoleAriResourceOwner,
  resourceType: CommerceRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/role/index.ts
var CommerceRoleAri = class _CommerceRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceRoleAriStaticOpts.qualifier,
      platformQualifier: commerceRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceRoleAriStaticOpts.resourceOwner,
      resourceType: commerceRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceRoleAriStaticOpts);
    return new _CommerceRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceRoleAriStaticOpts);
    return new _CommerceRoleAri(opts);
  }
  getVariables() {
    return {
      roleId: this.roleId
    };
  }
};

// src/commerce/ship-to-party/types.ts
var CommerceShipToPartyAriResourceOwner = "commerce", CommerceShipToPartyAriResourceType = "ship-to-party";

// src/commerce/ship-to-party/manifest.ts
var commerceShipToPartyAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CommerceShipToPartyAriResourceOwner,
  resourceType: CommerceShipToPartyAriResourceType,
  resourceIdSlug: "{shipToPartyId}",
  resourceIdSegmentFormats: {
    shipToPartyId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/ship-to-party/index.ts
var CommerceShipToPartyAri = class _CommerceShipToPartyAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._txaId = opts.cloudId || "", this._shipToPartyId = opts.resourceIdSegmentValues.shipToPartyId;
  }
  get txaId() {
    return this._txaId;
  }
  get shipToPartyId() {
    return this._shipToPartyId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceShipToPartyAriStaticOpts.qualifier,
      platformQualifier: commerceShipToPartyAriStaticOpts.platformQualifier,
      cloudId: opts.txaId,
      resourceOwner: commerceShipToPartyAriStaticOpts.resourceOwner,
      resourceType: commerceShipToPartyAriStaticOpts.resourceType,
      resourceId: `${opts.shipToPartyId}`,
      resourceIdSegmentValues: {
        shipToPartyId: opts.shipToPartyId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceShipToPartyAriStaticOpts);
    return new _CommerceShipToPartyAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceShipToPartyAriStaticOpts);
    return new _CommerceShipToPartyAri(opts);
  }
  getVariables() {
    return {
      txaId: this.txaId,
      shipToPartyId: this.shipToPartyId
    };
  }
};

// src/commerce/transaction-account/types.ts
var CommerceTransactionAccountAriResourceOwner = "commerce", CommerceTransactionAccountAriResourceType = "transaction-account";

// src/commerce/transaction-account/manifest.ts
var commerceTransactionAccountAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceTransactionAccountAriResourceOwner,
  resourceType: CommerceTransactionAccountAriResourceType,
  resourceIdSlug: "{txaId}",
  resourceIdSegmentFormats: {
    txaId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/transaction-account/index.ts
var CommerceTransactionAccountAri = class _CommerceTransactionAccountAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._txaId = opts.resourceIdSegmentValues.txaId;
  }
  get txaId() {
    return this._txaId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceTransactionAccountAriStaticOpts.qualifier,
      platformQualifier: commerceTransactionAccountAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceTransactionAccountAriStaticOpts.resourceOwner,
      resourceType: commerceTransactionAccountAriStaticOpts.resourceType,
      resourceId: `${opts.txaId}`,
      resourceIdSegmentValues: {
        txaId: opts.txaId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceTransactionAccountAriStaticOpts);
    return new _CommerceTransactionAccountAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceTransactionAccountAriStaticOpts);
    return new _CommerceTransactionAccountAri(opts);
  }
  getVariables() {
    return {
      txaId: this.txaId
    };
  }
};

// src/commerce/payment-method/types.ts
var CommercePaymentMethodAriResourceOwner = "commerce", CommercePaymentMethodAriResourceType = "payment-method";

// src/commerce/payment-method/manifest.ts
var commercePaymentMethodAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CommercePaymentMethodAriResourceOwner,
  resourceType: CommercePaymentMethodAriResourceType,
  resourceIdSlug: "{paymentMethodId}",
  resourceIdSegmentFormats: {
    paymentMethodId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/payment-method/index.ts
var CommercePaymentMethodAri = class _CommercePaymentMethodAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._txaId = opts.cloudId || "", this._paymentMethodId = opts.resourceIdSegmentValues.paymentMethodId;
  }
  get txaId() {
    return this._txaId;
  }
  get paymentMethodId() {
    return this._paymentMethodId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commercePaymentMethodAriStaticOpts.qualifier,
      platformQualifier: commercePaymentMethodAriStaticOpts.platformQualifier,
      cloudId: opts.txaId,
      resourceOwner: commercePaymentMethodAriStaticOpts.resourceOwner,
      resourceType: commercePaymentMethodAriStaticOpts.resourceType,
      resourceId: `${opts.paymentMethodId}`,
      resourceIdSegmentValues: {
        paymentMethodId: opts.paymentMethodId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commercePaymentMethodAriStaticOpts);
    return new _CommercePaymentMethodAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commercePaymentMethodAriStaticOpts);
    return new _CommercePaymentMethodAri(opts);
  }
  getVariables() {
    return {
      txaId: this.txaId,
      paymentMethodId: this.paymentMethodId
    };
  }
};

// src/commerce/pricing-plan/types.ts
var CommercePricingPlanAriResourceOwner = "commerce", CommercePricingPlanAriResourceType = "pricing-plan";

// src/commerce/pricing-plan/manifest.ts
var commercePricingPlanAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommercePricingPlanAriResourceOwner,
  resourceType: CommercePricingPlanAriResourceType,
  resourceIdSlug: "{pricingPlanId}",
  resourceIdSegmentFormats: {
    pricingPlanId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/pricing-plan/index.ts
var CommercePricingPlanAri = class _CommercePricingPlanAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._pricingPlanId = opts.resourceIdSegmentValues.pricingPlanId;
  }
  get pricingPlanId() {
    return this._pricingPlanId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commercePricingPlanAriStaticOpts.qualifier,
      platformQualifier: commercePricingPlanAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commercePricingPlanAriStaticOpts.resourceOwner,
      resourceType: commercePricingPlanAriStaticOpts.resourceType,
      resourceId: `${opts.pricingPlanId}`,
      resourceIdSegmentValues: {
        pricingPlanId: opts.pricingPlanId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commercePricingPlanAriStaticOpts);
    return new _CommercePricingPlanAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commercePricingPlanAriStaticOpts);
    return new _CommercePricingPlanAri(opts);
  }
  getVariables() {
    return {
      pricingPlanId: this.pricingPlanId
    };
  }
};

// src/commerce/product/types.ts
var CommerceProductAriResourceOwner = "commerce", CommerceProductAriResourceType = "product";

// src/commerce/product/manifest.ts
var commerceProductAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceProductAriResourceOwner,
  resourceType: CommerceProductAriResourceType,
  resourceIdSlug: "{productId}",
  resourceIdSegmentFormats: {
    productId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/product/index.ts
var CommerceProductAri = class _CommerceProductAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._productId = opts.resourceIdSegmentValues.productId;
  }
  get productId() {
    return this._productId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceProductAriStaticOpts.qualifier,
      platformQualifier: commerceProductAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceProductAriStaticOpts.resourceOwner,
      resourceType: commerceProductAriStaticOpts.resourceType,
      resourceId: `${opts.productId}`,
      resourceIdSegmentValues: {
        productId: opts.productId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceProductAriStaticOpts);
    return new _CommerceProductAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceProductAriStaticOpts);
    return new _CommerceProductAri(opts);
  }
  getVariables() {
    return {
      productId: this.productId
    };
  }
};

// src/commerce/promotion/types.ts
var CommercePromotionAriResourceOwner = "commerce", CommercePromotionAriResourceType = "promotion";

// src/commerce/promotion/manifest.ts
var commercePromotionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommercePromotionAriResourceOwner,
  resourceType: CommercePromotionAriResourceType,
  resourceIdSlug: "{promotionId}",
  resourceIdSegmentFormats: {
    promotionId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/promotion/index.ts
var CommercePromotionAri = class _CommercePromotionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._promotionId = opts.resourceIdSegmentValues.promotionId;
  }
  get promotionId() {
    return this._promotionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commercePromotionAriStaticOpts.qualifier,
      platformQualifier: commercePromotionAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commercePromotionAriStaticOpts.resourceOwner,
      resourceType: commercePromotionAriStaticOpts.resourceType,
      resourceId: `${opts.promotionId}`,
      resourceIdSegmentValues: {
        promotionId: opts.promotionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commercePromotionAriStaticOpts);
    return new _CommercePromotionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commercePromotionAriStaticOpts);
    return new _CommercePromotionAri(opts);
  }
  getVariables() {
    return {
      promotionId: this.promotionId
    };
  }
};

// src/commerce/invoice-group/types.ts
var CommerceInvoiceGroupAriResourceOwner = "commerce", CommerceInvoiceGroupAriResourceType = "invoice-group";

// src/commerce/invoice-group/manifest.ts
var commerceInvoiceGroupAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CommerceInvoiceGroupAriResourceOwner,
  resourceType: CommerceInvoiceGroupAriResourceType,
  resourceIdSlug: "{invoiceGroupId}",
  resourceIdSegmentFormats: {
    invoiceGroupId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/invoice-group/index.ts
var CommerceInvoiceGroupAri = class _CommerceInvoiceGroupAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._txaId = opts.cloudId || "", this._invoiceGroupId = opts.resourceIdSegmentValues.invoiceGroupId;
  }
  get txaId() {
    return this._txaId;
  }
  get invoiceGroupId() {
    return this._invoiceGroupId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceInvoiceGroupAriStaticOpts.qualifier,
      platformQualifier: commerceInvoiceGroupAriStaticOpts.platformQualifier,
      cloudId: opts.txaId,
      resourceOwner: commerceInvoiceGroupAriStaticOpts.resourceOwner,
      resourceType: commerceInvoiceGroupAriStaticOpts.resourceType,
      resourceId: `${opts.invoiceGroupId}`,
      resourceIdSegmentValues: {
        invoiceGroupId: opts.invoiceGroupId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceInvoiceGroupAriStaticOpts);
    return new _CommerceInvoiceGroupAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceInvoiceGroupAriStaticOpts);
    return new _CommerceInvoiceGroupAri(opts);
  }
  getVariables() {
    return {
      txaId: this.txaId,
      invoiceGroupId: this.invoiceGroupId
    };
  }
};

// src/commerce/offering-relationship-template/types.ts
var CommerceOfferingRelationshipTemplateAriResourceOwner = "commerce", CommerceOfferingRelationshipTemplateAriResourceType = "offering-relationship-template";

// src/commerce/offering-relationship-template/manifest.ts
var commerceOfferingRelationshipTemplateAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceOfferingRelationshipTemplateAriResourceOwner,
  resourceType: CommerceOfferingRelationshipTemplateAriResourceType,
  resourceIdSlug: "{offeringRelationshipTemplateId}",
  resourceIdSegmentFormats: {
    offeringRelationshipTemplateId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/offering-relationship-template/index.ts
var CommerceOfferingRelationshipTemplateAri = class _CommerceOfferingRelationshipTemplateAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._offeringRelationshipTemplateId = opts.resourceIdSegmentValues.offeringRelationshipTemplateId;
  }
  get offeringRelationshipTemplateId() {
    return this._offeringRelationshipTemplateId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceOfferingRelationshipTemplateAriStaticOpts.qualifier,
      platformQualifier: commerceOfferingRelationshipTemplateAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceOfferingRelationshipTemplateAriStaticOpts.resourceOwner,
      resourceType: commerceOfferingRelationshipTemplateAriStaticOpts.resourceType,
      resourceId: `${opts.offeringRelationshipTemplateId}`,
      resourceIdSegmentValues: {
        offeringRelationshipTemplateId: opts.offeringRelationshipTemplateId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceOfferingRelationshipTemplateAriStaticOpts);
    return new _CommerceOfferingRelationshipTemplateAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceOfferingRelationshipTemplateAriStaticOpts);
    return new _CommerceOfferingRelationshipTemplateAri(opts);
  }
  getVariables() {
    return {
      offeringRelationshipTemplateId: this.offeringRelationshipTemplateId
    };
  }
};

// src/commerce/offering/types.ts
var CommerceOfferingAriResourceOwner = "commerce", CommerceOfferingAriResourceType = "offering";

// src/commerce/offering/manifest.ts
var commerceOfferingAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceOfferingAriResourceOwner,
  resourceType: CommerceOfferingAriResourceType,
  resourceIdSlug: "{offeringId}",
  resourceIdSegmentFormats: {
    offeringId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/offering/index.ts
var CommerceOfferingAri = class _CommerceOfferingAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._offeringId = opts.resourceIdSegmentValues.offeringId;
  }
  get offeringId() {
    return this._offeringId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceOfferingAriStaticOpts.qualifier,
      platformQualifier: commerceOfferingAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceOfferingAriStaticOpts.resourceOwner,
      resourceType: commerceOfferingAriStaticOpts.resourceType,
      resourceId: `${opts.offeringId}`,
      resourceIdSegmentValues: {
        offeringId: opts.offeringId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceOfferingAriStaticOpts);
    return new _CommerceOfferingAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceOfferingAriStaticOpts);
    return new _CommerceOfferingAri(opts);
  }
  getVariables() {
    return {
      offeringId: this.offeringId
    };
  }
};

// src/commerce/order/types.ts
var CommerceOrderAriResourceOwner = "commerce", CommerceOrderAriResourceType = "order";

// src/commerce/order/manifest.ts
var commerceOrderAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CommerceOrderAriResourceOwner,
  resourceType: CommerceOrderAriResourceType,
  resourceIdSlug: "{orderId}",
  resourceIdSegmentFormats: {
    orderId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/order/index.ts
var CommerceOrderAri = class _CommerceOrderAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._txaId = opts.cloudId || "", this._orderId = opts.resourceIdSegmentValues.orderId;
  }
  get txaId() {
    return this._txaId;
  }
  get orderId() {
    return this._orderId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceOrderAriStaticOpts.qualifier,
      platformQualifier: commerceOrderAriStaticOpts.platformQualifier,
      cloudId: opts.txaId,
      resourceOwner: commerceOrderAriStaticOpts.resourceOwner,
      resourceType: commerceOrderAriStaticOpts.resourceType,
      resourceId: `${opts.orderId}`,
      resourceIdSegmentValues: {
        orderId: opts.orderId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceOrderAriStaticOpts);
    return new _CommerceOrderAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceOrderAriStaticOpts);
    return new _CommerceOrderAri(opts);
  }
  getVariables() {
    return {
      txaId: this.txaId,
      orderId: this.orderId
    };
  }
};

// src/commerce/change/types.ts
var CommerceChangeAriResourceOwner = "commerce", CommerceChangeAriResourceType = "change";

// src/commerce/change/manifest.ts
var commerceChangeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceChangeAriResourceOwner,
  resourceType: CommerceChangeAriResourceType,
  resourceIdSlug: "{changeUuid}",
  resourceIdSegmentFormats: {
    changeUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/change/index.ts
var CommerceChangeAri = class _CommerceChangeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._changeUuid = opts.resourceIdSegmentValues.changeUuid;
  }
  get changeUuid() {
    return this._changeUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceChangeAriStaticOpts.qualifier,
      platformQualifier: commerceChangeAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceChangeAriStaticOpts.resourceOwner,
      resourceType: commerceChangeAriStaticOpts.resourceType,
      resourceId: `${opts.changeUuid}`,
      resourceIdSegmentValues: {
        changeUuid: opts.changeUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceChangeAriStaticOpts);
    return new _CommerceChangeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceChangeAriStaticOpts);
    return new _CommerceChangeAri(opts);
  }
  getVariables() {
    return {
      changeUuid: this.changeUuid
    };
  }
};

// src/commerce/entitlement-template/types.ts
var CommerceEntitlementTemplateAriResourceOwner = "commerce", CommerceEntitlementTemplateAriResourceType = "entitlement-template";

// src/commerce/entitlement-template/manifest.ts
var commerceEntitlementTemplateAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceEntitlementTemplateAriResourceOwner,
  resourceType: CommerceEntitlementTemplateAriResourceType,
  resourceIdSlug: "{entitlementTemplateId}",
  resourceIdSegmentFormats: {
    entitlementTemplateId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/entitlement-template/index.ts
var CommerceEntitlementTemplateAri = class _CommerceEntitlementTemplateAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._entitlementTemplateId = opts.resourceIdSegmentValues.entitlementTemplateId;
  }
  get entitlementTemplateId() {
    return this._entitlementTemplateId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceEntitlementTemplateAriStaticOpts.qualifier,
      platformQualifier: commerceEntitlementTemplateAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceEntitlementTemplateAriStaticOpts.resourceOwner,
      resourceType: commerceEntitlementTemplateAriStaticOpts.resourceType,
      resourceId: `${opts.entitlementTemplateId}`,
      resourceIdSegmentValues: {
        entitlementTemplateId: opts.entitlementTemplateId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceEntitlementTemplateAriStaticOpts);
    return new _CommerceEntitlementTemplateAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceEntitlementTemplateAriStaticOpts);
    return new _CommerceEntitlementTemplateAri(opts);
  }
  getVariables() {
    return {
      entitlementTemplateId: this.entitlementTemplateId
    };
  }
};

// src/commerce/entitlement/types.ts
var CommerceEntitlementAriResourceOwner = "commerce", CommerceEntitlementAriResourceType = "entitlement";

// src/commerce/entitlement/manifest.ts
var commerceEntitlementAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceEntitlementAriResourceOwner,
  resourceType: CommerceEntitlementAriResourceType,
  resourceIdSlug: "{entitlementId}",
  resourceIdSegmentFormats: {
    entitlementId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/entitlement/index.ts
var CommerceEntitlementAri = class _CommerceEntitlementAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._entitlementId = opts.resourceIdSegmentValues.entitlementId;
  }
  get entitlementId() {
    return this._entitlementId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceEntitlementAriStaticOpts.qualifier,
      platformQualifier: commerceEntitlementAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceEntitlementAriStaticOpts.resourceOwner,
      resourceType: commerceEntitlementAriStaticOpts.resourceType,
      resourceId: `${opts.entitlementId}`,
      resourceIdSegmentValues: {
        entitlementId: opts.entitlementId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceEntitlementAriStaticOpts);
    return new _CommerceEntitlementAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceEntitlementAriStaticOpts);
    return new _CommerceEntitlementAri(opts);
  }
  getVariables() {
    return {
      entitlementId: this.entitlementId
    };
  }
};

// src/commerce/initiative/types.ts
var CommerceInitiativeAriResourceOwner = "commerce", CommerceInitiativeAriResourceType = "initiative";

// src/commerce/initiative/manifest.ts
var commerceInitiativeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceInitiativeAriResourceOwner,
  resourceType: CommerceInitiativeAriResourceType,
  resourceIdSlug: "{initiativeUuid}",
  resourceIdSegmentFormats: {
    initiativeUuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/initiative/index.ts
var CommerceInitiativeAri = class _CommerceInitiativeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._initiativeUuid = opts.resourceIdSegmentValues.initiativeUuid;
  }
  get initiativeUuid() {
    return this._initiativeUuid;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceInitiativeAriStaticOpts.qualifier,
      platformQualifier: commerceInitiativeAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceInitiativeAriStaticOpts.resourceOwner,
      resourceType: commerceInitiativeAriStaticOpts.resourceType,
      resourceId: `${opts.initiativeUuid}`,
      resourceIdSegmentValues: {
        initiativeUuid: opts.initiativeUuid
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceInitiativeAriStaticOpts);
    return new _CommerceInitiativeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceInitiativeAriStaticOpts);
    return new _CommerceInitiativeAri(opts);
  }
  getVariables() {
    return {
      initiativeUuid: this.initiativeUuid
    };
  }
};

// src/commerce/catalog-account/types.ts
var CommerceCatalogAccountAriResourceOwner = "commerce", CommerceCatalogAccountAriResourceType = "catalog-account";

// src/commerce/catalog-account/manifest.ts
var commerceCatalogAccountAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CommerceCatalogAccountAriResourceOwner,
  resourceType: CommerceCatalogAccountAriResourceType,
  resourceIdSlug: "{catalogAccountId}",
  resourceIdSegmentFormats: {
    catalogAccountId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/commerce/catalog-account/index.ts
var CommerceCatalogAccountAri = class _CommerceCatalogAccountAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._catalogAccountId = opts.resourceIdSegmentValues.catalogAccountId;
  }
  get catalogAccountId() {
    return this._catalogAccountId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: commerceCatalogAccountAriStaticOpts.qualifier,
      platformQualifier: commerceCatalogAccountAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: commerceCatalogAccountAriStaticOpts.resourceOwner,
      resourceType: commerceCatalogAccountAriStaticOpts.resourceType,
      resourceId: `${opts.catalogAccountId}`,
      resourceIdSegmentValues: {
        catalogAccountId: opts.catalogAccountId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, commerceCatalogAccountAriStaticOpts);
    return new _CommerceCatalogAccountAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, commerceCatalogAccountAriStaticOpts);
    return new _CommerceCatalogAccountAri(opts);
  }
  getVariables() {
    return {
      catalogAccountId: this.catalogAccountId
    };
  }
};

// src/cmdb/schema/types.ts
var CmdbSchemaAriResourceOwner = "cmdb", CmdbSchemaAriResourceType = "schema";

// src/cmdb/schema/manifest.ts
var cmdbSchemaAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CmdbSchemaAriResourceOwner,
  resourceType: CmdbSchemaAriResourceType,
  resourceIdSlug: "{workspaceId}/{schemaId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    schemaId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/cmdb/schema/index.ts
var CmdbSchemaAri = class _CmdbSchemaAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._schemaId = opts.resourceIdSegmentValues.schemaId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get schemaId() {
    return this._schemaId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: cmdbSchemaAriStaticOpts.qualifier,
      platformQualifier: cmdbSchemaAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: cmdbSchemaAriStaticOpts.resourceOwner,
      resourceType: cmdbSchemaAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.schemaId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        schemaId: opts.schemaId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, cmdbSchemaAriStaticOpts);
    return new _CmdbSchemaAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, cmdbSchemaAriStaticOpts);
    return new _CmdbSchemaAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      schemaId: this.schemaId
    };
  }
};

// src/cmdb/type/types.ts
var CmdbTypeAriResourceOwner = "cmdb", CmdbTypeAriResourceType = "type";

// src/cmdb/type/manifest.ts
var cmdbTypeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CmdbTypeAriResourceOwner,
  resourceType: CmdbTypeAriResourceType,
  resourceIdSlug: "{workspaceId}/{typeId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    typeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/cmdb/type/index.ts
var CmdbTypeAri = class _CmdbTypeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._typeId = opts.resourceIdSegmentValues.typeId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get typeId() {
    return this._typeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: cmdbTypeAriStaticOpts.qualifier,
      platformQualifier: cmdbTypeAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: cmdbTypeAriStaticOpts.resourceOwner,
      resourceType: cmdbTypeAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.typeId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        typeId: opts.typeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, cmdbTypeAriStaticOpts);
    return new _CmdbTypeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, cmdbTypeAriStaticOpts);
    return new _CmdbTypeAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      typeId: this.typeId
    };
  }
};

// src/cmdb/workspace/types.ts
var CmdbWorkspaceAriResourceOwner = "cmdb", CmdbWorkspaceAriResourceType = "workspace";

// src/cmdb/workspace/manifest.ts
var cmdbWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CmdbWorkspaceAriResourceOwner,
  resourceType: CmdbWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/cmdb/workspace/index.ts
var CmdbWorkspaceAri = class _CmdbWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: cmdbWorkspaceAriStaticOpts.qualifier,
      platformQualifier: cmdbWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: cmdbWorkspaceAriStaticOpts.resourceOwner,
      resourceType: cmdbWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, cmdbWorkspaceAriStaticOpts);
    return new _CmdbWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, cmdbWorkspaceAriStaticOpts);
    return new _CmdbWorkspaceAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId
    };
  }
};

// src/cmdb/import-configuration/types.ts
var CmdbImportConfigurationAriResourceOwner = "cmdb", CmdbImportConfigurationAriResourceType = "import-configuration";

// src/cmdb/import-configuration/manifest.ts
var cmdbImportConfigurationAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CmdbImportConfigurationAriResourceOwner,
  resourceType: CmdbImportConfigurationAriResourceType,
  resourceIdSlug: "{workspaceId}/{importConfigId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    importConfigId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/cmdb/import-configuration/index.ts
var CmdbImportConfigurationAri = class _CmdbImportConfigurationAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._importConfigId = opts.resourceIdSegmentValues.importConfigId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get importConfigId() {
    return this._importConfigId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: cmdbImportConfigurationAriStaticOpts.qualifier,
      platformQualifier: cmdbImportConfigurationAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: cmdbImportConfigurationAriStaticOpts.resourceOwner,
      resourceType: cmdbImportConfigurationAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.importConfigId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        importConfigId: opts.importConfigId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, cmdbImportConfigurationAriStaticOpts);
    return new _CmdbImportConfigurationAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, cmdbImportConfigurationAriStaticOpts);
    return new _CmdbImportConfigurationAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      importConfigId: this.importConfigId
    };
  }
};

// src/cmdb/object/types.ts
var CmdbObjectAriResourceOwner = "cmdb", CmdbObjectAriResourceType = "object";

// src/cmdb/object/manifest.ts
var cmdbObjectAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CmdbObjectAriResourceOwner,
  resourceType: CmdbObjectAriResourceType,
  resourceIdSlug: "{workspaceId}/{objectId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    objectId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/cmdb/object/index.ts
var CmdbObjectAri = class _CmdbObjectAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._objectId = opts.resourceIdSegmentValues.objectId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get objectId() {
    return this._objectId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: cmdbObjectAriStaticOpts.qualifier,
      platformQualifier: cmdbObjectAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: cmdbObjectAriStaticOpts.resourceOwner,
      resourceType: cmdbObjectAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.objectId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        objectId: opts.objectId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, cmdbObjectAriStaticOpts);
    return new _CmdbObjectAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, cmdbObjectAriStaticOpts);
    return new _CmdbObjectAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      objectId: this.objectId
    };
  }
};

// src/cmdb/role/types.ts
var CmdbRoleAriResourceOwner = "cmdb", CmdbRoleAriResourceType = "role";

// src/cmdb/role/manifest.ts
var cmdbRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CmdbRoleAriResourceOwner,
  resourceType: CmdbRoleAriResourceType,
  resourceIdSlug: "{roleGroup}/{roleType}",
  resourceIdSegmentFormats: {
    roleGroup: /(?:schema|airtrack|airtrack-buoy)/,
    // eslint-disable-line no-useless-escape
    roleType: /(?:viewer|admin|report-viewer|report-editor)/
    // eslint-disable-line no-useless-escape
  }
};

// src/cmdb/role/index.ts
var CmdbRoleAri = class _CmdbRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleGroup = opts.resourceIdSegmentValues.roleGroup, this._roleType = opts.resourceIdSegmentValues.roleType;
  }
  get roleGroup() {
    return this._roleGroup;
  }
  get roleType() {
    return this._roleType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: cmdbRoleAriStaticOpts.qualifier,
      platformQualifier: cmdbRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: cmdbRoleAriStaticOpts.resourceOwner,
      resourceType: cmdbRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleGroup}/${opts.roleType}`,
      resourceIdSegmentValues: {
        roleGroup: opts.roleGroup,
        roleType: opts.roleType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, cmdbRoleAriStaticOpts);
    return new _CmdbRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, cmdbRoleAriStaticOpts);
    return new _CmdbRoleAri(opts);
  }
  getVariables() {
    return {
      roleGroup: this.roleGroup,
      roleType: this.roleType
    };
  }
};

// src/canvas/database/types.ts
var CanvasDatabaseAriResourceOwner = "canvas", CanvasDatabaseAriResourceType = "database";

// src/canvas/database/manifest.ts
var canvasDatabaseAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CanvasDatabaseAriResourceOwner,
  resourceType: CanvasDatabaseAriResourceType,
  resourceIdSlug: "{databaseId}",
  resourceIdSegmentFormats: {
    databaseId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/canvas/database/index.ts
var CanvasDatabaseAri = class _CanvasDatabaseAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._databaseId = opts.resourceIdSegmentValues.databaseId;
  }
  get siteId() {
    return this._siteId;
  }
  get databaseId() {
    return this._databaseId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: canvasDatabaseAriStaticOpts.qualifier,
      platformQualifier: canvasDatabaseAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: canvasDatabaseAriStaticOpts.resourceOwner,
      resourceType: canvasDatabaseAriStaticOpts.resourceType,
      resourceId: `${opts.databaseId}`,
      resourceIdSegmentValues: {
        databaseId: opts.databaseId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, canvasDatabaseAriStaticOpts);
    return new _CanvasDatabaseAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, canvasDatabaseAriStaticOpts);
    return new _CanvasDatabaseAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      databaseId: this.databaseId
    };
  }
};

// src/canvas/site/types.ts
var CanvasSiteAriResourceOwner = "canvas", CanvasSiteAriResourceType = "site";

// src/canvas/site/manifest.ts
var canvasSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CanvasSiteAriResourceOwner,
  resourceType: CanvasSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/canvas/site/index.ts
var CanvasSiteAri = class _CanvasSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: canvasSiteAriStaticOpts.qualifier,
      platformQualifier: canvasSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: canvasSiteAriStaticOpts.resourceOwner,
      resourceType: canvasSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, canvasSiteAriStaticOpts);
    return new _CanvasSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, canvasSiteAriStaticOpts);
    return new _CanvasSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/canvas/workspace/types.ts
var CanvasWorkspaceAriResourceOwner = "canvas", CanvasWorkspaceAriResourceType = "workspace";

// src/canvas/workspace/manifest.ts
var canvasWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CanvasWorkspaceAriResourceOwner,
  resourceType: CanvasWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/canvas/workspace/index.ts
var CanvasWorkspaceAri = class _CanvasWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: canvasWorkspaceAriStaticOpts.qualifier,
      platformQualifier: canvasWorkspaceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: canvasWorkspaceAriStaticOpts.resourceOwner,
      resourceType: canvasWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, canvasWorkspaceAriStaticOpts);
    return new _CanvasWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, canvasWorkspaceAriStaticOpts);
    return new _CanvasWorkspaceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId
    };
  }
};

// src/cmdb/attribute/types.ts
var CmdbAttributeAriResourceOwner = "cmdb", CmdbAttributeAriResourceType = "attribute";

// src/cmdb/attribute/manifest.ts
var cmdbAttributeAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: CmdbAttributeAriResourceOwner,
  resourceType: CmdbAttributeAriResourceType,
  resourceIdSlug: "{workspaceId}/{attributeId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    attributeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/cmdb/attribute/index.ts
var CmdbAttributeAri = class _CmdbAttributeAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._attributeId = opts.resourceIdSegmentValues.attributeId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get attributeId() {
    return this._attributeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: cmdbAttributeAriStaticOpts.qualifier,
      platformQualifier: cmdbAttributeAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: cmdbAttributeAriStaticOpts.resourceOwner,
      resourceType: cmdbAttributeAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.attributeId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        attributeId: opts.attributeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, cmdbAttributeAriStaticOpts);
    return new _CmdbAttributeAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, cmdbAttributeAriStaticOpts);
    return new _CmdbAttributeAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      attributeId: this.attributeId
    };
  }
};

// src/brie/role/types.ts
var BrieRoleAriResourceOwner = "brie", BrieRoleAriResourceType = "role";

// src/brie/role/manifest.ts
var brieRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BrieRoleAriResourceOwner,
  resourceType: BrieRoleAriResourceType,
  resourceIdSlug: "scope/{roleTypeId}",
  resourceIdSegmentFormats: {
    roleTypeId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/brie/role/index.ts
var BrieRoleAri = class _BrieRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleTypeId = opts.resourceIdSegmentValues.roleTypeId;
  }
  get roleTypeId() {
    return this._roleTypeId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: brieRoleAriStaticOpts.qualifier,
      platformQualifier: brieRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: brieRoleAriStaticOpts.resourceOwner,
      resourceType: brieRoleAriStaticOpts.resourceType,
      resourceId: `scope/${opts.roleTypeId}`,
      resourceIdSegmentValues: {
        roleTypeId: opts.roleTypeId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, brieRoleAriStaticOpts);
    return new _BrieRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, brieRoleAriStaticOpts);
    return new _BrieRoleAri(opts);
  }
  getVariables() {
    return {
      roleTypeId: this.roleTypeId
    };
  }
};

// src/brie/site/types.ts
var BrieSiteAriResourceOwner = "brie", BrieSiteAriResourceType = "site";

// src/brie/site/manifest.ts
var brieSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BrieSiteAriResourceOwner,
  resourceType: BrieSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/brie/site/index.ts
var BrieSiteAri = class _BrieSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: brieSiteAriStaticOpts.qualifier,
      platformQualifier: brieSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: brieSiteAriStaticOpts.resourceOwner,
      resourceType: brieSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, brieSiteAriStaticOpts);
    return new _BrieSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, brieSiteAriStaticOpts);
    return new _BrieSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/canvas/board/types.ts
var CanvasBoardAriResourceOwner = "canvas", CanvasBoardAriResourceType = "board";

// src/canvas/board/manifest.ts
var canvasBoardAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: CanvasBoardAriResourceOwner,
  resourceType: CanvasBoardAriResourceType,
  resourceIdSlug: "{boardId}",
  resourceIdSegmentFormats: {
    boardId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/canvas/board/index.ts
var CanvasBoardAri = class _CanvasBoardAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._boardId = opts.resourceIdSegmentValues.boardId;
  }
  get siteId() {
    return this._siteId;
  }
  get boardId() {
    return this._boardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: canvasBoardAriStaticOpts.qualifier,
      platformQualifier: canvasBoardAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: canvasBoardAriStaticOpts.resourceOwner,
      resourceType: canvasBoardAriStaticOpts.resourceType,
      resourceId: `${opts.boardId}`,
      resourceIdSegmentValues: {
        boardId: opts.boardId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, canvasBoardAriStaticOpts);
    return new _CanvasBoardAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, canvasBoardAriStaticOpts);
    return new _CanvasBoardAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      boardId: this.boardId
    };
  }
};

// src/bitbucket/repository/types.ts
var BitbucketRepositoryAriResourceOwner = "bitbucket", BitbucketRepositoryAriResourceType = "repository";

// src/bitbucket/repository/manifest.ts
var bitbucketRepositoryAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BitbucketRepositoryAriResourceOwner,
  resourceType: BitbucketRepositoryAriResourceType,
  resourceIdSlug: "{repositoryId}",
  resourceIdSegmentFormats: {
    repositoryId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/bitbucket/repository/index.ts
var BitbucketRepositoryAri = class _BitbucketRepositoryAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._repositoryId = opts.resourceIdSegmentValues.repositoryId;
  }
  get repositoryId() {
    return this._repositoryId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: bitbucketRepositoryAriStaticOpts.qualifier,
      platformQualifier: bitbucketRepositoryAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: bitbucketRepositoryAriStaticOpts.resourceOwner,
      resourceType: bitbucketRepositoryAriStaticOpts.resourceType,
      resourceId: `${opts.repositoryId}`,
      resourceIdSegmentValues: {
        repositoryId: opts.repositoryId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, bitbucketRepositoryAriStaticOpts);
    return new _BitbucketRepositoryAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, bitbucketRepositoryAriStaticOpts);
    return new _BitbucketRepositoryAri(opts);
  }
  getVariables() {
    return {
      repositoryId: this.repositoryId
    };
  }
};

// src/bitbucket/site/types.ts
var BitbucketSiteAriResourceOwner = "bitbucket", BitbucketSiteAriResourceType = "site";

// src/bitbucket/site/manifest.ts
var bitbucketSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BitbucketSiteAriResourceOwner,
  resourceType: BitbucketSiteAriResourceType,
  resourceIdSlug: "bitbucket",
  resourceIdSegmentFormats: {}
};

// src/bitbucket/site/index.ts
var BitbucketSiteAri = class _BitbucketSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: bitbucketSiteAriStaticOpts.qualifier,
      platformQualifier: bitbucketSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: bitbucketSiteAriStaticOpts.resourceOwner,
      resourceType: bitbucketSiteAriStaticOpts.resourceType,
      resourceId: "bitbucket",
      resourceIdSegmentValues: {}
    }, ariOpts = AriParser.fromOpts(derivedOpts, bitbucketSiteAriStaticOpts);
    return new _BitbucketSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, bitbucketSiteAriStaticOpts);
    return new _BitbucketSiteAri(opts);
  }
  getVariables() {
    return {};
  }
};

// src/bitbucket/team/types.ts
var BitbucketTeamAriResourceOwner = "bitbucket", BitbucketTeamAriResourceType = "team";

// src/bitbucket/team/manifest.ts
var bitbucketTeamAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BitbucketTeamAriResourceOwner,
  resourceType: BitbucketTeamAriResourceType,
  resourceIdSlug: "{teamId}",
  resourceIdSegmentFormats: {
    teamId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/bitbucket/team/index.ts
var BitbucketTeamAri = class _BitbucketTeamAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._teamId = opts.resourceIdSegmentValues.teamId;
  }
  get teamId() {
    return this._teamId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: bitbucketTeamAriStaticOpts.qualifier,
      platformQualifier: bitbucketTeamAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: bitbucketTeamAriStaticOpts.resourceOwner,
      resourceType: bitbucketTeamAriStaticOpts.resourceType,
      resourceId: `${opts.teamId}`,
      resourceIdSegmentValues: {
        teamId: opts.teamId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, bitbucketTeamAriStaticOpts);
    return new _BitbucketTeamAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, bitbucketTeamAriStaticOpts);
    return new _BitbucketTeamAri(opts);
  }
  getVariables() {
    return {
      teamId: this.teamId
    };
  }
};

// src/bitbucket/workspace/types.ts
var BitbucketWorkspaceAriResourceOwner = "bitbucket", BitbucketWorkspaceAriResourceType = "workspace";

// src/bitbucket/workspace/manifest.ts
var bitbucketWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BitbucketWorkspaceAriResourceOwner,
  resourceType: BitbucketWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/bitbucket/workspace/index.ts
var BitbucketWorkspaceAri = class _BitbucketWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: bitbucketWorkspaceAriStaticOpts.qualifier,
      platformQualifier: bitbucketWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: bitbucketWorkspaceAriStaticOpts.resourceOwner,
      resourceType: bitbucketWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, bitbucketWorkspaceAriStaticOpts);
    return new _BitbucketWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, bitbucketWorkspaceAriStaticOpts);
    return new _BitbucketWorkspaceAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId
    };
  }
};

// src/bitbucket/oauth-consumer/types.ts
var BitbucketOauthConsumerAriResourceOwner = "bitbucket", BitbucketOauthConsumerAriResourceType = "oauth-consumer";

// src/bitbucket/oauth-consumer/manifest.ts
var bitbucketOauthConsumerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BitbucketOauthConsumerAriResourceOwner,
  resourceType: BitbucketOauthConsumerAriResourceType,
  resourceIdSlug: "{clientId}",
  resourceIdSegmentFormats: {
    clientId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/bitbucket/oauth-consumer/index.ts
var BitbucketOauthConsumerAri = class _BitbucketOauthConsumerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._clientId = opts.resourceIdSegmentValues.clientId;
  }
  get clientId() {
    return this._clientId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: bitbucketOauthConsumerAriStaticOpts.qualifier,
      platformQualifier: bitbucketOauthConsumerAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: bitbucketOauthConsumerAriStaticOpts.resourceOwner,
      resourceType: bitbucketOauthConsumerAriStaticOpts.resourceType,
      resourceId: `${opts.clientId}`,
      resourceIdSegmentValues: {
        clientId: opts.clientId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, bitbucketOauthConsumerAriStaticOpts);
    return new _BitbucketOauthConsumerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, bitbucketOauthConsumerAriStaticOpts);
    return new _BitbucketOauthConsumerAri(opts);
  }
  getVariables() {
    return {
      clientId: this.clientId
    };
  }
};

// src/bitbucket/project/types.ts
var BitbucketProjectAriResourceOwner = "bitbucket", BitbucketProjectAriResourceType = "project";

// src/bitbucket/project/manifest.ts
var bitbucketProjectAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BitbucketProjectAriResourceOwner,
  resourceType: BitbucketProjectAriResourceType,
  resourceIdSlug: "{projectId}",
  resourceIdSegmentFormats: {
    projectId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/bitbucket/project/index.ts
var BitbucketProjectAri = class _BitbucketProjectAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._projectId = opts.resourceIdSegmentValues.projectId;
  }
  get projectId() {
    return this._projectId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: bitbucketProjectAriStaticOpts.qualifier,
      platformQualifier: bitbucketProjectAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: bitbucketProjectAriStaticOpts.resourceOwner,
      resourceType: bitbucketProjectAriStaticOpts.resourceType,
      resourceId: `${opts.projectId}`,
      resourceIdSegmentValues: {
        projectId: opts.projectId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, bitbucketProjectAriStaticOpts);
    return new _BitbucketProjectAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, bitbucketProjectAriStaticOpts);
    return new _BitbucketProjectAri(opts);
  }
  getVariables() {
    return {
      projectId: this.projectId
    };
  }
};

// src/bitbucket/pullrequest/types.ts
var BitbucketPullrequestAriResourceOwner = "bitbucket", BitbucketPullrequestAriResourceType = "pullrequest";

// src/bitbucket/pullrequest/manifest.ts
var bitbucketPullrequestAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BitbucketPullrequestAriResourceOwner,
  resourceType: BitbucketPullrequestAriResourceType,
  resourceIdSlug: "{pullRequestId}",
  resourceIdSegmentFormats: {
    pullRequestId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/bitbucket/pullrequest/index.ts
var BitbucketPullrequestAri = class _BitbucketPullrequestAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._pullRequestId = opts.resourceIdSegmentValues.pullRequestId;
  }
  get pullRequestId() {
    return this._pullRequestId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: bitbucketPullrequestAriStaticOpts.qualifier,
      platformQualifier: bitbucketPullrequestAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: bitbucketPullrequestAriStaticOpts.resourceOwner,
      resourceType: bitbucketPullrequestAriStaticOpts.resourceType,
      resourceId: `${opts.pullRequestId}`,
      resourceIdSegmentValues: {
        pullRequestId: opts.pullRequestId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, bitbucketPullrequestAriStaticOpts);
    return new _BitbucketPullrequestAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, bitbucketPullrequestAriStaticOpts);
    return new _BitbucketPullrequestAri(opts);
  }
  getVariables() {
    return {
      pullRequestId: this.pullRequestId
    };
  }
};

// src/bitbucket/repository-transfer/types.ts
var BitbucketRepositoryTransferAriResourceOwner = "bitbucket", BitbucketRepositoryTransferAriResourceType = "repository-transfer";

// src/bitbucket/repository-transfer/manifest.ts
var bitbucketRepositoryTransferAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BitbucketRepositoryTransferAriResourceOwner,
  resourceType: BitbucketRepositoryTransferAriResourceType,
  resourceIdSlug: "{transferId}",
  resourceIdSegmentFormats: {
    transferId: /[a-f0-9]{32}/
    // eslint-disable-line no-useless-escape
  }
};

// src/bitbucket/repository-transfer/index.ts
var BitbucketRepositoryTransferAri = class _BitbucketRepositoryTransferAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._transferId = opts.resourceIdSegmentValues.transferId;
  }
  get transferId() {
    return this._transferId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: bitbucketRepositoryTransferAriStaticOpts.qualifier,
      platformQualifier: bitbucketRepositoryTransferAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: bitbucketRepositoryTransferAriStaticOpts.resourceOwner,
      resourceType: bitbucketRepositoryTransferAriStaticOpts.resourceType,
      resourceId: `${opts.transferId}`,
      resourceIdSegmentValues: {
        transferId: opts.transferId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, bitbucketRepositoryTransferAriStaticOpts);
    return new _BitbucketRepositoryTransferAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, bitbucketRepositoryTransferAriStaticOpts);
    return new _BitbucketRepositoryTransferAri(opts);
  }
  getVariables() {
    return {
      transferId: this.transferId
    };
  }
};

// src/bitbucket/app/types.ts
var BitbucketAppAriResourceOwner = "bitbucket", BitbucketAppAriResourceType = "app";

// src/bitbucket/app/manifest.ts
var bitbucketAppAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BitbucketAppAriResourceOwner,
  resourceType: BitbucketAppAriResourceType,
  resourceIdSlug: "{workspaceId}/{appId}",
  resourceIdSegmentFormats: {
    workspaceId: /\{[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}}/,
    // eslint-disable-line no-useless-escape
    appId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/bitbucket/app/index.ts
var BitbucketAppAri = class _BitbucketAppAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._appId = opts.resourceIdSegmentValues.appId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get appId() {
    return this._appId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: bitbucketAppAriStaticOpts.qualifier,
      platformQualifier: bitbucketAppAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: bitbucketAppAriStaticOpts.resourceOwner,
      resourceType: bitbucketAppAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.appId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        appId: opts.appId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, bitbucketAppAriStaticOpts);
    return new _BitbucketAppAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, bitbucketAppAriStaticOpts);
    return new _BitbucketAppAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      appId: this.appId
    };
  }
};

// src/beacon/site/types.ts
var BeaconSiteAriResourceOwner = "beacon", BeaconSiteAriResourceType = "site";

// src/beacon/site/manifest.ts
var beaconSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BeaconSiteAriResourceOwner,
  resourceType: BeaconSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/beacon/site/index.ts
var BeaconSiteAri = class _BeaconSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: beaconSiteAriStaticOpts.qualifier,
      platformQualifier: beaconSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: beaconSiteAriStaticOpts.resourceOwner,
      resourceType: beaconSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, beaconSiteAriStaticOpts);
    return new _BeaconSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, beaconSiteAriStaticOpts);
    return new _BeaconSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/beacon/subscription/types.ts
var BeaconSubscriptionAriResourceOwner = "beacon", BeaconSubscriptionAriResourceType = "subscription";

// src/beacon/subscription/manifest.ts
var beaconSubscriptionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: BeaconSubscriptionAriResourceOwner,
  resourceType: BeaconSubscriptionAriResourceType,
  resourceIdSlug: "{workspaceId}/{subscriptionId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    subscriptionId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/beacon/subscription/index.ts
var BeaconSubscriptionAri = class _BeaconSubscriptionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._subscriptionId = opts.resourceIdSegmentValues.subscriptionId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get subscriptionId() {
    return this._subscriptionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: beaconSubscriptionAriStaticOpts.qualifier,
      platformQualifier: beaconSubscriptionAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: beaconSubscriptionAriStaticOpts.resourceOwner,
      resourceType: beaconSubscriptionAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.subscriptionId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        subscriptionId: opts.subscriptionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, beaconSubscriptionAriStaticOpts);
    return new _BeaconSubscriptionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, beaconSubscriptionAriStaticOpts);
    return new _BeaconSubscriptionAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      subscriptionId: this.subscriptionId
    };
  }
};

// src/beacon/workspace/types.ts
var BeaconWorkspaceAriResourceOwner = "beacon", BeaconWorkspaceAriResourceType = "workspace";

// src/beacon/workspace/manifest.ts
var beaconWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: BeaconWorkspaceAriResourceOwner,
  resourceType: BeaconWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/beacon/workspace/index.ts
var BeaconWorkspaceAri = class _BeaconWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: beaconWorkspaceAriStaticOpts.qualifier,
      platformQualifier: beaconWorkspaceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: beaconWorkspaceAriStaticOpts.resourceOwner,
      resourceType: beaconWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, beaconWorkspaceAriStaticOpts);
    return new _BeaconWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, beaconWorkspaceAriStaticOpts);
    return new _BeaconWorkspaceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId
    };
  }
};

// src/beacon/detection-setting/types.ts
var BeaconDetectionSettingAriResourceOwner = "beacon", BeaconDetectionSettingAriResourceType = "detection-setting";

// src/beacon/detection-setting/manifest.ts
var beaconDetectionSettingAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: BeaconDetectionSettingAriResourceOwner,
  resourceType: BeaconDetectionSettingAriResourceType,
  resourceIdSlug: "{workspaceId}/{detectionType}/{detectionId}/{settingId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    detectionType: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    detectionId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    settingId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/beacon/detection-setting/index.ts
var BeaconDetectionSettingAri = class _BeaconDetectionSettingAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._detectionType = opts.resourceIdSegmentValues.detectionType, this._detectionId = opts.resourceIdSegmentValues.detectionId, this._settingId = opts.resourceIdSegmentValues.settingId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get detectionType() {
    return this._detectionType;
  }
  get detectionId() {
    return this._detectionId;
  }
  get settingId() {
    return this._settingId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: beaconDetectionSettingAriStaticOpts.qualifier,
      platformQualifier: beaconDetectionSettingAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: beaconDetectionSettingAriStaticOpts.resourceOwner,
      resourceType: beaconDetectionSettingAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.detectionType}/${opts.detectionId}/${opts.settingId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        detectionType: opts.detectionType,
        detectionId: opts.detectionId,
        settingId: opts.settingId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, beaconDetectionSettingAriStaticOpts);
    return new _BeaconDetectionSettingAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, beaconDetectionSettingAriStaticOpts);
    return new _BeaconDetectionSettingAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      detectionType: this.detectionType,
      detectionId: this.detectionId,
      settingId: this.settingId
    };
  }
};

// src/beacon/detection/types.ts
var BeaconDetectionAriResourceOwner = "beacon", BeaconDetectionAriResourceType = "detection";

// src/beacon/detection/manifest.ts
var beaconDetectionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BeaconDetectionAriResourceOwner,
  resourceType: BeaconDetectionAriResourceType,
  resourceIdSlug: "{workspaceId}/{detectionId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    detectionId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/beacon/detection/index.ts
var BeaconDetectionAri = class _BeaconDetectionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._detectionId = opts.resourceIdSegmentValues.detectionId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get detectionId() {
    return this._detectionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: beaconDetectionAriStaticOpts.qualifier,
      platformQualifier: beaconDetectionAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: beaconDetectionAriStaticOpts.resourceOwner,
      resourceType: beaconDetectionAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.detectionId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        detectionId: opts.detectionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, beaconDetectionAriStaticOpts);
    return new _BeaconDetectionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, beaconDetectionAriStaticOpts);
    return new _BeaconDetectionAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      detectionId: this.detectionId
    };
  }
};

// src/beacon/role/types.ts
var BeaconRoleAriResourceOwner = "beacon", BeaconRoleAriResourceType = "role";

// src/beacon/role/manifest.ts
var beaconRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: BeaconRoleAriResourceOwner,
  resourceType: BeaconRoleAriResourceType,
  resourceIdSlug: "product/{roleType}",
  resourceIdSegmentFormats: {
    roleType: /(?:member|admin)/
    // eslint-disable-line no-useless-escape
  }
};

// src/beacon/role/index.ts
var BeaconRoleAri = class _BeaconRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleType = opts.resourceIdSegmentValues.roleType;
  }
  get roleType() {
    return this._roleType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: beaconRoleAriStaticOpts.qualifier,
      platformQualifier: beaconRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: beaconRoleAriStaticOpts.resourceOwner,
      resourceType: beaconRoleAriStaticOpts.resourceType,
      resourceId: `product/${opts.roleType}`,
      resourceIdSegmentValues: {
        roleType: opts.roleType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, beaconRoleAriStaticOpts);
    return new _BeaconRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, beaconRoleAriStaticOpts);
    return new _BeaconRoleAri(opts);
  }
  getVariables() {
    return {
      roleType: this.roleType
    };
  }
};

// src/avp/role/types.ts
var AvpRoleAriResourceOwner = "avp", AvpRoleAriResourceType = "role";

// src/avp/role/manifest.ts
var avpRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AvpRoleAriResourceOwner,
  resourceType: AvpRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/avp/role/index.ts
var AvpRoleAri = class _AvpRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: avpRoleAriStaticOpts.qualifier,
      platformQualifier: avpRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: avpRoleAriStaticOpts.resourceOwner,
      resourceType: avpRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, avpRoleAriStaticOpts);
    return new _AvpRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, avpRoleAriStaticOpts);
    return new _AvpRoleAri(opts);
  }
  getVariables() {
    return {
      roleId: this.roleId
    };
  }
};

// src/avp/site/types.ts
var AvpSiteAriResourceOwner = "avp", AvpSiteAriResourceType = "site";

// src/avp/site/manifest.ts
var avpSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AvpSiteAriResourceOwner,
  resourceType: AvpSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/avp/site/index.ts
var AvpSiteAri = class _AvpSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: avpSiteAriStaticOpts.qualifier,
      platformQualifier: avpSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: avpSiteAriStaticOpts.resourceOwner,
      resourceType: avpSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, avpSiteAriStaticOpts);
    return new _AvpSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, avpSiteAriStaticOpts);
    return new _AvpSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/beacon/alert/types.ts
var BeaconAlertAriResourceOwner = "beacon", BeaconAlertAriResourceType = "alert";

// src/beacon/alert/manifest.ts
var beaconAlertAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: BeaconAlertAriResourceOwner,
  resourceType: BeaconAlertAriResourceType,
  resourceIdSlug: "{workspaceId}/{alertId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    alertId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/beacon/alert/index.ts
var BeaconAlertAri = class _BeaconAlertAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._alertId = opts.resourceIdSegmentValues.alertId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get alertId() {
    return this._alertId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: beaconAlertAriStaticOpts.qualifier,
      platformQualifier: beaconAlertAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: beaconAlertAriStaticOpts.resourceOwner,
      resourceType: beaconAlertAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.alertId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        alertId: opts.alertId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, beaconAlertAriStaticOpts);
    return new _BeaconAlertAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, beaconAlertAriStaticOpts);
    return new _BeaconAlertAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      alertId: this.alertId
    };
  }
};

// src/beacon/custom-detection/types.ts
var BeaconCustomDetectionAriResourceOwner = "beacon", BeaconCustomDetectionAriResourceType = "custom-detection";

// src/beacon/custom-detection/manifest.ts
var beaconCustomDetectionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: BeaconCustomDetectionAriResourceOwner,
  resourceType: BeaconCustomDetectionAriResourceType,
  resourceIdSlug: "{workspaceId}/{customDetectionId}",
  resourceIdSegmentFormats: {
    workspaceId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    customDetectionId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/beacon/custom-detection/index.ts
var BeaconCustomDetectionAri = class _BeaconCustomDetectionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._customDetectionId = opts.resourceIdSegmentValues.customDetectionId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get customDetectionId() {
    return this._customDetectionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: beaconCustomDetectionAriStaticOpts.qualifier,
      platformQualifier: beaconCustomDetectionAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: beaconCustomDetectionAriStaticOpts.resourceOwner,
      resourceType: beaconCustomDetectionAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.customDetectionId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        customDetectionId: opts.customDetectionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, beaconCustomDetectionAriStaticOpts);
    return new _BeaconCustomDetectionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, beaconCustomDetectionAriStaticOpts);
    return new _BeaconCustomDetectionAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      customDetectionId: this.customDetectionId
    };
  }
};

// src/avp/dashboard/types.ts
var AvpDashboardAriResourceOwner = "avp", AvpDashboardAriResourceType = "dashboard";

// src/avp/dashboard/manifest.ts
var avpDashboardAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: AvpDashboardAriResourceOwner,
  resourceType: AvpDashboardAriResourceType,
  resourceIdSlug: "activation/{activationId}/{dashboardId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    dashboardId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/avp/dashboard/index.ts
var AvpDashboardAri = class _AvpDashboardAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._dashboardId = opts.resourceIdSegmentValues.dashboardId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get dashboardId() {
    return this._dashboardId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: avpDashboardAriStaticOpts.qualifier,
      platformQualifier: avpDashboardAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: avpDashboardAriStaticOpts.resourceOwner,
      resourceType: avpDashboardAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.dashboardId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        dashboardId: opts.dashboardId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, avpDashboardAriStaticOpts);
    return new _AvpDashboardAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, avpDashboardAriStaticOpts);
    return new _AvpDashboardAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      dashboardId: this.dashboardId
    };
  }
};

// src/avp/datasource/types.ts
var AvpDatasourceAriResourceOwner = "avp", AvpDatasourceAriResourceType = "datasource";

// src/avp/datasource/manifest.ts
var avpDatasourceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: AvpDatasourceAriResourceOwner,
  resourceType: AvpDatasourceAriResourceType,
  resourceIdSlug: "activation/{activationId}/{datasourceId}",
  resourceIdSegmentFormats: {
    activationId: /[a-zA-Z0-9\-]+/,
    // eslint-disable-line no-useless-escape
    datasourceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/avp/datasource/index.ts
var AvpDatasourceAri = class _AvpDatasourceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._activationId = opts.resourceIdSegmentValues.activationId, this._datasourceId = opts.resourceIdSegmentValues.datasourceId;
  }
  get siteId() {
    return this._siteId;
  }
  get activationId() {
    return this._activationId;
  }
  get datasourceId() {
    return this._datasourceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: avpDatasourceAriStaticOpts.qualifier,
      platformQualifier: avpDatasourceAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: avpDatasourceAriStaticOpts.resourceOwner,
      resourceType: avpDatasourceAriStaticOpts.resourceType,
      resourceId: `activation/${opts.activationId}/${opts.datasourceId}`,
      resourceIdSegmentValues: {
        activationId: opts.activationId,
        datasourceId: opts.datasourceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, avpDatasourceAriStaticOpts);
    return new _AvpDatasourceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, avpDatasourceAriStaticOpts);
    return new _AvpDatasourceAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      activationId: this.activationId,
      datasourceId: this.datasourceId
    };
  }
};

// src/avocado/site/types.ts
var AvocadoSiteAriResourceOwner = "avocado", AvocadoSiteAriResourceType = "site";

// src/avocado/site/manifest.ts
var avocadoSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AvocadoSiteAriResourceOwner,
  resourceType: AvocadoSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/avocado/site/index.ts
var AvocadoSiteAri = class _AvocadoSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: avocadoSiteAriStaticOpts.qualifier,
      platformQualifier: avocadoSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: avocadoSiteAriStaticOpts.resourceOwner,
      resourceType: avocadoSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, avocadoSiteAriStaticOpts);
    return new _AvocadoSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, avocadoSiteAriStaticOpts);
    return new _AvocadoSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/avocado/user/types.ts
var AvocadoUserAriResourceOwner = "avocado", AvocadoUserAriResourceType = "user";

// src/avocado/user/manifest.ts
var avocadoUserAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AvocadoUserAriResourceOwner,
  resourceType: AvocadoUserAriResourceType,
  resourceIdSlug: "{userId}",
  resourceIdSegmentFormats: {
    userId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/avocado/user/index.ts
var AvocadoUserAri = class _AvocadoUserAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._userId = opts.resourceIdSegmentValues.userId;
  }
  get userId() {
    return this._userId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: avocadoUserAriStaticOpts.qualifier,
      platformQualifier: avocadoUserAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: avocadoUserAriStaticOpts.resourceOwner,
      resourceType: avocadoUserAriStaticOpts.resourceType,
      resourceId: `${opts.userId}`,
      resourceIdSegmentValues: {
        userId: opts.userId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, avocadoUserAriStaticOpts);
    return new _AvocadoUserAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, avocadoUserAriStaticOpts);
    return new _AvocadoUserAri(opts);
  }
  getVariables() {
    return {
      userId: this.userId
    };
  }
};

// src/avocado/answer/types.ts
var AvocadoAnswerAriResourceOwner = "avocado", AvocadoAnswerAriResourceType = "answer";

// src/avocado/answer/manifest.ts
var avocadoAnswerAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: AvocadoAnswerAriResourceOwner,
  resourceType: AvocadoAnswerAriResourceType,
  resourceIdSlug: "activation/{workspaceId}/{answerId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    answerId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/avocado/answer/index.ts
var AvocadoAnswerAri = class _AvocadoAnswerAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._answerId = opts.resourceIdSegmentValues.answerId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get answerId() {
    return this._answerId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: avocadoAnswerAriStaticOpts.qualifier,
      platformQualifier: avocadoAnswerAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: avocadoAnswerAriStaticOpts.resourceOwner,
      resourceType: avocadoAnswerAriStaticOpts.resourceType,
      resourceId: `activation/${opts.workspaceId}/${opts.answerId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        answerId: opts.answerId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, avocadoAnswerAriStaticOpts);
    return new _AvocadoAnswerAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, avocadoAnswerAriStaticOpts);
    return new _AvocadoAnswerAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      answerId: this.answerId
    };
  }
};

// src/avocado/question/types.ts
var AvocadoQuestionAriResourceOwner = "avocado", AvocadoQuestionAriResourceType = "question";

// src/avocado/question/manifest.ts
var avocadoQuestionAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^[a-zA-Z0-9-]+$"),
  resourceOwner: AvocadoQuestionAriResourceOwner,
  resourceType: AvocadoQuestionAriResourceType,
  resourceIdSlug: "activation/{workspaceId}/{questionId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    questionId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/avocado/question/index.ts
var AvocadoQuestionAri = class _AvocadoQuestionAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.cloudId || "", this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._questionId = opts.resourceIdSegmentValues.questionId;
  }
  get siteId() {
    return this._siteId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get questionId() {
    return this._questionId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: avocadoQuestionAriStaticOpts.qualifier,
      platformQualifier: avocadoQuestionAriStaticOpts.platformQualifier,
      cloudId: opts.siteId,
      resourceOwner: avocadoQuestionAriStaticOpts.resourceOwner,
      resourceType: avocadoQuestionAriStaticOpts.resourceType,
      resourceId: `activation/${opts.workspaceId}/${opts.questionId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        questionId: opts.questionId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, avocadoQuestionAriStaticOpts);
    return new _AvocadoQuestionAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, avocadoQuestionAriStaticOpts);
    return new _AvocadoQuestionAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId,
      workspaceId: this.workspaceId,
      questionId: this.questionId
    };
  }
};

// src/avocado/role/types.ts
var AvocadoRoleAriResourceOwner = "avocado", AvocadoRoleAriResourceType = "role";

// src/avocado/role/manifest.ts
var avocadoRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AvocadoRoleAriResourceOwner,
  resourceType: AvocadoRoleAriResourceType,
  resourceIdSlug: "product/{roleType}",
  resourceIdSegmentFormats: {
    roleType: /(?:member|admin)/
    // eslint-disable-line no-useless-escape
  }
};

// src/avocado/role/index.ts
var AvocadoRoleAri = class _AvocadoRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleType = opts.resourceIdSegmentValues.roleType;
  }
  get roleType() {
    return this._roleType;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: avocadoRoleAriStaticOpts.qualifier,
      platformQualifier: avocadoRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: avocadoRoleAriStaticOpts.resourceOwner,
      resourceType: avocadoRoleAriStaticOpts.resourceType,
      resourceId: `product/${opts.roleType}`,
      resourceIdSegmentValues: {
        roleType: opts.roleType
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, avocadoRoleAriStaticOpts);
    return new _AvocadoRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, avocadoRoleAriStaticOpts);
    return new _AvocadoRoleAri(opts);
  }
  getVariables() {
    return {
      roleType: this.roleType
    };
  }
};

// src/atlashub/site/types.ts
var AtlashubSiteAriResourceOwner = "atlashub", AtlashubSiteAriResourceType = "site";

// src/atlashub/site/manifest.ts
var atlashubSiteAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AtlashubSiteAriResourceOwner,
  resourceType: AtlashubSiteAriResourceType,
  resourceIdSlug: "{siteId}",
  resourceIdSegmentFormats: {
    siteId: /[a-zA-Z0-9\-]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/atlashub/site/index.ts
var AtlashubSiteAri = class _AtlashubSiteAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._siteId = opts.resourceIdSegmentValues.siteId;
  }
  get siteId() {
    return this._siteId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: atlashubSiteAriStaticOpts.qualifier,
      platformQualifier: atlashubSiteAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: atlashubSiteAriStaticOpts.resourceOwner,
      resourceType: atlashubSiteAriStaticOpts.resourceType,
      resourceId: `${opts.siteId}`,
      resourceIdSegmentValues: {
        siteId: opts.siteId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, atlashubSiteAriStaticOpts);
    return new _AtlashubSiteAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, atlashubSiteAriStaticOpts);
    return new _AtlashubSiteAri(opts);
  }
  getVariables() {
    return {
      siteId: this.siteId
    };
  }
};

// src/automation/role/types.ts
var AutomationRoleAriResourceOwner = "automation", AutomationRoleAriResourceType = "role";

// src/automation/role/manifest.ts
var automationRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AutomationRoleAriResourceOwner,
  resourceType: AutomationRoleAriResourceType,
  resourceIdSlug: "{roleId}",
  resourceIdSegmentFormats: {
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/automation/role/index.ts
var AutomationRoleAri = class _AutomationRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: automationRoleAriStaticOpts.qualifier,
      platformQualifier: automationRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: automationRoleAriStaticOpts.resourceOwner,
      resourceType: automationRoleAriStaticOpts.resourceType,
      resourceId: `${opts.roleId}`,
      resourceIdSegmentValues: {
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, automationRoleAriStaticOpts);
    return new _AutomationRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, automationRoleAriStaticOpts);
    return new _AutomationRoleAri(opts);
  }
  getVariables() {
    return {
      roleId: this.roleId
    };
  }
};

// src/automation/rule/types.ts
var AutomationRuleAriResourceOwner = "automation", AutomationRuleAriResourceType = "rule";

// src/automation/rule/manifest.ts
var automationRuleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AutomationRuleAriResourceOwner,
  resourceType: AutomationRuleAriResourceType,
  resourceIdSlug: "{ruleId}",
  resourceIdSegmentFormats: {
    ruleId: /[0-9]+/
    // eslint-disable-line no-useless-escape
  }
};

// src/automation/rule/index.ts
var AutomationRuleAri = class _AutomationRuleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._ruleId = opts.resourceIdSegmentValues.ruleId;
  }
  get ruleId() {
    return this._ruleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: automationRuleAriStaticOpts.qualifier,
      platformQualifier: automationRuleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: automationRuleAriStaticOpts.resourceOwner,
      resourceType: automationRuleAriStaticOpts.resourceType,
      resourceId: `${opts.ruleId}`,
      resourceIdSegmentValues: {
        ruleId: opts.ruleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, automationRuleAriStaticOpts);
    return new _AutomationRuleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, automationRuleAriStaticOpts);
    return new _AutomationRuleAri(opts);
  }
  getVariables() {
    return {
      ruleId: this.ruleId
    };
  }
};

// src/core/rules/resource-matcher.ts
function validateNullableResourceMatcher(maybeMatcher) {
  maybeMatcher.length !== 0 && validateMatcher(maybeMatcher);
}
function validateResourceMatcher(maybeMatcher) {
  if (!maybeMatcher)
    throw Error("Matcher must be defined");
  validateMatcher(maybeMatcher);
}
function validateMatcher(maybeMatcher) {
  try {
    new RegExp(maybeMatcher);
  } catch (e) {
    throw Error("Invalid matcher sequence");
  }
}

// src/core/parser/arm.ts
var NUMBER_OF_ARM_SEGMENTS = 5, ArmParser = class extends BaseParser {
  static fromString(maybeArm) {
    let segments = this.getIdentifierSegments(maybeArm, NUMBER_OF_ARM_SEGMENTS), [qualifier, platformQualifier, resourceOwnerMatcher, cloudIdMatcher, resourceTypeAndIdMatchers] = segments, [resourceTypeMatcher, resourceIdMatcher] = resourceTypeAndIdMatchers.split("/"), maybeArmOpts = {
      qualifier,
      platformQualifier,
      cloudIdMatcher,
      resourceOwnerMatcher,
      resourceTypeMatcher,
      resourceIdMatcher
    };
    return this.fromOpts(maybeArmOpts);
  }
  static fromOpts(maybeArmOpts) {
    let {
      qualifier = "arm",
      platformQualifier = "cloud",
      cloudIdMatcher,
      resourceOwnerMatcher,
      resourceTypeMatcher,
      resourceIdMatcher
    } = maybeArmOpts;
    return validateArmQualifier(qualifier), validatePlatformQualifier(platformQualifier), validateNullableResourceMatcher(cloudIdMatcher), validateResourceMatcher(resourceOwnerMatcher), validateResourceMatcher(resourceTypeMatcher), validateResourceMatcher(resourceIdMatcher), {
      platformQualifier,
      cloudIdMatcher,
      resourceOwnerMatcher,
      resourceTypeMatcher,
      resourceIdMatcher
    };
  }
};

// src/arm.ts
var Arm = class _Arm {
  static create(armOpts) {
    let opts = ArmParser.fromOpts({
      ...armOpts,
      qualifier: "arm",
      platformQualifier: armOpts.platformQualifier || "cloud",
      cloudIdMatcher: armOpts.cloudIdMatcher
    });
    return new _Arm(opts);
  }
  static parse(maybeArm) {
    let opts = ArmParser.fromString(maybeArm);
    return new _Arm(opts);
  }
  constructor(opts) {
    this._platformQualifier = opts.platformQualifier, this._cloudIdMatcher = opts.cloudIdMatcher, this._resourceOwnerMatcher = opts.resourceOwnerMatcher, this._resourceTypeMatcher = opts.resourceTypeMatcher, this._resourceIdMatcher = opts.resourceIdMatcher;
  }
  get platformQualifier() {
    return this._platformQualifier;
  }
  get cloudIdMatcher() {
    return this._cloudIdMatcher;
  }
  get resourceOwnerMatcher() {
    return this._resourceOwnerMatcher;
  }
  get resourceTypeMatcher() {
    return this._resourceTypeMatcher;
  }
  get resourceIdMatcher() {
    return this._resourceIdMatcher;
  }
  match(ari) {
    var _a, _b;
    let cloudId = (_a = ari.cloudId) != null ? _a : "", resourceOwner = ari.resourceOwner, resourceType = ari.resourceType, resourceId = ari.resourceId;
    return !(!new RegExp((_b = this.cloudIdMatcher) != null ? _b : "").test(cloudId) || !new RegExp(this.resourceOwnerMatcher).test(resourceOwner) || !new RegExp(this.resourceTypeMatcher).test(resourceType) || !new RegExp(this.resourceIdMatcher).test(resourceId));
  }
  equals(other) {
    return this.toString() === other.toString();
  }
  toString() {
    let {
      platformQualifier,
      resourceOwnerMatcher,
      cloudIdMatcher = "",
      resourceTypeMatcher,
      resourceIdMatcher
    } = this;
    return `arm:${platformQualifier}:${resourceOwnerMatcher}:${cloudIdMatcher}:${resourceTypeMatcher}/${resourceIdMatcher}`;
  }
  toJSON() {
    return this.toString();
  }
  toOpts() {
    return {
      platformQualifier: this.platformQualifier,
      cloudIdMatcher: this.cloudIdMatcher,
      resourceOwnerMatcher: this.resourceOwnerMatcher,
      resourceTypeMatcher: this.resourceTypeMatcher,
      resourceIdMatcher: this.resourceIdMatcher
    };
  }
};

// src/atlashub/id/types.ts
var AtlashubIdAriResourceOwner = "atlashub", AtlashubIdAriResourceType = "id";

// src/atlashub/id/manifest.ts
var atlashubIdAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AtlashubIdAriResourceOwner,
  resourceType: AtlashubIdAriResourceType,
  resourceIdSlug: "{id}",
  resourceIdSegmentFormats: {
    id: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/atlashub/id/index.ts
var AtlashubIdAri = class _AtlashubIdAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._id = opts.resourceIdSegmentValues.id;
  }
  get id() {
    return this._id;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: atlashubIdAriStaticOpts.qualifier,
      platformQualifier: atlashubIdAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: atlashubIdAriStaticOpts.resourceOwner,
      resourceType: atlashubIdAriStaticOpts.resourceType,
      resourceId: `${opts.id}`,
      resourceIdSegmentValues: {
        id: opts.id
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, atlashubIdAriStaticOpts);
    return new _AtlashubIdAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, atlashubIdAriStaticOpts);
    return new _AtlashubIdAri(opts);
  }
  getVariables() {
    return {
      id: this.id
    };
  }
};

// src/analytics/user/types.ts
var AnalyticsUserAriResourceOwner = "analytics", AnalyticsUserAriResourceType = "user";

// src/analytics/user/manifest.ts
var analyticsUserAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: AnalyticsUserAriResourceOwner,
  resourceType: AnalyticsUserAriResourceType,
  resourceIdSlug: "anonymous/{anonUserId}",
  resourceIdSegmentFormats: {
    anonUserId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/analytics/user/index.ts
var AnalyticsUserAri = class _AnalyticsUserAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._anonUserId = opts.resourceIdSegmentValues.anonUserId;
  }
  get anonUserId() {
    return this._anonUserId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: analyticsUserAriStaticOpts.qualifier,
      platformQualifier: analyticsUserAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: analyticsUserAriStaticOpts.resourceOwner,
      resourceType: analyticsUserAriStaticOpts.resourceType,
      resourceId: `anonymous/${opts.anonUserId}`,
      resourceIdSegmentValues: {
        anonUserId: opts.anonUserId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, analyticsUserAriStaticOpts);
    return new _AnalyticsUserAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, analyticsUserAriStaticOpts);
    return new _AnalyticsUserAri(opts);
  }
  getVariables() {
    return {
      anonUserId: this.anonUserId
    };
  }
};

// src/approval-desk/workflow/types.ts
var ApprovalDeskWorkflowAriResourceOwner = "approval-desk", ApprovalDeskWorkflowAriResourceType = "workflow";

// src/approval-desk/workflow/manifest.ts
var approvalDeskWorkflowAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: ApprovalDeskWorkflowAriResourceOwner,
  resourceType: ApprovalDeskWorkflowAriResourceType,
  resourceIdSlug: "{workspaceId}/{workflowId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    workflowId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/approval-desk/workflow/index.ts
var ApprovalDeskWorkflowAri = class _ApprovalDeskWorkflowAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._workflowId = opts.resourceIdSegmentValues.workflowId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get workflowId() {
    return this._workflowId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: approvalDeskWorkflowAriStaticOpts.qualifier,
      platformQualifier: approvalDeskWorkflowAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: approvalDeskWorkflowAriStaticOpts.resourceOwner,
      resourceType: approvalDeskWorkflowAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.workflowId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        workflowId: opts.workflowId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, approvalDeskWorkflowAriStaticOpts);
    return new _ApprovalDeskWorkflowAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, approvalDeskWorkflowAriStaticOpts);
    return new _ApprovalDeskWorkflowAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      workflowId: this.workflowId
    };
  }
};

// src/approval-desk/workspace/types.ts
var ApprovalDeskWorkspaceAriResourceOwner = "approval-desk", ApprovalDeskWorkspaceAriResourceType = "workspace";

// src/approval-desk/workspace/manifest.ts
var approvalDeskWorkspaceAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: ApprovalDeskWorkspaceAriResourceOwner,
  resourceType: ApprovalDeskWorkspaceAriResourceType,
  resourceIdSlug: "{workspaceId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/approval-desk/workspace/index.ts
var ApprovalDeskWorkspaceAri = class _ApprovalDeskWorkspaceAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: approvalDeskWorkspaceAriStaticOpts.qualifier,
      platformQualifier: approvalDeskWorkspaceAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: approvalDeskWorkspaceAriStaticOpts.resourceOwner,
      resourceType: approvalDeskWorkspaceAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, approvalDeskWorkspaceAriStaticOpts);
    return new _ApprovalDeskWorkspaceAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, approvalDeskWorkspaceAriStaticOpts);
    return new _ApprovalDeskWorkspaceAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId
    };
  }
};

// src/approval-desk/decision-table/types.ts
var ApprovalDeskDecisionTableAriResourceOwner = "approval-desk", ApprovalDeskDecisionTableAriResourceType = "decision-table";

// src/approval-desk/decision-table/manifest.ts
var approvalDeskDecisionTableAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: ApprovalDeskDecisionTableAriResourceOwner,
  resourceType: ApprovalDeskDecisionTableAriResourceType,
  resourceIdSlug: "{workspaceId}/{workflowId}/{decisionTableId}",
  resourceIdSegmentFormats: {
    workspaceId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    workflowId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/,
    // eslint-disable-line no-useless-escape
    decisionTableId: /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/
    // eslint-disable-line no-useless-escape
  }
};

// src/approval-desk/decision-table/index.ts
var ApprovalDeskDecisionTableAri = class _ApprovalDeskDecisionTableAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._workspaceId = opts.resourceIdSegmentValues.workspaceId, this._workflowId = opts.resourceIdSegmentValues.workflowId, this._decisionTableId = opts.resourceIdSegmentValues.decisionTableId;
  }
  get workspaceId() {
    return this._workspaceId;
  }
  get workflowId() {
    return this._workflowId;
  }
  get decisionTableId() {
    return this._decisionTableId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: approvalDeskDecisionTableAriStaticOpts.qualifier,
      platformQualifier: approvalDeskDecisionTableAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: approvalDeskDecisionTableAriStaticOpts.resourceOwner,
      resourceType: approvalDeskDecisionTableAriStaticOpts.resourceType,
      resourceId: `${opts.workspaceId}/${opts.workflowId}/${opts.decisionTableId}`,
      resourceIdSegmentValues: {
        workspaceId: opts.workspaceId,
        workflowId: opts.workflowId,
        decisionTableId: opts.decisionTableId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, approvalDeskDecisionTableAriStaticOpts);
    return new _ApprovalDeskDecisionTableAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, approvalDeskDecisionTableAriStaticOpts);
    return new _ApprovalDeskDecisionTableAri(opts);
  }
  getVariables() {
    return {
      workspaceId: this.workspaceId,
      workflowId: this.workflowId,
      decisionTableId: this.decisionTableId
    };
  }
};

// src/approval-desk/role/types.ts
var ApprovalDeskRoleAriResourceOwner = "approval-desk", ApprovalDeskRoleAriResourceType = "role";

// src/approval-desk/role/manifest.ts
var approvalDeskRoleAriStaticOpts = {
  qualifier: "ari",
  platformQualifier: "cloud",
  cloudId: new RegExp("^$"),
  resourceOwner: ApprovalDeskRoleAriResourceOwner,
  resourceType: ApprovalDeskRoleAriResourceType,
  resourceIdSlug: "{scope}/{roleId}",
  resourceIdSegmentFormats: {
    scope: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/,
    // eslint-disable-line no-useless-escape
    roleId: /[a-zA-Z0-9\-_.~@:{}=]+(\/[a-zA-Z0-9\-_.~@:{}=]+)*/
    // eslint-disable-line no-useless-escape
  }
};

// src/approval-desk/role/index.ts
var ApprovalDeskRoleAri = class _ApprovalDeskRoleAri extends RegisteredAri {
  constructor(opts) {
    super(opts);
    this._scope = opts.resourceIdSegmentValues.scope, this._roleId = opts.resourceIdSegmentValues.roleId;
  }
  get scope() {
    return this._scope;
  }
  get roleId() {
    return this._roleId;
  }
  static create(opts) {
    let derivedOpts = {
      qualifier: approvalDeskRoleAriStaticOpts.qualifier,
      platformQualifier: approvalDeskRoleAriStaticOpts.platformQualifier,
      cloudId: void 0,
      resourceOwner: approvalDeskRoleAriStaticOpts.resourceOwner,
      resourceType: approvalDeskRoleAriStaticOpts.resourceType,
      resourceId: `${opts.scope}/${opts.roleId}`,
      resourceIdSegmentValues: {
        scope: opts.scope,
        roleId: opts.roleId
      }
    }, ariOpts = AriParser.fromOpts(derivedOpts, approvalDeskRoleAriStaticOpts);
    return new _ApprovalDeskRoleAri(ariOpts);
  }
  static parse(maybeAri) {
    let opts = AriParser.fromString(maybeAri, approvalDeskRoleAriStaticOpts);
    return new _ApprovalDeskRoleAri(opts);
  }
  getVariables() {
    return {
      scope: this.scope,
      roleId: this.roleId
    };
  }
};

// src/core/types/deprecated/resource-owner-enum.ts
var ResourceOwnerEnum = /* @__PURE__ */ ((ResourceOwnerEnum2) => (ResourceOwnerEnum2.Analytics = "analytics", ResourceOwnerEnum2.ApprovalDesk = "approval-desk", ResourceOwnerEnum2.Atlashub = "atlashub", ResourceOwnerEnum2.Automation = "automation", ResourceOwnerEnum2.Avocado = "avocado", ResourceOwnerEnum2.Avp = "avp", ResourceOwnerEnum2.Beacon = "beacon", ResourceOwnerEnum2.Bitbucket = "bitbucket", ResourceOwnerEnum2.Brie = "brie", ResourceOwnerEnum2.Canvas = "canvas", ResourceOwnerEnum2.Cmdb = "cmdb", ResourceOwnerEnum2.Commerce = "commerce", ResourceOwnerEnum2.Compass = "compass", ResourceOwnerEnum2.Confluence = "confluence", ResourceOwnerEnum2.ConversationalHelp = "conversational-help", ResourceOwnerEnum2.DataLake = "data-lake", ResourceOwnerEnum2.Devops = "devops", ResourceOwnerEnum2.Ecosystem = "ecosystem", ResourceOwnerEnum2.Elements = "elements", ResourceOwnerEnum2.ExusExternal = "exus-external", ResourceOwnerEnum2.Figma = "figma", ResourceOwnerEnum2.Google = "google", ResourceOwnerEnum2.Graph = "graph", ResourceOwnerEnum2.Help = "help", ResourceOwnerEnum2.Identity = "identity", ResourceOwnerEnum2.Jira = "jira", ResourceOwnerEnum2.JiraAlign = "jira-align", ResourceOwnerEnum2.JiraCore = "jira-core", ResourceOwnerEnum2.JiraServicedesk = "jira-servicedesk", ResourceOwnerEnum2.JiraSoftware = "jira-software", ResourceOwnerEnum2.LinkingPlatform = "linking-platform", ResourceOwnerEnum2.MakerSpace = "maker-space", ResourceOwnerEnum2.Marketing = "marketing", ResourceOwnerEnum2.Marketplace = "marketplace", ResourceOwnerEnum2.Measurement = "measurement", ResourceOwnerEnum2.Media = "media", ResourceOwnerEnum2.Mercury = "mercury", ResourceOwnerEnum2.Oauth = "oauth", ResourceOwnerEnum2.Opsgenie = "opsgenie", ResourceOwnerEnum2.Papi = "papi", ResourceOwnerEnum2.Passionfruit = "passionfruit", ResourceOwnerEnum2.PeoplePerftool = "people-perftool", ResourceOwnerEnum2.Platform = "platform", ResourceOwnerEnum2.PlatformServices = "platform-services", ResourceOwnerEnum2.Pollinator = "pollinator", ResourceOwnerEnum2.PostOffice = "post-office", ResourceOwnerEnum2.RuntimeAuthClient = "runtime-auth-client", ResourceOwnerEnum2.Search = "search", ResourceOwnerEnum2.Statuspage = "statuspage", ResourceOwnerEnum2.Support = "support", ResourceOwnerEnum2.Teams = "teams", ResourceOwnerEnum2.Townsquare = "townsquare", ResourceOwnerEnum2.Trello = "trello", ResourceOwnerEnum2.UnifiedHelp = "unified-help", ResourceOwnerEnum2.VirtualAgent = "virtual-agent", ResourceOwnerEnum2))(ResourceOwnerEnum || {});

// src/core/types/deprecated/resource-type-enum.ts
var ResourceTypeEnum = /* @__PURE__ */ ((ResourceTypeEnum2) => (ResourceTypeEnum2.AccountLogin = "account-login", ResourceTypeEnum2.AccountSettings = "account-settings", ResourceTypeEnum2.AdminAnnouncementBanner = "admin-announcement-banner", ResourceTypeEnum2.Alert = "alert", ResourceTypeEnum2.AlertRecipientLink = "alert-recipient-link", ResourceTypeEnum2.AnnouncementBanner = "announcement-banner", ResourceTypeEnum2.Answer = "answer", ResourceTypeEnum2.Api = "api", ResourceTypeEnum2.ApiRequestMetric = "api-request-metric", ResourceTypeEnum2.App = "app", ResourceTypeEnum2.AppEnvironmentVersion = "app-environment-version", ResourceTypeEnum2.Approval = "approval", ResourceTypeEnum2.Article = "article", ResourceTypeEnum2.AssistantAnswer = "assistant-answer", ResourceTypeEnum2.Attachment = "attachment", ResourceTypeEnum2.Attribute = "attribute", ResourceTypeEnum2.AuthPolicy = "auth-policy", ResourceTypeEnum2.AvailableFields = "available-fields", ResourceTypeEnum2.Blogpost = "blogpost", ResourceTypeEnum2.Board = "board", ResourceTypeEnum2.BoardFeature = "board-feature", ResourceTypeEnum2.BoardIssueList = "board-issue-list", ResourceTypeEnum2.Branch = "branch", ResourceTypeEnum2.BranchHistory = "branch-history", ResourceTypeEnum2.Build = "build", ResourceTypeEnum2.BuildHistory = "build-history", ResourceTypeEnum2.BulkOperationTask = "bulk-operation-task", ResourceTypeEnum2.CalendarEvent = "calendar-event", ResourceTypeEnum2.Calibration = "calibration", ResourceTypeEnum2.CallRouting = "call-routing", ResourceTypeEnum2.CannedResponse = "canned-response", ResourceTypeEnum2.Card = "card", ResourceTypeEnum2.CardColor = "card-color", ResourceTypeEnum2.CardLayout = "card-layout", ResourceTypeEnum2.CardParent = "card-parent", ResourceTypeEnum2.CatalogAccount = "catalog-account", ResourceTypeEnum2.Change = "change", ResourceTypeEnum2.Channel = "channel", ResourceTypeEnum2.Check = "check", ResourceTypeEnum2.ClassificationTag = "classification-tag", ResourceTypeEnum2.Client = "client", ResourceTypeEnum2.Column = "column", ResourceTypeEnum2.Comment = "comment", ResourceTypeEnum2.Commit = "commit", ResourceTypeEnum2.Component = "component", ResourceTypeEnum2.ComponentLabel = "component-label", ResourceTypeEnum2.ComponentLink = "component-link", ResourceTypeEnum2.Configuration = "configuration", ResourceTypeEnum2.ConnectApp = "connect-app", ResourceTypeEnum2.Container = "container", ResourceTypeEnum2.Content = "content", ResourceTypeEnum2.Conversation = "conversation", ResourceTypeEnum2.ConversationMessage = "conversation-message", ResourceTypeEnum2.CustomDetection = "custom-detection", ResourceTypeEnum2.CustomEmojiMetadata = "custom-emoji-metadata", ResourceTypeEnum2.Customer = "customer", ResourceTypeEnum2.CustomerDirectory = "customer-directory", ResourceTypeEnum2.CustomerDomain = "customer-domain", ResourceTypeEnum2.CustomerOrganization = "customer-organization", ResourceTypeEnum2.CustomFieldDefinition = "custom-field-definition", ResourceTypeEnum2.CustomFilter = "custom-filter", ResourceTypeEnum2.CustomRole = "custom-role", ResourceTypeEnum2.Dashboard = "dashboard", ResourceTypeEnum2.Database = "database", ResourceTypeEnum2.Datasource = "datasource", ResourceTypeEnum2.DecisionTable = "decision-table", ResourceTypeEnum2.Deployment = "deployment", ResourceTypeEnum2.DeploymentHistory = "deployment-history", ResourceTypeEnum2.DeploymentServiceLink = "deployment-service-link", ResourceTypeEnum2.Design = "design", ResourceTypeEnum2.DesignHistory = "design-history", ResourceTypeEnum2.Detection = "detection", ResourceTypeEnum2.DetectionSetting = "detection-setting", ResourceTypeEnum2.DevopsComponent = "devops-component", ResourceTypeEnum2.Directory = "directory", ResourceTypeEnum2.Document = "document", ResourceTypeEnum2.DocumentHistory = "document-history", ResourceTypeEnum2.Domain = "domain", ResourceTypeEnum2.EmailUuid = "email-uuid", ResourceTypeEnum2.Embed = "embed", ResourceTypeEnum2.Enterprise = "enterprise", ResourceTypeEnum2.Entitlement = "entitlement", ResourceTypeEnum2.EntitlementTemplate = "entitlement-template", ResourceTypeEnum2.EntityProperty = "entity-property", ResourceTypeEnum2.Environment = "environment", ResourceTypeEnum2.Epic = "epic", ResourceTypeEnum2.Escalation = "escalation", ResourceTypeEnum2.Event = "event", ResourceTypeEnum2.EventSource = "event-source", ResourceTypeEnum2.Extension = "extension", ResourceTypeEnum2.ExtensionGroup = "extension-group", ResourceTypeEnum2.Favourite = "favourite", ResourceTypeEnum2.FeatureFlag = "feature-flag", ResourceTypeEnum2.FeatureFlagHistory = "feature-flag-history", ResourceTypeEnum2.Feedback = "feedback", ResourceTypeEnum2.File = "file", ResourceTypeEnum2.Filter = "filter", ResourceTypeEnum2.FilterEmailSubscription = "filter-email-subscription", ResourceTypeEnum2.FlowEditor = "flow-editor", ResourceTypeEnum2.Form = "form", ResourceTypeEnum2.Goal = "goal", ResourceTypeEnum2.Group = "group", ResourceTypeEnum2.HelpCenter = "help-center", ResourceTypeEnum2.HelpDesk = "help-desk", ResourceTypeEnum2.HelpPointer = "help-pointer", ResourceTypeEnum2.Id = "id", ResourceTypeEnum2.ImportConfiguration = "import-configuration", ResourceTypeEnum2.Incident = "incident", ResourceTypeEnum2.IncidentAlertLink = "incident-alert-link", ResourceTypeEnum2.IncidentHistory = "incident-history", ResourceTypeEnum2.IncidentStatusUpdate = "incident-status-update", ResourceTypeEnum2.IncomingCallHistory = "incoming-call-history", ResourceTypeEnum2.IncomingWebhook = "incoming-webhook", ResourceTypeEnum2.Initiative = "initiative", ResourceTypeEnum2.Instance = "instance", ResourceTypeEnum2.Integration = "integration", ResourceTypeEnum2.IntentProjection = "intent-projection", ResourceTypeEnum2.IntentQuestionProjection = "intent-question-projection", ResourceTypeEnum2.IntentRuleProjection = "intent-rule-projection", ResourceTypeEnum2.IntentTemplate = "intent-template", ResourceTypeEnum2.InvoiceGroup = "invoice-group", ResourceTypeEnum2.Issue = "issue", ResourceTypeEnum2.IssueAttachment = "issue-attachment", ResourceTypeEnum2.IssueComment = "issue-comment", ResourceTypeEnum2.IssueFieldMetadata = "issue-field-metadata", ResourceTypeEnum2.IssueFieldOption = "issue-field-option", ResourceTypeEnum2.Issuefieldvalue = "issuefieldvalue", ResourceTypeEnum2.IssueHistory = "issue-history", ResourceTypeEnum2.IssueLink = "issue-link", ResourceTypeEnum2.IssueLinkType = "issue-link-type", ResourceTypeEnum2.IssueRemoteLink = "issue-remote-link", ResourceTypeEnum2.IssueSearchView = "issue-search-view", ResourceTypeEnum2.IssueStatus = "issue-status", ResourceTypeEnum2.IssueType = "issue-type", ResourceTypeEnum2.IssueTypeScheme = "issue-type-scheme", ResourceTypeEnum2.IssueTypeSchemeMapping = "issue-type-scheme-mapping", ResourceTypeEnum2.IssueWorklog = "issue-worklog", ResourceTypeEnum2.JiraProjectAndDevopsToolRelationship = "jira-project-and-devops-tool-relationship", ResourceTypeEnum2.JiraProjectAndDocumentationSpaceRelationship = "jira-project-and-documentation-space-relationship", ResourceTypeEnum2.JiraProjectAndOperationsTeamRelationship = "jira-project-and-operations-team-relationship", ResourceTypeEnum2.JiraProjectAndVcsRepositoryRelationship = "jira-project-and-vcs-repository-relationship", ResourceTypeEnum2.JiraProjectAndVcsRepositoryRelationshipTempMigration = "jira-project-and-vcs-repository-relationship-temp-migration", ResourceTypeEnum2.LakeConnection = "lake-connection", ResourceTypeEnum2.Layout = "layout", ResourceTypeEnum2.Learning = "learning", ResourceTypeEnum2.LifecycleResource = "lifecycle-resource", ResourceTypeEnum2.LifecycleResourcePackage = "lifecycle-resource-package", ResourceTypeEnum2.LifecycleResourcePackageType = "lifecycle-resource-package-type", ResourceTypeEnum2.List = "list", ResourceTypeEnum2.LongRunningTask = "long-running-task", ResourceTypeEnum2.MessageInstance = "message-instance", ResourceTypeEnum2.MessageTemplate = "message-template", ResourceTypeEnum2.MetricDefinition = "metric-definition", ResourceTypeEnum2.MetricSource = "metric-source", ResourceTypeEnum2.Namespace = "namespace", ResourceTypeEnum2.NavigationItem = "navigation-item", ResourceTypeEnum2.Note = "note", ResourceTypeEnum2.Notification = "notification", ResourceTypeEnum2.NotificationType = "notification-type", ResourceTypeEnum2.NotificationTypeScheme = "notification-type-scheme", ResourceTypeEnum2.NotificationUserPreference = "notification-user-preference", ResourceTypeEnum2.OauthClient = "oauthClient", ResourceTypeEnum2.OauthConsumer = "oauth-consumer", ResourceTypeEnum2.Object = "object", ResourceTypeEnum2.Offering = "offering", ResourceTypeEnum2.OfferingRelationshipTemplate = "offering-relationship-template", ResourceTypeEnum2.OperationsWorkspace = "operations-workspace", ResourceTypeEnum2.Order = "order", ResourceTypeEnum2.Org = "org", ResourceTypeEnum2.Organization = "organization", ResourceTypeEnum2.OrgUser = "org-user", ResourceTypeEnum2.Page = "page", ResourceTypeEnum2.PaymentMethod = "payment-method", ResourceTypeEnum2.Performance = "performance", ResourceTypeEnum2.PermissionScheme = "permission-scheme", ResourceTypeEnum2.Plan = "plan", ResourceTypeEnum2.Portal = "portal", ResourceTypeEnum2.PostIncidentReview = "post-incident-review", ResourceTypeEnum2.PostIncidentReviewHistory = "post-incident-review-history", ResourceTypeEnum2.PostIncidentReviewLink = "post-incident-review-link", ResourceTypeEnum2.Presentation = "presentation", ResourceTypeEnum2.PricingPlan = "pricing-plan", ResourceTypeEnum2.Priority = "priority", ResourceTypeEnum2.Product = "product", ResourceTypeEnum2.Program = "program", ResourceTypeEnum2.ProgramStatusUpdate = "program-status-update", ResourceTypeEnum2.Project = "project", ResourceTypeEnum2.ProjectCategory = "project-category", ResourceTypeEnum2.ProjectFeature = "project-feature", ResourceTypeEnum2.ProjectOverview = "project-overview", ResourceTypeEnum2.ProjectRoleActor = "project-role-actor", ResourceTypeEnum2.ProjectShortcut = "project-shortcut", ResourceTypeEnum2.ProjectType = "project-type", ResourceTypeEnum2.Promotion = "promotion", ResourceTypeEnum2.Provider = "provider", ResourceTypeEnum2.PublicLink = "public-link", ResourceTypeEnum2.Pullrequest = "pullrequest", ResourceTypeEnum2.PullRequest = "pull-request", ResourceTypeEnum2.PullRequestHistory = "pull-request-history", ResourceTypeEnum2.Question = "question", ResourceTypeEnum2.Queue = "queue", ResourceTypeEnum2.Quote = "quote", ResourceTypeEnum2.Relationship = "relationship", ResourceTypeEnum2.RemoteLink = "remote-link", ResourceTypeEnum2.RemoteLinkHistory = "remote-link-history", ResourceTypeEnum2.Repository = "repository", ResourceTypeEnum2.RepositoryTransfer = "repository-transfer", ResourceTypeEnum2.RequestForm = "request-form", ResourceTypeEnum2.RequestType = "request-type", ResourceTypeEnum2.Resolution = "resolution", ResourceTypeEnum2.ResourceUsageMetric = "resource-usage-metric", ResourceTypeEnum2.ResourceUsageRecommendation = "resource-usage-recommendation", ResourceTypeEnum2.Role = "role", ResourceTypeEnum2.Rule = "rule", ResourceTypeEnum2.Schedule = "schedule", ResourceTypeEnum2.ScheduleRotation = "schedule-rotation", ResourceTypeEnum2.Schema = "schema", ResourceTypeEnum2.Scorecard = "scorecard", ResourceTypeEnum2.SecureTunnel = "secure-tunnel", ResourceTypeEnum2.SecurityContainer = "security-container", ResourceTypeEnum2.SecurityLevel = "security-level", ResourceTypeEnum2.SecurityWorkspace = "security-workspace", ResourceTypeEnum2.Service = "service", ResourceTypeEnum2.ServiceAndJiraProjectRelationship = "service-and-jira-project-relationship", ResourceTypeEnum2.ServiceAndOperationsTeamRelationship = "service-and-operations-team-relationship", ResourceTypeEnum2.ServiceAndVcsRepositoryRelationship = "service-and-vcs-repository-relationship", ResourceTypeEnum2.ServiceRelationship = "service-relationship", ResourceTypeEnum2.ShipToParty = "ship-to-party", ResourceTypeEnum2.Site = "site", ResourceTypeEnum2.SiteUser = "site-user", ResourceTypeEnum2.Sla = "sla", ResourceTypeEnum2.Space = "space", ResourceTypeEnum2.Spreadsheet = "spreadsheet", ResourceTypeEnum2.Sprint = "sprint", ResourceTypeEnum2.StreamhubSchema = "streamhub-schema", ResourceTypeEnum2.Subscription = "subscription", ResourceTypeEnum2.Swimlane = "swimlane", ResourceTypeEnum2.Tag = "tag", ResourceTypeEnum2.Task = "task", ResourceTypeEnum2.Team = "team", ResourceTypeEnum2.TeamCalendar = "team-calendar", ResourceTypeEnum2.TeamMember = "team-member", ResourceTypeEnum2.Timeline = "timeline", ResourceTypeEnum2.Tool = "tool", ResourceTypeEnum2.TransactionAccount = "transaction-account", ResourceTypeEnum2.Type = "type", ResourceTypeEnum2.User = "user", ResourceTypeEnum2.Userbase = "userbase", ResourceTypeEnum2.UserBoardConfig = "user-board-config", ResourceTypeEnum2.UserBroadcastMessage = "user-broadcast-message", ResourceTypeEnum2.UserDefinedParameter = "user-defined-parameter", ResourceTypeEnum2.UserGrant = "userGrant", ResourceTypeEnum2.UserProperty = "user-property", ResourceTypeEnum2.Version = "version", ResourceTypeEnum2.VersionApprover = "version-approver", ResourceTypeEnum2.ViewConfig = "view-config", ResourceTypeEnum2.Vulnerability = "vulnerability", ResourceTypeEnum2.VulnerabilityHistory = "vulnerability-history", ResourceTypeEnum2.Webhook = "webhook", ResourceTypeEnum2.Whiteboard = "whiteboard", ResourceTypeEnum2.WorkbenchResource = "workbench-resource", ResourceTypeEnum2.Workflow = "workflow", ResourceTypeEnum2.WorkflowScheme = "workflow-scheme", ResourceTypeEnum2.Worklog = "worklog", ResourceTypeEnum2.Workspace = "workspace", ResourceTypeEnum2))(ResourceTypeEnum || {});

var ari = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AnalyticsUserAri: AnalyticsUserAri,
    AnyAri: AnyAri,
    ApprovalDeskDecisionTableAri: ApprovalDeskDecisionTableAri,
    ApprovalDeskRoleAri: ApprovalDeskRoleAri,
    ApprovalDeskWorkflowAri: ApprovalDeskWorkflowAri,
    ApprovalDeskWorkspaceAri: ApprovalDeskWorkspaceAri,
    Ari: Ari,
    Arm: Arm,
    Ati: Ati,
    AtlashubIdAri: AtlashubIdAri,
    AtlashubSiteAri: AtlashubSiteAri,
    AutomationRoleAri: AutomationRoleAri,
    AutomationRuleAri: AutomationRuleAri,
    AvocadoAnswerAri: AvocadoAnswerAri,
    AvocadoQuestionAri: AvocadoQuestionAri,
    AvocadoRoleAri: AvocadoRoleAri,
    AvocadoSiteAri: AvocadoSiteAri,
    AvocadoUserAri: AvocadoUserAri,
    AvpDashboardAri: AvpDashboardAri,
    AvpDatasourceAri: AvpDatasourceAri,
    AvpRoleAri: AvpRoleAri,
    AvpSiteAri: AvpSiteAri,
    BeaconAlertAri: BeaconAlertAri,
    BeaconCustomDetectionAri: BeaconCustomDetectionAri,
    BeaconDetectionAri: BeaconDetectionAri,
    BeaconDetectionSettingAri: BeaconDetectionSettingAri,
    BeaconRoleAri: BeaconRoleAri,
    BeaconSiteAri: BeaconSiteAri,
    BeaconSubscriptionAri: BeaconSubscriptionAri,
    BeaconWorkspaceAri: BeaconWorkspaceAri,
    BitbucketAppAri: BitbucketAppAri,
    BitbucketOauthConsumerAri: BitbucketOauthConsumerAri,
    BitbucketProjectAri: BitbucketProjectAri,
    BitbucketPullrequestAri: BitbucketPullrequestAri,
    BitbucketRepositoryAri: BitbucketRepositoryAri,
    BitbucketRepositoryTransferAri: BitbucketRepositoryTransferAri,
    BitbucketSiteAri: BitbucketSiteAri,
    BitbucketTeamAri: BitbucketTeamAri,
    BitbucketWorkspaceAri: BitbucketWorkspaceAri,
    BrieRoleAri: BrieRoleAri,
    BrieSiteAri: BrieSiteAri,
    CanvasBoardAri: CanvasBoardAri,
    CanvasDatabaseAri: CanvasDatabaseAri,
    CanvasSiteAri: CanvasSiteAri,
    CanvasWorkspaceAri: CanvasWorkspaceAri,
    CmdbAttributeAri: CmdbAttributeAri,
    CmdbImportConfigurationAri: CmdbImportConfigurationAri,
    CmdbObjectAri: CmdbObjectAri,
    CmdbRoleAri: CmdbRoleAri,
    CmdbSchemaAri: CmdbSchemaAri,
    CmdbTypeAri: CmdbTypeAri,
    CmdbWorkspaceAri: CmdbWorkspaceAri,
    CommerceCatalogAccountAri: CommerceCatalogAccountAri,
    CommerceChangeAri: CommerceChangeAri,
    CommerceEntitlementAri: CommerceEntitlementAri,
    CommerceEntitlementTemplateAri: CommerceEntitlementTemplateAri,
    CommerceInitiativeAri: CommerceInitiativeAri,
    CommerceInvoiceGroupAri: CommerceInvoiceGroupAri,
    CommerceOfferingAri: CommerceOfferingAri,
    CommerceOfferingRelationshipTemplateAri: CommerceOfferingRelationshipTemplateAri,
    CommerceOrderAri: CommerceOrderAri,
    CommercePaymentMethodAri: CommercePaymentMethodAri,
    CommercePricingPlanAri: CommercePricingPlanAri,
    CommerceProductAri: CommerceProductAri,
    CommercePromotionAri: CommercePromotionAri,
    CommerceQuoteAri: CommerceQuoteAri,
    CommerceRoleAri: CommerceRoleAri,
    CommerceShipToPartyAri: CommerceShipToPartyAri,
    CommerceTransactionAccountAri: CommerceTransactionAccountAri,
    CommerceWorkbenchResourceAri: CommerceWorkbenchResourceAri,
    CompassAssistantAnswerAri: CompassAssistantAnswerAri,
    CompassComponentAri: CompassComponentAri,
    CompassComponentLabelAri: CompassComponentLabelAri,
    CompassComponentLinkAri: CompassComponentLinkAri,
    CompassCustomFieldDefinitionAri: CompassCustomFieldDefinitionAri,
    CompassEventSourceAri: CompassEventSourceAri,
    CompassIncomingWebhookAri: CompassIncomingWebhookAri,
    CompassMetricDefinitionAri: CompassMetricDefinitionAri,
    CompassMetricSourceAri: CompassMetricSourceAri,
    CompassRoleAri: CompassRoleAri,
    CompassScorecardAri: CompassScorecardAri,
    CompassSiteAri: CompassSiteAri,
    CompassUserDefinedParameterAri: CompassUserDefinedParameterAri,
    CompassWebhookAri: CompassWebhookAri,
    CompassWorkspaceAri: CompassWorkspaceAri,
    ConfluenceAdminAnnouncementBannerAri: ConfluenceAdminAnnouncementBannerAri,
    ConfluenceAttachmentAri: ConfluenceAttachmentAri,
    ConfluenceBlogpostAri: ConfluenceBlogpostAri,
    ConfluenceCommentAri: ConfluenceCommentAri,
    ConfluenceContentAri: ConfluenceContentAri,
    ConfluenceDatabaseAri: ConfluenceDatabaseAri,
    ConfluenceEmbedAri: ConfluenceEmbedAri,
    ConfluenceEventAri: ConfluenceEventAri,
    ConfluenceLongRunningTaskAri: ConfluenceLongRunningTaskAri,
    ConfluenceNoteAri: ConfluenceNoteAri,
    ConfluencePageAri: ConfluencePageAri,
    ConfluencePublicLinkAri: ConfluencePublicLinkAri,
    ConfluenceRoleAri: ConfluenceRoleAri,
    ConfluenceSiteAri: ConfluenceSiteAri,
    ConfluenceSpaceAri: ConfluenceSpaceAri,
    ConfluenceTaskAri: ConfluenceTaskAri,
    ConfluenceTeamCalendarAri: ConfluenceTeamCalendarAri,
    ConfluenceUserPropertyAri: ConfluenceUserPropertyAri,
    ConfluenceWhiteboardAri: ConfluenceWhiteboardAri,
    ConfluenceWorkspaceAri: ConfluenceWorkspaceAri,
    ConversationalHelpConversationAri: ConversationalHelpConversationAri,
    ConversationalHelpConversationMessageAri: ConversationalHelpConversationMessageAri,
    DataLakeLakeConnectionAri: DataLakeLakeConnectionAri,
    DevopsContainerAri: DevopsContainerAri,
    DevopsNamespaceAri: DevopsNamespaceAri,
    DevopsProviderAri: DevopsProviderAri,
    DevopsRelationshipAri: DevopsRelationshipAri,
    DevopsToolAri: DevopsToolAri,
    EcosystemAppAri: EcosystemAppAri,
    EcosystemAppEnvironmentVersionAri: EcosystemAppEnvironmentVersionAri,
    EcosystemConnectAppAri: EcosystemConnectAppAri,
    EcosystemEnvironmentAri: EcosystemEnvironmentAri,
    EcosystemExtensionAri: EcosystemExtensionAri,
    EcosystemExtensionGroupAri: EcosystemExtensionGroupAri,
    ElementsCustomEmojiMetadataAri: ElementsCustomEmojiMetadataAri,
    ElementsWorkspaceAri: ElementsWorkspaceAri,
    ExusExternalUserAri: ExusExternalUserAri,
    FigmaFileAri: FigmaFileAri,
    GoogleDocumentAri: GoogleDocumentAri,
    GoogleFormAri: GoogleFormAri,
    GooglePresentationAri: GooglePresentationAri,
    GoogleSpreadsheetAri: GoogleSpreadsheetAri,
    GraphBranchAri: GraphBranchAri,
    GraphBranchHistoryAri: GraphBranchHistoryAri,
    GraphBuildAri: GraphBuildAri,
    GraphBuildHistoryAri: GraphBuildHistoryAri,
    GraphCommitAri: GraphCommitAri,
    GraphDeploymentAri: GraphDeploymentAri,
    GraphDeploymentHistoryAri: GraphDeploymentHistoryAri,
    GraphDesignAri: GraphDesignAri,
    GraphDesignHistoryAri: GraphDesignHistoryAri,
    GraphDevopsComponentAri: GraphDevopsComponentAri,
    GraphDocumentAri: GraphDocumentAri,
    GraphDocumentHistoryAri: GraphDocumentHistoryAri,
    GraphFeatureFlagAri: GraphFeatureFlagAri,
    GraphFeatureFlagHistoryAri: GraphFeatureFlagHistoryAri,
    GraphIncidentAri: GraphIncidentAri,
    GraphIncidentHistoryAri: GraphIncidentHistoryAri,
    GraphJiraProjectAndDevopsToolRelationshipAri: GraphJiraProjectAndDevopsToolRelationshipAri,
    GraphJiraProjectAndDocumentationSpaceRelationshipAri: GraphJiraProjectAndDocumentationSpaceRelationshipAri,
    GraphJiraProjectAndOperationsTeamRelationshipAri: GraphJiraProjectAndOperationsTeamRelationshipAri,
    GraphJiraProjectAndVcsRepositoryRelationshipAri: GraphJiraProjectAndVcsRepositoryRelationshipAri,
    GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAri: GraphJiraProjectAndVcsRepositoryRelationshipTempMigrationAri,
    GraphOperationsWorkspaceAri: GraphOperationsWorkspaceAri,
    GraphPostIncidentReviewAri: GraphPostIncidentReviewAri,
    GraphPostIncidentReviewHistoryAri: GraphPostIncidentReviewHistoryAri,
    GraphPullRequestAri: GraphPullRequestAri,
    GraphPullRequestHistoryAri: GraphPullRequestHistoryAri,
    GraphRemoteLinkAri: GraphRemoteLinkAri,
    GraphRemoteLinkHistoryAri: GraphRemoteLinkHistoryAri,
    GraphRepositoryAri: GraphRepositoryAri,
    GraphSecurityContainerAri: GraphSecurityContainerAri,
    GraphSecurityWorkspaceAri: GraphSecurityWorkspaceAri,
    GraphServiceAndJiraProjectRelationshipAri: GraphServiceAndJiraProjectRelationshipAri,
    GraphServiceAndOperationsTeamRelationshipAri: GraphServiceAndOperationsTeamRelationshipAri,
    GraphServiceAndVcsRepositoryRelationshipAri: GraphServiceAndVcsRepositoryRelationshipAri,
    GraphServiceAri: GraphServiceAri,
    GraphServiceRelationshipAri: GraphServiceRelationshipAri,
    GraphVulnerabilityAri: GraphVulnerabilityAri,
    GraphVulnerabilityHistoryAri: GraphVulnerabilityHistoryAri,
    GraphWorkspaceAri: GraphWorkspaceAri,
    HelpArticleAri: HelpArticleAri,
    HelpChannelAri: HelpChannelAri,
    HelpHelpCenterAri: HelpHelpCenterAri,
    HelpHelpDeskAri: HelpHelpDeskAri,
    HelpLayoutAri: HelpLayoutAri,
    HelpPortalAri: HelpPortalAri,
    HelpRequestFormAri: HelpRequestFormAri,
    IdentityAppAri: IdentityAppAri,
    IdentityAuthPolicyAri: IdentityAuthPolicyAri,
    IdentityCustomerDirectoryAri: IdentityCustomerDirectoryAri,
    IdentityCustomerOrganizationAri: IdentityCustomerOrganizationAri,
    IdentityDirectoryAri: IdentityDirectoryAri,
    IdentityDomainAri: IdentityDomainAri,
    IdentityGroupAri: IdentityGroupAri,
    IdentityOauthClientAri: IdentityOauthClientAri,
    IdentityRoleAri: IdentityRoleAri,
    IdentitySiteAri: IdentitySiteAri,
    IdentityTeamAri: IdentityTeamAri,
    IdentityTeamMemberAri: IdentityTeamMemberAri,
    IdentityUserAri: IdentityUserAri,
    IdentityUserGrantAri: IdentityUserGrantAri,
    IdentityUserbaseAri: IdentityUserbaseAri,
    JiraAlignEpicAri: JiraAlignEpicAri,
    JiraAlignInstanceAri: JiraAlignInstanceAri,
    JiraAnnouncementBannerAri: JiraAnnouncementBannerAri,
    JiraAvailableFieldsAri: JiraAvailableFieldsAri,
    JiraBranchAri: JiraBranchAri,
    JiraBranchHistoryAri: JiraBranchHistoryAri,
    JiraBuildAri: JiraBuildAri,
    JiraBuildHistoryAri: JiraBuildHistoryAri,
    JiraBulkOperationTaskAri: JiraBulkOperationTaskAri,
    JiraCommentAri: JiraCommentAri,
    JiraCommitAri: JiraCommitAri,
    JiraComponentAri: JiraComponentAri,
    JiraConnectAppAri: JiraConnectAppAri,
    JiraCoreRoleAri: JiraCoreRoleAri,
    JiraCoreSiteAri: JiraCoreSiteAri,
    JiraDashboardAri: JiraDashboardAri,
    JiraDeploymentAri: JiraDeploymentAri,
    JiraDeploymentHistoryAri: JiraDeploymentHistoryAri,
    JiraDesignAri: JiraDesignAri,
    JiraDesignHistoryAri: JiraDesignHistoryAri,
    JiraDevopsComponentAri: JiraDevopsComponentAri,
    JiraDocumentAri: JiraDocumentAri,
    JiraDocumentHistoryAri: JiraDocumentHistoryAri,
    JiraEntityPropertyAri: JiraEntityPropertyAri,
    JiraFavouriteAri: JiraFavouriteAri,
    JiraFeatureFlagAri: JiraFeatureFlagAri,
    JiraFeatureFlagHistoryAri: JiraFeatureFlagHistoryAri,
    JiraFilterAri: JiraFilterAri,
    JiraFilterEmailSubscriptionAri: JiraFilterEmailSubscriptionAri,
    JiraIncidentAri: JiraIncidentAri,
    JiraIncidentHistoryAri: JiraIncidentHistoryAri,
    JiraIssueAri: JiraIssueAri,
    JiraIssueAttachmentAri: JiraIssueAttachmentAri,
    JiraIssueCommentAri: JiraIssueCommentAri,
    JiraIssueFieldMetadataAri: JiraIssueFieldMetadataAri,
    JiraIssueFieldOptionAri: JiraIssueFieldOptionAri,
    JiraIssueHistoryAri: JiraIssueHistoryAri,
    JiraIssueLinkAri: JiraIssueLinkAri,
    JiraIssueLinkTypeAri: JiraIssueLinkTypeAri,
    JiraIssueRemoteLinkAri: JiraIssueRemoteLinkAri,
    JiraIssueSearchViewAri: JiraIssueSearchViewAri,
    JiraIssueStatusAri: JiraIssueStatusAri,
    JiraIssueTypeAri: JiraIssueTypeAri,
    JiraIssueTypeSchemeAri: JiraIssueTypeSchemeAri,
    JiraIssueTypeSchemeMappingAri: JiraIssueTypeSchemeMappingAri,
    JiraIssueWorklogAri: JiraIssueWorklogAri,
    JiraIssuefieldvalueAri: JiraIssuefieldvalueAri,
    JiraNavigationItemAri: JiraNavigationItemAri,
    JiraNotificationTypeAri: JiraNotificationTypeAri,
    JiraNotificationTypeSchemeAri: JiraNotificationTypeSchemeAri,
    JiraNotificationUserPreferenceAri: JiraNotificationUserPreferenceAri,
    JiraOperationsWorkspaceAri: JiraOperationsWorkspaceAri,
    JiraPermissionSchemeAri: JiraPermissionSchemeAri,
    JiraPlanAri: JiraPlanAri,
    JiraPostIncidentReviewAri: JiraPostIncidentReviewAri,
    JiraPostIncidentReviewHistoryAri: JiraPostIncidentReviewHistoryAri,
    JiraPostIncidentReviewLinkAri: JiraPostIncidentReviewLinkAri,
    JiraPriorityAri: JiraPriorityAri,
    JiraProductAri: JiraProductAri,
    JiraProjectAri: JiraProjectAri,
    JiraProjectCategoryAri: JiraProjectCategoryAri,
    JiraProjectFeatureAri: JiraProjectFeatureAri,
    JiraProjectOverviewAri: JiraProjectOverviewAri,
    JiraProjectRoleActorAri: JiraProjectRoleActorAri,
    JiraProjectShortcutAri: JiraProjectShortcutAri,
    JiraProjectTypeAri: JiraProjectTypeAri,
    JiraPullRequestAri: JiraPullRequestAri,
    JiraPullRequestHistoryAri: JiraPullRequestHistoryAri,
    JiraRemoteLinkAri: JiraRemoteLinkAri,
    JiraRemoteLinkHistoryAri: JiraRemoteLinkHistoryAri,
    JiraRepositoryAri: JiraRepositoryAri,
    JiraResolutionAri: JiraResolutionAri,
    JiraResourceUsageMetricAri: JiraResourceUsageMetricAri,
    JiraResourceUsageRecommendationAri: JiraResourceUsageRecommendationAri,
    JiraRoleAri: JiraRoleAri,
    JiraSecurityContainerAri: JiraSecurityContainerAri,
    JiraSecurityLevelAri: JiraSecurityLevelAri,
    JiraSecurityWorkspaceAri: JiraSecurityWorkspaceAri,
    JiraServicedeskApprovalAri: JiraServicedeskApprovalAri,
    JiraServicedeskCalendarEventAri: JiraServicedeskCalendarEventAri,
    JiraServicedeskCannedResponseAri: JiraServicedeskCannedResponseAri,
    JiraServicedeskOrganizationAri: JiraServicedeskOrganizationAri,
    JiraServicedeskQueueAri: JiraServicedeskQueueAri,
    JiraServicedeskRequestTypeAri: JiraServicedeskRequestTypeAri,
    JiraServicedeskRoleAri: JiraServicedeskRoleAri,
    JiraServicedeskSiteAri: JiraServicedeskSiteAri,
    JiraServicedeskSlaAri: JiraServicedeskSlaAri,
    JiraSiteAri: JiraSiteAri,
    JiraSoftwareBoardAri: JiraSoftwareBoardAri,
    JiraSoftwareBoardFeatureAri: JiraSoftwareBoardFeatureAri,
    JiraSoftwareBoardIssueListAri: JiraSoftwareBoardIssueListAri,
    JiraSoftwareCardAri: JiraSoftwareCardAri,
    JiraSoftwareCardColorAri: JiraSoftwareCardColorAri,
    JiraSoftwareCardLayoutAri: JiraSoftwareCardLayoutAri,
    JiraSoftwareCardParentAri: JiraSoftwareCardParentAri,
    JiraSoftwareColumnAri: JiraSoftwareColumnAri,
    JiraSoftwareCustomFilterAri: JiraSoftwareCustomFilterAri,
    JiraSoftwareRoleAri: JiraSoftwareRoleAri,
    JiraSoftwareSiteAri: JiraSoftwareSiteAri,
    JiraSoftwareSwimlaneAri: JiraSoftwareSwimlaneAri,
    JiraSoftwareUserBoardConfigAri: JiraSoftwareUserBoardConfigAri,
    JiraSoftwareViewConfigAri: JiraSoftwareViewConfigAri,
    JiraSprintAri: JiraSprintAri,
    JiraUserBroadcastMessageAri: JiraUserBroadcastMessageAri,
    JiraVersionApproverAri: JiraVersionApproverAri,
    JiraVersionAri: JiraVersionAri,
    JiraVulnerabilityAri: JiraVulnerabilityAri,
    JiraVulnerabilityHistoryAri: JiraVulnerabilityHistoryAri,
    JiraWorkflowAri: JiraWorkflowAri,
    JiraWorkflowSchemeAri: JiraWorkflowSchemeAri,
    JiraWorklogAri: JiraWorklogAri,
    JiraWorkspaceAri: JiraWorkspaceAri,
    LinkingPlatformDatasourceAri: LinkingPlatformDatasourceAri,
    MakerSpaceGroupAri: MakerSpaceGroupAri,
    MarketingCustomerDomainAri: MarketingCustomerDomainAri,
    MarketplaceTeamAri: MarketplaceTeamAri,
    MeasurementEmailUuidAri: MeasurementEmailUuidAri,
    MeasurementSiteUserAri: MeasurementSiteUserAri,
    MeasurementUserAri: MeasurementUserAri,
    MediaFileAri: MediaFileAri,
    MercuryCommentAri: MercuryCommentAri,
    MercuryProgramAri: MercuryProgramAri,
    MercuryProgramStatusUpdateAri: MercuryProgramStatusUpdateAri,
    MercuryRoleAri: MercuryRoleAri,
    MercurySiteAri: MercurySiteAri,
    OauthClientAri: OauthClientAri,
    OpsgenieAccountLoginAri: OpsgenieAccountLoginAri,
    OpsgenieAccountSettingsAri: OpsgenieAccountSettingsAri,
    OpsgenieAlertAri: OpsgenieAlertAri,
    OpsgenieAlertRecipientLinkAri: OpsgenieAlertRecipientLinkAri,
    OpsgenieApiRequestMetricAri: OpsgenieApiRequestMetricAri,
    OpsgenieCallRoutingAri: OpsgenieCallRoutingAri,
    OpsgenieCustomRoleAri: OpsgenieCustomRoleAri,
    OpsgenieDeploymentAri: OpsgenieDeploymentAri,
    OpsgenieDeploymentServiceLinkAri: OpsgenieDeploymentServiceLinkAri,
    OpsgenieEscalationAri: OpsgenieEscalationAri,
    OpsgenieEventAri: OpsgenieEventAri,
    OpsgenieIncidentAlertLinkAri: OpsgenieIncidentAlertLinkAri,
    OpsgenieIncidentAri: OpsgenieIncidentAri,
    OpsgenieIncidentStatusUpdateAri: OpsgenieIncidentStatusUpdateAri,
    OpsgenieIncomingCallHistoryAri: OpsgenieIncomingCallHistoryAri,
    OpsgenieIntegrationAri: OpsgenieIntegrationAri,
    OpsgenieNotificationAri: OpsgenieNotificationAri,
    OpsgenieRoleAri: OpsgenieRoleAri,
    OpsgenieScheduleAri: OpsgenieScheduleAri,
    OpsgenieScheduleRotationAri: OpsgenieScheduleRotationAri,
    OpsgenieSiteAri: OpsgenieSiteAri,
    OpsgenieTeamAri: OpsgenieTeamAri,
    OpsgenieTimelineAri: OpsgenieTimelineAri,
    OpsgenieWorkspaceAri: OpsgenieWorkspaceAri,
    PapiApiAri: PapiApiAri,
    PapiRoleAri: PapiRoleAri,
    PassionfruitUserAri: PassionfruitUserAri,
    PeoplePerftoolCalibrationAri: PeoplePerftoolCalibrationAri,
    PeoplePerftoolFeedbackAri: PeoplePerftoolFeedbackAri,
    PeoplePerftoolPerformanceAri: PeoplePerftoolPerformanceAri,
    PlatformClassificationTagAri: PlatformClassificationTagAri,
    PlatformLifecycleResourceAri: PlatformLifecycleResourceAri,
    PlatformLifecycleResourcePackageAri: PlatformLifecycleResourcePackageAri,
    PlatformLifecycleResourcePackageTypeAri: PlatformLifecycleResourcePackageTypeAri,
    PlatformOrgAri: PlatformOrgAri,
    PlatformOrgUserAri: PlatformOrgUserAri,
    PlatformSecureTunnelAri: PlatformSecureTunnelAri,
    PlatformServicesStreamhubSchemaAri: PlatformServicesStreamhubSchemaAri,
    PlatformSiteAri: PlatformSiteAri,
    PollinatorCheckAri: PollinatorCheckAri,
    PostOfficeMessageInstanceAri: PostOfficeMessageInstanceAri,
    PostOfficeMessageTemplateAri: PostOfficeMessageTemplateAri,
    ResourceOwner: ResourceOwnerEnum,
    ResourceType: ResourceTypeEnum,
    RuntimeAuthClientRoleAri: RuntimeAuthClientRoleAri,
    SearchEventAri: SearchEventAri,
    StatuspageRoleAri: StatuspageRoleAri,
    StatuspageSiteAri: StatuspageSiteAri,
    SupportCustomerAri: SupportCustomerAri,
    TeamsTeamAri: TeamsTeamAri,
    TownsquareCommentAri: TownsquareCommentAri,
    TownsquareGoalAri: TownsquareGoalAri,
    TownsquareHelpPointerAri: TownsquareHelpPointerAri,
    TownsquareLearningAri: TownsquareLearningAri,
    TownsquareProjectAri: TownsquareProjectAri,
    TownsquareQuestionAri: TownsquareQuestionAri,
    TownsquareRoleAri: TownsquareRoleAri,
    TownsquareSiteAri: TownsquareSiteAri,
    TownsquareTagAri: TownsquareTagAri,
    TrelloBoardAri: TrelloBoardAri,
    TrelloCardAri: TrelloCardAri,
    TrelloEnterpriseAri: TrelloEnterpriseAri,
    TrelloListAri: TrelloListAri,
    TrelloRoleAri: TrelloRoleAri,
    TrelloSiteAri: TrelloSiteAri,
    TrelloUserAri: TrelloUserAri,
    TrelloWorkspaceAri: TrelloWorkspaceAri,
    UnifiedHelpRoleAri: UnifiedHelpRoleAri,
    UnifiedHelpSiteAri: UnifiedHelpSiteAri,
    UnifiedHelpWorkspaceAri: UnifiedHelpWorkspaceAri,
    ValidationError: ValidationError,
    VirtualAgentConfigurationAri: VirtualAgentConfigurationAri,
    VirtualAgentConversationAri: VirtualAgentConversationAri,
    VirtualAgentFlowEditorAri: VirtualAgentFlowEditorAri,
    VirtualAgentIntentProjectionAri: VirtualAgentIntentProjectionAri,
    VirtualAgentIntentQuestionProjectionAri: VirtualAgentIntentQuestionProjectionAri,
    VirtualAgentIntentRuleProjectionAri: VirtualAgentIntentRuleProjectionAri,
    VirtualAgentIntentTemplateAri: VirtualAgentIntentTemplateAri
});

var ari_1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(ari);

var ari$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstallationAri = exports.getEnvironmentAri = exports.getAppAri = void 0;

const getAppAri = (appId) => ari_1.EcosystemAppAri.create({ appId });
exports.getAppAri = getAppAri;
const getEnvironmentAri = (appId, environmentId) => ari_1.EcosystemEnvironmentAri.create({ appId, environmentId });
exports.getEnvironmentAri = getEnvironmentAri;
class InstallationAriImpl {
    constructor(installationId) {
        this._installationId = installationId;
    }
    _installationId;
    get installationId() {
        return this._installationId;
    }
    toString() {
        return `ari:cloud:ecosystem::installation/${this._installationId}`;
    }
    toJSON() {
        return this.toString();
    }
}
const getInstallationAri = (installationId) => new InstallationAriImpl(installationId);
exports.getInstallationAri = getInstallationAri;
});

var require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(nodeFetch$1);

var runtime = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapInMetrics = exports.getAppContext = exports.__getRuntime = void 0;



function __getRuntime() {
    const runtime = commonjsGlobal.__forge_runtime__;
    if (!runtime) {
        throw new Error('Forge runtime not found.');
    }
    return runtime;
}
exports.__getRuntime = __getRuntime;
function getAppContext() {
    const { appId, appVersion, environmentId, environmentType, invocationId, installationId, moduleKey } = __getRuntime().appContext;
    return {
        appAri: (0, ari$1.getAppAri)(appId),
        appVersion,
        environmentAri: (0, ari$1.getEnvironmentAri)(appId, environmentId),
        environmentType,
        installationAri: (0, ari$1.getInstallationAri)(installationId),
        invocationId,
        moduleKey
    };
}
exports.getAppContext = getAppContext;
function wrapInMetrics(name, fn, { tags } = {}) {
    return async (...args) => {
        const { metrics } = __getRuntime();
        metrics.counter(name, tags).incr();
        const timer = metrics.timing(name, tags).measure();
        let success = true;
        try {
            return await fn(...args);
        }
        catch (e) {
            if (e instanceof errors$1.ProxyRequestError || e instanceof require$$0.FetchError) {
                success = false;
            }
            throw e;
        }
        finally {
            timer.stop({ success: success.toString() });
        }
    };
}
exports.wrapInMetrics = wrapInMetrics;
});

var api$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapFetchApiMethods = exports.wrapWithRouteUnwrapper = exports.wrapRequestProduct = exports.wrapRequestConnectedData = exports.wrapRequestGraph = void 0;

const wrapRequestGraph = (requestGraphApi) => (query, variables, headers = {}) => requestGraphApi('/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query,
        ...(variables ? { variables } : {})
    })
});
exports.wrapRequestGraph = wrapRequestGraph;
const wrapRequestConnectedData = (fetch) => (path, init) => {
    const safeUrl$1 = (0, safeUrl.requireSafeUrl)(path);
    return fetch(`/connected-data/${safeUrl$1.value.replace(/^\/+/, '')}`, init);
};
exports.wrapRequestConnectedData = wrapRequestConnectedData;
const wrapRequestProduct = (requestProduct) => (path, init) => {
    const safeUrl$1 = (0, safeUrl.requireSafeUrl)(path);
    return requestProduct(safeUrl$1.value, init);
};
exports.wrapRequestProduct = wrapRequestProduct;
const wrapWithRouteUnwrapper = (fetch) => (path, init) => {
    const stringPath = (0, safeUrl.isRoute)(path) ? path.value : path;
    return fetch(stringPath, init);
};
exports.wrapWithRouteUnwrapper = wrapWithRouteUnwrapper;
const wrapFetchApiMethods = (api, wrapFetch) => {
    return {
        fetch: (0, exports.wrapWithRouteUnwrapper)(wrapFetch(api.fetch)),
        requestJira: (0, exports.wrapRequestProduct)(wrapFetch(api.requestJira)),
        requestConfluence: (0, exports.wrapRequestProduct)(wrapFetch(api.requestConfluence)),
        requestBitbucket: (0, exports.wrapRequestProduct)(wrapFetch(api.requestBitbucket)),
        asUser: () => ({
            requestJira: (0, exports.wrapRequestProduct)(wrapFetch(api.asUser().requestJira)),
            requestConfluence: (0, exports.wrapRequestProduct)(wrapFetch(api.asUser().requestConfluence)),
            requestBitbucket: (0, exports.wrapRequestProduct)(wrapFetch(api.asUser().requestBitbucket)),
            requestGraph: (0, exports.wrapRequestGraph)(wrapFetch(api.asUser().requestGraph)),
            requestConnectedData: (0, exports.wrapRequestConnectedData)(wrapFetch(api.asUser().requestConnectedData)),
            withProvider: (provider, remoteName, tokenId) => {
                const { hasCredentials, requestCredentials, listCredentials, fetch: withProviderFetch, listAccounts, getAccount, asAccount } = api.asUser().withProvider(provider, remoteName, tokenId);
                const wrappedRequestRemote = (0, exports.wrapWithRouteUnwrapper)(wrapFetch(withProviderFetch));
                return {
                    hasCredentials,
                    requestCredentials,
                    listCredentials,
                    fetch: wrappedRequestRemote,
                    listAccounts,
                    getAccount,
                    asAccount
                };
            }
        }),
        asApp: () => ({
            requestJira: (0, exports.wrapRequestProduct)(wrapFetch(api.asApp().requestJira)),
            requestConfluence: (0, exports.wrapRequestProduct)(wrapFetch(api.asApp().requestConfluence)),
            requestGraph: (0, exports.wrapRequestGraph)(wrapFetch(api.asApp().requestGraph)),
            requestBitbucket: (0, exports.wrapRequestProduct)(wrapFetch(api.asApp().requestBitbucket)),
            requestConnectedData: (0, exports.wrapRequestConnectedData)(wrapFetch(api.asApp().requestConnectedData))
        })
    };
};
exports.wrapFetchApiMethods = wrapFetchApiMethods;
});

var polyfillResponse = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformResponse = void 0;

const transformResponse = (fetchApi) => async (url, init) => {
    const response = await fetchApi(url, init);
    return {
        ...response,
        headers: new require$$0.Headers(response.headers)
    };
};
exports.transformResponse = transformResponse;
});

var fetch = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSandboxRuntimeAPI = exports.getNodeRuntimeAPI = exports.addMagicAgent = exports.handleProxyResponseErrors = exports.getForgeProxyError = exports.createRemoteUrlWithPath = exports.fetchRemote = exports.fetchProduct = void 0;

const node_fetch_1 = tslib_es6$2.__importStar(require$$0);




async function wrapInMetrics(options, cb) {
    const metrics = (0, runtime.__getRuntime)().metrics;
    metrics.counter(options.name, options.tags).incr();
    const timer = metrics.timing(options.name, options.tags).measure();
    try {
        return await cb();
    }
    finally {
        timer.stop();
    }
}
function fetchProduct(args) {
    return async (path, init) => {
        const url = productURL(args.remote, path);
        init = (0, exports.addMagicAgent)(init);
        if (!hasAuthorizationHeader(init.headers)) {
            init.headers = { ...init.headers, authorization: `Forge ${args.provider}` };
        }
        const response = await (0, node_fetch_1.default)(url, init);
        (0, exports.handleProxyResponseErrors)(response);
        return response;
    };
}
exports.fetchProduct = fetchProduct;
function fetchRemote(args) {
    return async (path, init) => {
        const remoteUrl = createRemoteUrlWithPath(`https://${args.remote}`, path);
        init = (0, exports.addMagicAgent)(init, 'EXTERNAL_AUTH_REQUEST');
        init.headers = {
            ...init.headers,
            authorization: `Forge user ${args.provider} ${args.account}`
        };
        const response = await (0, node_fetch_1.default)(remoteUrl, init);
        (0, exports.handleProxyResponseErrors)(response);
        return response;
    };
}
exports.fetchRemote = fetchRemote;
function createRemoteUrlWithPath(baseUrl, path) {
    const remoteUrl = new URL(baseUrl);
    const url = new URL(path, remoteUrl);
    if (url.hostname !== remoteUrl.hostname) {
        throw new Error(`Invalid path provided ${path}`);
    }
    remoteUrl.searchParams.append('path', path);
    return remoteUrl;
}
exports.createRemoteUrlWithPath = createRemoteUrlWithPath;
function getDefaultRemote(provider) {
    const externalAuthProvider = findExternalAuthProviderConfigOrThrow(provider);
    if (!externalAuthProvider.remotes.length) {
        throw new Error(`Missing remote config for provider ${provider}`);
    }
    return externalAuthProvider.remotes[0].key;
}
function findExternalAuthProviderConfigOrThrow(provider) {
    const { externalAuth } = (0, runtime.__getRuntime)();
    const externalAuthProvider = externalAuth?.find((externalAuthMetaData) => {
        return externalAuthMetaData.service === provider;
    });
    if (!externalAuthProvider) {
        throw new Error(`Bad provider or missing config for provider ${provider}`);
    }
    return externalAuthProvider;
}
const ATLASSIAN_TOKEN_SERVICE_KEY = 'atlassian-token-service-key';
const getForgeProxyError = (response) => response.headers.get('forge-proxy-error');
exports.getForgeProxyError = getForgeProxyError;
const handleProxyResponseErrors = (response) => {
    const errorReason = (0, exports.getForgeProxyError)(response);
    if (errorReason) {
        if (errorReason === 'NEEDS_AUTHENTICATION_ERR') {
            throw new errors$1.NeedsAuthenticationError('Authentication Required', ATLASSIAN_TOKEN_SERVICE_KEY);
        }
        throw new errors$1.ProxyRequestError(response.status, errorReason);
    }
};
exports.handleProxyResponseErrors = handleProxyResponseErrors;
const hasAuthorizationHeader = (headersInit) => {
    if (!headersInit)
        return false;
    return new node_fetch_1.Headers(headersInit).has('authorization');
};
function productURL(remote, path) {
    if (!path.startsWith('/')) {
        path = '/' + path;
    }
    return `https://${remote}${path}`;
}
function lazyThrowNeedsAuthenticationError(serviceKey) {
    return async (scopes) => wrapInMetrics({ name: 'api.asUser.withProvider.requestCredentials', tags: { passingScopes: String(!!scopes) } }, async () => {
        throw new errors$1.NeedsAuthenticationError('Authentication Required', serviceKey, { scopes, isExpectedError: true });
    });
}
function buildExternalAuthAccountsInfo(provider, remote) {
    const { accounts } = findExternalAuthProviderConfigOrThrow(provider);
    const buildAccountModel = (account) => {
        const { externalAccountId: id, ...rest } = account;
        return { ...rest, id };
    };
    const buildExternalAuthAccountMethods = (account, outboundAuthAccountId) => ({
        hasCredentials: async (scopes) => wrapInMetrics({ name: 'api.asUser.withProvider.hasCredentials', tags: { passingScopes: String(!!scopes) } }, async () => !scopes || scopes.every((scope) => account.scopes.includes(scope))),
        requestCredentials: lazyThrowNeedsAuthenticationError(provider),
        getAccount: async () => wrapInMetrics({ name: 'api.asUser.withProvider.getAccount' }, async () => account),
        fetch: (0, api$1.wrapWithRouteUnwrapper)(fetchRemote({ provider, remote: remote ?? getDefaultRemote(provider), account: outboundAuthAccountId }))
    });
    return accounts.map((account) => {
        const authAccount = buildAccountModel(account);
        return {
            account: authAccount,
            methods: buildExternalAuthAccountMethods(authAccount, account.id)
        };
    });
}
const addMagicAgent = (init, agentOverride) => ({
    ...init,
    agent: (agentOverride ?? 'FORGE_PRODUCT_REQUEST')
});
exports.addMagicAgent = addMagicAgent;
const throwNotImplementedError = () => {
    throw new Error('not implemented');
};
const withProvider = (provider, remote) => {
    const accountsInfo = buildExternalAuthAccountsInfo(provider, remote);
    const defaultAccountInfo = accountsInfo.length ? accountsInfo[0] : undefined;
    const lazyThrowNoValidCredentialsError = () => {
        return (url) => {
            throw new Error(`Fetch failed for ${remote ? `remote '${remote}', ` : ''}provider '${provider}', path '${url}' no credentials previously requested`);
        };
    };
    return {
        hasCredentials: async (scopes) => {
            return defaultAccountInfo
                ? await defaultAccountInfo.methods.hasCredentials(scopes)
                : await wrapInMetrics({ name: 'api.asUser.withProvider.hasCredentials', tags: { passingScopes: String(!!scopes) } }, async () => false);
        },
        getAccount: async () => wrapInMetrics({ name: 'api.asUser.withProvider.getAccount' }, async () => {
            return defaultAccountInfo ? defaultAccountInfo.account : undefined;
        }),
        requestCredentials: lazyThrowNeedsAuthenticationError(provider),
        listCredentials: throwNotImplementedError,
        listAccounts: async () => wrapInMetrics({ name: 'api.asUser.withProvider.listAccounts' }, async () => {
            return accountsInfo.map(({ account }) => account);
        }),
        asAccount: (externalAccountId) => {
            const accountInfo = accountsInfo.find(({ account }) => account.id === externalAccountId);
            if (!accountInfo) {
                throw new Error(`No account with ID ${externalAccountId} found for provider ${provider}`);
            }
            return accountInfo.methods;
        },
        fetch: defaultAccountInfo ? defaultAccountInfo.methods.fetch : lazyThrowNoValidCredentialsError()
    };
};
function getNodeRuntimeAPI() {
    return {
        fetch: (0, api$1.wrapWithRouteUnwrapper)(node_fetch_1.default),
        requestJira: (0, api$1.wrapRequestProduct)(fetchProduct({ provider: 'none', remote: 'jira' })),
        requestConfluence: (0, api$1.wrapRequestProduct)(fetchProduct({ provider: 'none', remote: 'confluence' })),
        requestBitbucket: (0, api$1.wrapRequestProduct)(fetchProduct({ provider: 'none', remote: 'bitbucket' })),
        asUser: () => ({
            requestJira: (0, api$1.wrapRequestProduct)(fetchProduct({ provider: 'user', remote: 'jira' })),
            requestConfluence: (0, api$1.wrapRequestProduct)(fetchProduct({ provider: 'user', remote: 'confluence' })),
            requestBitbucket: (0, api$1.wrapRequestProduct)(fetchProduct({ provider: 'user', remote: 'bitbucket' })),
            requestGraph: (0, api$1.wrapRequestGraph)(fetchProduct({ provider: 'user', remote: 'stargate' })),
            requestConnectedData: (0, api$1.wrapRequestConnectedData)(fetchProduct({ provider: 'user', remote: 'stargate' })),
            withProvider
        }),
        asApp: () => ({
            requestJira: (0, api$1.wrapRequestProduct)(fetchProduct({ provider: 'app', remote: 'jira' })),
            requestConfluence: (0, api$1.wrapRequestProduct)(fetchProduct({ provider: 'app', remote: 'confluence' })),
            requestBitbucket: (0, api$1.wrapRequestProduct)(fetchProduct({ provider: 'app', remote: 'bitbucket' })),
            requestGraph: (0, api$1.wrapRequestGraph)(fetchProduct({ provider: 'app', remote: 'stargate' })),
            requestConnectedData: (0, api$1.wrapRequestConnectedData)(fetchProduct({ provider: 'app', remote: 'stargate' }))
        })
    };
}
exports.getNodeRuntimeAPI = getNodeRuntimeAPI;
function getSandboxRuntimeAPI(api) {
    return (0, api$1.wrapFetchApiMethods)(api, polyfillResponse.transformResponse);
}
exports.getSandboxRuntimeAPI = getSandboxRuntimeAPI;
});

var fetchAndStorage = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.__requestAtlassianAsUser = exports.__requestAtlassianAsApp = exports.getRequestStargate = exports.getFetchAPI = exports.getContextAri = void 0;


function getContextAri() {
    return commonjsGlobal.api?.__getAppAri?.() ?? (0, runtime.__getRuntime)().contextAri;
}
exports.getContextAri = getContextAri;
function getFetchAPI() {
    const { api: sandboxAPI } = commonjsGlobal;
    if (sandboxAPI && Object.keys(sandboxAPI).length) {
        return (0, fetch.getSandboxRuntimeAPI)(sandboxAPI);
    }
    else {
        return (0, fetch.getNodeRuntimeAPI)();
    }
}
exports.getFetchAPI = getFetchAPI;
function getRequestStargate(provider) {
    const sandboxApi = commonjsGlobal.api;
    if (sandboxApi) {
        switch (provider) {
            case 'none':
                return sandboxApi.__requestAtlassian;
            case 'app':
                return sandboxApi.asApp().__requestAtlassian;
            case 'user':
                return sandboxApi.asUser().__requestAtlassian;
            default:
                throw new Error(`Unknown provider: ${provider}`);
        }
    }
    return (0, fetch.fetchProduct)({ provider, remote: 'stargate' });
}
exports.getRequestStargate = getRequestStargate;
exports.__requestAtlassianAsApp = getRequestStargate('app');
exports.__requestAtlassianAsUser = getRequestStargate('user');
});

var webTrigger = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.webTrigger = void 0;


const proxyGetWebTriggerURL = (0, runtime.wrapInMetrics)('api.getWebTriggerUrl', async (webTriggerModuleKey, forceCreate) => {
    const runtime$1 = (0, runtime.__getRuntime)();
    const response = await (0, fetchAndStorage.__requestAtlassianAsApp)('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            mutation forge_app_createWebTriggerUrl($input: WebTriggerUrlInput!, $forceCreate: Boolean) {
              createWebTriggerUrl(input: $input, forceCreate: $forceCreate) {
                url
              }
            }
          `,
            variables: {
                input: {
                    appId: runtime$1.appContext.appId,
                    envId: runtime$1.appContext.environmentId,
                    triggerKey: webTriggerModuleKey,
                    contextId: runtime$1.contextAri
                },
                forceCreate
            }
        })
    });
    if (!response.ok) {
        throw new Error(`Internal error occurred: Failed to get web trigger URL: ${response.statusText}.`);
    }
    const responseBody = await response.json();
    if (!responseBody?.data?.createWebTriggerUrl?.url) {
        throw new Error(`Internal error occurred: Failed to get web trigger URL.`);
    }
    return responseBody.data.createWebTriggerUrl.url;
});
const proxyDeleteWebTriggerURL = (0, runtime.wrapInMetrics)('api.deleteWebTriggerUrl', async (webTriggerUrl) => {
    const callDelete = async (webTriggerUrlId) => {
        const response = await (0, fetchAndStorage.__requestAtlassianAsApp)('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
            mutation forge_app_deleteWebTriggerUrl($id: ID!) {
              deleteWebTriggerUrl(id: $id) {
                success
                message
              }
            }
          `,
                variables: {
                    id: webTriggerUrlId
                }
            })
        });
        if (!response.ok) {
            throw new Error(`Internal error occurred: Failed to delete web trigger URL: ${response.statusText}.`);
        }
        const responseBody = await response.json();
        if (!responseBody?.data?.deleteWebTriggerUrl?.success) {
            const errorText = responseBody?.data?.deleteWebTriggerUrl?.message || 'unknown error';
            throw new Error(`Internal error occurred: Failed to delete web trigger URL: ${errorText}`);
        }
    };
    const urlIds = await exports.webTrigger.getUrlIds(webTriggerUrl);
    for (const urlId of urlIds) {
        await callDelete(urlId);
    }
});
const proxyGetWebTriggerUrlIds = (0, runtime.wrapInMetrics)('api.getWebTriggerUrlIds', async (webTriggerUrl) => {
    const runtime$1 = (0, runtime.__getRuntime)();
    const response = await (0, fetchAndStorage.__requestAtlassianAsApp)('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query forge_app_webTriggerUrlsByAppContext($appId: ID!, $envId: ID!, $contextId: ID!) {
              webTriggerUrlsByAppContext(appId: $appId, envId: $envId, contextId: $contextId) {
                id
                url
              }
            }
          `,
            variables: {
                appId: runtime$1.appContext.appId,
                envId: runtime$1.appContext.environmentId,
                contextId: runtime$1.contextAri
            }
        })
    });
    if (!response.ok) {
        throw new Error(`Internal error occurred: Failed to get web trigger URLs: ${response.statusText}.`);
    }
    const responseBody = await response.json();
    if (!responseBody?.data?.webTriggerUrlsByAppContext || responseBody.data.webTriggerUrlsByAppContext.length == 0) {
        throw new Error('Internal error occurred: No web trigger URLs found');
    }
    const result = responseBody.data.webTriggerUrlsByAppContext
        .filter((webTriggerResult) => webTriggerResult.url == webTriggerUrl)
        .map((webTriggerResult) => webTriggerResult.id);
    if (!result || result.length == 0) {
        throw new Error('Internal error occurred: Web trigger URL matching URL not found');
    }
    return result;
});
exports.webTrigger = {
    getUrl: async (webTriggerModuleKey, forceCreate = false) => (commonjsGlobal.api?.webTrigger?.getUrl ?? proxyGetWebTriggerURL)(webTriggerModuleKey, forceCreate),
    deleteUrl: async (webTriggerUrl) => (commonjsGlobal.api?.webTrigger?.deleteUrl ?? proxyDeleteWebTriggerURL)(webTriggerUrl),
    getUrlIds: async (webTriggerUrl) => (commonjsGlobal.api?.webTrigger?.getUrlIds ?? proxyGetWebTriggerUrlIds)(webTriggerUrl)
};
});

var remote = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeRemote = void 0;

const node_fetch_1 = tslib_es6$2.__importDefault(require$$0);


async function invokeRemote(remoteKey, options) {
    const { path, ...fetchOptions } = options;
    if (!remoteKey) {
        throw new Error('Missing remote key provided to invokeRemote');
    }
    if (!path) {
        throw new Error('Missing or empty path provided to invokeRemote');
    }
    const url = (0, fetch.createRemoteUrlWithPath)('https://atl-paas.net', path);
    url.searchParams.set('remoteKey', remoteKey);
    const init = (0, fetch.addMagicAgent)(fetchOptions, 'FORGE_REMOTE_COMPUTE_REQUEST');
    const response = await (0, node_fetch_1.default)(url, init);
    handleResponseErrors(response, remoteKey);
    return response;
}
exports.invokeRemote = invokeRemote;
function handleResponseErrors(response, remoteKey) {
    const forgeProxyError = (0, fetch.getForgeProxyError)(response);
    if (forgeProxyError === 'INVALID_REMOTE') {
        throw new errors$1.InvalidRemoteError(`Invalid remote key provided: "${remoteKey}"`, remoteKey);
    }
    (0, fetch.handleProxyResponseErrors)(response);
}
});

var out$2 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpectedError = exports.isHostedCodeError = exports.isForgePlatformError = exports.FUNCTION_ERR = exports.HttpError = exports.InvalidWorkspaceRequestedError = exports.NotAllowedError = exports.RequestProductNotAllowedError = exports.ProductEndpointNotAllowedError = exports.ExternalEndpointNotAllowedError = exports.FetchError = exports.ProxyRequestError = exports.NeedsAuthenticationError = exports.__getRuntime = exports.getAppContext = exports.routeFromAbsolute = exports.assumeTrustedRoute = exports.route = exports.SortOrder = exports.FilterConditions = exports.WhereConditions = exports.startsWith = exports.createRequestStargateAsApp = exports.__requestAtlassianAsUser = exports.__requestAtlassianAsApp = exports.webTrigger = exports.properties = exports.storage = exports.store = exports.invokeRemote = exports.requestBitbucket = exports.requestConfluence = exports.requestJira = exports.fetch = exports.authorize = exports.asApp = exports.asUser = exports.privacy = void 0;


Object.defineProperty(exports, "authorize", { enumerable: true, get: function () { return authorization.authorize; } });



Object.defineProperty(exports, "webTrigger", { enumerable: true, get: function () { return webTrigger.webTrigger; } });

Object.defineProperty(exports, "__requestAtlassianAsApp", { enumerable: true, get: function () { return fetchAndStorage.__requestAtlassianAsApp; } });
Object.defineProperty(exports, "__requestAtlassianAsUser", { enumerable: true, get: function () { return fetchAndStorage.__requestAtlassianAsUser; } });

Object.defineProperty(exports, "invokeRemote", { enumerable: true, get: function () { return remote.invokeRemote; } });
function withDeprecatedMessage(method, message) {
    const wrappedMethod = (...args) => {
        console.warn(message);
        return method(...args);
    };
    return wrappedMethod;
}
const fetchAPI = (0, fetchAndStorage.getFetchAPI)();
const asUser = fetchAPI.asUser;
exports.asUser = asUser;
const asApp = fetchAPI.asApp;
exports.asApp = asApp;
const fetch = fetchAPI.fetch;
exports.fetch = fetch;
const requestJira = fetchAPI.requestJira;
exports.requestJira = requestJira;
const requestConfluence = fetchAPI.requestConfluence;
exports.requestConfluence = requestConfluence;
const requestBitbucket = fetchAPI.requestBitbucket;
exports.requestBitbucket = requestBitbucket;
const deprecatedPropertiesApi = Object.entries(properties.propertiesApi)
    .map(([name, method]) => {
    const wrappedMethod = withDeprecatedMessage(method, `store.${name}() is deprecated. Use properties.${name}() imported from '@forge/api' instead`);
    return {
        [name]: wrappedMethod
    };
})
    .reduce((acc, next) => Object.assign(acc, next), {});
const store = deprecatedPropertiesApi;
exports.store = store;
const storage = (0, out.getStorageInstanceWithQuery)(new out.GlobalStorage(fetchAndStorage.getContextAri, fetchAndStorage.__requestAtlassianAsApp));
exports.storage = storage;
const properties$1 = properties.propertiesApi;
exports.properties = properties$1;
const API = {
    ...fetchAPI,
    store: { ...store },
    invokeRemote: remote.invokeRemote
};
exports.privacy = {
    reportPersonalData: (0, privacy.createReportPersonalData)(fetchAndStorage.__requestAtlassianAsApp)
};
exports.default = API;
const createRequestStargateAsApp = () => fetchAndStorage.__requestAtlassianAsApp;
exports.createRequestStargateAsApp = createRequestStargateAsApp;
var storage_2 = out;
Object.defineProperty(exports, "startsWith", { enumerable: true, get: function () { return storage_2.startsWith; } });
Object.defineProperty(exports, "WhereConditions", { enumerable: true, get: function () { return storage_2.WhereConditions; } });
Object.defineProperty(exports, "FilterConditions", { enumerable: true, get: function () { return storage_2.FilterConditions; } });
Object.defineProperty(exports, "SortOrder", { enumerable: true, get: function () { return storage_2.SortOrder; } });

Object.defineProperty(exports, "route", { enumerable: true, get: function () { return safeUrl.route; } });
Object.defineProperty(exports, "assumeTrustedRoute", { enumerable: true, get: function () { return safeUrl.assumeTrustedRoute; } });
Object.defineProperty(exports, "routeFromAbsolute", { enumerable: true, get: function () { return safeUrl.routeFromAbsolute; } });

Object.defineProperty(exports, "getAppContext", { enumerable: true, get: function () { return runtime.getAppContext; } });
Object.defineProperty(exports, "__getRuntime", { enumerable: true, get: function () { return runtime.__getRuntime; } });

Object.defineProperty(exports, "NeedsAuthenticationError", { enumerable: true, get: function () { return errors$1.NeedsAuthenticationError; } });
Object.defineProperty(exports, "ProxyRequestError", { enumerable: true, get: function () { return errors$1.ProxyRequestError; } });
Object.defineProperty(exports, "FetchError", { enumerable: true, get: function () { return errors$1.FetchError; } });
Object.defineProperty(exports, "ExternalEndpointNotAllowedError", { enumerable: true, get: function () { return errors$1.ExternalEndpointNotAllowedError; } });
Object.defineProperty(exports, "ProductEndpointNotAllowedError", { enumerable: true, get: function () { return errors$1.ProductEndpointNotAllowedError; } });
Object.defineProperty(exports, "RequestProductNotAllowedError", { enumerable: true, get: function () { return errors$1.RequestProductNotAllowedError; } });
Object.defineProperty(exports, "NotAllowedError", { enumerable: true, get: function () { return errors$1.NotAllowedError; } });
Object.defineProperty(exports, "InvalidWorkspaceRequestedError", { enumerable: true, get: function () { return errors$1.InvalidWorkspaceRequestedError; } });
Object.defineProperty(exports, "HttpError", { enumerable: true, get: function () { return errors$1.HttpError; } });
Object.defineProperty(exports, "FUNCTION_ERR", { enumerable: true, get: function () { return errors$1.FUNCTION_ERR; } });
Object.defineProperty(exports, "isForgePlatformError", { enumerable: true, get: function () { return errors$1.isForgePlatformError; } });
Object.defineProperty(exports, "isHostedCodeError", { enumerable: true, get: function () { return errors$1.isHostedCodeError; } });
Object.defineProperty(exports, "isExpectedError", { enumerable: true, get: function () { return errors$1.isExpectedError; } });
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(out$2);

export { __pika_web_default_export_for_treeshaking__ as _, out$2 as o };
