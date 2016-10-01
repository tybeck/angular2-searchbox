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
var ng_styles_1 = require('../ng.styles');
var ng_searchbox_added_filter_component_1 = require('./ng-searchbox-added-filter.component');
var search_1 = require('../definitions/search');
var NgSearchboxAddedFiltersWrapper = (function () {
    function NgSearchboxAddedFiltersWrapper(componentFactoryResolver, changeDetectionRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectionRef = changeDetectionRef;
        this.observer = null;
        this.Filtering = null;
        this.searchbox = null;
        return this;
    }
    NgSearchboxAddedFiltersWrapper.prototype.ngAfterViewInit = function () {
        var self = this;
        this
            .observer
            .subscribe(function (change) {
            switch (change.name) {
                case search_1.Search.InformationChange:
                    var data = change.data;
                    self.searchbox = data.component;
                    if (self.searchbox) {
                        self.Filtering = self
                            .searchbox
                            .Filtering;
                    }
                    break;
            }
            self
                .changeDetectionRef
                .detectChanges();
        });
    };
    __decorate([
        core_1.ViewChild('ngSearchboxAddedFilters', { 'read': core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], NgSearchboxAddedFiltersWrapper.prototype, "ngSearchboxAddedFiltersViewContainer");
    __decorate([
        core_1.ViewChild('ngSearchboxAddedFilters'), 
        __metadata('design:type', NgSearchboxAddedFiltersWrapper)
    ], NgSearchboxAddedFiltersWrapper.prototype, "ngSearchboxAddedFilters");
    __decorate([
        core_1.Input('observer'), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgSearchboxAddedFiltersWrapper.prototype, "observer");
    NgSearchboxAddedFiltersWrapper = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-added-filters-wrapper',
            'template': ng_templates_1.NgSearchboxAddedFiltersWrapperTemplate,
            'entryComponents': [
                ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter
            ],
            'styles': ng_styles_1.NgSearchboxAddedFiltersWrapperStyle
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ChangeDetectorRef])
    ], NgSearchboxAddedFiltersWrapper);
    return NgSearchboxAddedFiltersWrapper;
}());
exports.NgSearchboxAddedFiltersWrapper = NgSearchboxAddedFiltersWrapper;
