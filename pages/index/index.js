const util = require('../../utils/util.js')
const app = getApp()
Page({
  bindViewTap: function () {
    wx.navigateTo({
      url: "../getquote/index?userInfo=" + this.data.userInfo.nickName
    })
    // url = "../navigator/navigator?title=我是navigate"
  },
    onLoad: function (e) {
      wx.showShareMenu({
        withShareTicket: true
      });
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
});