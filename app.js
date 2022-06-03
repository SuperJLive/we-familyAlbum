// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //console.log(res);
          //发起网络请求
          wx.request({
            url: this.globalData.baseUrl+'/WeApp/onLogin/'+res.code,
            success (res) {
              console.log(res.data.session_key)
              console.log(res.data.openid)
              if(res.errMsg){
                
              }
              wx.setStorageSync('sessionKey', res.data.session_key);
              wx.setStorageSync('openid', res.data.openid);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: 'http://127.0.0.1:8000'
  }
})
