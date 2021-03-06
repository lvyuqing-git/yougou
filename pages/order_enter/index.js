import request from '../../utils/request.js'
Page({
  data: {
    paymentTitleList: ['全部', '待付款', '已付款', '退款/退货'],
    current: 0,
    orderInfo: [],
    totalNumber: 0,
    arra: []

  },
  //支付
  zhifu(e) {
    let { index } = e.currentTarget.dataset
    console.log(this.data.orderInfo[index].order_number)
    request({
      url: '/api/public/v1/my/orders/req_unifiedorder',
      method : "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data: {
        order_number: this.data.orderInfo[index].order_number
      }
    }).then((res)=>{
      let { pay} = res.data.message
      wx.requestPayment({
        timeStamp: pay.timeStamp,
        nonceStr: pay.nonceStr,
        package: pay.package,
        signType: 'MD5',
        paySign: pay.paySign,
        success(res) {
          console.log(res)
         },
        fail(res) {
          console.log(res)

         }
      })
    })
  },
  onLoad: function (options) {
    let arra = []
    this.data.orderInfo.forEach((i) => {
      let number = 0
      i.arr.forEach(index => {
        number += index.goods_number
      })
      arra.push(number)
    })
   
    this.setData({
      arra: arra,
      orderInfo:wx.getStorageSync("orderInfo"),
    })
  },
  clickTitleList(e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      current: index
    })
  }

})