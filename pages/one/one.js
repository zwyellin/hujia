// pages/one/one.js
import {isObj,isArray} from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',

    show1:false,

    show:false,
    mask:'2',
    position:'center',
    retain:false,
    customClass:'trans0',
    nameArr:[],
    classIndex:0,//外部类
  },
  onLoad(){
    wx.showLoading({
      title: 'loading...',
      mask: true
    });
    setTimeout(()=> {
     
     this.setData({show1:true},()=>{
       setTimeout(function() {
        wx.hideLoading();
       }, 100);
    
     });
    }, 1000);
  },
  transitionTap(event){
    let {name,mask,position,retain,trclass,classindex}=event.target.dataset;
    console.log("name",name,isObj(name));
    if(isObj(name)){
      this.data.nameArr=name;
    }
    else{
      if(name){
        this.data.nameArr.push(name);
      }
    }
    console.log("nameArr",this.data.nameArr);
    this.data.mask=mask || this.data.mask;
    this.data.position=position || this.data.position;
    this.data.retain=retain || this.data.retain;
    this.data.customClass=trclass || this.data.customClass;
    this.data.classIndex=classindex || this.data.classIndex;
    console.log("classindex",this.data.classIndex);
  },
  caozuo(event){
    let {id}=event.target.dataset;
    console.log("id",id);
    if(id == 0){//开始
      let {nameArr,mask,position,retain,customClass,classIndex}=this.data;
      console.log("配置项：",this.data);
      this.setData({
        nameArr,
        mask,
        position,
        retain,
        customClass,
        show:true,
        classIndex
      },()=>{
        setTimeout(()=> {
          this.setData({
            show:false
          })
        },3000);
      })
    }
    else{//清除
      this.setData({
        name:'',
        show:false,
        mask:'2',
        position:'center',
        retain:false,
        customClass:'trans0',
        nameArr:[],
      })
    }
  }

})