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
var ng_searchbox_added_filters_wrapper_component_1 = require('../components/ng-searchbox-added-filters-wrapper.component');
var ng_searchbox_added_filter_1 = require('../components/ng-searchbox-added-filter');
var event_handling_service_1 = require('../services/event-handling.service');
var validation_service_1 = require('../services/validation.service');
var utils_service_1 = require('../services/utils.service');
var validation = new validation_service_1.ValidationService();
var FilteringService = (function () {
    function FilteringService(eventSvc, ngSearchboxAddedFilters, utils) {
        this.eventSvc = eventSvc;
        this.ngSearchboxAddedFilters = ngSearchboxAddedFilters;
        this.utils = utils;
        this.addedFilters = [];
        this.hasFilters = false;
        this.event = null;
        this.params = null;
        this.event = new core_1.EventEmitter();
        return this;
    }
    FilteringService.prototype.getPublisher = function () {
        return this.event;
    };
    FilteringService.prototype.add = function (filter) {
        var factory = this
            .ngSearchboxAddedFilters
            .componentFactoryResolver
            .resolveComponentFactory(ng_searchbox_added_filter_1.NgSearchboxAddedFilter), cmpRef = this
            .ngSearchboxAddedFilters
            .ngSearchboxAddedFiltersViewContainer
            .createComponent(factory);
        var modifiedFilter = _.clone(filter);
        modifiedFilter.uuid = this
            .utils
            .uuid();
        cmpRef
            .instance
            .set(this, this.eventSvc, modifiedFilter);
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
    FilteringService.prototype.remove = function (filter, options) {
        var self = this;
        this
            .addedFilters
            .slice()
            .reverse()
            .forEach(function (addedFilter, addedIndex, addedObject) {
            if (addedFilter.component === filter.component) {
                self
                    .addedFilters
                    .splice(addedObject.length - 1 - addedIndex, 1);
                filter
                    .component
                    .destroy();
            }
        });
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
        var _param = {
            'name': filter.name,
            'value': filter.value,
            'condition': filter.selector.key,
            '$$lastValue': filter.$$lastValue,
            '$$modified': filter.$$timestamp || null,
            '$$timestamp': filter.$$timestamp || null
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
                .filter
                .uuid === filter.uuid) {
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
        __metadata('design:paramtypes', [event_handling_service_1.EventHandling, ng_searchbox_added_filters_wrapper_component_1.NgSearchboxAddedFiltersWrapper, utils_service_1.UtilsService])
    ], FilteringService);
    return FilteringService;
}());
exports.FilteringService = FilteringService;
