(function(){'use strict';window.PxMapBehavior=window.PxMapBehavior||{},PxMapBehavior.LayerImpl={attached:function(){this.notifyInstReady(this.canAddInst())},detached:function(){this.shouldRemoveInst()},shouldAddInst:function(a){PxMapBehavior.ElementImpl.shouldAddInst.call(this,a),this.elementInst&&a&&this.addInst(a)},shouldRemoveInst:function(a){PxMapBehavior.ElementImpl.shouldRemoveInst.call(this,a),this.elementInst&&this.removeInst(a?a:void 0)},addInst:function(a){a.addLayer(this.elementInst)},removeInst:function(){this.elementInst.remove()},canAddInst:function(){return!0}},PxMapBehavior.Layer=[PxMapBehavior.Element,PxMapBehavior.LayerImpl],PxMapBehavior.ParentLayerImpl={listeners:{"px-map-element-instance-created":'_tryToAddAllChildren',"px-map-element-ready-to-add":'_tryToAddOneChild'},created:function(){this._attachedChildren=this._attachedChildren||new WeakMap},detached:function(){this._detachLayerChildren()},_tryToAddAllChildren:function(a){var b=Polymer.dom(a);this.elementInst&&b.rootTarget===this&&this._attachLayerChildren()},_tryToAddOneChild:function(a){var b=Polymer.dom(a);b.rootTarget!==this&&(a.stopPropagation(),this.elementInst&&this._attachLayerChild(b.rootTarget))},_attachLayerChildren:function(){var a=this,b=this.getEffectiveChildren();b&&b.length&&b.forEach(function(b){a._attachLayerChild(b)})},_attachLayerChild:function(a){var b=this;!this._attachedChildren.has(a)&&a.shouldAddInst&&a.canAddInst&&a.canAddInst()&&(this._attachedChildren.set(a,!0),this.async(function(){a.shouldAddInst(b.elementInst)}))},_detachLayerChildren:function(){var a=this,b=this.getEffectiveChildren();b&&b.length&&b.forEach(function(b){a._detachLayerChild(b)})},_detachLayerChild:function(a){var b=this;this._attachedChildren.has(a)&&a.shouldRemoveInst&&(this._attachedChildren.delete(a),this.async(function(){a.shouldRemoveInst(b.elementInst)}))}},PxMapBehavior.ParentLayer=[PxMapBehavior.ParentLayerImpl]})();