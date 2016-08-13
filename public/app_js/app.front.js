"use strict";

var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_routes_1 = require('./routes/app.routes');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./components/app.component');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [app_routes_1.appRouterProviders, forms_1.disableDeprecatedForms(), forms_1.provideForms(), http_1.HTTP_PROVIDERS]).catch(function (err) {
    return console.error(err);
});