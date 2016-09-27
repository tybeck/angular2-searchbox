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
var core_1 = require('@angular/core');
var utils_service_1 = require('../services/utils.service');
var ng_templates_1 = require('../ng.templates');
var NgAdvancedSearchboxAddedFilter = (function () {
    function NgAdvancedSearchboxAddedFilter(utils, window) {
        this.utils = utils;
        this.window = window;
        this.Filtering = null;
        this.Event = null;
        this.filter = null;
        this.uuid = null;
        this.v = '';
        this.pv = '';
        this.uuid = this
            .utils
            .uuid();
        return this;
    }
    NgAdvancedSearchboxAddedFilter.prototype.set = function (filteringSvc, eventSvc, filter) {
        this.Filtering = filteringSvc;
        this.Event = eventSvc;
        this.filter = filter;
        this
            .toggleActivation();
        return this;
    };
    NgAdvancedSearchboxAddedFilter.prototype.toggleActivation = function (force) {
        var _this = this;
        var self = this;
        if (typeof this
            .filter
            .active === 'undefined') {
            this
                .filter
                .active = true;
            this
                .filter
                .editing = true;
        }
        else {
            if (typeof force !== 'undefined') {
                this
                    .filter
                    .active = force;
            }
            else {
                this
                    .filter
                    .active = !this
                    .filter
                    .active;
            }
        }
        if (this.filter.active) {
            setTimeout(function () {
                self.proxiedFunction = function (event) {
                    _this
                        .windowClicked
                        .apply(self, [event]);
                };
                self
                    .window
                    .addEventListener('click', self.proxiedFunction);
            }, 25);
            self
                .setFocus();
        }
        else {
            self
                .window
                .removeEventListener('click', this.proxiedFunction);
            self.closeFilter();
        }
    };
    NgAdvancedSearchboxAddedFilter.prototype.openFilter = function () {
        if (!this.filter.editing) {
            this
                .filter
                .editing = true;
            this
                .window
                .addEventListener('click', this.proxiedFunction);
            this
                .setFocus();
        }
        return this;
    };
    NgAdvancedSearchboxAddedFilter.prototype.setFocus = function () {
        var self = this;
        setTimeout(function () {
            var input = self
                .ngAdvancedSearchboxAddedFilter
                .nativeElement
                .querySelector('input');
            if (input) {
                input
                    .focus();
            }
        }, 25);
        return this;
    };
    NgAdvancedSearchboxAddedFilter.prototype.closeFilter = function () {
        if (!this.filter.value) {
            this
                .Filtering
                .removeByComponent(this);
        }
        else {
            this
                .filter
                .editing = false;
        }
        return this;
    };
    NgAdvancedSearchboxAddedFilter.prototype.valueChange = function (val) {
        this
            .filter
            .value = val;
        if (val !== this.pv) {
            this
                .Event
                .onFilterChanged(this.filter);
            this
                .Filtering
                .update(this.filter);
        }
    };
    NgAdvancedSearchboxAddedFilter.prototype.onKeyDown = function (event) {
        this
            .pv = event
            .target
            .value;
        this
            .filter
            .$$lastValue = this
            .pv;
    };
    NgAdvancedSearchboxAddedFilter.prototype.onKeyUp = function (event) {
        if (event.keyCode === 13) {
            this
                .closeFilter();
        }
    };
    NgAdvancedSearchboxAddedFilter.prototype.windowClicked = function (event) {
        var target = event.target, element = this
            .ngAdvancedSearchboxAddedFilter
            .nativeElement;
        if (!element.contains(target)) {
            this
                .window
                .removeEventListener('click', this.proxiedFunction);
            this
                .toggleActivation(false);
            this
                .closeFilter();
        }
    };
    NgAdvancedSearchboxAddedFilter.prototype.destroy = function () {
        this
            .Filtering
            .removeByComponent(this);
    };
    __decorate([
        core_1.ViewChild('ngAdvancedSearchboxAddedFilter'), 
        __metadata('design:type', core_1.ElementRef)
    ], NgAdvancedSearchboxAddedFilter.prototype, "ngAdvancedSearchboxAddedFilter");
    NgAdvancedSearchboxAddedFilter = __decorate([
        core_1.Component({
            'selector': 'ng-advanced-searchbox-added-filter',
            'template': ng_templates_1.NgAdvancedSearchboxAddedFilterTemplate,
            'providers': [
                utils_service_1.UtilsService
            ]
        }), 
        __metadata('design:paramtypes', [utils_service_1.UtilsService, Window])
    ], NgAdvancedSearchboxAddedFilter);
    return NgAdvancedSearchboxAddedFilter;
}());
exports.NgAdvancedSearchboxAddedFilter = NgAdvancedSearchboxAddedFilter;
