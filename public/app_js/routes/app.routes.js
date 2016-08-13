"use strict";

var router_1 = require('@angular/router');
var app_load_component_1 = require('../components/app-load.component');
var sing_in_component_1 = require('../components/sing-in.component');
var chat_component_1 = require('../components/chat.component');
var routes = [{
    path: '', component: app_load_component_1.AppLoadComponent
}, {
    path: 'sing-in', component: sing_in_component_1.SingInComponent
}, {
    path: 'chat', component: chat_component_1.ChatComponent
}];
exports.appRouterProviders = router_1.provideRouter(routes);