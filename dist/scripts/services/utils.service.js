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
var UtilsService = (function () {
    function UtilsService() {
    }
    UtilsService.prototype.uuid = function () {
        var d = Date.now();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
            var r = (d + Math.round(Math.random() * 16)) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8))
                .toString(16);
        });
    };
    UtilsService.prototype.isJson = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    UtilsService.prototype.removeObjectProperties = function (obj, props) {
        for (var i = 0; i < props.length; i++) {
            if (obj.hasOwnProperty(props[i])) {
                delete obj[props[i]];
            }
        }
    };
    UtilsService.prototype.getScrollbarWidth = function () {
        var scrollDiv = document.createElement('div');
        scrollDiv
            .classList
            .add('scrollbar-measure');
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = (scrollDiv.offsetWidth - scrollDiv.clientWidth);
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    };
    UtilsService.prototype.isURL = function (url) {
        var expression = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|' +
            '2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u' +
            '00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a' +
            '-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', regex = new RegExp(expression, 'i');
        return regex.test(url);
    };
    UtilsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UtilsService);
    return UtilsService;
}());
exports.UtilsService = UtilsService;
