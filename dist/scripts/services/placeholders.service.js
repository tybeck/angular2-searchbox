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
var ng_advanced_searchbox_component_1 = require('../components/ng-advanced-searchbox.component');
var PlaceholdersService = (function () {
    function PlaceholdersService(searchbox) {
        this.searchbox = searchbox;
        this.index = 0;
        this.position = 0;
        this.val = '';
        this.timer = null;
        this.config = null;
        this
            .setup();
        return this;
    }
    PlaceholdersService.prototype.setup = function () {
        var config = this
            .searchbox
            .ngSearchBoxConfig;
        this.config = config;
        if (this.config && this.config.placeholders) {
            this
                .start(this.index);
        }
        return this;
    };
    PlaceholdersService.prototype.start = function (index) {
        if (typeof index !== 'undefined') {
            this.index = index;
        }
        else {
            if (typeof this.index !== 'undefined') {
                this.index = 0;
            }
            else {
                this.index++;
            }
        }
        this.position = 0;
        this.val = '';
        this
            .change();
    };
    PlaceholdersService.prototype.change = function (reverse) {
        var self = this;
        if (reverse) {
            self.timer = setTimeout(function () {
                self.val = self.val.slice(0, self.val.length - 1);
                self
                    .searchbox
                    .placeholder = self.val;
                if (self.val.length) {
                    self.change(true);
                }
                else {
                    self.position = 0;
                    self.index++;
                    if (self.index > (self.config.placeholders.length - 1)) {
                        self.index = 0;
                    }
                    self.change();
                }
            }, self
                .config
                .placeholderSpeedOutInterval || 25);
        }
        else {
            self.timer = setTimeout(function () {
                var val = self.config.placeholders[self.index], len = val.length;
                self.val += val[self.position];
                self
                    .searchbox
                    .placeholder = self.val;
                self.position++;
                if (self.position < len) {
                    self.change();
                }
                else {
                    self.timer = setTimeout(function () {
                        self.change(true);
                    }, self.config.placeholderInterval || 2000);
                }
            }, self.config.placeholderSpeedInInterval || 75);
        }
    };
    PlaceholdersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng_advanced_searchbox_component_1.NgAdvancedSearchboxComponent])
    ], PlaceholdersService);
    return PlaceholdersService;
}());
exports.PlaceholdersService = PlaceholdersService;
