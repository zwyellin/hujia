import { basic } from './Behavior';
/**
 *增强Conmponent组件注册
 *Component({
    //  功能
  behaviors: [],//代码复用
  relations:{},//定义关联
  options:{},//配置某些功能
 
    //接收，监听数据   
  properties: {},//定义要接收的属性
  externalClasses:[],///外部传的属性，作为组件的class使用【properties那边如果接收了该属性，则这边接收不到】。内部和外部两个类的优先级是未定义的，因此最好避免这种情况
  observers:{},//数据监听器，可以监听多个("a,b")，及子属性(".")，避免死循环
  data: {}, // 私有数据，可用于模板渲染

    //生命周期   
  lifetimes: {// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },
  pageLifetimes: { // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

    //方法   
  methods: {
    onMyButtonTap: function(){},//没有下划线的，可能外部调用
    _myPrivateMethod: function(){}, // 内部方法建议以下划线开头
  }

})
 * @param {Object} config
 */
function extendComponent(config){
    // 1、如果没有某选项，设置默认配置
    _initComponent(config)

    // 2、对某些选项，增强功能
    _addAction(config);

    // 3、对config加工之后，丢给Component注册
    Component(config)
}

/**
 *初始化工作
 *@return {默认增加 custom-class外部类}
 *@return {默认增加 basic代码复用}
 *@return {默认增加 options采用外部类，多卡槽}
 *
 * @param {Object} config
 */
function  _initComponent(config){
    // add default externalClasses
    config.externalClasses = config.externalClasses || [];
    config.externalClasses.push('custom-class');

    // add default behaviors
    config.behaviors = config.behaviors || [];
    config.behaviors.push(basic);

    // add default options
    console.log("config.options",config.options);
    config.options=config.options || {};
    let defaultOptions={
        multipleSlots: true,
        addGlobalClass: true
    };
    config.options=Object.assign({},defaultOptions,config.options)
}

/**
 *
 *
 * @param {*} config
 */
function _addAction(config){

}

export { extendComponent };