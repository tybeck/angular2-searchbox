'use strict';
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app.module');
var bootstrapper;
var Bootstrapper = (function () {
    function Bootstrapper() {
        if (!bootstrapper) {
            bootstrapper = this;
        }
        else {
            return bootstrapper;
        }
        return this;
    }
    Bootstrapper.prototype.compile = function () {
        platform_browser_dynamic_1.platformBrowserDynamic()
            .bootstrapModule(app_module_1.AppModule);
        return this;
    };
    return Bootstrapper;
}());
exports.Bootstrapper = Bootstrapper;
