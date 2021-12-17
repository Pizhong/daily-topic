/*
 * @file: 在js中如何实现顺序执行异步函数
 */

// 模拟异步
function MyRequest(p, deplay) {
  this.p = p
  this.deplay = deplay
  this.setRequest = () => {
    return new Promise(resolve => {
      setTimeout(()=> {
        resolve(this.p)
      },this.deplay)
    })
  }
}

const p1 = new MyRequest(1,1000)
const p2 = new MyRequest(2, 1500)
const p3 = new MyRequest(3, 500)

// 没处理之前 打印出 3 1 2
p1.setRequest().then(res => console.log(res))
p2.setRequest().then(res => console.log(res))
p3.setRequest().then(res => console.log(res))
// -------------------------------------------------
// 第一种方法 Promise.all()
Promise.all([p1.setRequest(),p2.setRequest(),p3.setRequest()]).then((res) => {
  console.log(res); // [1,2,3]
})
// -----------------------------------------------------
//第二种方法 async/await

async function runAsync() {
  console.log(await p1.setRequest());
  console.log(await p2.setRequest());
  console.log(await p3.setRequest());
} 

runAsync() // 1 2 3
// -------------------------------------------------------
// 第三种 链式调用then方法
function runThen() {
  return p1.setRequest().then(res => {
    console.log(res); // 1
    return p2.setRequest()
  }).then(res => {
    console.log(res); // 2
    return p3.setRequest()
  }).then(res => {
    console.log(res); // 3
  })
}
runThen()