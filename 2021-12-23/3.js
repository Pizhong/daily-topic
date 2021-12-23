/*
 * @Author: your name
 * @Date: 2021-12-23 22:57:40
 * @LastEditTime: 2021-12-23 22:57:40
 * @LastEditors: Please set LastEditors
 * @Description: 写一个js方法隐藏手机中间4位
 * @FilePath: \daily-topic\2021-12-23\3.js
 */
// 1、正则
function geTel(tel){
  var reg = /^(\d{3})\d{4}(\d{4})$/;  
  return tel.replace(reg, "$1****$2");
}
//测试
var tel = "17326453333"; 
console.log(geTel(tel));//173****3333
// 2、通过长度截取
function geTel(tel){
  return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
}
//测试
var tel = "17326453333"; 
console.log(geTel(tel));//173****3333
