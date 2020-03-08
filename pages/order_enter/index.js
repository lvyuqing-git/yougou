// pages/order_enter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentTitleList : ['全部','待付款','已付款','退款/退货'],
    current : 0,
    commodityList: wx.getStorageSync("commodityData")
  },

  onLoad: function (options) {

  },
  clickTitleList(e){
    let { index } = e.currentTarget.dataset
    this.setData({
      current : index
    })
  }

})