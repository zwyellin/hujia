// components/navigationBar/navigationBar.js
/* 
1.支持自定义导航栏类型：是否占据空间，对于页面头部是图片可以采用不占据空间类型，这样图片会从状态栏开始铺开，漂亮
2.支持导航栏背景设置为纯色，渐变色，图片【本地（本地图片要设置绝对定位，因为image标签在这里而不是使用的那个页面）、网络】或颜色背景图都有
3.支持设置内容区的文本(及icon)颜色，避免某些背景色导致看不清内容
4.支持返回类型：传统模式=>无返回，返回上一页，返回首页，返回上一页及首页
  新颖模式：自定义卡槽传入，【比如为导航球，点开垂直张开导航内容】
5.标题部分，支持正常的标题显示。或自定义<slot>【比如搜索框 等内容】
*/
const app = getApp();

Component({
  /**
   * 组件的属性列表
   * @navBarBfc 导航栏是否塌嵌(bfc):导航栏类型
   * false【default】:第一种导航栏：导航栏占据空间
   * true:第二种导航栏：导航栏不占据空间，适合头部是图片等情况 
   * 
   * @文本及icon颜色
   * @textColor://说明，标题颜色和icon颜色
   * 
   * @backStyle  返回方式 
   * ""：无
   * "back"【default】：返回上一页；
   * "home"：返回首页;
   * "back-home":返回上一页及返回首页
   * "loading":页面加载动画
   * "new":新颖返回模式【自定义】，需要传卡槽 √
   * 
   * @contentText 标题部分 
   * 有值：导航文本；
   * 为空【default】：其它自定义内容【包括空】，需要传卡槽 √
   * 
   * @背景样式
   * @bgClass：采用背景颜色或渐变颜色，传class; 【选填】
   * @bgImage：采用背景图片;【选填】
   * 
   *@其它
   *还可以传right卡槽
   */
  externalClasses: ['bg-class'],

  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true, //添加全局的
  },

  properties: {
    navBarBfc:{
      type:Boolean,
      value:false,//默认导航栏占据空间
    },
    textColor:{
      type:String,
      value:"#222",//默认图标及文本颜色为黑色
    },
    backStyle: {
      type: String,
      default: "back",//默认返回类型：返回图标
    }, 
    contentText: {
      type:String,
      default: "",//默认标题为空
    },
    bgImage: {
      type: String,
      default: '',//默认背景图片木有
    },
    // 暂时放在这边。用于进度条
    percent:{//百分比
      type:[Number | String],
      value:0 //默认值为0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight:app.globalData.statusBarHeight,//状态栏高度
    menuButton:app.globalData.menuButton,//胶囊相关数据 @obj,{width,height,top,left,right,bottom;及extendWidth}
    customNavBarHeight:app.globalData.customNavBarHeight,//自定义导航栏的高度【导航栏包括了状态栏】
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 返回上一页
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    // 返回首页
    toHome(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})
