// 组件复用
/**
 * getRect:查询节点区域，节点信息
 * getIntersection:查询节点区域，节点交集
 * 
 *  
 */
export const basic = Behavior({
    methods: {
        /**
         *查询节点区域，节点信息
         * @param {string} [selector=''](required)
         * @returns {Promise}
         */
        getRect(selector = '') {
            // 默认要查询的节点信息，配置
            let defaultFields = {
                id: true,
                dataset: true,
                rect: true,
                size: true,
                scrollOffset: true,
                context: true,
                //其它properties:[]，computedStyle:[] 采用系统默认值
            }
            console.log("进入rect节点信息查询函数");
            return new Promise(resolve => {
                wx.createSelectorQuery()
                    .in(this).select(selector)
                    .fields(defaultFields)
                    .exec(rect => {
                        if (rect) {
                            resolve(rect);
                        }
                    });
            });
        },
        /**
         *查询节点区域，节点交集
         * margins参数，可以用来扩展（或收缩）参照节点布局区域的边界。选填。
         * @param {string} [targetSelector=''](required)
         * @param {*} [relativeSelectorp=''|undefined](如果不传，则相当于视窗)
         * @return {Object}[交集信息，及intersectionObserver：方便那边停止监听]
         */
        getIntersection(targetSelector = '', relativeSelector) {
            let options = {
                thresholds: [0], //一个数值数组，包含所有阈值。
                initialRatio: 0, //相交比例，达到
                observeAll: false, //是否同时观测多个目标节点,影响渲染
            }
            let defaultMargins = { //可以用来扩展（或收缩）参照节点布局区域的边界。选填。
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }

            let intersectionObserver = this.createIntersectionObserver(options);
            if (!relativeSelector) {//没有传相对节点区域：relativeSelector，则相当于视窗
                intersectionObserver.relativeToViewport(defaultMargins); //return intersectionObserver
            } else { //否则，相当于传的relativeSelector区域。这两个区域不要是相对静止的，会导致永不相见
                intersectionObserver.relativeTo(relativeSelector, defaultMargins);
            }

            return new Promise(resolve => {
                intersectionObserver.observe(targetSelector, IntersectionRect => {
                    if (IntersectionRect) {
                        IntersectionRect.intersectionObserver = intersectionObserver; //增加监听对象。返回。那边res.intersectionObserver.disconnect()调用即可
                        resolve(IntersectionRect);
                    }
                })
            })
        },
        /**
         *setData({},()=>{})改成promise，方便链式回调
         *
         * @param {*} config
         */
        setDataChain(config){
            // 注意那边使用：then(()=>this.setDataChain({}))或then(()=>{return this.setDataChain({})})
           return  new Promise(resolve=>{
                this.setData(config,()=>{
                    resolve();
                })
            });
        }


    }
});