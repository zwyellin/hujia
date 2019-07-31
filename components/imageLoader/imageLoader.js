/* 
  入参：
  @custom-class：image类
  @defaultSrc：默认显示的图片路径,要写绝对位置
  @src：真正要显示的图片路径
  @mode：剪辑模式
  @images:字符串或数组。如果传了该参数。则会预览。及所有预览为images
*/
import {
  extendComponent
} from '../../common/component';

extendComponent({
  properties: {
    defaultSrc: {
      type:String,
      value:"./merchantLogo.png"
    },
    src: String,
    mode: String,
    images:{
      type:[Array]
    }
  },
  data: {
    finishLoadFlag: false,//图片资源是否加载下来。加载出错则重置为false
  },

  methods: {
    // 加载完成回调
    finishLoad: function (e) {
      setTimeout(()=>{
        this.setData({
          finishLoadFlag: true
        })
      },100)
      //获取宽高比例，自适应
      // console.log("宽高比例",e.detail.width/e.detail.height)
    },
    // 加载出错回调
    loadErr(e){
      this.setData({
        finishLoadFlag: false//加载出错，则还是采用默认的
      })
    },
    //图片预览：//如果没有传images,则没有图片预览功能
    previewImage(){
      //所有图片
      let urls=this.data.images;
      if(!urls) return;
      //当前图片路径
      let current=this.data.src;
      wx.previewImage({//知识补充，图片预览会触发整个小程序的hide和show。即。跳出小程序，进入了微信环境
        current, // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      })
    }
  }
})