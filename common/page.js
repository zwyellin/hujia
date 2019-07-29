/**
 *增强page注册
 *除了 Page ，作为高级用法，页面可以像自定义组件一样使用 Component 来创建，这样就可以使用自定义组件的特性，如 behaviors 等。具体细节请阅读 Component 构造器 章节。
data: {},
onLoad: function(options) {},
onReady: function() {},
onShow: function() {},
onHide: function() {},
onUnload: function() {},
onPullDownRefresh: function() {},
onReachBottom: function() {},
onShareAppMessage: function () {},
onPageScroll: function() {},
onResize: function() {},
onTabItemTap(item) {},
customData:{}
 * @param {Object} config
 */
function extendPage(config){
    // 1、如果没有某选项，设置默认配置
    _initPage();
    
    // 2、对某些选项，增强功能
    _addAction(config);

    // 3、对config加工之后，丢给Page注册
    Page(config)
}


/**
 *extendPage要用到的内部函数，用于初始化选项
 *
 * @param {Object} config
 */
function _initPage(config){
  return  config;
}


/**
 *extendPage要用到的内部函数，用于增强某些选function
 *可以用于埋点，或其它任何增强
 *
 * 关于this问题：
 * 系统会给 Page(config)中的config中的函数，绑定this。
 * 所以，如果我们对函数拓展的话，继续绑定this即可：originFun.call(this,arguments);
 * 
 * @param {Object} config
 */
function _addAction(config){
    let originFun;//用于保存要增强的对应函数
    if(config.onLoad){
        originFun=config.onLoad;
        config.onLoad=function(){
            // 干一些埋点等事情
            console.log("options:",arguments);
            // 调用之前逻辑
            originFun.call(this,arguments);
            // ...
        }
    }
}


export { extendPage };


