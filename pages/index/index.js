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
    inputTxt: '',
    styles: ['中式', '现代', '美式', '欧式', '北欧', '日式'],
    objectStyles: [
      {id: 0,name: '中式'},
      {id: 1,name: '现代'},
      {id: 2,name: '美式'},
      {id: 3,name: '欧式'},
      {id: 4,name: '北欧'}, 
      {id: 5,name: '日式'}
    ],
    index: 0,
    components: ['一室一厅一厨一卫一阳台', '二室一厅一厨一卫一阳台', '二室二厅一厨一卫一阳台', '三室二厅一厨二卫一阳台', '四室二厅一厨二卫一阳台', '四室二厅一厨二卫二阳台'],
    objectComponents: [
      { id: 0, name: '一室一厅一厨一卫一阳台' },
      { id: 1, name: '二室一厅一厨一卫一阳台' },
      { id: 2, name: '二室二厅一厨一卫一阳台' },
      { id: 3, name: '三室二厅一厨二卫一阳台' },
      { id: 4, name: '四室二厅一厨二卫一阳台' },
      { id: 5, name: '四室二厅一厨二卫二阳台' }
    ],
    componentsIndex: 2,
    budget: ['3-5万', '5-10万', '10-15万', '15-20万', '20-30万', '30万以上'],
    objectBudget: [
      { id: 0, name: '3-5万' },
      { id: 1, name: '5-10万' },
      { id: 2, name: '10-15万' },
      { id: 3, name: '15-20万' },
      { id: 4, name: '20-30万' },
      { id: 5, name: '30万以上' }
    ],
    budgetIndex: 2,
     styles: ['中式', '现代', '美式', '欧式','北欧','日式'],
    objectStyles: [
      {
        id: 0,
        name: '中式'
      },
      {
        id: 1,
        name: '现代'
      },
      {
        id: 2,
        name: '美式'
      },
      {
        id: 3,
        name: '欧式'
      },
      {
        id: 4,
        name: '北欧'
      }, {
        id: 5,
        name: '日式'
      }
    ],
    items: [
      { name: 'Half', value: '半包', checked: 'true' },
      { name: 'All', value: '全包' },
    ]
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
  getQuote: function () {
    let opt = {
      cellname: this.data.cellname,
      address: this.data.address,
      components: this.data.components,
      area: this.data.area,
      style: this.data.style,
      budget: this.data.budget,
      type: this.data.type,
      name: this.data.name,
      mobilephone: this.data.mobilephone,
      date: util.formatTime(new Date())
    }
    var mobilephonereg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var namereg = /[\u4E00-\u9FA5\uF900-\uFA2D]{2,3}/;
    var opts = JSON.stringify(opt);
    switch (true) {
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
      case !namereg.test(opt.name):
        this.showMSModel("请输入您的姓名!")
        break;
      case !mobilephonereg.test(opt.mobilephone):
        this.showMSModel("请输入您的手机号码!")
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
    wx.showModal({
      title: '提示',
      content: e,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  fetchMessage: function (e) {
    let _this = this;
    let userInfo = "微信号：" + this.data.userInfo.nickName;
    let opt = e;
    let options = "cellname=" + opt.cellname + "&address=" + opt.address + "&components=" + opt.components + "&area=" + opt.area + "&style=" + opt.style + "&budget=" + opt.budget + "&type=" + opt.type + "&name=" + opt.name + "&mobilephone=" + opt.mobilephone + "&date=" + opt.date + "&other=" + userInfo;

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
  onLoad: function (e) {
    var _this = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  app.globalData.userInfo = res.userInfo
                  _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                  })
                }
              })
            },
            fail(e) {
              // wx.getSetting({
              //   success: (res) => {
              //   }
              // })
            }
          })
        } else {
          console.log("111")
        }
      }
    })
    // this.getUserInfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    // this.getUserInfo(e)
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
