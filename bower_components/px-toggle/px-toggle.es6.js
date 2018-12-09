(function(){"use strict";Polymer({is:"px-toggle",behaviors:[Polymer.IronCheckedElementBehavior],properties:{size:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}},listeners:{tap:"_onCheckTap"},attached:function attached(){this.setAttribute("role","switch")},_checkDisabledState:function _checkDisabledState(disabled){this.setAttribute("aria-disabled",disabled);return"".concat(disabled?"toggle--disabled":"")},_checkLabelSize:function _checkLabelSize(size){return"toggle__label--".concat(size)},_checkInputSize:function _checkInputSize(size){return"toggle__input--".concat(size)},_onCheckTap:function _onCheckTap(evt){if(!this.disabled){this.debounce("checkChanged",function(){this.checked=!this.checked;this.fire("px-toggle-checked-changed",this.checked)},50)}}})})();