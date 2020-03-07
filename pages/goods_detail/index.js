import request from '../../utils/request.js'
Page({
  data: {
    commodityInfo: {},
    urls: [],
    id: '',
    commodityData: []
  },
  previewImage(e) {
    let { index } = e.currentTarget.dataset

    wx.previewImage({
      current: this.data.urls[index], // 当前显示图片的http链接
      urls: this.data.urls // 需要预览的图片http链接列表
    })
  },
  addCar() {
    // let { goods_id, goods_price, goods_small_logo, goods_name } = this.data.commodityInfo
    // if (!this.data.commodityData[0]) {
    //   wx.setStorage({
    //     key: "commodityData",
    //     data: [{
    //       goods_id,
    //       goods_price,
    //       goods_small_logo,
    //       goods_name,
    //       goods_number: 1,
    //       isShow : true
    //     }]
    //   })
    //   wx.showToast({
    //     title: '加入购物车',
    //     icon: 'success',
    //   })
    //   this.setData({
    //     commodityData: [
    //       {
    //         goods_id,
    //         goods_price,
    //         goods_small_logo,
    //         goods_name,
    //         goods_number: 1,
    //         isShow: true
    //       }
    //     ]
    //   })
    // } else {
    //   let exist = this.data.commodityData.some((item) => {
    //     if (item.goods_id === goods_id){
    //       wx.showToast({
    //         title: '+1',
    //         icon: 'success',
    //       })
    //       item.goods_number += 1
    //     }
    //     return item.goods_id === goods_id
    //   })
    //   if (!exist) {
    //     wx.showToast({
    //       title: '加入购物车',
    //       icon: 'success',
    //     })
    //     this.data.commodityData.unshift({
    //       goods_id,
    //       goods_price,
    //       goods_small_logo,
    //       goods_name,
    //       goods_number: 1,
    //       isShow: true
    //     })
    //   }
    //   wx.setStorage({
    //     key: "commodityData",
    //     data: this.data.commodityData
    //   })
    // }
    let { goods_id, goods_price, goods_small_logo, goods_name } = this.data.commodityInfo
    let arr = wx.getStorageSync("commodityData") || []
    let exit = arr.some((item) => {
      if (item.goods_id == goods_id) {
        item.goods_number += 1
        wx.showToast({
          title: '+1',
          icon: 'success',
        })
      }
      return item.goods_id == goods_id
    })
    if (!exit) {
      wx.showToast({
          title: '加入成功',
          icon: 'success',
        })
      arr.push({
        goods_id,
        goods_price,
        goods_small_logo,
        goods_name,
        goods_number: 1,
        isShow: true
      })
    }

    wx.setStorageSync("commodityData", arr)
  },
  onLoad: function (options) {
    this.setData({
      id: options.goods_id
    })
    request({
      url: '/api/public/v1/goods/detail',
      data: {
        goods_id: options.goods_id
      }
    }).then((res) => {
      const { message } = res.data
      let arr = message.pics.map((item) => {
        return item.pics_big
      })
      this.setData({
        commodityInfo: message,
        urls: arr
      })
    })
    wx.getStorage({
      key: 'commodityData',
      success: (res) => {
        this.setData({
          commodityData: res.data
        })
      }
    })




  }

})