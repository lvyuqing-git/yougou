// pages/cart/index.js
import request from '../../utils/request.js'
Page({
  data: {
    carData: false,
    addressInfo: {},
    commodityData: [],
    total: 0,
    isAllShow: true,
    getNumber: 0,
    userDetail: {
      code: ''
    },
    token: ''
  },
  //结算
  pay() {

  },
  //获取订单信息
  getOrderInfo() {
    let arr = this.data.commodityData.map((i) => {
      if (i.isShow) {
        return {
          goods_id: i.goods_id,
          goods_number: i.goods_number,
          goods_price: i.goods_price,
        }
      }
    })
    request({
      url: '/api/public/v1/my/orders/create',
      method: "POST",
      header: {
        Authorization: this.data.token
      },
      data: {
        order_price: this.data.total,
        consignee_addr: wx.getStorageSync("address").address,
        goods: arr
      }
    })
      .then((res) => {
        let arr = this.data.commodityData.map((i) => {
          if (i.isShow) {
            return {
              goods_id: i.goods_id,
              goods_number: i.goods_number,
              goods_price: i.goods_price,
              goods_small_logo: i.goods_small_logo,
              goods_name: i.goods_name,
            }
          }
        })
        let orderInfo = wx.getStorageSync("orderInfo") || []
        orderInfo.push({ arr: arr, order_number: res.data.message.order_number, total: this.data.total })
        wx.setStorageSync("orderInfo", orderInfo)
      })
  },

  bindgetuserinfo(res) {
    if (!wx.getStorageSync("address")) {
      wx.showToast({
        title: '请先选择地址',
        icon: 'error',
      })
      return
    }
    let { detail } = res
    this.data.userDetail = detail
    wx.login({
      success: (res) => {
        if (!wx.getStorageSync("token")) {
          this.data.userDetail.code = res.code
          delete this.data.userDetail.errMsg
          delete this.data.userDetail.userInfo 
          delete this.data.userDetail.cloudID
          this.setData({
            userDetail: this.data.userDetail
          })
          request({
            url: '/api/public/v1/users/wxlogin',
            method: 'POST',
            data: this.data.userDetail,
          }).then((res) => {
            this.setData({
              token: res.data.message.token
            })
            wx.setStorageSync("token", res.data.message.token)
            this.getOrderInfo()
            wx.navigateTo({
              url: '../order_enter/index',
            })
          }).catch((res) => {
              console.log(res)
            })


        } else {
          this.getOrderInfo()
          wx.navigateTo({
            url: '../order_enter/index',
          })
        }

      }
    })


  },
  //输入框失去焦点
  inputBlur(e) {
    let { value } = e.detail
    let { index } = e.target.dataset
    this.data.commodityData[index].goods_number = value
    this.setData({
      commodityData: this.data.commodityData
    })
    this.calculateTotal()
    wx.setStorage({
      key: "commodityData",
      data: this.data.commodityData
    })

  },
  onLoad: function (options) {
    //获取地址信息
    wx.getStorage({
      key: 'address',
      success: (res) => {
        this.setData({
          addressInfo: res.data
        })
      }
    })
    wx.getStorage({
      key: 'isAllShow',
      success: (res) => {
        this.setData({
          isAllShow: res.data
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
  onShow() {
    wx.getStorage({
      key: 'commodityData',
      success: (res) => {
        this.setData({
          commodityData: res.data
        })
        this.calculateTotal()
      }
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        number: (wx.getStorageSync("commodityData") || []).length,
        selected: 2
      })
    }
  },

  //计算总价格
  calculateTotal() {
    let total = 0
    let getNumber = 0
    this.data.commodityData.forEach((item) => {
      if (item.isShow) {
        getNumber += 1
        total += item.goods_price * item.goods_number
      }
    })
    this.setData({
      total,
      getNumber
    })
  },
  // 点击选中
  isShow(e) {
    let { index } = e.target.dataset
    this.data.commodityData[index].isShow = !this.data.commodityData[index].isShow
    let isAllShow = this.data.commodityData.some((item) => {
      // return item.isShow == false
      return !item.isShow
    })
    this.setData({
      commodityData: this.data.commodityData,
      isAllShow: !isAllShow
    })
    this.calculateTotal()
    wx.setStorage({
      key: "commodityData",
      data: this.data.commodityData
    })
    wx.setStorage({
      key: "isAllShow",
      data: this.data.isAllShow
    })

  },
  // 全选
  isAllShow() {
    this.data.commodityData.forEach((item) => {
      item.isShow = !this.data.isAllShow
    })
    this.setData({
      commodityData: this.data.commodityData,
      isAllShow: !this.data.isAllShow,
    })
    wx.setStorage({
      key: "commodityData",
      data: this.data.commodityData
    })
    this.calculateTotal()
    wx.setStorage({
      key: "isAllShow",
      data: this.data.isAllShow
    })
  },
  //添加地址
  getAddress() {
    wx.chooseAddress({
      success: (res) => {
        let obj = {
          userName: res.userName,
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
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
  calculate(e) {
    let { number, index } = e.target.dataset
    this.data.commodityData[index].goods_number += number
    if (this.data.commodityData[index].goods_number <= 0) {
      wx.showModal({
        title: '提示',
        content: '是否删除该商品',
        success: (res) => {
          if (res.confirm) {
            this.data.commodityData.splice(index, 1)
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
          this.getTabBar().setData({
            number: (wx.getStorageSync("commodityData") || []).length,
          })
        }
      })

    }
    this.setData({
      commodityData: this.data.commodityData
    })
    this.calculateTotal()
    wx.setStorage({
      key: "commodityData",
      data: this.data.commodityData
    })
  }
})