'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _ = require('lodash');
var core_1 = require('@angular/core');
var ng_searchbox_component_1 = require('../components/ng-searchbox.component');
var ng_searchbox_added_filter_component_1 = require('../components/ng-searchbox-added-filter.component');
var validation_service_1 = require('../services/validation.service');
var validation = new validation_service_1.ValidationService();
var FilteringService = (function () {
    function FilteringService(searchbox) {
        this.searchbox = searchbox;
        this.addedFilters = [];
        this.addedOperators = [];
        this.hasFilters = false;
        this.event = null;
        this.params = null;
        this.ngSearchboxAddedFilters = null;
        this.Event = null;
        this.utils = null;
        this.event = new core_1.EventEmitter();
        this.ngSearchboxAddedFilters = this
            .searchbox
            .ngSearchboxAddedFiltersWrapper;
        this.Event = this
            .searchbox
            .Event;
        this.utils = this
            .searchbox
            .utils;
        return this;
    }
    FilteringService.prototype.getPublisher = function () {
        return this.event;
    };
    FilteringService.prototype.getFilterCount = function () {
        return this
            .addedFilters
            .length;
    };
    FilteringService.prototype.addOperatorToFilter = function (operator, filter, update) {
        if (update === void 0) { update = false; }
        var self = this;
        if (filter) {
            var index_1 = null;
            _.each(self.addedFilters, function (addedFilter, addedIndex) {
                if (addedFilter.filter.uuid === filter.uuid) {
                    index_1 = addedIndex;
                }
            });
            if (index_1 !== null) {
                var filterIndex = (index_1 - 1);
                if (!self.addedOperators[filterIndex]) {
                    self
                        .addedOperators
                        .push(operator.name);
                }
                else {
                    self
                        .addedOperators[filterIndex] = operator.name;
                }
            }
        }
        else {
            self
                .addedOperators
                .push(operator.name);
        }
        if (update) {
            this
                .update();
        }
        console.log(self.addedOperators);
    };
    FilteringService.prototype.hasOperatorAlready = function (filter) {
        var operators = this.getOperators(), filters = this.getFilters(), hasOperator = false;
        _.each(operators, function (o, oIndex) {
            _.each(filters, function (f, fIndex) {
                if (f.filter.uuid === filter.uuid) {
                    if ((fIndex - 1) === oIndex) {
                        hasOperator = true;
                    }
                }
            });
        });
        return hasOperator;
    };
    FilteringService.prototype.getOperators = function () {
        return this.addedOperators;
    };
    FilteringService.prototype.getFilters = function () {
        return this.addedFilters;
    };
    FilteringService.prototype.add = function (filter) {
        var factory = this
            .ngSearchboxAddedFilters
            .componentFactoryResolver
            .resolveComponentFactory(ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter), cmpRef = this
            .ngSearchboxAddedFilters
            .ngSearchboxAddedFiltersViewContainer
            .createComponent(factory);
        var modifiedFilter = _.clone(filter);
        modifiedFilter.uuid = this
            .utils
            .uuid();
        cmpRef
            .instance
            .set(this, this.searchbox, modifiedFilter);
        this
            .addedFilters
            .push({
            'component': cmpRef,
            'filter': modifiedFilter
        });
        if (this.addedFilters &&
            this.addedFilters.length) {
            this.hasFilters = true;
        }
    };
    FilteringService.prototype.removeByComponent = function (filter, options) {
        var self = this;
        this
            .addedFilters
            .slice()
            .reverse()
            .forEach(function (addedFilter) {
            if (addedFilter.component.instance === filter) {
                return self
                    .remove(addedFilter, options);
            }
        });
    };
    FilteringService.prototype.setOperator = function (filter, op) {
        this
            .addedFilters
            .slice()
            .reverse()
            .forEach(function (addedFilter) {
            if (addedFilter.filter.uuid === filter.uuid) {
                addedFilter.operator = op;
            }
        });
    };
    FilteringService.prototype.getOperatorByFilterIndex = function (filter) {
        var self = this, index = null, oIndex = 0, op = null;
        _.each(self.addedFilters, function (addedFilter, addedIndex) {
            if (addedFilter.filter.uuid === filter.uuid) {
                index = addedIndex;
            }
        });
        oIndex = (index - 1);
        if (Math.sign(oIndex) !== -1) {
            op = self.addedOperators[oIndex];
            if (typeof op === 'undefined') {
                op = null;
            }
        }
        return op;
    };
    FilteringService.prototype.remove = function (filter, options) {
        var self = this, operators = self.getOperators(), fIndex = null;
        self
            .addedFilters
            .forEach(function (sAddedFilter, sAddedIndex) {
            if (sAddedFilter.filter.uuid === filter.filter.uuid) {
                fIndex = sAddedIndex;
            }
        });
        self
            .addedFilters
            .slice()
            .reverse()
            .forEach(function (addedFilter, addedIndex, addedObject) {
            if (addedFilter.component === filter.component) {
                if (operators && operators.length) {
                    var oIndex = (fIndex - 1);
                    if (Math.sign(oIndex) === -1) {
                        var ffIndex = (fIndex + 1), nextFilter = self.addedFilters[ffIndex];
                        if (nextFilter && nextFilter.operator) {
                            nextFilter
                                .operator
                                .hasOperator = false;
                        }
                        oIndex = 0;
                    }
                    self
                        .addedOperators
                        .splice(oIndex, 1);
                }
                self
                    .addedFilters
                    .splice(addedObject.length - 1 - addedIndex, 1);
                filter
                    .component
                    .destroy();
            }
        });
        console.log(self.addedOperators);
        if (this.addedFilters &&
            !this.addedFilters.length) {
            this.hasFilters = false;
        }
        if (!options || (options &&
            typeof options.update === 'boolean' && options.update)) {
            this.update();
        }
    };
    FilteringService.prototype.removeAll = function () {
        var self = this;
        this
            .addedFilters
            .slice()
            .reverse()
            .forEach(function (filter) {
            return self
                .remove(filter);
        });
    };
    FilteringService.prototype.buildExtendedParameter = function (filter) {
        if (filter && !filter.$$timestamp) {
            filter.$$timestamp = new Date().getTime();
        }
        filter.$$modified = new Date().getTime();
        return filter;
    };
    FilteringService.prototype.buildParameter = function (filter) {
        var operator = this.getOperatorByFilterIndex(filter) || null;
        var _param = {
            'name': filter.name,
            'value': filter.value,
            'condition': filter.selector.key,
            '$$lastValue': filter.$$lastValue,
            '$$modified': filter.$$timestamp || null,
            '$$timestamp': filter.$$timestamp || null,
            '$$operator': operator
        };
        return (this.buildExtendedParameter(_param));
    };
    FilteringService.prototype.update = function (filter) {
        var self = this, params = [];
        console.log('update...');
        self
            .addedFilters
            .forEach(function (addedFilter) {
            if (filter && addedFilter
                .filter.uuid === filter.uuid) {
                addedFilter.filter = filter;
            }
            var modifiedFilter = self.buildParameter(addedFilter.filter);
            _.extend(addedFilter.filter, {
                '$$timestamp': modifiedFilter.$$timestamp,
                '$$modified': modifiedFilter.$$modified,
                '$$lastValue': modifiedFilter.$$lastValue
            });
            params.push(modifiedFilter);
        });
        if (this.params !== params) {
            this
                .event
                .emit(params);
        }
        this.params = params;
    };
    FilteringService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng_searchbox_component_1.NgSearchboxComponent])
    ], FilteringService);
    return FilteringService;
}());
exports.FilteringService = FilteringService;
