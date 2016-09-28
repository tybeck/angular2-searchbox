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
var MemoryService = (function () {
    function MemoryService(window) {
        this.window = window;
        this.hash = 'ng2-searchbox';
        this.storage = null;
        this.storage = window.localStorage;
        return this;
    }
    MemoryService.prototype.getAndSet = function (key, value) {
        if (!this
            .storage
            .getItem(this.hash)) {
            this
                .storage
                .setItem(this.hash, '{}');
        }
        var store = this
            .storage
            .getItem(this.hash);
        if (store) {
            store = JSON.parse(store);
            if (typeof value === 'undefined') {
                return store[key];
            }
            else {
                store[key] = value;
                this
                    .storage
                    .setItem(this.hash, JSON.stringify(store));
            }
        }
    };
    MemoryService.prototype.getAll = function () {
        var data = JSON.parse(this
            .storage
            .getItem(this.hash));
        if (data) {
            delete data.cache;
            return data;
        }
        return {};
    };
    MemoryService.prototype.removeAll = function () {
        var cache = this.getAndSet('cache'), obj = {};
        if (cache !== null) {
            obj.cache = cache;
        }
        this
            .storage
            .setItem(this.hash, JSON.stringify(obj));
    };
    MemoryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Window])
    ], MemoryService);
    return MemoryService;
}());
exports.MemoryService = MemoryService;
