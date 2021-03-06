class Drawing{
  constructor (default_arr) {//初始化
      this._data = default_arr;
      this._text_data = [];//记录文字的位置及内容
      this.update_text_group = document.getElementById('update-text-group');
      this.update_input = document.getElementById('update_input');
      this.update_btn = document.getElementById('update_btn');
      this._x_spacing = 200;//x坐标间距
      this._y_spacing = 30;//y坐标间距
      this._text_widht = 46;//文字占用宽度
      this._text_height = 20;//文字占用高度
      
      let that = this
      let c = document.getElementById("canvas");
      this.ctx = c.getContext("2d");
     
      this._init();
      
      c.addEventListener('click', function(e){//添加点击事件
          that.update_text_group.style.top = '-100px';
          // console.log(that._text_data);
          let p = that._getEventPosition(e);//获取点击位置x，y
          for(let i=0; i<that._text_data.length; i++){//文字数据循环,看是否为点击的文字
              let this_data = that._text_data[i];
              let this_x = this_data.x;
              let this_y = this_data.y - (that._text_height/2);
              // console.log(this_x, this_x + that._text_widht, this_y, this_y + that._text_height);
              if (p.x >= this_x && p.x <= this_x + that._text_widht && p.y >= this_y && p.y <= this_y + that._text_height){//在文字的范围内
                  that.update_text_group.style.left = p.x+'px';
                  that.update_text_group.style.top = p.y+'px';
                  that.update_input.value = this_data.title;
                  that.update_btn.setAttribute('data-key', this_data.key);
                  return false;
              }
          }
      }, false);
      this.update_btn.onclick = function(){
          that.update_text_group.style.top = '-100px';//隐藏编辑框
          that._clear();//清空画布
          
          let text = that.update_input.value;
          let key = that.update_btn.getAttribute('data-key');
          let key_arr = key.split(',');
          let this_data = null;
          
          for(let i = 0; i < key_arr.length; i++){
              this_data = this_data ? this_data.data[key_arr[i]] : that._data.data[key_arr[i]];
          }
          this_data['title'] = text;//修改数据
          that._init();//从新画图
      }
  }
  
  _getEventPosition (ev){//获取鼠标点击位置x，y
      var x, y;
      if (ev.layerX || ev.layerX == 0) {
      x = ev.layerX;
      y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
      }
      return {x: x, y: y};
  }
  
  _clear(){//清空画布
      this.ctx.clearRect(0,0,980,600);
  }
  _init(){
      //数据初始化
      if (this._data && this._data.data){
          let x = 70;//文字x坐标位置
          let y = 70;//文字y坐标位置
          let x_1 = x + this._x_spacing + this._text_widht;//文字x坐标位置
          let y_1 = y;//文字y坐标位置
          let x_2 = x_1 + this._x_spacing + this._text_widht;//文字x坐标位置
          let y_2 = y;//文字y坐标位置
          for(let i = 0; i < this._data.data.length; i++){//数据循环并画图
              let this_data = this._data.data[i];
              if(this_data && this_data.title){
                  this._add_project(this_data.title, x, y, 1, 0, 0);//写入文字并画圆圈
                  this._text_data.push({
                      x: x, y: y, key:i, title: this_data.title
                  })
                  if(this_data.data){// 第二列
                      for(let i_1 = 0; i_1 < this_data.data.length; i_1++){
                          let this_data_1 = this_data.data[i_1];
                          if(this_data_1 && this_data_1.title){
                              this._add_project(this_data_1.title, x_1, y_1, 2, x, y);//写入文字
                              this._text_data.push({
                                  x: x_1, y: y_1, key:i+','+i_1, title: this_data_1.title
                              })
                              if(this_data_1.data){// 第三列
                                  for(let i_2 = 0; i_2 < this_data_1.data.length; i_2++){
                                      let this_data_2 = this_data_1.data[i_2];
                                      if(this_data_2 && this_data_2.title){
                                          this._add_project(this_data_2.title, x_2, y_2, 3, x_1, y_1);//写入文字
                                          this._text_data.push({
                                              x: x_2, y: y_2, key:i+','+i_1+','+i_2, title: this_data_2.title
                                          })
                                          y_2 += this._y_spacing + this._text_height
                                      }
                                  }
                              }
                              y_1 += this._y_spacing + this._text_height
                          }
                      }
                      y += this._y_spacing + this._text_height
                  }
                  
              }
          }
      }
  }
  _add_project(text, x, y, idx, start_x, start_y){
      this._add_text(text, x, y);//写入文字
      
      x = idx ==3 ? x-10 : x+this._text_widht;//获取到圆点的位置
      start_x = start_x+this._text_widht;//获取到圆点的位置
      this._add_circular(x, y, 4);//添加圆点
      if (start_x>0 && start_y){//存在划线的起始点
          if(start_y == y){//高度一致画直线
              this._add_straight_line(start_x, start_y, x, y);   
          }else{//高度不一致画曲线
              this._add_curve(start_x, start_y, x, y);
          }
           
      }
  }
  
  _add_text (text, x, y){//添加文字
      // 设置字体
      this.ctx.font = "12pt bold 黑体";
      // 设置颜色
      this.ctx.fillStyle = "#000";
      // 设置水平对齐方式
      this.ctx.textAlign = "left";
      // 设置垂直对齐方式
      this.ctx.textBaseline = "middle";
      // 绘制文字（参数：要写的字，x坐标，y坐标）
      this.ctx.fillText(text, x, y);
  }
  
  _add_circular (x, y, r){//添加圆形
      // this.ctx.lineWidth = 3
      this.ctx.strokeStyle = "#005588" //边的颜色
      this.ctx.beginPath();
      this.ctx.arc(x,y,r,0,2*Math.PI);//设置圆的属性
      this.ctx.stroke();//进行绘制
  }
  
  _add_straight_line (x1, y1, x2, y2){//添加直线
      this.ctx.moveTo (x1,y1);       //设置起点状态
      this.ctx.lineTo (x2,y2);       //设置末端状态
      this.ctx.lineWidth = 1;          //设置线宽状态
      this.ctx.strokeStyle = "#eee" ;  //设置线的颜色状态
      this.ctx.stroke();               //进行绘制
  }
  
  _add_curve (x1, y1, x2, y2){//添加曲线
      let control_x = x1+50;
      let control_y = y1>y2 ? y2-10 : y2+10;
  
      this.ctx.strokeStyle = '#eee';
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.quadraticCurveTo(control_x, control_y, x2, y2);
      this.ctx.stroke();
  }
}