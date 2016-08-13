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
var core_2 = require('@angular/core');
var form_1 = require('../models/form');
var router_1 = require('@angular/router');
var user_authenticate_service_1 = require('../services/user-authenticate.service');
var SingInComponent = function () {
    function SingInComponent(userAuthenticateService, router) {
        _classCallCheck(this, SingInComponent);

        this.userAuthenticateService = userAuthenticateService;
        this.router = router;
        this.form = new form_1.Form();
    }

    _createClass(SingInComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
    }, {
        key: "testLogin",
        value: function testLogin() {
            var self = this;
            this.userAuthenticateService.testLogin().subscribe(function (result) {
                if (result.authenticated) {
                    self.router.navigate(['/chat']);
                } else {
                    console.log(result.authError);
                }
            });
        }
    }, {
        key: "logInByOwn",
        value: function logInByOwn() {
            this.loginWithOwn = true;
            this.openForm();
        }
    }, {
        key: "logInByNew",
        value: function logInByNew() {
            this.loginWithOwn = false;
            this.openForm();
        }
    }, {
        key: "onSubmit",
        value: function onSubmit() {
            var self = this;
            var username = this.form.name.value;
            var password = this.form.password.value;
            if (this.form.name.isValid() && this.form.password.isValid()) {
                if (this.loginWithOwn) {
                    this.userAuthenticateService.login(username, password).subscribe(function (result) {
                        self.onSubmitResult(result, self);
                    });
                } else {
                    this.userAuthenticateService.createAccount(username, password).subscribe(function (result) {
                        self.onSubmitResult(result, self);
                    });
                }
            } else {
                $('.input__wrap--username').addClass('error');
                $('.input__wrap--password').addClass('error');
            }
        }
    }, {
        key: "onSubmitResult",
        value: function onSubmitResult(result, self) {
            if (result.authenticated) {
                self.router.navigate(['/chat']);
            } else {
                if (result.authError == 'username') {
                    $('.input__wrap--username').addClass('error');
                }
                if (result.authError == 'password') {
                    $('.input__wrap--password').addClass('error');
                }
            }
        }
    }, {
        key: "openForm",
        value: function openForm() {
            $('.login__item').addClass('login__item--hided');
            $('.form__wrap').addClass('form__wrap--show');
            $('.login__title').text('Enter your data:');
        }
    }, {
        key: "closeForm",
        value: function closeForm() {
            this.form.name.value = '';
            this.form.password.value = '';
            $('.input__wrap').removeClass('error');
            $('.form__wrap').removeClass('form__wrap--show');
            $('.login__item').removeClass('login__item--hided');
            $('.login__title').text('How do you want to login?');
        }
    }, {
        key: "removeErrorClass",
        value: function removeErrorClass() {
            $('.input__wrap').removeClass('error');
        }
    }, {
        key: "setFocusOnPassword",
        value: function setFocusOnPassword() {
            $('.input__wrap--password input').focus();
        }
    }]);

    return SingInComponent;
}();
SingInComponent = __decorate([core_1.Component({
    selector: 'sing-in',
    templateUrl: './templates/sing-in.html',
    directives: [],
    host: { 'class': 'ng-sing-in' },
    animations: [core_2.trigger('fadeIn', [core_2.state('in', core_2.style({ transform: 'translateY(0)', opacity: 1 })), core_2.transition('void => *', [core_2.style({ transform: 'translateY(10px)', opacity: 0 }), core_2.animate('250ms linear')]), core_2.transition('* => void', [core_2.animate('250ms linear', core_2.style({ opacity: 1 }))])])]
}), __metadata('design:paramtypes', [user_authenticate_service_1.UserAuthenticateService, router_1.Router])], SingInComponent);
exports.SingInComponent = SingInComponent;