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
})