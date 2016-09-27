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
var ng_templates_1 = require('../ng.templates');
var ng_advanced_searchbox_added_filter_1 = require('./ng-advanced-searchbox-added-filter');
var search_1 = require('../definitions/search');
var NgAdvancedSearchboxAddedFiltersWrapper = (function () {
    function NgAdvancedSearchboxAddedFiltersWrapper(componentFactoryResolver, changeDetectionRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectionRef = changeDetectionRef;
        this.observer = null;
        this.Filtering = null;
        return this;
    }
    NgAdvancedSearchboxAddedFiltersWrapper.prototype.ngAfterViewInit = function () {
        var self = this;
        this
            .observer
            .subscribe(function (change) {
            switch (change.name) {
                case search_1.Search.FilteringServiceChange:
                    self
                        .Filtering = change.data;
                    break;
            }
            self
                .changeDetectionRef
                .detectChanges();
        });
    };
    __decorate([
        core_1.Input('observer'), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgAdvancedSearchboxAddedFiltersWrapper.prototype, "observer");
    NgAdvancedSearchboxAddedFiltersWrapper = __decorate([
        core_1.Component({
            'selector': 'ng-advanced-searchbox-added-filters-wrapper',
            'template': ng_templates_1.NgAdvancedSearchboxAddedFiltersWrapperTemplate,
            'entryComponents': [
                ng_advanced_searchbox_added_filter_1.NgAdvancedSearchboxAddedFilter
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ChangeDetectorRef])
    ], NgAdvancedSearchboxAddedFiltersWrapper);
    return NgAdvancedSearchboxAddedFiltersWrapper;
}());
exports.NgAdvancedSearchboxAddedFiltersWrapper = NgAdvancedSearchboxAddedFiltersWrapper;
