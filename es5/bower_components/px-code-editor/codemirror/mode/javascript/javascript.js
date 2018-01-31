(function(a){"object"==("undefined"===typeof exports?"undefined":babelHelpers.typeof(exports))&&"object"==("undefined"===typeof module?"undefined":babelHelpers.typeof(module))?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){"use strict";a.defineMode("javascript",function(b,d){function c(a){for(var b,c=!1,d=!1;null!=(b=a.next());){if(!c){if("/"==b&&!d)return;"["==b?d=!0:d&&"]"==b&&(d=!1)}c=!c&&"\\"==b}}function e(a,b,c){return Da=a,Ea=c,b}function f(a,b){var d=a.next();if("\""==d||"'"==d)return b.tokenize=g(d),b.tokenize(a,b);if("."==d&&a.match(/^\d+(?:[eE][+\-]?\d+)?/))return e("number","number");if("."==d&&a.match(".."))return e("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(d))return e(d);if("="==d&&a.eat(">"))return e("=>","operator");if("0"==d&&a.eat(/x/i))return a.eatWhile(/[\da-f]/i),e("number","number");if("0"==d&&a.eat(/o/i))return a.eatWhile(/[0-7]/i),e("number","number");if("0"==d&&a.eat(/b/i))return a.eatWhile(/[01]/i),e("number","number");if(/\d/.test(d))return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),e("number","number");if("/"==d)return a.eat("*")?(b.tokenize=h,h(a,b)):a.eat("/")?(a.skipToEnd(),e("comment","comment")):Ca(a,b,1)?(c(a),a.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/),e("regexp","string-2")):(a.eat("="),e("operator","operator",a.current()));if("`"==d)return b.tokenize=i,i(a,b);if("#"==d)return a.skipToEnd(),e("error","error");if(Ma.test(d))return">"==d&&b.lexical&&">"==b.lexical.type||(a.eat("=")?("!"==d||"="==d)&&a.eat("="):/[<>*+\-]/.test(d)&&(a.eat(d),">"==d&&a.eat(d))),e("operator","operator",a.current());if(Ka.test(d)){a.eatWhile(Ka);var f=a.current();if("."!=b.lastType){if(La.propertyIsEnumerable(f)){var j=La[f];return e(j.type,j.style,f)}if("async"==f&&a.match(/^(\s|\/\*.*?\*\/)*[\(\w]/,!1))return e("async","keyword",f)}return e("variable","variable",f)}}function g(a){return function(b,c){var d,g=!1;if(Ha&&"@"==b.peek()&&b.match(Na))return c.tokenize=f,e("jsonld-keyword","meta");for(;null!=(d=b.next())&&(d!=a||g);)g=!g&&"\\"==d;return g||(c.tokenize=f),e("string","string")}}function h(a,b){for(var c,d=!1;c=a.next();){if("/"==c&&d){b.tokenize=f;break}d="*"==c}return e("comment","comment")}function i(a,b){for(var c,d=!1;null!=(c=a.next());){if(!d&&("`"==c||"$"==c&&a.eat("{"))){b.tokenize=f;break}d=!d&&"\\"==c}return e("quasi","string-2",a.current())}function j(a,b){b.fatArrowAt&&(b.fatArrowAt=null);var c=a.string.indexOf("=>",a.start);if(!(0>c)){if(Ja){var d=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(a.string.slice(a.start,c));d&&(c=d.index)}for(var e=0,f=!1,g=c-1;0<=g;--g){var h=a.string.charAt(g),i=Oa.indexOf(h);if(0<=i&&3>i){if(!e){++g;break}if(0==--e){"("==h&&(f=!0);break}}else if(3<=i&&6>i)++e;else if(Ka.test(h))f=!0;else{if(/["'\/]/.test(h))return;if(f&&!e){++g;break}}}f&&!e&&(b.fatArrowAt=g)}}function k(a,b,c,d,e,f){this.indented=a,this.column=b,this.type=c,this.prev=e,this.info=f,null!=d&&(this.align=d)}function l(a,b){for(var c=a.localVars;c;c=c.next)if(c.name==b)return!0;for(var d=a.context;d;d=d.prev)for(var c=d.vars;c;c=c.next)if(c.name==b)return!0}function m(a,b,c,d,e){var f=a.cc;for(Qa.state=a,Qa.stream=e,Qa.marked=null,Qa.cc=f,Qa.style=b,a.lexical.hasOwnProperty("align")||(a.lexical.align=!0);;){var g=f.length?f.pop():Ia?w:v;if(g(c,d)){for(;f.length&&f[f.length-1].lex;)f.pop()();return Qa.marked?Qa.marked:"variable"==c&&l(a,d)?"variable-2":b}}}function n(){for(var a=arguments.length-1;0<=a;a--)Qa.cc.push(arguments[a])}function o(){return n.apply(null,arguments),!0}function p(a){function b(b){for(var c=b;c;c=c.next)if(c.name==a)return!0;return!1}var c=Qa.state;if(Qa.marked="def",c.context){if(b(c.localVars))return;c.localVars={name:a,next:c.localVars}}else{if(b(c.globalVars))return;d.globalVars&&(c.globalVars={name:a,next:c.globalVars})}}function q(){Qa.state.context={prev:Qa.state.context,vars:Qa.state.localVars},Qa.state.localVars=Ra}function r(){Qa.state.localVars=Qa.state.context.vars,Qa.state.context=Qa.state.context.prev}function s(a,b){var c=function(){var c=Qa.state,d=c.indented;if("stat"==c.lexical.type)d=c.lexical.indented;else for(var e=c.lexical;e&&")"==e.type&&e.align;e=e.prev)d=e.indented;c.lexical=new k(d,Qa.stream.column(),a,null,c.lexical,b)};return c.lex=!0,c}function t(){var a=Qa.state;a.lexical.prev&&(")"==a.lexical.type&&(a.indented=a.lexical.indented),a.lexical=a.lexical.prev)}function u(a){function b(c){return c==a?o():";"==a?n():o(b)}return b}function v(a,b){return"var"==a?o(s("vardef",b.length),ba,u(";"),t):"keyword a"==a?o(s("form"),y,v,t):"keyword b"==a?o(s("form"),v,t):"keyword d"==a?Qa.stream.match(/^\s*$/,!1)?o():o(s("stat"),A,u(";"),t):"debugger"==a?o(u(";")):"{"==a?o(s("}"),R,t):";"==a?o():"if"==a?("else"==Qa.state.lexical.info&&Qa.state.cc[Qa.state.cc.length-1]==t&&Qa.state.cc.pop()(),o(s("form"),y,v,t,ga)):"function"==a?o(ma):"for"==a?o(s("form"),ha,v,t):"variable"==a?Ja&&"type"==b?(Qa.marked="keyword",o(V,u("operator"),V,u(";"))):Ja&&"declare"==b?(Qa.marked="keyword",o(v)):Ja&&("module"==b||"enum"==b)&&Qa.stream.match(/^\s*\w/,!1)?(Qa.marked="keyword",o(s("form"),ca,u("{"),s("}"),R,t,t)):o(s("stat"),K):"switch"==a?o(s("form"),y,u("{"),s("}","switch"),R,t,t):"case"==a?o(w,u(":")):"default"==a?o(u(":")):"catch"==a?o(s("form"),q,u("("),na,u(")"),v,t,r):"class"==a?o(s("form"),pa,t):"export"==a?o(s("stat"),ta,t):"import"==a?o(s("stat"),va,t):"async"==a?o(v):"@"==b?o(w,v):n(s("stat"),w,u(";"),t)}function w(a){return z(a,!1)}function x(a){return z(a,!0)}function y(a){return"("==a?o(s(")"),w,u(")"),t):n()}function z(a,b){if(Qa.state.fatArrowAt==Qa.stream.start){var c=b?G:F;if("("==a)return o(q,s(")"),P(na,")"),t,u("=>"),c,r);if("variable"==a)return n(q,ca,u("=>"),c,r)}var d=b?C:B;return Pa.hasOwnProperty(a)?o(d):"function"==a?o(ma,d):"class"==a?o(s("form"),oa,t):"keyword c"==a||"async"==a?o(b?x:w):"("==a?o(s(")"),A,u(")"),t,d):"operator"==a||"spread"==a?o(b?x:w):"["==a?o(s("]"),Aa,t,d):"{"==a?Q(M,"}",null,d):"quasi"==a?n(D,d):"new"==a?o(H(b)):o()}function A(a){return a.match(/[;\}\)\],]/)?n():n(w)}function B(a,b){return","==a?o(w):C(a,b,!1)}function C(a,b,c){var d=!1==c?B:C,e=!1==c?w:x;return"=>"==a?o(q,c?G:F,r):"operator"==a?/\+\+|--/.test(b)||Ja&&"!"==b?o(d):Ja&&"<"==b&&Qa.stream.match(/^([^>]|<.*?>)*>\s*\(/,!1)?o(s(">"),P(V,">"),t,d):"?"==b?o(w,u(":"),e):o(e):"quasi"==a?n(D,d):";"==a?void 0:"("==a?Q(x,")","call",d):"."==a?o(L,d):"["==a?o(s("]"),A,u("]"),t,d):Ja&&"as"==b?(Qa.marked="keyword",o(V,d)):"regexp"==a?(Qa.state.lastType=Qa.marked="operator",Qa.stream.backUp(Qa.stream.pos-Qa.stream.start-1),o(e)):void 0}function D(a,b){return"quasi"==a?"${"==b.slice(b.length-2)?o(w,E):o(D):n()}function E(a){if("}"==a)return Qa.marked="string-2",Qa.state.tokenize=i,o(D)}function F(a){return j(Qa.stream,Qa.state),n("{"==a?v:w)}function G(a){return j(Qa.stream,Qa.state),n("{"==a?v:x)}function H(a){return function(b){return"."==b?o(a?J:I):"variable"==b&&Ja?o($,a?C:B):n(a?x:w)}}function I(a,b){if("target"==b)return Qa.marked="keyword",o(B)}function J(a,b){if("target"==b)return Qa.marked="keyword",o(C)}function K(a){return":"==a?o(t,v):n(B,u(";"),t)}function L(a){if("variable"==a)return Qa.marked="property",o()}function M(a,b){if("async"==a)return Qa.marked="property",o(M);if("variable"==a||"keyword"==Qa.style){if(Qa.marked="property","get"==b||"set"==b)return o(N);var c;return Ja&&Qa.state.fatArrowAt==Qa.stream.start&&(c=Qa.stream.match(/^\s*:\s*/,!1))&&(Qa.state.fatArrowAt=Qa.stream.pos+c[0].length),o(O)}return"number"==a||"string"==a?(Qa.marked=Ha?"property":Qa.style+" property",o(O)):"jsonld-keyword"==a?o(O):"modifier"==a?o(M):"["==a?o(w,u("]"),O):"spread"==a?o(x,O):"*"==b?(Qa.marked="keyword",o(M)):":"==a?n(O):void 0}function N(a){return"variable"==a?(Qa.marked="property",o(ma)):n(O)}function O(a){return":"==a?o(x):"("==a?n(ma):void 0}function P(a,b,c){function d(e,f){if(c?-1<c.indexOf(e):","==e){var g=Qa.state.lexical;return"call"==g.info&&(g.pos=(g.pos||0)+1),o(function(c,d){return c==b||d==b?n():n(a)},d)}return e==b||f==b?o():o(u(b))}return function(c,e){return c==b||e==b?o():n(a,d)}}function Q(a,b,c){for(var d=3;d<arguments.length;d++)Qa.cc.push(arguments[d]);return o(s(b,c),P(a,b),t)}function R(a){return"}"==a?o():n(v,R)}function S(a,b){if(Ja){if(":"==a)return o(V);if("?"==b)return o(S)}}function T(a){if(Ja&&":"==a)return Qa.stream.match(/^\s*\w+\s+is\b/,!1)?o(w,U,V):o(V)}function U(a,b){if("is"==b)return Qa.marked="keyword",o()}function V(a,b){return"variable"==a||"void"==b?"keyof"==b?(Qa.marked="keyword",o(V)):(Qa.marked="type",o(Z)):"string"==a||"number"==a||"atom"==a?o(Z):"["==a?o(s("]"),P(V,"]",","),t,Z):"{"==a?o(s("}"),P(X,"}",",;"),t,Z):"("==a?o(P(Y,")"),W):void 0}function W(a){if("=>"==a)return o(V)}function X(a,b){return"variable"==a||"keyword"==Qa.style?(Qa.marked="property",o(X)):"?"==b?o(X):":"==a?o(V):"["==a?o(w,S,u("]"),X):void 0}function Y(a){return"variable"==a?o(Y):":"==a?o(V):void 0}function Z(a,b){return"<"==b?o(s(">"),P(V,">"),t,Z):"|"==b||"."==a?o(V):"["==a?o(u("]"),Z):"extends"==b?o(V):void 0}function $(a,b){if("<"==b)return o(s(">"),P(V,">"),t,Z)}function _(){return n(V,aa)}function aa(a,b){if("="==b)return o(V)}function ba(){return n(ca,S,ea,fa)}function ca(a,b){return"modifier"==a?o(ca):"variable"==a?(p(b),o()):"spread"==a?o(ca):"["==a?Q(ca,"]"):"{"==a?Q(da,"}"):void 0}function da(a,b){return"variable"!=a||Qa.stream.match(/^\s*:/,!1)?("variable"==a&&(Qa.marked="property"),"spread"==a?o(ca):"}"==a?n():o(u(":"),ca,ea)):(p(b),o(ea))}function ea(a,b){if("="==b)return o(x)}function fa(a){if(","==a)return o(ba)}function ga(a,b){if("keyword b"==a&&"else"==b)return o(s("form","else"),v,t)}function ha(a){if("("==a)return o(s(")"),ia,u(")"),t)}function ia(a){return"var"==a?o(ba,u(";"),ka):";"==a?o(ka):"variable"==a?o(ja):n(w,u(";"),ka)}function ja(a,b){return"in"==b||"of"==b?(Qa.marked="keyword",o(w)):o(B,ka)}function ka(a,b){return";"==a?o(la):"in"==b||"of"==b?(Qa.marked="keyword",o(w)):n(w,u(";"),la)}function la(a){")"!=a&&o(w)}function ma(a,b){return"*"==b?(Qa.marked="keyword",o(ma)):"variable"==a?(p(b),o(ma)):"("==a?o(q,s(")"),P(na,")"),t,T,v,r):Ja&&"<"==b?o(s(">"),P(_,">"),t,ma):void 0}function na(a,b){return"@"==b&&o(w,na),"spread"==a||"modifier"==a?o(na):n(ca,S,ea)}function oa(a,b){return"variable"==a?pa(a,b):qa(a,b)}function pa(a,b){if("variable"==a)return p(b),o(qa)}function qa(a,b){return"<"==b?o(s(">"),P(_,">"),t,qa):"extends"==b||"implements"==b||Ja&&","==a?o(Ja?V:w,qa):"{"==a?o(s("}"),ra,t):void 0}function ra(a,b){return"modifier"==a||"async"==a||"variable"==a&&("static"==b||"get"==b||"set"==b)&&Qa.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(Qa.marked="keyword",o(ra)):"variable"==a||"keyword"==Qa.style?(Qa.marked="property",o(Ja?sa:ma,ra)):"["==a?o(w,u("]"),Ja?sa:ma,ra):"*"==b?(Qa.marked="keyword",o(ra)):";"==a?o(ra):"}"==a?o():"@"==b?o(w,ra):void 0}function sa(a,b){return"?"==b?o(sa):":"==a?o(V,ea):"="==b?o(x):n(ma)}function ta(a,b){return"*"==b?(Qa.marked="keyword",o(za,u(";"))):"default"==b?(Qa.marked="keyword",o(w,u(";"))):"{"==a?o(P(ua,"}"),za,u(";")):n(v)}function ua(a,b){return"as"==b?(Qa.marked="keyword",o(u("variable"))):"variable"==a?n(x,ua):void 0}function va(a){return"string"==a?o():n(wa,xa,za)}function wa(a,b){return"{"==a?Q(wa,"}"):("variable"==a&&p(b),"*"==b&&(Qa.marked="keyword"),o(ya))}function xa(a){if(","==a)return o(wa,xa)}function ya(a,b){if("as"==b)return Qa.marked="keyword",o(wa)}function za(a,b){if("from"==b)return Qa.marked="keyword",o(w)}function Aa(a){return"]"==a?o():n(P(x,"]"))}function Ba(a,b){return"operator"==a.lastType||","==a.lastType||Ma.test(b.charAt(0))||/[,.]/.test(b.charAt(0))}function Ca(a,b,c){return b.tokenize==f&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(b.lastType)||"quasi"==b.lastType&&/\{\s*$/.test(a.string.slice(0,a.pos-(c||0)))}var Da,Ea,Fa=b.indentUnit,Ga=d.statementIndent,Ha=d.jsonld,Ia=d.json||Ha,Ja=d.typescript,Ka=d.wordCharacters||/[\w$\xa1-\uffff]/,La=function(){function a(a){return{type:a,style:"keyword"}}var b=a("keyword a"),c=a("keyword b"),d=a("keyword c"),e=a("keyword d"),f=a("operator"),g={type:"atom",style:"atom"},h={if:a("if"),while:b,with:b,else:c,do:c,try:c,finally:c,return:e,break:e,continue:e,new:a("new"),delete:d,void:d,throw:d,debugger:a("debugger"),var:a("var"),const:a("var"),let:a("var"),function:a("function"),catch:a("catch"),for:a("for"),switch:a("switch"),case:a("case"),default:a("default"),in:f,typeof:f,instanceof:f,true:g,false:g,null:g,undefined:g,NaN:g,Infinity:g,this:a("this"),class:a("class"),super:a("atom"),yield:d,export:a("export"),import:a("import"),extends:d,await:d};if(Ja){var i={type:"variable",style:"type"},j={interface:a("class"),implements:d,namespace:d,public:a("modifier"),private:a("modifier"),protected:a("modifier"),abstract:a("modifier"),readonly:a("modifier"),string:i,number:i,boolean:i,any:i};for(var k in j)h[k]=j[k]}return h}(),Ma=/[+\-*&%=<>!?|~^@]/,Na=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,Oa="([{}])",Pa={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,"jsonld-keyword":!0},Qa={state:null,column:null,marked:null,cc:null},Ra={name:"this",next:{name:"arguments"}};return t.lex=!0,{startState:function(a){var b={tokenize:f,lastType:"sof",cc:[],lexical:new k((a||0)-Fa,0,"block",!1),localVars:d.localVars,context:d.localVars&&{vars:d.localVars},indented:a||0};return d.globalVars&&"object"==babelHelpers.typeof(d.globalVars)&&(b.globalVars=d.globalVars),b},token:function(a,b){if(a.sol()&&(!b.lexical.hasOwnProperty("align")&&(b.lexical.align=!1),b.indented=a.indentation(),j(a,b)),b.tokenize!=h&&a.eatSpace())return null;var c=b.tokenize(a,b);return"comment"==Da?c:(b.lastType="operator"==Da&&("++"==Ea||"--"==Ea)?"incdec":Da,m(b,c,Da,Ea,a))},indent:function(b,e){if(b.tokenize==h)return a.Pass;if(b.tokenize!=f)return 0;var g,j=e&&e.charAt(0),k=b.lexical;if(!/^\s*else\b/.test(e))for(var l,c=b.cc.length-1;0<=c;--c)if(l=b.cc[c],l==t)k=k.prev;else if(l!=ga)break;for(;("stat"==k.type||"form"==k.type)&&("}"==j||(g=b.cc[b.cc.length-1])&&(g==B||g==C)&&!/^[,\.=+\-*:?[\(]/.test(e));)k=k.prev;Ga&&")"==k.type&&"stat"==k.prev.type&&(k=k.prev);var i=k.type,m=j==i;return"vardef"==i?k.indented+("operator"==b.lastType||","==b.lastType?k.info+1:0):"form"==i&&"{"==j?k.indented:"form"==i?k.indented+Fa:"stat"==i?k.indented+(Ba(b,e)?Ga||Fa:0):"switch"!=k.info||m||!1==d.doubleIndentSwitch?k.align?k.column+(m?0:1):k.indented+(m?0:Fa):k.indented+(/^(?:case|default)\b/.test(e)?Fa:2*Fa)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:Ia?null:"/*",blockCommentEnd:Ia?null:"*/",blockCommentContinue:Ia?null:" * ",lineComment:Ia?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:Ia?"json":"javascript",jsonldMode:Ha,jsonMode:Ia,expressionAllowed:Ca,skipExpression:function(a){var b=a.cc[a.cc.length-1];(b==w||b==x)&&a.cc.pop()}}}),a.registerHelper("wordChars","javascript",/[\w$]/),a.defineMIME("text/javascript","javascript"),a.defineMIME("text/ecmascript","javascript"),a.defineMIME("application/javascript","javascript"),a.defineMIME("application/x-javascript","javascript"),a.defineMIME("application/ecmascript","javascript"),a.defineMIME("application/json",{name:"javascript",json:!0}),a.defineMIME("application/x-json",{name:"javascript",json:!0}),a.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),a.defineMIME("text/typescript",{name:"javascript",typescript:!0}),a.defineMIME("application/typescript",{name:"javascript",typescript:!0})});