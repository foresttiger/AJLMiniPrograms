//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputTxt: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 小区名输入
  cellnameInput:function(e){
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
  // 户型输入
  componentsInput: function (e) {
    this.setData({
      components: e.detail.value
    })
  },
  // 面积输入
  areaInput: function (e) {
    this.setData({
      area: e.detail.value
    })
  },
  // 风格输入
  styleInput: function (e) {
    this.setData({
      style: e.detail.value
    })
  },
  // 预算输入
  budgetInput: function (e) {
    this.setData({
      budget: e.detail.value
    })
  },
  // 类型输入
  typeInput: function (e) {
    this.setData({
      type: e.detail.value
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
  getQuote:function(){
    let opt = {
      cellname: this.data.cellname,
      address:this.data.address,
      components:this.data.components,
      area:this.data.area,
      style:this.data.style,
      budget:this.data.budget,
      type:this.data.type,
      name: this.data.name,
      mobilephone: this.data.mobilephone,
      date: util.formatTime(new Date())
    }
    var opts = JSON.stringify(opt);
    // wx.fetchMessage(opt);
    if (!!opt.cellname) {
      this.fetchMessage(opt)
    }else{
      wx.showModal({
        title: '提示',
        content: '没有输入小区名',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  fetchMessage: function(e){
    let _this = this;
    let opt = e;
    let options = "cellname=" + opt.cellname + "&address=" + opt.address + "&components=" + opt.components + "&area=" + opt.area + "&style=" + opt.style + "&budget=" + opt.budget + "&type=" + opt.type + "&name=" + opt.name + "&mobilephone=" + opt.mobilephone + "&date=" + opt.date;

    wx.request({
      url: 'https://miniprograms.gxajl.com/miniprograms/index.php?' + options, //仅为示例，并非真实的接口地址
      method: "post",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: '信息提交成功',
          icon: 'success',
          duration: 10000
        })
        _this.setData({
          inputTxt: ''
        })

        setTimeout(function () {
          wx.hideToast()
        }, 2000)
        console.log(res.data)
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
