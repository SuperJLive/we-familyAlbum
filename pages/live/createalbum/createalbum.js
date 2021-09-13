// pages/live/createalbum/createalbum.js
Page({
  data: {
    index: null,
    mediaList: [],
    picker: ['公开', '朋友', '亲人'],
    isImage:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  uploadMedias(e) {
    console.log(e);
    var that = this,
      type = e.currentTarget.dataset.type,
      maxUploadLen = that.data.maxUploadLen;
    if (type == 'image') {
      upFiles.chooseImage(that, maxUploadLen);
    } else if (type == 'video') {
      upFiles.chooseVideo(that, maxUploadLen);
    }
  },
  chooseMedias() {
    if(this.data.isImage)
    {
      console.log(111);
    }
    else
    {
      console.log(111);
    }
    
    wx.chooseImage({
      count: 8, //默认9
      sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.mediaList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  }
})