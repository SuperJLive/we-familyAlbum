// pages/live/showmedia/showmedia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: [{
        "index":1,
        "filename": "mm1.jpg",
        "title": "1"
      },
      {
        "index":2,
        "filename": "mm2.jpg",
        "title": "2"
      }, {
        "index":3,
        "filename": "mm3.jpg",
        "title": "3"
      }, {
        "index":4,
        "filename": "mm4.jpg",
        "title": "4"
      }, {
        "index":5,
        "filename": "mm5.jpg",
        "title": "5"
      }, {
        "index":6,
        "filename": "mm6.jpg",
        "title": "6"
      }, {
        "index":7,
        "filename": "mm7.jpg",
        "title": "7"
      }
    ]
  },
  ShowEditMediaModal() {
    let photosA = [{
      "index":8,
      "filename": "mm8.jpg",
      "title": "8"
    }, {
      "index":9,
      "filename": "mm9.jpg",
      "title": "9"
    }, {
      "index":10,
      "filename": "mm10.jpg",
      "title": "10"
    }];
    var temp = this.data.photos.concat(photosA);
    console.log(this.data.photos);
    this.setData({
      photos : temp
    });
    console.log(this.data.photos);
  }


})