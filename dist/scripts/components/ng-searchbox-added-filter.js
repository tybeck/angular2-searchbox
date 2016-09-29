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
var ng_styles_1 = require('../ng.styles');
var NgSearchboxAddedFilter = (function () {
    function NgSearchboxAddedFilter(utils, window) {
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
    NgSearchboxAddedFilter.prototype.set = function (filteringSvc, eventSvc, filter) {
        this.Filtering = filteringSvc;
        this.Event = eventSvc;
        this.filter = filter;
        this
            .toggleActivation();
        return this;
    };
    NgSearchboxAddedFilter.prototype.toggleActivation = function (force) {
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
    NgSearchboxAddedFilter.prototype.openFilter = function () {
        var _this = this;
        if (!this.filter.editing) {
            this
                .filter
                .editing = true;
            setTimeout(function () {
                _this
                    .window
                    .addEventListener('click', _this.proxiedFunction);
            }, 25);
            this
                .setFocus();
        }
        return this;
    };
    NgSearchboxAddedFilter.prototype.setFocus = function () {
        var self = this;
        setTimeout(function () {
            var input = self
                .ngSearchboxAddedFilter
                .nativeElement
                .querySelector('input');
            if (input) {
                input
                    .focus();
            }
        }, 25);
        return this;
    };
    NgSearchboxAddedFilter.prototype.closeFilter = function () {
        if (!this.filter.value) {
            this
                .Filtering
                .removeByComponent(this, {
                'update': false
            });
        }
        else {
            this
                .filter
                .editing = false;
        }
        return this;
    };
    NgSearchboxAddedFilter.prototype.valueChange = function (val) {
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
    NgSearchboxAddedFilter.prototype.onKeyDown = function (event) {
        this
            .pv = event
            .target
            .value;
        this
            .filter
            .$$lastValue = this
            .pv;
    };
    NgSearchboxAddedFilter.prototype.onKeyUp = function (event) {
        if (event.keyCode === 13) {
            this
                .closeFilter();
        }
    };
    NgSearchboxAddedFilter.prototype.windowClicked = function (event) {
        var target = event.target, element = this
            .ngSearchboxAddedFilter
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
    NgSearchboxAddedFilter.prototype.destroy = function () {
        this
            .Filtering
            .removeByComponent(this);
    };
    __decorate([
        core_1.ViewChild('ngSearchboxAddedFilter'), 
        __metadata('design:type', core_1.ElementRef)
    ], NgSearchboxAddedFilter.prototype, "ngSearchboxAddedFilter");
    NgSearchboxAddedFilter = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-added-filter',
            'template': ng_templates_1.NgSearchboxAddedFilterTemplate,
            'styles': ng_styles_1.NgSearchboxAddedFilterStyle,
            'providers': [
                utils_service_1.UtilsService
            ]
        }), 
        __metadata('design:paramtypes', [utils_service_1.UtilsService, Window])
    ], NgSearchboxAddedFilter);
    return NgSearchboxAddedFilter;
}());
exports.NgSearchboxAddedFilter = NgSearchboxAddedFilter;
