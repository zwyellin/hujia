import { extendComponent } from '../../common/component';
// components/progress/progress.js
/* 
*1、这个是进度条
*
*
*
*/
extendComponent({
 /**
 *组件的属性列表
 *  @type:进度条类型
 *    目前有：1【斑马线】,1【射线】
 * 
 *  @percent 进度条数字：传字符串或者数字 
 *  非法字符串或者不在【0-100】范围的数字，或改为0
 *  
 *  @percentShow 是否显示进度条数字
 * 
 *  @progress-class 滚动条样式
 * 
 *  @active 传这个表示有动画
 * 
 * @incrementRatio 自增比例【总增量为剩余百分比的，1/ratio。所以，数字越大，总增量越小。】
 * 如果想基本没有自增，则传一个较大的数字或者传<=1的值即可(这个执行自增定时器时会判断从而不执行)。
 **/

  externalClasses: ['progress-class'],//在同一个节点上使用普通样式类和外部样式类时，两个类的优先级是未定义的，因此最好避免这种情况
  options: {
    addGlobalClass: true, //添加全局的
  },

  /**
   * 组件的属性列表
   */
  properties: {
    type:{//进度条类型：（思路）该值，会替换进度条类
      type:[Number | String],
      value:1,//默认是斑马线类型的进度条
    },
    percent:{//百分比
      type:[Number | String],
      value:0 //默认值为0
    },
    percentShow:{//是否显示进度
      type:Boolean,
      value:true,//默认显示
    },
    active:{//是否有动画
      type:Boolean,
      value:true,//默认有动画
    },
    incrementRatio:{//自增情况
      type:Number,
      value:10,//默认比例为10，最好为整数。有意义的值为>1。如果<=1，不会执行自增
    },

  },
  observers: {
    "percent":function(newVal,oldVal){//对传入的数字或者字符串进行处理
      if(newVal){
        this._clearInterval();//清除自增的计时器，执行本身的css【只要传值了，立刻清除之前的自增定时器】
        // 转换为数字
        newVal=parseInt(newVal);
        if(newVal<0 || newVal>100 || isNaN(newVal)){
          console.error("进度条，percent出错:",newVal)
          newVal=0;return;
        }
        this.setData({
          _percent:newVal,
          _active:this.data.active //如果迭代暂停，则取消active
        });

        //判断进度条类型
        this.setData({_type:'type'+this.data.type})

        // 自增部分逻辑处理
        if(newVal!== 0 && this.data.incrementRatio!==null){
          setTimeout(() => {
              console.log("进度条开始自增,incrementRatio:",this.data.incrementRatio)
              this._incrementFun(this.data.incrementRatio);
          }, 800);//css动画时间1s，为了更顺滑，这里0.8s
        }
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    _type:null,//进度条类型对应的类名
    _percent:null,//进度数字，置为显示的数字及滚动条的长度
    _active:null,//是否有动画
    incrementTimer:null,//自增计时器
  },

  lifetimes: {       //生命周期函数，可以为函数，或一个在methods段中定义的方法名
    created(){},
    attached(){},
    ready(){
      setTimeout(()=> {
        this.getIntersection("#xx").then(res=>{
          console.log("view视图",res);
          res.intersectionObserver.disconnect();
          console.log("视图 关闭");
        })
        this.getRect('#xx').then(res=>{
          console.log("xx node:",res);
        })
      }, 5000);
     
    },
    moved(){},
    detached(){this._clearInterval();console.log("组件销毁")}//清除计时器
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {},
    hide() {this._clearInterval();}//清除计时器
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _incrementFun(ratio){
      let value=parseFloat(this.data._percent);//进度条现在的进度
      let surplusValue=(100-value)/ratio;//取剩余百分比的1/5，然后底下要做的就是总增加量趋向于它
      surplusValue=Math.round(surplusValue * 100) / 100;//避免小数点位数太多，影响渲染，保存两位
      //再对 surplusValue进行趋近处理
      let addValue=0;
      let nextValue;//要更新的值
      // 内部函数，闭包
      let _add=()=>{
        addValue=Math.round(surplusValue/ratio * 100) / 100;//避免小数点位数太多，影响渲染，保存两位
        surplusValue=surplusValue-addValue;//总趋向量还有多少。迭代再趋向
        // 浮点数，会出现很多位。正则表达式格式化
        let reg= /^(0|[1-9](\d+)(\.\d{1,2})?)/;//0[.11] 或10[.22]
        nextValue=this.data._percent+addValue;
        // 内部终止
        if(nextValue>=100 || surplusValue<1){//自增过头了，或者剩余迭代的值较小时则终止迭代
          this._clearInterval();
          return;
        }
        let regArr=nextValue.toString().match(reg);
        nextValue=parseFloat(regArr[0]);//强制保留两位
        console.log("进度条自增执行:regArr",regArr);
        this.setData({
          _percent:nextValue
        })
      }
      // 迭代
      this.data.incrementTimer=setInterval(()=>{
        _add();
      },800);//css动画时间1s，为了更顺滑，这里0.8s
    },

    /**
     *终止计时器，这个函数只是为了捕捉这个事件
     */
    _clearInterval(){
      if(this.data.incrementTimer){
        clearInterval(this.data.incrementTimer);
        this.data.incrementTimer=null;
        console.log("进度条自增迭代终止");
        this.setData({
          _active:false //如果迭代暂停，则取消active
        });
      }
    }
  
  }
})
