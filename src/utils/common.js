export default {
  /**
   * 深拷贝
   * @param {*} obj 原对象
   * @returns newobj 新对象
   */
  deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }
    let newobj = {}
    for (let attr in obj) {
      newobj[attr] = this.deepCopy(obj[attr])
    }
    return newobj
  },
  /**
   * 两对象深合并 branch -> master
   * @param {*} branch 分支对象
   * @param {*} master 主对象
   * 以主对象为主，当分支和主对象有冲突
   * @example
   *   let a = {a:'a'}
   *   let b = {a:'b'}
   *   deepMerge(a, b); // {a: 'b'}
   */
  deepMerge(branch, master) {
    let key
    for (key in master) {
      branch[key] = branch[key] && branch[key].toString() === "[object Object]" ? this.deepMerge(branch[key], master[key]) : branch[key] = master[key]
    }
    return branch
  },
  /**
   * 时间格式化
   * yyyy 年
   * MM 月 dd 日 hh 时 mm 分 ss 秒 S 毫秒
   * @param {*} date data对象
   * @param {*} fmt 格式
   * @example this.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   */
  formatDate(date, fmt) {
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "S": date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      }
    }
    return fmt
  },
  /**
   * 函数防抖
   * https://juejin.im/post/5a35ed25f265da431d3cc1b1
   * 概念： 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
   * 生活中的实例： 如果有人进电梯（触发事件），那电梯将在10秒钟后出发（执行事件监听器）
   *              这时如果又有人进电梯了（在10秒内再次触发该事件），我们又得等10秒再出发（重新计时）。
   * @param {*} fn 执行函数
   * @param {*} wait 等待执行时间
   * @example setInterval(debounce(fn,500),1000) // 第一次在1500ms后触发，之后每1000ms触发一次
   */
  debounce(fn, wait) {
    var timer = null
    return function () {
      var context = this
      var args = arguments
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, wait)
    }
  },
  /**
   * 函数节流
   * https://juejin.im/post/5a35ed25f265da431d3cc1b1
   * 概念： 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
   * 生活中的实例： 我们知道目前的一种说法是当 1 秒内连续播放 24 张以上的图片时，在人眼的视觉中就会形成一个连贯的动画，
   *               所以在电影的播放（以前是，现在不知道）中基本是以每秒 24 张的速度播放的，
   *               为什么不 100 张或更多是因为 24 张就可以满足人类视觉需求的时候，100 张就会显得很浪费资源。
   * @param {*} fn 执行函数
   * @param {*} gapTime 执行间隔
   * @example setInterval(throttle(fn,1000),10)
   */
  throttle(fn, gapTime) {
    let _lastTime = null
    return function () {
      let _nowTime = new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn()
        _lastTime = _nowTime
      }
    }
  },
  /**
   * 生产 uuid
   * Universally Unique IDentifier
   * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   * @param len 截取长度  由于整个uuid 太长，使用是否有必要，太占空间
   */
  uuid(len) {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0
      let v = c === 'x' ? r : (r & 0x3 | 0x8)
      return len ? v.toString(16) : 'id' + v.toString(16).slice(0, len)
    })
  },
  // 正则验证
  valid: {
    isMail(value) { // 邮箱
      let pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      return pattern.test(value)
    },
    isPhone(value) { // 手机号
      let pattern = /^1[34578]\d{9}$/
      return pattern.test(value)
    },
    isTelephone(value) { // 固定电话+手机号
      let pattern = /(^([0-9]{3,4}-)?[0-9]{7,8}$)|(^((\(\d{3}\))|(\d{3}-))?(1[34578]\d{9})$)/
      return pattern.test(value)
    },
    isFloat(value) { // 浮点型
      let pattern = /^\d+(?:\.\d{1,2})?$/
      return pattern.test(value)
    },
    isNum(value) { // 数值
      let pattern = /^\+?[1-9][0-9]*$/
      return pattern.test(value)
    },
    isDate(value) { // 日期格式
      let pattern = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
      return pattern.test(value)
    }
  }
}