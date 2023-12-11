export * from './core/browser';
export * from './core/exception';
export * from './core/helpers';
export * from './core/verifyType';
export * from './core/global';
export * from './core/queue';
export * from './core/httpStatus';

export class BasePlugin {
    constructor(type) {
        this.type = type;  // 插件类型
    }
    // abstract bindOptions(options: object): void; // 校验参数
    // abstract core(sdkBase: SdkBase): void; // 核心方法
    // abstract transform(data: any): void; // 数据转化
}
