// pages/live/createalbum/createalbum.js
Page({
  data: {
    index: null,
    mediaList:new Array() ,
    picker: ['公开', '朋友', '亲人'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  mediaTypeChange(e)
  {
    if(e.detail.value) {
      this.setData({ isImage: true});
    }
    else {
      this.setData({ isImage: false});
    }
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
  ChooseMedias() {
    var tempMedia,tempMedias=new Array();
      wx.chooseMedia({
        count: 8, //默认9
        mediaType:['image', 'video'],
        sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          var isHaveCover=false;
          if(this.data.mediaList.find(c=>c.isAlbumCover)!=null)//查询是否已有封面
          {
            isHaveCover=true;
          }
          res.tempFiles.forEach(function(value,index,array){
            tempMedia ={
              url : array[index].tempFilePath,
              poster:res.type=='image'?array[index].tempFilePath:array[index].thumbTempFilePath,
              type:res.type,
              title:"",
              discription:"",
              isAlbumCover: !isHaveCover
            }
            isHaveCover=true;
            tempMedias.push(tempMedia)
          });
          this.setData({
            mediaList: this.data.mediaList.concat(tempMedias),
          })
        }
      });

      
      // wx.chooseVideo({
      //   compressed: true, 
      //   maxDuration:60,
      //   sourceType: ['album'], //从相册选择
      //   success: (res) => {
      //     tempMedia ={
      //       src : res.tempFilePath,
      //       thumbmageSrc:res.thumbTempFilePath,
      //       isImage:false
      //     }
      //       this.setData({
      //         mediaList: this.data.mediaList.concat(tempMedia)
      //       });
      //   }
      // });
    
  },
  HideEditMediaModal(e) {
    this.setData({
      modalName: null
    })
  },
  ShowEditMediaModal(e)
  {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  AlbumCover(e){
    return;
  },
  ChangeAlbumCover(e)
  {
    console.log(e);
    var tempMedia=this.data.mediaList.find(i=>i.isAlbumCover)
    if(tempMedia==null){
      this.data.mediaList[e.currentTarget.dataset.index].isAlbumCover=true;
    }
    else{
      tempMedia.isAlbumCover=false;
      this.data.mediaList[e.currentTarget.dataset.index].isAlbumCover=true;
    }
    this.setData({
      mediaList: this.data.mediaList
    });
  },
  DeleteMedia(e) {
    this.data.mediaList.splice(e.currentTarget.dataset.index, 1);
    if (this.data.mediaList.length>0)
    {
      if(this.data.mediaList.find(i=>i.isAlbumCover)==null)
      {
        this.data.mediaList[0].isAlbumCover=true;
      }
    }
    this.setData({
      mediaList: this.data.mediaList
    });
  },
  ViewMedia(e) {
    wx.previewMedia({
      sources: this.data.mediaList,
      current: e.currentTarget.dataset.index
      
    });
  }
})