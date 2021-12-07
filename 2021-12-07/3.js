/** 
 * @file: 请手动实现Array.prototype.reduce的方法
*/

// 参数： 一个回调函数，一个初始化参数 (非必须)
// 回调函数参数有 4 个值(res: 代表累加值，cur: 目前值，index: 第几个，arr 调用 reduce 的数组)
// 整体返回 res 累加值
Array.prototype.myReduce = function(cb, initValue) {
  if (!Array.isArray(this)) {
    throw new TypeError("not a array")
  }
  // 数组为空，并且有初始值，报错
  if (this.length === 0 && arguments.length < 2) {
    throw new TypeError('Reduce of empty array with no initial value')
  }
  let arr = this
  let res = null
  // 判断有没有初始值
  if (arguments.length > 1) {
    res = initValue
  } else {
    res = arr.splice(0,1)[0] //没有就取第一个值
  }
  arr.forEach((item, index) => {
    res = cb(res, item, index, arr) // cb 每次执行完都会返回一个新的 res值，覆盖之前的 res
  })
  return res
};

// 测试结果
let arr = [1,2,3,4]
let result = arr.myReduce((res, cur) => {
  return res + cur
})
console.log(result) // 10
