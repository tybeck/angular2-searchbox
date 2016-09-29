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
var utils_service_1 = require('../services/utils.service');
var event_handling_service_1 = require('../services/event-handling.service');
var api_service_1 = require('../services/api.service');
var filtering_service_1 = require('../services/filtering.service');
var placeholders_service_1 = require('../services/placeholders.service');
var search_1 = require('../definitions/search');
var ng_searchbox_added_filters_wrapper_component_1 = require('./ng-searchbox-added-filters-wrapper.component');
var memory_service_1 = require('../services/memory.service');
var NgSearchboxComponent = (function () {
    function NgSearchboxComponent(element, memory, changeDetectorRef, utils, window) {
        this.element = element;
        this.memory = memory;
        this.changeDetectorRef = changeDetectorRef;
        this.utils = utils;
        this.window = window;
        this.searchParams = null;
        this.ngSearchBoxFiltering = null;
        this.ngSearchBoxConfig = null;
        this.ngSearchBoxAutoComplete = null;
        this.ngSearchBoxCacheFilter = false;
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
        this.sid = '';
        this.timer = null;
        this.defaultParams = {
            'query': '',
            'filters': []
        };
        console.log(this.memory);
        return this;
    }
    NgSearchboxComponent.prototype.ngOnInit = function () {
        this.sid = this
            .utils
            .uuid();
        this
            .configure();
    };
    NgSearchboxComponent.prototype.ngAfterViewInit = function () {
        var self = this, addedFiltersWrapper = this
            .ngSearchboxAddedFiltersWrapper;
        this.Api = new api_service_1.API();
        this.Event = new event_handling_service_1.EventHandling(this.Api);
        this.Filtering = new filtering_service_1.FilteringService(this.Event, addedFiltersWrapper, this.utils);
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
        var searchBoxInformationExchange = {
            'component': this
        };
        this
            .emit(search_1.Search.InformationChange, searchBoxInformationExchange);
        this
            .register();
        this
            .changeDetectorRef
            .detectChanges();
    };
    NgSearchboxComponent.prototype.ngOnChanges = function () {
    };
    NgSearchboxComponent.prototype.emit = function (name, data) {
        this
            .onChange
            .emit({
            'name': name,
            'data': data
        });
        return this;
    };
    NgSearchboxComponent.prototype.queryChange = function (val) {
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
    NgSearchboxComponent.prototype.onKeyDown = function (event) {
        this
            .previousQuery = event
            .target
            .value;
    };
    NgSearchboxComponent.prototype.configure = function () {
        this
            .searchParams = this.defaultParams;
        return this;
    };
    NgSearchboxComponent.prototype.register = function () {
        this
            .onRegisterApi
            .emit(this.Api);
        return this;
    };
    NgSearchboxComponent.prototype.eraseQuery = function () {
        this.previousQuery = null;
        this.query = '';
        this
            .queryChange(this.query);
    };
    NgSearchboxComponent.prototype.handleSearch = function () {
        this
            .Event
            .onChange(this
            .searchParams);
    };
    NgSearchboxComponent.prototype.handleEraser = function () {
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
    NgSearchboxComponent.prototype.handleGarbage = function () {
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
        core_1.ViewChild('ngSearchboxAddedFiltersWrapper'), 
        __metadata('design:type', ng_searchbox_added_filters_wrapper_component_1.NgSearchboxAddedFiltersWrapper)
    ], NgSearchboxComponent.prototype, "ngSearchboxAddedFiltersWrapper");
    __decorate([
        core_1.Input('searchParams'), 
        __metadata('design:type', Object)
    ], NgSearchboxComponent.prototype, "searchParams");
    __decorate([
        core_1.Input('ngSearchBoxFiltering'), 
        __metadata('design:type', Array)
    ], NgSearchboxComponent.prototype, "ngSearchBoxFiltering");
    __decorate([
        core_1.Input('ngSearchBoxConfig'), 
        __metadata('design:type', Object)
    ], NgSearchboxComponent.prototype, "ngSearchBoxConfig");
    __decorate([
        core_1.Input('ngSearchBoxAutoComplete'), 
        __metadata('design:type', Object)
    ], NgSearchboxComponent.prototype, "ngSearchBoxAutoComplete");
    __decorate([
        core_1.Input('ngSearchBoxCacheFilter'), 
        __metadata('design:type', Boolean)
    ], NgSearchboxComponent.prototype, "ngSearchBoxCacheFilter");
    __decorate([
        core_1.Input('ngSearchBoxEnableFilteringOperators'), 
        __metadata('design:type', Object)
    ], NgSearchboxComponent.prototype, "ngSearchBoxEnableFilteringOperators");
    __decorate([
        core_1.Input('ngSearchBoxFilterSelectors'), 
        __metadata('design:type', Object)
    ], NgSearchboxComponent.prototype, "ngSearchBoxFilterSelectors");
    __decorate([
        core_1.Input('ngSearchBoxFilterOperators'), 
        __metadata('design:type', Object)
    ], NgSearchboxComponent.prototype, "ngSearchBoxFilterOperators");
    __decorate([
        core_1.Input('placeholder'), 
        __metadata('design:type', String)
    ], NgSearchboxComponent.prototype, "placeholder");
    __decorate([
        core_1.Output('onRegisterApi'), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgSearchboxComponent.prototype, "onRegisterApi");
    NgSearchboxComponent = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox',
            'template': ng_templates_1.NgSearchboxTemplate,
            'styles': ng_styles_1.NgSearchboxStyle,
            'providers': [
                memory_service_1.MemoryService,
                utils_service_1.UtilsService
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, memory_service_1.MemoryService, core_1.ChangeDetectorRef, utils_service_1.UtilsService, Window])
    ], NgSearchboxComponent);
    return NgSearchboxComponent;
}());
exports.NgSearchboxComponent = NgSearchboxComponent;
