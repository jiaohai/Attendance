webpackJsonp([4],{"//Fk":function(t,e,n){t.exports={default:n("U5ju"),__esModule:!0}},"2KxR":function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},"82Mu":function(t,e,n){var r=n("7KvD"),o=n("L42u").set,i=r.MutationObserver||r.WebKitMutationObserver,s=r.process,a=r.Promise,c="process"==n("R9M2")(s);t.exports=function(){var t,e,n,u=function(){var r,o;for(c&&(r=s.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(r){throw t?n():e=void 0,r}}e=void 0,r&&r.enter()};if(c)n=function(){s.nextTick(u)};else if(!i||r.navigator&&r.navigator.standalone)if(a&&a.resolve){var l=a.resolve(void 0);n=function(){l.then(u)}}else n=function(){o.call(r,u)};else{var h=!0,f=document.createTextNode("");new i(u).observe(f,{characterData:!0}),n=function(){f.data=h=!h}}return function(r){var o={fn:r,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},CXw9:function(t,e,n){"use strict";var r,o,i,s,a=n("O4g8"),c=n("7KvD"),u=n("+ZMJ"),l=n("RY/4"),h=n("kM2E"),f=n("EqjI"),v=n("lOnJ"),p=n("2KxR"),d=n("NWt+"),m=n("t8x9"),g=n("L42u").set,y=n("82Mu")(),w=n("qARP"),_=n("dNDb"),x=n("iUbK"),k=n("fJUb"),b=c.TypeError,C=c.process,E=C&&C.versions,M=E&&E.v8||"",P=c.Promise,L="process"==l(C),j=function(){},O=o=w.f,R=!!function(){try{var t=P.resolve(1),e=(t.constructor={})[n("dSzd")("species")]=function(t){t(j,j)};return(L||"function"==typeof PromiseRejectionEvent)&&t.then(j)instanceof e&&0!==M.indexOf("6.6")&&-1===x.indexOf("Chrome/66")}catch(t){}}(),S=function(t){var e;return!(!f(t)||"function"!=typeof(e=t.then))&&e},F=function(t,e){if(!t._n){t._n=!0;var n=t._c;y(function(){for(var r=t._v,o=1==t._s,i=0,s=function(e){var n,i,s,a=o?e.ok:e.fail,c=e.resolve,u=e.reject,l=e.domain;try{a?(o||(2==t._h&&T(t),t._h=1),!0===a?n=r:(l&&l.enter(),n=a(r),l&&(l.exit(),s=!0)),n===e.promise?u(b("Promise-chain cycle")):(i=S(n))?i.call(n,c,u):c(n)):u(r)}catch(t){l&&!s&&l.exit(),u(t)}};n.length>i;)s(n[i++]);t._c=[],t._n=!1,e&&!t._h&&I(t)})}},I=function(t){g.call(c,function(){var e,n,r,o=t._v,i=K(t);if(i&&(e=_(function(){L?C.emit("unhandledRejection",o,t):(n=c.onunhandledrejection)?n({promise:t,reason:o}):(r=c.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=L||K(t)?2:1),t._a=void 0,i&&e.e)throw e.v})},K=function(t){return 1!==t._h&&0===(t._a||t._c).length},T=function(t){g.call(c,function(){var e;L?C.emit("rejectionHandled",t):(e=c.onrejectionhandled)&&e({promise:t,reason:t._v})})},G=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),F(e,!0))},N=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw b("Promise can't be resolved itself");(e=S(t))?y(function(){var r={_w:n,_d:!1};try{e.call(t,u(N,r,1),u(G,r,1))}catch(t){G.call(r,t)}}):(n._v=t,n._s=1,F(n,!1))}catch(t){G.call({_w:n,_d:!1},t)}}};R||(P=function(t){p(this,P,"Promise","_h"),v(t),r.call(this);try{t(u(N,this,1),u(G,this,1))}catch(t){G.call(this,t)}},(r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=n("xH/j")(P.prototype,{then:function(t,e){var n=O(m(this,P));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=L?C.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&F(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new r;this.promise=t,this.resolve=u(N,t,1),this.reject=u(G,t,1)},w.f=O=function(t){return t===P||t===s?new i(t):o(t)}),h(h.G+h.W+h.F*!R,{Promise:P}),n("e6n0")(P,"Promise"),n("bRrM")("Promise"),s=n("FeBl").Promise,h(h.S+h.F*!R,"Promise",{reject:function(t){var e=O(this);return(0,e.reject)(t),e.promise}}),h(h.S+h.F*(a||!R),"Promise",{resolve:function(t){return k(a&&this===s?P:this,t)}}),h(h.S+h.F*!(R&&n("dY0y")(function(t){P.all(t).catch(j)})),"Promise",{all:function(t){var e=this,n=O(e),r=n.resolve,o=n.reject,i=_(function(){var n=[],i=0,s=1;d(t,!1,function(t){var a=i++,c=!1;n.push(void 0),s++,e.resolve(t).then(function(t){c||(c=!0,n[a]=t,--s||r(n))},o)}),--s||r(n)});return i.e&&o(i.v),n.promise},race:function(t){var e=this,n=O(e),r=n.reject,o=_(function(){d(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o.e&&r(o.v),n.promise}})},EqBC:function(t,e,n){"use strict";var r=n("kM2E"),o=n("FeBl"),i=n("7KvD"),s=n("t8x9"),a=n("fJUb");r(r.P+r.R,"Promise",{finally:function(t){var e=s(this,o.Promise||i.Promise),n="function"==typeof t;return this.then(n?function(n){return a(e,t()).then(function(){return n})}:t,n?function(n){return a(e,t()).then(function(){throw n})}:t)}})},L42u:function(t,e,n){var r,o,i,s=n("+ZMJ"),a=n("knuC"),c=n("RPLV"),u=n("ON07"),l=n("7KvD"),h=l.process,f=l.setImmediate,v=l.clearImmediate,p=l.MessageChannel,d=l.Dispatch,m=0,g={},y=function(){var t=+this;if(g.hasOwnProperty(t)){var e=g[t];delete g[t],e()}},w=function(t){y.call(t.data)};f&&v||(f=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return g[++m]=function(){a("function"==typeof t?t:Function(t),e)},r(m),m},v=function(t){delete g[t]},"process"==n("R9M2")(h)?r=function(t){h.nextTick(s(y,t,1))}:d&&d.now?r=function(t){d.now(s(y,t,1))}:p?(i=(o=new p).port2,o.port1.onmessage=w,r=s(i.postMessage,i,1)):l.addEventListener&&"function"==typeof postMessage&&!l.importScripts?(r=function(t){l.postMessage(t+"","*")},l.addEventListener("message",w,!1)):r="onreadystatechange"in u("script")?function(t){c.appendChild(u("script")).onreadystatechange=function(){c.removeChild(this),y.call(t)}}:function(t){setTimeout(s(y,t,1),0)}),t.exports={set:f,clear:v}},"NWt+":function(t,e,n){var r=n("+ZMJ"),o=n("msXi"),i=n("Mhyx"),s=n("77Pl"),a=n("QRG4"),c=n("3fs2"),u={},l={};(e=t.exports=function(t,e,n,h,f){var v,p,d,m,g=f?function(){return t}:c(t),y=r(n,h,e?2:1),w=0;if("function"!=typeof g)throw TypeError(t+" is not iterable!");if(i(g)){for(v=a(t.length);v>w;w++)if((m=e?y(s(p=t[w])[0],p[1]):y(t[w]))===u||m===l)return m}else for(d=g.call(t);!(p=d.next()).done;)if((m=o(d,y,p.value,e))===u||m===l)return m}).BREAK=u,e.RETURN=l},SldL:function(t,e){!function(e){"use strict";var n,r=Object.prototype,o=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},s=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag",u="object"==typeof t,l=e.regeneratorRuntime;if(l)u&&(t.exports=l);else{(l=e.regeneratorRuntime=u?t.exports:{}).wrap=_;var h="suspendedStart",f="suspendedYield",v="executing",p="completed",d={},m={};m[s]=function(){return this};var g=Object.getPrototypeOf,y=g&&g(g(R([])));y&&y!==r&&o.call(y,s)&&(m=y);var w=C.prototype=k.prototype=Object.create(m);b.prototype=w.constructor=C,C.constructor=b,C[c]=b.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,C):(t.__proto__=C,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(w),t},l.awrap=function(t){return{__await:t}},E(M.prototype),M.prototype[a]=function(){return this},l.AsyncIterator=M,l.async=function(t,e,n,r){var o=new M(_(t,e,n,r));return l.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},E(w),w[c]="Generator",w[s]=function(){return this},w.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},l.values=R,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,o){return a.type="throw",a.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var s=this.tryEntries[i],a=s.completion;if("root"===s.tryLoc)return r("end");if(s.tryLoc<=this.prev){var c=o.call(s,"catchLoc"),u=o.call(s,"finallyLoc");if(c&&u){if(this.prev<s.catchLoc)return r(s.catchLoc,!0);if(this.prev<s.finallyLoc)return r(s.finallyLoc)}else if(c){if(this.prev<s.catchLoc)return r(s.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return r(s.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var s=i?i.completion:{};return s.type=t,s.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;j(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:R(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),d}}}function _(t,e,n,r){var o=e&&e.prototype instanceof k?e:k,i=Object.create(o.prototype),s=new O(r||[]);return i._invoke=function(t,e,n){var r=h;return function(o,i){if(r===v)throw new Error("Generator is already running");if(r===p){if("throw"===o)throw i;return S()}for(n.method=o,n.arg=i;;){var s=n.delegate;if(s){var a=P(s,n);if(a){if(a===d)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=v;var c=x(t,e,n);if("normal"===c.type){if(r=n.done?p:f,c.arg===d)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}(t,n,s),i}function x(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}function k(){}function b(){}function C(){}function E(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function M(t){var e;this._invoke=function(n,r){function i(){return new Promise(function(e,i){!function e(n,r,i,s){var a=x(t[n],t,r);if("throw"!==a.type){var c=a.arg,u=c.value;return u&&"object"==typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then(function(t){e("next",t,i,s)},function(t){e("throw",t,i,s)}):Promise.resolve(u).then(function(t){c.value=t,i(c)},s)}s(a.arg)}(n,r,e,i)})}return e=e?e.then(i,i):i()}}function P(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,P(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=x(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function R(t){if(t){var e=t[s];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,i=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return i.next=i}}return{next:S}}function S(){return{value:n,done:!0}}}(function(){return this}()||Function("return this")())},U5ju:function(t,e,n){n("M6a0"),n("zQR9"),n("+tPU"),n("CXw9"),n("EqBC"),n("jKW+"),t.exports=n("FeBl").Promise},Xxa5:function(t,e,n){t.exports=n("jyFz")},aJzK:function(t,e){},bRrM:function(t,e,n){"use strict";var r=n("7KvD"),o=n("FeBl"),i=n("evD5"),s=n("+E39"),a=n("dSzd")("species");t.exports=function(t){var e="function"==typeof o[t]?o[t]:r[t];s&&e&&!e[a]&&i.f(e,a,{configurable:!0,get:function(){return this}})}},dNDb:function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},exGp:function(t,e,n){"use strict";e.__esModule=!0;var r,o=n("//Fk"),i=(r=o)&&r.__esModule?r:{default:r};e.default=function(t){return function(){var e=t.apply(this,arguments);return new i.default(function(t,n){return function r(o,s){try{var a=e[o](s),c=a.value}catch(t){return void n(t)}if(!a.done)return i.default.resolve(c).then(function(t){r("next",t)},function(t){r("throw",t)});t(c)}("next")})}}},fJUb:function(t,e,n){var r=n("77Pl"),o=n("EqjI"),i=n("qARP");t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},gpj2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("Xxa5"),o=n.n(r),i=n("exGp"),s=n.n(i),a={name:"check",data:function(){return{msg:"打卡",checkmassege:"未打卡",checkcount:0,showmore:!1,showworkcheck:!0,showoutcheck:!1,showfoot:!0,showcheck:!0,showstatistics:!0,showrule:!0,showsetting:!0,signKey:null,loading:!0,userId:null,range:null,authority:1,showMapImg:"",resultData:{userId:"",username:"",canAttendance:!0,workType:"上班打卡",workTime:"",position:{latitude:"",longitude:"",name:"",address:"",rang:""},attendanceTeam:{name:"",id:""}}}},created:function(){this.getCheckInfo()},methods:{getCheckInfo:function(){this.userId=this.$route.query.userId,this.authority=this.$route.query.authority},getUserInfo:function(){var t=this;return s()(o.a.mark(function e(){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/api/rule/attendance/",{params:{employeeId:t.$route.query.userId}});case 3:n=e.sent,t.tableData=n.data.result,e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),alert("请求出错！");case 11:case"end":return e.stop()}},e,t,[[0,7]])}))()},controlShow:function(){this.showmore=!0},controlHide:function(){this.showmore=!1},changeCheckTpye:function(){this.showworkcheck?(this.showworkcheck=!1,this.showoutcheck=!0):(this.showworkcheck=!0,this.showoutcheck=!1)},getRange:function(t,e,n,r){var o=t*Math.PI/180,i=n*Math.PI/180,s=o-i,a=e*Math.PI/180-r*Math.PI/180,c=2*Math.asin(Math.sqrt(Math.pow(Math.sin(s/2),2)+Math.cos(o)*Math.cos(i)*Math.pow(Math.sin(a/2),2)));return c*=6378.137,c=Math.round(1e4*c)/1e4},openMsg:function(t){this.$confirm(t,"提示",{showCancelButton:!1,showConfirmButton:!1,type:"warning"}).then(function(){}).catch(function(){})},getSignKey:function(){var t=this;this.$axios.get("/groupApi/getSign/",{params:{url:"http://shooturbrain.top:8083/check"}}).then(function(e){e.data.flag&&(t.signKey=e.data.data)}),console.log(this.signKey)},checkOntime:function(){this.checkcount+=1,this.checkmassege=this.checkcount+"次打卡"},gocheck:function(){this.$router.push("/check")},gostatistics:function(){this.$router.push("/statistics")},gorule:function(){this.$router.push("/rule")},gosetting:function(){this.$router.push("/addadmin")},getMyLocation:function(){var t=this;return s()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t,console.log("22222222222222222222"),new qq.maps.Geolocation("5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE","myapp").getLocation(t.getSeccss,t.filde);case 4:case"end":return e.stop()}},e,t)}))()},getSeccss:function(t){this.showMapImg="https://apis.map.qq.com/ws/staticmap/v2/?center="+t.lat+","+t.lng+"&zoom=18&size=500*300&maptype=roadmap&scale=2&markers=size:large|color:red|"+t.lat+","+t.lng+"&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE",this.loading=!1,this.range=this.getRange(t.lat,t.lng,29.612842034,106.503453517)},filde:function(){this.loading=!1,this.openMsg("定位失败")}},mounted:function(){this.getMyLocation()}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"attendance"},[n("div",{staticClass:"heading"},[t._m(0),t._v(" "),n("div",{staticClass:"title common",staticStyle:{"align-items":"center"}},[t._v(t._s(t.msg))]),t._v(" "),n("div",{staticClass:"more common"},[n("i",{staticClass:"fa fa-ellipsis-v",on:{click:t.controlShow}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showmore,expression:"showmore"}],staticClass:"selectpart"},[n("div",{staticClass:"cover",on:{click:t.controlHide}}),t._v(" "),n("div",{staticClass:"selectlist"},[n("ul",[n("router-link",{staticClass:"menu_li",attrs:{to:"/checkrecord"}},[n("i",{staticClass:"fa fa-bars",staticStyle:{"padding-top":"3px"}}),t._v(" "),n("div",{staticClass:"selectext"},[t._v("\n                打卡记录\n              ")])]),t._v(" "),n("router-link",{staticClass:"menu_li",attrs:{to:"/application"}},[n("i",{staticClass:"fa fa-pencil-square-o",staticStyle:{"padding-top":"3px"}}),t._v(" "),n("div",{staticClass:"selectext"},[t._v("\n                假勤申请\n              ")])]),t._v(" "),n("router-link",{staticClass:"menu_li",attrs:{to:"/checksetting"}},[n("i",{staticClass:"fa fa-cog",staticStyle:{"padding-top":"3px"}}),t._v(" "),n("div",{staticClass:"selectext"},[t._v("\n                打卡设置\n              ")])])],1)])])])]),t._v(" "),n("div",{staticClass:"miding"},[n("div",{staticClass:"manner"},[n("button",{staticClass:"work-check check",on:{click:t.changeCheckTpye}},[n("span",{class:t.showworkcheck?"colortext":"colorcommon"},[t._v("上下班打卡")])]),t._v(" "),n("button",{staticClass:"out-check check",on:{click:t.changeCheckTpye}},[n("span",{class:t.showoutcheck?"colortext":"colorcommon"},[t._v("外出打卡")])])]),t._v(" "),t.showworkcheck?n("div",{staticClass:"operate"},[n("div",{staticClass:"showmpa"},[n("el-image",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"map",attrs:{"element-loading-text":"loading...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",src:t.showMapImg}},[n("div",{attrs:{slot:"error"},slot:"error"})])],1),t._v(" "),n("div",{staticClass:"checkbutton"},[n("div",{staticClass:"buttonline"},[n("button",{staticClass:"workbutton",on:{click:t.checkOntime}},[n("span",[t._v(t._s(t.checkmassege))])])])]),t._v(" "),n("div",{staticClass:"massege"},[t._v("人员信息")])]):t._e(),t._v(" "),t.showoutcheck?n("div",{staticClass:"operate"},[n("div",{staticClass:"showmpa"},[t._v("显示打卡地址")]),t._v(" "),t._m(1),t._v(" "),n("div",{staticClass:"massege"},[t._v("人员信息")])]):t._e()]),t._v(" "),t.showfoot?n("div",{staticClass:"bottoming"},[t.showcheck?n("button",{staticClass:"clock-in bottomchildre",class:-1!==t.$route.path.indexOf("check")?"colortext":"colorcommon",on:{click:t.gocheck}},[n("i",{staticClass:"fa fa-map-marker"}),t._v(" "),n("span",[t._v("打卡")])]):t._e(),t._v(" "),t.showstatistics?n("button",{staticClass:"statistics bottomchildre",class:-1!==t.$route.path.indexOf("statistics")?"colortext":"colorcommon",on:{click:t.gostatistics}},[n("i",{staticClass:"fa fa-pie-chart"}),t._v(" "),n("span",[t._v("统计")])]):t._e(),t._v(" "),t.showrule?n("button",{staticClass:"rule bottomchildre",class:-1!==t.$route.path.indexOf("rule")?"colortext":"colorcommon",on:{click:t.gorule}},[n("i",{staticClass:"fa fa-sliders "}),t._v(" "),n("span",[t._v("规则")])]):t._e(),t._v(" "),t.showsetting?n("button",{staticClass:"setting bottomchildre",class:-1!==t.$route.path.indexOf("addadmin")?"colortext":"colorcommon",on:{click:t.gosetting}},[n("i",{staticClass:"fa fa-cog"}),t._v(" "),n("span",[t._v("设置")])]):t._e()]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"black common"},[e("i",{staticClass:"fa fa-arrow-left"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"checkbutton"},[e("div",{staticClass:"buttonline"},[e("button",{staticClass:"workbutton"},[e("span",[this._v("外出打卡")])])])])}]};var u=n("VU/8")(a,c,!1,function(t){n("aJzK")},null,null);e.default=u.exports},iUbK:function(t,e,n){var r=n("7KvD").navigator;t.exports=r&&r.userAgent||""},"jKW+":function(t,e,n){"use strict";var r=n("kM2E"),o=n("qARP"),i=n("dNDb");r(r.S,"Promise",{try:function(t){var e=o.f(this),n=i(t);return(n.e?e.reject:e.resolve)(n.v),e.promise}})},jyFz:function(t,e,n){var r=function(){return this}()||Function("return this")(),o=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,i=o&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,t.exports=n("SldL"),o)r.regeneratorRuntime=i;else try{delete r.regeneratorRuntime}catch(t){r.regeneratorRuntime=void 0}},knuC:function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},qARP:function(t,e,n){"use strict";var r=n("lOnJ");t.exports.f=function(t){return new function(t){var e,n;this.promise=new t(function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r}),this.resolve=r(e),this.reject=r(n)}(t)}},t8x9:function(t,e,n){var r=n("77Pl"),o=n("lOnJ"),i=n("dSzd")("species");t.exports=function(t,e){var n,s=r(t).constructor;return void 0===s||void 0==(n=r(s)[i])?e:o(n)}},"xH/j":function(t,e,n){var r=n("hJx8");t.exports=function(t,e,n){for(var o in e)n&&t[o]?t[o]=e[o]:r(t,o,e[o]);return t}}});
//# sourceMappingURL=4.d2e5fb3357382c8b16f5.js.map