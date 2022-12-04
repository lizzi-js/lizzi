(()=>{"use strict";var e={979:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(558),s=n.n(i),r=n(361),o=n.n(r)()(s());o.push([e.id,'/*\n! tailwindcss v3.2.4 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: \'\';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user\'s configured `sans` font-family by default.\n5. Use the user\'s configured `sans` font-feature-settings by default.\n*/\n\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */\n  font-feature-settings: normal; /* 5 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user\'s configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type=\'button\'],\n[type=\'reset\'],\n[type=\'submit\'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type=\'search\'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user\'s configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role="button"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don\'t get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden] {\n  display: none;\n}\n\n*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n.absolute {\n  position: absolute;\n}\n.relative {\n  position: relative;\n}\n.mx-1 {\n  margin-left: 0.25rem;\n  margin-right: 0.25rem;\n}\n.mt-2 {\n  margin-top: 0.5rem;\n}\n.flex {\n  display: flex;\n}\n.hidden {\n  display: none;\n}\n.h-full {\n  height: 100%;\n}\n.w-full {\n  width: 100%;\n}\n.w-\\[15rem\\] {\n  width: 15rem;\n}\n.flex-grow {\n  flex-grow: 1;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.flex-col {\n  flex-direction: column;\n}\n.gap-1 {\n  gap: 0.25rem;\n}\n.overflow-auto {\n  overflow: auto;\n}\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n.border {\n  border-width: 1px;\n}\n.bg-orange-300 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(253 186 116 / var(--tw-bg-opacity));\n}\n.bg-sky-300 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(125 211 252 / var(--tw-bg-opacity));\n}\n.bg-sky-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(240 249 255 / var(--tw-bg-opacity));\n}\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n.pb-2 {\n  padding-bottom: 0.5rem;\n}\n.text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n.font-bold {\n  font-weight: 700;\n}\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n',""]);const a=o},361:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,r){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var d=this[a][0];null!=d&&(o[d]=!0)}for(var l=0;l<e.length;l++){var h=[].concat(e[l]);i&&o[h[0]]||(void 0!==r&&(void 0===h[5]||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=r),n&&(h[2]?(h[1]="@media ".concat(h[2]," {").concat(h[1],"}"),h[2]=n):h[2]=n),s&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=s):h[4]="".concat(s)),t.push(h))}},t}},558:e=>{e.exports=function(e){return e[1]}},487:e=>{var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var r={},o=[],a=0;a<e.length;a++){var d=e[a],l=i.base?d[0]+i.base:d[0],h=r[l]||0,c="".concat(l," ").concat(h);r[l]=h+1;var u=n(c),m={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==u)t[u].references++,t[u].updater(m);else{var p=s(m,i);i.byIndex=a,t.splice(a,0,{identifier:c,updater:p,references:1})}o.push(c)}return o}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var r=i(e=e||[],s=s||{});return function(e){e=e||[];for(var o=0;o<r.length;o++){var a=n(r[o]);t[a].references--}for(var d=i(e,s),l=0;l<r.length;l++){var h=n(r[l]);0===t[h].references&&(t[h].updater(),t.splice(h,1))}r=d}}},52:e=>{var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},469:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},10:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},631:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},329:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={id:i,exports:{}};return e[i](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{class e{destroy(){for(const e of this.destructors)e.destroy();return this.destructors.clear(),this}add(...e){for(const t of e)this.destructors.add(t);return this}addFn(...e){this.add(...e.map(t))}constructor(...e){this.destructors=new Set,this.add(...e)}}function t(e){return{destroy:e}}class i{run(...e){return this.willRunOnce&&this.remove(),this.fn.call(this.target,...e),this}remove(){this.destroy()}destroy(){return this.target.removeListener(this.fn),this}constructor(e,t,n=!1){this.target=e,this.fn=t,this.willRunOnce=n}}class s{constructor(){this.listenersMap=new Map}addListener(e){const t=new i(this,e);return this.listenersMap.set(e,t),t}addListenerOnce(e){const t=new i(this,e,!0);return this.listenersMap.set(e,t),t}removeListener(e){this.listenersMap.delete(e)}removeAllListeners(){this.listenersMap.clear()}emit(...e){const t=Array.from(this.listenersMap.values());for(let n of t)n.run(...e)}countListeners(){return this.listenersMap.size}}class r extends s{constructor(){super(...arguments),this.onAddListener=new s,this.onRemoveListener=new s}addListener(e){const t=super.addListener(e);return this.onAddListener.emit(t),t}addListenerOnce(e){const t=super.addListenerOnce(e);return this.onAddListener.emit(t),t}removeListener(e){const t=this.listenersMap.get(e);void 0!==t&&(super.removeListener(e),this.onRemoveListener.emit(t))}removeAllListeners(){const e=this.listenersMap.values();super.removeAllListeners(),Array.from(e).forEach((e=>{this.onRemoveListener.emit(e)}))}}class o{static run(e){return new o(e.value,e.value,e)}constructor(e,t,n){this.value=e,this.last=t,this.target=n}}class a{stackCount(){return this.variableStack.size}destroy(){for(const e of this.variableStack)e.onChange.removeListener(this.onChange)}isolate(e){const t=new Set;d.runIsolated((e=>{t.add(e),this.variableStack.delete(e)||e.onChange.addListener(this.onChange)}),e);for(const e of this.variableStack)e.onChange.removeListener(this.onChange);this.variableStack=t}constructor(e){this.variableStack=new Set,this.onChange=e}}const d=new class extends s{constructor(){super(...arguments),this.listenersMap=new Map}isolateState(e){const t=Array.from(this.listenersMap.entries());this.listenersMap.clear(),e(),this.listenersMap=new Map(t)}runIsolated(e,t){this.isolateState((()=>{this.addListener((t=>{this.isolateState((()=>{e(t)}))})),t()}))}createIsolator(e){return new a(e)}};class l{get value(){return d.emit(this),this._value}set value(e){if(this._value!==e){let t=new o(e,this._value,this);this._value=e,this.onChange.emit(t)}}[Symbol.toPrimitive](){return this.value}toJSON(){return this.value}constructor(e){this.onChange=new r,this._value=e}}class h extends l{checkType(e){return!0}testValue(e){if(!this.checkType(e))throw new TypeError(e+" is not match type "+this.constructor.name)}get value(){return d.emit(this),this._value}set value(e){if(this._value!==e){this.testValue(e);let t=new o(e,this._value,this);this._value=e,this.onChange.emit(t)}}constructor(e){super(e),this.testValue(e)}}class c extends h{checkType(e){return"string"==typeof e}}class u{destroy(){this._isWatching=!1,this._onStopWatching.emit(this._isWatching),this.destructionStack.destroy()}get isWatching(){return this._isWatching}onChangeListenersCount(){const e=this.events.reduce(((e,t)=>e+t.countListeners()),0);e>0&&!1===this._isWatching?(this._isWatching=!0,this._onStartWatching.emit(this._isWatching)):0===e&&!0===this._isWatching&&(this._isWatching=!1,this._onStopWatching.emit(this._isWatching))}onStartWatching(e){return this._onStartWatching.addListener(e)}onStopWatching(e){return this._onStopWatching.addListener(e)}constructor(...t){this.destructionStack=new e,this._onStartWatching=new r,this._onStopWatching=new r,this.events=t,this._isWatching=!1;for(const e of t)this.destructionStack.add(e.onAddListener.addListener((()=>this.onChangeListenersCount())),e.onRemoveListener.addListener((()=>this.onChangeListenersCount())));this.onChangeListenersCount()}}function m(t,...n){const i=new e,s=new u(...n);return s.onStartWatching((()=>{i.add(t())})),s.onStopWatching((()=>{i.destroy()})),s}function p(e){return e instanceof l?e:new l(e)}const f=(e,t,n)=>{"function"==typeof e&&(e=z(e));const i=p(e),s=p(t),r=p(n);return z((()=>Boolean(i.value)?s.value:r.value))};class v{constructor(e,t,n){this.added=e,this.index=t,this.target=n}}class b{constructor(e,t,n){this.removed=e,this.index=t,this.target=n}}class g extends l{constructor(){super(...arguments),this.onAdd=new r,this.onRemove=new r}*[Symbol.iterator](){for(let e of this.toArray())yield e}toArray(){return d.emit(this),this._value}get length(){return this.toArray().length}get value(){return this.toArray()}setItemsListener(t,n=(()=>{})){const i=new Map,s=this.onAdd.addListener((e=>{const n=t.call(this,e.added,this);n&&i.set(e.added,n)})),r=this.onRemove.addListener((e=>{const t=i.get(e.removed);t&&(t.destroy(),i.delete(e.removed)),n.call(this,e.removed,this)})),o=new e(s,r);return this.toArray().forEach(((e,t)=>s.run(new v(e,t,this)))),o.addFn((()=>{this.toArray().forEach((e=>r.run(new b(e,0,this))))})),o}filter(e,...t){return new y((()=>this.toArray().filter(((t,n)=>e(t,n,this)))),...t)}includes(e){return z(e instanceof l?()=>this.toArray().includes(e.value):()=>this.toArray().includes(e))}find(e,...t){return z((()=>this.toArray().find(((t,n)=>e(t,n,this)))),...t)}sort(e,...t){return new y((()=>this.toArray().slice().sort(e)),...t)}join(e=""){const t=p(e);return z((()=>this.value.join(t.value)))}map(e,...t){return new x(this,e,t)}}class w extends g{add(e,t){void 0===t&&(t=this._value.length),this._value.splice(t,0,...e);for(let n=0;n<e.length;n++)this.onAdd.emit(new v(e[n],t+n,this));return this.onChange.emit(new o(this._value,this._value,this)),this}addBefore(e,t){let n=this._value.indexOf(t);return-1===n?this:this.add(e,n)}addAfter(e,t){let n=this._value.indexOf(t);return-1===n?this:this.add(e,n+1)}removeAll(){const e=this._value;this._value=[];for(let t=0;t<e.length;t++)this.onRemove.emit(new b(e[t],0,this));return this.onChange.emit(new o(this._value,this._value,this)),this}remove(e){for(let t of e){let e=this._value.indexOf(t);if(-1!==e){const t=this._value.splice(e,1);this.onRemove.emit(new b(t[0],e,this))}}return this.onChange.emit(new o(this._value,this._value,this)),this}removeByIndex(e){if(void 0!==this._value[e]){const t=this._value.splice(e,1);this.onRemove.emit(new b(t[0],e,this)),this.onChange.emit(new o(this._value,this._value,this))}return this}has(e){return this._value.includes(e)}_silentReplace(e){let t=0,n=0;const i=this._value;this._value=e.slice();for(let s=0;s<e.length;s++){const r=i.indexOf(e[s],t);if(-1!==r){for(let e=t;e<r;e++)this.onRemove.emit(new b(i[e],t-n,this));n+=r-t,t=r+1}}for(let e=t;e<i.length;e++)this.onRemove.emit(new b(i[e],t-n,this));t=0;for(let n=0;n<e.length;n++){const s=i.indexOf(e[n],t);-1===s?this.onAdd.emit(new v(e[n],n,this)):t=s+1}}replace(e){return this._silentReplace(e),this.onChange.emit(new o(this._value,this._value,this)),this}refresh(){return this.onChange.emit(new o(this._value,this._value,this)),this}toArray(){return d.emit(this),this._value}get value(){return this.toArray()}set value(e){this.replace(e)}constructor(e=[]){super(e.slice())}}class y extends g{get value(){return this.toArray()}set value(e){throw new SyntaxError("You can not set compute array value")}toArray(){return d.emit(this),this.sourceArray.value}_silentReplace(e){let t=0,n=0;const i=this._value;this._value=e.slice();for(let s=0;s<e.length;s++){const r=i.indexOf(e[s],t);if(-1!==r){for(let e=t;e<r;e++)this.onRemove.emit(new b(i[e],t-n,this));n+=r-t,t=r+1}}for(let e=t;e<i.length;e++)this.onRemove.emit(new b(i[e],t-n,this));t=0;for(let n=0;n<e.length;n++){const s=i.indexOf(e[n],t);-1===s?this.onAdd.emit(new v(e[n],n,this)):t=s+1}}replace(e){return this._silentReplace(e),this.onChange.emit(new o(this._value,this._value,this)),this}constructor(e,...t){super([]),m((()=>(this._value=this.sourceArray.value,this.sourceArray.onChange.addListener((()=>{this.replace(this.sourceArray.value)})))),this.onAdd,this.onChange,this.onRemove),this.sourceArray=new _(e,...t)}}class x extends g{add(e,t){if(void 0===t&&(t=this._value.length),this._value.splice(t,0,...e),this._isSilent)return this;for(let n=0;n<e.length;n++)this.onAdd.emit(new v(e[n],t+n,this));return this}removeByIndex(e){if(void 0!==this._value[e]){const t=this._value.splice(e,1);if(this._isSilent)return this;this.onRemove.emit(new b(t[0],e,this))}return this}get value(){return this.toArray()}set value(e){throw new SyntaxError("You can not set mapped array value")}toArray(){return d.emit(this),this.eventObserver.isWatching||this.mappedArray.replace(this.sourceArray.toArray()),this._value}refresh(){return this.mappedArray.replace(this.sourceArray.toArray()),this}constructor(t,n,i){super([]),this._isSilent=!1,this.sourceArray=t,this.mappedArray=new w([]),this.mapFn=n,this.mappedArray.onAdd.addListener((e=>{const t=n(e.added,e.index,this.sourceArray);this.add([t],e.index)})),this.mappedArray.onRemove.addListener((e=>{this.removeByIndex(e.index)})),this.eventObserver=m((()=>{this._isSilent=!0,this.refresh(),this._isSilent=!1;const n=new e(t.onChange.addListener((e=>{this.onChange.emit(new o(this._value,this._value,this))})),t.onAdd.addListener((e=>{this.mappedArray.add([e.added],e.index)})),t.onRemove.addListener((e=>{this.mappedArray.removeByIndex(e.index)})));for(let e of i)e instanceof r?n.add(e.addListener((()=>{this.mappedArray.removeAll(),this.refresh(),this.onChange.emit(new o(this._value,this._value,this))}))):e.onChange instanceof r&&n.add(e.onChange.addListener((()=>{this.mappedArray.removeAll(),this.refresh(),this.onChange.emit(new o(this._value,this._value,this))})));return n}),this.onAdd,this.onChange,this.onRemove)}}class _ extends l{destroy(){this.eventObserver.destroy()}get value(){return d.emit(this),this.eventObserver.isWatching||(this._value=this._fn.apply(this)),this._value}set value(e){throw new SyntaxError("You can not set compute value")}constructor(t,...n){super(void 0),this._fn=t,this.eventObserver=m((()=>{const t=()=>{let e;if(i.isolate((()=>{e=this._fn.apply(this)})),0===i.stackCount())throw TypeError("You forgot to get zzReactive values inside compute function");if(this._value!==e){let t=new o(e,this._value,this);this._value=e,this.onChange.emit(t)}},i=d.createIsolator(t);if(i.isolate((()=>{this._value=this._fn.apply(this)})),0===i.stackCount())throw TypeError("You forgot to get zzReactive values inside compute function");const s=new e(i);for(let e of n)e instanceof r?s.add(e.addListener(t)):e.onChange instanceof r&&s.add(e.onChange.addListener(t));return s}),this.onChange)}}function z(e,...t){return new _(e,...t)}class C extends h{setItemListener(e){let t=null;return this.onChange.addListener((n=>{null!==t&&(t.destroy(),t=null),null!==n.value&&(t=e(n.value))})).run(new o(this.value,null,this))}checkType(e){return"object"==typeof e}getValue(e){return z((()=>this.value?this.value[e]:void 0),this)}constructor(e=null){super(e)}}class A{run(...e){return this.params[1](...e),this}remove(){this.destroy()}destroy(){let e=this.object.off||this.object.removeEventListener||this.object.removeListener;return e&&e.call(this.object,...this.params),this}constructor(e,...t){this.object=e,this.params=t;let n=e.on||e.addEventListener||e.addListener;n&&n.call(e,...t)}}const k=Symbol();class S{constructor(){this._onMount=new s,this._unmountStack=new e,this.parentNode=null,this.childNodes=[],this.rootNodes=[],this._viewState="unmounted",this._elements=[]}_appendElement(e,t){var n;const i=e.getNodes(),s=this._elements[0],r=t?t.getFirstNode():s;for(let e of i)null===(n=s.parentNode)||void 0===n||n.insertBefore(e,r)}appendChild(e){return null!==e.parentNode&&e.parentNode.removeNode(e),e.parentNode=this,this.childNodes.push(e),this._appendElement(e,null),"mounted"===this._viewState&&e.mount(),this}append(e){if(Array.isArray(e)){const t=e.map((e=>R(e)));for(let e of t)e&&this.appendChild(e)}else if(e){const t=R(e);t&&this.appendChild(t)}return this}insertBefore(e,t){if(null!==e.parentNode&&e.parentNode.removeNode(e),!t)return this.appendChild(e);const n=this.childNodes.indexOf(t);return-1!==n&&(e.parentNode=this,this.childNodes.splice(n,0,e),this._appendElement(e,t),"mounted"===this._viewState&&e.mount()),this}_removeElement(e){var t;const n=e.getNodes();for(let e of n)null===(t=e.parentNode)||void 0===t||t.removeChild(e)}removeNode(e){if(e.parentNode===this){e.unmount();const t=this.childNodes.indexOf(e);-1!==t&&(this.childNodes.splice(t,1),e.parentNode=null,this._removeElement(e))}return this}remove(e){for(let t of e)this.removeNode(t);return this}removeAllChilds(){const e=this.childNodes.slice();for(let t of e)this.removeNode(t);return this}findParent(e){for(let t=this.parentNode;t;t=t.parentNode)if(e(t))return t;return null}parentContext(e){const t=this.findParent((t=>t instanceof e));if(!t)throw new Error("Class "+this.constructor.name+" should have parent Node "+e.name);return t}*findChilds(e){for(let t of this.childNodes)e(t)?yield t:yield*t.findChilds(e)}*findNodes(e){yield*this.findChilds((t=>t instanceof e))}findChildNodes(e){return Array.from(this.findChilds((t=>t instanceof e)))}getNodes(){let e=[];for(let t of this.childNodes)e=e.concat(t.getNodes());return e.concat(this._elements)}getFirstNode(){return this.childNodes.length>0?this.childNodes[0].getFirstNode():this._elements[0]}getFirstElement(){for(const e of this.childNodes){const t=e.getFirstElement();if(t)return t}return this._elements.find((e=>e instanceof Element))}setNodes(e){this._elements=e}mount(){if("in-unmount-process"!==this._viewState){if("unmounted"===this._viewState){this._onMount.emit(this),this._viewState="mounted";for(let e of this.childNodes.slice())e.mount()}}else console.trace(this,"unmount in progress, you should wait finish it")}unmount(){if("mounted"===this._viewState){this._viewState="in-unmount-process";for(let e of this.childNodes.slice())e.unmount();this._unmountStack.destroy(),this._viewState="unmounted"}}onMount(e){return this._onMount.addListener(e),this}onceUnmount(e){return this._unmountStack.addFn(e),this}addToUnmount(...e){return this._unmountStack.add(...e),this}callChildrenFunc(e){return"function"==typeof e?e(this):e}}S[k]=!0;class L extends S{constructor({children:e}){super();const t=Array.isArray(e)?new g(e).join(""):e;if(t instanceof l){const e=document.createTextNode("");this.setNodes([e]),this.onMount((()=>{this.addToUnmount(t.onChange.addListener((()=>{e.data=t.value}))),e.data=t.value}))}else this.setNodes([document.createTextNode(String(t))])}}class N extends S{constructor({children:e}){super(),this.setNodes([document.createTextNode("")]),e instanceof g?this.onMount((()=>{const t=[];for(let n of e)this.appendChild(n),t.push(n);this.addToUnmount(e.onAdd.addListener((e=>{this.insertBefore(e.added,t[e.index]),t.splice(e.index,0,e.added)})),e.onRemove.addListener((e=>{this.removeNode(e.removed),t.splice(e.index,1)}))),this.onceUnmount((()=>{this.removeAllChilds()}))})):this.append(e)}}class M extends S{constructor({children:e}){super(),this.setNodes([document.createTextNode("")]),e instanceof l?this.onMount((()=>{this.addToUnmount(e.onChange.addListener((e=>{e.last&&this.removeNode(e.last),e.value&&this.appendChild(e.value)}))),e.value&&this.appendChild(e.value),this.onceUnmount((()=>{this.removeAllChilds()}))})):this.appendChild(e)}}const R=e=>{if(e instanceof g||Array.isArray(e))return new N({children:e});if(e instanceof C)return new M({children:e});if("boolean"==typeof e||"string"==typeof e||"number"==typeof e||e instanceof l)return new L({children:e});if("function"==typeof e)throw Error("To pass function to children you have to use this.callChildrenFunc(children) inside the Component");return e};class E extends S{constructor({children:e}={}){super(),this.element=document.createTextNode(""),this.setNodes([this.element]),this.append(e)}}const T=(e,t=!1)=>function(e,t,n=!1){return i=>{i.addToUnmount(new A(i.element,e,t,n))}}("click",e,t);function O(e){if("string"==typeof e||"number"==typeof e)return new w([e]);if("function"==typeof e)return new w([z(e)]);if(Array.isArray(e))return new w(e.map((e=>"function"==typeof e?z(e):e)));if(e instanceof g)return e;if(e instanceof l)return new w([e]);throw new Error("wrong input type")}function j(e,t){return n=>{const i=n.element;let s=O(t).join();n.addToUnmount(s.onChange.addListener((()=>{const t=s.value;""===t?i.style.removeProperty(e):i.style.setProperty(e,t)})).run())}}function F(e,t){return n=>{const i=n.element;if(console.log(e,t),void 0===t)return;if("string"==typeof t||"number"==typeof t)return void i.setAttribute(e,String(t));if("boolean"==typeof t)return void(t&&i.setAttribute(e,""));Array.isArray(t)&&(t=new w(t)),t instanceof g&&(t=t.join()),"function"==typeof t&&(t=z(t));const s=t;n.addToUnmount(s.onChange.addListener((()=>{const t=s.value;console.log(t),t||""===t?!0===t?i.setAttribute(e,""):i.setAttribute(e,String(t)):i.removeAttribute(e)})).run())}}function W(e){return t=>{const n=O(e),i=t.element,s=i.classList;i.className="",t.addToUnmount(n.setItemsListener((e=>{if(e instanceof l)return e.onChange.addListener((e=>{e.last&&String(e.last).split(/\s+/).forEach((e=>""!==e&&s.remove(e))),e.value&&String(e.value).split(/\s+/).forEach((e=>""!==e&&s.add(e)))})).run(o.run(e));String(e).split(/\s+/).forEach((e=>""!==e&&s.add(e)))})))}}class I extends S{constructor(e){super(),this.element=e,this.setNodes([this.element])}_appendElement(e,t){const n=e.getNodes(),i=t?t.getFirstNode():null;for(let e of n)this.element.insertBefore(e,i)}getNodes(){return this._elements}getFirstNode(){return this.element}_createElement(e){throw new Error("rewrite _createElement method")}}class U extends I{constructor(e,t){super(document.createElement(e)),this.append(t.children),this._initAttributes(t)}_initAttributes(e){for(let t in e)switch(t.toLocaleLowerCase()){case"children":break;case"class":this.onMount(W(e.class));break;case"style":for(let t in e.style)this.onMount(j(t,e.style[t]));break;case"use":for(let t of e.use)this.onMount(t);break;default:if(t.startsWith("on")&&"function"==typeof e[t]){console.warn(`using ${t} is deprecated,\nuse 'use={[onEvent('${t.toLocaleLowerCase().slice(2)}', event_function]}' instread`);break}this.onMount(F(t,e[t]))}}}class P extends I{constructor(e,t){super(document.createElementNS("http://www.w3.org/2000/svg",e)),this.append(t.children),this._initAttributes(t)}_initAttributes(e){for(let t in e)switch(t.toLocaleLowerCase()){case"children":break;case"class":this.onMount(W(e.class));break;case"style":for(let t in e.style)this.onMount(j(t,e.style[t]));break;case"use":for(let t of e.use)this.onMount(t);break;default:if(t.startsWith("on")&&"function"==typeof e[t]){console.warn(`using ${t} is deprecated, use 'use={[onEvent('${t.toLocaleLowerCase().slice(2)}', event_function)]}' instread`);break}this.onMount(F(t,e[t]))}}}const B=new Set(["animate","animateMotion","animateTransform","circle","clipPath","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","title","tspan","use","view"]),q=(e,t)=>H(e,t),H=(e,t)=>{if("string"==typeof e)return B.has(e)||t.svg?new P(e,t):new U(e,t);if("function"==typeof e)return e[k]?new e(t):e(t);throw new Error("JSX constructor should be string, HTML tag or ViewNode constructor")};var V=n(487),D=n.n(V),Y=n(631),Z=n.n(Y),G=n(52),$=n.n(G),J=n(10),X=n.n(J),K=n(469),Q=n.n(K),ee=n(329),te=n.n(ee),ne=n(979),ie={};ie.styleTagTransform=te(),ie.setAttributes=X(),ie.insert=$().bind(null,"head"),ie.domAPI=Z(),ie.insertStyleElement=Q(),D()(ne.Z,ie),ne.Z&&ne.Z.locals&&ne.Z.locals;class se extends E{constructor({name:e,embed:t}){super(),this.append(q("a",Object.assign({class:["rounded-lg px-2 py-1 cursor-pointer mx-1",f((()=>de.value===t),"bg-orange-300","")],use:[T((()=>de.value=t))]},{children:e})))}}function re({name:e}){return q("h2",Object.assign({class:["bg-sky-300 px-3 py-1 mt-2 font-bold text-lg"]},{children:e}))}function oe({name:e}){return q("h3",Object.assign({class:["px-3 py-1 mt-2 font-bold"]},{children:e}))}class ae extends E{constructor(e){super(),this.append(q("iframe",{src:e+"?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark&module=%2Fsrc%2Fapp.tsx",style:{position:"relative",width:"100%",height:"100%",border:0,"border-radius":"4px",overflow:"hidden"},allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}))}}const de=new class extends c{constructor(e=""){super(e)}},le=new C;var he;de.onChange.addListener((()=>{de.value&&(le.value=new ae(de.value))})),he=H("div",Object.assign({class:"flex w-full h-full absolute"},{children:[H("div",Object.assign({class:"w-[15rem] bg-gray h-full relative flex flex-col gap-1 bg-sky-50\toverflow-auto pb-2"},{children:[q(re,{name:"Lizzi core"}),q(oe,{name:"Reactive variables basics:"}),q(se,{name:"1. Reactive variable",embed:"https://codesandbox.io/embed/lizzi-reactive-0-nz57ng"}),q(se,{name:"2. onChange variable event",embed:"https://codesandbox.io/embed/lizzi-reactive-1-t0imix"}),q(se,{name:"3. Send pointers inside function",embed:"https://codesandbox.io/embed/lizzi-reactive-2-b-ibw36z"}),q(se,{name:"4. Reactive relations",embed:"https://codesandbox.io/embed/lizzi-reactive-2-o73wqj"}),q(oe,{name:"Reactive array basics:"}),q(se,{name:"1. Reactive array",embed:"https://codesandbox.io/embed/lizzi-reactive-3-w2fpuq"}),q(se,{name:"2.\n      zzArray filter",embed:"https://codesandbox.io/embed/lizzi-reactive-4-a-74xycb"}),q(se,{name:"3. zzArray sort",embed:"https://codesandbox.io/embed/lizzi-reactive-4-b-u7k6kx"}),q(se,{name:"4. zzArray map",embed:"https://codesandbox.io/embed/lizzi-reactive-4-c-ztkz0l"}),q(se,{name:"5. zzArray join",embed:"https://codesandbox.io/embed/lizzi-reactive-4-d-4qwubp"}),q(oe,{name:"Reactive array advanced:"}),q(se,{name:"1. Smart adds/removes",embed:"https://codesandbox.io/embed/lizzi-reactive-5-b-bwbysr"}),q(se,{name:"2. Сhains of arrays",embed:"https://codesandbox.io/embed/lizzi-reactive-5-wuq392"}),q(oe,{name:"Event basics:"}),q(se,{name:"1. Add / remove listener",embed:"https://codesandbox.io/embed/lizzi-events-2-08xtys"}),q(re,{name:"Lizzi templates"}),q(oe,{name:"Template basics:"}),q(se,{name:"1. Hello world!",embed:"https://codesandbox.io/embed/lizzi-template-1-ljggzn"}),q(se,{name:"2. Click button event",embed:"https://codesandbox.io/embed/lizzi-template-1-0-a-8o5x63"}),q(se,{name:"3. Counter",embed:"https://codesandbox.io/embed/lizzi-template-1-c-2c10bd"}),q(se,{name:"4. If / Else component",embed:"https://codesandbox.io/embed/lizzi-template-1-b-v4bbh1"}),q(oe,{name:"HTML attributes:"}),q(se,{name:"1. Reactive style",embed:"https://codesandbox.io/embed/lizzi-template-1-0-c-iogsro"}),q(se,{name:"2. Reactive class",embed:"https://codesandbox.io/embed/lizzi-template-1-0-b-0hbxrf"}),q(se,{name:"3. Reactive attribute",embed:"https://codesandbox.io/embed/lizzi-template-1-0-d-ifk064"}),q(oe,{name:"Template components:"}),q(se,{name:"1. ViewComponent class",embed:"https://codesandbox.io/embed/lizzi-template-1-a-o0i5jv"}),q(se,{name:"2. Mount and Unmount ViewComponent",embed:"https://codesandbox.io/embed/lizzi-template-1-d-ewseuj"}),q(se,{name:"3. Mount and Unmount <div>",embed:"https://codesandbox.io/embed/lizzi-template-1-d-2-xebhw5"}),q(oe,{name:"Template use events:"}),q(se,{name:"1. use on('event')",embed:"https://codesandbox.io/embed/lizzi-template-2-f-2-w3qkfs"}),q(se,{name:"2. Element use function",embed:"https://codesandbox.io/embed/lizzi-template-2-f-hdwiwy"}),q(se,{name:"3. use EventWrapper sugar",embed:"https://codesandbox.io/embed/lizzi-template-2-f-1-dfm8u7"}),q(se,{name:"4. use timer",embed:"https://codesandbox.io/embed/lizzi-template-2-f-t-3if861"})]})),q("div",Object.assign({class:"flex-grow h-full relative"},{children:le}))]})),new I(document.body).append([he]).mount()})()})();