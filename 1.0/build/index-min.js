/*! jSQL-kissy - v1.0 - 2013-09-27 2:22:47 PM
* Copyright (c) 2013 liuhuo.gk; Licensed  */
KISSY.add("gallery/jSQL-kissy/1.0/index",function(S){return function(){var a=(Array.prototype.slice,Object.prototype.toString);Object.prototype.hasOwnProperty;var b,c,d,e=Array.prototype.forEach,f=Array.isArray,g=Object.keys,h=Array.prototype.indexOf,i=Array.prototype.lastIndexOf,j={},k="jSQL_Key",l={},m={},n={},o={};"undefined"!=typeof this.jSQL&&(c=this.jSQL),"undefined"!=typeof this.jsql&&(d=this.jsql),b=function(){this.init.apply(this,arguments)},b.prototype={version:"0.6.0-dev",init:function(){this._jSQL=c,this._jsql=d,this._DB=l,this._currentDB=null,this._buffer=null,this._currentDBName=null,this._DBIndexMap=m,this._protected=n,this._indexList=null,this._events=o,this.utils=j},create:function(a,b){var c,d=this;if(this._DB.hasOwnProperty(a))throw"DB Already Exist.";if(j.isArray(b)&&(c=j.listSlice(arguments,"2:"),j.appendKey(b,c),m[a]=j.arrayToObject(b),this._indexList=c||null),j.isPlainObject(b)&&(m[a]=j.clone(b),b=j.objectToArray(b)),"string"==typeof b&&b.match(/^http(s)?:\/\//gim)){var e=arguments[2]||"*",f=function(c){b="function"==typeof e?e.call(this,c):"*"===e?c:j.deep(c,e),d._DB[a]=j.clone(b),d._events[a]=d._events[a]||new d.Events,d.trigger(a,"create"),d.trigger(a,"io:success"),d.trigger(a,"io:complete")},g=function(){d._events[a]=d._events[a]||new d.Events,d.trigger(a,"io:error")};return b.match("callback=")?this.io.jsonp(b,{},f,g):this.io.ajax(b,{},f,g),this._events[a]=this._events[a]||new this.Events,this.trigger(a,"io:start"),this}return this._DB[a]=j.clone(b),this._events[a]=this._events[a]||new this.Events,this.trigger(a,"create"),this},use:function(a){if(!this._DB.hasOwnProperty(a))throw"Database Not Exist.";return this._currentDB=this._DB[a],this._currentDBName=a,this.rebase(),this},drop:function(a){return this._DB.hasOwnProperty(a)&&(delete this._DB[a],this.trigger(a,"drop")),this},dbs:function(){return j.keys(this._DB)},db:function(){return this._currentDBName},select:function(a){if(!this._currentDB)throw"Please Select Database First.";return this._protected.field=[].slice.call(j.isArray(a)?a:arguments),"*"===a?this:this},count:function(){var a;return a=this._buffer.length,this.rebase(),a},total:function(a){var b,c=0;for(var d in this._currentDB)this._currentDB.hasOwnProperty(d)&&(b="*"===a?this._currentDB[d]:"function"==typeof a?a.call(this,this._currentDB[d],d)===!0?!0:void 0:j.deep(this._currentDB[d],a),"undefined"!=typeof b&&c++);return c},orderby:function(a,b,c){var d=this._buffer;return"function"!=typeof b&&(b=[c,c=b][0]),d.sort(function(d,e){return d=j.deep(d,a),e=j.deep(e,a),b&&(d=b(d),e=b(e)),c&&"asc"===c.toLowerCase()?d-e:e-d}),this._buffer=d,this._protected.sort=!0,this},where:function(a){var b,c=[];this._buffer=this._buffer||this._currentDB,a=j.parseFn(a);for(var d in this._buffer)if(this._buffer.hasOwnProperty(d)){if("function"==typeof a&&(b=a.call(this,j.clone(this._buffer[d]),d)),j.isArray(a)){b=!1;for(var e in a)a.hasOwnProperty(e)&&a[e].call(this,j.clone(this._buffer[d]),d)&&(b=!0)}b&&c.push(this._buffer[d])}return this._buffer=c,this},iterate:function(a){this._buffer=this._buffer||this._currentDB;for(var b in this._buffer)this._buffer.hasOwnProperty(b)&&a.call(this,this._buffer[b]);return this},findAll:function(){var a;return a=j.clone(j.arrayToObject(this._select())),this.rebase(),a},find:function(a){var b,c=this._DBIndexMap[this._currentDBName];if(!a)for(var d in c)if(c.hasOwnProperty(d)){if(a)break;this._buffer.hasOwnProperty(d)&&(a=d)}return b=j.clone(c[a]),this.rebase(),b},listAll:function(){var a;return a=j.clone(this._select()),this.rebase(),a},update:function(a){var b,c=this.utils.arrayToObject(this._currentDB);if(this._buffer=this._buffer||this._currentDB,!this._currentDB)throw"Please Select Database First.";for(var d in this._buffer)this._buffer.hasOwnProperty(d)&&(b=a.call(this,j.clone(this._buffer[d])),b&&(c[this._buffer[d][k]]=b));return this._currentDB=this.utils.objectToArray(c),this._DB[this._currentDBName]=this.utils.objectToArray(c),this.trigger(this._currentDBName,"update"),this.rebase(),this},insert:function(a,b){var a=j.clone(a),c=arguments[2];return a[k]=a.key||b,c?this._currentDB.splice(c,0,a):this._currentDB.push(a),this.trigger(this._currentDBName,"update"),this.rebase(),this},append:function(a,b){return arguments.length>1?this.use(a):b=arguments[0],b=j.clone(b),j.isArray(b)&&(j.appendKey(b,this._indexList),this._currentDB=this._currentDB.concat(b)),j.isPlainObject(b)&&(this._currentDB=this._currentDB.concat(j.objectToArray(b))),this._DB[this._currentDBName]=this.utils.objectToArray(this._currentDB),this.trigger(this._currentDBName,"update"),this.rebase(),this},remove:function(){var a=this.utils.arrayToObject(this._currentDB);this._buffer=this._buffer||this._currentDB;for(var b in this._buffer)this._buffer.hasOwnProperty(b)&&delete a[this._buffer[b][k]];return this._currentDB=this.utils.objectToArray(a),this._DB[this._currentDBName]=this.utils.objectToArray(a),this.rebase(),this},limit:function(a,b){var c,d=this._buffer;return b||(a=[0,b=a][0]),c=a+":"+(a+b),this._buffer=j.listSlice(d,c),this},keys:function(){return j.keys(this.findAll())},first:function(a){return a?this.where(a).first():j.listSlice(this._select(),":1")},last:function(a){return a?this.where(a).last():j.listSlice(this._select(),"-1:")},distinct:function(){return j.distinct(this.listAll())},rebase:function(){return this._protected={},this.select("*"),this._resetBuffer(),this._updateIndexMap(),this},noConflict:function(){return window.jSQL===b&&(window.jSQL=this._jSQL),window.jsql===jsql&&(window.jsql=this._jsql),this},io:new function(){this.ajax=function(a,b,c,d){var e=[].slice.call(arguments);e.length<4&&e.splice(1,0,{}),a=e[0],b=e[1],c=e[2],d=e[3],b._t=j.uuid(),this.reqwest({url:a,type:"json",method:"get",data:b,success:c,error:d})},this.jsonp=function(a,b,c,d){var e=[].slice.call(arguments);e.length<4&&e.splice(1,0,{}),a=e[0],b=e[1],c=e[2],d=e[3],a.match("callback=")||(a+=a.match(/\?/gim)?a.lastIndexOf("&")===a.length-1?"callback=?&_t="+j.uuid():"&callback=?&_t="+j.uuid():"?callback=?&_t="+j.uuid()),this.reqwest({url:a,type:"jsonp",data:b,success:c,error:d})}},on:function(a,b,c){return this._events[a]=this._events[a]||new this.Events,this._events[a].on(b,c)},off:function(a,b,c){return this._events[a].off(b,c)},trigger:function(a,b){var c=[].slice.call(arguments,1);return this._events.hasOwnProperty(a)?(console.log("%s: trigger - %s",a,b),this._events[a].trigger.apply(this._events[a],c)):!1},alias:function(a){return window[a]=this,this},_select:function(a){var b,c=[];return a=a||this._protected.field,this._protected.sort===!0&&this.trigger(this._currentDBName,"sort"),"*"===a||a.join&&"*"===a.join("")?this._buffer:("string"==typeof a&&(a=a.split(",")),j.each(this._buffer,function(d){return b={},b[k]=j.deep(d,k),1===a.length?(c.push(j.deep(d,a[0])),void 0):(j.each(a,function(a){d.hasOwnProperty(a)&&(b[a.split(".").pop()]=j.deep(d,a))}),c.push(b),void 0)}),c)},_updateIndexMap:function(){m[this._currentDBName]=j.arrayToObject(this._currentDB)},_resetBuffer:function(){this._buffer=this._currentDB}},j={deep:function(a,b){for(var c=a,b=b.split("."),d=0;d<b.length;d++)c=c[b[d]];return c},isArray:f||function(b){return"[object Array]"===a.call(b)},isObject:function(a){return a===Object(a)},isPlainObject:function(a){return this.isObject(a)&&a.constructor===Object},clone:function(a){if(null==a||"object"!=typeof a)return a;var b=new a.constructor;for(var c in a)b[c]=arguments.callee(a[c]);return b},objectToArray:function(a){var b=[],a=this.clone(a);for(var c in a)a.hasOwnProperty(c)&&(a[c][k]=c,b.push(a[c]));return b},arrayToObject:function(a,b){for(var c={},d=0;d<a.length;d++)c[a[d][b||k]]=this.clone(a[d]),delete c[a[d][b||k]][b||k];return c},each:function(a,b){if(e)return a.forEach(b),void 0;for(var c=0;c<a.length;c++)b(a[c],c,a)},keygen:function(a,b){var c=this,d=[].slice.call(arguments,1),e="";return c.isArray(b)&&(d=b),c.each(d,function(b){e+=j.deep(a,b)}),e},listSlice:function(a,b){var c,d;return a=[].slice.call(a),b=b.split(":"),c=b[0]||0,d=b.length>1?b[1]||a.length:a.length,[].slice.call(a,c,d)},appendKey:function(a,b){var c=this;c.each(a,function(a,d){a[k]=c.keygen(a,b)||d})},keys:g||function(){var a=!0,b=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],c=b.length;for(var d in{toString:null})a=!1;return function e(d){if("object"!=typeof d&&"function"!=typeof d||null===d)throw new TypeError("Object.keys called on a non-object");var e=[];for(var f in d)d.hasOwnProperty(f)&&e.push(f);if(a)for(var g=0,h=c;h>g;g++){var i=b[g];d.hasOwnProperty(i)&&e.push(i)}return e}}(),parseFn:function(a){return"string"==typeof a&&(a=a||!0,a=new Function("data","with(data) { return "+a+"; }")),a},indexOf:function(a,b){if(h)return h.apply(a,this.listSlice(arguments,"1:"));var c=a,d=c.length>>>0;if(!d)return-1;var e=0;for(arguments.length>2&&(e=arguments[2]),e=e>=0?e:Math.max(0,d+e);d>e;e++)if(e in c&&c[e]===b)return e;return-1},lastIndexOf:function(a,b){if(i)return i.apply(a,this.listSlice(arguments,"1:"));var c=a,d=c.length>>>0;if(!d)return-1;var e=d-1;for(arguments.length>1&&(e=Math.min(e,toInteger(arguments[1]))),e=e>=0?e:d-Math.abs(e);e>=0;e--)if(e in c&&b===c[e])return e;return-1},uuid:function(){return(new Date).getTime()+"_"+parseInt(1e3*Math.random())},distinct:function(a){for(var b=[],c=0;c<a.length;c++)-1===b.indexOf(a[c])&&b.push(a[c]);return b}},b=new b,"undefined"!=typeof module&&module.exports?module.exports=b:this.jsql=this.jSQL=b}(),!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():"function"==typeof define&&define.amd?define(c):b[a]=c()}("reqwest",jsql.io,function(){function handleReadyState(a,b,c){return function(){return a._aborted?c(a.request):(a.request&&4==a.request[readyState]&&(a.request.onreadystatechange=noop,twoHundo.test(a.request.status)?b(a.request):c(a.request)),void 0)}}function setHeaders(a,b){var c,d=b.headers||{};d.Accept=d.Accept||defaultHeaders.accept[b.type]||defaultHeaders.accept["*"],b.crossOrigin||d[requestedWith]||(d[requestedWith]=defaultHeaders.requestedWith),d[contentType]||(d[contentType]=b.contentType||defaultHeaders.contentType);for(c in d)d.hasOwnProperty(c)&&a.setRequestHeader(c,d[c])}function setCredentials(a,b){"undefined"!=typeof b.withCredentials&&"undefined"!=typeof a.withCredentials&&(a.withCredentials=!!b.withCredentials)}function generalCallback(a){lastValue=a}function urlappend(a,b){return a+(/\?/.test(a)?"&":"?")+b}function handleJsonp(a,b,c,d){var e=uniqid++,f=a.jsonpCallback||"callback",g=a.jsonpCallbackName||reqwest.getcallbackPrefix(e),h=new RegExp("((^|\\?|&)"+f+")=([^&]+)"),i=d.match(h),j=doc.createElement("script"),k=0,l=-1!==navigator.userAgent.indexOf("MSIE 10.0");return i?"?"===i[3]?d=d.replace(h,"$1="+g):g=i[3]:d=urlappend(d,f+"="+g),win[g]=generalCallback,j.type="text/javascript",j.src=d,j.async=!0,"undefined"==typeof j.onreadystatechange||l||(j.event="onclick",j.htmlFor=j.id="_reqwest_"+e),j.onload=j.onreadystatechange=function(){return j[readyState]&&"complete"!==j[readyState]&&"loaded"!==j[readyState]||k?!1:(j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),a.success&&a.success(lastValue),lastValue=void 0,head.removeChild(j),k=1,void 0)},head.appendChild(j),{abort:function(){j.onload=j.onreadystatechange=null,a.error&&a.error({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(j),k=1}}}function getRequest(a,b){var c,d=this.o,e=(d.method||"GET").toUpperCase(),f="string"==typeof d?d:d.url,g=d.processData!==!1&&d.data&&"string"!=typeof d.data?reqwest.toQueryString(d.data):d.data||null;return"jsonp"!=d.type&&"GET"!=e||!g||(f=urlappend(f,g),g=null),"jsonp"==d.type?handleJsonp(d,a,b,f):(c=xhr(),c.open(e,f,!0),setHeaders(c,d),setCredentials(c,d),c.onreadystatechange=handleReadyState(this,a,b),d.before&&d.before(c),c.send(g),c)}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments)}function setType(a){var b=a.match(/\.(json|jsonp|html|xml)(\?|$)/);return b?b[1]:"js"}function init(o,fn){function complete(a){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(a)}function success(resp){var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=resp.responseText=filteredResponse;if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp);self._fulfillmentHandlers.length>0;)self._fulfillmentHandlers.shift()(resp);complete(resp)}function error(a,b,c){for(self._responseArgs.resp=a,self._responseArgs.msg=b,self._responseArgs.t=c,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(a,b,c);complete(a)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this,type=o.type||setType(this.url);fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){self.abort()},o.timeout)),o.success&&this._fulfillmentHandlers.push(function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(a,b){return new Reqwest(a,b)}function normalize(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function serial(a,b){var c,d,e,f,g=a.name,h=a.tagName.toLowerCase(),i=function(a){a&&!a.disabled&&b(g,normalize(a.attributes.value&&a.attributes.value.specified?a.value:a.text))};if(!a.disabled&&g)switch(h){case"input":/reset|button|image|file/i.test(a.type)||(c=/checkbox/i.test(a.type),d=/radio/i.test(a.type),e=a.value,(!(c||d)||a.checked)&&b(g,normalize(c&&""===e?"on":e)));break;case"textarea":b(g,normalize(a.value));break;case"select":if("select-one"===a.type.toLowerCase())i(a.selectedIndex>=0?a.options[a.selectedIndex]:null);else for(f=0;a.length&&f<a.length;f++)a.options[f].selected&&i(a.options[f])}}function eachFormElement(){var a,b,c=this,d=function(a,b){var d,e,f;for(d=0;d<b.length;d++)for(f=a[byTag](b[d]),e=0;e<f.length;e++)serial(f[e],c)};for(b=0;b<arguments.length;b++)a=arguments[b],/input|select|textarea/i.test(a.tagName)&&serial(a,c),d(a,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var a={};return eachFormElement.apply(function(b,c){b in a?(a[b]&&!isArray(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments),a}var win=window,doc=document,twoHundo=/^20\d$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(a){return a instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=win[xmlHttpRequest]?function(){return new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(a){return a}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(a,b){return this._fulfilled?a(this._responseArgs.resp):this._erred?b(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(a),this._errorHandlers.push(b)),this},always:function(a){return this._fulfilled||this._erred?a(this._responseArgs.resp):this._completeHandlers.push(a),this},fail:function(a){return this._erred?a(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(a),this}},reqwest.serializeArray=function(){var a=[];return eachFormElement.apply(function(b,c){a.push({name:b,value:c})},arguments),a},reqwest.serialize=function(){if(0===arguments.length)return"";var a,b,c=Array.prototype.slice.call(arguments,0);return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),b="map"==a?serializeHash:"array"==a?reqwest.serializeArray:serializeQueryString,b.apply(null,c)},reqwest.toQueryString=function(a){var b,c,d,e="",f=encodeURIComponent,g=function(a,b){e+=f(a)+"="+f(b)+"&"};if(isArray(a))for(b=0;a&&b<a.length;b++)g(a[b].name,a[b].value);else for(c in a)if(Object.hasOwnProperty.call(a,c))if(d=a[c],isArray(d))for(b=0;b<d.length;b++)g(c,d[b]);else g(c,a[c]);return e.replace(/&$/,"").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix+parseInt(1e4*Math.random())},reqwest.compat=function(a,b){return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new Reqwest(a,b)},reqwest.ajaxSetup=function(a){a=a||{};for(var b in a)globalSetupOptions[b]=a[b]},reqwest}),jsql.Events=function(){function a(){}function b(a,b,c,d){var e;if(a)for(var f=0,g=a.length;g>f;f+=2){try{e=a[f].apply(a[f+1]||c,b)}catch(h){window.console&&console.error&&"[object Function]"===Object.prototype.toString.call(console.error)&&console.error(h.stack||h);continue}e===!1&&d.status&&(d.status=!1)}}var c=/\s+/;a.prototype.on=function(a,b,d){var e,f,g;if(!b)return this;for(e=this.__events||(this.__events={}),a=a.split(c);f=a.shift();)g=e[f]||(e[f]=[]),g.push(b,d);return this},a.prototype.off=function(a,b,e){var f,g,h,i;if(!(f=this.__events))return this;if(!(a||b||e))return delete this.__events,this;for(a=a?a.split(c):d(f);g=a.shift();)if(h=f[g])if(b||e)for(i=h.length-2;i>=0;i-=2)b&&h[i]!==b||e&&h[i+1]!==e||h.splice(i,2);else delete f[g];return this},a.prototype.trigger=function(a){var d,e,f,g,h,i,j=[],k={status:!0};if(!(d=this.__events))return this;for(a=a.split(c),h=1,i=arguments.length;i>h;h++)j[h-1]=arguments[h];for(;e=a.shift();)(f=d.all)&&(f=f.slice()),(g=d[e])&&(g=g.slice()),b(g,j,this,k),b(f,[e].concat(j),this,k);return k.status},a.mixTo=function(b){b=b.prototype||b;var c=a.prototype;for(var d in c)c.hasOwnProperty(d)&&(b[d]=c[d])};var d=Object.keys;return d||(d=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b}),a}(),jSQL});