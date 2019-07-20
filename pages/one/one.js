// pages/one/one.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarBfc:false,
    backStyle:'back',
    contentText:"这个是自定义的内容",
    bgClass:"redline",
    textColor:"#00a0f0",
    bgImage:"/images/one/timg1.jpg",
    percent:0,
    increment:4,
    modalShow:false,
    modalType:'center',
    show11:false,
    notifyShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // setTimeout(() => {
    //   this.setData({percent:10,modalShow:true})
    // }, 1000);

    // setTimeout(() => {
    //   this.setData({percent:20,modalShow:false})
    // }, 3000);
    // // setTimeout(() => {
    // //   this.setData({percent:50})
    // // }, 5000);
    // setTimeout(() => {
    //   this.setData({percent:30,modalShow:false,modalType:'top'})
    // }, 4000);
    // setTimeout(() => {
    //   this.setData({percent:30,modalShow:true})
    // }, 5000);
    // setTimeout(() => {
    //   this.setData({percent:40,modalShow:false})
    // }, 6000);


    // setTimeout(() => {
    //   this.setData({percent:30,modalShow:false,modalType:'bottom'})
    // }, 7000);
    // setTimeout(() => {
    //   this.setData({percent:30,modalShow:true})
    // }, 8000);
    // setTimeout(() => {
    //   this.setData({percent:40,modalShow:false})
    // }, 9000);

    // setTimeout(() => {
    //   this.setData({percent:30,modalShow:false,modalType:'left'})
    // }, 10000);
    // setTimeout(() => {
    //   this.setData({percent:30,modalShow:true})
    // }, 11000);
    // setTimeout(() => {
    //   this.setData({percent:40,modalShow:false})
    // }, 12000);


    // setTimeout(() => {
    //   this.setData({percent:30,modalShow:false,modalType:'right'})
    // }, 13000);
    // setTimeout(() => {
    //   this.setData({percent:30,modalShow:true})
    // }, 14000);
    // setTimeout(() => {
    //   this.setData({percent:40,modalShow:false})
    // }, 15000);


    setTimeout(() => {
      this.setData({percent:50,notifyShow:true})
    }, 1000);

    setTimeout(() => {
      this.setData({percent:50,notifyShow:false})
    }, 3000);

    
    setTimeout(() => {
      this.setData({percent:50,notifyShow:true})
    }, 3050);

    setTimeout(() => {
      this.setData({percent:50,notifyShow:true})
    }, 5000);



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  modalShowTap(){
    this.setData({
      show11:true
    })
  }
})