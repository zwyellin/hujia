//index.js
import { extendPage } from '../../common/page';
//获取应用实例
const app = getApp()

extendPage({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   

    transitionShow:false,
    transitionName:null,
    transitionMask:false,
    transitionPosition:null,

    ttt2:"这里是测试替换相同数据",
    ttt22:"这里是测试替换不同数据"

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("this",this)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      tt:'jj'
    })
    // 私有
    setTimeout(()=> {
      this.setData({
        ttt:'sdfsad'
      })
    }, 4000);
    setTimeout(()=> {
      this.setData({
        ttt1:'sdfsad'
      })
    }, 5000);
    setTimeout(()=> {
      this.setData({
        ttt2:'这里是测试替换相同数据',
        ttt22:"这里是测试替换不同数据，这里是测试替换不同数据"
      })
    }, 7000);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      transitionMask:true,
    })
  },
  transitionTap(event){
    let {name,mask,position}=event.target.dataset;
    // 如果没有值，则采用data的
    name=name || this.data.transitionName;
    mask=(mask==undefined) ? this.data.transitionMask :mask;
    position=position ||this.data.transitionPosition;
    
    this.setData({
      transitionShow:true,
      transitionName:name,
      transitionMask:mask,
      transitionPosition:position
    },()=>{
      console.log(this.data.transitionShow,this.data.transitionName,this.data.transitionMask,this.data.transitionPosition);
    })
    setTimeout(()=> {
      this.setData({
        transitionShow:false,
      },()=>{
        console.log("关闭",this.data.transitionShow,this.data.transitionName,this.data.transitionMask,this.data.transitionPosition);
      })
    }, 10000);
  }
})
