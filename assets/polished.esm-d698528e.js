function h(){return h=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r},h.apply(this,arguments)}function B(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function g(r,e){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,a){return t.__proto__=a,t},g(r,e)}function W(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,g(r,e)}function R(r){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},R(r)}function D(r){return Function.toString.call(r).indexOf("[native code]")!==-1}function G(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function w(r,e,n){return G()?w=Reflect.construct.bind():w=function(a,f,i){var u=[null];u.push.apply(u,f);var o=Function.bind.apply(a,u),d=new o;return i&&g(d,i.prototype),d},w.apply(null,arguments)}function H(r){var e=typeof Map=="function"?new Map:void 0;return H=function(t){if(t===null||!D(t))return t;if(typeof t!="function")throw new TypeError("Super expression must either be null or a function");if(typeof e<"u"){if(e.has(t))return e.get(t);e.set(t,a)}function a(){return w(t,arguments,R(this).constructor)}return a.prototype=Object.create(t.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),g(a,t)},H(r)}var s=function(r){W(e,r);function e(n){var t;return t=r.call(this,"An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#"+n+" for more information.")||this,B(t)}return e}(H(Error));function O(r){return Math.round(r*255)}function J(r,e,n){return O(r)+","+O(e)+","+O(n)}function y(r,e,n,t){if(t===void 0&&(t=J),e===0)return t(n,n,n);var a=(r%360+360)%360/60,f=(1-Math.abs(2*n-1))*e,i=f*(1-Math.abs(a%2-1)),u=0,o=0,d=0;a>=0&&a<1?(u=f,o=i):a>=1&&a<2?(u=i,o=f):a>=2&&a<3?(o=f,d=i):a>=3&&a<4?(o=i,d=f):a>=4&&a<5?(u=i,d=f):a>=5&&a<6&&(u=f,d=i);var b=n-f/2,l=u+b,p=o+b,F=d+b;return t(l,p,F)}var q={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};function K(r){if(typeof r!="string")return r;var e=r.toLowerCase();return q[e]?"#"+q[e]:r}var Q=/^#[a-fA-F0-9]{6}$/,U=/^#[a-fA-F0-9]{8}$/,X=/^#[a-fA-F0-9]{3}$/,Y=/^#[a-fA-F0-9]{4}$/,_=/^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,Z=/^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,C=/^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,V=/^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;function m(r){if(typeof r!="string")throw new s(3);var e=K(r);if(e.match(Q))return{red:parseInt(""+e[1]+e[2],16),green:parseInt(""+e[3]+e[4],16),blue:parseInt(""+e[5]+e[6],16)};if(e.match(U)){var n=parseFloat((parseInt(""+e[7]+e[8],16)/255).toFixed(2));return{red:parseInt(""+e[1]+e[2],16),green:parseInt(""+e[3]+e[4],16),blue:parseInt(""+e[5]+e[6],16),alpha:n}}if(e.match(X))return{red:parseInt(""+e[1]+e[1],16),green:parseInt(""+e[2]+e[2],16),blue:parseInt(""+e[3]+e[3],16)};if(e.match(Y)){var t=parseFloat((parseInt(""+e[4]+e[4],16)/255).toFixed(2));return{red:parseInt(""+e[1]+e[1],16),green:parseInt(""+e[2]+e[2],16),blue:parseInt(""+e[3]+e[3],16),alpha:t}}var a=_.exec(e);if(a)return{red:parseInt(""+a[1],10),green:parseInt(""+a[2],10),blue:parseInt(""+a[3],10)};var f=Z.exec(e.substring(0,50));if(f)return{red:parseInt(""+f[1],10),green:parseInt(""+f[2],10),blue:parseInt(""+f[3],10),alpha:parseFloat(""+f[4])>1?parseFloat(""+f[4])/100:parseFloat(""+f[4])};var i=C.exec(e);if(i){var u=parseInt(""+i[1],10),o=parseInt(""+i[2],10)/100,d=parseInt(""+i[3],10)/100,b="rgb("+y(u,o,d)+")",l=_.exec(b);if(!l)throw new s(4,e,b);return{red:parseInt(""+l[1],10),green:parseInt(""+l[2],10),blue:parseInt(""+l[3],10)}}var p=V.exec(e.substring(0,50));if(p){var F=parseInt(""+p[1],10),S=parseInt(""+p[2],10)/100,E=parseInt(""+p[3],10)/100,M="rgb("+y(F,S,E)+")",v=_.exec(M);if(!v)throw new s(4,e,M);return{red:parseInt(""+v[1],10),green:parseInt(""+v[2],10),blue:parseInt(""+v[3],10),alpha:parseFloat(""+p[4])>1?parseFloat(""+p[4])/100:parseFloat(""+p[4])}}throw new s(5)}function ee(r){var e=r.red/255,n=r.green/255,t=r.blue/255,a=Math.max(e,n,t),f=Math.min(e,n,t),i=(a+f)/2;if(a===f)return r.alpha!==void 0?{hue:0,saturation:0,lightness:i,alpha:r.alpha}:{hue:0,saturation:0,lightness:i};var u,o=a-f,d=i>.5?o/(2-a-f):o/(a+f);switch(a){case e:u=(n-t)/o+(n<t?6:0);break;case n:u=(t-e)/o+2;break;default:u=(e-n)/o+4;break}return u*=60,r.alpha!==void 0?{hue:u,saturation:d,lightness:i,alpha:r.alpha}:{hue:u,saturation:d,lightness:i}}function z(r){return ee(m(r))}var re=function(e){return e.length===7&&e[1]===e[2]&&e[3]===e[4]&&e[5]===e[6]?"#"+e[1]+e[3]+e[5]:e},P=re;function c(r){var e=r.toString(16);return e.length===1?"0"+e:e}function j(r){return c(Math.round(r*255))}function ne(r,e,n){return P("#"+j(r)+j(e)+j(n))}function k(r,e,n){return y(r,e,n,ne)}function te(r,e,n){if(typeof r=="number"&&typeof e=="number"&&typeof n=="number")return k(r,e,n);if(typeof r=="object"&&e===void 0&&n===void 0)return k(r.hue,r.saturation,r.lightness);throw new s(1)}function ae(r,e,n,t){if(typeof r=="number"&&typeof e=="number"&&typeof n=="number"&&typeof t=="number")return t>=1?k(r,e,n):"rgba("+y(r,e,n)+","+t+")";if(typeof r=="object"&&e===void 0&&n===void 0&&t===void 0)return r.alpha>=1?k(r.hue,r.saturation,r.lightness):"rgba("+y(r.hue,r.saturation,r.lightness)+","+r.alpha+")";throw new s(2)}function T(r,e,n){if(typeof r=="number"&&typeof e=="number"&&typeof n=="number")return P("#"+c(r)+c(e)+c(n));if(typeof r=="object"&&e===void 0&&n===void 0)return P("#"+c(r.red)+c(r.green)+c(r.blue));throw new s(6)}function $(r,e,n,t){if(typeof r=="string"&&typeof e=="number"){var a=m(r);return"rgba("+a.red+","+a.green+","+a.blue+","+e+")"}else{if(typeof r=="number"&&typeof e=="number"&&typeof n=="number"&&typeof t=="number")return t>=1?T(r,e,n):"rgba("+r+","+e+","+n+","+t+")";if(typeof r=="object"&&e===void 0&&n===void 0&&t===void 0)return r.alpha>=1?T(r.red,r.green,r.blue):"rgba("+r.red+","+r.green+","+r.blue+","+r.alpha+")"}throw new s(7)}var fe=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},ie=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&typeof e.alpha=="number"},ue=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},oe=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&typeof e.alpha=="number"};function L(r){if(typeof r!="object")throw new s(8);if(ie(r))return $(r);if(fe(r))return T(r);if(oe(r))return ae(r);if(ue(r))return te(r);throw new s(8)}function N(r,e,n){return function(){var a=n.concat(Array.prototype.slice.call(arguments));return a.length>=e?r.apply(this,a):N(r,e,a)}}function x(r){return N(r,r.length,[])}function I(r,e,n){return Math.max(r,Math.min(e,n))}function de(r,e){if(e==="transparent")return e;var n=z(e);return L(h({},n,{lightness:I(0,1,n.lightness-parseFloat(r))}))}var se=x(de),ye=se;function A(r){if(r==="transparent")return 0;var e=m(r),n=Object.keys(e).map(function(i){var u=e[i]/255;return u<=.03928?u/12.92:Math.pow((u+.055)/1.055,2.4)}),t=n[0],a=n[1],f=n[2];return parseFloat((.2126*t+.7152*a+.0722*f).toFixed(3))}function me(r,e){var n=A(r),t=A(e);return parseFloat((n>t?(n+.05)/(t+.05):(t+.05)/(n+.05)).toFixed(2))}function pe(r,e){if(e==="transparent")return e;var n=z(e);return L(h({},n,{lightness:I(0,1,n.lightness+parseFloat(r))}))}var ce=x(pe),ve=ce;function be(r,e){if(e==="transparent")return e;var n=m(e),t=typeof n.alpha=="number"?n.alpha:1,a=h({},n,{alpha:I(0,1,(t*100+parseFloat(r)*100)/100)});return $(a)}var le=x(be),we=le;function he(r,e){if(e==="transparent")return e;var n=m(e),t=typeof n.alpha=="number"?n.alpha:1,a=h({},n,{alpha:I(0,1,+(t*100-parseFloat(r)*100).toFixed(2)/100)});return $(a)}var ge=x(he),ke=ge;export{h as _,ve as a,ke as b,ye as c,W as d,we as e,me as g,$ as r};
//# sourceMappingURL=polished.esm-d698528e.js.map
