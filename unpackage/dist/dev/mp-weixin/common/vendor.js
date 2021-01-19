(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"点滴校园呀","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 112:
/*!****************************************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/components/uni-calendar/util.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _calendar = _interopRequireDefault(__webpack_require__(/*! ./calendar.js */ 113));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Calendar = /*#__PURE__*/function () {
  function Calendar()





  {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},date = _ref.date,selected = _ref.selected,startDate = _ref.startDate,endDate = _ref.endDate,range = _ref.range;_classCallCheck(this, Calendar);
    // 当前日期
    this.date = this.getDate(date); // 当前初入日期
    // 打点信息
    this.selected = selected || [];
    // 范围开始
    this.startDate = startDate;
    // 范围结束
    this.endDate = endDate;
    this.range = range;
    // 多选状态
    this.multipleStatus = {
      before: '',
      after: '',
      data: [] };

    // 每周日期
    this.weeks = {};

    this._getWeek(this.date.fullDate);
  }

  /**
     * 获取任意时间
     */_createClass(Calendar, [{ key: "getDate", value: function getDate(
    date) {var AddDayCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
      if (!date) {
        date = new Date();
      }
      if (typeof date !== 'object') {
        date = date.replace(/-/g, '/');
      }
      var dd = new Date(date);
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
          break;
        case 'month':
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
          }
          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期
          break;}

      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
      return {
        fullDate: y + '-' + m + '-' + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay() };

    }


    /**
       * 获取上月剩余天数
       */ }, { key: "_getLastMonthDays", value: function _getLastMonthDays(
    firstDay, full) {
      var dateArr = [];
      for (var i = firstDay; i > 0; i--) {
        var beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          lunar: this.getlunar(full.year, full.month - 1, beforeDate),
          disable: true });

      }
      return dateArr;
    }
    /**
       * 获取本月天数
       */ }, { key: "_currentMonthDys", value: function _currentMonthDys(
    dateData, full) {var _this = this;
      var dateArr = [];
      var fullDate = this.date.fullDate;var _loop = function _loop(
      i) {
        var isinfo = false;
        var nowDate = full.year + '-' + (full.month < 10 ?
        full.month : full.month) + '-' + (i < 10 ?
        '0' + i : i);
        // 是否今天
        var isDay = fullDate === nowDate;
        // 获取打点信息
        var info = _this.selected && _this.selected.find(function (item) {
          if (_this.dateEqual(nowDate, item.date)) {
            return item;
          }
        });

        // 日期禁用
        var disableBefore = true;
        var disableAfter = true;
        if (_this.startDate) {
          var dateCompBefore = _this.dateCompare(_this.startDate, fullDate);
          disableBefore = _this.dateCompare(dateCompBefore ? _this.startDate : fullDate, nowDate);
        }

        if (_this.endDate) {
          var dateCompAfter = _this.dateCompare(fullDate, _this.endDate);
          disableAfter = _this.dateCompare(nowDate, dateCompAfter ? _this.endDate : fullDate);
        }

        var multiples = _this.multipleStatus.data;
        var checked = false;
        var multiplesStatus = -1;
        if (_this.range) {
          if (multiples) {
            multiplesStatus = multiples.findIndex(function (item) {
              return _this.dateEqual(item, nowDate);
            });
          }
          if (multiplesStatus !== -1) {
            checked = true;
          }
        }

        var data = {
          fullDate: nowDate,
          year: full.year,
          date: i,
          multiple: _this.range ? checked : false,
          month: full.month,
          lunar: _this.getlunar(full.year, full.month, i),
          disable: !disableBefore || !disableAfter,
          isDay: isDay };

        if (info) {
          data.extraInfo = info;
        }

        dateArr.push(data);};for (var i = 1; i <= dateData; i++) {_loop(i);
      }
      return dateArr;
    }
    /**
       * 获取下月天数
       */ }, { key: "_getNextMonthDays", value: function _getNextMonthDays(
    surplus, full) {
      var dateArr = [];
      for (var i = 1; i < surplus + 1; i++) {
        dateArr.push({
          date: i,
          month: Number(full.month) + 1,
          lunar: this.getlunar(full.year, Number(full.month) + 1, i),
          disable: true });

      }
      return dateArr;
    }
    /**
       * 设置日期
       * @param {Object} date
       */ }, { key: "setDate", value: function setDate(
    date) {
      this._getWeek(date);
    }
    /**
       * 获取当前日期详情
       * @param {Object} date
       */ }, { key: "getInfo", value: function getInfo(
    date) {var _this2 = this;
      if (!date) {
        date = new Date();
      }
      var dateInfo = this.canlender.find(function (item) {return item.fullDate === _this2.getDate(date).fullDate;});
      return dateInfo;
    }

    /**
       * 比较时间大小
       */ }, { key: "dateCompare", value: function dateCompare(
    startDate, endDate) {
      // 计算截止时间
      startDate = new Date(startDate.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      endDate = new Date(endDate.replace('-', '/').replace('-', '/'));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }

    /**
       * 比较时间是否相等
       */ }, { key: "dateEqual", value: function dateEqual(
    before, after) {
      // 计算截止时间
      before = new Date(before.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      after = new Date(after.replace('-', '/').replace('-', '/'));
      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }


    /**
       * 获取日期范围内所有日期
       * @param {Object} begin
       * @param {Object} end
       */ }, { key: "geDateAll", value: function geDateAll(
    begin, end) {
      var arr = [];
      var ab = begin.split('-');
      var ae = end.split('-');
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
      for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push(this.getDate(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }
    /**
       * 计算阴历日期显示
       */ }, { key: "getlunar", value: function getlunar(
    year, month, date) {
      return _calendar.default.solar2lunar(year, month, date);
    }
    /**
       * 设置打点
       */ }, { key: "setSelectInfo", value: function setSelectInfo(
    data, value) {
      this.selected = value;
      this._getWeek(data);
    }

    /**
       *  获取多选状态
       */ }, { key: "setMultiple", value: function setMultiple(
    fullDate) {var _this$multipleStatus =



      this.multipleStatus,before = _this$multipleStatus.before,after = _this$multipleStatus.after;
      if (!this.range) return;
      if (before && after) {
        this.multipleStatus.before = '';
        this.multipleStatus.after = '';
        this.multipleStatus.data = [];
        this._getWeek(fullDate);
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
        } else {
          this.multipleStatus.after = fullDate;
          if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
          this._getWeek(fullDate);
        }
      }
    }

    /**
       * 获取每周数据
       * @param {Object} dateData
       */ }, { key: "_getWeek", value: function _getWeek(
    dateData) {var _this$getDate =






      this.getDate(dateData),fullDate = _this$getDate.fullDate,year = _this$getDate.year,month = _this$getDate.month,date = _this$getDate.date,day = _this$getDate.day;
      var firstDay = new Date(year, month - 1, 1).getDay();
      var currentDay = new Date(year, month, 0).getDate();
      var dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)), // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)), // 本月天数
        nextMonthDays: [], // 下个月开始几天
        weeks: [] };

      var canlender = [];
      var surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      var weeks = {};
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (var i = 0; i < canlender.length; i++) {
        if (i % 7 === 0) {
          weeks[parseInt(i / 7)] = new Array(7);
        }
        weeks[parseInt(i / 7)][i % 7] = canlender[i];
      }
      this.canlender = canlender;
      this.weeks = weeks;
    }

    //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }
  }]);return Calendar;}();var _default =


Calendar;exports.default = _default;

/***/ }),

/***/ 113:
/*!********************************************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/components/uni-calendar/calendar.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                     * @1900-2100区间内的公历、农历互转
                                                                                                     * @charset UTF-8
                                                                                                     * @github  https://github.com/jjonline/calendar.js
                                                                                                     * @Author  Jea杨(JJonline@JJonline.Cn)
                                                                                                     * @Time    2014-7-21
                                                                                                     * @Time    2016-8-13 Fixed 2033hex、Attribution Annals
                                                                                                     * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
                                                                                                     * @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
                                                                                                     * @Version 1.0.3
                                                                                                     * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
                                                                                                     * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
                                                                                                     */
/* eslint-disable */
var calendar = {

  /**
                     * 农历1900-2100的润大小信息表
                     * @Array Of Property
                     * @return Hex
                     */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  /** Add By JJonline@JJonline.Cn**/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520], // 2100

  /**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number
      */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
                                                                    * 天干地支之天干速查表
                                                                    * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
                                                                    * @return Cn string
                                                                    */
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],

  /**
                                                                                                                 * 天干地支之地支速查表
                                                                                                                 * @Array Of Property
                                                                                                                 * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
                                                                                                                 * @return Cn string
                                                                                                                 */
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],

  /**
                                                                                                                                     * 天干地支之地支速查表<=>生肖
                                                                                                                                     * @Array Of Property
                                                                                                                                     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
                                                                                                                                     * @return Cn string
                                                                                                                                     */
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],

  /**
                                                                                                                                         * 24节气速查表
                                                                                                                                         * @Array Of Property
                                                                                                                                         * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
                                                                                                                                         * @return Cn string
                                                                                                                                         */
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],

  /**
                                                                                                                                                                                                                                                                                                                                                                                                                   * 1900-2100各年的24节气日期速查表
                                                                                                                                                                                                                                                                                                                                                                                                                   * @Array Of Property
                                                                                                                                                                                                                                                                                                                                                                                                                   * @return 0x string For splice
                                                                                                                                                                                                                                                                                                                                                                                                                   */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
                                                                                                             * 数字转中文速查表
                                                                                                             * @Array Of Property
                                                                                                             * @trans ['日','一','二','三','四','五','六','七','八','九','十']
                                                                                                             * @return Cn string
                                                                                                             */
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],

  /**
                                                                                                                             * 日期转农历称呼速查表
                                                                                                                             * @Array Of Property
                                                                                                                             * @trans ['初','十','廿','卅']
                                                                                                                             * @return Cn string
                                                                                                                             */
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],

  /**
                                                       * 月份转农历称呼速查表
                                                       * @Array Of Property
                                                       * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
                                                       * @return Cn string
                                                       */
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],

  /**
                                                                                                                                       * 返回农历y年一整年的总天数
                                                                                                                                       * @param lunar Year
                                                                                                                                       * @return Number
                                                                                                                                       * @eg:var count = calendar.lYearDays(1987) ;//count=387
                                                                                                                                       */
  lYearDays: function lYearDays(y) {
    var i;var sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {sum += this.lunarInfo[y - 1900] & i ? 1 : 0;}
    return sum + this.leapDays(y);
  },

  /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
  leapMonth: function leapMonth(y) {// 闰字编码 \u95f0
    return this.lunarInfo[y - 1900] & 0xf;
  },

  /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param lunar Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
  leapDays: function leapDays(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  },

  /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param lunar Year
         * @return Number (-1、29、30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 月份参数从1至12，参数错误返回-1
    return this.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },

  /**
         * 返回公历(!)y年m月的天数
         * @param solar Year
         * @return Number (-1、28、29、30、31)
         * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
         */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) {// 2月份的闰平规律测算后确认返回28或29
      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },

  /**
        * 农历年份转换为干支纪年
        * @param  lYear 农历年的年份数
        * @return Cn string
        */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; // 如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12; // 如果余数为0则为最后一个地支
    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },

  /**
        * 公历月、日判断所属星座
        * @param  cMonth [description]
        * @param  cDay [description]
        * @return Cn string
        */
  toAstro: function toAstro(cMonth, cDay) {
    var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; // 座
  },

  /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
  toGanZhi: function toGanZhi(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },

  /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) {return -1;}
    if (n < 1 || n > 24) {return -1;}
    var _table = this.sTermInfo[y - 1900];
    var _info = [
    parseInt('0x' + _table.substr(0, 5)).toString(),
    parseInt('0x' + _table.substr(5, 5)).toString(),
    parseInt('0x' + _table.substr(10, 5)).toString(),
    parseInt('0x' + _table.substr(15, 5)).toString(),
    parseInt('0x' + _table.substr(20, 5)).toString(),
    parseInt('0x' + _table.substr(25, 5)).toString()];

    var _calday = [
    _info[0].substr(0, 1),
    _info[0].substr(1, 2),
    _info[0].substr(3, 1),
    _info[0].substr(4, 2),

    _info[1].substr(0, 1),
    _info[1].substr(1, 2),
    _info[1].substr(3, 1),
    _info[1].substr(4, 2),

    _info[2].substr(0, 1),
    _info[2].substr(1, 2),
    _info[2].substr(3, 1),
    _info[2].substr(4, 2),

    _info[3].substr(0, 1),
    _info[3].substr(1, 2),
    _info[3].substr(3, 1),
    _info[3].substr(4, 2),

    _info[4].substr(0, 1),
    _info[4].substr(1, 2),
    _info[4].substr(3, 1),
    _info[4].substr(4, 2),

    _info[5].substr(0, 1),
    _info[5].substr(1, 2),
    _info[5].substr(3, 1),
    _info[5].substr(4, 2)];

    return parseInt(_calday[n - 1]);
  },

  /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param lunar month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
  toChinaMonth: function toChinaMonth(m) {// 月 => \u6708
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var s = this.nStr3[m - 1];
    s += "\u6708"; // 加上月字
    return s;
  },

  /**
         * 传入农历日期数字返回汉字表示法
         * @param lunar day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
  toChinaDay: function toChinaDay(d) {// 日 => \u65e5
    var s;
    switch (d) {
      case 10:
        s = "\u521D\u5341";break;
      case 20:
        s = "\u4E8C\u5341";break;
        break;
      case 30:
        s = "\u4E09\u5341";break;
        break;
      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];}

    return s;
  },

  /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param y year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
  getAnimal: function getAnimal(y) {
    return this.Animals[(y - 4) % 12];
  },

  /**
         * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
         * @param y  solar year
         * @param m  solar month
         * @param d  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
  solar2lunar: function solar2lunar(y, m, d) {// 参数区间1900.1.31~2100.12.31
    // 年份限定、上限
    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    }
    // 公历传参最下限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }
    // 未传参  获得当天
    if (!y) {
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i;var leap = 0;var temp = 0;
    // 修正ymd参数
    var y = objDate.getFullYear();
    var m = objDate.getMonth() + 1;
    var d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;i--;
    }

    // 是否今天
    var isTodayObj = new Date();
    var isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    // 星期几
    var nWeek = objDate.getDay();
    var cWeek = this.nStr1[nWeek];
    // 数字表示周几顺应天朝周一开始的惯例
    if (nWeek == 0) {
      nWeek = 7;
    }
    // 农历年
    var year = i;
    var leap = this.leapMonth(i); // 闰哪个月
    var isLeap = false;

    // 效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;temp = this.leapDays(year); // 计算农历闰月天数
      } else {
        temp = this.monthDays(year, i); // 计算农历普通月天数
      }
      // 解除闰月
      if (isLeap == true && i == leap + 1) {isLeap = false;}
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;--i;
      }
    }
    if (offset < 0) {
      offset += temp;--i;
    }
    // 农历月
    var month = i;
    // 农历日
    var day = offset + 1;
    // 天干地支处理
    var sm = m - 1;
    var gzY = this.toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = this.getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始
    var secondNode = this.getTerm(y, m * 2); // 返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    }

    // 传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    }
    // 日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = this.toGanZhi(dayCyclical + d - 1);
    // 该日期所属的星座
    var astro = this.toAstro(m, d);

    return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': this.getAnimal(year), 'IMonthCn': (isLeap ? "\u95F0" : '') + this.toChinaMonth(month), 'IDayCn': this.toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': "\u661F\u671F" + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro };
  },

  /**
         * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
         * @param y  lunar year
         * @param m  lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
         * @return JSON object
         * @eg:console.log(calendar.lunar2solar(1987,9,10));
         */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {// 参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = this.leapMonth(y);
    var leapDay = this.leapDays(y);
    if (isLeapMonth && leapMonth != m) {return -1;} // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {return -1;} // 超出了最大极限值
    var day = this.monthDays(y, m);
    var _day = day;
    // bugFix 2016-9-25
    // if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {return -1;} // 参数合法性效验

    // 计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }
    var leap = 0;var isAdd = false;
    for (var i = 1; i < m; i++) {
      leap = this.leapMonth(y);
      if (!isAdd) {// 处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);isAdd = true;
        }
      }
      offset += this.monthDays(y, i);
    }
    // 转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {offset += day;}
    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return this.solar2lunar(cY, cM, cD);
  } };var _default =


calendar;exports.default = _default;

/***/ }),

/***/ 121:
/*!**************************************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/components/uni-popup/popup.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 122));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 122:
/*!****************************************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/components/uni-popup/message.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _created$created$meth;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default = (_created$created$meth = {
  created: function created() {
    if (this.type === 'message') {
      // 获取自组件对象
      this.maskShow = false;
      this.children = null;
    }
  } }, _defineProperty(_created$created$meth, "created", function created()
{
  if (this.type === 'message') {
    // 不显示遮罩
    this.maskShow = false;
    // 获取子组件对象
    this.childrenMsg = null;
  }
}), _defineProperty(_created$created$meth, "methods",
{
  customOpen: function customOpen() {
    if (this.childrenMsg) {
      this.childrenMsg.open();
    }
  },
  customClose: function customClose() {
    if (this.childrenMsg) {
      this.childrenMsg.close();
    }
  } }), _created$created$meth);exports.default = _default;

/***/ }),

/***/ 18:
/*!*************************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/static/public.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


//转星期
function week(week) {
  switch (week) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    case 0:
      return 'Sunday';}

}
//转换月份
function month(month) {
  switch (month) {
    case '01':
    case 1:
      return 'January';
    case '02':
    case 2:
      return 'February';
    case '03':
    case 3:
      return 'March';
    case '04':
    case 4:
      return 'April';
    case '05':
    case 5:
      return 'May';
    case '06':
    case 6:
      return 'June';
    case '07':
    case 7:
      return 'July';
    case '08':
    case 8:
      return 'August';
    case '09':
    case 9:
      return 'September';
    case '10':
    case 10:
      return 'October';
    case '11':
    case 11:
      return 'November';
    case '12':
    case 12:
      return 'December';}


}
// get day
function getDay(time) {
  var date;
  var data = {};
  date = time.split('T')[0];

  data.day = date.split('-')[2];
  data.year = date.split('-')[0];
  data.mon = month(date.split('-')[1]);

  return data;
}
//修改时间格式
function timeModel(num) {
  var data = num.toString();
  if (data.length === 1) {
    data = '0' + data;
  }
  return data;
}
// note
function note(msg, that, time) {

  var maxTime;
  if (time === undefined) {
    maxTime = 1500;
  } else {
    maxTime = time;
  }

  that.ifNote = true;
  that.noteData = msg;
  setTimeout(function () {
    that.ifNote = false;
  }, maxTime);
}

module.exports = {
  week: week,
  month: month,
  getDay: getDay,
  timeModel: timeModel,
  note: note
  // upload: upload
};

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"点滴校园呀","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"点滴校园呀","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"点滴校园呀","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"点滴校园呀","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*******************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/pages.json ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 43:
/*!*****************************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/static/pinyinUtil.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";







var _pinyin_dict_firstletter = _interopRequireDefault(__webpack_require__(/*! ./pinyin_dict_firstletter.js */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                              * 汉字与拼音互转工具，根据导入的字典文件的不同支持不同
                                                                                                                                                                                              * 对于多音字目前只是将所有可能的组合输出，准确识别多音字需要完善的词库，而词库文件往往比字库还要大，所以不太适合web环境。
                                                                                                                                                                                              * @start 2016-09-26
                                                                                                                                                                                              * @last 2016-09-29
                                                                                                                                                                                              */ /* ;(function(global, factory) {
                                                                                                                                                                                                 	
                                                                                                                                                                                                 	// document.write("<script language=javascript src='/pinyin_dict_firstletter.js'></script>");
                                                                                                                                                                                                 	if (typeof module === "object" && typeof module.exports === "object") {
                                                                                                                                                                                                 		module.exports = factory(global);
                                                                                                                                                                                                 		
                                                                                                                                                                                                 	} else {
                                                                                                                                                                                                 		factory(global);
                                                                                                                                                                                                 	}
                                                                                                                                                                                                 })(typeof window !== "undefined" ? window : this, function(window) { */var toneMap = { "ā": "a1",
  "á": "a2",
  "ǎ": "a3",
  "à": "a4",
  "ō": "o1",
  "ó": "o2",
  "ǒ": "o3",
  "ò": "o4",
  "ē": "e1",
  "é": "e2",
  "ě": "e3",
  "è": "e4",
  "ī": "i1",
  "í": "i2",
  "ǐ": "i3",
  "ì": "i4",
  "ū": "u1",
  "ú": "u2",
  "ǔ": "u3",
  "ù": "u4",
  "ü": "v0",
  "ǖ": "v1",
  "ǘ": "v2",
  "ǚ": "v3",
  "ǜ": "v4",
  "ń": "n2",
  "ň": "n3",
  "": "m2" };


var dict = {}; // 存储所有字典数据
var pinyinUtil =
{
  /**
   * 解析各种字典文件，所需的字典文件必须在本JS之前导入
   */
  parseDict: function parseDict()
  {
    // 如果导入了 pinyin_dict_firstletter.js
    if (_pinyin_dict_firstletter.default.pinyin_dict_firstletter)
    {
      dict.firstletter = _pinyin_dict_firstletter.default;
    }
    // 如果导入了 pinyin_dict_notone.js
    // if(window.pinyin_dict_notone)
    // {
    // 	dict.notone = {};
    // 	dict.py2hz = pinyin_dict_notone; // 拼音转汉字
    // 	for(var i in pinyin_dict_notone)
    // 	{
    // 		var temp = pinyin_dict_notone[i];
    // 		for(var j=0, len=temp.length; j<len; j++)
    // 		{
    // 			if(!dict.notone[temp[j]]) dict.notone[temp[j]] = i; // 不考虑多音字
    // 		}
    // 	}
    // }
    // 如果导入了 pinyin_dict_withtone.js
    /* if(window.pinyin_dict_withtone)
    {
    	dict.withtone = {}; // 汉字与拼音映射，多音字用空格分开，类似这种结构：{'大': 'da tai'}
    	var temp = pinyin_dict_withtone.split(',');
    	for(var i=0, len = temp.length; i<len; i++)
    	{
    		// 这段代码耗时28毫秒左右，对性能影响不大，所以一次性处理完毕
    		dict.withtone[String.fromCharCode(i + 19968)] = temp[i]; // 这里先不进行split(' ')，因为一次性循环2万次split比较消耗性能
    	}
    			// 拼音 -> 汉字
    	if(window.pinyin_dict_notone)
    	{
    		// 对于拼音转汉字，我们优先使用pinyin_dict_notone字典文件
    		// 因为这个字典文件不包含生僻字，且已按照汉字使用频率排序
    		dict.py2hz = pinyin_dict_notone; // 拼音转汉字
    	}
    	else
    	{
    		// 将字典文件解析成拼音->汉字的结构
    		// 与先分割后逐个去掉声调相比，先一次性全部去掉声调然后再分割速度至少快了3倍，前者大约需要120毫秒，后者大约只需要30毫秒（Chrome下）
    		var notone = pinyinUtil.removeTone(pinyin_dict_withtone).split(',');
    		var py2hz = {}, py, hz;
    		for(var i=0, len = notone.length; i<len; i++)
    		{
    			hz = String.fromCharCode(i + 19968); // 汉字
    			py = notone[i].split(' '); // 去掉了声调的拼音数组
    			for(var j=0; j<py.length; j++)
    			{
    				py2hz[py[j]] = (py2hz[py[j]] || '') + hz;
    			}
    		}
    		dict.py2hz = py2hz;
    	}
    } */

  },
  /**
      * 根据汉字获取拼音，如果不是汉字直接返回原字符
      * @param chinese 要转换的汉字
      * @param splitter 分隔字符，默认用空格分隔
      * @param withtone 返回结果是否包含声调，默认是
      * @param polyphone 是否支持多音字，默认否
      */
  getPinyin: function getPinyin(chinese, splitter, withtone, polyphone)
  {
    if (!chinese || /^ +$/g.test(chinese)) return '';
    splitter = splitter == undefined ? ' ' : splitter;
    withtone = withtone == undefined ? true : withtone;
    polyphone = polyphone == undefined ? false : polyphone;
    var result = [];
    if (dict.withtone) // 优先使用带声调的字典文件
      {
        var noChinese = '';
        for (var i = 0, len = chinese.length; i < len; i++)
        {
          var pinyin = dict.withtone[chinese[i]];
          if (pinyin)
          {
            // 如果不需要多音字，默认返回第一个拼音，后面的直接忽略
            // 所以这对数据字典有一定要求，常见字的拼音必须放在最前面
            if (!polyphone) pinyin = pinyin.replace(/ .*$/g, '');
            if (!withtone) pinyin = this.removeTone(pinyin); // 如果不需要声调
            //空格，把noChinese作为一个词插入
            noChinese && (result.push(noChinese), noChinese = '');
            result.push(pinyin);
          } else
          if (!chinese[i] || /^ +$/g.test(chinese[i])) {
            //空格，把noChinese作为一个词插入
            noChinese && (result.push(noChinese), noChinese = '');
          } else
          {
            noChinese += chinese[i];
          }
        }
        if (noChinese) {
          result.push(noChinese);
          noChinese = '';
        }
      } else
    if (dict.notone) // 使用没有声调的字典文件
      {
        if (withtone) console.warn('pinyin_dict_notone 字典文件不支持声调！');
        if (polyphone) console.warn('pinyin_dict_notone 字典文件不支持多音字！');
        var noChinese = '';
        for (var i = 0, len = chinese.length; i < len; i++)
        {
          var temp = chinese.charAt(i),
          pinyin = dict.notone[temp];
          if (pinyin) {//插入拼音
            //空格，把noChinese作为一个词插入
            noChinese && (result.push(noChinese), noChinese = '');
            result.push(pinyin);
          } else
          if (!temp || /^ +$/g.test(temp)) {
            //空格，插入之前的非中文字符
            noChinese && (result.push(noChinese), noChinese = '');
          } else
          {
            //非空格，关联到noChinese中
            noChinese += temp;
          }
        }

        if (noChinese) {
          result.push(noChinese);
          noChinese = '';
        }
      } else

    {
      throw '抱歉，未找到合适的拼音字典文件！';
    }
    if (!polyphone) return result.join(splitter);else

    {
      if (window.pinyin_dict_polyphone) return parsePolyphone(chinese, result, splitter, withtone);else
      return handlePolyphone(result, ' ', splitter);
    }
  },
  /**
      * 获取汉字的拼音首字母
      * @param str 汉字字符串，如果遇到非汉字则原样返回
      * @param polyphone 是否支持多音字，默认false，如果为true，会返回所有可能的组合数组
      */
  getFirstLetter: function getFirstLetter(str, polyphone)
  {

    polyphone = polyphone == undefined ? false : polyphone;
    if (!str || /^ +$/g.test(str)) return '';

    if (dict.firstletter) // 使用首字母字典文件
      {
        var result = [];
        for (var i = 0; i < str.length; i++)
        {
          var unicode = str.charCodeAt(i);
          var ch = str.charAt(i);
          if (unicode >= 19968 && unicode <= 40869)
          {
            ch = dict.firstletter.pinyin_dict_firstletter.all.charAt(unicode - 19968);
            if (polyphone) ch = dict.firstletter.pinyin_dict_firstletter.polyphone[unicode] || ch;
          }
          result.push(ch);
        }
        if (!polyphone) return result.join(''); // 如果不用管多音字，直接将数组拼接成字符串
        else return handlePolyphone(result, '', ''); // 处理多音字，此时的result类似于：['D', 'ZC', 'F']
      } else

    {
      var py = this.getPinyin(str, ' ', false, polyphone);
      py = py instanceof Array ? py : [py];
      var result = [];
      for (var i = 0; i < py.length; i++)
      {
        result.push(py[i].replace(/(^| )(\w)\w*/g, function (m, $1, $2) {return $2.toUpperCase();}));
      }
      if (!polyphone) return result[0];else
      return simpleUnique(result);
    }
  },
  /**
      * 拼音转汉字，只支持单个汉字，返回所有匹配的汉字组合
      * @param pinyin 单个汉字的拼音，可以包含声调
      */
  getHanzi: function getHanzi(pinyin)
  {
    if (!dict.py2hz)
    {
      throw '抱歉，未找到合适的拼音字典文件！';
    }
    return dict.py2hz[this.removeTone(pinyin)] || '';
  },
  /**
      * 获取某个汉字的同音字，本方法暂时有问题，待完善
      * @param hz 单个汉字
      * @param sameTone 是否获取同音同声调的汉字，必须传进来的拼音带声调才支持，默认false
      */
  getSameVoiceWord: function getSameVoiceWord(hz, sameTone)
  {
    sameTone = sameTone || false;
    return this.getHanzi(this.getPinyin(hz, ' ', false));
  },
  /**
      * 去除拼音中的声调，比如将 xiǎo míng tóng xué 转换成 xiao ming tong xue
      * @param pinyin 需要转换的拼音
      */
  removeTone: function removeTone(pinyin)
  {
    return pinyin.replace(/[āáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜńň]/g, function (m) {return toneMap[m][0];});
  },
  /**
      * 将数组拼音转换成真正的带标点的拼音
      * @param pinyinWithoutTone 类似 xu2e这样的带数字的拼音
      */
  getTone: function getTone(pinyinWithoutTone)
  {
    var newToneMap = {};
    for (var i in toneMap) {newToneMap[toneMap[i]] = i;}
    return (pinyinWithoutTone || '').replace(/[a-z]\d/g, function (m) {
      return newToneMap[m] || m;
    });
  } };



/**
        * 处理多音字，将类似['D', 'ZC', 'F']转换成['DZF', 'DCF']
        * 或者将 ['chang zhang', 'cheng'] 转换成 ['chang cheng', 'zhang cheng']
        */
function handlePolyphone(array, splitter, joinChar)
{
  splitter = splitter || '';
  var result = [''],temp = [];
  for (var i = 0; i < array.length; i++)
  {
    temp = [];
    var t = array[i].split(splitter);
    for (var j = 0; j < t.length; j++)
    {
      for (var k = 0; k < result.length; k++) {
        temp.push(result[k] + (result[k] ? joinChar : '') + t[j]);}
    }
    result = temp;
  }
  return simpleUnique(result);
}

/**
   * 根据词库找出多音字正确的读音
   * 这里只是非常简单的实现，效率和效果都有一些问题
   * 推荐使用第三方分词工具先对句子进行分词，然后再匹配多音字
   * @param chinese 需要转换的汉字
   * @param result 初步匹配出来的包含多个发音的拼音结果
   * @param splitter 返回结果拼接字符
   */
function parsePolyphone(chinese, result, splitter, withtone)
{
  var poly = window.pinyin_dict_polyphone;
  var max = 7; // 最多只考虑7个汉字的多音字词，虽然词库里面有10个字的，但是数量非常少，为了整体效率暂时忽略之
  var temp = poly[chinese];
  if (temp) // 如果直接找到了结果
    {
      temp = temp.split(' ');
      for (var i = 0; i < temp.length; i++)
      {
        result[i] = temp[i] || result[i];
        if (!withtone) result[i] = pinyinUtil.removeTone(result[i]);
      }
      return result.join(splitter);
    }
  for (var i = 0; i < chinese.length; i++)
  {
    temp = '';
    for (var j = 0; j < max && i + j < chinese.length; j++)
    {
      if (!/^[\u2E80-\u9FFF]+$/.test(chinese[i + j])) break; // 如果碰到非汉字直接停止本次查找
      temp += chinese[i + j];
      var res = poly[temp];
      if (res) // 如果找到了多音字词语
        {
          res = res.split(' ');
          for (var k = 0; k <= j; k++)
          {
            if (res[k]) result[i + k] = withtone ? res[k] : pinyinUtil.removeTone(res[k]);
          }
          break;
        }
    }
  }
  // 最后这一步是为了防止出现词库里面也没有包含的多音字词语
  for (var i = 0; i < result.length; i++)
  {
    result[i] = result[i].replace(/ .*$/g, '');
  }
  return result.join(splitter);
}

// 简单数组去重
function simpleUnique(array)
{
  var result = [];
  var hash = {};
  for (var i = 0; i < array.length; i++)
  {
    var key = typeof array[i] + array[i];
    if (!hash[key])
    {
      result.push(array[i]);
      hash[key] = true;
    }
  }
  return result;
}

pinyinUtil.parseDict();
pinyinUtil.dict = dict;
// window.pinyinUtil = pinyinUtil;
module.exports.pinyinUtil = pinyinUtil;

// });
// console.log('js',pinyinUtil)

/***/ }),

/***/ 44:
/*!******************************************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/static/pinyin_dict_firstletter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _pinyin_dict_firstlet;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /**
                                                                                                                                                                                                                                      * 拼音首字母字典文件
                                                                                                                                                                                                                                      */
var pinyin_dict_firstletter = {};

pinyin_dict_firstletter.all = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";

