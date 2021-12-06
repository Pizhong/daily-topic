/** 
 * @file: 使用js写个方法计算5000年内有多少个对称日，如：20211202，反过来也是一样 
*/

function getSymmetricalNum(year) {
  const arr = [];
  for (let i = 0; i < year; i++) {
    for (let j = 0; j < year; j++) {
      if (
        String(i)[0] === String(j)[3] &&
        String(i)[1] === String(j)[2] &&
        String(i)[2] === String(j)[1] &&
        String(i)[3] === String(j)[0]
      ) {
        if (Number(String(j)[0] + String(j)[1]) <= 12) {
          if (Number(String(j)[2] + String(j)[3]) <= 31) {
            arr[arr.length] = String(i) + String(j);
          }
        }
      }
    }
  }
  return arr.length
}
console.log(getSymmetricalNum(5000)); // 39