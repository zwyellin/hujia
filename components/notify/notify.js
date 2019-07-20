// components/notify/notify.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      show:{
        type:Boolean,
        value:false
      },
      type:{//这里是消息的类型。传颜色值
        type:String,
        value:"yellow"
      }
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

  }
})
