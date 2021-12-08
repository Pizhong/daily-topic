/*
 * @file: 手动实现一个compose函数 
 */


// compose函数 就是一个组合函数，常用来依次执行一系列的任务（函数）

// ES5
function compose(){
  var args = arguments;
  var start = args.length - 1;
  return function(){
      var i = start;
      var result = args[i].apply(this,arguments);
      while(i--) result = args[i].call(this,result);
      return result;
  }  
}

// redux实现
const reduxCompose = (...func) => {
  const len = func.length;
  if (len === 0) {
    return (arg) => arg;
  }
  if (len === 1) {
    return func[0];
  }
  return func.reduce((a, b) => (...args) => a(b(...args)));
};

function aa() {
  console.log(11);
}

function bb() {
  console.log(22);
}
function cc() {
  console.log(33);
  return 33
}

compose(aa,bb,cc)()
reduxCompose(aa,bb,cc)()