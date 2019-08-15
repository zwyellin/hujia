const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isObj(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function isNumber(value) {
  return /^\d+$/.test(value);
}

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 *类型判断
 * @param {*} value
 */
function type(value){
    let mapTolower={};
    // 生成mapTolower映射,底下访问获得转换后的值
    "Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").forEach(item=>{
      mapTolower["[object " + item + "]"] = item.toLowerCase();
    })

    if (value == null) {//null or undefined（兼容ie写法）
        return value + "";
    }
    return typeof value === "object" || typeof value === "function" ?
    mapTolower[Object.prototype.toString.call(value)] || "object" :
    typeof value;
}





/**
 *防抖函数
 *最后触发后的 ns 后执行
 * @param {*} callback
 * @param {number} [delay=300]
 */
function debounce(callback, delay = 300) {
  let timer = null;

  function clearTimer() {
    clearTimeout(timer);
    timer = null;
  }
  return function (args) {
    clearTimer();
    timer = setTimeout(() => callback(args, "节流"), delay);
    return timer;
  }
}

/**
 *节流函数
 *  ns 内只会触发一次
 * @param {*} callback
 * @param {number} [delay=300]
 * @param {boolean} [immediate=false](是否立即执行)
 * @param {boolean} [debounceMode=true](是否防抖：保证最后一个触发，能执行函数，使其更精确)
 * 思路：节流+防抖
 * 细节优化：节流区域的第一个触发，这边节流触发，阻止防抖触发。避免，其如果是最后触发，导致的两边都执行了函数
 */
function throttle(callback, delay = 300, immediate = false, debounceMode = true) {
  let timer = null; //节流计时器
  const debounceFun = debounce(callback, delay);
  let timer1 = null; //防抖计时器

  function clearTimer() {
    clearTimeout(timer);
    timer = null;
  }
  return function (args) {
    if (debounceMode) {
      timer1 = debounceFun(args)
    };
    if (!timer) {
      if (immediate) {
        callback(args);
        timer = setTimeout(() => clearTimer(), delay);
      } else {
        timer = setTimeout(() => {
          callback(args);
          clearTimer();
        }, delay);
      }
      // 阻止防抖再次执行
      clearTimeout(timer1);
    }
    return timer;
  }
}

/**
 * 去除字符串空格
 * @param {*} str
 * @param {boolean} [all=false](是否中间的空白也要移除)
 */
function trim(str, all = false) {
  if (all) return str.replace(/\s+/g, "");
  else return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 生成随机码(数字，字母，符号，中文。或组合)
 * @param {string} [str='0'](代表需要哪些字符集合)
 * @param {*} [length](要返回字符串的最小长度)
 * @param {*} [maxLength](可选,要返回字符串的最大长度
 */
function randomChars(str = '0',length,maxLength) {
  //简陋版： Math.random().toString(count).substring(2); //count为多少进制，2(0~1)~36(0~9,a~z,A~Z)，
  //缺点：1、random随机数，位数越短。转化后字符越雷同；
  //2、只能是数字、小写字母、大写字母
  
  //这边采用：String.fromCharCode();Unicode码
  if (typeof str == 'string') {
    // str=trim(str);//去除首尾空白，中间空白会保留
    let a = false;
    let A = false;
    let num = false;
    let char = false;//ascii码对应的其它字符
    let chinese=false;//中文：4E00-9FA5:即19968~40869

    let randomLength=maxLength ? Math.floor((Math.random() * (maxLength-length)) + length):length;//要返回的字符串长度 
    let newStr = "";
    //分析字符串，从而判断需要哪种类型或混合的字符串
    function dissect() {
      let asciiIndex;
      [...str].forEach(item => {
        asciiIndex = item.charCodeAt();
        if (asciiIndex >= 48 && asciiIndex <= 57) num = true; //数字
        else if (asciiIndex >= 65 && asciiIndex <= 90) A = true; //大写字母
        else if (asciiIndex >= 97 && asciiIndex <= 122) a = true; //小写字母
        else if (asciiIndex >= 33 && asciiIndex <= 126) char = true; //ascii码，其它可显示的字符 ，32是空格。不需要取33
        else if(asciiIndex >= 19968 && asciiIndex <= 40869) chinese=true;//汉字
      });
    }
    // 根据规则，返回单个符合该规则的字符
    function createOneChar() {
      let arr = [];
 
      if (num) arr.push(String.fromCharCode(Math.floor((Math.random() * 9) + 48)));
      if (A) arr.push(String.fromCharCode(Math.floor((Math.random() * 25) + 65)));
      if (a) arr.push(String.fromCharCode(Math.floor((Math.random() * 25) + 97)));
      if (char) arr.push(String.fromCharCode(Math.floor((Math.random() * 94) + 33))); //32是空格。不需要取33
      if (chinese) arr.push(String.fromCharCode(Math.floor((Math.random() * 20901) + 19968))); 

      // 返回随机字符
      if(arr.length>0) return arr[Math.floor((Math.random() * arr.length))];
      else return "";
    }
    // 开始
    dissect();
    for (let i = 0; i < randomLength; i++) {
      newStr += createOneChar();
    }
    return newStr;
  }
}



module.exports = {
  formatTime,
  isObj,
  isNumber,
  isArray,
  debounce,
  throttle,
  randomChars
}