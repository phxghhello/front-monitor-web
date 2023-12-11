import { validateOption, _support, setSilentFlag } from '../../utils';
import { breadcrumb } from './breadcrumb';
import { transportData } from './reportData';

export class Options {
  constructor() {
    this.dsn = ''; // 监控上报接口的地址
    this.throttleDelayTime = 0; // click事件的节流时长
    this.overTime = 10; // 接口超时时长
    this.whiteBoxElements = ['html', 'body', '#app', '#root']; // // 白屏检测的容器列表
    this.silentWhiteScreen = false; // 是否开启白屏检测
    this.skeletonProject = false; // 项目是否有骨架屏
    this.repeatCodeError = false; // 是否去除重复的代码错误，重复的错误只上报一次
  }
  bindOptions(options) {
    const {
      dsn,
      filterXhrUrlRegExp,
      throttleDelayTime = 0,
      overTime = 10,
      silentWhiteScreen = false,
      whiteBoxElements = ['html', 'body', '#app', '#root'],
      skeletonProject = false,
      handleHttpStatus,
      repeatCodeError = false,
    } = options;
    validateOption(dsn, 'dsn', 'string') && (this.dsn = dsn);
    validateOption(throttleDelayTime, 'throttleDelayTime', 'number') &&
      (this.throttleDelayTime = throttleDelayTime);
    validateOption(overTime, 'overTime', 'number') && (this.overTime = overTime);
    validateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', 'regexp') &&
      (this.filterXhrUrlRegExp = filterXhrUrlRegExp);
    validateOption(silentWhiteScreen, 'silentWhiteScreen', 'boolean') &&
      (this.silentWhiteScreen = silentWhiteScreen);
    validateOption(skeletonProject, 'skeletonProject', 'boolean') &&
      (this.skeletonProject = skeletonProject);
    validateOption(whiteBoxElements, 'whiteBoxElements', 'array') &&
      (this.whiteBoxElements = whiteBoxElements);
    validateOption(handleHttpStatus, 'handleHttpStatus', 'function') &&
      (this.handleHttpStatus = handleHttpStatus);
    validateOption(repeatCodeError, 'repeatCodeError', 'boolean') &&
      (this.repeatCodeError = repeatCodeError);
  }
}
const options = _support.options || (_support.options = new Options());

export function handleOptions(paramOptions) {
  // setSilentFlag 给全局添加已设置的标识，防止重复设置
  setSilentFlag(paramOptions);
  // 设置用户行为的配置项
  breadcrumb.bindOptions(paramOptions);
  // transportData 配置上报的信息
  transportData.bindOptions(paramOptions);
  // 绑定其他配置项
  options.bindOptions(paramOptions);
}
export { options };
