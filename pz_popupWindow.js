/**
@弹窗插件
@可创建页面的广告推荐
@提供常用的窗口定位location:["right","bottom"]
@v1.0
@yangyong
@2013-11-12
*/
(function() {
  function J_PZPopupWindow(args) {
    //初始化默认参数值
    this.popupContentHeight = args.height || 200;
    this.popupWidth = args.width || 300;
    this.isCloseBtn = args.isCloseBtn || false;
    this.isScaleBtn = args.isScaleBtn || false;
    this.popupTitle = args.title || '提示信息';
    this.popupLocation = args.location || false;
    this.isHidePopupContent = args.isHide || false;
    this.htmlContent = args.loadHTML || '您难道不需要什么内容嘛？';
    //定义一个popup最外层对象
    this.popupWindow = $("<div class='J_PZPopupWindow'></div>");
    //定义一个存放内容的盒子
    this.popupContent = $("<div class='J_PZPopupContent'></div>");
    this.createPopupDOM();
    //初始化事件
    this.addEvents();
    //设置位置
    this.setPopupLocation();
    if (this.isHidePopupContent) {
      this.popupContent.hide();
    }
    this.popupContent.html(this.htmlContent);
    this.popupWindow.fadeIn(2000);
  }
  J_PZPopupWindow.prototype = {
    //设置popup的位置
    setPopupLocation: function() {
      if (this.popupLocation) {
        //获取传递过来的left值
        var left = this.initLocationValue(
            this.popupLocation[0],
            'x' /*标识一下为X轴的*/
          ),
          top = this.initLocationValue(
            this.popupLocation[1],
            'y' /*标识一下为Y轴的*/
          );
        this.popupWindow.css(left);
        this.popupWindow.css(top);
      }
    },
    //过滤location的值
    initLocationValue: function(value, e) {
      var ret;
      if (e == 'x') {
        switch (value) {
          case 'left':
            ret = { left: 0 };
            break;
          case 'right':
            ret = { right: 0 };
            break;
          case 'center':
            ret = { left: '50%', marginLeft: -this.popupWidth / 2 + 'px' };
            break;
        }
      } else if (e == 'y') {
        switch (value) {
          case 'top':
            ret = { top: 0, bottom: 'auto' };
            break;
          case 'bottom':
            ret = { bottom: 0 };
            break;
          case 'center':
            ret = {
              top: '50%',
              marginTop: -(this.popupContentHeight + 42) / 2 + 'px',
              bottom: 'auto'
            };
            break;
        }
      }
      return ret;
    },
    //绑定所有事件
    addEvents: function() {
      var _this = this;
      //绑定放大缩小和关闭按钮的事件
      if (this.isCloseBtn) {
        this.closeBtn.click(function() {
          _this.popupWindow.fadeOut(500, function() {
            //淡出之后删除DOM
            $(this).remove();
          });
        });
      }
      if (this.isScaleBtn) {
        this.scaleBtn.click(function() {
          $(this).toggleClass('scaleTo');
          _this.popupContent.slideToggle();
        });
      }
    },
    //创建popup内层DOM结构
    createPopupDOM: function() {
      this.caption = $("<div class='J_PZPopupCaption'></div>");
      this.title = $(
        "<div class='J_PZPopupTitle'>" + this.popupTitle + '</div>'
      );
      this.btnBox = $("<div class='J_PZPopupBtns'></div>");
      this.closeBtn = $("<span class='close_btn' title='关闭窗口'></span>");
      this.scaleBtn = $("<span class='scale_btn' title='展开/收缩'></span>");
      //拼接DOM
      this.caption.append(this.title, this.btnBox);
      //判断需要显示的按钮
      if (this.isCloseBtn) {
        this.btnBox.append(this.closeBtn);
      }
      if (this.isScaleBtn) {
        this.btnBox.append(this.scaleBtn);
      }
      //设置对应尺寸
      //this.popupContentHeight,this.popupWidth
      this.popupContent.height(this.popupContentHeight);
      this.popupWindow.width(this.popupWidth);
      //插入到popup
      this.popupWindow
        .append(this.caption, this.popupContent)
        .appendTo(document.body);
    }
  };
  window['J_PZPopupWindow'] = J_PZPopupWindow;
})();
