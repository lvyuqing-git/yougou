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
    let { goods_id, goods_price, goods_small_logo, goods_name } = this.data.commodityInfo

    if (!this.data.commodityData[0]) {
      wx.setStorage({
        key: "commodityData",
        data: [{
          goods_id,
          goods_price,
          goods_small_logo,
          goods_name,
          goods_number: 1
        }]
      })
      this.setData({
        commodityData: [
          {
            goods_id,
            goods_price,
            goods_small_logo,
            goods_name,
            goods_number: 1
          }
        ]
      })

    } else {
      console.log('aaaaaaa')
      let exist = this.data.commodityData.some((item) => {
        item.goods_number += 1
        return item.goods_id === goods_id
      })
      if (!exist) {
        this.data.commodityData.unshift({
          goods_id,
          goods_price,
          goods_small_logo,
          goods_name
        })
      }

      wx.setStorage({
        key: "commodityData",
        data: this.data.commodityData
      })

    }

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
        console.log(res.data)
        this.setData({
          commodityData: res.data
        })
      }
    })




  }

})