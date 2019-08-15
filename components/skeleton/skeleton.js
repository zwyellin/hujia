/**
 * 实现思路：需要默认数据，这样才能完美应对list,wx:if的情况，及flex宽度靠内容撑开的样式。
 * 替换思路：和imageLoader加载器类似：先展示默认图片，拿到数据之后显示真实的图片
 * 
 * 具体实现：
 * 页面准备一份默认数据：defaultData
 * xml中：<skeleton watchData={{与卡槽笨蛋一样的对象}}><slot/></skeleton>
 * 页面onload时，data=defaultData
 * 此时：watchData第一次收到数据(第一次为onload时)，靠默认数据，撑开卡槽容器，自身opacity:0;
 * 此后，再收到数据就关闭骨架屏
 * 
 * 优点：
 * 1、好维护：页面没有额外的xml。也没有额外的css。只需要维护一份默认数据即可。
 * 2、更优雅，更真实：多个请求，会看到分批次的替换。而不需要全请求成功才替换。
 * 3、可以和imageLoader同处，而不会出现和美团等骨架屏没有之后，图片区域还出现短暂空白
 * 
 * 注意事项：
 * 1、custom-class：需要传与卡槽一样的[border-radius]；可选[背景色]，或者其它
 * 2、custom-class：宽高不需要传，默认数据就是撑开宽高的
*/
import {
  extendComponent
} from '../../common/component';

extendComponent({
  properties: {
    watchData: null,//观察对应的请求对象
    transition:{//过渡名称，对应该组件的name
      type:String,
      value:null
    },
    duration: { //run Time ms
      type: [String,Number],
      value:800
    },
  },
  observers: {
    "watchData":function(newVal){
      this.data.counter+=1;
      console.log("this.data.counter",this.data.counter);
      if(this.data.counter>=2){
        this.setData({success:true});
      }
    }
  },
  data: {
    counter:0,//第一次显示骨架屏，之后就显示真实节点。
    success:false //不可逆，只能false->true
  }
})