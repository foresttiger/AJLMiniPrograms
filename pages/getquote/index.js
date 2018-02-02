//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    options:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputTxt: '',
    styles: ['中式', '现代', '美式', '欧式', '北欧', '日式'],
    objectStyles: [
      { id: 0, name: '中式' },
      { id: 1, name: '现代' },
      { id: 2, name: '美式' },
      { id: 3, name: '欧式' },
      { id: 4, name: '北欧' },
      { id: 5, name: '日式' }
    ],
    index: 0,
    component: ['一室一厅一厨一卫一阳台', '二室一厅一厨一卫一阳台', '二室二厅一厨一卫一阳台', '三室二厅一厨二卫一阳台', '四室二厅一厨二卫一阳台', '四室二厅一厨二卫二阳台'],
    objectComponent: [
      { id: 0, name: '一室一厅一厨一卫一阳台' },
      { id: 1, name: '二室一厅一厨一卫一阳台' },
      { id: 2, name: '二室二厅一厨一卫一阳台' },
      { id: 3, name: '三室二厅一厨二卫一阳台' },
      { id: 4, name: '四室二厅一厨二卫一阳台' },
      { id: 5, name: '四室二厅一厨二卫二阳台' }
    ],
    componentIndex: 2,
    budgets: ['3-5万', '5-10万', '10-15万', '15-20万', '20-30万', '30万以上'],
    objectBudgets: [
      { id: 0, name: '3-5万' },
      { id: 1, name: '5-10万' },
      { id: 2, name: '10-15万' },
      { id: 3, name: '15-20万' },
      { id: 4, name: '20-30万' },
      { id: 5, name: '30万以上' }
    ],
    budgetsIndex: 2,
    styles: ['中式', '现代', '美式', '欧式', '北欧', '日式'],
    objectStyles: [{id: 0,name: '中式'},
      {id: 1,name: '现代'},
      {id: 2,name: '美式'},
      {id: 3,name: '欧式'},
      {id: 4,name: '北欧'}, 
      {id: 5,name: '日式'}
    ],
    stylesIndex:1,
    typeItems:['半包',"全包"],
    items: [
      { name: '0', value: '半包', checked: 'true' },
      { name: '1', value: '全包' },
    ],
    typeIndex:1
  },
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    });
    this.setData({
      other: "微信号：" + options.userInfo
    })
    console.log(this.data.other);
  },
  // 监听户型
  bindComponentChange:function(e){
    this.setData({
      componentIndex: e.detail.value,
      components: this.data.component[e.detail.value]
    })
  },
  // 监听风格
  bindStylesChange: function (e) {
    this.setData({
      stylesIndex: e.detail.value,
      style: this.data.styles[e.detail.value]
    })
  },
  // 预算
  bindBudgetChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      budgetsIndex: e.detail.value,
      budget: this.data.budgets[e.detail.value]
    })
  },
  // 装修类型
  radioChange: function (e) {
    this.setData({ 
      // type: this.data.typeItems[e.detail.value]
       type: this.data.typeItems[e.detail.value]
      })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  // 小区名输入
  cellnameInput: function (e) {
    this.setData({
      cellname: e.detail.value
    })
  },
  // 地址输入
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  // 面积输入
  areaInput: function (e) {
    this.setData({
      area: e.detail.value
    })
  },
  // 联系人输入
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 手机号输入
  mobilephoneInput: function (e) {
    this.setData({
      mobilephone: e.detail.value
    })
  },
  getQuote: function () {
    let opt = {
      cellname: this.data.cellname,
      address: this.data.address,
      components: this.data.component[this.data.componentIndex],
      area: this.data.area,
      style: this.data.styles[this.data.stylesIndex],
      budget: this.data.budgets[this.data.budgetsIndex],
      type: this.data.typeItems[this.data.typeIndex],
      name: this.data.name,
      mobilephone: this.data.mobilephone,
      date: util.formatTime(new Date()),
      other:this.data.other
    }
    var mobilephonereg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var namereg = /[\u4E00-\u9FA5\uF900-\uFA2D]{2,3}/;
    var opts = JSON.stringify(opt);
    switch (true) {
      case !namereg.test(opt.name):
        this.showMSModel("请输入您的姓名!")
        break;
      case !mobilephonereg.test(opt.mobilephone):
        this.showMSModel("请输入您的手机号码!")
        break;
      case !!!opt.cellname:
        this.showMSModel("请输入小区名!")
        break;
      case !!!opt.address:
        this.showMSModel("请输入小区所在地址!")
        break;
      case !!!opt.components:
        this.showMSModel("请输入您的户型!")
        break;
      case !!!opt.area:
        this.showMSModel("请输入房屋建筑面积!")
        break;
      case !!!opt.style:
        this.showMSModel("请输入喜欢的装修风格!")
        break;
      case !!!opt.budget:
        this.showMSModel("请输入装修预算!")
        break;
      case !!!opt.type:
        this.showMSModel("请输入装修类型，半包？全包？")
        break;
      default:
        wx.showToast({
          title: '提交中...',
          icon: 'loading',
          duration: 10000
        })
        this.fetchMessage(opt)
        break;
    }



  },
  showMSModel: function (e) {
    var c = e;
    if(e == "success"){
      c = "信息提交成功咯，我们将很快联系您！";
    }
    wx.showModal({
      title: '提示',
      content: c,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

        }
        if (e == "success"){
          wx.navigateTo({
            url: '../index/index'
          })
        }
      }
    })
  },
  fetchMessage: function (e) {
    let _this = this;
    // let userInfo = "微信号：" + this.data.userInfo.nickName;
    let opt = e;
    // Object.assign(opt, { "other":userInfo})
    // let options = "cellname=" + opt.cellname + "&address=" + opt.address + "&components=" + opt.components + "&area=" + opt.area + "&style=" + opt.style + "&budget=" + opt.budget + "&type=" + opt.type + "&name=" + opt.name + "&mobilephone=" + opt.mobilephone + "&date=" + opt.date + "&other=" + userInfo;

    wx.request({
      url: 'https://miniprograms.gxajl.com/miniprograms/index.php', //仅为示例，并非真实的接口地址
      method: "post",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:opt,
      success: function (res) {
        // wx.showToast({
        //   title: '信息提交成功',
        //   icon: 'success',
        //   duration: 10000
        // })
        wx.hideToast()
        _this.showMSModel("success")
        _this.setData({
          inputTxt: ''
        })
        console.log(res.data)
      },
      fail:function (e) {
        console.log(e);
      }

    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }
})
