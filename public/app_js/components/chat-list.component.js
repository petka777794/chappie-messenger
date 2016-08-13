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
var user_data_service_1 = require('../services/user-data.service');
var user_authenticate_service_1 = require('../services/user-authenticate.service');
var router_1 = require('@angular/router');
var userlist_filter_pipe_1 = require('../pipes/userlist-filter.pipe');
var ChatListComponent = function () {
    function ChatListComponent(userDataService, userAuthenticateService, router) {
        _classCallCheck(this, ChatListComponent);

        this.userDataService = userDataService;
        this.userAuthenticateService = userAuthenticateService;
        this.router = router;
        this.searchInputQuery = '';
        this.onChangeCurrentOpponent = new core_1.EventEmitter();
        this.onLogOut = new core_1.EventEmitter();
    }

    _createClass(ChatListComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            this.getUserList();
            this.includeFrontendPlugins();
        }
    }, {
        key: "getUserList",
        value: function getUserList() {
            var self = this;
            this.userDataService.getUserList().subscribe(function (result) {
                self.userlist = result;
            });
        }
    }, {
        key: "logOut",
        value: function logOut() {
            var self = this;
            this.onLogOut.emit({ disconnected: true });
            this.userAuthenticateService.logout().subscribe(function (results) {
                if (!results) {
                    self.router.navigate(['/sing-in']);
                }
            });
        }
    }, {
        key: "changeCurrentOpponent",
        value: function changeCurrentOpponent(data) {
            this.userDataService.changeCurrentOpponent(data);
            this.onChangeCurrentOpponent.emit(data);
            this.closeMenu();
        }
    }, {
        key: "closeMenu",
        value: function closeMenu() {
            document.querySelector('.menu__wrap').classList.remove('visable');
            setTimeout(function () {
                document.querySelector('.main__menu').classList.remove('main__menu--open');
            }, 300);
        }
    }, {
        key: "includeFrontendPlugins",
        value: function includeFrontendPlugins() {
            $('.menu__users.custom-scroll').niceScroll({
                cursorcolor: '#fefefe',
                hidecursordelay: 200,
                cursorwidth: 3,
                cursorborderradius: 0
            });
        }
    }]);

    return ChatListComponent;
}();
__decorate([core_1.Output(), __metadata('design:type', Object)], ChatListComponent.prototype, "onChangeCurrentOpponent", void 0);
__decorate([core_1.Output(), __metadata('design:type', Object)], ChatListComponent.prototype, "onLogOut", void 0);
ChatListComponent = __decorate([core_1.Component({
    selector: 'chat-list',
    templateUrl: './templates/chat-list.html',
    pipes: [userlist_filter_pipe_1.UserlistFilterPipe]
}), __metadata('design:paramtypes', [user_data_service_1.UserDataService, user_authenticate_service_1.UserAuthenticateService, router_1.Router])], ChatListComponent);
exports.ChatListComponent = ChatListComponent;