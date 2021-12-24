/*
 * @Author: your name
 * @Date: 2021-12-24 23:10:47
 * @LastEditTime: 2021-12-24 23:12:56
 * @LastEditors: Please set LastEditors
 * @Description:  写一个方法实现汉字排序
 * @FilePath: \daily-topic\2021-12-24\2.js
 */
var arr = ['南京', '北京', '上海', '杭州', '深圳'];
  function sortChinese (arr) { // 参数： 排序的数组
    arr.sort(function (item1, item2) {
      return item1.localeCompare(item2, 'zh-CN');
    })
  }
sortChinese(arr)
console.log(arr)