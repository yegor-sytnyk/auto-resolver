var path = require('path');
var stackTrace = require('callsite');
var decache = require('decache');

module.exports = {
    resolve,
    register,
    registerResolver,
    loadIndex,
    cacheReload
};

const index = {
};

function resolve(dependencyId) {
    var entry = index[dependencyId];

    if (!entry) throw new Error(`Cannot resolve dependency '${dependencyId}'`);

    if (isString(entry)) {
        var dependency = require(entry);

        return dependency.default ? dependency.default : dependency;
    }

    return entry;
}

function register(dependencyId, dependency) {
    if (isString(dependency)) {
        var callerDir = getCallerDir();

        var dependencyPath = path.join(callerDir, dependency);

        index[dependencyId] = dependencyPath;
    } else {
        index[dependencyId] = dependency;
    }
}

function registerResolver(resolveName) {
    var resolveName = resolveName ? resolveName : 'resolve';
    global[resolveName] = resolve;
}

function loadIndex(indexFilePath) {
    var indexFile = null;

    var callerDir = getCallerDir();

    var fullPath = path.join(callerDir, indexFilePath);

    try {
        indexFile = require(fullPath);
    } catch (err) {
        throw new Error(`Cannot load index file ${fullPath}`);
    }

    if (!indexFile.index) throw new Error(`Index file ${path} does not have index property`);

    var baseDir = path.dirname(fullPath);

    for (var name in indexFile.index) {
        index[name] = path.join(baseDir, indexFile.index[name]);
    }
}

function cacheReload() {
    for (var name in index) {
        decache(index[name])
    }
}

//helper functions

function isString(str) {
    if (typeof str === 'string' || str instanceof String) return true;

    return false;
}

function getCallerDir() {
    var trace = stackTrace();

    var callerDir = path.dirname(trace[2].getFileName());

    return callerDir;
}