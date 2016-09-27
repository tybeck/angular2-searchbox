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
var helpers = require('../utils/api.utils.');
var API = (function () {
    function API() {
        this.$$registeredEvents = [];
        this.$$allowedEvents = [
            'onChange',
            'onQueryAdded',
            'onQueryRemoved',
            'onQueryChanged',
            'onFilterAdded',
            'onFilterRemoved',
            'onFilterChanged',
            'onOperatorChanged',
            'onFilterSelectorChanged',
            'onEraser',
            'onGarbage',
            'onEnteredEditMode',
            'onLeavedEditMode'
        ];
        return this;
    }
    API.prototype.on = function (type, fn) {
        var self = this, isRegisteredAlready = false;
        helpers
            .hasEventErrors(type, fn)
            .hasInvalidEventType(type, this.$$allowedEvents);
        this
            .$$registeredEvents
            .forEach(function (event) {
            if (event && event.fn === fn &&
                event.type === type) {
                isRegisteredAlready = true;
            }
        });
        if (!isRegisteredAlready) {
            self.$$registeredEvents.push({
                'type': type,
                'fn': fn
            });
        }
        return this;
    };
    API.prototype.off = function (type, fn) {
        var self = this, isFnEmpty = false;
        helpers
            .hasEventErrors(type, fn, true)
            .hasInvalidEventType(type, self.$$allowedEvents);
        if (typeof fn !== 'function') {
            isFnEmpty = true;
        }
        self
            .$$registeredEvents
            .slice()
            .reverse()
            .forEach(function (addedEvent, addedIndex, addedObject) {
            if ((addedEvent && addedEvent.fn === fn && addedEvent.type === type) ||
                (isFnEmpty && addedEvent && addedEvent.type === type)) {
                self.$$registeredEvents
                    .splice(addedObject.length - 1 - addedIndex, 1);
            }
        });
        return this;
    };
    API.prototype.offAll = function () {
        var self = this;
        self
            .$$registeredEvents
            .slice()
            .reverse()
            .forEach(function (addedEvent, addedIndex, addedObject) {
            self.$$registeredEvents
                .splice(addedObject.length - 1 - addedIndex, 1);
        });
        return this;
    };
    API = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], API);
    return API;
}());
exports.API = API;
