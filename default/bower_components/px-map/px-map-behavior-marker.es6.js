(function(){'use strict';window.PxMapBehavior=window.PxMapBehavior||{},window.PxMap=window.PxMap||{},PxMapBehavior.MarkerImpl={properties:{lat:{type:Number,notify:!0,observer:'shouldUpdateInst'},lng:{type:Number,notify:!0,observer:'shouldUpdateInst'},name:{type:String,notify:!0,observer:'shouldUpdateInst'}},canAddInst(){return this.latLngIsValid(this.lat,this.lng,!0)},_canBeNum(a){return!isNaN(a)&&''!==a},latLngIsValid(a,b,c){var d='undefined'!==typeof a&&this._canBeNum(a)&&'undefined'!==typeof b&&this._canBeNum(b);return!!d||(c||console.log(`PX-MAP CONFIGURATION ERROR:
        You entered an invalid \`lat\` or \`lng\` attribute for ${this.is}. You must pass a valid number.`),!1)},addInst(a){const b=this._handleMarkerAdded.bind(this),c=this._handleMarkerRemoved.bind(this),d=this._handleMarkerTapped.bind(this);this.bindEvents({add:b,remove:c,click:d},this.marker),PxMapBehavior.LayerImpl.addInst.call(this,a)},removeInst(a){this._handleMarkerRemoved(),PxMapBehavior.LayerImpl.removeInst.call(this,a)},createInst(a){return this.marker=L.marker(a.geometry,a.config),this.marker.isMarker=!0,this.marker},updateInst(a,b){const c='object'===typeof a.geometry,d='object'===typeof b.geometry,e=c&&d&&(a.geometry.lat!==b.geometry.lat||a.geometry.lng!==b.geometry.lng);c&&!d&&this.elementInst.setOpacity(0),!c&&d&&(this.elementInst.setLatLng(b.geometry),this.elementInst.setOpacity(1)),e&&this.elementInst.setLatLng(b.geometry),a.config.icon!==b.config.icon&&this.elementInst.setIcon(b.config.icon)},getInstOptions(){const a=this.getLatLng(),b={};return b.title=this.name||'',b.icon=this.getMarkerIcon(),{geometry:a,config:b}},getLatLng(){if(this.latLngIsValid(this.lat,this.lng))return L.latLng(this.lat,this.lng)},getMarkerIcon(){throw new Error('The `getMarkerIcon` method must be implemented.')},_handleMarkerAdded(){const a=this.getLatLng(),b={};a&&(b.latLng=a,b.lat=a.lat,b.lng=a.lng),this.fire('px-map-marker-added',b)},_handleMarkerRemoved(){const a=this.getLatLng(),b={};a&&(b.latLng=a,b.lat=a.lat,b.lng=a.lng),this.fire('px-map-marker-removed',b)},_handleMarkerTapped(){const a=this.getLatLng(),b={};a&&(b.latLng=a,b.lat=a.lat,b.lng=a.lng),this.fire('px-map-marker-tapped',b)}},PxMapBehavior.Marker=[PxMapBehavior.Layer,PxMapBehavior.ParentLayer,PxMapBehavior.MarkerImpl],PxMapBehavior.SymbolMarkerImpl={properties:{type:{type:String,reflectToAttribute:!0,value:'info',observer:'_updateMarkerIcon'},icon:{type:String,observer:'_updateMarkerIcon'}},getMarkerIcon(){if(!this.markerIcon){const a=this._getMarkerIconOptions();this.markerIcon=new PxMap.SymbolIcon(a)}return this.markerIcon},_updateMarkerIcon(){if(this.markerIcon){const a=this._getMarkerIconOptions();this.markerIcon=new PxMap.SymbolIcon(a),this.shouldUpdateInst()}},_getMarkerIconOptions(){let a={type:this.type,symbol:this.symbolClass,icon:this.icon,styleScope:this.isShadyScoped()?this.getShadyScope():void 0,stroke:this.getComputedStyleValue('--iron-icon-stroke-color'),strokeWidth:this.getComputedStyleValue('--iron-icon-stroke-width'),fill:this.getComputedStyleValue('--iron-icon-fill-color')};return'custom-'===this.type.slice(0,7)&&(a.color=this.getComputedStyleValue(`--px-map-color-${this.type}`)),a}},PxMapBehavior.SymbolMarker=[PxMapBehavior.Marker,PxMapBehavior.SymbolMarkerImpl],PxMapBehavior.StaticMarkerImpl={properties:{type:{type:String,reflectToAttribute:!0,value:'info',observer:'_updateMarkerIcon'}},getMarkerIcon(){if(!this.markerIcon){const a=this._getMarkerIconOptions();this.markerIcon=new PxMap.StaticIcon(a)}return this.markerIcon},_updateMarkerIcon(){if(this.markerIcon){const a=this._getMarkerIconOptions();this.markerIcon=new PxMap.StaticIcon(a),this.shouldUpdateInst()}},_getMarkerIconOptions(){let a={type:this.type||'',styleScope:this.isShadyScoped()?this.getShadyScope():void 0};return'custom-'===this.type.slice(0,7)&&(a.color=this.getComputedStyleValue(`--px-map-color-${this.type}`)),a}},PxMapBehavior.StaticMarker=[PxMapBehavior.Marker,PxMapBehavior.StaticMarkerImpl],PxMapBehavior.LocateMarkerImpl={properties:{accuracy:{type:Number,observer:'shouldUpdateInst'}},createInst(b){return this.markerBaseIcon=new a(b.geometry,b.baseConfig),this.markerAccuracyIcon=L.circle(b.geometry,b.accuracyRadius,b.accuracyConfig),this.markerGroup=L.featureGroup([this.markerAccuracyIcon,this.markerBaseIcon]),this.markerGroup.isMarker=!0,this.markerGroup.getLatLng=this.getLatLng.bind(this),this.markerGroup},updateInst(a,b){const c='object'===typeof a.geometry,d='object'===typeof b.geometry,e=c&&d&&(a.geometry.lat!==b.geometry.lat||a.geometry.lng!==b.geometry.lng);c&&!d&&(this.markerBaseIcon.setStyle({opacity:0,fillOpacity:0}),this.markerAccuracyIcon.setStyle({opacity:0,fillOpacity:0})),!c&&d&&(this.markerBaseIcon.setLatLng(b.geometry),this.markerAccuracyIcon.setLatLng(b.geometry),this.markerBaseIcon.setStyle(b.baseConfig),this.markerAccuracyIcon.setStyle(b.accuracyConfig)),e&&(this.markerBaseIcon.setLatLng(b.geometry),this.markerAccuracyIcon.setLatLng(b.geometry)),a.accuracyRadius!==b.accuracyRadius&&this.markerAccuracyIcon.setRadius(b.accuracyRadius),a.baseConfig.title!==b.baseConfig.title&&this.markerBaseIcon.setTitle(b.baseConfig.title)},getInstOptions(){const a=this.getLatLng(),b={};b.radius=7.5,b.stroke=!0,b.color=this.getComputedStyleValue('--internal-px-map-marker-locate-icon-border-color'),b.weight=3,b.opacity=1,b.fill=!0,b.fillColor=this.getComputedStyleValue('--internal-px-map-marker-locate-icon-color'),b.fillOpacity=1,b.className=`map-marker-locate-base ${this.isShadyScoped()?this.getShadyScope():''}`,b.title=this.name||'';const c=this.accuracy||0,d={};return d.stroke=!1,d.opacity=0,d.fill=!0,d.fillColor=this.getComputedStyleValue('--internal-px-map-marker-locate-icon-accuracy-color'),d.fillOpacity=this.getComputedStyleValue('--internal-px-map-marker-locate-icon-accuracy-opacity'),d.className=`map-marker-locate-accuracy ${this.isShadyScoped()?this.getShadyScope():''}`,{geometry:a,baseConfig:b,accuracyRadius:c,accuracyConfig:d}}},PxMapBehavior.LocateMarker=[PxMapBehavior.Marker,PxMapBehavior.LocateMarkerImpl];const a=L.CircleMarker.extend({options:{title:''},setTitle:function(a){this.options.title=a||'',this._path&&''===this.options.title&&(this._path.innerHTML=''),this._path&&''!==this.options.title&&(this._path.innerHTML=`<title>${this.options.title}</title>`)},onAdd:function(){L.CircleMarker.prototype.onAdd.call(this),''!==this.options.title&&(this._path.innerHTML=`<title>${this.options.title}</title>`)}});PxMap.CircleMarkerWithTitle=a})();