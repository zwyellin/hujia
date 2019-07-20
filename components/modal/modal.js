// components/modal/modal.js
const app = getApp();
Component({
  /**
   * 这个是modal模拟框。
    */


  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    },
    type:{
      type:String,
      value:'center' //top，right，bottom，left，center 五种风格
    },
    close:{//点击蒙层是否会关闭
      type:Boolean,
      value:false
    }
  },
  observers: {
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
    /**
     *modal蒙层的点击:是否关闭
     *
     */
    modal_tap(){
      if(this.data.close){
        this.setData({
          show:false
        })
      }
    },
    /**
     *内容区的容器
     *1、捕获内容区容器捕获到的点击。避免被modal捕获到
     */
    modal_content_tap(){
      // 空空如也
    }
  }
})
