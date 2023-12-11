import { UAParser } from 'ua-parser-js';
import { variableTypeDetection } from './verifyType';

export const isBrowserEnv = variableTypeDetection.isWindow(
    typeof window !== 'undefined' ? window : 0
);

// 获取全局变量
export function getGlobal() {
    return window;
}
const _global = getGlobal();
const _support = getGlobalSupport();
const uaResult = new UAParser().getResult();

// 获取设备信息
_support.deviceInfo = {
    browserVersion: uaResult.browser.version, // // 浏览器版本号 107.0.0.0
    browser: uaResult.browser.name, // 浏览器类型 Chrome
    osVersion: uaResult.os.version, // 操作系统 电脑系统 10
    os: uaResult.os.name, // Windows
    ua: uaResult.ua,
    device: uaResult.device.model ? uaResult.device.model : 'Unknow',
    device_type: uaResult.device.type ? uaResult.device.type : 'Pc',
};

_support.hasError = false;

// errorMap 存储代码错误的集合
_support.errorMap = new Map();

_support.replaceFlag = _support.replaceFlag || {};
const replaceFlag = _support.replaceFlag;
export function setFlag(replaceType, isSet) {
    if (replaceFlag[replaceType]) return;
    replaceFlag[replaceType] = isSet;
}
export function getFlag(replaceType) {
    return replaceFlag[replaceType] ? true : false;
}
// 获取全部变量__webSee__的引用地址
export function getGlobalSupport() {
    _global.__webSee__ = _global.__webSee__ || {};
    return _global.__webSee__;
}
export function supportsHistory() {
    const chrome = _global.chrome;
    const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    const hasHistoryApi = 'history' in _global && !!_global.history.pushState && !!_global.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
}

export { _global, _support };
