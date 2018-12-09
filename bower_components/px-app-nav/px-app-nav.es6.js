(function(){"use strict";Polymer({is:"px-app-nav",behaviors:[Polymer.IronResizableBehavior,PxAppNavBehavior.MeasureText,PxAppBehavior.AssetGraph,PxAppBehavior.AssetSelectable],properties:{collapseAll:{type:Boolean,value:!1,observer:"_handleCollapseAllChanged",notify:!0},collapseAt:{type:Number,observer:"rebuild"},collapseWithIcon:{type:Boolean,value:!1},collapseOpened:{type:Boolean,value:!1,notify:!0},vertical:{type:Boolean,value:!1,reflectToAttribute:!0},verticalOpened:{type:Boolean,value:!1,notify:!0,readOnly:!0,reflectToAttribute:!0},visibleItems:{type:Array,notify:!0,readOnly:!0},overflowedItems:{type:Array,notify:!0,readOnly:!0},allCollapsed:{type:Boolean,value:!1,notify:!0,readOnly:!0,computed:"_computeAllCollapsed(overflowedItems,visibleItems)"},anyOverflowed:{type:Boolean,value:!1,notify:!0,readOnly:!0,computed:"_computeAnyOverflowed(overflowedItems,visibleItems)"},someOverflowed:{type:Boolean,value:!1,notify:!0,readOnly:!0,computed:"_computeSomeOverflowed(overflowedItems,visibleItems)"},fitInto:{type:HTMLElement},_availableWidth:{type:Number,observer:"rebuild"}},_statics:{ITEM_PADDING:"1rem",ITEM_ICON_WIDTH:"2rem",ITEM_ICON_PADDING:"0.33rem",OPEN_ICON_WIDTH:"1.33rem",OPEN_ICON_PADDING:"0.2rem"},observers:["_handleItemVisibilityChanged(visibleItems, overflowedItems, visibleItems.*, overflowedItems.*)"],listeners:{"iron-resize":"_handleResize","px-app-nav-item-tapped":"_itemSelectedByEvent",mouseenter:"_handleMouseEnter",mouseleave:"_handleMouseLeave","px-app-asset-graph-created":"rebuild","px-app-nav-rebuilt":"_handleRebuild"},_handleRebuild:function _handleRebuild(){if(!this.collapseAll&&!this.vertical&&this.anyOverflowed&&this.collapseOpened){if(!this._collapsedGroup){var group=Polymer.dom(this.root).querySelector("#overflowedGroup");if(!group)return;this._collapsedGroup=group}this._collapsedGroup.refitGroup()}},_handleMouseEnter:function _handleMouseEnter(){if(!this.vertical)return;this._mouseIsOverNav=!0;if(this.isDebouncerActive("close-nav-on-mouseleave")){this.cancelDebouncer("close-nav-on-mouseleave")}if(this._mouseIsOverNav&&!this.verticalOpened){this._setVerticalOpened(!0)}},_handleMouseLeave:function _handleMouseLeave(){if(!this.vertical)return;this._mouseIsOverNav=!1;this.debounce("close-nav-on-mouseleave",function(){if(!this._mouseIsOverNav&&this.verticalOpened){this._setVerticalOpened(!1)}},250)},_handleItemVisibilityChanged:function _handleItemVisibilityChanged(){this.debounce("item-visibility-changed",function(){var visibleEl=Polymer.dom(this.root).querySelector("#visible"),overflowedEl=Polymer.dom(this.root).querySelector("#overflowed");if(visibleEl)visibleEl.render();if(overflowedEl)overflowedEl.render()})},_handleCollapseAllChanged:function _handleCollapseAllChanged(collapseAll){if(collapseAll){this.rebuild()}if(!collapseAll){this._availableWidth=null;this._handleResize()}},_itemSelectedByEvent:function _itemSelectedByEvent(evt){if(evt.detail.item){this.select(evt.detail.item,"DOM_EVENT")}},_handleResize:function _handleResize(evt){if(this.collapseAll||this.vertical)return;var debouncer="measure-available-width";if("number"!==typeof this._availableWidth){this._measureAvailableWidth();return}if(this.isDebouncerActive(debouncer)){this.cancelDebouncer(debouncer)}this.debounce(debouncer,this._measureAvailableWidth.bind(this),100)},_measureAvailableWidth:function _measureAvailableWidth(){var _this=this;window.requestAnimationFrame(function(){var containerEl=_this.$.container,actionsEl=_this.$.actions;if(!containerEl||!actionsEl)return;var containerWidth=containerEl.getBoundingClientRect().width,actionsWidth=actionsEl.getBoundingClientRect().width,width=containerWidth-actionsWidth;if(_this._availableWidth!==width)_this.set("_availableWidth",width)})},rebuild:function rebuild(){if(!this.items||!Array.isArray(this.items)||!this.collapseAll&&!this.vertical&&"number"!==typeof this._availableWidth)return;if(this.vertical){this._setVisibleItems(this.items.slice(0));this._setOverflowedItems([]);return[this.visibleItems,this.overflowedItems]}if(this.collapseAll||0===this._availableWidth||"number"===typeof this.collapseAt&&this._availableWidth<=this.collapseAt){this._setVisibleItems([]);this._setOverflowedItems(this.items.slice(0));this.fire("px-app-nav-rebuilt");return[this.visibleItems,this.overflowedItems]}var measurements=this._measureItems(this.items),_this$_fitItems=this._fitItems(this.items,measurements,this._availableWidth),visible=_this$_fitItems.visible,overflowed=_this$_fitItems.overflowed;if(1===visible.length&&1<this.items.length){this._setVisibleItems([]);this._setOverflowedItems(this.items.slice(0));this.fire("px-app-nav-rebuilt");return[this.visibleItems,this.overflowedItems]}this._setVisibleItems(visible);this._setOverflowedItems(overflowed);this.notifyPath("visibleItems.*");this.notifyPath("overflowedItems.*");this.fire("px-app-nav-rebuilt");return[this.visibleItems,this.overflowedItems]},_fitItems:function _fitItems(items,measurements,width){var available=width;if(available<measurements[0]){return{visible:[],overflowed:items.slice(0)}}var i=0,len=items.length;while(i<len&&0<available){if(measurements[i]>available){break}available-=measurements[i];i++}var _this$_getItemStyles=this._getItemStyles(),itemPadding=_this$_getItemStyles.itemPadding,iconSize=_this$_getItemStyles.iconSize,overflowSize=2*itemPadding+iconSize;if(i!==len&&available<overflowSize){available-=overflowSize;while(0<i&&0>available){available+=measurements[i];i--}}return{visible:items.slice(0,i),overflowed:items.slice(i)}},_measureItems:function _measureItems(items){var boundMeasureFn=this._measureItem.bind(this);return items.map(boundMeasureFn)},_measureItem:function _measureItem(item){var _this$_getItemStyles2=this._getItemStyles(),fontFamily=_this$_getItemStyles2.fontFamily,fontSize=_this$_getItemStyles2.fontSize,itemPadding=_this$_getItemStyles2.itemPadding,iconSize=_this$_getItemStyles2.iconSize,iconPadding=_this$_getItemStyles2.iconPadding,openIconSize=_this$_getItemStyles2.openIconSize,openIconPadding=_this$_getItemStyles2.openIconPadding,textLength=this._measureText(item[this.keys.label],fontFamily,fontSize);if(!textLength)return;var totalLength=textLength;totalLength+=2*itemPadding;if(item[this.keys.icon]&&item[this.keys.icon].length)totalLength+=iconSize+iconPadding;if(item[this.keys.children]&&item[this.keys.children].length)totalLength+=openIconSize+openIconPadding;return totalLength},_getItemStyles:function _getItemStyles(){var _this2=this;if(!this._fontStyleCache){var _window$getComputedSt=window.getComputedStyle(this),fontSize=_window$getComputedSt.fontSize,fontFamily=_window$getComputedSt.fontFamily,rem=function rem(val){return _this2._remToPx(parseFloat(val))},parse=function parse(cssVar,fallbackRem){return _this2._parseSizeStyleVar(cssVar,rem(fallbackRem),parseInt(fontSize))},itemPadding=parse("--px-app-nav-item-padding",this._statics.ITEM_PADDING),iconSize=parse("--px-app-nav-item-icon-size",this._statics.ITEM_ICON_WIDTH),iconPadding=rem(this._statics.ITEM_ICON_PADDING),openIconSize=rem(this._statics.OPEN_ICON_WIDTH),openIconPadding=rem(this._statics.OPEN_ICON_PADDING);this._fontStyleCache={fontSize:fontSize,fontFamily:fontFamily,itemPadding:itemPadding,iconSize:iconSize,iconPadding:iconPadding,openIconSize:openIconSize,openIconPadding:openIconPadding}}return this._fontStyleCache},_parseSizeStyleVar:function _parseSizeStyleVar(cssVar,fallback,emBase){var val=this.getComputedStyleValue(cssVar);if("string"===typeof val&&"px"===val.slice(-2)){return parseInt(val)}if("string"===typeof val&&"em"===val.slice(-2)){return emBase*parseFloat(val)}if("string"===typeof val&&"rem"===val.slice(-2)){return this._remToPx(parseFloat(val))}return fallback},_remToPx:function _remToPx(rem){var remBase=this._documentRemBaseCache=this._documentRemBaseCache||parseInt(window.getComputedStyle(document.documentElement).fontSize);return Math.round(rem*remBase)},_getDropdownLabel:function _getDropdownLabel(selectedItem,selectedItemParent,labelKey,collapseWithIcon,allCollapsed){if(allCollapsed&&selectedItemParent&&"object"===babelHelpers.typeof(selectedItemParent)&&!collapseWithIcon){return selectedItemParent[labelKey]}if(allCollapsed&&selectedItem&&"object"===babelHelpers.typeof(selectedItem)&&!collapseWithIcon){return selectedItem[labelKey]}return null},_getDropdownIcon:function _getDropdownIcon(selectedItem,selectedItemParent,iconKey,collapseWithIcon,allCollapsed,anyOverflowed,collapseOpened){if(anyOverflowed&&!allCollapsed){return"px-utl:overflow"}if(allCollapsed&&collapseWithIcon&&!collapseOpened){return"px-nav:hamburger"}if(allCollapsed&&collapseWithIcon&&collapseOpened){return"px-nav:close"}if(allCollapsed&&selectedItemParent&&"object"===babelHelpers.typeof(selectedItemParent)){return selectedItemParent[iconKey]}if(allCollapsed&&selectedItem&&"object"===babelHelpers.typeof(selectedItem)){return selectedItem[iconKey]}return null},_getDropdownWidth:function _getDropdownWidth(allCollapsed){if(allCollapsed){var width=parseInt(this.getComputedStyleValue("--px-app-nav-collapsed-width"));return isNaN(width)?320:width}},_getItemProp:function _getItemProp(item,key){return item[key]},_isCollapsedCaratHidden:function _isCollapsedCaratHidden(allCollapsed,collapseWithIcon){return!allCollapsed||collapseWithIcon},_isCollapsedDropdownEmpty:function _isCollapsedDropdownEmpty(selectedItem,allCollapsed,collapseWithIcon){return allCollapsed&&!collapseWithIcon&&(!selectedItem||"object"!==babelHelpers.typeof(selectedItem))},_isItemSelected:function _isItemSelected(item,selectedItem){return item&&selectedItem&&item===selectedItem},_isItemVisible:function _isItemVisible(item){if(!item||!this.visibleItems||!Array.isArray(this.visibleItems))return!1;return-1!==this.visibleItems.indexOf(item)},_isItemOverflowed:function _isItemOverflowed(item){if(!item||!this.overflowedItems||!Array.isArray(this.overflowedItems))return!1;return-1!==this.overflowedItems.indexOf(item)},_isItemParent:function _isItemParent(item,childrenKey){return item.hasOwnProperty(childrenKey)&&Array.isArray(item[childrenKey])&&0<item[childrenKey].length},_isItemNotParent:function _isItemNotParent(item,childrenKey){return!item.hasOwnProperty(childrenKey)||!Array.isArray(item[childrenKey])||0===item[childrenKey].length},_isSelectedOverflowed:function _isSelectedOverflowed(selectedItem,selectedItemParent,overflowedItems){if(!selectedItem||!overflowedItems||!Array.isArray(overflowedItems)||!overflowedItems.length)return!1;if(selectedItemParent)return-1!==overflowedItems.indexOf(selectedItemParent);return-1!==overflowedItems.indexOf(selectedItem)},_isIconEmpty:function _isIconEmpty(item,iconKey){return!item.hasOwnProperty(iconKey)||"string"!==typeof item[iconKey]&&0<=item[iconKey].length},_computeAnyOverflowed:function _computeAnyOverflowed(overflowed,visible){return Array.isArray(overflowed)&&0<overflowed.length},_computeAllCollapsed:function _computeAllCollapsed(overflowed,visible){return Array.isArray(overflowed)&&0<overflowed.length&&Array.isArray(visible)&&0===visible.length},_computeSomeOverflowed:function _computeSomeOverflowed(overflowed,visible){return Array.isArray(overflowed)&&0<overflowed.length&&Array.isArray(visible)&&0<visible.length}})})();