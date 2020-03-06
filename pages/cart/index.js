// pages/cart/index.js
Page({
  data: {
    carData : false,
    addressInfo : {},
    commodityData : [],
    total : 0
  },
  onLoad: function (options) {
    //获取地址信息
    wx.getStorage({
      key: 'address',
      success:(res)=> {
        this.setData({
          addressInfo: res.data
        })
      }
    })
    //获取商品列表
    wx.getStorage({
      key: 'commodityData',
      success: (res) => {
        this.setData({
          commodityData: res.data
        })
        this.calculateTotal()
      }
    })
  },
  //计算总价格
  calculateTotal(){
    let total = 0
    this.data.commodityData.forEach((item) => {
      total += item.goods_price * item.goods_number
    })
    console.log(total)
    this.setData({
      total
    })
  },
  //添加地址
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
  },
  //操作数量
  calculate(e){
    let { number,index } = e.target.dataset
    this.data.commodityData[index].goods_number += number
    if (this.data.commodityData[index].goods_number <= 0){
      wx.showModal({
        title: '提示',
        content: '是否删除该商品',
        success:(res)=> {
          if (res.confirm) {
            this.data.commodityData.splice(index,1)
          } else if (res.cancel) {
            this.data.commodityData[index].goods_number += 1
          }
          this.setData({
            commodityData: this.data.commodityData
          })
          wx.setStorage({
            key: "commodityData",
            data: this.data.commodityData
          })
        }
      })
      
    }
    this.calculateTotal()
    this.setData({
      commodityData: this.data.commodityData
    })
    wx.setStorage({
      key: "commodityData",
      data: this.data.commodityData
    })
  }
})