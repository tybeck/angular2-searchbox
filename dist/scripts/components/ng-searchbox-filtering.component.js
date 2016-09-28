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
var NgSearchboxFilteringComponent = (function () {
    function NgSearchboxFilteringComponent(changeDetectionRef) {
        this.changeDetectionRef = changeDetectionRef;
        this.observer = null;
        this.Filtering = null;
        this.active = false;
        return this;
    }
    NgSearchboxFilteringComponent.prototype.toggleFilters = function () {
        this.active = !this.active;
    };
    NgSearchboxFilteringComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        this
            .observer
            .subscribe(function (change) {
            switch (change.name) {
                case search_1.Search.FilteringChange:
                    self
                        .availableFilters = change.data;
                    break;
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
    NgSearchboxFilteringComponent.prototype.addFilterAndClose = function (filter) {
        this.active = false;
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
        core_1.Input('observer'), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgSearchboxFilteringComponent.prototype, "observer");
    NgSearchboxFilteringComponent = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-filtering',
            'template': ng_templates_1.NgSearchboxFilteringTemplate,
            'styles': ng_styles_1.NgSearchboxFilteringStyle
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], NgSearchboxFilteringComponent);
    return NgSearchboxFilteringComponent;
}());
exports.NgSearchboxFilteringComponent = NgSearchboxFilteringComponent;
