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
var user_authenticate_service_1 = require('../services/user-authenticate.service');
var user_data_service_1 = require('../services/user-data.service');
var router_1 = require('@angular/router');
var chat_field_component_1 = require('./chat-field.component');
var chat_list_component_1 = require('./chat-list.component');
var ChatComponent = function () {
    function ChatComponent(userAuthenticateService, router, userDataService) {
        _classCallCheck(this, ChatComponent);

        this.userAuthenticateService = userAuthenticateService;
        this.router = router;
        this.userDataService = userDataService;
        this.currentOpponent = this.userDataService.currentOpponent;
        this.disconnection = false;
    }

    _createClass(ChatComponent, [{
        key: "onChangeCurrentOpponent",
        value: function onChangeCurrentOpponent(event) {
            this.currentOpponent = this.userDataService.currentOpponent;
        }
    }, {
        key: "onLogOut",
        value: function onLogOut(event) {
            this.disconnection = true;
        }
    }, {
        key: "ngOnInit",
        value: function ngOnInit() {
            this.isLoggedIn();
        }
    }, {
        key: "isLoggedIn",
        value: function isLoggedIn() {
            if (!this.userAuthenticateService.isLoggedInWithoutRequest()) {
                this.router.navigate(['/sing-in']);
            }
        }
    }]);

    return ChatComponent;
}();
ChatComponent = __decorate([core_1.Component({
    selector: 'chat',
    templateUrl: './templates/chat.html',
    providers: [user_data_service_1.UserDataService],
    directives: [chat_field_component_1.ChatFieldComponent, chat_list_component_1.ChatListComponent],
    animations: [core_2.trigger('fadeIn', [core_2.state('in', core_2.style({ transform: 'translateY(0)', opacity: 1 })), core_2.transition('void => *', [core_2.style({ transform: 'translateY(10px)', opacity: 0 }), core_2.animate('250ms linear')]), core_2.transition('* => void', [core_2.animate('250ms linear', core_2.style({ opacity: 1 }))])])]
}), __metadata('design:paramtypes', [user_authenticate_service_1.UserAuthenticateService, router_1.Router, user_data_service_1.UserDataService])], ChatComponent);
exports.ChatComponent = ChatComponent;