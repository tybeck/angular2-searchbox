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
var api_service_1 = require('./api.service');
var EventHandling = (function () {
    function EventHandling(api) {
        this.api = api;
        return this;
    }
    EventHandling.prototype.init = function () {
        this
            .emitter = new core_1.EventEmitter();
        return this;
    };
    EventHandling.prototype.fire = function (type, data) {
        var ev = {
            '$$lastChange': new Date().getTime()
        };
        type = type.toLowerCase();
        this
            .api
            .$$registeredEvents
            .forEach(function (event) {
            if (event && event.type) {
                event.type = event
                    .type
                    .toLowerCase();
                if (event.type === type &&
                    typeof event.fn === 'function') {
                    event.fn(ev, data);
                }
            }
        });
        return this;
    };
    EventHandling.prototype.onChange = function (parameters) {
        this.fire('onChange', parameters);
        return this;
    };
    EventHandling.prototype.onQueryAdded = function (n, o) {
        if (o === null || typeof o === 'undefined' ||
            (typeof o !== 'undefined' && !o.length)) {
            if (n && n.length) {
                this.fire('onQueryAdded', n);
            }
        }
        return this;
    };
    EventHandling.prototype.onQueryRemoved = function (n, o) {
        if (o === null || typeof o !== 'undefined' && o && o.length) {
            if (!n || (typeof n === 'string' && !n.length)) {
                this.fire('onQueryRemoved', n);
            }
        }
        return this;
    };
    EventHandling.prototype.onEraser = function () {
        this
            .fire('onEraser');
        return this;
    };
    EventHandling.prototype.onGarbage = function () {
        this
            .fire('onGarbage');
        return this;
    };
    EventHandling.prototype.onFilterChanged = function (filter) {
        this
            .fire('onFilterChanged', filter);
        return this;
    };
    EventHandling.prototype.onFilterSelectorChanged = function (selector, filter) {
        var opts = {
            'selector': selector,
            'filter': filter
        };
        this.fire('onFilterSelectorChanged', opts);
        return this;
    };
    EventHandling = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.API])
    ], EventHandling);
    return EventHandling;
}());
exports.EventHandling = EventHandling;
