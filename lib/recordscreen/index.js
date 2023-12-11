import { handleScreen } from './recordscreen';
import { EVENTTYPES } from '../common';
import { validateOption, generateUUID, _support, BasePlugin } from '../utils';

export default class RecordScreen extends BasePlugin {
    constructor(params = {}) {
        super(EVENTTYPES.RECORDSCREEN);
        this.type = EVENTTYPES.RECORDSCREEN;
        this.recordScreentime = 10; // 默认录屏时长
        this.recordScreenTypeList = [
            EVENTTYPES.ERROR,
            EVENTTYPES.UNHANDLEDREJECTION,
            EVENTTYPES.RESOURCE,
            EVENTTYPES.FETCH,
            EVENTTYPES.XHR,
        ]; // 录屏事件集合
        this.bindOptions(params);
    }
    bindOptions(params) {
        const { recordScreenTypeList, recordScreentime } = params;
        validateOption(recordScreentime, 'recordScreentime', 'number') &&
            (this.recordScreentime = recordScreentime);
        validateOption(recordScreenTypeList, 'recordScreenTypeList', 'array') &&
            (this.recordScreenTypeList = recordScreenTypeList);
    }
    core({ transportData, options }) {
        // 给公共配置上添加开启录屏的标识 和 录屏列表
        options.silentRecordScreen = true;
        options.recordScreenTypeList = this.recordScreenTypeList;
        // 添加初始的recordScreenId
        _support.recordScreenId = generateUUID();
        handleScreen(transportData, this.recordScreentime);
    }
    transform() { }
}
