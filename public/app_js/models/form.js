"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function Form() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var password = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    _classCallCheck(this, Form);

    this.name = {
        value: name,
        valid: true,
        isValid: function isValid() {
            if (this.value.length > 2) {
                return true;
            } else {
                return false;
            }
        }
    };
    this.password = {
        value: password,
        valid: true,
        isValid: function isValid() {
            if (this.value.length > 2) {
                return true;
            } else {
                return false;
            }
        }
    };
};

exports.Form = Form;