/*
 * @file: 如何理解在js中访问变量有按值和按引用两种方式？
 */
// ECMAScript 变量可以包含两种不同类型的数据：原始值和引用值。
// 原始值（primitive value）就是最简单的数据，引用值（reference value）则是由多个值构成的对象

// 在把一个值赋给变量时，JavaScript 引擎必须确定这个值是原始值还是引用值。上一章讨论了 6 种
// 原始值：Undefined、Null、Boolean、Number、String 和 Symbol。保存原始值的变量是按值（by 
// value）访问的，因为我们操作的就是存储在变量中的实际值

// 引用值是保存在内存中的对象。与其他语言不同，JavaScript 不允许直接访问内存位置，因此也就
// 不能直接操作对象所在的内存空间。在操作对象时，实际上操作的是对该对象的引用（reference）而非
// 实际的对象本身。为此，保存引用值的变量是按引用（by reference）访问的。