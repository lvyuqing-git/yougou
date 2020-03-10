// pages/personal/index.js
Page({
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
        number: (wx.getStorageSync("commodityData") || []).length,
      })
    }
  },
  addressInfo(){
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  service(){
    wx.makePhoneCall({
      phoneNumber: '15360562781' //仅为示例，并非真实的电话号码
    })
  }
})