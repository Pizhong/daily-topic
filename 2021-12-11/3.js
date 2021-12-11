/*
 * @file 请说说你对JS引用赋值，按值赋值的理解 
 */
/**
 * ECMAScript 变量可以包含两种不同类型的数据：原始值和引用值。原始值（primitive value）就是
最简单的数据，引用值（reference value）则是由多个值构成的对象。
 * 在通过变量把一个原始值赋值到另一个变量时，原始值会被复制到新变量的位置。
 * 在把引用值从一个变量赋给另一个变量时，存储在变量中的值也会被复制到新变量所在的位置。区
别在于，这里复制的值实际上是一个指针，它指向存储在堆内存中的对象。操作完成后，两个变量实际
上指向同一个对象，因此一个对象上面的变化会在另一个对象上反映出来.
 * 详细见《JavaScript高级程序设计（第四版）》第四章
 */