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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var ng_searchbox_component_1 = require('./components/ng-searchbox.component');
var ng_searchbox_filtering_component_1 = require('./components/ng-searchbox-filtering.component');
var ng_searchbox_added_filters_wrapper_component_1 = require('./components/ng-searchbox-added-filters-wrapper.component');
var ng_searchbox_added_filter_1 = require('./components/ng-searchbox-added-filter');
var ng_searchbox_filter_selectors_1 = require('./components/ng-searchbox-filter-selectors');
var NgSearchboxModule = (function () {
    function NgSearchboxModule() {
    }
    NgSearchboxModule = __decorate([
        core_1.NgModule({
            'imports': [
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            'declarations': [
                ng_searchbox_component_1.NgSearchboxComponent,
                ng_searchbox_filtering_component_1.NgSearchboxFilteringComponent,
                ng_searchbox_added_filters_wrapper_component_1.NgSearchboxAddedFiltersWrapper,
                ng_searchbox_added_filter_1.NgSearchboxAddedFilter,
                ng_searchbox_filter_selectors_1.NgSearchboxFilterSelectors
            ],
            'providers': [
                {
                    'provide': Window,
                    'useValue': window
                }, {
                    'provide': Document,
                    'useValue': document
                }
            ],
            'exports': [
                ng_searchbox_component_1.NgSearchboxComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NgSearchboxModule);
    return NgSearchboxModule;
}());
exports.NgSearchboxModule = NgSearchboxModule;
