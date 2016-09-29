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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _ = require('lodash');
var core_1 = require('@angular/core');
var ng_searchbox_added_filter_1 = require('../components/ng-searchbox-added-filter');
var ng_templates_1 = require('../ng.templates');
var ng_styles_1 = require('../ng.styles');
var search_1 = require('../definitions/search');
var NgSearchboxFilterSelectors = (function () {
    function NgSearchboxFilterSelectors(ngAddedFilter) {
        this.ngAddedFilter = ngAddedFilter;
        this.filter = null;
        this.selectors = _.clone(search_1.SELECTORS);
        return this;
    }
    NgSearchboxFilterSelectors.prototype.takeSelector = function (selector) {
        var self = this;
        self
            .selectors
            .forEach(function (selector) {
            selector.selected = false;
        });
        self
            .filter
            .selector = selector;
        selector.selected = true;
        if (self
            .filter
            .value) {
            this
                .ngAddedFilter
                .Filtering
                .update();
            this.ngAddedFilter.Event.onFilterSelectorChanged(selector, self.filter);
        }
        this
            .ngAddedFilter
            .setFocus();
    };
    NgSearchboxFilterSelectors.prototype.getDefaultSelector = function () {
        var self = this;
        setTimeout(function () {
            if (!self
                .filter
                .selector) {
                self
                    .selectors
                    .forEach(function (selector) {
                    if (selector.selected) {
                        self
                            .filter
                            .selector = selector;
                    }
                });
                if (!self.filter.selector
                    && self.selectors.length) {
                    var selector = self
                        .selectors[0];
                    selector.selected = true;
                    self
                        .filter
                        .selector = selector;
                }
            }
            else {
                self
                    .selectors
                    .forEach(function (selector) {
                    selector.selected = (selector.key === self
                        .filter
                        .selector
                        .key);
                });
            }
        }, 0);
        return this;
    };
    NgSearchboxFilterSelectors.prototype.ngAfterViewInit = function () {
        this
            .getDefaultSelector();
    };
    __decorate([
        core_1.Input('filter'), 
        __metadata('design:type', Object)
    ], NgSearchboxFilterSelectors.prototype, "filter");
    NgSearchboxFilterSelectors = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-filter-selectors',
            'template': ng_templates_1.NgSearchboxFilterSelectorsTemplate,
            'styles': ng_styles_1.NgSearchboxFilterSelectorsStyle
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return ng_searchbox_added_filter_1.NgSearchboxAddedFilter; }))), 
        __metadata('design:paramtypes', [ng_searchbox_added_filter_1.NgSearchboxAddedFilter])
    ], NgSearchboxFilterSelectors);
    return NgSearchboxFilterSelectors;
}());
exports.NgSearchboxFilterSelectors = NgSearchboxFilterSelectors;
