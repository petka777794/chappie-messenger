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
var http_1 = require('@angular/http');
var user_1 = require('../models/user');
var UserDataService = function () {
    function UserDataService(http) {
        _classCallCheck(this, UserDataService);

        this.http = http;
        this.currentOpponent = new user_1.User('Your Chappie', '57af17ae2e31491c1f1b42e2');
    }

    _createClass(UserDataService, [{
        key: "getCurrentUser",
        value: function getCurrentUser() {
            var self = this;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            return this.http.post('chat/user', JSON.stringify({ question: 'May I get current user?' }), { headers: headers }).map(function (res) {
                self.currentUser = new user_1.User(res.json()._id, res.json().username);
                return self.currentUser;
            });
        }
    }, {
        key: "getUserList",
        value: function getUserList() {
            var self = this;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            return this.http.post('chat/userlist', JSON.stringify({ question: 'May I get userlist?' }), { headers: headers }).map(function (res) {
                return res.json();
            });
        }
    }, {
        key: "changeCurrentOpponent",
        value: function changeCurrentOpponent(user) {
            this.currentOpponent = user;
        }
    }]);

    return UserDataService;
}();
UserDataService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.Http])], UserDataService);
exports.UserDataService = UserDataService;