(function(){"use strict";window.PxMap=window.PxMap||{};var StaticIcon=function(){function StaticIcon(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};babelHelpers.classCallCheck(this,StaticIcon);this.icon=this.createIcon(settings);return this.icon}babelHelpers.createClass(StaticIcon,[{key:"createIcon",value:function createIcon(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},_settings$type=settings.type,type=void 0===_settings$type?"info":_settings$type,styleScope=settings.styleScope,color=settings.color,className=this._generateStaticIconClasses(type,styleScope),customStyleBackground="",customStyleBorder="";if(color){customStyleBackground="background-color: ".concat(color,";");customStyleBorder="border-color: ".concat(color," transparent transparent;")}var html="\n        <div class=\"map-icon-static__wrapper\">\n          <i class=\"map-icon-static__body\" style=\"".concat(customStyleBackground,"\"></i>\n          <i class=\"map-icon-static__descender\" style=\"").concat(customStyleBorder,"\"></i>\n          <i class=\"map-icon-static__badge\"></i>\n        </div>\n      "),iconSize=L.point(23,31),iconAnchor=L.point(7.6,31),popupAnchor=L.point(1,-31),options={className:className,html:html,iconSize:iconSize,iconAnchor:iconAnchor,popupAnchor:popupAnchor};return L.divIcon(options)}},{key:"_generateStaticIconClasses",value:function _generateStaticIconClasses(type,styleScope){var classes=["map-icon","map-icon-static","map-icon-static--with-badge"];if(type&&type.length){classes.push("map-icon-static--".concat(type))}if(styleScope){classes.push(styleScope)}return classes.join(" ")}}]);return StaticIcon}();;PxMap.StaticIcon=StaticIcon;var SymbolIcon=function(){function SymbolIcon(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};babelHelpers.classCallCheck(this,SymbolIcon);this.icon=this.createIcon(settings);return this.icon}babelHelpers.createClass(SymbolIcon,[{key:"createIcon",value:function createIcon(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},_settings$type2=settings.type,type=void 0===_settings$type2?"info":_settings$type2,_settings$icon=settings.icon,icon=void 0===_settings$icon?"px-nav:favorite":_settings$icon,styleScope=settings.styleScope,_settings$stroke=settings.stroke,stroke=void 0===_settings$stroke?"currentColor":_settings$stroke,_settings$fill=settings.fill,fill=void 0===_settings$fill?"none":_settings$fill,_settings$strokeWidth=settings.strokeWidth,strokeWidth=void 0===_settings$strokeWidth?"2px":_settings$strokeWidth,color=settings.color,className=this._generateSymbolIconClasses(type,styleScope),customStyleBackground="",customStyleBorder="";if(color){customStyleBackground="background-color: ".concat(color,";");customStyleBorder="border-color: ".concat(color," transparent transparent;")}var html="\n      <div class=\"map-icon-symbol__wrapper\">\n        <i class=\"map-icon-symbol__body\" style=\"".concat(customStyleBackground,"\">\n          <div class=\"map-icon-symbol__symbol--container flex flex--middle flex--center\">\n            <px-icon icon=\"").concat(icon,"\" style=\"stroke:").concat(stroke,"; fill:").concat(fill,"; width:100%; height:100%; stroke-width:").concat(strokeWidth,"\"></px-icon>\n          </div>\n        </i>\n        <i class=\"map-icon-symbol__descender\" style=\"").concat(customStyleBorder,"\"></i>\n        <i class=\"map-icon-symbol__badge\"></i>\n      </div>\n      "),iconSize=L.point(40,56),iconAnchor=L.point(19.6,57),popupAnchor=L.point(1,-58),options={className:className,html:html,iconSize:iconSize,iconAnchor:iconAnchor,popupAnchor:popupAnchor};return L.divIcon(options)}},{key:"_generateSymbolIconClasses",value:function _generateSymbolIconClasses(type,styleScope){var classes=["map-icon","map-icon-symbol","map-icon-symbol--with-badge"];if(type&&type.length){classes.push("map-icon-symbol--".concat(type))}if(styleScope){classes.push(styleScope)}return classes.join(" ")}}]);return SymbolIcon}();;PxMap.SymbolIcon=SymbolIcon;var ClusterIcon=function(){function ClusterIcon(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};babelHelpers.classCallCheck(this,ClusterIcon);this.icon=this.createIcon(settings);return this.icon}babelHelpers.createClass(ClusterIcon,[{key:"createIcon",value:function createIcon(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},count=settings.count,countByType=settings.countByType,colorsByType=settings.colorsByType,_settings$containerSi=settings.containerSize,containerSize=void 0===_settings$containerSi?50:_settings$containerSi,_settings$pathSize=settings.pathSize,pathSize=void 0===_settings$pathSize?10:_settings$pathSize,_settings$borderSize=settings.borderSize,borderSize=void 0===_settings$borderSize?0:_settings$borderSize,_settings$className=settings.className,className=void 0===_settings$className?"":_settings$className,styleScope=settings.styleScope,chartSize=containerSize-(0<borderSize?2*borderSize-.5:0),iconSize=L.point(containerSize,containerSize),svg=this._generateClusterIconSVG(countByType,colorsByType,chartSize,pathSize),classes="map-icon-cluster ".concat(className||""," ").concat(styleScope||""),html="\n        <div class=\"map-icon-cluster__container\" style=\"width: ".concat(containerSize,"px; height: ").concat(containerSize,"px\">\n          <i class=\"map-icon-cluster__svg\">").concat(svg,"</i>\n          <div class=\"map-icon-cluster__body\">").concat(count,"</div>\n        </div>\n      "),options={iconSize:iconSize,className:classes,html:html};return L.divIcon(options)}},{key:"_generateClusterIconSVG",value:function _generateClusterIconSVG(countByType,colorsByType,chartSize,pathSize){var typeKeys=Object.keys(countByType),typeObjs=typeKeys.map(function(type){return{type:type,count:countByType[type],color:colorsByType[type]}});typeObjs.sort(function(a,b){return a.count-b.count});var types=[],colors=[],i,len,type,total;for(i=0,len=typeKeys.length;i<len;i++){type=typeKeys[i];total=countByType[type];types.push(countByType[type]);colors.push(colorsByType[type])}return this.createPieChart(types,colors,chartSize,pathSize)}},{key:"createPieChart",value:function createPieChart(groupsArray,colorsArray,chartSize,pathSize){var pieGeneratorFn=Px.d3.pie(),arcData=pieGeneratorFn(groupsArray),radius=chartSize/2,innerRadius=radius-pathSize,arcPathGeneratorFn=Px.d3.arc().outerRadius(radius).innerRadius(innerRadius),pathListTmpl=function pathListTmpl(paths){return paths.map(pathTmpl).join("")},pathTmpl=function pathTmpl(pathData,pathIndex){return"<path d=\"".concat(arcPathGeneratorFn(pathData),"\" fill=\"").concat(colorsArray[pathIndex],"\" opacity=\"1\"></path>")};return"\n        <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" preserveAspectRatio=\"none\" viewBox=\"0 0 ".concat(chartSize," ").concat(chartSize,"\">\n            <g transform=\"translate(").concat(radius,", ").concat(radius,")\">\n                ").concat(pathListTmpl(arcData),"\n            </g>\n        </svg>\n      ")}}]);return ClusterIcon}();;PxMap.ClusterIcon=ClusterIcon})();