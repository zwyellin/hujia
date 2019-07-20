//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //

wx.getSystemInfo({
  success: e => {
    //状态栏
    let statusBarHeight= e.statusBarHeight;
    // 右上角胶囊
    let menuButton = wx.getMenuButtonBoundingClientRect();
    //胶囊宽度加上左右边距的新宽度【即自定义导航栏时，左边元素的margin-right的值】
    menuButton.extendWidth=menuButton.width+2*(e.windowWidth-menuButton.right);
    menuButton.marginRight=e.windowWidth-menuButton.right;//胶囊的右边距。用于设置返回的左边距。对称
    // 保存
    this.globalData.statusBarHeight =statusBarHeight
    this.globalData.menuButton = menuButton;  
    this.globalData.customNavBarHeight= menuButton.bottom + menuButton.top - statusBarHeight;
  }
})
  },

globalData: {
  userInfo: null,
  //自定义导航相关的
  statusBarHeight:null,//状态栏高度
  menuButton:null,//胶囊相关数据 @obj,{width,height,top,left,right,bottom}
  customNavBarHeight:null,//自定义导航栏的高度【导航栏包括了状态栏】
}
})