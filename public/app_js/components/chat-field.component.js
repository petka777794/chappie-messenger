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
var user_data_service_1 = require('../services/user-data.service');
var messages_filter_pipe_1 = require('../pipes/messages-filter.pipe');
var router_1 = require('@angular/router');
var ChatFieldComponent = function () {
    function ChatFieldComponent(router, userDataService) {
        var _this = this;

        _classCallCheck(this, ChatFieldComponent);

        this.router = router;
        this.userDataService = userDataService;
        var self = this;
        this.connected = false;
        this.messageInputQuery = '';
        this.socket = io.connect();
        this.socket.on('connect', function () {
            return _this.joinDialog();
        });
        this.socket.on('joined to dialog', function (data) {
            return _this.getDialog(data);
        });
        this.socket.on('message', function (data) {
            return _this.getMessage(data);
        });
        this.socket.on('disconnect dialog', function () {
            return _this.router.navigate(['/sing-in']);
        });
    }

    _createClass(ChatFieldComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            this.includeFrontendPlugins();
        }
    }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
            if (changes['currentOpponent'] && this.connected) {
                if (changes['currentOpponent'].currentValue) {
                    this.joinDialog();
                }
            }
            if (changes['disconnection']) {
                if (changes['disconnection'].currentValue) {
                    this.disconnectDialog();
                }
            }
        }
    }, {
        key: "openMenu",
        value: function openMenu($event) {
            document.querySelector('.main__menu').classList.add('main__menu--open');
            setTimeout(function () {
                document.querySelector('.menu__wrap').classList.add('visable');
                document.querySelector('.chat__search').focus();
            }, 300);
        }
    }, {
        key: "includeFrontendPlugins",
        value: function includeFrontendPlugins() {
            $('.chat__history--wrap.custom-scroll').niceScroll({
                cursorcolor: '#fefefe',
                horizrailenabled: false,
                hidecursordelay: 200,
                railoffset: {
                    left: +-4
                },
                cursorwidth: 3,
                cursorborderradius: 0
            });
            $('#chat__textarea').niceScroll({
                cursorcolor: '#db504a'
            });
            autosize($('#chat__textarea'));
        }
    }, {
        key: "joinDialog",
        value: function joinDialog() {
            this.socket.emit('join dialog', this.userDataService.currentOpponent._id);
            this.connected = true;
        }
    }, {
        key: "disconnectDialog",
        value: function disconnectDialog() {
            this.socket.emit('disconnect dialog');
            this.connected = false;
        }
    }, {
        key: "getDialog",
        value: function getDialog(data) {
            var self = this;
            this.dialog = data;
            setTimeout(function () {
                self.scrollBottom();
            }, 1000);
        }
    }, {
        key: "sendMessage",
        value: function sendMessage($event) {
            $event.preventDefault();
            if (this.messageInputQuery !== '') {
                this.socket.emit('message', this.messageInputQuery);
            }
            this.messageInputQuery = '';
            $('#chat__textarea').css('height', '33px');
        }
    }, {
        key: "getMessage",
        value: function getMessage(data) {
            this.dialog.push(data);
            $('.chat__history--wrap.custom-scroll').getNiceScroll().resize();
            this.scrollBottom();
        }
    }, {
        key: "addMessageClass",
        value: function addMessageClass(phrase) {
            if (this.userDataService.currentOpponent._id == phrase.userId) {
                return { textClass: 'messadge--get', iconClass: 'fa-user-secret' };
            } else {
                return { textClass: 'messadge--send', iconClass: 'fa-user' };
            }
        }
    }, {
        key: "scrollBottom",
        value: function scrollBottom() {
            $('.chat__history--wrap.custom-scroll').animate({
                scrollTop: $('.chat__history').height()
            }, 1000);
        }
    }]);

    return ChatFieldComponent;
}();
__decorate([core_1.Input(), __metadata('design:type', Object)], ChatFieldComponent.prototype, "currentOpponent", void 0);
__decorate([core_1.Input(), __metadata('design:type', Object)], ChatFieldComponent.prototype, "disconnection", void 0);
ChatFieldComponent = __decorate([core_1.Component({
    selector: 'chat-field',
    templateUrl: './templates/chat-field.html',
    pipes: [messages_filter_pipe_1.MessagesFilterPipe],
    animations: [core_2.trigger('fadeIn', [core_2.state('in', core_2.style({ transform: 'translateY(0)', opacity: 1 })), core_2.transition('void => *', [core_2.style({ transform: 'translateY(10px)', opacity: 0 }), core_2.animate('250ms linear')]), core_2.transition('* => void', [core_2.animate('10ms linear', core_2.style({ opacity: 0 }))])])]
}), __metadata('design:paramtypes', [router_1.Router, user_data_service_1.UserDataService])], ChatFieldComponent);
exports.ChatFieldComponent = ChatFieldComponent;