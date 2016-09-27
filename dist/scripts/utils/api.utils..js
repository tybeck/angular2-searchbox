'use strict';
function hasEventErrors(evt, fn, emptyFnAllowed) {
    if (emptyFnAllowed === void 0) { emptyFnAllowed = false; }
    if (typeof evt !== 'string') {
        throw new TypeError('Tyb API - Event Name parameter must be type String!');
    }
    if (typeof fn !== 'function' && !emptyFnAllowed) {
        throw new TypeError('Tyb API - Event Function parameter must be type Function!');
    }
    return this;
}
exports.hasEventErrors = hasEventErrors;
function hasInvalidEventType(evt, types) {
    var validType = false;
    types.forEach(function (type) {
        type = type.toLowerCase();
        evt = evt.toLowerCase();
        if (type === evt) {
            validType = true;
        }
    });
    if (!validType) {
        throw new ReferenceError('Tyb API - Invalid Event Type Provided!');
    }
    return this;
}
exports.hasInvalidEventType = hasInvalidEventType;