pinyin_dict_firstletter.polyphone = (_pinyin_dict_firstlet = { "19969": "DZ", "19975": "WM", "19988": "QJ", "20048": "YL", "20056": "SC", "20060": "NM", "20094": "QG", "20127": "QJ", "20167": "QC", "20193": "YG", "20250": "KH", "20256": "ZC", "20282": "SC", "20285": "QJG", "20291": "TD", "20314": "YD", "20340": "NE", "20375": "TD", "20389": "YJ", "20391": "CZ", "20415": "PB", "20446": "YS", "20447": "SQ", "20504": "TC", "20608": "KG", "20854": "QJ", "20857": "ZC", "20911": "PF" }, _defineProperty(_pinyin_dict_firstlet, "20504", "TC"), _defineProperty(_pinyin_dict_firstlet, "20608", "KG"), _defineProperty(_pinyin_dict_firstlet, "20854", "QJ"), _defineProperty(_pinyin_dict_firstlet, "20857", "ZC"), _defineProperty(_pinyin_dict_firstlet, "20911", "PF"), _defineProperty(_pinyin_dict_firstlet, "20985", "AW"), _defineProperty(_pinyin_dict_firstlet, "21032", "PB"), _defineProperty(_pinyin_dict_firstlet, "21048", "XQ"), _defineProperty(_pinyin_dict_firstlet, "21049", "SC"), _defineProperty(_pinyin_dict_firstlet, "21089", "YS"), _defineProperty(_pinyin_dict_firstlet, "21119", "JC"), _defineProperty(_pinyin_dict_firstlet, "21242", "SB"), _defineProperty(_pinyin_dict_firstlet, "21273", "SC"), _defineProperty(_pinyin_dict_firstlet, "21305", "YP"), _defineProperty(_pinyin_dict_firstlet, "21306", "QO"), _defineProperty(_pinyin_dict_firstlet, "21330", "ZC"), _defineProperty(_pinyin_dict_firstlet, "21333", "SDC"), _defineProperty(_pinyin_dict_firstlet, "21345", "QK"), _defineProperty(_pinyin_dict_firstlet, "21378", "CA"), _defineProperty(_pinyin_dict_firstlet, "21397", "SC"), _defineProperty(_pinyin_dict_firstlet, "21414", "XS"), _defineProperty(_pinyin_dict_firstlet, "21442", "SC"), _defineProperty(_pinyin_dict_firstlet, "21477", "JG"), _defineProperty(_pinyin_dict_firstlet, "21480", "TD"), _defineProperty(_pinyin_dict_firstlet, "21484", "ZS"), _defineProperty(_pinyin_dict_firstlet, "21494", "YX"), _defineProperty(_pinyin_dict_firstlet, "21505", "YX"), _defineProperty(_pinyin_dict_firstlet, "21512", "HG"), _defineProperty(_pinyin_dict_firstlet, "21523", "XH"), _defineProperty(_pinyin_dict_firstlet, "21537", "PB"), _defineProperty(_pinyin_dict_firstlet, "21542", "PF"), _defineProperty(_pinyin_dict_firstlet, "21549", "KH"), _defineProperty(_pinyin_dict_firstlet, "21571", "E"), _defineProperty(_pinyin_dict_firstlet, "21574", "DA"), _defineProperty(_pinyin_dict_firstlet, "21588", "TD"), _defineProperty(_pinyin_dict_firstlet, "21589", "O"), _defineProperty(_pinyin_dict_firstlet, "21618", "ZC"), _defineProperty(_pinyin_dict_firstlet, "21621", "KHA"), _defineProperty(_pinyin_dict_firstlet, "21632", "ZJ"), _defineProperty(_pinyin_dict_firstlet, "21654", "KG"), _defineProperty(_pinyin_dict_firstlet, "21679", "LKG"), _defineProperty(_pinyin_dict_firstlet, "21683", "KH"), _defineProperty(_pinyin_dict_firstlet, "21710", "A"), _defineProperty(_pinyin_dict_firstlet, "21719", "YH"), _defineProperty(_pinyin_dict_firstlet, "21734", "WOE"), _defineProperty(_pinyin_dict_firstlet, "21769", "A"), _defineProperty(_pinyin_dict_firstlet, "21780", "WN"), _defineProperty(_pinyin_dict_firstlet, "21804", "XH"), _defineProperty(_pinyin_dict_firstlet, "21834", "A"), _defineProperty(_pinyin_dict_firstlet, "21899", "ZD"), _defineProperty(_pinyin_dict_firstlet, "21903", "RN"), _defineProperty(_pinyin_dict_firstlet, "21908", "WO"), _defineProperty(_pinyin_dict_firstlet, "21939", "ZC"), _defineProperty(_pinyin_dict_firstlet, "21956", "SA"), _defineProperty(_pinyin_dict_firstlet, "21964", "YA"), _defineProperty(_pinyin_dict_firstlet, "21970", "TD"), _defineProperty(_pinyin_dict_firstlet, "22003", "A"), _defineProperty(_pinyin_dict_firstlet, "22031", "JG"), _defineProperty(_pinyin_dict_firstlet, "22040", "XS"), _defineProperty(_pinyin_dict_firstlet, "22060", "ZC"), _defineProperty(_pinyin_dict_firstlet, "22066", "ZC"), _defineProperty(_pinyin_dict_firstlet, "22079", "MH"), _defineProperty(_pinyin_dict_firstlet, "22129", "XJ"), _defineProperty(_pinyin_dict_firstlet, "22179", "XA"), _defineProperty(_pinyin_dict_firstlet, "22237", "NJ"), _defineProperty(_pinyin_dict_firstlet, "22244", "TD"), _defineProperty(_pinyin_dict_firstlet, "22280", "JQ"), _defineProperty(_pinyin_dict_firstlet, "22300", "YH"), _defineProperty(_pinyin_dict_firstlet, "22313", "XW"), _defineProperty(_pinyin_dict_firstlet, "22331", "YQ"), _defineProperty(_pinyin_dict_firstlet, "22343", "YJ"), _defineProperty(_pinyin_dict_firstlet, "22351", "PH"), _defineProperty(_pinyin_dict_firstlet, "22395", "DC"), _defineProperty(_pinyin_dict_firstlet, "22412", "TD"), _defineProperty(_pinyin_dict_firstlet, "22484", "PB"), _defineProperty(_pinyin_dict_firstlet, "22500", "PB"), _defineProperty(_pinyin_dict_firstlet, "22534", "ZD"), _defineProperty(_pinyin_dict_firstlet, "22549", "DH"), _defineProperty(_pinyin_dict_firstlet, "22561", "PB"), _defineProperty(_pinyin_dict_firstlet, "22612", "TD"), _defineProperty(_pinyin_dict_firstlet, "22771", "KQ"), _defineProperty(_pinyin_dict_firstlet, "22831", "HB"), _defineProperty(_pinyin_dict_firstlet, "22841", "JG"), _defineProperty(_pinyin_dict_firstlet, "22855", "QJ"), _defineProperty(_pinyin_dict_firstlet, "22865", "XQ"), _defineProperty(_pinyin_dict_firstlet, "23013", "ML"), _defineProperty(_pinyin_dict_firstlet, "23081", "WM"), _defineProperty(_pinyin_dict_firstlet, "23487", "SX"), _defineProperty(_pinyin_dict_firstlet, "23558", "QJ"), _defineProperty(_pinyin_dict_firstlet, "23561", "YW"), _defineProperty(_pinyin_dict_firstlet, "23586", "YW"), _defineProperty(_pinyin_dict_firstlet, "23614", "YW"), _defineProperty(_pinyin_dict_firstlet, "23615", "SN"), _defineProperty(_pinyin_dict_firstlet, "23631", "PB"), _defineProperty(_pinyin_dict_firstlet, "23646", "ZS"), _defineProperty(_pinyin_dict_firstlet, "23663", "ZT"), _defineProperty(_pinyin_dict_firstlet, "23673", "YG"), _defineProperty(_pinyin_dict_firstlet, "23762", "TD"), _defineProperty(_pinyin_dict_firstlet, "23769", "ZS"), _defineProperty(_pinyin_dict_firstlet, "23780", "QJ"), _defineProperty(_pinyin_dict_firstlet, "23884", "QK"), _defineProperty(_pinyin_dict_firstlet, "24055", "XH"), _defineProperty(_pinyin_dict_firstlet, "24113", "DC"), _defineProperty(_pinyin_dict_firstlet, "24162", "ZC"), _defineProperty(_pinyin_dict_firstlet, "24191", "GA"), _defineProperty(_pinyin_dict_firstlet, "24273", "QJ"), _defineProperty(_pinyin_dict_firstlet, "24324", "NL"), _defineProperty(_pinyin_dict_firstlet, "24377", "TD"), _defineProperty(_pinyin_dict_firstlet, "24378", "QJ"), _defineProperty(_pinyin_dict_firstlet, "24439", "PF"), _defineProperty(_pinyin_dict_firstlet, "24554", "ZS"), _defineProperty(_pinyin_dict_firstlet, "24683", "TD"), _defineProperty(_pinyin_dict_firstlet, "24694", "WE"), _defineProperty(_pinyin_dict_firstlet, "24733", "LK"), _defineProperty(_pinyin_dict_firstlet, "24925", "TN"), _defineProperty(_pinyin_dict_firstlet, "25094", "ZG"), _defineProperty(_pinyin_dict_firstlet, "25100", "XQ"), _defineProperty(_pinyin_dict_firstlet, "25103", "XH"), _defineProperty(_pinyin_dict_firstlet, "25153", "PB"), _defineProperty(_pinyin_dict_firstlet, "25170", "PB"), _defineProperty(_pinyin_dict_firstlet, "25179", "KG"), _defineProperty(_pinyin_dict_firstlet, "25203", "PB"), _defineProperty(_pinyin_dict_firstlet, "25240", "ZS"), _defineProperty(_pinyin_dict_firstlet, "25282", "FB"), _defineProperty(_pinyin_dict_firstlet, "25303", "NA"), _defineProperty(_pinyin_dict_firstlet, "25324", "KG"), _defineProperty(_pinyin_dict_firstlet, "25341", "ZY"), _defineProperty(_pinyin_dict_firstlet, "25373", "WZ"), _defineProperty(_pinyin_dict_firstlet, "25375", "XJ"), _defineProperty(_pinyin_dict_firstlet, "25384", "A"), _defineProperty(_pinyin_dict_firstlet, "25457", "A"), _defineProperty(_pinyin_dict_firstlet, "25528", "SD"), _defineProperty(_pinyin_dict_firstlet, "25530", "SC"), _defineProperty(_pinyin_dict_firstlet, "25552", "TD"), _defineProperty(_pinyin_dict_firstlet, "25774", "ZC"), _defineProperty(_pinyin_dict_firstlet, "25874", "ZC"), _defineProperty(_pinyin_dict_firstlet, "26044", "YW"), _defineProperty(_pinyin_dict_firstlet, "26080", "WM"), _defineProperty(_pinyin_dict_firstlet, "26292", "PB"), _defineProperty(_pinyin_dict_firstlet, "26333", "PB"), _defineProperty(_pinyin_dict_firstlet, "26355", "ZY"), _defineProperty(_pinyin_dict_firstlet, "26366", "CZ"), _defineProperty(_pinyin_dict_firstlet, "26397", "ZC"), _defineProperty(_pinyin_dict_firstlet, "26399", "QJ"), _defineProperty(_pinyin_dict_firstlet, "26415", "ZS"), _defineProperty(_pinyin_dict_firstlet, "26451", "SB"), _defineProperty(_pinyin_dict_firstlet, "26526", "ZC"), _defineProperty(_pinyin_dict_firstlet, "26552", "JG"), _defineProperty(_pinyin_dict_firstlet, "26561", "TD"), _defineProperty(_pinyin_dict_firstlet, "26588", "JG"), _defineProperty(_pinyin_dict_firstlet, "26597", "CZ"), _defineProperty(_pinyin_dict_firstlet, "26629", "ZS"), _defineProperty(_pinyin_dict_firstlet, "26638", "YL"), _defineProperty(_pinyin_dict_firstlet, "26646", "XQ"), _defineProperty(_pinyin_dict_firstlet, "26653", "KG"), _defineProperty(_pinyin_dict_firstlet, "26657", "XJ"), _defineProperty(_pinyin_dict_firstlet, "26727", "HG"), _defineProperty(_pinyin_dict_firstlet, "26894", "ZC"), _defineProperty(_pinyin_dict_firstlet, "26937", "ZS"), _defineProperty(_pinyin_dict_firstlet, "26946", "ZC"), _defineProperty(_pinyin_dict_firstlet, "26999", "KJ"), _defineProperty(_pinyin_dict_firstlet, "27099", "KJ"), _defineProperty(_pinyin_dict_firstlet, "27449", "YQ"), _defineProperty(_pinyin_dict_firstlet, "27481", "XS"), _defineProperty(_pinyin_dict_firstlet, "27542", "ZS"), _defineProperty(_pinyin_dict_firstlet, "27663", "ZS"), _defineProperty(_pinyin_dict_firstlet, "27748", "TS"), _defineProperty(_pinyin_dict_firstlet, "27784", "SC"), _defineProperty(_pinyin_dict_firstlet, "27788", "ZD"), _defineProperty(_pinyin_dict_firstlet, "27795", "TD"), _defineProperty(_pinyin_dict_firstlet, "27812", "O"), _defineProperty(_pinyin_dict_firstlet, "27850", "PB"), _defineProperty(_pinyin_dict_firstlet, "27852", "MB"), _defineProperty(_pinyin_dict_firstlet, "27895", "SL"), _defineProperty(_pinyin_dict_firstlet, "27898", "PL"), _defineProperty(_pinyin_dict_firstlet, "27973", "QJ"), _defineProperty(_pinyin_dict_firstlet, "27981", "KH"), _defineProperty(_pinyin_dict_firstlet, "27986", "HX"), _defineProperty(_pinyin_dict_firstlet, "27994", "XJ"), _defineProperty(_pinyin_dict_firstlet, "28044", "YC"), _defineProperty(_pinyin_dict_firstlet, "28065", "WG"), _defineProperty(_pinyin_dict_firstlet, "28177", "SM"), _defineProperty(_pinyin_dict_firstlet, "28267", "QJ"), _defineProperty(_pinyin_dict_firstlet, "28291", "KH"), _defineProperty(_pinyin_dict_firstlet, "28337", "ZQ"), _defineProperty(_pinyin_dict_firstlet, "28463", "TL"), _defineProperty(_pinyin_dict_firstlet, "28548", "DC"), _defineProperty(_pinyin_dict_firstlet, "28601", "TD"), _defineProperty(_pinyin_dict_firstlet, "28689", "PB"), _defineProperty(_pinyin_dict_firstlet, "28805", "JG"), _defineProperty(_pinyin_dict_firstlet, "28820", "QG"), _defineProperty(_pinyin_dict_firstlet, "28846", "PB"), _defineProperty(_pinyin_dict_firstlet, "28952", "TD"), _defineProperty(_pinyin_dict_firstlet, "28975", "ZC"), _defineProperty(_pinyin_dict_firstlet, "29100", "A"), _defineProperty(_pinyin_dict_firstlet, "29325", "QJ"), _defineProperty(_pinyin_dict_firstlet, "29575", "SL"), _defineProperty(_pinyin_dict_firstlet, "29602", "FB"), _defineProperty(_pinyin_dict_firstlet, "30010", "TD"), _defineProperty(_pinyin_dict_firstlet, "30044", "CX"), _defineProperty(_pinyin_dict_firstlet, "30058", "PF"), _defineProperty(_pinyin_dict_firstlet, "30091", "YSP"), _defineProperty(_pinyin_dict_firstlet, "30111", "YN"), _defineProperty(_pinyin_dict_firstlet, "30229", "XJ"), _defineProperty(_pinyin_dict_firstlet, "30427", "SC"), _defineProperty(_pinyin_dict_firstlet, "30465", "SX"), _defineProperty(_pinyin_dict_firstlet, "30631", "YQ"), _defineProperty(_pinyin_dict_firstlet, "30655", "QJ"), _defineProperty(_pinyin_dict_firstlet, "30684", "QJG"), _defineProperty(_pinyin_dict_firstlet, "30707", "SD"), _defineProperty(_pinyin_dict_firstlet, "30729", "XH"), _defineProperty(_pinyin_dict_firstlet, "30796", "LG"), _defineProperty(_pinyin_dict_firstlet, "30917", "PB"), _defineProperty(_pinyin_dict_firstlet, "31074", "NM"), _defineProperty(_pinyin_dict_firstlet, "31085", "JZ"), _defineProperty(_pinyin_dict_firstlet, "31109", "SC"), _defineProperty(_pinyin_dict_firstlet, "31181", "ZC"), _defineProperty(_pinyin_dict_firstlet, "31192", "MLB"), _defineProperty(_pinyin_dict_firstlet, "31293", "JQ"), _defineProperty(_pinyin_dict_firstlet, "31400", "YX"), _defineProperty(_pinyin_dict_firstlet, "31584", "YJ"), _defineProperty(_pinyin_dict_firstlet, "31896", "ZN"), _defineProperty(_pinyin_dict_firstlet, "31909", "ZY"), _defineProperty(_pinyin_dict_firstlet, "31995", "XJ"), _defineProperty(_pinyin_dict_firstlet, "32321", "PF"), _defineProperty(_pinyin_dict_firstlet, "32327", "ZY"), _defineProperty(_pinyin_dict_firstlet, "32418", "HG"), _defineProperty(_pinyin_dict_firstlet, "32420", "XQ"), _defineProperty(_pinyin_dict_firstlet, "32421", "HG"), _defineProperty(_pinyin_dict_firstlet, "32438", "LG"), _defineProperty(_pinyin_dict_firstlet, "32473", "GJ"), _defineProperty(_pinyin_dict_firstlet, "32488", "TD"), _defineProperty(_pinyin_dict_firstlet, "32521", "QJ"), _defineProperty(_pinyin_dict_firstlet, "32527", "PB"), _defineProperty(_pinyin_dict_firstlet, "32562", "ZSQ"), _defineProperty(_pinyin_dict_firstlet, "32564", "JZ"), _defineProperty(_pinyin_dict_firstlet, "32735", "ZD"), _defineProperty(_pinyin_dict_firstlet, "32793", "PB"), _defineProperty(_pinyin_dict_firstlet, "33071", "PF"), _defineProperty(_pinyin_dict_firstlet, "33098", "XL"), _defineProperty(_pinyin_dict_firstlet, "33100", "YA"), _defineProperty(_pinyin_dict_firstlet, "33152", "PB"), _defineProperty(_pinyin_dict_firstlet, "33261", "CX"), _defineProperty(_pinyin_dict_firstlet, "33324", "BP"), _defineProperty(_pinyin_dict_firstlet, "33333", "TD"), _defineProperty(_pinyin_dict_firstlet, "33406", "YA"), _defineProperty(_pinyin_dict_firstlet, "33426", "WM"), _defineProperty(_pinyin_dict_firstlet, "33432", "PB"), _defineProperty(_pinyin_dict_firstlet, "33445", "JG"), _defineProperty(_pinyin_dict_firstlet, "33486", "ZN"), _defineProperty(_pinyin_dict_firstlet, "33493", "TS"), _defineProperty(_pinyin_dict_firstlet, "33507", "QJ"), _defineProperty(_pinyin_dict_firstlet, "33540", "QJ"), _defineProperty(_pinyin_dict_firstlet, "33544", "ZC"), _defineProperty(_pinyin_dict_firstlet, "33564", "XQ"), _defineProperty(_pinyin_dict_firstlet, "33617", "YT"), _defineProperty(_pinyin_dict_firstlet, "33632", "QJ"), _defineProperty(_pinyin_dict_firstlet, "33636", "XH"), _defineProperty(_pinyin_dict_firstlet, "33637", "YX"), _defineProperty(_pinyin_dict_firstlet, "33694", "WG"), _defineProperty(_pinyin_dict_firstlet, "33705", "PF"), _defineProperty(_pinyin_dict_firstlet, "33728", "YW"), _defineProperty(_pinyin_dict_firstlet, "33882", "SR"), _defineProperty(_pinyin_dict_firstlet, "34067", "WM"), _defineProperty(_pinyin_dict_firstlet, "34074", "YW"), _defineProperty(_pinyin_dict_firstlet, "34121", "QJ"), _defineProperty(_pinyin_dict_firstlet, "34255", "ZC"), _defineProperty(_pinyin_dict_firstlet, "34259", "XL"), _defineProperty(_pinyin_dict_firstlet, "34425", "JH"), _defineProperty(_pinyin_dict_firstlet, "34430", "XH"), _defineProperty(_pinyin_dict_firstlet, "34485", "KH"), _defineProperty(_pinyin_dict_firstlet, "34503", "YS"), _defineProperty(_pinyin_dict_firstlet, "34532", "HG"), _defineProperty(_pinyin_dict_firstlet, "34552", "XS"), _defineProperty(_pinyin_dict_firstlet, "34558", "YE"), _defineProperty(_pinyin_dict_firstlet, "34593", "ZL"), _defineProperty(_pinyin_dict_firstlet, "34660", "YQ"), _defineProperty(_pinyin_dict_firstlet, "34892", "XH"), _defineProperty(_pinyin_dict_firstlet, "34928", "SC"), _defineProperty(_pinyin_dict_firstlet, "34999", "QJ"), _defineProperty(_pinyin_dict_firstlet, "35048", "PB"), _defineProperty(_pinyin_dict_firstlet, "35059", "SC"), _defineProperty(_pinyin_dict_firstlet, "35098", "ZC"), _defineProperty(_pinyin_dict_firstlet, "35203", "TQ"), _defineProperty(_pinyin_dict_firstlet, "35265", "JX"), _defineProperty(_pinyin_dict_firstlet, "35299", "JX"), _defineProperty(_pinyin_dict_firstlet, "35782", "SZ"), _defineProperty(_pinyin_dict_firstlet, "35828", "YS"), _defineProperty(_pinyin_dict_firstlet, "35830", "E"), _defineProperty(_pinyin_dict_firstlet, "35843", "TD"), _defineProperty(_pinyin_dict_firstlet, "35895", "YG"), _defineProperty(_pinyin_dict_firstlet, "35977", "MH"), _defineProperty(_pinyin_dict_firstlet, "36158", "JG"), _defineProperty(_pinyin_dict_firstlet, "36228", "QJ"), _defineProperty(_pinyin_dict_firstlet, "36426", "XQ"), _defineProperty(_pinyin_dict_firstlet, "36466", "DC"), _defineProperty(_pinyin_dict_firstlet, "36710", "JC"), _defineProperty(_pinyin_dict_firstlet, "36711", "ZYG"), _defineProperty(_pinyin_dict_firstlet, "36767", "PB"), _defineProperty(_pinyin_dict_firstlet, "36866", "SK"), _defineProperty(_pinyin_dict_firstlet, "36951", "YW"), _defineProperty(_pinyin_dict_firstlet, "37034", "YX"), _defineProperty(_pinyin_dict_firstlet, "37063", "XH"), _defineProperty(_pinyin_dict_firstlet, "37218", "ZC"), _defineProperty(_pinyin_dict_firstlet, "37325", "ZC"), _defineProperty(_pinyin_dict_firstlet, "38063", "PB"), _defineProperty(_pinyin_dict_firstlet, "38079", "TD"), _defineProperty(_pinyin_dict_firstlet, "38085", "QY"), _defineProperty(_pinyin_dict_firstlet, "38107", "DC"), _defineProperty(_pinyin_dict_firstlet, "38116", "TD"), _defineProperty(_pinyin_dict_firstlet, "38123", "YD"), _defineProperty(_pinyin_dict_firstlet, "38224", "HG"), _defineProperty(_pinyin_dict_firstlet, "38241", "XTC"), _defineProperty(_pinyin_dict_firstlet, "38271", "ZC"), _defineProperty(_pinyin_dict_firstlet, "38415", "YE"), _defineProperty(_pinyin_dict_firstlet, "38426", "KH"), _defineProperty(_pinyin_dict_firstlet, "38461", "YD"), _defineProperty(_pinyin_dict_firstlet, "38463", "AE"), _defineProperty(_pinyin_dict_firstlet, "38466", "PB"), _defineProperty(_pinyin_dict_firstlet, "38477", "XJ"), _defineProperty(_pinyin_dict_firstlet, "38518", "YT"), _defineProperty(_pinyin_dict_firstlet, "38551", "WK"), _defineProperty(_pinyin_dict_firstlet, "38585", "ZC"), _defineProperty(_pinyin_dict_firstlet, "38704", "XS"), _defineProperty(_pinyin_dict_firstlet, "38739", "LJ"), _defineProperty(_pinyin_dict_firstlet, "38761", "GJ"), _defineProperty(_pinyin_dict_firstlet, "38808", "SQ"), _defineProperty(_pinyin_dict_firstlet, "39048", "JG"), _defineProperty(_pinyin_dict_firstlet, "39049", "XJ"), _defineProperty(_pinyin_dict_firstlet, "39052", "HG"), _defineProperty(_pinyin_dict_firstlet, "39076", "CZ"), _defineProperty(_pinyin_dict_firstlet, "39271", "XT"), _defineProperty(_pinyin_dict_firstlet, "39534", "TD"), _defineProperty(_pinyin_dict_firstlet, "39552", "TD"), _defineProperty(_pinyin_dict_firstlet, "39584", "PB"), _defineProperty(_pinyin_dict_firstlet, "39647", "SB"), _defineProperty(_pinyin_dict_firstlet, "39730", "LG"), _defineProperty(_pinyin_dict_firstlet, "39748", "TPB"), _defineProperty(_pinyin_dict_firstlet, "40109", "ZQ"), _defineProperty(_pinyin_dict_firstlet, "40479", "ND"), _defineProperty(_pinyin_dict_firstlet, "40516", "HG"), _defineProperty(_pinyin_dict_firstlet, "40536", "HG"), _defineProperty(_pinyin_dict_firstlet, "40583", "QJ"), _defineProperty(_pinyin_dict_firstlet, "40765", "YQ"), _defineProperty(_pinyin_dict_firstlet, "40784", "QJ"), _defineProperty(_pinyin_dict_firstlet, "40840", "YK"), _defineProperty(_pinyin_dict_firstlet, "40863", "QJG"), _pinyin_dict_firstlet);

module.exports.pinyin_dict_firstletter = pinyin_dict_firstletter;

/***/ }),

/***/ 8:
/*!**************************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/static/request.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var base = 'https://wy.lujiahaoo.cn/dddx/api';

function getRequest(url, data, _success, _fail, type, contentType) {
  console.log('type', type);
  var token = wx.getStorageSync('token');

  var contType;

  if (contentType != undefined) {
    contType = contentType;
  } else {

    contType = 'application/json';
  }

  wx.request({
    url: base + url,
    method: type,
    data: data,
    header: {
      'content-type': contType,
      'Authorization': 'Bearer ' + token },

    success: function success(res) {
      if (res.data.code) {
        console.log('success');
      } else {
        console.log(res.data.msg);
      }
      _success(res);
    },
    fail: function fail(error) {

      _fail(error);
    } });

}

// module.exports.getRequest = getRequest
module.exports = {
  getRequest: getRequest };

/***/ }),

