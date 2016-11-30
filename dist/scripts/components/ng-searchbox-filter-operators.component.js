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
var ng_templates_1 = require('../ng.templates');
var ng_styles_1 = require('../ng.styles');
var ng_searchbox_added_filter_component_1 = require('./ng-searchbox-added-filter.component');
var search_1 = require('../definitions/search');
var NgSearchboxFilterOperators = (function () {
    function NgSearchboxFilterOperators(ngAddedFilter, window, element) {
        this.ngAddedFilter = ngAddedFilter;
        this.window = window;
        this.element = element;
        this.filter = null;
        this.operators = _.clone(search_1.OPERATORS);
        this.selectedOperator = null;
        this.Filtering = null;
        this.showOperators = false;
        this.hasOperator = false;
        this.Filtering = this
            .ngAddedFilter
            .Filtering;
        if (this.Filtering.getFilterCount() > 1) {
            this.hasOperator = true;
        }
        return this;
    }
    NgSearchboxFilterOperators.prototype.toggleOperators = function (show) {
        var _this = this;
        var self = this;
        if (typeof show === 'boolean') {
            self.showOperators = show;
        }
        else {
            self.showOperators = !self.showOperators;
        }
        if (self.showOperators) {
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
        }
        else {
            self
                .window
                .removeEventListener('click', this.proxiedFunction);
        }
    };
    NgSearchboxFilterOperators.prototype.windowClicked = function (event) {
        var target = event.target, element = this
            .element
            .nativeElement;
        if (!element.contains(target)) {
            this
                .toggleOperators(false);
        }
    };
    NgSearchboxFilterOperators.prototype.takeOperator = function (operator) {
        var self = this;
        _.each(self.operators, function (op) {
            op.selected = false;
        });
        self
            .filter
            .operator = operator;
        self
            .Filtering
            .addOperatorToFilter(operator, self.filter, true);
        self
            .ngAddedFilter
            .Event
            .onOperatorChanged(operator, self.filter);
        operator.selected = true;
        this
            .toggleOperators(false);
    };
    NgSearchboxFilterOperators.prototype.getDefaultOperator = function () {
        var operatorByFilter = null, self = this;
        if (operatorByFilter === null) {
            if (!this.filter.operator) {
                _.each(self.operators, function (operator) {
                    if (operator.selected) {
                        self.selectedOperator = operator;
                    }
                });
                if (!self.filter.operator
                    && self.operators && self.operators.length) {
                    var operator = self.operators[0];
                    operator.selected = true;
                    self.selectedOperator = operator;
                }
            }
        }
        setTimeout(function () {
            self
                .filter
                .operator = self.selectedOperator;
        }, 0);
        return this;
    };
    NgSearchboxFilterOperators.prototype.addOperatorToFilter = function () {
        var self = this;
        if (!self
            .Filtering
            .hasOperatorAlready(self.filter)) {
            this
                .Filtering
                .addOperatorToFilter(self.selectedOperator, self.filter);
        }
        return this;
    };
    NgSearchboxFilterOperators.prototype.ngAfterViewInit = function () {
        if (this.hasOperator) {
            this
                .Filtering
                .setOperator(this.filter, this);
            this
                .getDefaultOperator()
                .addOperatorToFilter();
        }
    };
    __decorate([
        core_1.Input('filter'), 
        __metadata('design:type', Object)
    ], NgSearchboxFilterOperators.prototype, "filter");
    NgSearchboxFilterOperators = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-filter-operators',
            'template': ng_templates_1.NgSearchboxFilterOperatorsTemplate,
            'styles': ng_styles_1.NgSearchboxFilterOperatorsStyle
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter; }))),
        __param(1, core_1.Inject(Window)), 
        __metadata('design:paramtypes', [ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter, Window, core_1.ElementRef])
    ], NgSearchboxFilterOperators);
    return NgSearchboxFilterOperators;
}());
exports.NgSearchboxFilterOperators = NgSearchboxFilterOperators;
