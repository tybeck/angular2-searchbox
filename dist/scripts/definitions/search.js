'use strict';
var Search;
(function (Search) {
    Search.InformationChange = 'informationChange';
})(Search = exports.Search || (exports.Search = {}));
exports.SELECTORS = [
    {
        "name": "Contains",
        "key": "contains",
        "selected": true,
        "notAllowed": [
            "restrictedSuggestedValues"
        ]
    },
    {
        "name": "Does not contain",
        "key": "doesNotContain",
        "notAllowed": [
            "restrictedSuggestedValues"
        ]
    },
    {
        "name": "Is Equal To",
        "key": "isEqualTo"
    },
    {
        "name": "Is Not Equal To",
        "key": "isNotEqualTo"
    },
    {
        "name": "Starts with",
        "key": "startsWith"
    },
    {
        "name": "Ends with",
        "key": "endsWith"
    },
    {
        "name": "Similiarity",
        "key": "similiarity"
    }
];
exports.OPERATORS = [
    {
        "name": "AND",
        "selected": true
    }, {
        "name": "OR"
    }
];
