// pages/cart/index.js
Page({
  data: {
    carData : false,
    addressInfo : {}
  },

  onLoad: function (options) {
    wx.getStorage({
      key: 'address',
      success:(res)=> {
        this.setData({
          addressInfo: res.data
        })
      }
    })
  },
  getAddress(){
    wx.chooseAddress({
      success : (res)=> {
        let obj = {
          userName: res.userName,
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo ,
          telNumber: res.telNumber
        }
        this.setData({
          addressInfo: obj
        })
        wx.setStorage({
          key: "address",
          data: this.data.addressInfo
        })
      }
    })
  }
})