/***/ 83:
/*!*************************************************!*\
  !*** D:/stone/点滴大学/Diandi_uni/static/school.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var data = [
{
  "id": 1,
  "value": "吉林省",
  "childs": [
  {
    "id": 1,
    "value": "长春市",
    "childs": [
    {
      "id": "3622000335",
      "value": "长春师范高等专科学校" },

    {
      "id": "4122010183",
      "value": "吉林大学" },

    {
      "id": "4122010186",
      "value": "长春理工大学" },

    {
      "id": "4122010190",
      "value": "长春工业大学" },

    {
      "id": "4122010191",
      "value": "吉林建筑大学" },

    {
      "id": "4122010193",
      "value": "吉林农业大学" },

    {
      "id": "4122010199",
      "value": "长春中医药大学" },

    {
      "id": "4122010200",
      "value": "东北师范大学" },

    {
      "id": "4122010204",
      "value": "吉林工程技术师范学院" },

    {
      "id": "4122010205",
      "value": "长春师范大学" },

    {
      "id": "4122010207",
      "value": "吉林财经大学" },

    {
      "id": "4122010208",
      "value": "吉林体育学院" },

    {
      "id": "4122010209",
      "value": "吉林艺术学院" },

    {
      "id": "4122010964",
      "value": "吉林华桥外国语学院" },

    {
      "id": "4122011261",
      "value": "吉林工商学院" },

    {
      "id": "4122011436",
      "value": "长春汽车工业高等专科学校" },

    {
      "id": "4122011437",
      "value": "长春工程学院" },

    {
      "id": "4122011440",
      "value": "长春金融高等专科学校" },

    {
      "id": "4122011441",
      "value": "吉林警察学院" },

    {
      "id": "4122011726",
      "value": "长春大学" },

    {
      "id": "4122011823",
      "value": "长春医学高等专科学校" },

    {
      "id": "4122012049",
      "value": "吉林交通职业技术学院" },

    {
      "id": "4122012306",
      "value": "长春东方职业学院" },

    {
      "id": "4122012901",
      "value": "吉林司法警官职业学院" },

    {
      "id": "4122013161",
      "value": "长春职业技术学院" },

    {
      "id": "4122013600",
      "value": "长春光华学院" },

    {
      "id": "4122013601",
      "value": "长春工业大学人文信息学院" },

    {
      "id": "4122013602",
      "value": "长春理工大学光电信息学院" },

    {
      "id": "4122013603",
      "value": "长春财经学院" },

    {
      "id": "4122013604",
      "value": "吉林建筑大学城建学院" },

    {
      "id": "4122013605",
      "value": "长春建筑学院" },

    {
      "id": "4122013606",
      "value": "长春科技学院" },

    {
      "id": "4122013607",
      "value": "吉林动画学院" },

    {
      "id": "4122013623",
      "value": "长春大学旅游学院" },

    {
      "id": "4122013662",
      "value": "东北师范大学人文学院" },

    {
      "id": "4122013916",
      "value": "长春信息技术职业学院" },

    {
      "id": "4122014291",
      "value": "吉林科技职业技术学院" },

    {
      "id": "4122014426",
      "value": "吉林城市职业技术学院" },

    {
      "id": "4122014602",
      "value": "吉林水利电力职业学院" },

    {
      "id": "4122014603",
      "value": "长春健康职业学院" }] },



  {
    "id": 2,
    "value": "吉林市",
    "childs": [
    {
      "id": "4122010188",
      "value": "东北电力大学" },

    {
      "id": "4122010192",
      "value": "吉林化工学院" },

    {
      "id": "4122010201",
      "value": "北华大学" },

    {
      "id": "4122011439",
      "value": "吉林农业科技学院" },

    {
      "id": "4122012902",
      "value": "吉林电子信息职业技术学院" },

    {
      "id": "4122012903",
      "value": "吉林工业职业技术学院" },

    {
      "id": "4122013706",
      "value": "吉林医药学院" },

    {
      "id": "4122014052",
      "value": "吉林铁道职业技术学院" }] },



  {
    "id": 3,
    "value": "通化市",
    "childs": [
    {
      "id": "4122010202",
      "value": "通化师范学院" }] },



  {
    "id": 4,
    "value": "四平市",
    "childs": [
    {
      "id": "4122010203",
      "value": "吉林师范大学" },

    {
      "id": "4122011044",
      "value": "四平职业大学" },

    {
      "id": "4122012904",
      "value": "吉林工程职业学院" },

    {
      "id": "4122013622",
      "value": "吉林师范大学博达学院" }] },



  {
    "id": 5,
    "value": "白城市",
    "childs": [
    {
      "id": "4122010206",
      "value": "白城师范学院" },

    {
      "id": "4122013743",
      "value": "白城医学高等专科学校" },

    {
      "id": "4122014107",
      "value": "白城职业技术学院" }] },



  {
    "id": 6,
    "value": "辽源市",
    "childs": [
    {
      "id": "4122010847",
      "value": "辽源职业技术学院" }] },



  {
    "id": 7,
    "value": "松原市",
    "childs": [
    {
      "id": "4122013917",
      "value": "松原职业技术学院" }] },



  {
    "id": 8,
    "value": "白山市",
    "childs": [
    {
      "id": "4122014190",
      "value": "长白山职业技术学院" }] }] },





{
  "id": 2,
  "value": "江苏省",
  "childs": [
  {
    "id": 1,
    "value": "盐城市",
    "childs": [
    {
      "id": "3632000466",
      "value": "盐城幼儿师范高等专科学校" },

    {
      "id": "4132010305",
      "value": "盐城工学院" },

    {
      "id": "4132010324",
      "value": "盐城师范学院" },

    {
      "id": "4132010826",
      "value": "明达职业技术学院" },

    {
      "id": "4132012682",
      "value": "江苏医药职业学院" },

    {
      "id": "4132013752",
      "value": "盐城工业职业技术学院" }] },



  {
    "id": 2,
    "value": "苏州市",
    "childs": [
    {
      "id": "3632000583",
      "value": "苏州幼儿师范高等专科学校" },

    {
      "id": "4132010285",
      "value": "苏州大学" },

    {
      "id": "4132010332",
      "value": "苏州科技大学" },

    {
      "id": "4132010333",
      "value": "常熟理工学院" },

    {
      "id": "4132010960",
      "value": "苏州工艺美术职业技术学院" },

    {
      "id": "4132011054",
      "value": "苏州职业大学" },

    {
      "id": "4132011288",
      "value": "沙洲职业工学院" },

    {
      "id": "4132012078",
      "value": "硅湖职业技术学院" },

    {
      "id": "4132012685",
      "value": "苏州经贸职业技术学院" },

    {
      "id": "4132012686",
      "value": "苏州工业职业技术学院" },

    {
      "id": "4132012687",
      "value": "苏州托普信息职业技术学院" },

    {
      "id": "4132012688",
      "value": "苏州卫生职业技术学院" },

    {
      "id": "4132012808",
      "value": "苏州农业职业技术学院" },

    {
      "id": "4132012809",
      "value": "苏州工业园区职业技术学院" },

    {
      "id": "4132013751",
      "value": "苏州健雄职业技术学院" },

    {
      "id": "4132013962",
      "value": "苏州百年职业学院" },

    {
      "id": "4132013963",
      "value": "昆山登云科技职业学院" },

    {
      "id": "4132013983",
      "value": "苏州大学文正学院" },

    {
      "id": "4132013984",
      "value": "苏州大学应用技术学院" },

    {
      "id": "4132013985",
      "value": "苏州科技大学天平学院" },

    {
      "id": "4132014163",
      "value": "苏州高博软件技术职业学院" },

    {
      "id": "4132014256",
      "value": "苏州信息职业技术学院" },

    {
      "id": "4132014295",
      "value": "苏州工业园区服务外包\n职业学院" },

    {
      "id": "4132016403",
      "value": "西交利物浦大学" }] },



  {
    "id": 3,
    "value": "南京市",
    "childs": [
    {
      "id": "4132010284",
      "value": "南京大学" },

    {
      "id": "4132010286",
      "value": "东南大学" },

    {
      "id": "4132010287",
      "value": "南京航空航天大学" },

    {
      "id": "4132010288",
      "value": "南京理工大学" },

    {
      "id": "4132010291",
      "value": "南京工业大学" },

    {
      "id": "4132010293",
      "value": "南京邮电大学" },

    {
      "id": "4132010294",
      "value": "河海大学" },

    {
      "id": "4132010298",
      "value": "南京林业大学" },

    {
      "id": "4132010300",
      "value": "南京信息工程大学" },

    {
      "id": "4132010307",
      "value": "南京农业大学" },

    {
      "id": "4132010312",
      "value": "南京医科大学" },

    {
      "id": "4132010315",
      "value": "南京中医药大学" },

    {
      "id": "4132010316",
      "value": "中国药科大学" },

    {
      "id": "4132010319",
      "value": "南京师范大学" },

    {
      "id": "4132010327",
      "value": "南京财经大学" },

    {
      "id": "4132010329",
      "value": "江苏警官学院" },

    {
      "id": "4132010330",
      "value": "南京体育学院" },

    {
      "id": "4132010331",
      "value": "南京艺术学院" },

    {
      "id": "4132010850",
      "value": "南京工业职业技术学院" },

    {
      "id": "4132011122",
      "value": "三江学院" },

    {
      "id": "4132011276",
      "value": "南京工程学院" },

    {
      "id": "4132011287",
      "value": "南京审计大学" },

    {
      "id": "4132011460",
      "value": "南京晓庄学院" },

    {
      "id": "4132012047",
      "value": "江苏经贸职业技术学院" },

    {
      "id": "4132012048",
      "value": "南京特殊教育师范学院" },

    {
      "id": "4132012213",
      "value": "南京森林警察学院" },

    {
      "id": "4132012678",
      "value": "江苏联合职业技术学院" },

    {
      "id": "4132012679",
      "value": "江苏海事职业技术学院" },

    {
      "id": "4132012680",
      "value": "应天职业技术学院" },

    {
      "id": "4132012689",
      "value": "东南大学成贤学院" },

    {
      "id": "4132012804",
      "value": "南京交通职业技术学院" },

    {
      "id": "4132012920",
      "value": "南京科技职业学院" },

    {
      "id": "4132012921",
      "value": "正德职业技术学院" },

    {
      "id": "4132012922",
      "value": "钟山职业技术学院" },

    {
      "id": "4132013100",
      "value": "金肯职业技术学院" },

    {
      "id": "4132013106",
      "value": "南京铁道职业技术学院" },

    {
      "id": "4132013112",
      "value": "南京信息职业技术学院" },

    {
      "id": "4132013573",
      "value": "金陵科技学院" },

    {
      "id": "4132013646",
      "value": "南京大学金陵学院" },

    {
      "id": "4132013654",
      "value": "南京理工大学紫金学院" },

    {
      "id": "4132013655",
      "value": "南京航空航天大学金城学院" },

    {
      "id": "4132013687",
      "value": "中国传媒大学南广学院" },

    {
      "id": "4132013905",
      "value": "南京工业大学浦江学院" },

    {
      "id": "4132013906",
      "value": "南京师范大学中北学院" },

    {
      "id": "4132013964",
      "value": "南京视觉艺术职业学院" },

    {
      "id": "4132013982",
      "value": "南京信息工程大学滨江学院" },

    {
      "id": "4132013994",
      "value": "南京审计大学金审学院" },

    {
      "id": "4132014000",
      "value": "江苏城市职业学院" },

    {
      "id": "4132014001",
      "value": "南京城市职业学院" },

    {
      "id": "4132014056",
      "value": "南京机电职业技术学院" },

    {
      "id": "4132014180",
      "value": "南京旅游职业学院" },

    {
      "id": "4132014255",
      "value": "江苏卫生健康职业学院" },

    {
      "id": "4132014436",
      "value": "江苏第二师范学院" }] },



  {
    "id": 4,
    "value": "镇江市",
    "childs": [
    {
      "id": "4132010289",
      "value": "江苏科技大学" },

    {
      "id": "4132010299",
      "value": "江苏大学" },

    {
      "id": "4132011051",
      "value": "镇江市高等专科学校" },

    {
      "id": "4132013103",
      "value": "江苏农林职业技术学院" },

    {
      "id": "4132013750",
      "value": "金山职业技术学院" },

    {
      "id": "4132013986",
      "value": "江苏大学京江学院" },

    {
      "id": "4132013990",
      "value": "南京财经大学红山学院" },

    {
      "id": "4132014568",
      "value": "江苏航空职业技术学院" }] },



  {
    "id": 5,
    "value": "徐州市",
    "childs": [
    {
      "id": "4132010290",
      "value": "中国矿业大学" },

    {
      "id": "4132010313",
      "value": "徐州医科大学" },

    {
      "id": "4132010320",
      "value": "江苏师范大学" },

    {
      "id": "4132010849",
      "value": "江苏建筑职业技术学院" },

    {
      "id": "4132011998",
      "value": "徐州工程学院" },

    {
      "id": "4132012054",
      "value": "九州职业技术学院" },

    {
      "id": "4132013107",
      "value": "徐州工业职业技术学院" },

    {
      "id": "4132013579",
      "value": "中国矿业大学徐海学院" },

    {
      "id": "4132013988",
      "value": "江苏师范大学科文学院" },

    {
      "id": "4132014329",
      "value": "徐州幼儿师范高等专科学校" },

    {
      "id": "4132014401",
      "value": "徐州生物工程职业技术学院" },

    {
      "id": "4132014589",
      "value": "江苏安全技术职业学院" }] },



  {
    "id": 6,
    "value": "常州市",
    "childs": [
    {
      "id": "4132010292",
      "value": "常州大学" },

    {
      "id": "4132011055",
      "value": "常州工学院" },

    {
      "id": "4132011463",
      "value": "江苏理工学院" },

    {
      "id": "4132012317",
      "value": "常州信息职业技术学院" },

    {
      "id": "4132012807",
      "value": "常州纺织服装职业技术学院" },

    {
      "id": "4132013101",
      "value": "常州轻工职业技术学院" },

    {
      "id": "4132013102",
      "value": "常州工程职业技术学院" },

    {
      "id": "4132013105",
      "value": "建东职业技术学院" },

    {
      "id": "4132013114",
      "value": "常州机电职业技术学院" },

    {
      "id": "4132014543",
      "value": "江苏城乡建设职业学院" }] },



  {
    "id": 7,
    "value": "无锡市",
    "childs": [
    {
      "id": "4132010295",
      "value": "江南大学" },

    {
      "id": "4132010848",
      "value": "无锡职业技术学院" },

    {
      "id": "4132012681",
      "value": "无锡科技职业学院" },

    {
      "id": "4132012702",
      "value": "无锡商业职业技术学院" },

    {
      "id": "4132012918",
      "value": "太湖创意职业技术学院" },

    {
      "id": "4132012923",
      "value": "无锡南洋职业技术学院" },

    {
      "id": "4132013017",
      "value": "江南影视艺术职业学院" },

    {
      "id": "4132013108",
      "value": "江苏信息职业技术学院" },

    {
      "id": "4132013137",
      "value": "江阴职业技术学院" },

    {
      "id": "4132013571",
      "value": "无锡太湖学院" },

    {
      "id": "4132013748",
      "value": "无锡城市职业技术学院" },

    {
      "id": "4132013749",
      "value": "无锡工艺职业技术学院" }] },



  {
    "id": 8,
    "value": "南通市",
    "childs": [
    {
      "id": "4132010304",
      "value": "南通大学" },

    {
      "id": "4132010958",
      "value": "江苏工程职业技术学院" },

    {
      "id": "4132011052",
      "value": "南通职业大学" },

    {
      "id": "4132012056",
      "value": "南通理工学院" },

    {
      "id": "4132012684",
      "value": "南通科技职业学院" },

    {
      "id": "4132012703",
      "value": "南通航运职业技术学院" },

    {
      "id": "4132013993",
      "value": "南通大学杏林学院" },

    {
      "id": "4132014475",
      "value": "江苏商贸职业学院" },

    {
      "id": "4132014493",
      "value": "南通师范高等专科学校" }] },



  {
    "id": 9,
    "value": "淮安市",
    "childs": [
    {
      "id": "4132010323",
      "value": "淮阴师范学院" },

    {
      "id": "4132011049",
      "value": "淮阴工学院" },

    {
      "id": "4132012805",
      "value": "淮安信息职业技术学院" },

    {
      "id": "4132012919",
      "value": "炎黄职业技术学院" },

    {
      "id": "4132013104",
      "value": "江苏食品药品职业技术学院" },

    {
      "id": "4132013753",
      "value": "江苏财经职业技术学院" },

    {
      "id": "4132014541",
      "value": "江苏护理职业学院" }] },



  {
    "id": 10,
    "value": "连云港市",
    "childs": [
    {
      "id": "4132011050",
      "value": "连云港职业技术学院" },

    {
      "id": "4132011585",
      "value": "连云港师范高等专科学校" },

    {
      "id": "4132011641",
      "value": "淮海工学院" },

    {
      "id": "4132013980",
      "value": "南京医科大学康达学院" },

    {
      "id": "4132014542",
      "value": "江苏财会职业学院" }] },



  {
    "id": 11,
    "value": "扬州市",
    "childs": [
    {
      "id": "4132011117",
      "value": "扬州大学" },

    {
      "id": "4132011462",
      "value": "扬州市职业大学" },

    {
      "id": "4132012683",
      "value": "扬州环境资源职业技术学院" },

    {
      "id": "4132013113",
      "value": "江海职业技术学院" },

    {
      "id": "4132013754",
      "value": "扬州工业职业技术学院" },

    {
      "id": "4132013987",
      "value": "扬州大学广陵学院" },

    {
      "id": "4132013989",
      "value": "南京邮电大学通达学院" },

    {
      "id": "4132014528",
      "value": "扬州中瑞酒店职业学院" },

    {
      "id": "4132014604",
      "value": "江苏旅游职业学院" }] },



  {
    "id": 12,
    "value": "泰州市",
    "childs": [
    {
      "id": "4132012106",
      "value": "泰州职业技术学院" },

    {
      "id": "4132012806",
      "value": "江苏农牧科技职业学院" },

    {
      "id": "4132012917",
      "value": "泰州学院" },

    {
      "id": "4132013842",
      "value": "南京理工大学泰州科技学院" },

    {
      "id": "4132013843",
      "value": "南京师范大学泰州学院" },

    {
      "id": "4132013981",
      "value": "南京中医药大学翰林学院" },

    {
      "id": "4132013992",
      "value": "常州大学怀德学院" }] },



  {
    "id": 13,
    "value": "宿迁市",
    "childs": [
    {
      "id": "4132013110",
      "value": "宿迁职业技术学院" },

    {
      "id": "4132014160",
      "value": "宿迁学院" },

    {
      "id": "4132014293",
      "value": "宿迁泽达职业技术学院" }] },



  {
    "id": 14,
    "value": "张家港市",
    "childs": [
    {
      "id": "4132013991",
      "value": "江苏科技大学苏州理工学院" }] },



  {
    "id": 15,
    "value": "昆山市",
    "childs": [
    {
      "id": "4132016406",
      "value": "昆山杜克大学" }] }] },





{
  "id": 3,
  "value": "江西省",
  "childs": [
  {
    "id": 1,
    "value": "上饶市",
    "childs": [
    {
      "id": "3636000312",
      "value": "上饶幼儿师范高等专科学校" },

    {
      "id": "4136010416",
      "value": "上饶师范学院" },

    {
      "id": "4136010888",
      "value": "江西医学高等专科学校" },

    {
      "id": "4136013870",
      "value": "上饶职业技术学院" }] },



  {
    "id": 2,
    "value": "抚州市",
    "childs": [
    {
      "id": "3636000519",
      "value": "抚州幼儿师范高等专科学校" },

    {
      "id": "4136010405",
      "value": "东华理工大学" },

    {
      "id": "4136013428",
      "value": "抚州职业技术学院" },

    {
      "id": "4136013432",
      "value": "东华理工大学长江学院" },

    {
      "id": "4136013775",
      "value": "江西中医药高等专科学校" }] },



  {
    "id": 3,
    "value": "南昌市",
    "childs": [
    {
      "id": "4136010403",
      "value": "南昌大学" },

    {
      "id": "4136010404",
      "value": "华东交通大学" },

    {
      "id": "4136010406",
      "value": "南昌航空大学" },

    {
      "id": "4136010410",
      "value": "江西农业大学" },

    {
      "id": "4136010412",
      "value": "江西中医药大学" },

    {
      "id": "4136010414",
      "value": "江西师范大学" },

    {
      "id": "4136010421",
      "value": "江西财经大学" },

    {
      "id": "4136010839",
      "value": "江西工业职业技术学院" },

    {
      "id": "4136010846",
      "value": "江西科技学院" },

    {
      "id": "4136011318",
      "value": "江西科技师范大学" },

    {
      "id": "4136011319",
      "value": "南昌工程学院" },

    {
      "id": "4136011504",
      "value": "江西警察学院" },

    {
      "id": "4136012795",
      "value": "南昌理工学院" },

    {
      "id": "4136012929",
      "value": "江西司法警官职业学院" },

    {
      "id": "4136012932",
      "value": "江西旅游商贸职业学院" },

    {
      "id": "4136012933",
      "value": "江西电力职业技术学院" },

    {
      "id": "4136012936",
      "value": "江西艺术职业学院" },

    {
      "id": "4136012938",
      "value": "江西应用科技学院" },

    {
      "id": "4136012939",
      "value": "江西信息应用职业技术学院" },

    {
      "id": "4136012940",
      "value": "江西交通职业技术学院" },

    {
      "id": "4136012943",
      "value": "江西现代职业技术学院" },

    {
      "id": "4136012976",
      "value": "江西机电职业技术学院" },

    {
      "id": "4136013418",
      "value": "江西服装学院" },

    {
      "id": "4136013419",
      "value": "江西科技职业学院" },

    {
      "id": "4136013420",
      "value": "南昌职业学院" },

    {
      "id": "4136013421",
      "value": "南昌工学院" },

    {
      "id": "4136013422",
      "value": "江西外语外贸职业学院" },

    {
      "id": "4136013423",
      "value": "江西工业贸易职业技术学院" },

    {
      "id": "4136013426",
      "value": "江西生物科技职业学院" },

    {
      "id": "4136013427",
      "value": "江西建设职业技术学院" },

    {
      "id": "4136013429",
      "value": "南昌大学科学技术学院" },

    {
      "id": "4136013431",
      "value": "华东交通大学理工学院" },

    {
      "id": "4136013433",
      "value": "南昌航空大学科技学院" },

    {
      "id": "4136013436",
      "value": "江西农业大学南昌商学院" },

    {
      "id": "4136013437",
      "value": "江西中医药大学科技学院" },

    {
      "id": "4136013438",
      "value": "江西师范大学科学技术学院" },

    {
      "id": "4136013440",
      "value": "江西科技师范大学理工学院" },

    {
      "id": "4136013441",
      "value": "江西财经大学现代经济管理\n学院" },

    {
      "id": "4136013774",
      "value": "豫章师范学院" },

    {
      "id": "4136013776",
      "value": "江西先锋软件职业技术学院" },

    {
      "id": "4136013866",
      "value": "江西经济管理职业学院" },

    {
      "id": "4136013867",
      "value": "江西制造职业技术学院" },

    {
      "id": "4136013868",
      "value": "江西工程职业学院" },

    {
      "id": "4136013869",
      "value": "江西青年职业学院" },

    {
      "id": "4136013871",
      "value": "江西航空职业技术学院" },

    {
      "id": "4136013965",
      "value": "江西卫生职业学院" },

    {
      "id": "4136014168",
      "value": "江西泰豪动漫职业学院" },

    {
      "id": "4136014249",
      "value": "江西管理职业学院" },

    {
      "id": "4136014250",
      "value": "江西传媒职业学院" },

    {
      "id": "4136014321",
      "value": "江西工商职业技术学院" },

    {
      "id": "4136014437",
      "value": "南昌师范学院" },

    {
      "id": "4136014476",
      "value": "江西水利职业学院" },

    {
      "id": "4136014544",
      "value": "南昌影视传播职业学院" }] },



  {
    "id": 4,
    "value": "赣州市",
    "childs": [
    {
      "id": "4136010407",
      "value": "江西理工大学" },

    {
      "id": "4136010413",
      "value": "赣南医学院" },

    {
      "id": "4136010418",
      "value": "赣南师范大学" },

    {
      "id": "4136012934",
      "value": "江西环境工程职业学院" },

    {
      "id": "4136012942",
      "value": "江西应用技术职业学院" },

    {
      "id": "4136013434",
      "value": "江西理工大学应用科学学院" },

    {
      "id": "4136013439",
      "value": "赣南师范大学科技学院" },

    {
      "id": "4136014465",
      "value": "赣州师范高等专科学校" },

    {
      "id": "4136014569",
      "value": "赣南卫生健康职业学院" }] },



  {
    "id": 5,
    "value": "景德镇市",
    "childs": [
    {
      "id": "4136010408",
      "value": "景德镇陶瓷大学" },

    {
      "id": "4136010894",
      "value": "景德镇学院" },

    {
      "id": "4136012930",
      "value": "江西陶瓷工艺美术职业技术\n学院" },

    {
      "id": "4136013435",
      "value": "景德镇陶瓷大学科技艺术学院" },

    {
      "id": "4136014402",
      "value": "景德镇陶瓷职业技术学院" }] },



  {
    "id": 6,
    "value": "宜春市",
    "childs": [
    {
      "id": "4136010417",
      "value": "宜春学院" },

    {
      "id": "4136013424",
      "value": "宜春职业技术学院" },

    {
      "id": "4136013872",
      "value": "江西农业工程职业学院" },

    {
      "id": "4136014494",
      "value": "宜春幼儿师范高等专科学校" },

    {
      "id": "4136014505",
      "value": "江西洪州职业学院" }] },



  {
    "id": 7,
    "value": "吉安市",
    "childs": [
    {
      "id": "4136010419",
      "value": "井冈山大学" },

    {
      "id": "4136014504",
      "value": "吉安职业技术学院" }] },



  {
    "id": 8,
    "value": "萍乡市",
    "childs": [
    {
      "id": "4136010895",
      "value": "萍乡学院" },

    {
      "id": "4136012944",
      "value": "江西工业工程职业技术学院" },

    {
      "id": "4136013425",
      "value": "江西应用工程职业学院" }] },



  {
    "id": 9,
    "value": "九江市",
    "childs": [
    {
      "id": "4136011505",
      "value": "九江职业大学" },

    {
      "id": "4136011785",
      "value": "九江职业技术学院" },

    {
      "id": "4136011843",
      "value": "九江学院" },

    {
      "id": "4136012941",
      "value": "江西财经职业学院" },

    {
      "id": "4136013430",
      "value": "南昌大学共青学院" },

    {
      "id": "4136014167",
      "value": "江西枫林涉外经贸职业学院" },

    {
      "id": "4136014403",
      "value": "共青科技职业学院" }] },



  {
    "id": 10,
    "value": "新余市",
    "childs": [
    {
      "id": "4136011508",
      "value": "新余学院" },

    {
      "id": "4136012766",
      "value": "江西工程学院" },

    {
      "id": "4136013873",
      "value": "赣西科技职业学院" },

    {
      "id": "4136014166",
      "value": "江西新能源科技职业学院" },

    {
      "id": "4136014241",
      "value": "江西冶金职业技术学院" }] },



  {
    "id": 11,
    "value": "鹰潭市",
    "childs": [
    {
      "id": "4136012937",
      "value": "鹰潭职业技术学院" },

    {
      "id": "4136014537",
      "value": "江西师范高等专科学校" }] }] },





{
  "id": 4,
  "value": "湖南省",
  "childs": [
  {
    "id": 1,
    "value": "邵阳市",
    "childs": [
    {
      "id": "3643000496",
      "value": "湘中幼儿师范高等专科学校" },

    {
      "id": "4143010547",
      "value": "邵阳学院" },

    {
      "id": "4143012600",
      "value": "邵阳职业技术学院" }] },



  {
    "id": 2,
    "value": "湘潭市",
    "childs": [
    {
      "id": "4143010530",
      "value": "湘潭大学" },

    {
      "id": "4143010534",
      "value": "湖南科技大学" },

    {
      "id": "4143011342",
      "value": "湖南工程学院" },

    {
      "id": "4143012599",
      "value": "湘潭大学兴湘学院" },

    {
      "id": "4143012649",
      "value": "湖南科技大学潇湘学院" },

    {
      "id": "4143012660",
      "value": "湖南工程学院应用技术学院" },

    {
      "id": "4143012846",
      "value": "湘潭医卫职业技术学院" },

    {
      "id": "4143013044",
      "value": "湖南城建职业技术学院" },

    {
      "id": "4143013923",
      "value": "湖南理工职业技术学院" },

    {
      "id": "4143013925",
      "value": "湖南软件职业学院" },

    {
      "id": "4143014071",
      "value": "湖南电气职业技术学院" },

    {
      "id": "4143014182",
      "value": "湖南国防工业职业技术学院" },

    {
      "id": "4143014406",
      "value": "湖南吉利汽车职业技术学院" }] },



  {
    "id": 3,
    "value": "湘西土家族苗族自治州",
    "childs": [
    {
      "id": "4143010531",
      "value": "吉首大学" },

    {
      "id": "4143013805",
      "value": "湘西民族职业技术学院" }] },



  {
    "id": 4,
    "value": "长沙市",
    "childs": [
    {
      "id": "4143010532",
      "value": "湖南大学" },

    {
      "id": "4143010533",
      "value": "中南大学" },

    {
      "id": "4143010536",
      "value": "长沙理工大学" },

    {
      "id": "4143010537",
      "value": "湖南农业大学" },

    {
      "id": "4143010538",
      "value": "中南林业科技大学" },

    {
      "id": "4143010541",
      "value": "湖南中医药大学" },

    {
      "id": "4143010542",
      "value": "湖南师范大学" },

    {
      "id": "4143010554",
      "value": "湖南商学院" },

    {
      "id": "4143010823",
      "value": "长沙医学院" },

    {
      "id": "4143010827",
      "value": "长沙民政职业技术学院" },

    {
      "id": "4143010830",
      "value": "湖南工业职业技术学院" },

    {
      "id": "4143010865",
      "value": "湖南信息职业技术学院" },

    {
      "id": "4143011077",
      "value": "长沙学院" },

    {
      "id": "4143011532",
      "value": "湖南财政经济学院" },

    {
      "id": "4143011534",
      "value": "湖南警察学院" },

    {
      "id": "4143011538",
      "value": "湖南女子学院" },

    {
      "id": "4143011601",
      "value": "湖南税务高等专科学校" },

    {
      "id": "4143012034",
      "value": "湖南第一师范学院" },

    {
      "id": "4143012055",
      "value": "长沙航空职业技术学院" },

    {
      "id": "4143012300",
      "value": "湖南大众传媒职业技术学院" },

    {
      "id": "4143012303",
      "value": "湖南涉外经济学院" },

    {
      "id": "4143012304",
      "value": "湖南科技职业学院" },

    {
      "id": "4143012343",
      "value": "湖南生物机电职业技术学院" },

    {
      "id": "4143012397",
      "value": "湖南交通职业技术学院" },

    {
      "id": "4143012401",
      "value": "湖南商务职业技术学院" },

    {
      "id": "4143012423",
      "value": "湖南体育职业学院" },

    {
      "id": "4143012425",
      "value": "湖南工程职业技术学院" },

    {
      "id": "4143012596",
      "value": "保险职业学院" },

    {
      "id": "4143012597",
      "value": "湖南外贸职业学院" },

    {
      "id": "4143012598",
      "value": "湖南网络工程职业学院" },

    {
      "id": "4143012601",
      "value": "湖南司法警官职业学院" },

    {
      "id": "4143012603",
      "value": "长沙商贸旅游职业技术学院" },

    {
      "id": "4143012651",
      "value": "湖南商学院北津学院" },

    {
      "id": "4143012652",
      "value": "湖南师范大学树达学院" },

    {
      "id": "4143012653",
      "value": "湖南农业大学东方科技学院" },

    {
      "id": "4143012656",
      "value": "中南林业科技大学涉外学院" },

    {
      "id": "4143012661",
      "value": "湖南中医药大学湘杏学院" },

    {
      "id": "4143012845",
      "value": "湖南邮电职业技术学院" },

    {
      "id": "4143013031",
      "value": "长沙环境保护职业技术学院" },

    {
      "id": "4143013032",
      "value": "湖南艺术职业学院" },

    {
      "id": "4143013033",
      "value": "湖南机电职业技术学院" },

    {
      "id": "4143013036",
      "value": "长沙职业技术学院" },

    {
      "id": "4143013041",
      "value": "长沙南方职业学院" },

    {
      "id": "4143013635",
      "value": "长沙理工大学城南学院" },

    {
      "id": "4143013806",
      "value": "长沙师范学院" },

    {
      "id": "4143013836",
      "value": "湖南信息学院" },

    {
      "id": "4143013938",
      "value": "长沙电力职业技术学院" },

    {
      "id": "4143013939",
      "value": "湖南水利水电职业技术学院" },

    {
      "id": "4143013940",
      "value": "湖南现代物流职业技术学院" },

    {
      "id": "4143014025",
      "value": "湖南安全技术职业学院" },

    {
      "id": "4143014072",
      "value": "湖南外国语职业学院" },

    {
      "id": "4143014121",
      "value": "湖南都市职业学院" },

    {
      "id": "4143014122",
      "value": "湖南电子科技职业学院" },

    {
      "id": "4143014322",
      "value": "湖南三一工业职业技术学院" },

    {
      "id": "4143014358",
      "value": "长沙卫生职业学院" },

    {
      "id": "4143014359",
      "value": "湖南食品药品职业学院" },

    {
      "id": "4143014508",
      "value": "湖南劳动人事职业学院" }] },



  {
    "id": 5,
    "value": "岳阳市",
    "childs": [
    {
      "id": "4143010543",
      "value": "湖南理工学院" },

    {
      "id": "4143012658",
      "value": "湖南理工学院南湖学院" },

    {
      "id": "4143013038",
      "value": "岳阳职业技术学院" },

    {
      "id": "4143013045",
      "value": "湖南石油化工职业技术学院" },

    {
      "id": "4143013804",
      "value": "湖南民族职业学院" }] },



  {
    "id": 6,
    "value": "郴州市",
    "childs": [
    {
      "id": "4143010545",
      "value": "湘南学院" },

    {
      "id": "4143012847",
      "value": "郴州职业技术学院" },

    {
      "id": "4143014495",
      "value": "湘南幼儿师范高等专科学校" }] },



  {
    "id": 7,
    "value": "衡阳市",
    "childs": [
    {
      "id": "4143010546",
      "value": "衡阳师范学院" },

    {
      "id": "4143010555",
      "value": "南华大学" },

    {
      "id": "4143011528",
      "value": "湖南工学院" },

    {
      "id": "4143012650",
      "value": "南华大学船山学院" },

    {
      "id": "4143012659",
      "value": "衡阳师范学院南岳学院" },

    {
      "id": "4143012739",
      "value": "湖南环境生物职业技术学院" },

    {
      "id": "4143013807",
      "value": "湖南财经工业职业技术学院" },

    {
      "id": "4143013924",
      "value": "湖南交通工程学院" },

    {
      "id": "4143013941",
      "value": "湖南高速铁路职业技术学院" },

    {
      "id": "4143014310",
      "value": "湖南工商职业学院" }] },



  {
    "id": 8,
    "value": "怀化市",
    "childs": [
    {
      "id": "4143010548",
      "value": "怀化学院" },

    {
      "id": "4143012214",
      "value": "湖南医药学院" },

    {
      "id": "4143013037",
      "value": "怀化职业技术学院" }] },



  {
    "id": 9,
    "value": "常德市",
    "childs": [
    {
      "id": "4143010549",
      "value": "湖南文理学院" },

    {
      "id": "4143012657",
      "value": "湖南文理学院芙蓉学院" },

    {
      "id": "4143013039",
      "value": "常德职业技术学院" },

    {
      "id": "4143013809",
      "value": "湖南应用技术学院" },

    {
      "id": "4143014309",
      "value": "湖南高尔夫旅游职业学院" },

    {
      "id": "4143014468",
      "value": "湖南幼儿师范高等专科学校" }] },



  {
    "id": 10,
    "value": "永州市",
    "childs": [
    {
      "id": "4143010551",
      "value": "湖南科技学院" },

    {
      "id": "4143012301",
      "value": "永州职业技术学院" },

    {
      "id": "4143013922",
      "value": "湖南九嶷职业技术学院" }] },



  {
    "id": 11,
    "value": "娄底市",
    "childs": [
    {
      "id": "4143010553",
      "value": "湖南人文科技学院" },

    {
      "id": "4143012848",
      "value": "娄底职业技术学院" },

    {
      "id": "4143013042",
      "value": "潇湘职业学院" }] },



  {
    "id": 12,
    "value": "株洲市",
    "childs": [
    {
      "id": "4143010836",
      "value": "株洲师范高等专科学校" },

    {
      "id": "4143011535",
      "value": "湖南工业大学" },

    {
      "id": "4143011604",
      "value": "湖南冶金职业技术学院" },

    {
      "id": "4143012302",
      "value": "湖南铁道职业技术学院" },

    {
      "id": "4143012604",
      "value": "湖南工业大学科技学院" },

    {
      "id": "4143013043",
      "value": "湖南化工职业技术学院" },

    {
      "id": "4143013802",
      "value": "湖南中医药高等专科学校" },

    {
      "id": "4143013937",
      "value": "湖南汽车工程职业学院" },

    {
      "id": "4143013942",
      "value": "湖南铁路科技职业技术学院" },

    {
      "id": "4143014360",
      "value": "湖南有色金属职业技术学院" }] },



  {
    "id": 13,
    "value": "益阳市",
    "childs": [
    {
      "id": "4143011527",
      "value": "湖南城市学院" },

    {
      "id": "4143013808",
      "value": "益阳职业技术学院" },

    {
      "id": "4143013921",
      "value": "湖南工艺美术职业学院" },

    {
      "id": "4143014097",
      "value": "益阳医学高等专科学校" }] },



  {
    "id": 14,
    "value": "张家界市",
    "childs": [
    {
      "id": "4143012662",
      "value": "吉首大学张家界学院" },

    {
      "id": "4143012849",
      "value": "张家界航空工业职业技术学院" }] }] },





{
  "id": 5,
  "value": "北京",
  "childs": [
  {
    "id": 1,
    "value": "北京市",
    "childs": [
    {
      "id": "4111010001",
      "value": "北京大学" },

    {
      "id": "4111010002",
      "value": "中国人民大学" },

    {
      "id": "4111010003",
      "value": "清华大学" },

    {
      "id": "4111010004",
      "value": "北京交通大学" },

    {
      "id": "4111010005",
      "value": "北京工业大学" },

    {
      "id": "4111010006",
      "value": "北京航空航天大学" },

    {
      "id": "4111010007",
      "value": "北京理工大学" },

    {
      "id": "4111010008",
      "value": "北京科技大学" },

    {
      "id": "4111010009",
      "value": "北方工业大学" },

    {
      "id": "4111010010",
      "value": "北京化工大学" },

    {
      "id": "4111010011",
      "value": "北京工商大学" },

    {
      "id": "4111010012",
      "value": "北京服装学院" },

    {
      "id": "4111010013",
      "value": "北京邮电大学" },

    {
      "id": "4111010015",
      "value": "北京印刷学院" },

    {
      "id": "4111010016",
      "value": "北京建筑大学" },

    {
      "id": "4111010017",
      "value": "北京石油化工学院" },

    {
      "id": "4111010018",
      "value": "北京电子科技学院" },

    {
      "id": "4111010019",
      "value": "中国农业大学" },

    {
      "id": "4111010020",
      "value": "北京农学院" },

    {
      "id": "4111010022",
      "value": "北京林业大学" },

    {
      "id": "4111010023",
      "value": "北京协和医学院" },

    {
      "id": "4111010025",
      "value": "首都医科大学" },

    {
      "id": "4111010026",
      "value": "北京中医药大学" },

    {
      "id": "4111010027",
      "value": "北京师范大学" },

    {
      "id": "4111010028",
      "value": "首都师范大学" },

    {
      "id": "4111010029",
      "value": "首都体育学院" },

    {
      "id": "4111010030",
      "value": "北京外国语大学" },

    {
      "id": "4111010031",
      "value": "北京第二外国语学院" },

    {
      "id": "4111010032",
      "value": "北京语言大学" },

    {
      "id": "4111010033",
      "value": "中国传媒大学" },

    {
      "id": "4111010034",
      "value": "中央财经大学" },

    {
      "id": "4111010036",
      "value": "对外经济贸易大学" },

    {
      "id": "4111010037",
      "value": "北京物资学院" },

    {
      "id": "4111010038",
      "value": "首都经济贸易大学" },

    {
      "id": "4111010040",
      "value": "外交学院" },

    {
      "id": "4111010041",
      "value": "中国人民公安大学" },

    {
      "id": "4111010042",
      "value": "国际关系学院" },

    {
      "id": "4111010043",
      "value": "北京体育大学" },

    {
      "id": "4111010045",
      "value": "中央音乐学院" },

    {
      "id": "4111010046",
      "value": "中国音乐学院" },

    {
      "id": "4111010047",
      "value": "中央美术学院" },

    {
      "id": "4111010048",
      "value": "中央戏剧学院" },

    {
      "id": "4111010049",
      "value": "中国戏曲学院" },

    {
      "id": "4111010050",
      "value": "北京电影学院" },

    {
      "id": "4111010051",
      "value": "北京舞蹈学院" },

    {
      "id": "4111010052",
      "value": "中央民族大学" },

    {
      "id": "4111010053",
      "value": "中国政法大学" },

    {
      "id": "4111010054",
      "value": "华北电力大学" },

    {
      "id": "4111010853",
      "value": "北京工业职业技术学院" },

    {
      "id": "4111010857",
      "value": "北京信息职业技术学院" },

    {
      "id": "4111010858",
      "value": "北京电子科技职业学院" },

    {
      "id": "4111011090",
      "value": "北京京北职业技术学院" },

    {
      "id": "4111011092",
      "value": "北京交通职业技术学院" },

    {
      "id": "4111011149",
      "value": "中华女子学院" },

    {
      "id": "4111011232",
      "value": "北京信息科技大学" },

    {
      "id": "4111011413",
      "value": "中国矿业大学（北京）" },

    {
      "id": "4111011414",
      "value": "中国石油大学（北京）" },

    {
      "id": "4111011415",
      "value": "中国地质大学（北京）" },

    {
      "id": "4111011417",
      "value": "北京联合大学" },

    {
      "id": "4111011418",
      "value": "北京城市学院" },

    {
      "id": "4111011625",
      "value": "中国青年政治学院" },

    {
      "id": "4111011626",
      "value": "北京青年政治学院" },

    {
      "id": "4111011831",
      "value": "首钢工学院" },

    {
      "id": "4111012448",
      "value": "北京农业职业学院" },

    {
      "id": "4111012451",
      "value": "北京政法职业学院" },

    {
      "id": "4111012453",
      "value": "中国劳动关系学院" },

    {
      "id": "4111012561",
      "value": "北京财贸职业学院" },

    {
      "id": "4111012564",
      "value": "北京北大方正软件职业技术\n学院" },

    {
      "id": "4111012565",
      "value": "北京经贸职业学院" },

    {
      "id": "4111012566",
      "value": "北京经济技术职业学院" },

    {
      "id": "4111012567",
      "value": "北京戏曲艺术职业学院" },

    {
      "id": "4111012568",
      "value": "北京汇佳职业学院" },

    {
      "id": "4111012733",
      "value": "北京科技经营管理学院" },

    {
      "id": "4111012802",
      "value": "北京吉利学院" },

    {
      "id": "4111013629",
      "value": "首都师范大学科德学院" },

    {
      "id": "4111013630",
      "value": "北京工商大学嘉华学院" },

    {
      "id": "4111013703",
      "value": "北京科技职业学院" },

    {
      "id": "4111013728",
      "value": "北京培黎职业学院" },

    {
      "id": "4111013901",
      "value": "北京邮电大学世纪学院" },

    {
      "id": "4111013904",
      "value": "北京工业大学耿丹学院" },

    {
      "id": "4111014019",
      "value": "北京警察学院" },

    {
      "id": "4111014073",
      "value": "北京经济管理职业学院" },

    {
      "id": "4111014075",
      "value": "北京劳动保障职业学院" },

    {
      "id": "4111014139",
      "value": "北京社会管理职业学院" },

    {
      "id": "4111014140",
      "value": "北京艺术传媒职业学院" },

    {
      "id": "4111014201",
      "value": "北京第二外国语学院中瑞酒店管理学院" },

    {
      "id": "4111014215",
      "value": "北京体育职业学院" },

    {
      "id": "4111014279",
      "value": "北京交通运输职业学院" },

    {
      "id": "4111014395",
      "value": "北京卫生职业学院" },

    {
      "id": "4111014430",
      "value": "中国科学院大学" },

    {
      "id": "4111014588",
      "value": "北京网络职业学院" },

    {
      "id": "4111014596",
      "value": "中国社会科学院大学" }] }] },





{
  "id": 6,
  "value": "天津",
  "childs": [
  {
    "id": 1,
    "value": "天津市",
    "childs": [
    {
      "id": "4112010055",
      "value": "南开大学" },

    {
      "id": "4112010056",
      "value": "天津大学" },

    {
      "id": "4112010057",
      "value": "天津科技大学" },

    {
      "id": "4112010058",
      "value": "天津工业大学" },

    {
      "id": "4112010059",
      "value": "中国民航大学" },

    {
      "id": "4112010060",
      "value": "天津理工大学" },

    {
      "id": "4112010061",
      "value": "天津农学院" },

    {
      "id": "4112010062",
      "value": "天津医科大学" },

    {
      "id": "4112010063",
      "value": "天津中医药大学" },

    {
      "id": "4112010065",
      "value": "天津师范大学" },

    {
      "id": "4112010066",
      "value": "天津职业技术师范大学" },

    {
      "id": "4112010068",
      "value": "天津外国语大学" },

    {
      "id": "4112010069",
      "value": "天津商业大学" },

    {
      "id": "4112010070",
      "value": "天津财经大学" },

    {
      "id": "4112010071",
      "value": "天津体育学院" },

    {
      "id": "4112010072",
      "value": "天津音乐学院" },

    {
      "id": "4112010073",
      "value": "天津美术学院" },

    {
      "id": "4112010792",
      "value": "天津城建大学" },

    {
      "id": "4112010859",
      "value": "天津天狮学院" },

    {
      "id": "4112011032",
      "value": "天津市职业大学" },

    {
      "id": "4112012105",
      "value": "天津中德应用技术大学" },

    {
      "id": "4112012484",
      "value": "天津滨海职业学院" },

    {
      "id": "4112012487",
      "value": "天津工程职业技术学院" },

    {
      "id": "4112012535",
      "value": "天津青年职业学院" },

    {
      "id": "4112012719",
      "value": "天津渤海职业技术学院" },

    {
      "id": "4112012720",
      "value": "天津电子信息职业技术学院" },

    {
      "id": "4112012721",
      "value": "天津机电职业技术学院" },

    {
      "id": "4112012722",
      "value": "天津现代职业技术学院" },

    {
      "id": "4112012723",
      "value": "天津公安警官职业学院" },

    {
      "id": "4112012732",
      "value": "天津轻工职业技术学院" },

    {
      "id": "4112012788",
      "value": "天津商务职业学院" },

    {
      "id": "4112012803",
      "value": "天津国土资源和房屋职业学院" },

    {
      "id": "4112012880",
      "value": "天津医学高等专科学校" },

    {
      "id": "4112012881",
      "value": "天津开发区职业技术学院" },

    {
      "id": "4112012882",
      "value": "天津艺术职业学院" },

    {
      "id": "4112012883",
      "value": "天津交通职业学院" },

    {
      "id": "4112013658",
      "value": "天津外国语大学滨海外事学院" },

    {
      "id": "4112013659",
      "value": "天津体育学院运动与文化艺术\n学院" },

    {
      "id": "4112013660",
      "value": "天津商业大学宝德学院" },

    {
      "id": "4112013661",
      "value": "天津医科大学临床医学院" },

    {
      "id": "4112013663",
      "value": "南开大学滨海学院" },

    {
      "id": "4112013700",
      "value": "天津冶金职业技术学院" },

    {
      "id": "4112013701",
      "value": "天津石油职业技术学院" },

    {
      "id": "4112013702",
      "value": "天津城市职业学院" },

    {
      "id": "4112013863",
      "value": "天津铁道职业技术学院" },

    {
      "id": "4112013896",
      "value": "天津师范大学津沽学院" },

    {
      "id": "4112013897",
      "value": "天津理工大学中环信息学院" },

    {
      "id": "4112013898",
      "value": "北京科技大学天津学院" },

    {
      "id": "4112013911",
      "value": "天津工艺美术职业学院" },

    {
      "id": "4112014020",
      "value": "天津城市建设管理职业技术\n学院" },

    {
      "id": "4112014021",
      "value": "天津生物工程职业技术学院" },

    {
      "id": "4112014022",
      "value": "天津海运职业学院" },

    {
      "id": "4112014038",
      "value": "天津大学仁爱学院" },

    {
      "id": "4112014087",
      "value": "天津财经大学珠江学院" },

    {
      "id": "4112014102",
      "value": "天津广播影视职业学院" },

    {
      "id": "4112014599",
      "value": "天津体育职业学院" },

    {
      "id": "4112014600",
      "value": "天津滨海汽车工程职业学院" },

    {
      "id": "4113010080",
      "value": "河北工业大学" }] }] },





{
  "id": 7,
  "value": "河北省",
  "childs": [
  {
    "id": 1,
    "value": "保定市",
    "childs": [
    {
      "id": "4113010075",
      "value": "河北大学" },

    {
      "id": "4113010086",
      "value": "河北农业大学" },

    {
      "id": "4113010096",
      "value": "保定学院" },

    {
      "id": "4113011420",
      "value": "河北金融学院" },

    {
      "id": "4113011903",
      "value": "中央司法警官学院" },

    {
      "id": "4113012352",
      "value": "河北软件职业技术学院" },

    {
      "id": "4113012543",
      "value": "保定职业技术学院" },

    {
      "id": "4113013391",
      "value": "河北科技学院" },

    {
      "id": "4113013392",
      "value": "保定电力职业技术学院" },

    {
      "id": "4113013404",
      "value": "河北大学工商学院" },

    {
      "id": "4113013417",
      "value": "华北电力大学科技学院" },

    {
      "id": "4113013595",
      "value": "河北农业大学现代科技学院" },

    {
      "id": "4113013891",
      "value": "中国地质大学长城学院" },

    {
      "id": "4113014103",
      "value": "冀中职业学院" },

    {
      "id": "4113014460",
      "value": "保定幼儿师范高等专科学校" },

    {
      "id": "4113014471",
      "value": "河北工艺美术职业学院" }] },



  {
    "id": 2,
    "value": "邯郸市",
    "childs": [
    {
      "id": "4113010076",
      "value": "河北工程大学" },

    {
      "id": "4113010103",
      "value": "邯郸学院" },

    {
      "id": "4113011034",
      "value": "邯郸职业技术学院" },

    {
      "id": "4113013578",
      "value": "河北工程大学科信学院" },

    {
      "id": "4113013690",
      "value": "河北司法警官职业学院" }] },



  {
    "id": 3,
    "value": "石家庄市",
    "childs": [
    {
      "id": "4113010077",
      "value": "河北地质大学" },

    {
      "id": "4113010082",
      "value": "河北科技大学" },

    {
      "id": "4113010089",
      "value": "河北医科大学" },

    {
      "id": "4113010094",
      "value": "河北师范大学" },

    {
      "id": "4113010102",
      "value": "石家庄学院" },

    {
      "id": "4113010107",
      "value": "石家庄铁道大学" },

    {
      "id": "4113010873",
      "value": "河北工业职业技术学院" },

    {
      "id": "4113011236",
      "value": "河北体育学院" },

    {
      "id": "4113011238",
      "value": "石家庄职业技术学院" },

    {
      "id": "4113011832",
      "value": "河北经贸大学" },

    {
      "id": "4113012408",
      "value": "河北政法职业学院" },

    {
      "id": "4113012424",
      "value": "石家庄铁路职业技术学院" },

    {
      "id": "4113012782",
      "value": "石家庄工程职业学院" },

    {
      "id": "4113012783",
      "value": "石家庄城市经济职业学院" },

    {
      "id": "4113012784",
      "value": "河北传媒学院" },

    {
      "id": "4113012796",
      "value": "河北工程技术学院" },

    {
      "id": "4113012885",
      "value": "河北省艺术职业学院" },

    {
      "id": "4113013070",
      "value": "石家庄财经职业学院" },

    {
      "id": "4113013071",
      "value": "河北交通职业技术学院" },

    {
      "id": "4113013072",
      "value": "河北化工医药职业技术学院" },

    {
      "id": "4113013073",
      "value": "石家庄信息工程职业学院" },

    {
      "id": "4113013075",
      "value": "河北美术学院" },

    {
      "id": "4113013397",
      "value": "石家庄邮电职业技术学院" },

    {
      "id": "4113013398",
      "value": "河北公安警察职业学院" },

    {
      "id": "4113013399",
      "value": "石家庄工商职业学院" },

    {
      "id": "4113013400",
      "value": "石家庄理工职业学院" },

    {
      "id": "4113013402",
      "value": "河北外国语学院" },

    {
      "id": "4113013403",
      "value": "石家庄科技信息职业学院" },

    {
      "id": "4113013409",
      "value": "河北科技大学理工学院" },

    {
      "id": "4113013411",
      "value": "河北师范大学汇华学院" },

    {
      "id": "4113013414",
      "value": "河北经贸大学经济管理学院" },

    {
      "id": "4113013415",
      "value": "河北医科大学临床学院" },

    {
      "id": "4113013593",
      "value": "石家庄铁道大学四方学院" },

    {
      "id": "4113013594",
      "value": "河北地质大学华信学院" },

    {
      "id": "4113013822",
      "value": "河北女子职业技术学院" },

    {
      "id": "4113014018",
      "value": "石家庄医学高等专科学校" },

    {
      "id": "4113014047",
      "value": "石家庄经济职业学院" },

    {
      "id": "4113014158",
      "value": "石家庄人民医学高等专科学校" },

    {
      "id": "4113014185",
      "value": "石家庄科技工程职业学院" },

    {
      "id": "4113014208",
      "value": "河北劳动关系职业学院" },

    {
      "id": "4113014213",
      "value": "石家庄科技职业学院" },

    {
      "id": "4113014328",
      "value": "石家庄幼儿师范高等专科学校" },

    {
      "id": "4113014396",
      "value": "河北轨道运输职业技术学院" },

    {
      "id": "4113014432",
      "value": "河北中医学院" }] },



  {
    "id": 4,
    "value": "唐山市",
    "childs": [
    {
      "id": "4113010081",
      "value": "华北理工大学" },

    {
      "id": "4113010099",
      "value": "唐山师范学院" },

    {
      "id": "4113011033",
      "value": "唐山学院" },

    {
      "id": "4113012418",
      "value": "河北能源职业技术学院" },

    {
      "id": "4113012785",
      "value": "唐山职业技术学院" },

    {
      "id": "4113012787",
      "value": "唐山工业职业技术学院" },

    {
      "id": "4113013396",
      "value": "唐山科技职业技术学院" },

    {
      "id": "4113013408",
      "value": "华北理工大学轻工学院" },

    {
      "id": "4113013596",
      "value": "华北理工大学冀唐学院" },

    {
      "id": "4113014586",
      "value": "唐山幼儿师范高等专科学校" },

    {
      "id": "4113014601",
      "value": "曹妃甸职业技术学院" }] },



  {
    "id": 5,
    "value": "张家口市",
    "childs": [
    {
      "id": "4113010084",
      "value": "河北建筑工程学院" },

    {
      "id": "4113010092",
      "value": "河北北方学院" },

    {
      "id": "4113011423",
      "value": "张家口职业技术学院" },

    {
      "id": "4113014260",
      "value": "宣化科技职业学院" },

    {
      "id": "4113014458",
      "value": "张家口学院" }] },



  {
    "id": 6,
    "value": "沧州市",
    "childs": [
    {
      "id": "4113010085",
      "value": "河北水利电力学院" },

    {
      "id": "4113010105",
      "value": "沧州师范学院" },

    {
      "id": "4113012415",
      "value": "沧州职业技术学院" },

    {
      "id": "4113013394",
      "value": "渤海石油职业学院" },

    {
      "id": "4113013779",
      "value": "沧州医学高等专科学校" },

    {
      "id": "4113014202",
      "value": "北京交通大学海滨学院" },

    {
      "id": "4113014259",
      "value": "泊头职业学院" },

    {
      "id": "4113014472",
      "value": "渤海理工职业学院" }] },



  {
    "id": 7,
    "value": "承德市",
    "childs": [
    {
      "id": "4113010093",
      "value": "承德医学院" },

    {
      "id": "4113010098",
      "value": "河北民族师范学院" },

    {
      "id": "4113011777",
      "value": "承德石油高等专科学校" },

    {
      "id": "4113012887",
      "value": "河北旅游职业学院" },

    {
      "id": "4113014281",
      "value": "承德护理职业学院" }] },



  {
    "id": 8,
    "value": "廊坊市",
    "childs": [
    {
      "id": "4113010100",
      "value": "廊坊师范学院" },

    {
      "id": "4113011104",
      "value": "华北科技学院" },

    {
      "id": "4113011105",
      "value": "中国人民武装警察部队学院" },

    {
      "id": "4113011629",
      "value": "北华航天工业学院" },

    {
      "id": "4113011775",
      "value": "防灾科技学院" },

    {
      "id": "4113012367",
      "value": "河北石油职业技术学院" },

    {
      "id": "4113013395",
      "value": "廊坊职业技术学院" },

    {
      "id": "4113013584",
      "value": "河北工业大学城市学院" },

    {
      "id": "4113013895",
      "value": "燕京理工学院" },

    {
      "id": "4113013899",
      "value": "北京中医药大学东方学院" },

    {
      "id": "4113014225",
      "value": "河北东方学院" },

    {
      "id": "4113014280",
      "value": "廊坊燕京职业技术学院" },

    {
      "id": "4113014335",
      "value": "廊坊卫生职业学院" }] },



  {
    "id": 9,
    "value": "衡水市",
    "childs": [
    {
      "id": "4113010101",
      "value": "衡水学院" },

    {
      "id": "4113012786",
      "value": "衡水职业技术学院" }] },



  {
    "id": 10,
    "value": "邢台市",
    "childs": [
    {
      "id": "4113010104",
      "value": "邢台学院" },

    {
      "id": "4113011821",
      "value": "邢台职业技术学院" },

    {
      "id": "4113012884",
      "value": "邢台医学高等专科学校" },

    {
      "id": "4113013393",
      "value": "河北机电职业技术学院" }] },



  {
    "id": 11,
    "value": "秦皇岛市",
    "childs": [
    {
      "id": "4113010216",
      "value": "燕山大学" },

    {
      "id": "4113010798",
      "value": "河北科技师范学院" },

    {
      "id": "4113012389",
      "value": "河北建材职业技术学院" },

    {
      "id": "4113012773",
      "value": "秦皇岛职业技术学院" },

    {
      "id": "4113013074",
      "value": "河北对外经贸职业学院" },

    {
      "id": "4113013592",
      "value": "燕山大学里仁学院" },

    {
      "id": "4213051721",
      "value": "河北环境工程学院" }] }] },





{
  "id": 8,
  "value": "山西省",
  "childs": [
  {
    "id": 1,
    "value": "太原市",
    "childs": [
    {
      "id": "4114010108",
      "value": "山西大学" },

    {
      "id": "4114010109",
      "value": "太原科技大学" },

    {
      "id": "4114010110",
      "value": "中北大学" },

    {
      "id": "4114010112",
      "value": "太原理工大学" },

    {
      "id": "4114010114",
      "value": "山西医科大学" },

    {
      "id": "4114010119",
      "value": "太原师范学院" },

    {
      "id": "4114010125",
      "value": "山西财经大学" },

    {
      "id": "4114010809",
      "value": "山西中医药大学" },

    {
      "id": "4114011242",
      "value": "太原学院" },

    {
      "id": "4114011630",
      "value": "山西省财政税务专科学校" },

    {
      "id": "4114012111",
      "value": "山西警察学院" },

    {
      "id": "4114012704",
      "value": "山西艺术职业学院" },

    {
      "id": "4114012775",
      "value": "山西建筑职业技术学院" },

    {
      "id": "4114012776",
      "value": "山西药科职业学院" },

    {
      "id": "4114012777",
      "value": "山西工程职业技术学院" },

    {
      "id": "4114012778",
      "value": "山西交通职业技术学院" },

    {
      "id": "4114012779",
      "value": "山西应用科技学院" },

    {
      "id": "4114012889",
      "value": "山西戏剧职业学院" },

    {
      "id": "4114012890",
      "value": "山西财贸职业技术学院" },

    {
      "id": "4114012891",
      "value": "山西林业职业技术学院" },

    {
      "id": "4114013528",
      "value": "山西职业技术学院" },

    {
      "id": "4114013529",
      "value": "山西煤炭职业技术学院" },

    {
      "id": "4114013530",
      "value": "山西金融职业学院" },

    {
      "id": "4114013532",
      "value": "太原城市职业技术学院" },

    {
      "id": "4114013533",
      "value": "山西大学商务学院" },

    {
      "id": "4114013534",
      "value": "太原理工大学现代科技学院" },

    {
      "id": "4114013538",
      "value": "中北大学信息商务学院" },

    {
      "id": "4114013597",
      "value": "太原科技大学华科学院" },

    {
      "id": "4114013598",
      "value": "山西医科大学晋祠学院" },

    {
      "id": "4114013608",
      "value": "山西财经大学华商学院" },

    {
      "id": "4114013691",
      "value": "山西工商学院" },

    {
      "id": "4114013692",
      "value": "山西体育职业学院" },

    {
      "id": "4114013693",
      "value": "山西警官职业学院" },

    {
      "id": "4114013694",
      "value": "山西国际商务职业学院" },

    {
      "id": "4114013696",
      "value": "太原旅游职业学院" },

    {
      "id": "4114013697",
      "value": "山西旅游职业学院" },

    {
      "id": "4114013745",
      "value": "山西电力职业技术学院" },

    {
      "id": "4114014101",
      "value": "太原工业学院" },

    {
      "id": "4114014105",
      "value": "山西老区职业技术学院" },

    {
      "id": "4114014177",
      "value": "山西经贸职业学院" },

    {
      "id": "4114014247",
      "value": "山西轻工职业技术学院" },

    {
      "id": "4114014336",
      "value": "山西青年职业学院" },

    {
      "id": "4114014434",
      "value": "山西传媒学院" }] },



  {
    "id": 2,
    "value": "晋中市",
    "childs": [
    {
      "id": "4114010113",
      "value": "山西农业大学" },

    {
      "id": "4114010121",
      "value": "晋中学院" },

    {
      "id": "4114013535",
      "value": "山西农业大学信息学院" },

    {
      "id": "4114013862",
      "value": "山西同文职业技术学院" },

    {
      "id": "4114013913",
      "value": "晋中职业技术学院" },

    {
      "id": "4114013914",
      "value": "山西华澳商贸职业学院" },

    {
      "id": "4114014270",
      "value": "晋中师范高等专科学校" },

    {
      "id": "4214051189",
      "value": "山西能源学院" }] },



  {
    "id": 3,
    "value": "长治市",
    "childs": [
    {
      "id": "4114010117",
      "value": "长治医学院" },

    {
      "id": "4114010122",
      "value": "长治学院" },

    {
      "id": "4114012388",
      "value": "长治职业技术学院" },

    {
      "id": "4114012888",
      "value": "山西机电职业技术学院" },

    {
      "id": "4114013695",
      "value": "潞安职业技术学院" }] },



  {
    "id": 4,
    "value": "临汾市",
    "childs": [
    {
      "id": "4114010118",
      "value": "山西师范大学" },

    {
      "id": "4114013171",
      "value": "临汾职业技术学院" },

    {
      "id": "4114013537",
      "value": "山西师范大学现代文理学院" },

    {
      "id": "4114013541",
      "value": "山西信息职业技术学院" },

    {
      "id": "4114013698",
      "value": "山西管理职业学院" }] },



  {
    "id": 5,
    "value": "大同市",
    "childs": [
    {
      "id": "4114010120",
      "value": "山西大同大学" },

    {
      "id": "4114012780",
      "value": "大同煤炭职业技术学院" }] },



  {
    "id": 6,
    "value": "运城市",
    "childs": [
    {
      "id": "4114010123",
      "value": "运城学院" },

    {
      "id": "4114012892",
      "value": "山西水利职业技术学院" },

    {
      "id": "4114013934",
      "value": "山西运城农业职业技术学院" },

    {
      "id": "4114014093",
      "value": "运城幼儿师范高等专科学校" },

    {
      "id": "4114014226",
      "value": "运城职业技术学院" },

    {
      "id": "4114014397",
      "value": "运城护理职业学院" },

    {
      "id": "4114014461",
      "value": "运城师范高等专科学校" }] },



  {
    "id": 7,
    "value": "忻州市",
    "childs": [
    {
      "id": "4114010124",
      "value": "忻州师范学院" },

    {
      "id": "4114013821",
      "value": "忻州职业技术学院" }] },



  {
    "id": 8,
    "value": "吕梁市",
    "childs": [
    {
      "id": "4114010812",
      "value": "吕梁学院" },

    {
      "id": "4114014500",
      "value": "吕梁职业技术学院" }] },



  {
    "id": 9,
    "value": "晋城市",
    "childs": [
    {
      "id": "4114012774",
      "value": "晋城职业技术学院" }] },



  {
    "id": 10,
    "value": "阳泉市",
    "childs": [
    {
      "id": "4114012893",
      "value": "阳泉职业技术学院" },

    {
      "id": "4114014271",
      "value": "阳泉师范高等专科学校" },

    {
      "id": "4114014527",
      "value": "山西工程技术学院" }] },



  {
    "id": 11,
    "value": "朔州市",
    "childs": [
    {
      "id": "4114014186",
      "value": "朔州职业技术学院" },

    {
      "id": "4114014462",
      "value": "朔州师范高等专科学校" }] }] },





{
  "id": 9,
  "value": "内蒙古自治区",
  "childs": [
  {
    "id": 1,
    "value": "呼和浩特市",
    "childs": [
    {
      "id": "4115010126",
      "value": "内蒙古大学" },

    {
      "id": "4115010128",
      "value": "内蒙古工业大学" },

    {
      "id": "4115010129",
      "value": "内蒙古农业大学" },

    {
      "id": "4115010132",
      "value": "内蒙古医科大学" },

    {
      "id": "4115010135",
      "value": "内蒙古师范大学" },

    {
      "id": "4115010139",
      "value": "内蒙古财经大学" },

    {
      "id": "4115010871",
      "value": "内蒙古建筑职业技术学院" },

    {
      "id": "4115011429",
      "value": "内蒙古丰州职业学院" },

    {
      "id": "4115011709",
      "value": "呼和浩特民族学院" },

    {
      "id": "4115012670",
      "value": "呼和浩特职业学院" },

    {
      "id": "4115012673",
      "value": "内蒙古电子信息职业技术学院" },

    {
      "id": "4115012674",
      "value": "内蒙古机电职业技术学院" },

    {
      "id": "4115012675",
      "value": "内蒙古化工职业学院" },

    {
      "id": "4115012676",
      "value": "内蒙古商贸职业学院" },

    {
      "id": "4115012797",
      "value": "内蒙古警察职业学院" },

    {
      "id": "4115012894",
      "value": "内蒙古体育职业学院" },

    {
      "id": "4115014048",
      "value": "内蒙古科技职业学院" },

    {
      "id": "4115014049",
      "value": "内蒙古北方职业技术学院" },

    {
      "id": "4115014051",
      "value": "内蒙古经贸外语职业学院" },

    {
      "id": "4115014199",
      "value": "内蒙古大学创业学院" },

    {
      "id": "4115014205",
      "value": "内蒙古师范大学鸿德学院" },

    {
      "id": "4115014282",
      "value": "内蒙古工业职业学院" },

    {
      "id": "4115014337",
      "value": "内蒙古能源职业学院" },

    {
      "id": "4115014531",
      "value": "内蒙古艺术学院" }] },



  {
    "id": 2,
    "value": "包头市",
    "childs": [
    {
      "id": "4115010127",
      "value": "内蒙古科技大学" },

    {
      "id": "4115012057",
      "value": "包头职业技术学院" },

    {
      "id": "4115012671",
      "value": "包头轻工职业技术学院" },

    {
      "id": "4115013864",
      "value": "包头钢铁职业技术学院" },

    {
      "id": "4115014187",
      "value": "包头铁道职业技术学院" }] },



  {
    "id": 3,
    "value": "通辽市",
    "childs": [
    {
      "id": "4115010136",
      "value": "内蒙古民族大学" },

    {
      "id": "4115013740",
      "value": "通辽职业学院" },

    {
      "id": "4115013741",
      "value": "科尔沁艺术职业学院" }] },



  {
    "id": 4,
    "value": "赤峰市",
    "childs": [
    {
      "id": "4115010138",
      "value": "赤峰学院" },

    {
      "id": "4115013824",
      "value": "内蒙古交通职业技术学院" },

    {
      "id": "4115014050",
      "value": "赤峰职业技术学院" },

    {
      "id": "4115014338",
      "value": "赤峰工业职业技术学院" }] },



  {
    "id": 5,
    "value": "呼伦贝尔市",
    "childs": [
    {
      "id": "4115010819",
      "value": "呼伦贝尔学院" },

    {
      "id": "4115014283",
      "value": "呼伦贝尔职业技术学院" },

    {
      "id": "4115014285",
      "value": "满洲里俄语职业学院" },

    {
      "id": "4115014539",
      "value": "扎兰屯职业学院" }] },



  {
    "id": 6,
    "value": "乌兰察布市",
    "childs": [
    {
      "id": "4115011427",
      "value": "集宁师范学院" },

    {
      "id": "4115013699",
      "value": "乌兰察布职业学院" },

    {
      "id": "4115014219",
      "value": "乌兰察布医学高等专科学校" }] },



  {
    "id": 7,
    "value": "巴彦淖尔市",
    "childs": [
    {
      "id": "4115011631",
      "value": "河套学院" },

    {
      "id": "4115014387",
      "value": "内蒙古美术职业学院" }] },



  {
    "id": 8,
    "value": "兴安盟",
    "childs": [
    {
      "id": "4115012443",
      "value": "兴安职业技术学院" }] },



  {
    "id": 9,
    "value": "锡林郭勒盟",
    "childs": [
    {
      "id": "4115012677",
      "value": "锡林郭勒职业学院" }] },



  {
    "id": 10,
    "value": "乌海市",
    "childs": [
    {
      "id": "4115013915",
      "value": "乌海职业技术学院" }] },



  {
    "id": 11,
    "value": "鄂尔多斯市",
    "childs": [
    {
      "id": "4115014248",
      "value": "鄂尔多斯职业学院" },

    {
      "id": "4115014463",
      "value": "内蒙古民族幼儿师范\n高等专科学校" },

    {
      "id": "4115014501",
      "value": "鄂尔多斯生态环境职业学院" },

    {
      "id": "4115014532",
      "value": "鄂尔多斯应用技术学院" }] },



  {
    "id": 12,
    "value": "阿拉善盟",
    "childs": [
    {
      "id": "4115014339",
      "value": "阿拉善职业技术学院" }] }] },





{
  "id": 10,
  "value": "辽宁省",
  "childs": [
  {
    "id": 1,
    "value": "沈阳市",
    "childs": [
    {
      "id": "4121010140",
      "value": "辽宁大学" },

    {
      "id": "4121010142",
      "value": "沈阳工业大学" },

    {
      "id": "4121010143",
      "value": "沈阳航空航天大学" },

    {
      "id": "4121010144",
      "value": "沈阳理工大学" },

    {
      "id": "4121010145",
      "value": "东北大学" },

    {
      "id": "4121010149",
      "value": "沈阳化工大学" },

    {
      "id": "4121010153",
      "value": "沈阳建筑大学" },

    {
      "id": "4121010157",
      "value": "沈阳农业大学" },

    {
      "id": "4121010159",
      "value": "中国医科大学" },

    {
      "id": "4121010162",
      "value": "辽宁中医药大学" },

    {
      "id": "4121010163",
      "value": "沈阳药科大学" },

    {
      "id": "4121010164",
      "value": "沈阳医学院" },

    {
      "id": "4121010166",
      "value": "沈阳师范大学" },

    {
      "id": "4121010175",
      "value": "中国刑事警察学院" },

    {
      "id": "4121010176",
      "value": "沈阳体育学院" },

    {
      "id": "4121010177",
      "value": "沈阳音乐学院" },

    {
      "id": "4121010178",
      "value": "鲁迅美术学院" },

    {
      "id": "4121011035",
      "value": "沈阳大学" },

    {
      "id": "4121011500",
      "value": "辽宁省交通高等专科学校" },

    {
      "id": "4121011632",
      "value": "沈阳工程学院" },

    {
      "id": "4121012590",
      "value": "沈阳航空职业技术学院" },

    {
      "id": "4121012591",
      "value": "辽宁体育运动职业技术学院" },

    {
      "id": "4121012593",
      "value": "辽宁林业职业技术学院" },

    {
      "id": "4121012594",
      "value": "沈阳职业技术学院" },

    {
      "id": "4121012895",
      "value": "辽宁金融职业学院" },

    {
      "id": "4121012896",
      "value": "辽宁轨道交通职业学院" },

    {
      "id": "4121012897",
      "value": "辽宁广告职业学院" },

    {
      "id": "4121012899",
      "value": "辽宁经济职业技术学院" },

    {
      "id": "4121013200",
      "value": "沈阳航空航天大学北方科技\n学院" },

    {
      "id": "4121013201",
      "value": "沈阳工学院" },

    {
      "id": "4121013208",
      "value": "沈阳城市建设学院" },

    {
      "id": "4121013211",
      "value": "中国医科大学临床医药学院" },

    {
      "id": "4121013215",
      "value": "辽宁师范大学海华学院" },

    {
      "id": "4121013220",
      "value": "沈阳城市学院" },

    {
      "id": "4121013609",
      "value": "辽宁中医药大学杏林学院" },

    {
      "id": "4121013610",
      "value": "辽宁何氏医学院" },

    {
      "id": "4121013621",
      "value": "沈阳科技学院" },

    {
      "id": "4121013957",
      "value": "辽宁传媒学院" },

    {
      "id": "4121013960",
      "value": "辽宁商贸职业学院" },

    {
      "id": "4121014076",
      "value": "辽宁装备制造职业技术学院" },

    {
      "id": "4121014240",
      "value": "辽宁现代服务职业技术学院" },

    {
      "id": "4121014288",
      "value": "辽宁城市建设职业技术学院" },

    {
      "id": "4121014289",
      "value": "辽宁医药职业学院" },

    {
      "id": "4121014385",
      "value": "沈阳北软信息职业技术学院" },

    {
      "id": "4121014398",
      "value": "辽宁政法职业学院" },

    {
      "id": "4121014464",
      "value": "辽宁民族师范高等专科学校" },

    {
      "id": "4121014474",
      "value": "辽宁水利职业学院" },

    {
      "id": "4121014526",
      "value": "辽宁特殊教育师范高等专科学校" }] },



  {
    "id": 2,
    "value": "大连市",
    "childs": [
    {
      "id": "4121010141",
      "value": "大连理工大学" },

    {
      "id": "4121010150",
      "value": "大连交通大学" },

    {
      "id": "4121010151",
      "value": "大连海事大学" },

    {
      "id": "4121010152",
      "value": "大连工业大学" },

    {
      "id": "4121010158",
      "value": "大连海洋大学" },

    {
      "id": "4121010161",
      "value": "大连医科大学" },

    {
      "id": "4121010165",
      "value": "辽宁师范大学" },

    {
      "id": "4121010172",
      "value": "大连外国语大学" },

    {
      "id": "4121010173",
      "value": "东北财经大学" },

    {
      "id": "4121010841",
      "value": "辽宁对外经贸学院" },

    {
      "id": "4121010845",
      "value": "大连职业技术学院" },

    {
      "id": "4121011258",
      "value": "大连大学" },

    {
      "id": "4121011432",
      "value": "辽宁警察学院" },

    {
      "id": "4121011735",
      "value": "辽宁税务高等专科学校" },

    {
      "id": "4121012026",
      "value": "大连民族大学" },

    {
      "id": "4121012730",
      "value": "大连商务职业学院" },

    {
      "id": "4121013198",
      "value": "大连理工大学城市学院" },

    {
      "id": "4121013203",
      "value": "大连工业大学艺术与信息工程\n学院" },

    {
      "id": "4121013207",
      "value": "大连科技学院" },

    {
      "id": "4121013212",
      "value": "大连医科大学中山学院" },

    {
      "id": "4121013218",
      "value": "大连财经学院" },

    {
      "id": "4121013599",
      "value": "大连艺术学院" },

    {
      "id": "4121013631",
      "value": "大连东软信息学院" },

    {
      "id": "4121013958",
      "value": "大连软件职业学院" },

    {
      "id": "4121013959",
      "value": "大连翻译职业学院" },

    {
      "id": "4121013961",
      "value": "大连枫叶职业技术学院" },

    {
      "id": "4121014209",
      "value": "大连航运职业技术学院" },

    {
      "id": "4121014227",
      "value": "大连装备制造职业技术学院" },

    {
      "id": "4121014228",
      "value": "大连汽车职业技术学院" },

    {
      "id": "4121014473",
      "value": "辽宁轻工职业学院" }] },



  {
    "id": 3,
    "value": "鞍山市",
    "childs": [
    {
      "id": "4121010146",
      "value": "辽宁科技大学" },

    {
      "id": "4121010169",
      "value": "鞍山师范学院" }] },



  {
    "id": 4,
    "value": "阜新市",
    "childs": [
    {
      "id": "4121010147",
      "value": "辽宁工程技术大学" },

    {
      "id": "4121011250",
      "value": "阜新高等专科学校" }] },



  {
    "id": 5,
    "value": "抚顺市",
    "childs": [
    {
      "id": "4121010148",
      "value": "辽宁石油化工大学" },

    {
      "id": "4121010179",
      "value": "抚顺师范高等专科学校" },

    {
      "id": "4121011037",
      "value": "抚顺职业技术学院" },

    {
      "id": "4121013583",
      "value": "辽宁石油化工大学顺华能源\n学院" }] },



  {
    "id": 6,
    "value": "锦州市",
    "childs": [
    {
      "id": "4121010154",
      "value": "辽宁工业大学" },

    {
      "id": "4121010160",
      "value": "锦州医科大学" },

    {
      "id": "4121010167",
      "value": "渤海大学" },

    {
      "id": "4121010180",
      "value": "锦州师范高等专科学校" },

    {
      "id": "4121012595",
      "value": "辽宁理工职业学院" },

    {
      "id": "4121012900",
      "value": "辽宁石化职业技术学院" },

    {
      "id": "4121013213",
      "value": "锦州医科大学医疗学院" },

    {
      "id": "4121013217",
      "value": "辽宁理工学院" },

    {
      "id": "4121014188",
      "value": "辽宁铁道职业技术学院" }] },



  {
    "id": 7,
    "value": "朝阳市",
    "childs": [
    {
      "id": "4121010171",
      "value": "朝阳师范高等专科学校" }] },



  {
    "id": 8,
    "value": "营口市",
    "childs": [
    {
      "id": "4121010181",
      "value": "营口职业技术学院" },

    {
      "id": "4121010957",
      "value": "辽宁农业职业技术学院" },

    {
      "id": "4121014435",
      "value": "营口理工学院" }] },



  {
    "id": 9,
    "value": "铁岭市",
    "childs": [
    {
      "id": "4121010182",
      "value": "铁岭师范高等专科学校" },

    {
      "id": "4121012592",
      "value": "辽宁职业学院" },

    {
      "id": "4121014287",
      "value": "辽宁工程职业学院" },

    {
      "id": "4121014290",
      "value": "铁岭卫生职业学院" }] },



  {
    "id": 10,
    "value": "辽阳市",
    "childs": [
    {
      "id": "4121011249",
      "value": "辽阳职业技术学院" },

    {
      "id": "4121013199",
      "value": "沈阳工业大学工程学院" },

    {
      "id": "4121014189",
      "value": "辽宁建筑职业学院" }] },



  {
    "id": 11,
    "value": "本溪市",
    "childs": [
    {
      "id": "4121011430",
      "value": "辽宁科技学院" },

    {
      "id": "4121014286",
      "value": "辽宁冶金职业技术学院" }] },



  {
    "id": 12,
    "value": "丹东市",
    "childs": [
    {
      "id": "4121011779",
      "value": "辽东学院" },

    {
      "id": "4121012898",
      "value": "辽宁机电职业技术学院" },

    {
      "id": "4121014106",
      "value": "辽宁地质工程职业学院" }] },



  {
    "id": 13,
    "value": "盘锦市",
    "childs": [
    {
      "id": "4121012063",
      "value": "盘锦职业技术学院" },

    {
      "id": "4121014077",
      "value": "辽河石油职业技术学院" }] },



  {
    "id": 14,
    "value": "葫芦岛市",
    "childs": [
    {
      "id": "4121012931",
      "value": "渤海船舶职业学院" },

    {
      "id": "4121013900",
      "value": "辽宁财贸学院" }] }] },





{
  "id": 11,
  "value": "自治区",
  "childs": [
  {
    "id": 1,
    "value": "延边朝鲜族自治州",
    "childs": [
    {
      "id": "4122010184",
      "value": "延边大学" }] },



  {
    "id": 2,
    "value": "延边朝鲜族\n自治州",
    "childs": [
    {
      "id": "4122014340",
      "value": "延边职业技术学院" },

    {
      "id": "4122014567",
      "value": "吉林职业技术学院" }] },



  {
    "id": 3,
    "value": "凉山彝族\n自治州",
    "childs": [
    {
      "id": "4151010628",
      "value": "西昌学院" }] },



  {
    "id": 4,
    "value": "甘孜藏族\n自治州",
    "childs": [
    {
      "id": "4151011661",
      "value": "四川民族学院" }] },



  {
    "id": 5,
    "value": "大理白族\n自治州",
    "childs": [
    {
      "id": "4153010679",
      "value": "大理大学" },

    {
      "id": "4153014487",
      "value": "大理农林职业技术学院" },

    {
      "id": "4153014623",
      "value": "滇西应用技术大学" }] },



  {
    "id": 6,
    "value": "楚雄彝族\n自治州",
    "childs": [
    {
      "id": "4153011391",
      "value": "楚雄师范学院" },

    {
      "id": "4153014013",
      "value": "楚雄医药高等专科学校" },

    {
      "id": "4153014373",
      "value": "云南现代职业技术学院" }] },



  {
    "id": 7,
    "value": "甘南藏族\n自治州",
    "childs": [
    {
      "id": "4162011561",
      "value": "甘肃民族师范学院" }] },



  {
    "id": 8,
    "value": "阿拉尔市",
    "childs": [
    {
      "id": "4165010757",
      "value": "塔里木大学" }] },



  {
    "id": 9,
    "value": "石河子市",
    "childs": [
    {
      "id": "4165010759",
      "value": "石河子大学" },

    {
      "id": "4165013628",
      "value": "石河子大学科技学院" },

    {
      "id": "4165013956",
      "value": "新疆石河子职业技术学院" }] },



  {
    "id": 10,
    "value": "伊犁哈萨克\n自治州",
    "childs": [
    {
      "id": "4165010764",
      "value": "伊犁师范学院" },

    {
      "id": "4165012975",
      "value": "伊犁职业技术学院" },

    {
      "id": "4165014417",
      "value": "新疆应用职业技术学院" }] },



  {
    "id": 11,
    "value": "昌吉回族\n自治州",
    "childs": [
    {
      "id": "4165010995",
      "value": "新疆农业职业技术学院" },

    {
      "id": "4165010997",
      "value": "昌吉学院" },

    {
      "id": "4165012838",
      "value": "昌吉职业技术学院" }] },



  {
    "id": 12,
    "value": "五家渠市",
    "childs": [
    {
      "id": "4165013563",
      "value": "新疆兵团警官高等专科学校" }] }] },





{
  "id": 12,
  "value": "黑龙江省",
  "childs": [
  {
    "id": 1,
    "value": "哈尔滨市",
    "childs": [
    {
      "id": "4123010212",
      "value": "黑龙江大学" },

    {
      "id": "4123010213",
      "value": "哈尔滨工业大学" },

    {
      "id": "4123010214",
      "value": "哈尔滨理工大学" },

    {
      "id": "4123010217",
      "value": "哈尔滨工程大学" },

    {
      "id": "4123010219",
      "value": "黑龙江科技大学" },

    {
      "id": "4123010224",
      "value": "东北农业大学" },

    {
      "id": "4123010225",
      "value": "东北林业大学" },

    {
      "id": "4123010226",
      "value": "哈尔滨医科大学" },

    {
      "id": "4123010228",
      "value": "黑龙江中医药大学" },

    {
      "id": "4123010231",
      "value": "哈尔滨师范大学" },

    {
      "id": "4123010234",
      "value": "哈尔滨学院" },

    {
      "id": "4123010240",
      "value": "哈尔滨商业大学" },

    {
      "id": "4123010242",
      "value": "哈尔滨体育学院" },

    {
      "id": "4123010245",
      "value": "哈尔滨金融学院" },

    {
      "id": "4123011446",
      "value": "黑龙江东方学院" },

    {
      "id": "4123011449",
      "value": "黑龙江职业学院" },

    {
      "id": "4123011635",
      "value": "哈尔滨信息工程学院" },

    {
      "id": "4123011802",
      "value": "黑龙江工程学院" },

    {
      "id": "4123012053",
      "value": "黑龙江建筑职业技术学院" },

    {
      "id": "4123012490",
      "value": "黑龙江艺术职业学院" },

    {
      "id": "4123012726",
      "value": "黑龙江农业工程职业学院" },

    {
      "id": "4123012727",
      "value": "黑龙江农垦职业学院" },

    {
      "id": "4123012728",
      "value": "黑龙江司法警官职业学院" },

    {
      "id": "4123012906",
      "value": "哈尔滨电力职业技术学院" },

    {
      "id": "4123012907",
      "value": "哈尔滨铁道职业技术学院" },

    {
      "id": "4123012911",
      "value": "哈尔滨职业技术学院" },

    {
      "id": "4123013296",
      "value": "黑龙江外国语学院" },

    {
      "id": "4123013298",
      "value": "黑龙江财经学院" },

    {
      "id": "4123013299",
      "value": "哈尔滨石油学院" },

    {
      "id": "4123013300",
      "value": "黑龙江工商学院" },

    {
      "id": "4123013301",
      "value": "哈尔滨远东理工学院" },

    {
      "id": "4123013302",
      "value": "哈尔滨传媒职业学院" },

    {
      "id": "4123013303",
      "value": "哈尔滨剑桥学院" },

    {
      "id": "4123013304",
      "value": "黑龙江工程学院昆仑旅游学院" },

    {
      "id": "4123013306",
      "value": "哈尔滨广厦学院" },

    {
      "id": "4123013307",
      "value": "哈尔滨华德学院" },

    {
      "id": "4123013447",
      "value": "黑龙江生物科技职业学院" },

    {
      "id": "4123013449",
      "value": "黑龙江公安警官职业学院" },

    {
      "id": "4123013450",
      "value": "黑龙江信息技术职业学院" },

    {
      "id": "4123013451",
      "value": "哈尔滨城市职业学院" },

    {
      "id": "4123013453",
      "value": "黑龙江农垦科技职业学院" },

    {
      "id": "4123013729",
      "value": "黑龙江旅游职业技术学院" },

    {
      "id": "4123013731",
      "value": "黑龙江生态工程职业学院" },

    {
      "id": "4123013935",
      "value": "黑龙江民族职业学院" },

    {
      "id": "4123014055",
      "value": "哈尔滨应用职业技术学院" },

    {
      "id": "4123014108",
      "value": "哈尔滨科学技术职业学院" },

    {
      "id": "4123014109",
      "value": "黑龙江粮食职业学院" },

    {
      "id": "4123014272",
      "value": "黑龙江护理高等专科学校" },

    {
      "id": "4123014425",
      "value": "哈尔滨幼儿师范高等专科学校" },

    {
      "id": "4123014540",
      "value": "黑龙江冰雪体育职业学院" },

    {
      "id": "4123014560",
      "value": "哈尔滨音乐学院" }] },



  {
    "id": 2,
    "value": "大庆市",
    "childs": [
    {
      "id": "4123010220",
      "value": "东北石油大学" },

    {
      "id": "4123010223",
      "value": "黑龙江八一农垦大学" },

    {
      "id": "4123010235",
      "value": "大庆师范学院" },

    {
      "id": "4123012718",
      "value": "大庆职业学院" },

    {
      "id": "4123014017",
      "value": "大庆医学高等专科学校" }] },



  {
    "id": 3,
    "value": "佳木斯市",
    "childs": [
    {
      "id": "4123010222",
      "value": "佳木斯大学" },

    {
      "id": "4123012725",
      "value": "黑龙江农业职业技术学院" },

    {
      "id": "4123013730",
      "value": "黑龙江三江美术职业学院" },

    {
      "id": "4123014178",
      "value": "佳木斯职业学院" }] },



  {
    "id": 4,
    "value": "牡丹江市",
    "childs": [
    {
      "id": "4123010229",
      "value": "牡丹江医学院" },

    {
      "id": "4123010233",
      "value": "牡丹江师范学院" },

    {
      "id": "4123011046",
      "value": "牡丹江大学" },

    {
      "id": "4123012724",
      "value": "黑龙江林业职业技术学院" },

    {
      "id": "4123012910",
      "value": "黑龙江农业经济职业学院" },

    {
      "id": "4123013448",
      "value": "黑龙江商业职业学院" },

    {
      "id": "4123014095",
      "value": "黑龙江幼儿师范高等专科学校" }] },



  {
    "id": 5,
    "value": "齐齐哈尔市",
    "childs": [
    {
      "id": "4123010232",
      "value": "齐齐哈尔大学" },

    {
      "id": "4123010238",
      "value": "齐齐哈尔高等师范专科学校" },

    {
      "id": "4123011230",
      "value": "齐齐哈尔医学院" },

    {
      "id": "4123012729",
      "value": "齐齐哈尔工程学院" },

    {
      "id": "4123014053",
      "value": "黑龙江交通职业技术学院" },

    {
      "id": "4123014400",
      "value": "齐齐哈尔理工职业学院" }] },



  {
    "id": 6,
    "value": "绥化市",
    "childs": [
    {
      "id": "4123010236",
      "value": "绥化学院" }] },



  {
    "id": 7,
    "value": "伊春市",
    "childs": [
    {
      "id": "4123010872",
      "value": "伊春职业学院" }] },



  {
    "id": 8,
    "value": "鸡西市",
    "childs": [
    {
      "id": "4123011445",
      "value": "黑龙江工业学院" }] },



  {
    "id": 9,
    "value": "鹤岗市",
    "childs": [
    {
      "id": "4123012905",
      "value": "鹤岗师范高等专科学校" }] },



  {
    "id": 10,
    "value": "大兴安岭地区",
    "childs": [
    {
      "id": "4123012908",
      "value": "大兴安岭职业学院" }] },



  {
    "id": 11,
    "value": "双鸭山市",
    "childs": [
    {
      "id": "4123013732",
      "value": "黑龙江能源职业学院" }] },



  {
    "id": 12,
    "value": "黑河市",
    "childs": [
    {
      "id": "4123013744",
      "value": "黑河学院" }] },



  {
    "id": 13,
    "value": "七台河市",
    "childs": [
    {
      "id": "4123013918",
      "value": "七台河职业学院" }] }] },





{
  "id": 13,
  "value": "上海",
  "childs": [
  {
    "id": 1,
    "value": "上海市",
    "childs": [
    {
      "id": "4131010246",
      "value": "复旦大学" },

    {
      "id": "4131010247",
      "value": "同济大学" },

    {
      "id": "4131010248",
      "value": "上海交通大学" },

    {
      "id": "4131010251",
      "value": "华东理工大学" },

    {
      "id": "4131010252",
      "value": "上海理工大学" },

    {
      "id": "4131010254",
      "value": "上海海事大学" },

    {
      "id": "4131010255",
      "value": "东华大学" },

    {
      "id": "4131010256",
      "value": "上海电力学院" },

    {
      "id": "4131010259",
      "value": "上海应用技术大学" },

    {
      "id": "4131010262",
      "value": "上海健康医学院" },

    {
      "id": "4131010264",
      "value": "上海海洋大学" },

    {
      "id": "4131010268",
      "value": "上海中医药大学" },

    {
      "id": "4131010269",
      "value": "华东师范大学" },

    {
      "id": "4131010270",
      "value": "上海师范大学" },

    {
      "id": "4131010271",
      "value": "上海外国语大学" },

    {
      "id": "4131010272",
      "value": "上海财经大学" },

    {
      "id": "4131010273",
      "value": "上海对外经贸大学" },

    {
      "id": "4131010274",
      "value": "上海海关学院" },

    {
      "id": "4131010275",
      "value": "上海旅游高等专科学校" },

    {
      "id": "4131010276",
      "value": "华东政法大学" },

    {
      "id": "4131010277",
      "value": "上海体育学院" },

    {
      "id": "4131010278",
      "value": "上海音乐学院" },

    {
      "id": "4131010279",
      "value": "上海戏剧学院" },

    {
      "id": "4131010280",
      "value": "上海大学" },

    {
      "id": "4131010283",
      "value": "上海公安学院" },

    {
      "id": "4131010851",
      "value": "上海东海职业技术学院" },

    {
      "id": "4131010852",
      "value": "上海工商职业技术学院" },

    {
      "id": "4131010856",
      "value": "上海工程技术大学" },

    {
      "id": "4131011047",
      "value": "上海立信会计金融学院" },

    {
      "id": "4131011458",
      "value": "上海电机学院" },

    {
      "id": "4131011733",
      "value": "上海出版印刷高等专科学校" },

    {
      "id": "4131011833",
      "value": "上海杉达学院" },

    {
      "id": "4131011835",
      "value": "上海政法学院" },

    {
      "id": "4131012044",
      "value": "上海第二工业大学" },

    {
      "id": "4131012050",
      "value": "上海商学院" },

    {
      "id": "4131012493",
      "value": "上海行健职业学院" },

    {
      "id": "4131012495",
      "value": "上海城建职业学院" },

    {
      "id": "4131012497",
      "value": "上海交通职业技术学院" },

    {
      "id": "4131012498",
      "value": "上海海事职业技术学院" },

    {
      "id": "4131012499",
      "value": "上海电子信息职业技术学院" },

    {
      "id": "4131012583",
      "value": "上海震旦职业学院" },

    {
      "id": "4131012584",
      "value": "上海民远职业技术学院" },

    {
      "id": "4131012585",
      "value": "上海欧华职业技术学院" },

    {
      "id": "4131012586",
      "value": "上海思博职业技术学院" },

    {
      "id": "4131012587",
      "value": "上海立达职业技术学院" },

    {
      "id": "4131012588",
      "value": "上海工艺美术职业学院" },

    {
      "id": "4131012798",
      "value": "上海济光职业技术学院" },

    {
      "id": "4131012799",
      "value": "上海建桥学院" },

    {
      "id": "4131012800",
      "value": "上海工商外国语职业学院" },

    {
      "id": "4131012801",
      "value": "上海科学技术职业学院" },

    {
      "id": "4131012912",
      "value": "上海农林职业技术学院" },

    {
      "id": "4131012913",
      "value": "上海邦德职业技术学院" },

    {
      "id": "4131012914",
      "value": "上海兴伟学院" },

    {
      "id": "4131012915",
      "value": "上海中侨职业技术学院" },

    {
      "id": "4131013632",
      "value": "上海视觉艺术学院" },

    {
      "id": "4131013636",
      "value": "上海外国语大学贤达经济人文\n学院" },

    {
      "id": "4131013747",
      "value": "上海电影艺术职业学院" },

    {
      "id": "4131013893",
      "value": "上海师范大学天华学院" },

    {
      "id": "4131013907",
      "value": "上海中华职业技术学院" },

    {
      "id": "4131014023",
      "value": "上海工会管理职业学院" },

    {
      "id": "4131014179",
      "value": "上海体育职业学院" },

    {
      "id": "4131014394",
      "value": "上海民航职业技术学院" },

    {
      "id": "4131014423",
      "value": "上海科技大学" },

    {
      "id": "4131016404",
      "value": "上海纽约大学" }] }] },





{
  "id": 14,
  "value": "浙江省",
  "childs": [
  {
    "id": 1,
    "value": "杭州市",
    "childs": [
    {
      "id": "4133010335",
      "value": "浙江大学" },

    {
      "id": "4133010336",
      "value": "杭州电子科技大学" },

    {
      "id": "4133010337",
      "value": "浙江工业大学" },

    {
      "id": "4133010338",
      "value": "浙江理工大学" },

    {
      "id": "4133010341",
      "value": "浙江农林大学" },

    {
      "id": "4133010344",
      "value": "浙江中医药大学" },

    {
      "id": "4133010346",
      "value": "杭州师范大学" },

    {
      "id": "4133010353",
      "value": "浙江工商大学" },

    {
      "id": "4133010355",
      "value": "中国美术学院" },

    {
      "id": "4133010356",
      "value": "中国计量大学" },

    {
      "id": "4133011057",
      "value": "浙江科技学院" },

    {
      "id": "4133011481",
      "value": "浙江水利水电学院" },

    {
      "id": "4133011482",
      "value": "浙江财经大学" },

    {
      "id": "4133011483",
      "value": "浙江警察学院" },

    {
      "id": "4133011647",
      "value": "浙江传媒学院" },

    {
      "id": "4133011842",
      "value": "浙江树人学院" },

    {
      "id": "4133012036",
      "value": "浙江交通职业技术学院" },

    {
      "id": "4133012646",
      "value": "浙江电力职业技术学院" },

    {
      "id": "4133012647",
      "value": "浙江同济科技职业学院" },

    {
      "id": "4133012861",
      "value": "浙江机电职业技术学院" },

    {
      "id": "4133012862",
      "value": "浙江建设职业技术学院" },

    {
      "id": "4133012863",
      "value": "浙江艺术职业学院" },

    {
      "id": "4133012864",
      "value": "浙江经贸职业技术学院" },

    {
      "id": "4133012865",
      "value": "浙江商业职业技术学院" },

    {
      "id": "4133012866",
      "value": "浙江经济职业技术学院" },

    {
      "id": "4133012867",
      "value": "浙江旅游职业学院" },

    {
      "id": "4133012868",
      "value": "浙江育英职业技术学院" },

    {
      "id": "4133012869",
      "value": "浙江警官职业学院" },

    {
      "id": "4133012870",
      "value": "浙江金融职业学院" },

    {
      "id": "4133012872",
      "value": "杭州职业技术学院" },

    {
      "id": "4133013021",
      "value": "浙江大学城市学院" },

    {
      "id": "4133013023",
      "value": "杭州医学院" },

    {
      "id": "4133013026",
      "value": "杭州科技职业技术学院" },

    {
      "id": "4133013027",
      "value": "浙江长征职业技术学院" },

    {
      "id": "4133013030",
      "value": "杭州万向职业技术学院" },

    {
      "id": "4133013275",
      "value": "浙江工业大学之江学院" },

    {
      "id": "4133013279",
      "value": "杭州电子科技大学信息工程\n学院" },

    {
      "id": "4133013280",
      "value": "浙江理工大学科技与艺术\n学院" },

    {
      "id": "4133013285",
      "value": "浙江中医药大学滨江学院" },

    {
      "id": "4133013286",
      "value": "杭州师范大学钱江学院" },

    {
      "id": "4133013290",
      "value": "浙江工商大学杭州商学院" },

    {
      "id": "4133013292",
      "value": "中国计量大学现代科技学院" },

    {
      "id": "4133013854",
      "value": "浙江体育职业技术学院" },

    {
      "id": "4133014275",
      "value": "浙江外国语学院" },

    {
      "id": "4133014431",
      "value": "浙江特殊教育职业学院" },

    {
      "id": "4133014535",
      "value": "浙江音乐学院" }] },



  {
    "id": 2,
    "value": "舟山市",
    "childs": [
    {
      "id": "4133010340",
      "value": "浙江海洋大学" },

    {
      "id": "4133013282",
      "value": "浙江海洋大学东海科学技术\n学院" },

    {
      "id": "4133013853",
      "value": "浙江国际海运职业技术学院" },

    {
      "id": "4133016408",
      "value": "浙江舟山群岛新区旅游与健康\n职业学院" }] },



  {
    "id": 3,
    "value": "温州市",
    "childs": [
    {
      "id": "4133010343",
      "value": "温州医科大学" },

    {
      "id": "4133010351",
      "value": "温州大学" },

    {
      "id": "4133010864",
      "value": "温州职业技术学院" },

    {
      "id": "4133012791",
      "value": "浙江工贸职业技术学院" },

    {
      "id": "4133013002",
      "value": "浙江东方职业技术学院" },

    {
      "id": "4133013284",
      "value": "温州医科大学仁济学院" },

    {
      "id": "4133013289",
      "value": "温州大学瓯江学院" },

    {
      "id": "4133013637",
      "value": "温州商学院" },

    {
      "id": "4133014088",
      "value": "温州科技职业学院" },

    {
      "id": "4133014492",
      "value": "浙江安防职业技术学院" },

    {
      "id": "4133016405",
      "value": "温州肯恩大学" }] },



  {
    "id": 4,
    "value": "金华市",
    "childs": [
    {
      "id": "4133010345",
      "value": "浙江师范大学" },

    {
      "id": "4133012061",
      "value": "金华职业技术学院" },

    {
      "id": "4133013003",
      "value": "义乌工商职业技术学院" },

    {
      "id": "4133013029",
      "value": "浙江广厦建设职业技术学院" },

    {
      "id": "4133013276",
      "value": "浙江师范大学行知学院" },

    {
      "id": "4133014090",
      "value": "浙江横店影视职业学院" },

    {
      "id": "4133014207",
      "value": "上海财经大学浙江学院" }] },



  {
    "id": 5,
    "value": "湖州市",
    "childs": [
    {
      "id": "4133010347",
      "value": "湖州师范学院" },

    {
      "id": "4133012875",
      "value": "湖州职业技术学院" },

    {
      "id": "4133013287",
      "value": "湖州师范学院求真学院" }] },



  {
    "id": 6,
    "value": "绍兴市",
    "childs": [
    {
      "id": "4133010349",
      "value": "绍兴文理学院" },

    {
      "id": "4133012792",
      "value": "浙江越秀外国语学院" },

    {
      "id": "4133012871",
      "value": "浙江工业职业技术学院" },

    {
      "id": "4133012876",
      "value": "绍兴职业技术学院" },

    {
      "id": "4133013283",
      "value": "浙江农林大学暨阳学院" },

    {
      "id": "4133013288",
      "value": "绍兴文理学院元培学院" },

    {
      "id": "4133013688",
      "value": "浙江邮电职业技术学院" },

    {
      "id": "4133014269",
      "value": "浙江农业商贸职业学院" }] },



  {
    "id": 7,
    "value": "台州市",
    "childs": [
    {
      "id": "4133010350",
      "value": "台州学院" },

    {
      "id": "4133012790",
      "value": "台州职业技术学院" },

    {
      "id": "4133013746",
      "value": "台州科技职业学院" },

    {
      "id": "4133014089",
      "value": "浙江汽车职业技术学院" }] },



  {
    "id": 8,
    "value": "丽水市",
    "childs": [
    {
      "id": "4133010352",
      "value": "丽水学院" },

    {
      "id": "4133012878",
      "value": "丽水职业技术学院" }] },



  {
    "id": 9,
    "value": "嘉兴市",
    "childs": [
    {
      "id": "4133010354",
      "value": "嘉兴学院" },

    {
      "id": "4133012874",
      "value": "嘉兴职业技术学院" },

    {
      "id": "4133013028",
      "value": "嘉兴南洋职业技术学院" },

    {
      "id": "4133013291",
      "value": "嘉兴学院南湖学院" },

    {
      "id": "4133013294",
      "value": "浙江财经大学东方学院" },

    {
      "id": "4133014206",
      "value": "同济大学浙江学院" }] },



  {
    "id": 10,
    "value": "宁波市",
    "childs": [
    {
      "id": "4133010829",
      "value": "公安海警学院" },

    {
      "id": "4133010863",
      "value": "宁波职业技术学院" },

    {
      "id": "4133010876",
      "value": "浙江万里学院" },

    {
      "id": "4133011058",
      "value": "宁波工程学院" },

    {
      "id": "4133011646",
      "value": "宁波大学" },

    {
      "id": "4133012645",
      "value": "宁波城市职业技术学院" },

    {
      "id": "4133012789",
      "value": "浙江工商职业技术学院" },

    {
      "id": "4133012860",
      "value": "浙江医药高等专科学校" },

    {
      "id": "4133013001",
      "value": "宁波大红鹰学院" },

    {
      "id": "4133013022",
      "value": "浙江大学宁波理工学院" },

    {
      "id": "4133013025",
      "value": "浙江纺织服装职业技术学院" },

    {
      "id": "4133013277",
      "value": "宁波大学科学技术学院" },

    {
      "id": "4133013742",
      "value": "宁波卫生职业技术学院" },

    {
      "id": "4133016301",
      "value": "宁波诺丁汉大学" }] },



  {
    "id": 11,
    "value": "衢州市",
    "childs": [
    {
      "id": "4133011488",
      "value": "衢州学院" },

    {
      "id": "4133012877",
      "value": "衢州职业技术学院" }] }] },





{
  "id": 15,
  "value": "安徽省",
  "childs": [
  {
    "id": 1,
    "value": "合肥市",
    "childs": [
    {
      "id": "4134010357",
      "value": "安徽大学" },

    {
      "id": "4134010358",
      "value": "中国科学技术大学" },

    {
      "id": "4134010359",
      "value": "合肥工业大学" },

    {
      "id": "4134010364",
      "value": "安徽农业大学" },

    {
      "id": "4134010366",
      "value": "安徽医科大学" },

    {
      "id": "4134010369",
      "value": "安徽中医药大学" },

    {
      "id": "4134010380",
      "value": "巢湖学院" },

    {
      "id": "4134010869",
      "value": "安徽职业技术学院" },

    {
      "id": "4134010878",
      "value": "安徽建筑大学" },

    {
      "id": "4134010959",
      "value": "安徽三联学院" },

    {
      "id": "4134011059",
      "value": "合肥学院" },

    {
      "id": "4134012073",
      "value": "安徽水利水电职业技术学院" },

    {
      "id": "4134012216",
      "value": "安徽新华学院" },

    {
      "id": "4134012218",
      "value": "民办万博科技职业学院" },

    {
      "id": "4134012219",
      "value": "安徽警官职业学院" },

    {
      "id": "4134012334",
      "value": "安徽工业经济职业技术学院" },

    {
      "id": "4134012410",
      "value": "合肥通用职业技术学院" },

    {
      "id": "4134012810",
      "value": "安徽文达信息工程学院" },

    {
      "id": "4134012815",
      "value": "民办合肥经济技术职业学院" },

    {
      "id": "4134012816",
      "value": "安徽交通职业技术学院" },

    {
      "id": "4134012817",
      "value": "安徽体育运动职业技术学院" },

    {
      "id": "4134012925",
      "value": "安徽医学高等专科学校" },

    {
      "id": "4134013058",
      "value": "合肥职业技术学院" },

    {
      "id": "4134013062",
      "value": "安徽广播影视职业技术学院" },

    {
      "id": "4134013064",
      "value": "民办合肥滨湖职业技术学院" },

    {
      "id": "4134013065",
      "value": "安徽外国语学院" },

    {
      "id": "4134013336",
      "value": "安徽电气工程职业技术学院" },

    {
      "id": "4134013338",
      "value": "安徽城市管理职业学院" },

    {
      "id": "4134013340",
      "value": "安徽工商职业学院" },

    {
      "id": "4134013341",
      "value": "安徽中澳科技职业学院" },

    {
      "id": "4134013346",
      "value": "安徽艺术职业学院" },

    {
      "id": "4134013612",
      "value": "安徽大学江淮学院" },

    {
      "id": "4134013615",
      "value": "安徽建筑大学城市建设学院" },

    {
      "id": "4134013616",
      "value": "安徽农业大学经济技术学院" },

    {
      "id": "4134013618",
      "value": "安徽医科大学临床医学院" },

    {
      "id": "4134013845",
      "value": "安徽财贸职业学院" },

    {
      "id": "4134013846",
      "value": "安徽国际商务职业学院" },

    {
      "id": "4134013847",
      "value": "安徽公安职业学院" },

    {
      "id": "4134013848",
      "value": "安徽林业职业技术学院" },

    {
      "id": "4134013849",
      "value": "安徽审计职业学院" },

    {
      "id": "4134013850",
      "value": "安徽新闻出版职业技术学院" },

    {
      "id": "4134013851",
      "value": "安徽邮电职业技术学院" },

    {
      "id": "4134014058",
      "value": "民办合肥财经职业学院" },

    {
      "id": "4134014098",
      "value": "合肥师范学院" },

    {
      "id": "4134014132",
      "value": "安徽涉外经济职业学院" },

    {
      "id": "4134014133",
      "value": "安徽绿海商务职业学院" },

    {
      "id": "4134014135",
      "value": "合肥共达职业技术学院" },

    {
      "id": "4134014191",
      "value": "徽商职业学院" },

    {
      "id": "4134014230",
      "value": "合肥信息技术职业学院" },

    {
      "id": "4134014298",
      "value": "安徽汽车职业技术学院" },

    {
      "id": "4134014330",
      "value": "合肥幼儿师范高等专科学校" },

    {
      "id": "4134014341",
      "value": "安徽长江职业学院" },

    {
      "id": "4134014418",
      "value": "安徽粮食工程职业学院" },

    {
      "id": "4134014420",
      "value": "合肥科技职业学院" }] },



  {
    "id": 2,
    "value": "马鞍山市",
    "childs": [
    {
      "id": "4134010360",
      "value": "安徽工业大学" },

    {
      "id": "4134013337",
      "value": "安徽冶金科技职业学院" },

    {
      "id": "4134013614",
      "value": "安徽工业大学工商学院" },

    {
      "id": "4134013760",
      "value": "马鞍山师范高等专科学校" },

    {
      "id": "4134014192",
      "value": "马鞍山职业技术学院" },

    {
      "id": "4134014203",
      "value": "河海大学文天学院" }] },



  {
    "id": 3,
    "value": "淮南市",
    "childs": [
    {
      "id": "4134010361",
      "value": "安徽理工大学" },

    {
      "id": "4134010381",
      "value": "淮南师范学院" },

    {
      "id": "4134011308",
      "value": "淮南联合大学" },

    {
      "id": "4134012220",
      "value": "淮南职业技术学院" },

    {
      "id": "4134012811",
      "value": "安徽工贸职业技术学院" }] },



  {
    "id": 4,
    "value": "芜湖市",
    "childs": [
    {
      "id": "4134010363",
      "value": "安徽工程大学" },

    {
      "id": "4134010368",
      "value": "皖南医学院" },

    {
      "id": "4134010370",
      "value": "安徽师范大学" },

    {
      "id": "4134011061",
      "value": "芜湖职业技术学院" },

    {
      "id": "4134012072",
      "value": "安徽商贸职业技术学院" },

    {
      "id": "4134012924",
      "value": "安徽中医药高等专科学校" },

    {
      "id": "4134013339",
      "value": "安徽机电职业技术学院" },

    {
      "id": "4134013613",
      "value": "安徽信息工程学院" },

    {
      "id": "4134013617",
      "value": "安徽师范大学皖江学院" },

    {
      "id": "4134014342",
      "value": "安徽扬子职业技术学院" }] },



  {
    "id": 5,
    "value": "蚌埠市",
    "childs": [
    {
      "id": "4134010367",
      "value": "蚌埠医学院" },

    {
      "id": "4134010378",
      "value": "安徽财经大学" },

    {
      "id": "4134011305",
      "value": "蚌埠学院" },

    {
      "id": "4134012814",
      "value": "安徽电子信息职业技术学院" },

    {
      "id": "4134013611",
      "value": "安徽财经大学商学院" },

    {
      "id": "4134014137",
      "value": "蚌埠经济技术职业学院" }] },



  {
    "id": 6,
    "value": "阜阳市",
    "childs": [
    {
      "id": "4134010371",
      "value": "阜阳师范学院" },

    {
      "id": "4134012074",
      "value": "阜阳职业技术学院" },

    {
      "id": "4134013342",
      "value": "阜阳科技职业学院" },

    {
      "id": "4134013619",
      "value": "阜阳师范学院信息工程学院" },

    {
      "id": "4134014165",
      "value": "民办安徽旅游职业学院" },

    {
      "id": "4134014536",
      "value": "阜阳幼儿师范高等专科学校" }] },



  {
    "id": 7,
    "value": "安庆市",
    "childs": [
    {
      "id": "4134010372",
      "value": "安庆师范大学" },

    {
      "id": "4134013345",
      "value": "安庆职业技术学院" },

    {
      "id": "4134014096",
      "value": "安庆医药高等专科学校" },

    {
      "id": "4134014273",
      "value": "桐城师范高等专科学校" },

    {
      "id": "4134014378",
      "value": "安徽黄梅戏艺术职业学院" }] },



  {
    "id": 8,
    "value": "淮北市",
    "childs": [
    {
      "id": "4134010373",
      "value": "淮北师范大学" },

    {
      "id": "4134010963",
      "value": "淮北职业技术学院" },

    {
      "id": "4134013620",
      "value": "淮北师范大学信息学院" },

    {
      "id": "4134014229",
      "value": "安徽矿业职业技术学院" }] },



  {
    "id": 9,
    "value": "黄山市",
    "childs": [
    {
      "id": "4134010375",
      "value": "黄山学院" },

    {
      "id": "4134014296",
      "value": "黄山职业技术学院" }] },



  {
    "id": 10,
    "value": "六安市",
    "childs": [
    {
      "id": "4134010376",
      "value": "皖西学院" },

    {
      "id": "4134012813",
      "value": "六安职业技术学院" },

    {
      "id": "4134013344",
      "value": "安徽国防科技职业学院" },

    {
      "id": "4134014210",
      "value": "安徽现代信息工程职业学院" },

    {
      "id": "4134014299",
      "value": "皖西卫生职业学院" }] },



  {
    "id": 11,
    "value": "滁州市",
    "childs": [
    {
      "id": "4134010377",
      "value": "滁州学院" },

    {
      "id": "4134010879",
      "value": "安徽科技学院" },

    {
      "id": "4134013059",
      "value": "滁州职业技术学院" },

    {
      "id": "4134014297",
      "value": "滁州城市职业学院" }] },



  {
    "id": 12,
    "value": "宿州市",
    "childs": [
    {
      "id": "4134010379",
      "value": "宿州学院" },

    {
      "id": "4134012812",
      "value": "宿州职业技术学院" },

    {
      "id": "4134014502",
      "value": "皖北卫生职业学院" }] },



  {
    "id": 13,
    "value": "铜陵市",
    "childs": [
    {
      "id": "4134010383",
      "value": "铜陵学院" },

    {
      "id": "4134012217",
      "value": "铜陵职业技术学院" },

    {
      "id": "4134013852",
      "value": "安徽工业职业技术学院" }] },



  {
    "id": 14,
    "value": "池州市",
    "childs": [
    {
      "id": "4134011306",
      "value": "池州学院" },

    {
      "id": "4134013060",
      "value": "池州职业技术学院" },

    {
      "id": "4134014419",
      "value": "安徽卫生健康职业学院" }] },



  {
    "id": 15,
    "value": "亳州市",
    "childs": [
    {
      "id": "4134012926",
      "value": "亳州学院" },

    {
      "id": "4134013343",
      "value": "亳州职业技术学院" }] },



  {
    "id": 16,
    "value": "宣城市",
    "childs": [
    {
      "id": "4134013061",
      "value": "宣城职业技术学院" }] }] },





{
  "id": 16,
  "value": "福建省",
  "childs": [
  {
    "id": 1,
    "value": "厦门市",
    "childs": [
    {
      "id": "4135010384",
      "value": "厦门大学" },

    {
      "id": "4135010390",
      "value": "集美大学" },

    {
      "id": "4135011062",
      "value": "厦门理工学院" },

    {
      "id": "4135012629",
      "value": "厦门海洋职业技术学院" },

    {
      "id": "4135012631",
      "value": "厦门医学院" },

    {
      "id": "4135012709",
      "value": "厦门华厦学院" },

    {
      "id": "4135013115",
      "value": "厦门工学院" },

    {
      "id": "4135013471",
      "value": "集美大学诚毅学院" },

    {
      "id": "4135013767",
      "value": "厦门演艺职业学院" },

    {
      "id": "4135013768",
      "value": "厦门华天涉外职业技术学院" },

    {
      "id": "4135013973",
      "value": "厦门城市职业学院" },

    {
      "id": "4135013979",
      "value": "厦门兴才职业技术学院" },

    {
      "id": "4135014059",
      "value": "厦门软件职业技术学院" },

    {
      "id": "4135014111",
      "value": "厦门南洋职业学院" },

    {
      "id": "4135014112",
      "value": "厦门东海职业技术学院" },

    {
      "id": "4135014257",
      "value": "厦门安防科技职业学院" }] },



  {
    "id": 2,
    "value": "泉州市",
    "childs": [
    {
      "id": "4135010385",
      "value": "华侨大学" },

    {
      "id": "4135010399",
      "value": "泉州师范学院" },

    {
      "id": "4135011317",
      "value": "黎明职业大学" },

    {
      "id": "4135011784",
      "value": "仰恩大学" },

    {
      "id": "4135012628",
      "value": "福建电力职业技术学院" },

    {
      "id": "4135012634",
      "value": "泉州医学高等专科学校" },

    {
      "id": "4135012710",
      "value": "闽南理工学院" },

    {
      "id": "4135012711",
      "value": "泉州纺织服装职业学院" },

    {
      "id": "4135012927",
      "value": "泉州华光职业学院" },

    {
      "id": "4135012928",
      "value": "泉州理工职业学院" },

    {
      "id": "4135012992",
      "value": "福建师范大学闽南科技学院" },

    {
      "id": "4135013766",
      "value": "泉州信息工程学院" },

    {
      "id": "4135013770",
      "value": "泉州经贸职业技术学院" },

    {
      "id": "4135013975",
      "value": "泉州工艺美术职业学院" },

    {
      "id": "4135014231",
      "value": "泉州海洋职业学院" },

    {
      "id": "4135014232",
      "value": "泉州轻工职业学院" },

    {
      "id": "4135014331",
      "value": "泉州幼儿师范高等专科学校" },

    {
      "id": "4135014503",
      "value": "泉州工程职业技术学院" }] },



  {
    "id": 3,
    "value": "福州市",
    "childs": [
    {
      "id": "4135010386",
      "value": "福州大学" },

    {
      "id": "4135010388",
      "value": "福建工程学院" },

    {
      "id": "4135010389",
      "value": "福建农林大学" },

    {
      "id": "4135010392",
      "value": "福建医科大学" },

    {
      "id": "4135010393",
      "value": "福建中医药大学" },

    {
      "id": "4135010394",
      "value": "福建师范大学" },

    {
      "id": "4135010395",
      "value": "闽江学院" },

    {
      "id": "4135010866",
      "value": "福建船政交通职业学院" },

    {
      "id": "4135011313",
      "value": "福建商学院" },

    {
      "id": "4135011495",
      "value": "福建警察学院" },

    {
      "id": "4135011499",
      "value": "福建华南女子职业学院" },

    {
      "id": "4135011502",
      "value": "福州职业技术学院" },

    {
      "id": "4135012626",
      "value": "福建信息职业技术学院" },

    {
      "id": "4135012630",
      "value": "福建农业职业技术学院" },

    {
      "id": "4135012633",
      "value": "福建卫生职业技术学院" },

    {
      "id": "4135012708",
      "value": "福州英华职业学院" },

    {
      "id": "4135012993",
      "value": "福建农林大学东方学院" },

    {
      "id": "4135013468",
      "value": "阳光学院" },

    {
      "id": "4135013470",
      "value": "福州大学至诚学院" },

    {
      "id": "4135013472",
      "value": "福建师范大学协和学院" },

    {
      "id": "4135013733",
      "value": "福建警官职业学院" },

    {
      "id": "4135013762",
      "value": "福州外语外贸学院" },

    {
      "id": "4135013763",
      "value": "福建江夏学院" },

    {
      "id": "4135013765",
      "value": "福州黎明职业技术学院" },

    {
      "id": "4135013769",
      "value": "福州科技职业技术学院" },

    {
      "id": "4135013771",
      "value": "福建对外经济贸易\n职业技术学院" },

    {
      "id": "4135013773",
      "value": "福州理工学院" },

    {
      "id": "4135013969",
      "value": "福建生物工程职业技术学院" },

    {
      "id": "4135013970",
      "value": "福建艺术职业学院" },

    {
      "id": "4135013972",
      "value": "福建幼儿师范高等专科学校" },

    {
      "id": "4135013978",
      "value": "福州软件职业技术学院" },

    {
      "id": "4135014046",
      "value": "福建农林大学金山学院" },

    {
      "id": "4135014060",
      "value": "福建体育职业技术学院" },

    {
      "id": "4135014490",
      "value": "闽江师范高等专科学校" },

    {
      "id": "4135016411",
      "value": "福州墨尔本理工职业学院" }] },



  {
    "id": 4,
    "value": "南平市",
    "childs": [
    {
      "id": "4135010397",
      "value": "武夷学院" },

    {
      "id": "4135012625",
      "value": "福建林业职业技术学院" },

    {
      "id": "4135013764",
      "value": "闽北职业技术学院" },

    {
      "id": "4135014116",
      "value": "武夷山职业学院" }] },



  {
    "id": 5,
    "value": "宁德市",
    "childs": [
    {
      "id": "4135010398",
      "value": "宁德师范学院" },

    {
      "id": "4135013977",
      "value": "宁德职业技术学院" }] },



  {
    "id": 6,
    "value": "漳州市",
    "childs": [
    {
      "id": "4135010402",
      "value": "闽南师范大学" },

    {
      "id": "4135011314",
      "value": "漳州职业技术学院" },

    {
      "id": "4135013469",
      "value": "厦门大学嘉庚学院" },

    {
      "id": "4135014110",
      "value": "漳州城市职业学院" },

    {
      "id": "4135014113",
      "value": "漳州科技职业学院" },

    {
      "id": "4135014115",
      "value": "漳州理工职业学院" },

    {
      "id": "4135014117",
      "value": "漳州卫生职业学院" }] },



  {
    "id": 7,
    "value": "三明市",
    "childs": [
    {
      "id": "4135011311",
      "value": "三明学院" },

    {
      "id": "4135012627",
      "value": "福建水利电力职业技术学院" },

    {
      "id": "4135013976",
      "value": "三明医学科技职业学院" }] },



  {
    "id": 8,
    "value": "龙岩市",
    "childs": [
    {
      "id": "4135011312",
      "value": "龙岩学院" },

    {
      "id": "4135011315",
      "value": "闽西职业技术学院" }] },



  {
    "id": 9,
    "value": "莆田市",
    "childs": [
    {
      "id": "4135011498",
      "value": "莆田学院" },

    {
      "id": "4135013772",
      "value": "湄洲湾职业技术学院" }] }] },





{
  "id": 17,
  "value": "山东省",
  "childs": [
  {
    "id": 1,
    "value": "济南市",
    "childs": [
    {
      "id": "4137010422",
      "value": "山东大学" },

    {
      "id": "4137010427",
      "value": "济南大学" },

    {
      "id": "4137010430",
      "value": "山东建筑大学" },

    {
      "id": "4137010431",
      "value": "齐鲁工业大学" },

    {
      "id": "4137010441",
      "value": "山东中医药大学" },

    {
      "id": "4137010445",
      "value": "山东师范大学" },

    {
      "id": "4137010456",
      "value": "山东财经大学" },

    {
      "id": "4137010457",
      "value": "山东体育学院" },

    {
      "id": "4137010458",
      "value": "山东艺术学院" },

    {
      "id": "4137010832",
      "value": "山东商业职业技术学院" },

    {
      "id": "4137010908",
      "value": "山东工艺美术学院" },

    {
      "id": "4137011324",
      "value": "山东警察学院" },

    {
      "id": "4137011510",
      "value": "山东交通学院" },

    {
      "id": "4137011827",
      "value": "山东电力高等专科学校" },

    {
      "id": "4137012328",
      "value": "山东职业学院" },

    {
      "id": "4137012329",
      "value": "山东劳动职业技术学院" },

    {
      "id": "4137012331",
      "value": "山东女子学院" },

    {
      "id": "4137012945",
      "value": "山东圣翰财贸职业学院" },

    {
      "id": "4137013006",
      "value": "山东英才学院" },

    {
      "id": "4137013322",
      "value": "山东现代学院" },

    {
      "id": "4137013323",
      "value": "济南职业学院" },

    {
      "id": "4137013324",
      "value": "山东协和学院" },

    {
      "id": "4137013356",
      "value": "山东凯文科技职业学院" },

    {
      "id": "4137013379",
      "value": "山东师范大学历山学院" },

    {
      "id": "4137013383",
      "value": "山东财经大学燕山学院" },

    {
      "id": "4137013855",
      "value": "济南工程职业技术学院" },

    {
      "id": "4137013856",
      "value": "山东电子职业技术学院" },

    {
      "id": "4137013858",
      "value": "山东旅游职业学院" },

    {
      "id": "4137013860",
      "value": "山东杏林科技职业学院" },

    {
      "id": "4137013998",
      "value": "齐鲁理工学院" },

    {
      "id": "4137014002",
      "value": "济南大学泉城学院" },

    {
      "id": "4137014080",
      "value": "山东城市建设职业学院" },

    {
      "id": "4137014082",
      "value": "山东司法警官职业学院" },

    {
      "id": "4137014100",
      "value": "山东政法学院" },

    {
      "id": "4137014193",
      "value": "山东传媒职业学院" },

    {
      "id": "4137014276",
      "value": "齐鲁师范学院" },

    {
      "id": "4137014277",
      "value": "山东青年政治学院" },

    {
      "id": "4137014332",
      "value": "济南幼儿师范高等专科学校" },

    {
      "id": "4137014343",
      "value": "济南护理职业学院" },

    {
      "id": "4137014438",
      "value": "山东管理学院" },

    {
      "id": "4137014439",
      "value": "山东农业工程学院" },

    {
      "id": "4137014506",
      "value": "山东艺术设计职业学院" },

    {
      "id": "4137014545",
      "value": "山东特殊教育职业学院" }] },



  {
    "id": 2,
    "value": "青岛市",
    "childs": [
    {
      "id": "4137010423",
      "value": "中国海洋大学" },

    {
      "id": "4137010424",
      "value": "山东科技大学" },

    {
      "id": "4137010425",
      "value": "中国石油大学（华东）" },

    {
      "id": "4137010426",
      "value": "青岛科技大学" },

    {
      "id": "4137010429",
      "value": "青岛理工大学" },

    {
      "id": "4137010435",
      "value": "青岛农业大学" },

    {
      "id": "4137010868",
      "value": "青岛滨海学院" },

    {
      "id": "4137011065",
      "value": "青岛大学" },

    {
      "id": "4137012324",
      "value": "青岛职业技术学院" },

    {
      "id": "4137013005",
      "value": "青岛飞洋职业技术学院" },

    {
      "id": "4137013010",
      "value": "山东外贸职业学院" },

    {
      "id": "4137013011",
      "value": "青岛酒店管理职业技术学院" },

    {
      "id": "4137013014",
      "value": "青岛港湾职业技术学院" },

    {
      "id": "4137013015",
      "value": "青岛恒星科技学院" },

    {
      "id": "4137013320",
      "value": "青岛黄海学院" },

    {
      "id": "4137013321",
      "value": "青岛求实职业技术学院" },

    {
      "id": "4137013378",
      "value": "青岛理工大学琴岛学院" },

    {
      "id": "4137013995",
      "value": "青岛工学院" },

    {
      "id": "4137014320",
      "value": "青岛远洋船员职业学院" },

    {
      "id": "4137014327",
      "value": "北京电影学院现代创意媒体\n学院" }] },



  {
    "id": 3,
    "value": "淄博市",
    "childs": [
    {
      "id": "4137010433",
      "value": "山东理工大学" },

    {
      "id": "4137010825",
      "value": "齐鲁医药学院" },

    {
      "id": "4137013009",
      "value": "淄博职业学院" },

    {
      "id": "4137013318",
      "value": "山东工业职业学院" },

    {
      "id": "4137013319",
      "value": "山东化工职业学院" },

    {
      "id": "4137013777",
      "value": "淄博师范高等专科学校" },

    {
      "id": "4137013859",
      "value": "山东铝业职业学院" },

    {
      "id": "4137014079",
      "value": "山东轻工职业学院" }] },



  {
    "id": 4,
    "value": "泰安市",
    "childs": [
    {
      "id": "4137010434",
      "value": "山东农业大学" },

    {
      "id": "4137010439",
      "value": "泰山医学院" },

    {
      "id": "4137010453",
      "value": "泰山学院" },

    {
      "id": "4137012841",
      "value": "山东服装职业学院" },

    {
      "id": "4137012844",
      "value": "山东力明科技职业学院" },

    {
      "id": "4137013624",
      "value": "山东科技大学泰山科技学院" },

    {
      "id": "4137013861",
      "value": "泰山职业技术学院" },

    {
      "id": "4137013999",
      "value": "山东财经大学东方学院" },

    {
      "id": "4137014345",
      "value": "泰山护理职业学院" }] },



  {
    "id": 5,
    "value": "潍坊市",
    "childs": [
    {
      "id": "4137010438",
      "value": "潍坊医学院" },

    {
      "id": "4137011067",
      "value": "潍坊学院" },

    {
      "id": "4137012391",
      "value": "潍坊职业学院" },

    {
      "id": "4137012819",
      "value": "山东科技职业学院" },

    {
      "id": "4137012843",
      "value": "潍坊科技学院" },

    {
      "id": "4137012947",
      "value": "山东畜牧兽医职业学院" },

    {
      "id": "4137013008",
      "value": "山东交通职业学院" },

    {
      "id": "4137013012",
      "value": "山东信息职业技术学院" },

    {
      "id": "4137013317",
      "value": "山东经贸职业学院" },

    {
      "id": "4137013388",
      "value": "潍坊工商职业学院" },

    {
      "id": "4137014346",
      "value": "山东海事职业学院" },

    {
      "id": "4137014347",
      "value": "潍坊护理职业学院" },

    {
      "id": "4137014379",
      "value": "潍坊工程职业学院" }] },



  {
    "id": 6,
    "value": "滨州市",
    "childs": [
    {
      "id": "4137010440",
      "value": "滨州医学院" },

    {
      "id": "4137010449",
      "value": "滨州学院" },

    {
      "id": "4137012818",
      "value": "滨州职业学院" }] },



  {
    "id": 7,
    "value": "临沂市",
    "childs": [
    {
      "id": "4137010442",
      "value": "山东医学高等专科学校" },

    {
      "id": "4137010452",
      "value": "临沂大学" },

    {
      "id": "4137014195",
      "value": "临沂职业学院" }] },



  {
    "id": 8,
    "value": "济宁市",
    "childs": [
    {
      "id": "4137010443",
      "value": "济宁医学院" },

    {
      "id": "4137010446",
      "value": "曲阜师范大学" },

    {
      "id": "4137010454",
      "value": "济宁学院" },

    {
      "id": "4137012070",
      "value": "曲阜远东职业技术学院" },

    {
      "id": "4137012335",
      "value": "济宁职业技术学院" },

    {
      "id": "4137014242",
      "value": "山东理工职业学院" }] },



  {
    "id": 9,
    "value": "菏泽市",
    "childs": [
    {
      "id": "4137010444",
      "value": "菏泽医学专科学校" },

    {
      "id": "4137010455",
      "value": "菏泽学院" },

    {
      "id": "4137014118",
      "value": "菏泽家政职业学院" },

    {
      "id": "4137014477",
      "value": "菏泽职业学院" }] },



  {
    "id": 10,
    "value": "聊城市",
    "childs": [
    {
      "id": "4137010447",
      "value": "聊城大学" },

    {
      "id": "4137012441",
      "value": "聊城职业技术学院" },

    {
      "id": "4137013373",
      "value": "聊城大学东昌学院" }] },



  {
    "id": 11,
    "value": "德州市",
    "childs": [
    {
      "id": "4137010448",
      "value": "德州学院" },

    {
      "id": "4137012842",
      "value": "德州科技职业学院" },

    {
      "id": "4137013389",
      "value": "德州职业技术学院" },

    {
      "id": "4137013857",
      "value": "山东华宇工学院" }] },



  {
    "id": 12,
    "value": "烟台市",
    "childs": [
    {
      "id": "4137010451",
      "value": "鲁东大学" },

    {
      "id": "4137011066",
      "value": "烟台大学" },

    {
      "id": "4137011688",
      "value": "山东工商学院" },

    {
      "id": "4137012332",
      "value": "烟台南山学院" },

    {
      "id": "4137012396",
      "value": "烟台职业学院" },

    {
      "id": "4137013355",
      "value": "烟台工程职业技术学院" },

    {
      "id": "4137013359",
      "value": "烟台大学文经学院" },

    {
      "id": "4137013778",
      "value": "山东中医药高等专科学校" },

    {
      "id": "4137013997",
      "value": "青岛农业大学海都学院" },

    {
      "id": "4137014078",
      "value": "山东商务职业学院" },

    {
      "id": "4137014081",
      "value": "烟台汽车工程职业学院" },

    {
      "id": "4137014261",
      "value": "山东文化产业职业学院" },

    {
      "id": "4137014570",
      "value": "烟台黄金职业学院" }] },



  {
    "id": 13,
    "value": "枣庄市",
    "childs": [
    {
      "id": "4137010904",
      "value": "枣庄学院" },

    {
      "id": "4137013390",
      "value": "枣庄科技职业学院" },

    {
      "id": "4137014196",
      "value": "枣庄职业学院" }] },



  {
    "id": 14,
    "value": "日照市",
    "childs": [
    {
      "id": "4137012062",
      "value": "日照职业技术学院" },

    {
      "id": "4137012946",
      "value": "山东水利职业学院" },

    {
      "id": "4137013387",
      "value": "山东外国语职业学院" },

    {
      "id": "4137014605",
      "value": "日照航海工程职业学院" }] },



  {
    "id": 15,
    "value": "威海市",
    "childs": [
    {
      "id": "4137012326",
      "value": "威海职业学院" },

    {
      "id": "4137013874",
      "value": "山东外事翻译职业学院" },

    {
      "id": "4137013966",
      "value": "山东药品食品职业学院" },

    {
      "id": "4137014507",
      "value": "威海海洋职业学院" }] },



  {
    "id": 16,
    "value": "莱芜市",
    "childs": [
    {
      "id": "4137012330",
      "value": "莱芜职业技术学院" }] },



  {
    "id": 17,
    "value": "东营市",
    "childs": [
    {
      "id": "4137012440",
      "value": "东营职业学院" },

    {
      "id": "4137013007",
      "value": "东营科技职业学院" },

    {
      "id": "4137013316",
      "value": "山东胜利职业学院" },

    {
      "id": "4137013386",
      "value": "中国石油大学胜利学院" }] }] },





{
  "id": 18,
  "value": "河南省",
  "childs": [
  {
    "id": 1,
    "value": "郑州市",
    "childs": [
    {
      "id": "4141010078",
      "value": "华北水利水电大学" },

    {
      "id": "4141010459",
      "value": "郑州大学" },

    {
      "id": "4141010462",
      "value": "郑州轻工业学院" },

    {
      "id": "4141010463",
      "value": "河南工业大学" },

    {
      "id": "4141010465",
      "value": "中原工学院" },

    {
      "id": "4141010466",
      "value": "河南农业大学" },

    {
      "id": "4141010469",
      "value": "河南牧业经济学院" },

    {
      "id": "4141010471",
      "value": "河南中医药大学" },

    {
      "id": "4141010484",
      "value": "河南财经政法大学" },

    {
      "id": "4141010485",
      "value": "郑州航空工业管理学院" },

    {
      "id": "4141010824",
      "value": "河南职业技术学院" },

    {
      "id": "4141010843",
      "value": "郑州铁路职业技术学院" },

    {
      "id": "4141011068",
      "value": "郑州工程技术学院" },

    {
      "id": "4141011517",
      "value": "河南工程学院" },

    {
      "id": "4141011652",
      "value": "河南财政金融学院" },

    {
      "id": "4141011788",
      "value": "河南警察学院" },

    {
      "id": "4141011828",
      "value": "郑州电力高等专科学校" },

    {
      "id": "4141011834",
      "value": "黄河科技学院" },

    {
      "id": "4141012582",
      "value": "河南水利与环境职业学院" },

    {
      "id": "4141012735",
      "value": "铁道警察学院" },

    {
      "id": "4141012746",
      "value": "郑州科技学院" },

    {
      "id": "4141012747",
      "value": "郑州工业应用技术学院" },

    {
      "id": "4141012781",
      "value": "河南司法警官职业学院" },

    {
      "id": "4141012948",
      "value": "郑州澍青医学高等专科学校" },

    {
      "id": "4141012949",
      "value": "郑州师范学院" },

    {
      "id": "4141013497",
      "value": "郑州财经学院" },

    {
      "id": "4141013499",
      "value": "河南检察职业学院" },

    {
      "id": "4141013502",
      "value": "河南师范大学新联学院" },

    {
      "id": "4141013507",
      "value": "郑州工商学院" },

    {
      "id": "4141013508",
      "value": "中原工学院信息商务学院" },

    {
      "id": "4141013565",
      "value": "郑州信息科技职业学院" },

    {
      "id": "4141013783",
      "value": "郑州电子信息职业技术学院" },

    {
      "id": "4141013785",
      "value": "嵩山少林武术职业学院" },

    {
      "id": "4141013786",
      "value": "郑州工业安全职业学院" },

    {
      "id": "4141013788",
      "value": "河南经贸职业学院" },

    {
      "id": "4141013789",
      "value": "河南交通职业技术学院" },

    {
      "id": "4141013790",
      "value": "河南农业职业学院" },

    {
      "id": "4141013791",
      "value": "郑州旅游职业学院" },

    {
      "id": "4141013792",
      "value": "郑州职业技术学院" },

    {
      "id": "4141013885",
      "value": "河南信息统计职业学院" },

    {
      "id": "4141013936",
      "value": "河南工业贸易职业学院" },

    {
      "id": "4141014040",
      "value": "郑州成功财经学院" },

    {
      "id": "4141014062",
      "value": "郑州电力职业技术学院" },

    {
      "id": "4141014181",
      "value": "河南建筑职业技术学院" },

    {
      "id": "4141014235",
      "value": "郑州城市职业学院" },

    {
      "id": "4141014302",
      "value": "郑州理工职业学院" },

    {
      "id": "4141014303",
      "value": "郑州信息工程职业学院" },

    {
      "id": "4141014307",
      "value": "河南应用技术职业学院" },

    {
      "id": "4141014308",
      "value": "河南艺术职业学院" },

    {
      "id": "4141014333",
      "value": "郑州升达经贸管理学院" },

    {
      "id": "4141014348",
      "value": "河南机电职业学院" },

    {
      "id": "4141014380",
      "value": "郑州商贸旅游职业学院" },

    {
      "id": "4141014391",
      "value": "郑州幼儿师范高等专科学校" },

    {
      "id": "4141014405",
      "value": "郑州黄河护理职业学院" },

    {
      "id": "4141014466",
      "value": "河南医学高等专科学校" },

    {
      "id": "4141014478",
      "value": "郑州财税金融职业学院" },

    {
      "id": "4141014607",
      "value": "河南轻工职业学院" },

    {
      "id": "4141014608",
      "value": "河南测绘职业学院" }] },



  {
    "id": 2,
    "value": "焦作市",
    "childs": [
    {
      "id": "4141010460",
      "value": "河南理工大学" },

    {
      "id": "4141011522",
      "value": "焦作大学" },

    {
      "id": "4141012581",
      "value": "河南工业和信息化职业学院" },

    {
      "id": "4141012950",
      "value": "焦作师范高等专科学校" },

    {
      "id": "4141013498",
      "value": "黄河交通学院" },

    {
      "id": "4141014300",
      "value": "焦作工贸职业学院" }] },



  {
    "id": 3,
    "value": "洛阳市",
    "childs": [
    {
      "id": "4141010464",
      "value": "河南科技大学" },

    {
      "id": "4141010482",
      "value": "洛阳师范学院" },

    {
      "id": "4141011070",
      "value": "洛阳理工学院" },

    {
      "id": "4141013889",
      "value": "河南林业职业学院" },

    {
      "id": "4141014382",
      "value": "河南推拿职业学院" },

    {
      "id": "4141014383",
      "value": "洛阳职业技术学院" },

    {
      "id": "4141014480",
      "value": "洛阳科技职业学院" }] },



  {
    "id": 4,
    "value": "新乡市",
    "childs": [
    {
      "id": "4141010467",
      "value": "河南科技学院" },

    {
      "id": "4141010472",
      "value": "新乡医学院" },

    {
      "id": "4141010476",
      "value": "河南师范大学" },

    {
      "id": "4141011071",
      "value": "新乡学院" },

    {
      "id": "4141011329",
      "value": "河南工学院" },

    {
      "id": "4141013505",
      "value": "新乡医学院三全学院" },

    {
      "id": "4141013506",
      "value": "河南科技学院新科学院" },

    {
      "id": "4141014245",
      "value": "新乡职业技术学院" },

    {
      "id": "4141014305",
      "value": "长垣烹饪职业技术学院" }] },



  {
    "id": 5,
    "value": "开封市",
    "childs": [
    {
      "id": "4141010475",
      "value": "河南大学" },

    {
      "id": "4141011069",
      "value": "开封大学" },

    {
      "id": "4141012058",
      "value": "黄河水利职业技术学院" },

    {
      "id": "4141013501",
      "value": "河南大学民生学院" },

    {
      "id": "4141014306",
      "value": "开封文化艺术职业学院" }] },



  {
    "id": 6,
    "value": "信阳市",
    "childs": [
    {
      "id": "4141010477",
      "value": "信阳师范学院" },

    {
      "id": "4141011326",
      "value": "信阳农林学院" },

    {
      "id": "4141013503",
      "value": "信阳学院" },

    {
      "id": "4141013784",
      "value": "信阳职业技术学院" },

    {
      "id": "4141014351",
      "value": "信阳涉外职业技术学院" }] },



  {
    "id": 7,
    "value": "周口市",
    "childs": [
    {
      "id": "4141010478",
      "value": "周口师范学院" },

    {
      "id": "4141012750",
      "value": "周口职业技术学院" },

    {
      "id": "4141014169",
      "value": "周口科技职业学院" }] },



  {
    "id": 8,
    "value": "安阳市",
    "childs": [
    {
      "id": "4141010479",
      "value": "安阳师范学院" },

    {
      "id": "4141011330",
      "value": "安阳工学院" },

    {
      "id": "4141013504",
      "value": "安阳学院" },

    {
      "id": "4141014243",
      "value": "安阳职业技术学院" },

    {
      "id": "4141014349",
      "value": "河南护理职业学院" },

    {
      "id": "4141014392",
      "value": "安阳幼儿师范高等专科学校" }] },



  {
    "id": 9,
    "value": "许昌市",
    "childs": [
    {
      "id": "4141010480",
      "value": "许昌学院" },

    {
      "id": "4141012067",
      "value": "许昌职业技术学院" },

    {
      "id": "4141014301",
      "value": "许昌陶瓷职业学院" },

    {
      "id": "4141014350",
      "value": "许昌电气职业学院" }] },



  {
    "id": 10,
    "value": "南阳市",
    "childs": [
    {
      "id": "4141010481",
      "value": "南阳师范学院" },

    {
      "id": "4141011653",
      "value": "南阳理工学院" },

    {
      "id": "4141012794",
      "value": "河南工业职业技术学院" },

    {
      "id": "4141013781",
      "value": "南阳医学高等专科学校" },

    {
      "id": "4141014353",
      "value": "南阳职业学院" },

    {
      "id": "4141014479",
      "value": "南阳农业职业学院" }] },



  {
    "id": 11,
    "value": "商丘市",
    "childs": [
    {
      "id": "4141010483",
      "value": "商丘师范学院" },

    {
      "id": "4141012745",
      "value": "商丘职业技术学院" },

    {
      "id": "4141013500",
      "value": "商丘工学院" },

    {
      "id": "4141013782",
      "value": "商丘医学高等专科学校" },

    {
      "id": "4141013787",
      "value": "永城职业学院" },

    {
      "id": "4141014003",
      "value": "商丘学院" }] },



  {
    "id": 12,
    "value": "漯河市",
    "childs": [
    {
      "id": "4141010835",
      "value": "漯河职业技术学院" },

    {
      "id": "4141013780",
      "value": "漯河医学高等专科学校" },

    {
      "id": "4141014233",
      "value": "漯河食品职业学院" }] },



  {
    "id": 13,
    "value": "三门峡市",
    "childs": [
    {
      "id": "4141010842",
      "value": "三门峡职业技术学院" },

    {
      "id": "4141014606",
      "value": "三门峡社会管理职业学院" }] },



  {
    "id": 14,
    "value": "驻马店市",
    "childs": [
    {
      "id": "4141010918",
      "value": "黄淮学院" },

    {
      "id": "4141014251",
      "value": "驻马店职业技术学院" },

    {
      "id": "4141014598",
      "value": "驻马店幼儿师范高等专科学校" }] },



  {
    "id": 15,
    "value": "平顶山市",
    "childs": [
    {
      "id": "4141010919",
      "value": "平顶山学院" },

    {
      "id": "4141011765",
      "value": "河南城建学院" },

    {
      "id": "4141012748",
      "value": "平顶山工业职业技术学院" },

    {
      "id": "4141013564",
      "value": "河南质量工程职业学院" },

    {
      "id": "4141014530",
      "value": "平顶山文化艺术职业学院" }] },



  {
    "id": 16,
    "value": "濮阳市",
    "childs": [
    {
      "id": "4141011787",
      "value": "濮阳职业技术学院" },

    {
      "id": "4141014597",
      "value": "濮阳医学高等专科学校" }] },



  {
    "id": 17,
    "value": "济源市",
    "childs": [
    {
      "id": "4141012768",
      "value": "济源职业技术学院" }] },



  {
    "id": 18,
    "value": "鹤壁市",
    "childs": [
    {
      "id": "4141012793",
      "value": "鹤壁职业技术学院" },

    {
      "id": "4141014352",
      "value": "鹤壁汽车工程职业学院" },

    {
      "id": "4141014529",
      "value": "鹤壁能源化工职业学院" }] }] },





{
  "id": 19,
  "value": "湖北省",
  "childs": [
  {
    "id": 1,
    "value": "武汉市",
    "childs": [
    {
      "id": "4142010486",
      "value": "武汉大学" },

    {
      "id": "4142010487",
      "value": "华中科技大学" },

    {
      "id": "4142010488",
      "value": "武汉科技大学" },

    {
      "id": "4142010490",
      "value": "武汉工程大学" },

    {
      "id": "4142010491",
      "value": "中国地质大学（武汉）" },

    {
      "id": "4142010495",
      "value": "武汉纺织大学" },

    {
      "id": "4142010496",
      "value": "武汉轻工大学" },

    {
      "id": "4142010497",
      "value": "武汉理工大学" },

    {
      "id": "4142010500",
      "value": "湖北工业大学" },

    {
      "id": "4142010504",
      "value": "华中农业大学" },

    {
      "id": "4142010507",
      "value": "湖北中医药大学" },

    {
      "id": "4142010511",
      "value": "华中师范大学" },

    {
      "id": "4142010512",
      "value": "湖北大学" },

    {
      "id": "4142010520",
      "value": "中南财经政法大学" },

    {
      "id": "4142010522",
      "value": "武汉体育学院" },

    {
      "id": "4142010523",
      "value": "湖北美术学院" },

    {
      "id": "4142010524",
      "value": "中南民族大学" },

    {
      "id": "4142010834",
      "value": "武汉职业技术学院" },

    {
      "id": "4142010956",
      "value": "长江职业学院" },

    {
      "id": "4142011072",
      "value": "江汉大学" },

    {
      "id": "4142011332",
      "value": "湖北警官学院" },

    {
      "id": "4142011524",
      "value": "武汉音乐学院" },

    {
      "id": "4142011600",
      "value": "湖北经济学院" },

    {
      "id": "4142011654",
      "value": "武汉商学院" },

    {
      "id": "4142011796",
      "value": "武汉城市职业学院" },

    {
      "id": "4142011798",
      "value": "武汉东湖学院" },

    {
      "id": "4142011800",
      "value": "汉口学院" },

    {
      "id": "4142012052",
      "value": "武汉船舶职业技术学院" },

    {
      "id": "4142012309",
      "value": "武昌首义学院" },

    {
      "id": "4142012310",
      "value": "武昌理工学院" },

    {
      "id": "4142012362",
      "value": "武汉生物工程学院" },

    {
      "id": "4142012369",
      "value": "武汉工贸职业学院" },

    {
      "id": "4142012738",
      "value": "武汉工程职业技术学院" },

    {
      "id": "4142012744",
      "value": "湖北轻工职业技术学院" },

    {
      "id": "4142012752",
      "value": "湖北交通职业技术学院" },

    {
      "id": "4142012952",
      "value": "武汉航海职业技术学院" },

    {
      "id": "4142012977",
      "value": "武汉铁路职业技术学院" },

    {
      "id": "4142012978",
      "value": "武汉软件工程职业学院" },

    {
      "id": "4142012981",
      "value": "武汉电力职业技术学院" },

    {
      "id": "4142012982",
      "value": "湖北水利水电职业技术学院" },

    {
      "id": "4142012983",
      "value": "湖北城市建设职业技术学院" },

    {
      "id": "4142012984",
      "value": "武汉警官职业学院" },

    {
      "id": "4142012985",
      "value": "湖北生物科技职业学院" },

    {
      "id": "4142012986",
      "value": "湖北开放职业学院" },

    {
      "id": "4142012987",
      "value": "武汉科技职业学院" },

    {
      "id": "4142012988",
      "value": "武汉外语外事职业学院" },

    {
      "id": "4142012989",
      "value": "武汉信息传播职业技术学院" },

    {
      "id": "4142012990",
      "value": "武昌职业学院" },

    {
      "id": "4142012991",
      "value": "武汉商贸职业学院" },

    {
      "id": "4142013188",
      "value": "武汉晴川学院" },

    {
      "id": "4142013234",
      "value": "湖北大学知行学院" },

    {
      "id": "4142013235",
      "value": "武汉科技大学城市学院" },

    {
      "id": "4142013237",
      "value": "江汉大学文理学院" },

    {
      "id": "4142013238",
      "value": "湖北工业大学工程技术学院" },

    {
      "id": "4142013239",
      "value": "武汉工程大学邮电与信息工程\n学院" },

    {
      "id": "4142013240",
      "value": "武汉纺织大学外经贸学院" },

    {
      "id": "4142013241",
      "value": "武昌工学院" },

    {
      "id": "4142013242",
      "value": "武汉工商学院" },

    {
      "id": "4142013247",
      "value": "湖北商贸学院" },

    {
      "id": "4142013251",
      "value": "湖北经济学院法商学院" },

    {
      "id": "4142013253",
      "value": "武汉体育学院体育科技学院" },

    {
      "id": "4142013262",
      "value": "文华学院" },

    {
      "id": "4142013263",
      "value": "湖北艺术职业学院" },

    {
      "id": "4142013264",
      "value": "武汉交通职业学院" },

    {
      "id": "4142013266",
      "value": "长江工程职业技术学院" },

    {
      "id": "4142013634",
      "value": "武汉学院" },

    {
      "id": "4142013664",
      "value": "武汉工程科技学院" },

    {
      "id": "4142013666",
      "value": "武汉华夏理工学院" },

    {
      "id": "4142013686",
      "value": "武汉传媒学院" },

    {
      "id": "4142013795",
      "value": "武汉工业职业技术学院" },

    {
      "id": "4142013796",
      "value": "武汉民政职业学院" },

    {
      "id": "4142013798",
      "value": "湖北财税职业学院" },

    {
      "id": "4142013800",
      "value": "湖北国土资源职业学院" },

    {
      "id": "4142013801",
      "value": "湖北生态工程职业技术学院" },

    {
      "id": "4142014035",
      "value": "武汉设计工程学院" },

    {
      "id": "4142014099",
      "value": "湖北第二师范学院" },

    {
      "id": "4142014119",
      "value": "湖北科技职业学院" },

    {
      "id": "4142014120",
      "value": "湖北青年职业学院" },

    {
      "id": "4142014356",
      "value": "湖北体育职业学院" },

    {
      "id": "4142014467",
      "value": "湖北幼儿师范高等专科学校" },

    {
      "id": "4142014553",
      "value": "湖北铁道运输职业学院" },

    {
      "id": "4142014554",
      "value": "武汉海事职业学院" },

    {
      "id": "4142014590",
      "value": "武汉铁路桥梁职业学院" },

    {
      "id": "4142014591",
      "value": "武汉光谷职业学院" }] },



  {
    "id": 2,
    "value": "荆州市",
    "childs": [
    {
      "id": "4142010489",
      "value": "长江大学" },

    {
      "id": "4142011074",
      "value": "荆州理工职业学院" },

    {
      "id": "4142012737",
      "value": "荆州职业技术学院" },

    {
      "id": "4142012951",
      "value": "湖北中医药高等专科学校" },

    {
      "id": "4142013245",
      "value": "长江大学工程技术学院" },

    {
      "id": "4142013246",
      "value": "长江大学文理学院" },

    {
      "id": "4142014555",
      "value": "长江艺术工程职业学院" }] },



  {
    "id": 3,
    "value": "黄石市",
    "childs": [
    {
      "id": "4142010513",
      "value": "湖北师范大学" },

    {
      "id": "4142010920",
      "value": "湖北理工学院" },

    {
      "id": "4142013256",
      "value": "湖北师范大学文理学院" },

    {
      "id": "4142014197",
      "value": "湖北工程职业学院" }] },



  {
    "id": 4,
    "value": "黄冈市",
    "childs": [
    {
      "id": "4142010514",
      "value": "黄冈师范学院" },

    {
      "id": "4142010955",
      "value": "黄冈职业技术学院" },

    {
      "id": "4142013797",
      "value": "鄂东职业技术学院" },

    {
      "id": "4142013799",
      "value": "黄冈科技职业学院" }] },



  {
    "id": 5,
    "value": "恩施土家族苗族自治州",
    "childs": [
    {
      "id": "4142010517",
      "value": "湖北民族学院" },

    {
      "id": "4142012347",
      "value": "恩施职业技术学院" },

    {
      "id": "4142013250",
      "value": "湖北民族学院科技学院" }] },



  {
    "id": 6,
    "value": "十堰市",
    "childs": [
    {
      "id": "4142010518",
      "value": "汉江师范学院" },

    {
      "id": "4142010525",
      "value": "湖北汽车工业学院" },

    {
      "id": "4142010929",
      "value": "湖北医药学院" },

    {
      "id": "4142011334",
      "value": "湖北工业职业技术学院" },

    {
      "id": "4142013248",
      "value": "湖北汽车工业学院科技学院" },

    {
      "id": "4142013249",
      "value": "湖北医药学院药护学院" }] },



  {
    "id": 7,
    "value": "襄阳市",
    "childs": [
    {
      "id": "4142010519",
      "value": "湖北文理学院" },

    {
      "id": "4142012354",
      "value": "襄阳职业技术学院" },

    {
      "id": "4142013257",
      "value": "湖北文理学院理工学院" },

    {
      "id": "4142014357",
      "value": "襄阳汽车职业技术学院" }] },



  {
    "id": 8,
    "value": "孝感市",
    "childs": [
    {
      "id": "4142010528",
      "value": "湖北工程学院" },

    {
      "id": "4142012051",
      "value": "湖北职业技术学院" },

    {
      "id": "4142013258",
      "value": "湖北工程学院新技术学院" }] },



  {
    "id": 9,
    "value": "咸宁市",
    "childs": [
    {
      "id": "4142010927",
      "value": "湖北科技学院" },

    {
      "id": "4142013265",
      "value": "咸宁职业技术学院" }] },



  {
    "id": 10,
    "value": "宜昌市",
    "childs": [
    {
      "id": "4142011075",
      "value": "三峡大学" },

    {
      "id": "4142012979",
      "value": "湖北三峡职业技术学院" },

    {
      "id": "4142013236",
      "value": "三峡大学科技学院" },

    {
      "id": "4142014061",
      "value": "三峡电力职业学院" },

    {
      "id": "4142014258",
      "value": "三峡旅游职业技术学院" }] },



  {
    "id": 11,
    "value": "鄂州市",
    "childs": [
    {
      "id": "4142011335",
      "value": "鄂州职业大学" }] },



  {
    "id": 12,
    "value": "荆门市",
    "childs": [
    {
      "id": "4142011336",
      "value": "荆楚理工学院" },

    {
      "id": "4142014571",
      "value": "荆门职业学院" }] },



  {
    "id": 13,
    "value": "仙桃市",
    "childs": [
    {
      "id": "4142012740",
      "value": "仙桃职业学院" }] },



  {
    "id": 14,
    "value": "随州市",
    "childs": [
    {
      "id": "4142012980",
      "value": "随州职业技术学院" }] },



  {
    "id": 15,
    "value": "天门市",
    "childs": [
    {
      "id": "4142014355",
      "value": "天门职业学院" }] }] },





{
  "id": 20,
  "value": "潜江市",
  "childs": [
  {
    "id": 1,
    "value": "潜江市",
    "childs": [
    {
      "id": "4142013793",
      "value": "江汉艺术职业学院" }] }] },





{
  "id": 21,
  "value": "广东省",
  "childs": [
  {
    "id": 1,
    "value": "广州市",
    "childs": [
    {
      "id": "4144010558",
      "value": "中山大学" },

    {
      "id": "4144010559",
      "value": "暨南大学" },

    {
      "id": "4144010561",
      "value": "华南理工大学" },

    {
      "id": "4144010564",
      "value": "华南农业大学" },

    {
      "id": "4144010570",
      "value": "广州医科大学" },

    {
      "id": "4144010572",
      "value": "广州中医药大学" },

    {
      "id": "4144010573",
      "value": "广东药科大学" },

    {
      "id": "4144010574",
      "value": "华南师范大学" },

    {
      "id": "4144010585",
      "value": "广州体育学院" },

    {
      "id": "4144010586",
      "value": "广州美术学院" },

    {
      "id": "4144010587",
      "value": "星海音乐学院" },

    {
      "id": "4144010588",
      "value": "广东技术师范学院" },

    {
      "id": "4144010592",
      "value": "广东财经大学" },

    {
      "id": "4144010822",
      "value": "广东白云学院" },

    {
      "id": "4144010833",
      "value": "广东轻工职业技术学院" },

    {
      "id": "4144010861",
      "value": "广东交通职业技术学院" },

    {
      "id": "4144010862",
      "value": "广东水利电力职业技术学院" },

    {
      "id": "4144011078",
      "value": "广州大学" },

    {
      "id": "4144011106",
      "value": "广州航海学院" },

    {
      "id": "4144011110",
      "value": "广东警官学院" },

    {
      "id": "4144011114",
      "value": "广东南华工商职业学院" },

    {
      "id": "4144011121",
      "value": "私立华联学院" },

    {
      "id": "4144011347",
      "value": "仲恺农业工程学院" },

    {
      "id": "4144011540",
      "value": "广东金融学院" },

    {
      "id": "4144011845",
      "value": "广东工业大学" },

    {
      "id": "4144011846",
      "value": "广东外语外贸大学" },

    {
      "id": "4144012040",
      "value": "广州民航职业技术学院" },

    {
      "id": "4144012046",
      "value": "广州番禺职业技术学院" },

    {
      "id": "4144012059",
      "value": "广东培正学院" },

    {
      "id": "4144012121",
      "value": "南方医科大学" },

    {
      "id": "4144012322",
      "value": "广东农工商职业技术学院" },

    {
      "id": "4144012572",
      "value": "广东科学技术职业学院" },

    {
      "id": "4144012573",
      "value": "广东食品药品职业学院" },

    {
      "id": "4144012575",
      "value": "广州康大职业技术学院" },

    {
      "id": "4144012577",
      "value": "广东行政职业学院" },

    {
      "id": "4144012578",
      "value": "广东体育职业技术学院" },

    {
      "id": "4144012617",
      "value": "华南理工大学广州学院" },

    {
      "id": "4144012618",
      "value": "广州大学华软软件学院" },

    {
      "id": "4144012619",
      "value": "中山大学南方学院" },

    {
      "id": "4144012620",
      "value": "广东外语外贸大学南国商学院" },

    {
      "id": "4144012621",
      "value": "广东财经大学华商学院" },

    {
      "id": "4144012623",
      "value": "华南农业大学珠江学院" },

    {
      "id": "4144012668",
      "value": "广东技术师范学院天河学院" },

    {
      "id": "4144012741",
      "value": "广东建设职业技术学院" },

    {
      "id": "4144012742",
      "value": "广东女子职业技术学院" },

    {
      "id": "4144012743",
      "value": "广东机电职业技术学院" },

    {
      "id": "4144012749",
      "value": "广东岭南职业技术学院" },

    {
      "id": "4144012953",
      "value": "广东邮电职业技术学院" },

    {
      "id": "4144012959",
      "value": "广东工贸职业技术学院" },

    {
      "id": "4144012960",
      "value": "广东司法警官职业学院" },

    {
      "id": "4144012962",
      "value": "广东省外语艺术职业学院" },

    {
      "id": "4144013656",
      "value": "广东工业大学华立学院" },

    {
      "id": "4144013657",
      "value": "广州大学松田学院" },

    {
      "id": "4144013667",
      "value": "广州商学院" },

    {
      "id": "4144013707",
      "value": "广东文艺职业学院" },

    {
      "id": "4144013708",
      "value": "广州体育职业技术学院" },

    {
      "id": "4144013709",
      "value": "广州工程技术职业学院" },

    {
      "id": "4144013714",
      "value": "广州工商学院" },

    {
      "id": "4144013715",
      "value": "广州涉外经济职业技术学院" },

    {
      "id": "4144013716",
      "value": "广州南洋理工职业学院" },

    {
      "id": "4144013717",
      "value": "广州科技职业技术学院" },

    {
      "id": "4144013902",
      "value": "中山大学新华学院" },

    {
      "id": "4144013912",
      "value": "广州现代信息工程职业技术\n学院" },

    {
      "id": "4144013919",
      "value": "广东理工职业学院" },

    {
      "id": "4144013927",
      "value": "广州华南商贸职业学院" },

    {
      "id": "4144013928",
      "value": "广州华立科技职业学院" },

    {
      "id": "4144013929",
      "value": "广州城市职业学院" },

    {
      "id": "4144013930",
      "value": "广东工程职业技术学院" },

    {
      "id": "4144013943",
      "value": "广州铁路职业技术学院" },

    {
      "id": "4144014063",
      "value": "广东科贸职业学院" },

    {
      "id": "4144014065",
      "value": "广州科技贸易职业学院" },

    {
      "id": "4144014123",
      "value": "广州珠江职业技术学院" },

    {
      "id": "4144014125",
      "value": "广州松田职业学院" },

    {
      "id": "4144014136",
      "value": "广州城建职业学院" },

    {
      "id": "4144014266",
      "value": "广州华商职业学院" },

    {
      "id": "4144014268",
      "value": "广州华夏职业学院" },

    {
      "id": "4144014278",
      "value": "广东第二师范学院" },

    {
      "id": "4144014361",
      "value": "广东青年职业学院" },

    {
      "id": "4144014362",
      "value": "广州东华职业学院" },

    {
      "id": "4144014407",
      "value": "广东舞蹈戏剧职业学院" },

    {
      "id": "4144014509",
      "value": "广东生态工程职业学院" },

    {
      "id": "4144014533",
      "value": "公安边防部队高等专科学校" },

    {
      "id": "4144014592",
      "value": "广州卫生职业技术学院" }] },



  {
    "id": 2,
    "value": "汕头市",
    "childs": [
    {
      "id": "4144010560",
      "value": "汕头大学" },

    {
      "id": "4144012954",
      "value": "汕头职业技术学院" },

    {
      "id": "4144016410",
      "value": "广东以色列理工学院" }] },



  {
    "id": 3,
    "value": "湛江市",
    "childs": [
    {
      "id": "4144010566",
      "value": "广东海洋大学" },

    {
      "id": "4144010571",
      "value": "广东医科大学" },

    {
      "id": "4144010579",
      "value": "岭南师范学院" },

    {
      "id": "4144012622",
      "value": "广东海洋大学寸金学院" },

    {
      "id": "4144014126",
      "value": "广东文理职业学院" },

    {
      "id": "4244050853",
      "value": "湛江幼儿师范专科学校" }] },



  {
    "id": 4,
    "value": "韶关市",
    "childs": [
    {
      "id": "4144010576",
      "value": "韶关学院" },

    {
      "id": "4144012060",
      "value": "广东松山职业技术学院" }] },



  {
    "id": 5,
    "value": "惠州市",
    "childs": [
    {
      "id": "4144010577",
      "value": "惠州学院" },

    {
      "id": "4144013718",
      "value": "惠州经济职业技术学院" },

    {
      "id": "4144014408",
      "value": "惠州卫生职业技术学院" },

    {
      "id": "4144014510",
      "value": "惠州城市职业学院" },

    {
      "id": "4144014609",
      "value": "惠州工程职业学院" }] },



  {
    "id": 6,
    "value": "潮州市",
    "childs": [
    {
      "id": "4144010578",
      "value": "韩山师范学院" }] },



  {
    "id": 7,
    "value": "肇庆市",
    "childs": [
    {
      "id": "4144010580",
      "value": "肇庆学院" },

    {
      "id": "4144013720",
      "value": "广东理工学院" },

    {
      "id": "4144013721",
      "value": "广东工商职业学院" },

    {
      "id": "4144013810",
      "value": "肇庆医学高等专科学校" },

    {
      "id": "4144014427",
      "value": "广东信息工程职业学院" }] },



  {
    "id": 8,
    "value": "梅州市",
    "childs": [
    {
      "id": "4144010582",
      "value": "嘉应学院" }] },



  {
    "id": 9,
    "value": "深圳市",
    "childs": [
    {
      "id": "4144010590",
      "value": "深圳大学" },

    {
      "id": "4144011113",
      "value": "深圳职业技术学院" },

    {
      "id": "4144012325",
      "value": "广东新安职业技术学院" },

    {
      "id": "4144012957",
      "value": "深圳信息职业技术学院" },

    {
      "id": "4144014325",
      "value": "南方科技大学" },

    {
      "id": "4144016407",
      "value": "香港中文大学（深圳）" },

    {
      "id": "4144016409",
      "value": "深圳北理莫斯科大学" }] },



  {
    "id": 10,
    "value": "佛山市",
    "childs": [
    {
      "id": "4144010831",
      "value": "顺德职业技术学院" },

    {
      "id": "4144011847",
      "value": "佛山科学技术学院" },

    {
      "id": "4144012327",
      "value": "佛山职业技术学院" },

    {
      "id": "4144012574",
      "value": "广东东软学院" },

    {
      "id": "4144012736",
      "value": "广东职业技术学院" },

    {
      "id": "4144014311",
      "value": "广东环境保护工程职业学院" }] },



  {
    "id": 11,
    "value": "揭阳市",
    "childs": [
    {
      "id": "4144010965",
      "value": "潮汕职业技术学院" },

    {
      "id": "4144012956",
      "value": "揭阳职业技术学院" }] },



  {
    "id": 12,
    "value": "江门市",
    "childs": [
    {
      "id": "4144011349",
      "value": "五邑大学" },

    {
      "id": "4144013711",
      "value": "江门职业技术学院" },

    {
      "id": "4144014265",
      "value": "广东南方职业学院" },

    {
      "id": "4144014610",
      "value": "广东江门中医药职业学院" }] },



  {
    "id": 13,
    "value": "中山市",
    "childs": [
    {
      "id": "4144011545",
      "value": "电子科技大学中山学院" },

    {
      "id": "4144013710",
      "value": "中山火炬职业技术学院" },

    {
      "id": "4144014066",
      "value": "中山职业技术学院" }] },



  {
    "id": 14,
    "value": "茂名市",
    "childs": [
    {
      "id": "4144011656",
      "value": "广东石油化工学院" },

    {
      "id": "4144013712",
      "value": "茂名职业技术学院" },

    {
      "id": "4144014556",
      "value": "广东茂名健康职业学院" },

    {
      "id": "4144014587",
      "value": "广东茂名幼儿师范专科学校" }] },



  {
    "id": 15,
    "value": "东莞市",
    "childs": [
    {
      "id": "4144011819",
      "value": "东莞理工学院" },

    {
      "id": "4144012961",
      "value": "广东亚视演艺职业学院" },

    {
      "id": "4144013719",
      "value": "广东科技学院" },

    {
      "id": "4144013844",
      "value": "东莞理工学院城市学院" },

    {
      "id": "4144014263",
      "value": "东莞职业技术学院" },

    {
      "id": "4144014363",
      "value": "广东创新科技职业学院" },

    {
      "id": "4144014572",
      "value": "广东酒店管理职业技术学院" }] },



  {
    "id": 16,
    "value": "珠海市",
    "childs": [
    {
      "id": "4144012576",
      "value": "珠海艺术职业学院" },

    {
      "id": "4144013177",
      "value": "北京师范大学珠海分校" },

    {
      "id": "4144013675",
      "value": "北京理工大学珠海学院" },

    {
      "id": "4144013684",
      "value": "吉林大学珠海学院" },

    {
      "id": "4144013713",
      "value": "珠海城市职业技术学院" },

    {
      "id": "4144016401",
      "value": "北京师范大学-香港浸会大学联合国际学院" }] },



  {
    "id": 17,
    "value": "汕尾市",
    "childs": [
    {
      "id": "4144012765",
      "value": "汕尾职业技术学院" }] },



  {
    "id": 18,
    "value": "云浮市",
    "childs": [
    {
      "id": "4144012770",
      "value": "罗定职业技术学院" }] },



  {
    "id": 19,
    "value": "阳江市",
    "childs": [
    {
      "id": "4144012771",
      "value": "阳江职业技术学院" }] },



  {
    "id": 20,
    "value": "河源市",
    "childs": [
    {
      "id": "4144012772",
      "value": "河源职业技术学院" }] },



  {
    "id": 21,
    "value": "清远市",
    "childs": [
    {
      "id": "4144012958",
      "value": "清远职业技术学院" },

    {
      "id": "4144014511",
      "value": "广东碧桂园职业学院" }] }] },





{
  "id": 22,
  "value": "广西壮族自治区",
  "childs": [
  {
    "id": 1,
    "value": "南宁市",
    "childs": [
    {
      "id": "4145010593",
      "value": "广西大学" },

    {
      "id": "4145010598",
      "value": "广西医科大学" },

    {
      "id": "4145010600",
      "value": "广西中医药大学" },

    {
      "id": "4145010603",
      "value": "广西师范学院" },

    {
      "id": "4145010607",
      "value": "广西艺术学院" },

    {
      "id": "4145010608",
      "value": "广西民族大学" },

    {
      "id": "4145010867",
      "value": "广西机电职业技术学院" },

    {
      "id": "4145011350",
      "value": "广西体育高等专科学校" },

    {
      "id": "4145011355",
      "value": "南宁职业技术学院" },

    {
      "id": "4145011548",
      "value": "广西财经学院" },

    {
      "id": "4145011549",
      "value": "南宁学院" },

    {
      "id": "4145011608",
      "value": "广西水利电力职业技术学院" },

    {
      "id": "4145011773",
      "value": "广西职业技术学院" },

    {
      "id": "4145012356",
      "value": "广西交通职业技术学院" },

    {
      "id": "4145012364",
      "value": "广西工业职业技术学院" },

    {
      "id": "4145012379",
      "value": "广西国际商务职业技术学院" },

    {
      "id": "4145012382",
      "value": "广西农业职业技术学院" },

    {
      "id": "4145013138",
      "value": "广西建设职业技术学院" },

    {
      "id": "4145013520",
      "value": "广西警察学院" },

    {
      "id": "4145013638",
      "value": "广西大学行健文理学院" },

    {
      "id": "4145013640",
      "value": "广西民族大学相思湖学院" },

    {
      "id": "4145013642",
      "value": "广西师范学院师园学院" },

    {
      "id": "4145013643",
      "value": "广西中医药大学赛恩斯新医药\n学院" },

    {
      "id": "4145013827",
      "value": "广西经贸职业技术学院" },

    {
      "id": "4145013828",
      "value": "广西工商职业技术学院" },

    {
      "id": "4145013829",
      "value": "广西演艺职业学院" },

    {
      "id": "4145013830",
      "value": "广西外国语学院" },

    {
      "id": "4145013831",
      "value": "广西电力职业技术学院" },

    {
      "id": "4145014211",
      "value": "广西经济职业学院" },

    {
      "id": "4145014220",
      "value": "广西幼儿师范高等专科学校" },

    {
      "id": "4145014313",
      "value": "广西卫生职业技术学院" },

    {
      "id": "4145014512",
      "value": "广西金融职业技术学院" },

    {
      "id": "4145014611",
      "value": "广西安全工程职业技术学院" }] },



  {
    "id": 2,
    "value": "柳州市",
    "childs": [
    {
      "id": "4145010594",
      "value": "广西科技大学" },

    {
      "id": "4145012104",
      "value": "柳州职业技术学院" },

    {
      "id": "4145012344",
      "value": "广西生态工程职业技术学院" },

    {
      "id": "4145012392",
      "value": "柳州铁道职业技术学院" },

    {
      "id": "4145013639",
      "value": "广西科技大学鹿山学院" },

    {
      "id": "4145014067",
      "value": "柳州城市职业学院" }] },



  {
    "id": 3,
    "value": "桂林市",
    "childs": [
    {
      "id": "4145010595",
      "value": "桂林电子科技大学" },

    {
      "id": "4145010596",
      "value": "桂林理工大学" },

    {
      "id": "4145010601",
      "value": "桂林医学院" },

    {
      "id": "4145010602",
      "value": "广西师范大学" },

    {
      "id": "4145011671",
      "value": "桂林师范高等专科学校" },

    {
      "id": "4145011825",
      "value": "桂林航天工业学院" },

    {
      "id": "4145011837",
      "value": "桂林旅游学院" },

    {
      "id": "4145013526",
      "value": "桂林山水职业学院" },

    {
      "id": "4145013641",
      "value": "广西师范大学漓江学院" },

    {
      "id": "4145013644",
      "value": "桂林电子科技大学信息科技\n学院" },

    {
      "id": "4145013645",
      "value": "桂林理工大学博文管理学院" }] },



  {
    "id": 4,
    "value": "百色市",
    "childs": [
    {
      "id": "4145010599",
      "value": "右江民族医学院" },

    {
      "id": "4145010609",
      "value": "百色学院" },

    {
      "id": "4145014068",
      "value": "百色职业学院" },

    {
      "id": "4145014127",
      "value": "广西工程职业学院" },

    {
      "id": "4145014481",
      "value": "广西培贤国际职业学院" }] },



  {
    "id": 5,
    "value": "崇左市",
    "childs": [
    {
      "id": "4145010604",
      "value": "广西民族师范学院" },

    {
      "id": "4145013920",
      "value": "广西城市职业学院" },

    {
      "id": "4145014170",
      "value": "广西理工职业技术学院" },

    {
      "id": "4145014312",
      "value": "广西科技职业学院" },

    {
      "id": "4145014546",
      "value": "广西中远职业学院" }] },



  {
    "id": 6,
    "value": "河池市",
    "childs": [
    {
      "id": "4145010605",
      "value": "河池学院" },

    {
      "id": "4145013522",
      "value": "广西现代职业技术学院" }] },



  {
    "id": 7,
    "value": "玉林市",
    "childs": [
    {
      "id": "4145010606",
      "value": "玉林师范学院" },

    {
      "id": "4145014573",
      "value": "玉柴职业技术学院" }] },



  {
    "id": 8,
    "value": "梧州市",
    "childs": [
    {
      "id": "4145011354",
      "value": "梧州学院" },

    {
      "id": "4145014171",
      "value": "梧州职业学院" }] },



  {
    "id": 9,
    "value": "来宾市",
    "childs": [
    {
      "id": "4145011546",
      "value": "广西科技师范学院" },

    {
      "id": "4145014574",
      "value": "广西蓝天航空职业学院" }] },



  {
    "id": 10,
    "value": "钦州市",
    "childs": [
    {
      "id": "4145011607",
      "value": "钦州学院" },

    {
      "id": "4145014026",
      "value": "广西英华国际职业学院" }] },



  {
    "id": 11,
    "value": "贺州市",
    "childs": [
    {
      "id": "4145011838",
      "value": "贺州学院" }] },



  {
    "id": 12,
    "value": "北海市",
    "childs": [
    {
      "id": "4145013523",
      "value": "北海职业学院" },

    {
      "id": "4145013524",
      "value": "北海艺术设计学院" },

    {
      "id": "4145013890",
      "value": "北京航空航天大学北海学院" }] }] },





{
  "id": 23,
  "value": "海南省",
  "childs": [
  {
    "id": 1,
    "value": "海口市",
    "childs": [
    {
      "id": "4146010589",
      "value": "海南大学" },

    {
      "id": "4146011658",
      "value": "海南师范大学" },

    {
      "id": "4146011810",
      "value": "海南医学院" },

    {
      "id": "4146011999",
      "value": "海南职业技术学院" },

    {
      "id": "4146012308",
      "value": "海口经济学院" },

    {
      "id": "4146013576",
      "value": "海南政法职业学院" },

    {
      "id": "4146013811",
      "value": "琼台师范学院" },

    {
      "id": "4146013875",
      "value": "海南经贸职业技术学院" },

    {
      "id": "4146013876",
      "value": "海南工商职业学院" },

    {
      "id": "4146014172",
      "value": "海南科技职业学院" },

    {
      "id": "4146014575",
      "value": "海南体育职业技术学院" }] },



  {
    "id": 2,
    "value": "三亚市",
    "childs": [
    {
      "id": "4146011100",
      "value": "海南热带海洋学院" },

    {
      "id": "4146012717",
      "value": "三亚城市职业学院" },

    {
      "id": "4146013892",
      "value": "三亚学院" },

    {
      "id": "4146013931",
      "value": "三亚航空旅游职业学院" },

    {
      "id": "4146014236",
      "value": "三亚理工职业学院" },

    {
      "id": "4146014612",
      "value": "三亚中瑞酒店管理职业学院" }] },



  {
    "id": 3,
    "value": "琼海市",
    "childs": [
    {
      "id": "4146013575",
      "value": "海南软件职业技术学院" }] },



  {
    "id": 4,
    "value": "文昌市",
    "childs": [
    {
      "id": "4146013577",
      "value": "海南外国语职业学院" }] }] },





{
  "id": 24,
  "value": "重庆",
  "childs": [
  {
    "id": 1,
    "value": "重庆市",
    "childs": [
    {
      "id": "4150010611",
      "value": "重庆大学" },

    {
      "id": "4150010617",
      "value": "重庆邮电大学" },

    {
      "id": "4150010618",
      "value": "重庆交通大学" },

    {
      "id": "4150010631",
      "value": "重庆医科大学" },

    {
      "id": "4150010635",
      "value": "西南大学" },

    {
      "id": "4150010637",
      "value": "重庆师范大学" },

    {
      "id": "4150010642",
      "value": "重庆文理学院" },

    {
      "id": "4150010643",
      "value": "重庆三峡学院" },

    {
      "id": "4150010647",
      "value": "长江师范学院" },

    {
      "id": "4150010650",
      "value": "四川外国语大学" },

    {
      "id": "4150010652",
      "value": "西南政法大学" },

    {
      "id": "4150010655",
      "value": "四川美术学院" },

    {
      "id": "4150010870",
      "value": "重庆航天职业技术学院" },

    {
      "id": "4150011551",
      "value": "重庆科技学院" },

    {
      "id": "4150011660",
      "value": "重庆理工大学" },

    {
      "id": "4150011799",
      "value": "重庆工商大学" },

    {
      "id": "4150011848",
      "value": "重庆电力高等专科学校" },

    {
      "id": "4150012215",
      "value": "重庆工业职业技术学院" },

    {
      "id": "4150012605",
      "value": "重庆三峡职业学院" },

    {
      "id": "4150012606",
      "value": "重庆工贸职业技术学院" },

    {
      "id": "4150012607",
      "value": "重庆机电职业技术学院" },

    {
      "id": "4150012608",
      "value": "重庆工程学院" },

    {
      "id": "4150012609",
      "value": "重庆电子工程职业学院" },

    {
      "id": "4150012616",
      "value": "重庆大学城市科技学院" },

    {
      "id": "4150012754",
      "value": "重庆海联职业技术学院" },

    {
      "id": "4150012755",
      "value": "重庆信息技术职业学院" },

    {
      "id": "4150012756",
      "value": "重庆传媒职业学院" },

    {
      "id": "4150012757",
      "value": "重庆警察学院" },

    {
      "id": "4150012758",
      "value": "重庆城市管理职业学院" },

    {
      "id": "4150012759",
      "value": "重庆工程职业技术学院" },

    {
      "id": "4150012820",
      "value": "重庆房地产职业学院" },

    {
      "id": "4150013548",
      "value": "重庆人文科技学院" },

    {
      "id": "4150013588",
      "value": "四川外国语大学重庆南方翻译\n学院" },

    {
      "id": "4150013589",
      "value": "重庆师范大学涉外商贸学院" },

    {
      "id": "4150013590",
      "value": "重庆工商大学融智学院" },

    {
      "id": "4150013591",
      "value": "重庆工商大学派斯学院" },

    {
      "id": "4150013627",
      "value": "重庆邮电大学移通学院" },

    {
      "id": "4150013734",
      "value": "重庆城市职业学院" },

    {
      "id": "4150013735",
      "value": "重庆水利电力职业技术学院" },

    {
      "id": "4150013967",
      "value": "重庆工商职业学院" },

    {
      "id": "4150013968",
      "value": "重庆应用技术职业学院" },

    {
      "id": "4150014008",
      "value": "重庆三峡医药高等专科学校" },

    {
      "id": "4150014009",
      "value": "重庆医药高等专科学校" },

    {
      "id": "4150014069",
      "value": "重庆青年职业技术学院" },

    {
      "id": "4150014128",
      "value": "重庆财经职业学院" },

    {
      "id": "4150014173",
      "value": "重庆科创职业学院" },

    {
      "id": "4150014183",
      "value": "重庆建筑工程职业学院" },

    {
      "id": "4150014237",
      "value": "重庆电讯职业学院" },

    {
      "id": "4150014238",
      "value": "重庆能源职业学院" },

    {
      "id": "4150014246",
      "value": "重庆商务职业学院" },

    {
      "id": "4150014267",
      "value": "重庆交通职业学院" },

    {
      "id": "4150014315",
      "value": "重庆化工职业学院" },

    {
      "id": "4150014316",
      "value": "重庆旅游职业学院" },

    {
      "id": "4150014365",
      "value": "重庆安全技术职业学院" },

    {
      "id": "4150014366",
      "value": "重庆公共运输职业学院" },

    {
      "id": "4150014367",
      "value": "重庆艺术工程职业学院" },

    {
      "id": "4150014368",
      "value": "重庆轻工职业学院" },

    {
      "id": "4150014369",
      "value": "重庆电信职业学院" },

    {
      "id": "4150014370",
      "value": "重庆经贸职业学院" },

    {
      "id": "4150014388",
      "value": "重庆第二师范学院" },

    {
      "id": "4150014428",
      "value": "重庆幼儿师范高等专科学校" },

    {
      "id": "4150014482",
      "value": "重庆文化艺术职业学院" },

    {
      "id": "4150014491",
      "value": "重庆科技职业学院" },

    {
      "id": "4150014557",
      "value": "重庆资源与环境保护职业学院" },

    {
      "id": "4150014576",
      "value": "重庆护理职业学院" }] }] },





{
  "id": 25,
  "value": "四川省",
  "childs": [
  {
    "id": 1,
    "value": "成都市",
    "childs": [
    {
      "id": "4151010610",
      "value": "四川大学" },

    {
      "id": "4151010613",
      "value": "西南交通大学" },

    {
      "id": "4151010614",
      "value": "电子科技大学" },

    {
      "id": "4151010615",
      "value": "西南石油大学" },

    {
      "id": "4151010616",
      "value": "成都理工大学" },

    {
      "id": "4151010621",
      "value": "成都信息工程大学" },

    {
      "id": "4151010623",
      "value": "西华大学" },

    {
      "id": "4151010633",
      "value": "成都中医药大学" },

    {
      "id": "4151010636",
      "value": "四川师范大学" },

    {
      "id": "4151010651",
      "value": "西南财经大学" },

    {
      "id": "4151010653",
      "value": "成都体育学院" },

    {
      "id": "4151010654",
      "value": "四川音乐学院" },

    {
      "id": "4151010656",
      "value": "西南民族大学" },

    {
      "id": "4151011079",
      "value": "成都学院" },

    {
      "id": "4151011116",
      "value": "成都工业学院" },

    {
      "id": "4151011552",
      "value": "四川旅游学院" },

    {
      "id": "4151011553",
      "value": "成都纺织高等专科学校" },

    {
      "id": "4151011841",
      "value": "民办四川天一学院" },

    {
      "id": "4151012064",
      "value": "成都航空职业技术学院" },

    {
      "id": "4151012065",
      "value": "四川电力职业技术学院" },

    {
      "id": "4151012635",
      "value": "成都职业技术学院" },

    {
      "id": "4151012636",
      "value": "成都东软学院" },

    {
      "id": "4151012638",
      "value": "四川水利职业技术学院" },

    {
      "id": "4151012641",
      "value": "四川航天职业技术学院" },

    {
      "id": "4151012642",
      "value": "四川邮电职业技术学院" },

    {
      "id": "4151012761",
      "value": "四川交通职业技术学院" },

    {
      "id": "4151012762",
      "value": "四川工商职业技术学院" },

    {
      "id": "4151012963",
      "value": "四川托普信息技术职业学院" },

    {
      "id": "4151012964",
      "value": "四川国际标榜职业学院" },

    {
      "id": "4151012965",
      "value": "成都农业科技职业学院" },

    {
      "id": "4151012969",
      "value": "成都艺术职业学院" },

    {
      "id": "4151013665",
      "value": "电子科技大学成都学院" },

    {
      "id": "4151013669",
      "value": "四川传媒学院" },

    {
      "id": "4151013670",
      "value": "成都信息工程大学银杏酒店管理学院" },

    {
      "id": "4151013671",
      "value": "成都文理学院" },

    {
      "id": "4151013672",
      "value": "四川工商学院" },

    {
      "id": "4151013673",
      "value": "四川外国语大学成都学院" },

    {
      "id": "4151013705",
      "value": "成都医学院" },

    {
      "id": "4151013812",
      "value": "四川商务职业学院" },

    {
      "id": "4151013903",
      "value": "四川大学锦城学院" },

    {
      "id": "4151014004",
      "value": "四川文化传媒职业学院" },

    {
      "id": "4151014005",
      "value": "四川华新现代职业学院" },

    {
      "id": "4151014006",
      "value": "四川管理职业学院" },

    {
      "id": "4151014007",
      "value": "四川艺术职业学院" },

    {
      "id": "4151014070",
      "value": "四川科技职业学院" },

    {
      "id": "4151014086",
      "value": "四川文化产业职业学院" },

    {
      "id": "4151014091",
      "value": "四川财经职业学院" },

    {
      "id": "4151014175",
      "value": "四川城市职业学院" },

    {
      "id": "4151014176",
      "value": "四川现代职业学院" },

    {
      "id": "4151014323",
      "value": "四川长江职业学院" },

    {
      "id": "4151014389",
      "value": "成都师范学院" },

    {
      "id": "4151014410",
      "value": "四川电影电视学院" },

    {
      "id": "4151014486",
      "value": "四川文轩职业学院" },

    {
      "id": "4151014514",
      "value": "成都工业职业技术学院" },

    {
      "id": "4151014515",
      "value": "四川西南航空职业学院" },

    {
      "id": "4151014547",
      "value": "成都工贸职业技术学院" }] },



  {
    "id": 2,
    "value": "绵阳市",
    "childs": [
    {
      "id": "4151010619",
      "value": "西南科技大学" },

    {
      "id": "4151010639",
      "value": "绵阳师范学院" },

    {
      "id": "4151012753",
      "value": "绵阳职业技术学院" },

    {
      "id": "4151014010",
      "value": "四川中医药高等专科学校" },

    {
      "id": "4151014037",
      "value": "西南财经大学天府学院" },

    {
      "id": "4151014043",
      "value": "四川文化艺术学院" },

    {
      "id": "4151014045",
      "value": "西南科技大学城市学院" },

    {
      "id": "4151014221",
      "value": "四川幼儿师范高等专科学校" },

    {
      "id": "4151014411",
      "value": "四川汽车职业技术学院" },

    {
      "id": "4151014485",
      "value": "四川电子机械职业技术学院" }] },



  {
    "id": 3,
    "value": "自贡市",
    "childs": [
    {
      "id": "4151010622",
      "value": "四川理工学院" },

    {
      "id": "4151014409",
      "value": "四川卫生康复职业学院" }] },



  {
    "id": 4,
    "value": "德阳市",
    "childs": [
    {
      "id": "4151010624",
      "value": "中国民用航空飞行学院" },

    {
      "id": "4151012763",
      "value": "四川工程职业技术学院" },

    {
      "id": "4151012764",
      "value": "四川建筑职业技术学院" },

    {
      "id": "4151013813",
      "value": "四川司法警官职业学院" },

    {
      "id": "4151013816",
      "value": "四川工业科技学院" },

    {
      "id": "4151014513",
      "value": "四川护理职业学院" }] },



  {
    "id": 5,
    "value": "雅安市",
    "childs": [
    {
      "id": "4151010626",
      "value": "四川农业大学" },

    {
      "id": "4151013049",
      "value": "雅安职业技术学院" }] },



  {
    "id": 6,
    "value": "泸州市",
    "childs": [
    {
      "id": "4151010632",
      "value": "西南医科大学" },

    {
      "id": "4151012212",
      "value": "四川警察学院" },

    {
      "id": "4151012637",
      "value": "四川化工职业技术学院" },

    {
      "id": "4151012967",
      "value": "泸州职业技术学院" },

    {
      "id": "4151014386",
      "value": "四川三河职业学院" }] },



  {
    "id": 7,
    "value": "南充市",
    "childs": [
    {
      "id": "4151010634",
      "value": "川北医学院" },

    {
      "id": "4151010638",
      "value": "西华师范大学" },

    {
      "id": "4151012639",
      "value": "南充职业技术学院" },

    {
      "id": "4151014262",
      "value": "西南交通大学希望学院" }] },



  {
    "id": 8,
    "value": "内江市",
    "childs": [
    {
      "id": "4151010640",
      "value": "内江师范学院" },

    {
      "id": "4151012640",
      "value": "内江职业技术学院" },

    {
      "id": "4151014496",
      "value": "川南幼儿师范高等专科学校" }] },



  {
    "id": 9,
    "value": "宜宾市",
    "childs": [
    {
      "id": "4151010641",
      "value": "宜宾学院" },

    {
      "id": "4151012966",
      "value": "宜宾职业技术学院" }] },



  {
    "id": 10,
    "value": "达州市",
    "childs": [
    {
      "id": "4151010644",
      "value": "四川文理学院" },

    {
      "id": "4151012767",
      "value": "达州职业技术学院" }] },



  {
    "id": 11,
    "value": "阿坝藏族羌族自治州",
    "childs": [
    {
      "id": "4151010646",
      "value": "阿坝师范学院" }] },



  {
    "id": 12,
    "value": "乐山市",
    "childs": [
    {
      "id": "4151010649",
      "value": "乐山师范学院" },

    {
      "id": "4151013048",
      "value": "乐山职业技术学院" },

    {
      "id": "4151013668",
      "value": "成都理工大学工程技术学院" }] },



  {
    "id": 13,
    "value": "攀枝花市",
    "childs": [
    {
      "id": "4151011360",
      "value": "攀枝花学院" },

    {
      "id": "4151012751",
      "value": "四川机电职业技术学院" }] },



  {
    "id": 14,
    "value": "眉山市",
    "childs": [
    {
      "id": "4151012968",
      "value": "眉山职业技术学院" },

    {
      "id": "4151014039",
      "value": "四川大学锦江学院" }] },



  {
    "id": 15,
    "value": "遂宁市",
    "childs": [
    {
      "id": "4151012970",
      "value": "四川职业技术学院" }] },



  {
    "id": 16,
    "value": "广安市",
    "childs": [
    {
      "id": "4151013814",
      "value": "广安职业技术学院" }] },



  {
    "id": 17,
    "value": "广元市",
    "childs": [
    {
      "id": "4151013815",
      "value": "四川信息职业技术学院" },

    {
      "id": "4151014393",
      "value": "川北幼儿师范高等专科学校" }] },



  {
    "id": 18,
    "value": "巴中市",
    "childs": [
    {
      "id": "4151014483",
      "value": "巴中职业技术学院" }] },



  {
    "id": 19,
    "value": "资阳市",
    "childs": [
    {
      "id": "4151014484",
      "value": "四川希望汽车职业学院" }] },



  {
    "id": 20,
    "value": "凉山州",
    "childs": [
    {
      "id": "4151014548",
      "value": "四川应用技术职业学院" }] }] },





{
  "id": 26,
  "value": "贵州省",
  "childs": [
  {
    "id": 1,
    "value": "贵阳市",
    "childs": [
    {
      "id": "4152010657",
      "value": "贵州大学" },

    {
      "id": "4152010660",
      "value": "贵州医科大学" },

    {
      "id": "4152010662",
      "value": "贵阳中医学院" },

    {
      "id": "4152010663",
      "value": "贵州师范大学" },

    {
      "id": "4152010671",
      "value": "贵州财经大学" },

    {
      "id": "4152010672",
      "value": "贵州民族大学" },

    {
      "id": "4152010976",
      "value": "贵阳学院" },

    {
      "id": "4152011731",
      "value": "贵州商学院" },

    {
      "id": "4152012107",
      "value": "贵州警察学院" },

    {
      "id": "4152012222",
      "value": "贵州交通职业技术学院" },

    {
      "id": "4152012850",
      "value": "贵州城市职业学院" },

    {
      "id": "4152013052",
      "value": "贵州工业职业技术学院" },

    {
      "id": "4152013053",
      "value": "贵州电力职业技术学院" },

    {
      "id": "4152013647",
      "value": "贵阳中医学院时珍学院" },

    {
      "id": "4152013648",
      "value": "贵州财经大学商务学院" },

    {
      "id": "4152013649",
      "value": "贵州大学科技学院" },

    {
      "id": "4152013650",
      "value": "贵州大学明德学院" },

    {
      "id": "4152013651",
      "value": "贵州民族大学人文科技学院" },

    {
      "id": "4152013652",
      "value": "贵州师范大学求是学院" },

    {
      "id": "4152013676",
      "value": "贵州医科大学神奇民族医药\n学院" },

    {
      "id": "4152013818",
      "value": "贵州轻工职业技术学院" },

    {
      "id": "4152014083",
      "value": "贵阳护理职业学院" },

    {
      "id": "4152014129",
      "value": "贵阳职业技术学院" },

    {
      "id": "4152014223",
      "value": "贵州师范学院" },

    {
      "id": "4152014252",
      "value": "贵州职业技术学院" },

    {
      "id": "4152014412",
      "value": "贵州工商职业学院" },

    {
      "id": "4152014440",
      "value": "贵州理工学院" },

    {
      "id": "4152014469",
      "value": "贵阳幼儿师范高等专科学校" },

    {
      "id": "4152014516",
      "value": "贵州建设职业技术学院" },

    {
      "id": "4152014549",
      "value": "贵州农业职业学院" },

    {
      "id": "4152014577",
      "value": "贵州水利水电职业技术学院" },

    {
      "id": "4152014578",
      "value": "贵州电子商务职业技术学院" },

    {
      "id": "4152014580",
      "value": "贵州电子科技职业学院" },

    {
      "id": "4152014613",
      "value": "贵州装备制造职业学院" },

    {
      "id": "4152014615",
      "value": "贵州食品工程职业学院" },

    {
      "id": "4252050963",
      "value": "贵州航空职业技术学院" }] },



  {
    "id": 2,
    "value": "遵义市",
    "childs": [
    {
      "id": "4152010661",
      "value": "遵义医学院" },

    {
      "id": "4152010664",
      "value": "遵义师范学院" },

    {
      "id": "4152012223",
      "value": "贵州航天职业技术学院" },

    {
      "id": "4152012824",
      "value": "遵义职业技术学院" },

    {
      "id": "4152013653",
      "value": "遵义医学院医学与科技学院" },

    {
      "id": "4152014011",
      "value": "遵义医药高等专科学校" },

    {
      "id": "4152014625",
      "value": "茅台学院" }] },



  {
    "id": 3,
    "value": "铜仁市",
    "childs": [
    {
      "id": "4152010665",
      "value": "铜仁学院" },

    {
      "id": "4152013055",
      "value": "铜仁职业技术学院" },

    {
      "id": "4152014470",
      "value": "铜仁幼儿师范高等专科学校" },

    {
      "id": "4152014558",
      "value": "贵州工程职业学院" },

    {
      "id": "4152014614",
      "value": "贵州健康职业学院" }] },



  {
    "id": 4,
    "value": "黔西南布依族苗族自治州",
    "childs": [
    {
      "id": "4152010666",
      "value": "兴义民族师范学院" },

    {
      "id": "4152013817",
      "value": "黔西南民族职业技术学院" }] },



  {
    "id": 5,
    "value": "安顺市",
    "childs": [
    {
      "id": "4152010667",
      "value": "安顺学院" },

    {
      "id": "4152012821",
      "value": "安顺职业技术学院" }] },



  {
    "id": 6,
    "value": "毕节市",
    "childs": [
    {
      "id": "4152010668",
      "value": "贵州工程应用技术学院" },

    {
      "id": "4152014198",
      "value": "毕节职业技术学院" },

    {
      "id": "4152014499",
      "value": "毕节医学高等专科学校" },

    {
      "id": "4152014538",
      "value": "毕节幼儿师范高等专科学校" },

    {
      "id": "4152014559",
      "value": "贵州工贸职业学院" }] },



  {
    "id": 7,
    "value": "黔东南苗族侗族自治州",
    "childs": [
    {
      "id": "4152010669",
      "value": "凯里学院" },

    {
      "id": "4152012336",
      "value": "贵州电子信息职业技术学院" },

    {
      "id": "4152012822",
      "value": "黔东南民族职业技术学院" }] },



  {
    "id": 8,
    "value": "黔南布依族苗族自治州",
    "childs": [
    {
      "id": "4152010670",
      "value": "黔南民族师范学院" },

    {
      "id": "4152011663",
      "value": "黔南民族医学高等专科学校" },

    {
      "id": "4152012823",
      "value": "黔南民族职业技术学院" },

    {
      "id": "4152014371",
      "value": "贵州盛华职业学院" },

    {
      "id": "4152014497",
      "value": "黔南民族幼儿师范高等专科\n学校" },

    {
      "id": "4152014579",
      "value": "贵州应用技术职业学院" },

    {
      "id": "4152014616",
      "value": "贵州经贸职业技术学院" },

    {
      "id": "4152014617",
      "value": "贵州护理职业技术学院" }] },



  {
    "id": 9,
    "value": "六盘水市",
    "childs": [
    {
      "id": "4152010977",
      "value": "六盘水师范学院" },

    {
      "id": "4152013054",
      "value": "六盘水职业技术学院" }] }] },





{
  "id": 27,
  "value": "云南省",
  "childs": [
  {
    "id": 1,
    "value": "昆明市",
    "childs": [
    {
      "id": "4153010673",
      "value": "云南大学" },

    {
      "id": "4153010674",
      "value": "昆明理工大学" },

    {
      "id": "4153010676",
      "value": "云南农业大学" },

    {
      "id": "4153010677",
      "value": "西南林业大学" },

    {
      "id": "4153010678",
      "value": "昆明医科大学" },

    {
      "id": "4153010680",
      "value": "云南中医学院" },

    {
      "id": "4153010681",
      "value": "云南师范大学" },

    {
      "id": "4153010689",
      "value": "云南财经大学" },

    {
      "id": "4153010690",
      "value": "云南艺术学院" },

    {
      "id": "4153010691",
      "value": "云南民族大学" },

    {
      "id": "4153011392",
      "value": "云南警官学院" },

    {
      "id": "4153011393",
      "value": "昆明学院" },

    {
      "id": "4153011557",
      "value": "昆明冶金高等专科学校" },

    {
      "id": "4153012349",
      "value": "云南国土资源职业学院" },

    {
      "id": "4153012357",
      "value": "云南交通职业技术学院" },

    {
      "id": "4153012393",
      "value": "昆明工业职业技术学院" },

    {
      "id": "4153012555",
      "value": "云南农业职业技术学院" },

    {
      "id": "4153012556",
      "value": "云南司法警官职业学院" },

    {
      "id": "4153012558",
      "value": "云南文化艺术职业学院" },

    {
      "id": "4153012559",
      "value": "云南体育运动职业技术学院" },

    {
      "id": "4153012560",
      "value": "云南经济管理学院" },

    {
      "id": "4153012825",
      "value": "云南科技信息职业学院" },

    {
      "id": "4153012851",
      "value": "昆明艺术职业学院" },

    {
      "id": "4153013326",
      "value": "云南大学滇池学院" },

    {
      "id": "4153013329",
      "value": "昆明理工大学津桥学院" },

    {
      "id": "4153013330",
      "value": "云南师范大学商学院" },

    {
      "id": "4153013331",
      "value": "云南师范大学文理学院" },

    {
      "id": "4153013332",
      "value": "昆明医科大学海源学院" },

    {
      "id": "4153013333",
      "value": "云南艺术学院文华学院" },

    {
      "id": "4153013756",
      "value": "云南国防工业职业技术学院" },

    {
      "id": "4153013757",
      "value": "云南机电职业技术学院" },

    {
      "id": "4153013758",
      "value": "云南林业职业技术学院" },

    {
      "id": "4153013759",
      "value": "云南城市建设职业学院" },

    {
      "id": "4153013761",
      "value": "云南工程职业学院" },

    {
      "id": "4153013909",
      "value": "云南工商学院" },

    {
      "id": "4153014032",
      "value": "云南新兴职业学院" },

    {
      "id": "4153014212",
      "value": "云南经贸外事职业学院" },

    {
      "id": "4153014317",
      "value": "云南商务职业学院" },

    {
      "id": "4153014372",
      "value": "昆明卫生职业学院" },

    {
      "id": "4153014381",
      "value": "云南旅游职业学院" },

    {
      "id": "4153014415",
      "value": "云南外事外语职业学院" },

    {
      "id": "4153014534",
      "value": "公安消防部队高等专科学校" },

    {
      "id": "4153014550",
      "value": "云南财经职业学院" },

    {
      "id": "4153014581",
      "value": "昆明铁道职业技术学院" },

    {
      "id": "4153014584",
      "value": "云南水利水电职业学院" },

    {
      "id": "4153014618",
      "value": "云南轻纺职业学院" },

    {
      "id": "4153014619",
      "value": "云南特殊教育职业学院" },

    {
      "id": "4153014620",
      "value": "云南工贸职业技术学院" },

    {
      "id": "4153014621",
      "value": "云南交通运输职业学院" }] },



  {
    "id": 2,
    "value": "昭通市",
    "childs": [
    {
      "id": "4153010683",
      "value": "昭通学院" },

    {
      "id": "4153014582",
      "value": "昭通卫生职业学院" }] },



  {
    "id": 3,
    "value": "曲靖市",
    "childs": [
    {
      "id": "4153010684",
      "value": "曲靖师范学院" },

    {
      "id": "4153013136",
      "value": "云南能源职业技术学院" },

    {
      "id": "4153014012",
      "value": "曲靖医学高等专科学校" }] },



  {
    "id": 4,
    "value": "普洱市",
    "childs": [
    {
      "id": "4153010685",
      "value": "普洱学院" }] },



  {
    "id": 5,
    "value": "保山市",
    "childs": [
    {
      "id": "4153010686",
      "value": "保山学院" },

    {
      "id": "4153014014",
      "value": "保山中医药高等专科学校" }] },



  {
    "id": 6,
    "value": "红河哈尼族彝族自治州",
    "childs": [
    {
      "id": "4153010687",
      "value": "红河学院" },

    {
      "id": "4153014130",
      "value": "云南锡业职业技术学院" },

    {
      "id": "4153014413",
      "value": "红河卫生职业学院" }] },



  {
    "id": 7,
    "value": "玉溪市",
    "childs": [
    {
      "id": "4153011390",
      "value": "玉溪师范学院" },

    {
      "id": "4153012971",
      "value": "玉溪农业职业技术学院" }] },



  {
    "id": 8,
    "value": "文山壮族苗族自治州",
    "childs": [
    {
      "id": "4153011556",
      "value": "文山学院" },

    {
      "id": "4153014239",
      "value": "云南三鑫职业技术学院" }] },



  {
    "id": 9,
    "value": "西双版纳傣族自治州",
    "childs": [
    {
      "id": "4153012826",
      "value": "西双版纳职业技术学院" }] },



  {
    "id": 10,
    "value": "丽江市",
    "childs": [
    {
      "id": "4153013328",
      "value": "云南大学旅游文化学院" },

    {
      "id": "4153014015",
      "value": "丽江师范高等专科学校" }] },



  {
    "id": 11,
    "value": "德宏傣族景颇族自治州",
    "childs": [
    {
      "id": "4153014016",
      "value": "德宏师范高等专科学校" },

    {
      "id": "4153014253",
      "value": "德宏职业学院" }] },



  {
    "id": 12,
    "value": "临沧市",
    "childs": [
    {
      "id": "4153014092",
      "value": "滇西科技师范学院" }] },



  {
    "id": 13,
    "value": "大理白族自治州",
    "childs": [
    {
      "id": "4153014583",
      "value": "大理护理职业学院" }] }] },





{
  "id": 28,
  "value": "西藏自治区",
  "childs": [
  {
    "id": 1,
    "value": "拉萨市",
    "childs": [
    {
      "id": "4154010692",
      "value": "西藏警官高等专科学校" },

    {
      "id": "4154010694",
      "value": "西藏大学" },

    {
      "id": "4154010696",
      "value": "西藏藏医学院" },

    {
      "id": "4154012481",
      "value": "拉萨师范高等专科学校" },

    {
      "id": "4154014085",
      "value": "西藏职业技术学院" }] },



  {
    "id": 2,
    "value": "林芝市",
    "childs": [
    {
      "id": "4154010693",
      "value": "西藏农牧学院" }] }] },





{
  "id": 29,
  "value": "陕西省",
  "childs": [
  {
    "id": 1,
    "value": "咸阳市",
    "childs": [
    {
      "id": "4154010695",
      "value": "西藏民族大学" },

    {
      "id": "4161010712",
      "value": "西北农林科技大学" },

    {
      "id": "4161010716",
      "value": "陕西中医药大学" },

    {
      "id": "4161010722",
      "value": "咸阳师范学院" },

    {
      "id": "4161010828",
      "value": "陕西工业职业技术学院" },

    {
      "id": "4161010966",
      "value": "杨凌职业技术学院" },

    {
      "id": "4161012510",
      "value": "陕西能源职业技术学院" },

    {
      "id": "4161012829",
      "value": "陕西财经职业技术学院" },

    {
      "id": "4161013123",
      "value": "陕西国际商贸学院" },

    {
      "id": "4161013125",
      "value": "陕西服装工程学院" },

    {
      "id": "4161013681",
      "value": "陕西科技大学镐京学院" },

    {
      "id": "4161013736",
      "value": "陕西邮电职业技术学院" },

    {
      "id": "4161013946",
      "value": "咸阳职业技术学院" }] },



  {
    "id": 2,
    "value": "西安市",
    "childs": [
    {
      "id": "4161010697",
      "value": "西北大学" },

    {
      "id": "4161010698",
      "value": "西安交通大学" },

    {
      "id": "4161010699",
      "value": "西北工业大学" },

    {
      "id": "4161010700",
      "value": "西安理工大学" },

    {
      "id": "4161010701",
      "value": "西安电子科技大学" },

    {
      "id": "4161010702",
      "value": "西安工业大学" },

    {
      "id": "4161010703",
      "value": "西安建筑科技大学" },

    {
      "id": "4161010704",
      "value": "西安科技大学" },

    {
      "id": "4161010705",
      "value": "西安石油大学" },

    {
      "id": "4161010708",
      "value": "陕西科技大学" },

    {
      "id": "4161010709",
      "value": "西安工程大学" },

    {
      "id": "4161010710",
      "value": "长安大学" },

    {
      "id": "4161010718",
      "value": "陕西师范大学" },

    {
      "id": "4161010724",
      "value": "西安外国语大学" },

    {
      "id": "4161010726",
      "value": "西北政法大学" },

    {
      "id": "4161010727",
      "value": "西安体育学院" },

    {
      "id": "4161010728",
      "value": "西安音乐学院" },

    {
      "id": "4161010729",
      "value": "西安美术学院" },

    {
      "id": "4161011080",
      "value": "西安文理学院" },

    {
      "id": "4161011400",
      "value": "西安培华学院" },

    {
      "id": "4161011560",
      "value": "西安财经学院" },

    {
      "id": "4161011664",
      "value": "西安邮电大学" },

    {
      "id": "4161011736",
      "value": "西安航空学院" },

    {
      "id": "4161011826",
      "value": "西安电力高等专科学校" },

    {
      "id": "4161011840",
      "value": "西安医学院" },

    {
      "id": "4161012712",
      "value": "西安欧亚学院" },

    {
      "id": "4161012713",
      "value": "西安外事学院" },

    {
      "id": "4161012714",
      "value": "西安翻译学院" },

    {
      "id": "4161012715",
      "value": "西京学院" },

    {
      "id": "4161012827",
      "value": "陕西国防工业职业技术学院" },

    {
      "id": "4161012828",
      "value": "西安航空职业技术学院" },

    {
      "id": "4161012830",
      "value": "陕西交通职业技术学院" },

    {
      "id": "4161012831",
      "value": "陕西职业技术学院" },

    {
      "id": "4161013121",
      "value": "西安思源学院" },

    {
      "id": "4161013122",
      "value": "西安高新科技职业学院" },

    {
      "id": "4161013124",
      "value": "西安城市建设职业学院" },

    {
      "id": "4161013569",
      "value": "西安交通工程学院" },

    {
      "id": "4161013570",
      "value": "陕西电子信息职业技术学院" },

    {
      "id": "4161013677",
      "value": "西安交通大学城市学院" },

    {
      "id": "4161013678",
      "value": "西北大学现代学院" },

    {
      "id": "4161013679",
      "value": "西安建筑科技大学华清学院" },

    {
      "id": "4161013680",
      "value": "西安财经学院行知学院" },

    {
      "id": "4161013682",
      "value": "西安工业大学北方信息工程\n学院" },

    {
      "id": "4161013683",
      "value": "延安大学西安创新学院" },

    {
      "id": "4161013685",
      "value": "西安电子科技大学长安学院" },

    {
      "id": "4161013737",
      "value": "西安海棠职业学院" },

    {
      "id": "4161013738",
      "value": "西安汽车科技职业学院" },

    {
      "id": "4161013739",
      "value": "西安东方亚太职业技术学院" },

    {
      "id": "4161013819",
      "value": "陕西警官职业学院" },

    {
      "id": "4161013894",
      "value": "西北工业大学明德学院" },

    {
      "id": "4161013932",
      "value": "陕西经济管理职业技术学院" },

    {
      "id": "4161013945",
      "value": "西安铁路职业技术学院" },

    {
      "id": "4161013947",
      "value": "西安职业技术学院" },

    {
      "id": "4161014028",
      "value": "陕西青年职业学院" },

    {
      "id": "4161014029",
      "value": "陕西工商职业学院" },

    {
      "id": "4161014030",
      "value": "陕西电子科技职业学院" },

    {
      "id": "4161014031",
      "value": "陕西旅游烹饪职业学院" },

    {
      "id": "4161014034",
      "value": "长安大学兴华学院" },

    {
      "id": "4161014041",
      "value": "西安理工大学高科学院" },

    {
      "id": "4161014042",
      "value": "西安科技大学高新学院" },

    {
      "id": "4161014222",
      "value": "西安医学高等专科学校" },

    {
      "id": "4161014390",
      "value": "陕西学前师范学院" },

    {
      "id": "4161014488",
      "value": "陕西艺术职业学院" }] },



  {
    "id": 3,
    "value": "延安市",
    "childs": [
    {
      "id": "4161010719",
      "value": "延安大学" },

    {
      "id": "4161013950",
      "value": "延安职业技术学院" }] },



  {
    "id": 4,
    "value": "汉中市",
    "childs": [
    {
      "id": "4161010720",
      "value": "陕西理工大学" },

    {
      "id": "4161013568",
      "value": "陕西航空职业技术学院" },

    {
      "id": "4161013949",
      "value": "汉中职业技术学院" }] },



  {
    "id": 5,
    "value": "宝鸡市",
    "childs": [
    {
      "id": "4161010721",
      "value": "宝鸡文理学院" },

    {
      "id": "4161013567",
      "value": "宝鸡职业技术学院" },

    {
      "id": "4261050084",
      "value": "陕西机电职业技术学院" }] },



  {
    "id": 6,
    "value": "渭南市",
    "childs": [
    {
      "id": "4161010723",
      "value": "渭南师范学院" },

    {
      "id": "4161013566",
      "value": "陕西铁路工程职业技术学院" },

    {
      "id": "4161013951",
      "value": "渭南职业技术学院" }] },



  {
    "id": 7,
    "value": "榆林市",
    "childs": [
    {
      "id": "4161011395",
      "value": "榆林学院" },

    {
      "id": "4161014318",
      "value": "榆林职业技术学院" }] },



  {
    "id": 8,
    "value": "商洛市",
    "childs": [
    {
      "id": "4161011396",
      "value": "商洛学院" },

    {
      "id": "4161013948",
      "value": "商洛职业技术学院" }] },



  {
    "id": 9,
    "value": "安康市",
    "childs": [
    {
      "id": "4161011397",
      "value": "安康学院" },

    {
      "id": "4161013952",
      "value": "安康职业技术学院" }] },



  {
    "id": 10,
    "value": "铜川市",
    "childs": [
    {
      "id": "4161013953",
      "value": "铜川职业技术学院" }] }] },





{
  "id": 30,
  "value": "甘肃省",
  "childs": [
  {
    "id": 1,
    "value": "兰州市",
    "childs": [
    {
      "id": "4162010730",
      "value": "兰州大学" },

    {
      "id": "4162010731",
      "value": "兰州理工大学" },

    {
      "id": "4162010732",
      "value": "兰州交通大学" },

    {
      "id": "4162010733",
      "value": "甘肃农业大学" },

    {
      "id": "4162010735",
      "value": "甘肃中医药大学" },

    {
      "id": "4162010736",
      "value": "西北师范大学" },

    {
      "id": "4162010737",
      "value": "兰州城市学院" },

    {
      "id": "4162010741",
      "value": "兰州财经大学" },

    {
      "id": "4162010742",
      "value": "西北民族大学" },

    {
      "id": "4162010838",
      "value": "兰州石化职业技术学院" },

    {
      "id": "4162011406",
      "value": "甘肃政法学院" },

    {
      "id": "4162011562",
      "value": "兰州文理学院" },

    {
      "id": "4162011807",
      "value": "兰州工业学院" },

    {
      "id": "4162012511",
      "value": "甘肃建筑职业技术学院" },

    {
      "id": "4162012832",
      "value": "兰州外语职业学院" },

    {
      "id": "4162012833",
      "value": "兰州职业技术学院" },

    {
      "id": "4162012834",
      "value": "甘肃警察职业学院" },

    {
      "id": "4162013510",
      "value": "西北师范大学知行学院" },

    {
      "id": "4162013511",
      "value": "兰州财经大学陇桥学院" },

    {
      "id": "4162013512",
      "value": "兰州财经大学长青学院" },

    {
      "id": "4162013514",
      "value": "兰州交通大学博文学院" },

    {
      "id": "4162013515",
      "value": "兰州理工大学技术工程学院" },

    {
      "id": "4162013519",
      "value": "甘肃交通职业技术学院" },

    {
      "id": "4162013933",
      "value": "兰州资源环境职业技术学院" },

    {
      "id": "4162013954",
      "value": "甘肃农业职业技术学院" },

    {
      "id": "4162014517",
      "value": "甘肃卫生职业学院" },

    {
      "id": "4162014518",
      "value": "兰州科技职业学院" },

    {
      "id": "4162014593",
      "value": "甘肃能源化工职业学院" },

    {
      "id": "4162014594",
      "value": "兰州现代职业学院" },

    {
      "id": "4262051378",
      "value": "甘肃财贸职业学院" }] },



  {
    "id": 2,
    "value": "庆阳市",
    "childs": [
    {
      "id": "4162010738",
      "value": "陇东学院" },

    {
      "id": "4162014551",
      "value": "庆阳职业技术学院" }] },



  {
    "id": 3,
    "value": "天水市",
    "childs": [
    {
      "id": "4162010739",
      "value": "天水师范学院" },

    {
      "id": "4162012835",
      "value": "甘肃林业职业技术学院" },

    {
      "id": "4162012836",
      "value": "甘肃工业职业技术学院" },

    {
      "id": "4162014319",
      "value": "甘肃机电职业技术学院" }] },



  {
    "id": 4,
    "value": "张掖市",
    "childs": [
    {
      "id": "4162010740",
      "value": "河西学院" }] },



  {
    "id": 5,
    "value": "平凉市",
    "childs": [
    {
      "id": "4162011805",
      "value": "甘肃医学院" },

    {
      "id": "4162014595",
      "value": "平凉职业技术学院" }] },



  {
    "id": 6,
    "value": "陇南市",
    "childs": [
    {
      "id": "4162011806",
      "value": "陇南师范高等专科学校" }] },



  {
    "id": 7,
    "value": "定西市",
    "childs": [
    {
      "id": "4162011808",
      "value": "定西师范高等专科学校" }] },



  {
    "id": 8,
    "value": "酒泉市",
    "childs": [
    {
      "id": "4162012539",
      "value": "酒泉职业技术学院" }] },



  {
    "id": 9,
    "value": "武威市",
    "childs": [
    {
      "id": "4162013518",
      "value": "武威职业学院" },

    {
      "id": "4162013955",
      "value": "甘肃畜牧工程职业技术学院" }] },



  {
    "id": 10,
    "value": "嘉峪关市",
    "childs": [
    {
      "id": "4162014131",
      "value": "甘肃钢铁职业技术学院" }] },



  {
    "id": 11,
    "value": "金昌市",
    "childs": [
    {
      "id": "4162014375",
      "value": "甘肃有色冶金职业技术学院" }] },



  {
    "id": 12,
    "value": "白银市",
    "childs": [
    {
      "id": "4162014376",
      "value": "白银矿冶职业技术学院" }] },



  {
    "id": 13,
    "value": "临夏州",
    "childs": [
    {
      "id": "4162014552",
      "value": "临夏现代职业学院" }] }] },





{
  "id": 31,
  "value": "青海省",
  "childs": [
  {
    "id": 1,
    "value": "西宁市",
    "childs": [
    {
      "id": "4163010743",
      "value": "青海大学" },

    {
      "id": "4163010746",
      "value": "青海师范大学" },

    {
      "id": "4163010748",
      "value": "青海民族大学" },

    {
      "id": "4163012562",
      "value": "青海卫生职业技术学院" },

    {
      "id": "4163012852",
      "value": "青海警官职业学院" },

    {
      "id": "4163012972",
      "value": "青海畜牧兽医职业技术学院" },

    {
      "id": "4163012973",
      "value": "青海交通职业技术学院" },

    {
      "id": "4163012974",
      "value": "青海建筑职业技术学院" },

    {
      "id": "4163013674",
      "value": "青海大学昆仑学院" },

    {
      "id": "4163014519",
      "value": "西宁城市职业技术学院" }] },



  {
    "id": 2,
    "value": "海东市",
    "childs": [
    {
      "id": "4163014520",
      "value": "青海高等职业技术学院" }] },



  {
    "id": 3,
    "value": "海西蒙古族藏族自治州",
    "childs": [
    {
      "id": "4163014521",
      "value": "青海柴达木职业技术学院" }] }] },





{
  "id": 32,
  "value": "宁夏回族自治区",
  "childs": [
  {
    "id": 1,
    "value": "银川市",
    "childs": [
    {
      "id": "4164010749",
      "value": "宁夏大学" },

    {
      "id": "4164010752",
      "value": "宁夏医科大学" },

    {
      "id": "4164011407",
      "value": "北方民族大学" },

    {
      "id": "4164012837",
      "value": "宁夏工业职业学院" },

    {
      "id": "4164013086",
      "value": "宁夏职业技术学院" },

    {
      "id": "4164013087",
      "value": "宁夏工商职业技术学院" },

    {
      "id": "4164013088",
      "value": "宁夏财经职业技术学院" },

    {
      "id": "4164013089",
      "value": "宁夏警官职业学院" },

    {
      "id": "4164013151",
      "value": "宁夏建设职业技术学院" },

    {
      "id": "4164013325",
      "value": "宁夏大学新华学院" },

    {
      "id": "4164013820",
      "value": "银川能源学院" },

    {
      "id": "4164014200",
      "value": "中国矿业大学银川学院" },

    {
      "id": "4164014377",
      "value": "宁夏葡萄酒与防沙治沙职业技术学院" },

    {
      "id": "4164014498",
      "value": "宁夏幼儿师范高等专科学校" },

    {
      "id": "4164014522",
      "value": "宁夏艺术职业学院" },

    {
      "id": "4164014624",
      "value": "宁夏体育职业学院" }] },



  {
    "id": 2,
    "value": "固原市",
    "childs": [
    {
      "id": "4164010753",
      "value": "宁夏师范学院" }] },



  {
    "id": 3,
    "value": "石嘴山市",
    "childs": [
    {
      "id": "4164012544",
      "value": "宁夏理工学院" }] },



  {
    "id": 4,
    "value": "吴忠市",
    "childs": [
    {
      "id": "4164012716",
      "value": "宁夏民族职业技术学院" }] }] },





{
  "id": 33,
  "value": "新疆维吾尔自治区",
  "childs": [
  {
    "id": 1,
    "value": "乌鲁木齐市",
    "childs": [
    {
      "id": "4165010755",
      "value": "新疆大学" },

    {
      "id": "4165010758",
      "value": "新疆农业大学" },

    {
      "id": "4165010760",
      "value": "新疆医科大学" },

    {
      "id": "4165010762",
      "value": "新疆师范大学" },

    {
      "id": "4165010766",
      "value": "新疆财经大学" },

    {
      "id": "4165010768",
      "value": "新疆艺术学院" },

    {
      "id": "4165010994",
      "value": "新疆工程学院" },

    {
      "id": "4165011565",
      "value": "乌鲁木齐职业大学" },

    {
      "id": "4165012513",
      "value": "新疆机电职业技术学院" },

    {
      "id": "4165012514",
      "value": "新疆轻工职业技术学院" },

    {
      "id": "4165012570",
      "value": "新疆能源职业技术学院" },

    {
      "id": "4165012734",
      "value": "新疆警察学院" },

    {
      "id": "4165013558",
      "value": "新疆大学科学技术学院" },

    {
      "id": "4165013559",
      "value": "新疆农业大学科学技术学院" },

    {
      "id": "4165013560",
      "value": "新疆医科大学厚博学院" },

    {
      "id": "4165013561",
      "value": "新疆财经大学商务学院" },

    {
      "id": "4165013562",
      "value": "新疆建设职业技术学院" },

    {
      "id": "4165013726",
      "value": "新疆现代职业技术学院" },

    {
      "id": "4165013727",
      "value": "新疆天山职业技术学院" },

    {
      "id": "4165013926",
      "value": "新疆交通职业技术学院" },

    {
      "id": "4165014138",
      "value": "新疆职业大学" },

    {
      "id": "4165014416",
      "value": "新疆体育职业技术学院" },

    {
      "id": "4165014421",
      "value": "新疆师范高等专科学校" },

    {
      "id": "4165014489",
      "value": "新疆铁道职业技术学院" },

    {
      "id": "4165014523",
      "value": "新疆生产建设兵团兴新职业技术学院" },

    {
      "id": "4165014525",
      "value": "新疆科技职业技术学院" },

    {
      "id": "4265051060",
      "value": "新疆工业职业技术学院" }] },



  {
    "id": 2,
    "value": "喀什地区",
    "childs": [
    {
      "id": "4165010763",
      "value": "喀什大学" }] },



  {
    "id": 3,
    "value": "和田地区",
    "childs": [
    {
      "id": "4165010765",
      "value": "和田师范专科学校" },

    {
      "id": "4165011818",
      "value": "新疆维吾尔医学专科学校" }] },



  {
    "id": 4,
    "value": "克拉玛依市",
    "childs": [
    {
      "id": "4165012482",
      "value": "克拉玛依职业技术学院" }] },



  {
    "id": 5,
    "value": "阿克苏地区",
    "childs": [
    {
      "id": "4165013093",
      "value": "阿克苏职业技术学院" }] },



  {
    "id": 6,
    "value": "巴音郭楞蒙古自治州",
    "childs": [
    {
      "id": "4165013094",
      "value": "巴音郭楞职业技术学院" }] },



  {
    "id": 7,
    "value": "哈密市",
    "childs": [
    {
      "id": "4165014524",
      "value": "哈密职业技术学院" }] },



  {
    "id": 8,
    "value": "吐鲁番市",
    "childs": [
    {
      "id": "4165014585",
      "value": "吐鲁番职业技术学院" }] },



  {
    "id": 9,
    "value": "博尔塔拉蒙古自治州",
    "childs": [
    {
      "id": "4165014622",
      "value": "博尔塔拉职业技术学院" }] }] }];







module.exports.data = data;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map