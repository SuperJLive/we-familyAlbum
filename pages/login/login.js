// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: true,
  },
  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '私人小程序，家人朋友可访问', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.request({
          url: getApp().globalData.baseUrl+'/WeApp/CheckLogin/',
          method:'POST',
          data:{'openid':wx.getStorageSync('openid'),'sessionKey':wx.getStorageSync('sessionKey'),
                'rawData':res.rawData,'encryptedData':res.encryptedData,'signature':res.signature,
                'nickName':res.userInfo.nickName,'avatarUrl':res.userInfo.avatarUrl,'iv':res.iv
                },
          success (res) {
            if(res.data.success){
              wx.reLaunch({
                url: '/pages/home/home/home'
              })
            }
          }
        })
      }
    })
  },
  getUserInfo(e) {
    console.log(e);
    // 不推荐使用 getUserInfo 获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  login:function(e)
  {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})