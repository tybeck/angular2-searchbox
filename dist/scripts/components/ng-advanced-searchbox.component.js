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
var utils_service_1 = require('../services/utils.service');
var event_handling_service_1 = require('../services/event-handling.service');
var api_service_1 = require('../services/api.service');
var filtering_service_1 = require('../services/filtering.service');
var placeholders_service_1 = require('../services/placeholders.service');
var search_1 = require('../definitions/search');
var ng_advanced_searchbox_added_filters_wrapper_component_1 = require('./ng-advanced-searchbox-added-filters-wrapper.component');
var Utils = new utils_service_1.UtilsService();
var NgAdvancedSearchboxComponent = (function () {
    function NgAdvancedSearchboxComponent(changeDetectorRef, window) {
        this.changeDetectorRef = changeDetectorRef;
        this.window = window;
        this.searchParams = null;
        this.ngSearchBoxFiltering = null;
        this.ngSearchBoxConfig = null;
        this.ngSearchBoxAutoComplete = null;
        this.ngSearchBoxCacheFilter = null;
        this.ngSearchBoxEnableFilteringOperators = null;
        this.ngSearchBoxFilterSelectors = null;
        this.ngSearchBoxFilterOperators = null;
        this.placeholder = '';
        this.onRegisterApi = new core_1.EventEmitter();
        this.onChange = new core_1.EventEmitter();
        this.Placeholding = null;
        this.Filtering = null;
        this.Event = null;
        this.Api = null;
        this.query = '';
        this.previousQuery = null;
        this.hasQuery = false;
        this.sid = Utils.uuid();
        this.timer = null;
        this.defaultParams = {
            'query': '',
            'filters': []
        };
        return this;
    }
    NgAdvancedSearchboxComponent.prototype.ngOnInit = function () {
        this
            .configure();
    };
    NgAdvancedSearchboxComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        this.Api = new api_service_1.API();
        this.Event = new event_handling_service_1.EventHandling(this.Api);
        this.Filtering = new filtering_service_1.FilteringService(this.Event, this.ngAdvancedSearchboxAddedFilters, this.ngAdvancedSearchboxAddedFiltersViewContainer);
        this.Placeholding = new placeholders_service_1.PlaceholdersService(this);
        this
            .Filtering
            .getPublisher()
            .subscribe(function (filters) {
            if (self.timer) {
                self
                    .window
                    .clearTimeout(self.timer);
                self.timer = null;
            }
            self
                .searchParams
                .filters = filters;
            if (self.ngSearchBoxConfig && self.
                ngSearchBoxConfig
                .delay) {
                self.timer = self
                    .window
                    .setTimeout(function () {
                    self
                        .Event
                        .onChange(self.searchParams);
                }, self.ngSearchBoxConfig.delay);
            }
            else {
                self
                    .Event
                    .onChange(self.searchParams);
            }
        });
        this
            .emit(search_1.Search.FilteringChange, this.ngSearchBoxFiltering)
            .emit(search_1.Search.FilteringServiceChange, this.Filtering);
        this
            .register();
        this
            .changeDetectorRef
            .detectChanges();
    };
    NgAdvancedSearchboxComponent.prototype.ngOnChanges = function () {
    };
    NgAdvancedSearchboxComponent.prototype.emit = function (name, data) {
        this
            .onChange
            .emit({
            'name': name,
            'data': data
        });
        return this;
    };
    NgAdvancedSearchboxComponent.prototype.queryChange = function (val) {
        var _this = this;
        var self = this;
        if (!val && !this.previousQuery && typeof val === 'string' &&
            typeof this.previousQuery === 'string') {
            return;
        }
        if (typeof val !== 'undefined') {
            self.hasQuery = (val && val.length) ? true : false;
            self
                .searchParams
                .query = val;
            if (self.timer) {
                self
                    .window
                    .clearTimeout(this.timer);
                self.timer = null;
            }
            if (self.ngSearchBoxConfig && self.
                ngSearchBoxConfig
                .delay) {
                self.timer = self
                    .window
                    .setTimeout(function () {
                    self
                        .Event
                        .onChange(self.searchParams)
                        .onQueryAdded(val, _this.previousQuery)
                        .onQueryRemoved(val, _this.previousQuery);
                }, self.ngSearchBoxConfig.delay);
            }
            else {
                self
                    .Event
                    .onChange(self.searchParams)
                    .onQueryAdded(val, this.previousQuery)
                    .onQueryRemoved(val, this.previousQuery);
            }
        }
    };
    NgAdvancedSearchboxComponent.prototype.onKeyDown = function (event) {
        this
            .previousQuery = event
            .target
            .value;
    };
    NgAdvancedSearchboxComponent.prototype.configure = function () {
        this
            .searchParams = this.defaultParams;
        return this;
    };
    NgAdvancedSearchboxComponent.prototype.register = function () {
        this
            .onRegisterApi
            .emit(this.Api);
        return this;
    };
    NgAdvancedSearchboxComponent.prototype.eraseQuery = function () {
        this.previousQuery = null;
        this.query = '';
        this
            .queryChange(this.query);
    };
    NgAdvancedSearchboxComponent.prototype.handleEraser = function () {
        if (this
            .searchParams
            .query) {
            this
                .eraseQuery();
            this
                .Event
                .onEraser();
        }
    };
    NgAdvancedSearchboxComponent.prototype.handleGarbage = function () {
        if (this
            .searchParams
            .query || this.Filtering.hasFilters) {
            this
                .eraseQuery();
            this
                .Filtering
                .removeAll();
            this
                .Event
                .onGarbage();
        }
    };
    __decorate([
        core_1.ViewChild('ngAdvancedSearchboxAddedFilters', { 'read': core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], NgAdvancedSearchboxComponent.prototype, "ngAdvancedSearchboxAddedFiltersViewContainer");
    __decorate([
        core_1.ViewChild('ngAdvancedSearchboxAddedFilters'), 
        __metadata('design:type', ng_advanced_searchbox_added_filters_wrapper_component_1.NgAdvancedSearchboxAddedFiltersWrapper)
    ], NgAdvancedSearchboxComponent.prototype, "ngAdvancedSearchboxAddedFilters");
    __decorate([
        core_1.Input('searchParams'), 
        __metadata('design:type', Object)
    ], NgAdvancedSearchboxComponent.prototype, "searchParams");
    __decorate([
        core_1.Input('ngSearchBoxFiltering'), 
        __metadata('design:type', Array)
    ], NgAdvancedSearchboxComponent.prototype, "ngSearchBoxFiltering");
    __decorate([
        core_1.Input('ngSearchBoxConfig'), 
        __metadata('design:type', Object)
    ], NgAdvancedSearchboxComponent.prototype, "ngSearchBoxConfig");
    __decorate([
        core_1.Input('ngSearchBoxAutoComplete'), 
        __metadata('design:type', Object)
    ], NgAdvancedSearchboxComponent.prototype, "ngSearchBoxAutoComplete");
    __decorate([
        core_1.Input('ngSearchBoxCacheFilter'), 
        __metadata('design:type', Object)
    ], NgAdvancedSearchboxComponent.prototype, "ngSearchBoxCacheFilter");
    __decorate([
        core_1.Input('ngSearchBoxEnableFilteringOperators'), 
        __metadata('design:type', Object)
    ], NgAdvancedSearchboxComponent.prototype, "ngSearchBoxEnableFilteringOperators");
    __decorate([
        core_1.Input('ngSearchBoxFilterSelectors'), 
        __metadata('design:type', Object)
    ], NgAdvancedSearchboxComponent.prototype, "ngSearchBoxFilterSelectors");
    __decorate([
        core_1.Input('ngSearchBoxFilterOperators'), 
        __metadata('design:type', Object)
    ], NgAdvancedSearchboxComponent.prototype, "ngSearchBoxFilterOperators");
    __decorate([
        core_1.Input('placeholder'), 
        __metadata('design:type', String)
    ], NgAdvancedSearchboxComponent.prototype, "placeholder");
    __decorate([
        core_1.Output('onRegisterApi'), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgAdvancedSearchboxComponent.prototype, "onRegisterApi");
    NgAdvancedSearchboxComponent = __decorate([
        core_1.Component({
            'selector': 'ng-advanced-searchbox',
            'template': ng_templates_1.NgAdvancedSearchboxTemplate
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, Window])
    ], NgAdvancedSearchboxComponent);
    return NgAdvancedSearchboxComponent;
}());
exports.NgAdvancedSearchboxComponent = NgAdvancedSearchboxComponent;
