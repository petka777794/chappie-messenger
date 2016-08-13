"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var app_load_component_1 = require('./app-load.component');
var sing_in_component_1 = require('./sing-in.component');
var chat_component_1 = require('./chat.component');
var user_authenticate_service_1 = require('../services/user-authenticate.service');
var AppComponent = function () {
    function AppComponent(UserAuthenticateService, router) {
        _classCallCheck(this, AppComponent);

        this.UserAuthenticateService = UserAuthenticateService;
        this.router = router;
    }

    _createClass(AppComponent, [{
        key: "isLoggedIn",
        value: function isLoggedIn(res) {
            var self = this;
            res.subscribe(function (result) {
                var haveASession = result;
                if (!haveASession) {
                    self.router.navigate(['/sing-in']);
                } else {
                    self.router.navigate(['/chat']);
                }
            });
        }
    }, {
        key: "ngOnInit",
        value: function ngOnInit() {
            this.isLoggedIn(this.UserAuthenticateService.isLoggedIn());
        }
    }]);

    return AppComponent;
}();
AppComponent = __decorate([core_1.Component({
    selector: 'ng-app',
    template: "\n\t\t<router-outlet></router-outlet>\n\t",
    directives: [chat_component_1.ChatComponent, sing_in_component_1.SingInComponent, router_1.ROUTER_DIRECTIVES],
    providers: [user_authenticate_service_1.UserAuthenticateService],
    precompile: [app_load_component_1.AppLoadComponent, chat_component_1.ChatComponent, sing_in_component_1.SingInComponent]
}), __metadata('design:paramtypes', [user_authenticate_service_1.UserAuthenticateService, router_1.Router])], AppComponent);
exports.AppComponent = AppComponent;