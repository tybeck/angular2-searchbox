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
var search_1 = require('../definitions/search');
var utils_service_1 = require('../services/utils.service');
var NgSearchboxFilteringComponent = (function () {
    function NgSearchboxFilteringComponent(changeDetectionRef, utils, zone) {
        this.changeDetectionRef = changeDetectionRef;
        this.utils = utils;
        this.zone = zone;
        this.observer = null;
        this.Filtering = null;
        this.active = false;
        this.searchbox = null;
        return this;
    }
    NgSearchboxFilteringComponent.prototype.handleResize = function () {
        if (this.active) {
            this.setPosition();
        }
    };
    NgSearchboxFilteringComponent.prototype.toggleFilters = function (active) {
        var self = this;
        if (typeof active !== 'undefined') {
            this.active = active;
        }
        else {
            this.active = !this.active;
        }
        this
            .zone
            .run(function () {
            if (self.active) {
                self.setPosition();
            }
        });
    };
    NgSearchboxFilteringComponent.prototype.setPosition = function () {
        var self = this;
        var h = self
            .utils
            .getHeightOf(self
            .searchbox
            .element), w = self
            .utils
            .getWidthOf(self
            .searchbox
            .element);
        self
            .ngSearchboxFilteringList
            .nativeElement
            .style
            .top = h + 'px';
        self
            .ngSearchboxFilteringList
            .nativeElement
            .style
            .width = w + 'px';
    };
    NgSearchboxFilteringComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        this
            .observer
            .subscribe(function (change) {
            switch (change.name) {
                case search_1.Search.InformationChange:
                    var data = change.data;
                    self.searchbox = data.component;
                    if (self.searchbox) {
                        self.availableFilters = self
                            .searchbox
                            .ngSearchBoxFiltering;
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
    NgSearchboxFilteringComponent.prototype.addFilterAndClose = function (filter) {
        this.toggleFilters(false);
        this
            .Filtering
            .add(filter);
        return;
    };
    NgSearchboxFilteringComponent.prototype.addFilter = function (event, name) {
        var self = this;
        if (this.availableFilters) {
            this
                .availableFilters
                .forEach(function (filter) {
                var modifiedFilter = filter;
                if (modifiedFilter.name === name) {
                    if (modifiedFilter.restrictedSuggestedValues) {
                        self.addFilterAndClose(modifiedFilter);
                    }
                    else {
                        if (!modifiedFilter.multi) {
                            modifiedFilter.notFiltered = !modifiedFilter.notFiltered;
                            if (!modifiedFilter.notFiltered) {
                                self.addFilterAndClose(modifiedFilter);
                            }
                        }
                        else {
                            self.addFilterAndClose(modifiedFilter);
                        }
                    }
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild('ngSearchboxFilteringList'), 
        __metadata('design:type', core_1.ElementRef)
    ], NgSearchboxFilteringComponent.prototype, "ngSearchboxFilteringList");
    __decorate([
        core_1.Input('observer'), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgSearchboxFilteringComponent.prototype, "observer");
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NgSearchboxFilteringComponent.prototype, "handleResize");
    NgSearchboxFilteringComponent = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-filtering',
            'template': ng_templates_1.NgSearchboxFilteringTemplate,
            'styles': ng_styles_1.NgSearchboxFilteringStyle,
            'providers': [
                utils_service_1.UtilsService
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, utils_service_1.UtilsService, core_1.NgZone])
    ], NgSearchboxFilteringComponent);
    return NgSearchboxFilteringComponent;
}());
exports.NgSearchboxFilteringComponent = NgSearchboxFilteringComponent;
