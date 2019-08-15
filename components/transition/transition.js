// components/transition/transition.js
import {
  extendComponent
} from '../../common/component';
import {isObj,isArray} from '../../utils/util';
/**
 * 这个组件是，
 * 
 */
const nextTick = (res) => new Promise(resolve=>{console.log("暂停50ms");  setTimeout(()=>resolve(res), 50)}); //这个可以用来暂停一段时间，确保class已经渲染到位。再设置下一个class。这样才能过渡成功
//判断name是不是slide，用于展开，隐藏的过渡。此时name传'slide'即可
//需要用到this.调用需要绑定this
const isSlide = function(name) {
  let isIncludes=isArray(name) ? name.includes('slide') : (name == 'slide');//包括了'slide'即可。也可以是数组组合过渡
  if(isIncludes && !this.data.height){
    return Promise.resolve()
    .then(()=>this.setDataChain({//瞬间进入chaxun状态,,此时，高度auto，才可以查到高度
      classes: 'slide-enter-chaxun'
    }))
    .then(()=>nextTick())
    .then(()=>//开启display。准备查询节点布局信息
      this.setDataChain({
        inited: true,
        display:true,
      })
    )
    .then(()=>nextTick())
    .then(()=>{return this.getRect('#slot').then(res=>{//查询节点信息
        return Promise.resolve(res); 
      })
    })
    .then((res)=>{//关闭display；准备瞬间，回归到this.data.classNames.enter状态
     return  this.setDataChain({
        display:false,
      })
      .then(()=>{
        return Promise.resolve(res);
      })
    })
    .then((res)=>nextTick(res))
    .then((res)=>{//回归到this.data.classNames.enter状态。同时设置height,此时还是没有高度的。因为类中，设置了height:0 !important。
      return this.setDataChain({
        classes:this.data.classNames.enter,
        height:res[0].height
      })
     })
    .catch(()=>resolve())
  }
  else{//如果name不是，或者已经查询过，则返回promise
    return Promise.resolve();
  }

} 
const getClassNames = (currentName) => {
  let classNames={
    enter:'',
    'enter-to':'',
    leave:'',
    'leave-to':''
  }
  if(isArray(currentName)){//数组
    currentName.forEach(item => {
      //详细说明看css
      classNames.enter+=` ${item}-enter ${item}-enter-active`;//active写在这里是因为可能外部传进来，先后的问题。所以先引进来    
      classNames['enter-to']+=` ${item}-enter-active ${item}-enter-to`;
      classNames.leave+=` ${item}-leave ${item}-leave-active`;
      classNames['leave-to']+=` ${item}-leave-active  ${item}-leave-to`;
    });
    classNames['enter-to']+=` transition`;//加上过渡函数，如果非默认值，则这边需要加上
    classNames['leave-to']+=` transition`;//加上过渡函数，如果非默认值，则这边需要加上
    return classNames;
  }
  else{//字符串
    if(currentName){//非空字符串
      return {
        enter: `${currentName}-enter ${currentName}-enter-active`,
        'enter-to': `${currentName}-enter-active ${currentName}-enter-to transition`,
        leave: ` ${currentName}-leave ${currentName}-leave-active`,
        'leave-to':`${currentName}-leave-active  ${currentName}-leave-to transition`,
        }
    }else{
      return {
        enter:`enter-class enter-active-class`,
        'enter-to':`enter-active-class enter-to-class`,//外部类aceter-to-class记得加上 transition-timing-function，否则采用默认值ease
        leave:`leave-class  leave-active-class`,
        'leave-to':`leave-active-class leave-to-class`
      }
    }
  }
}
extendComponent({
  //如果没有传name，则需要传以下类。
  //如果要修饰卡槽。则外部还需要传custom-class
  externalClasses: [ 
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class',
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    name: { //过渡模式，如果要采用自定义的，则这里传''即可，然后传externalClasses。
      type: [String,Object,Array],//要区分enter、leave过渡，用Object;要使用多预设过渡组合，使用Array。
      value:{
        enter:{
          type:[String,Array],
          value:['up','fade'],//要使用多预设过渡组合，使用Array。
        },
        leave:"fade"
      }
    },
    show: {
      type: Boolean,
      value: false
    },
    duration: { //run Time ms
      type: [String,Number,Object],
      value:{
        enter:300,
        leave:300,
      }
    },
    //leave过渡之后状态是否保留。而不是display:none
    //带有mask，避免影响页面操作。这边强制禁止保留状态。适用于非mask的情况。mask:0和1(1是全透明的，设置了属性虽然不会影响页面操作。建议不宜保留)
    retain:{
      type:Boolean,
      value:false
    },
    mask: { //蒙层类型 以下四个个是配套的，针对mask的配置
      type: [String,Number],//如果为0，表示没有蒙层。1：全透明蒙层
      value: '0',
    },
    //顶部的margin。如果没有自定义navBar或tabBar则，fixed区域为中间的可视区域。否则为中间可视区域+自定义bar区域。
    //因此为了兼容，如果自定义了bar，则要传值进来修正蒙层的区域。
    margin:{//记得带上单位哦。
      type: Object,
      value:{
        top:'0px',
        bottom:'0px',
      }
    },
    position: { //如果有mask，则mask中的卡槽位置是哪里。如果要再偏移，则外部卡槽使用margin来实现即可
      type: String,
      value: "right",
    },
    close: { //如果有mask，点击Mask是否关闭蒙层
      type: Boolean,
      value: true
    }
  },
  observers: {
    'show': function (newVal, oldVal) {
      if (newVal) {
        this.enter();
      } else {
        this.leave();
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: { 
    classes: null,//不同状态下设置的class
    currentDuration: null,//保存为enter或者leave的时间。

    //记录动画所处的状态：
    // 0=>准备执行enter过渡；1=>开始执行enter过渡；2=>执行完了enter过渡；
    // 3=>准备执行leave过渡；4=>开始执行leave过渡;5=>执行完了leave过渡
    //作用：1、用于缩放mask同步开始过渡。2、用于记录状态，判断enter、leave能否执行。
    status:5,//初始值为：5=>执行完了leave过渡

    //需要用到display:none或者Wx-if(切换代价) 来让其遗忘enter之前的位置。避免后续无过渡效果：这边为了性能。初始用wx-if。后续切换用display
    inited: false, //默认不显示，enter时，才显示。初始用wx-if。减少初始渲染代价
    display: false, //默认不显示，enter时，才显示。后续用display,减少切换代价

    throttle:false,//动画结束函数的节流 


    height:null,//这个是用于内容块，展开和隐藏的。如果name传'slide',则会获取该节点height
  },
  /**
   * 组件的方法列表
   */
  methods: {
    enter() {
      if(this.data.status !== 5) return ;//只有初始化，及执行完了leave之后，才会执行enter。防抖
      const {
        duration,
        name
      } = this.data;
      const currentName=isObj(name) ? name.enter:name;//如为false,则name可能为String或者Array
      const classNames = getClassNames(currentName);
      this.data.classNames=classNames;//查询节点的时候需要用到它
      const currentDuration =isObj(duration) ? duration.enter :parseInt(duration);
      console.log("过渡enter函数:enter",classNames.enter,currentDuration);
      console.log("过渡enter函数:enter-to",classNames['enter-to']);
     
      Promise.resolve() //显著标识为promise
      .then(()=>{//1、避免设置新class产生过渡
        return this.setDataChain({
          display:false
        })
      })
      .then(()=>nextTick())
      .then(()=>//前面display:false，这里是瞬间进入enter状态
        this.setDataChain({
          status:0,
          classes: classNames.enter,
          currentDuration
        })
      )
      .then(()=>isSlide.call(this,currentName))
      .then(()=>//开启display。从enter到enter-to是需要过渡效果的
        this.setDataChain({
          inited: true,
          display:true,
        })
       )
      .then(()=>nextTick())
      .then(()=>//前面是 display:true,这里是过渡进入enter-to状态
       this.setDataChain({
        classes: classNames['enter-to'],
        status:1,
       })
      )
      .then(()=>
        setTimeout(()=> {//在一些复杂场景下,系统onTransitionEnd可能无法触发。这里手动触发
          this.onTransitionEnd();
       }, currentDuration)
      )
      .catch(()=>{})
    },
    leave() {
     if(this.data.status >=3 ) return ;//说明木有执行enter，则不执行leave。防止初始化执行或者多次执行。
      const {
        duration,
        name
      } = this.data;
      const currentName=isObj(name) ? name.leave:name;//如为false,则name可能为String或者Array
      const classNames = getClassNames(currentName);
      console.log("过渡leave函数:leave",classNames.leave);
      console.log("过渡leave函数:leave-to",classNames['leave-to']);
      const currentDuration =isObj(duration) ? duration.leave :parseInt(duration);
      Promise.resolve()//显著标识为promise
      .then(()=>this.setDataChain({
        status:3,
        classes: classNames.leave,
        currentDuration
      }))
      .then(()=>nextTick())
      .then(()=>this.setDataChain({
        classes: classNames['leave-to'],
        status:4
      }))
      .then(()=>setTimeout(()=> {
        this.onTransitionEnd();
       }, currentDuration))
      .catch(()=>{});
    },
    onTransitionEnd(event) { //小程序官方自带监听过渡动画结束。在一些复杂场景下，上述的动画方法可能并不适用。但优先使用系统的。
      // 注意，如果多个属性，执行。则会触发这个函数多次。这边节流处理
      if(this.data.throttle) return;//节流判断
      this.data.throttle=true;//开启节流

      if(this.data.show){
        this.setData({
          status:2
        });
        console.log("enter的过渡结束");
      }else{
        let {mask,retain}=this.data;
        let display=false;//一般情况不保留leave后的状态。
        if(mask == 0 || mask ==1){//针对蒙层无，或者透明的。才允许
          display=retain;
          if(retain)  console.log("保留最后状态,mask:"+mask);
        }
        this.setData({
          status:5,
          display: display
        });
        console.log("leave的过渡结束");
      }

      setTimeout(()=>{
          this.data.throttle=false;//关闭节流
      }, 100);
    },
    maskMove() {
      console.log("maskMove");
      return false;
    },
    maskTap() {
      console.log("点击了蒙层,close值为:",this.data.close);
      if(this.data.close && this.data.status>=2){
        this.data.show=false;
        this.leave();
      }
    }
  }
})