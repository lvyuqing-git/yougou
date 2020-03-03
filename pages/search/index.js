// pages/search/index.js
import request from '../../utils/request.js'
Page({
  data: {
    inputSearchList: {}, //搜索数据列表
    isShow: true, //是否显示搜索历史
    searchHistoryList: [], //搜索历史列表
    value: '', //搜素框的值
    isLoad: false,
    lastValue: ''
  },
  onLoad(){
    this.setData({
      searchHistoryList: wx.getStorageSync('history')
    })
  },
  init() {
    if (this.data.isLoad === false) {
      this.setData({
        isLoad: true,
        lastValue: this.data.value,
      })
      request({
        url: '/api/public/v1/goods/qsearch',
        data: {
          query: this.data.value
        }
      }).then((res) => {
        let {
          message
        } = res.data
        this.setData({
          inputSearchList: message,
          isLoad: false,
        })
        if (this.data.value !== this.data.lastValue) {
          console.log('aaaaaaaaaa')
          this.init()
        }
      })
    }
  },
  //取消
  cancel() {
    this.setData({
      value: '',
      inputSearchList: []
    })
  },
  //点击历史搜索
  clickHistory(e) {
    let {
      value
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../goods_list/index?query=' + value
    })
  },
  // 离开页面
  onHide() {
    this.setData({
      value: ''
    })
  },
  // 回车
  searchHistory() {
    let arr = [...this.data.searchHistoryList]
    arr.push(this.data.value)
    arr = [...new Set(arr)]
    this.setData({
      searchHistoryList: arr
    })
    wx.setStorage({
      key: "history",
      data: arr
    })
   
    wx.redirectTo({
      url: '../goods_list/index?query=' + this.data.value
    })
  },
  //输入框监听函数
  inputSerach(e) {
    let {
      value
    } = e.detail
    this.setData({
      value: value,
    })
    this.init()
  }
})