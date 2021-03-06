import request from '../../utils/request.js'
Page({
  data: {
    //加载状态
    isLoad: true,
    //函数防抖
    isLoading : false,
    listNumber: 0,
    //商品列表
    commodityData: {},
    //复制数据
    commodityCopyData: {},
    isMax: true,
    options: {}, // 路由参数
    pagenum: 1,
  },
  // 下拉触底
  onReachBottom() {
    if(this.data.isLoading === false){
      return
    }
    this.setData({
      pagenum: this.data.pagenum + 1,
      isLoading : false
    })
    this.init()
    if (this.data.commodityData.length >= this.data.total) {
       this.setData({
         isLoad: false
       })
    }
  },
  //点击商品
  clickGoods(e) {
    wx.navigateTo({
      url: '../goods_detail/index?goods_id=' + e.currentTarget.dataset.id
    })
  },
  //点击栏目
  clickList(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      listNumber: index
    })
    switch (index) {
      case 0:
        this.synthesize()
        break;
      case 1:
        this.volume()
        break;
      case 2:
        this.price()
        break;
    }
  },

  //综合
  synthesize() {
    this.setData({
      commodityData: [...this.data.commodityCopyData]
    })
  },
  //销量
  volume() {
    let obj = {}
    let arr = this.data.commodityData
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j].hot_mumber <= arr[i].hot_mumber) {
          obj = arr[i]
          arr[i] = arr[j]
          arr[j] = obj
        }
      }
    }
    this.setData({
      commodityData: arr
    })
  },
  // 价格
  price() {
    let arr = this.data.commodityData
    let obj = {}
    this.setData({
      isMax: !this.data.isMax
    })
    if (!this.data.isMax) {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (arr[j].goods_price < arr[i].goods_price) {
            obj = arr[i]
            arr[i] = arr[j]
            arr[j] = obj
          }
        }
      }
    }
    if (this.data.isMax) {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (arr[j].goods_price > arr[i].goods_price) {
            obj = arr[i]
            arr[i] = arr[j]
            arr[j] = obj
          }
        }
      }
    }

    this.setData({
      commodityData: arr
    })
  },
  init() {
    request({
      url: '/api/public/v1/goods/search',
      data: {
        query: this.data.options.query,
        pagenum: this.data.pagenum,   //页码
        pagesize: 10 //页数量
      }
    }).then((res) => {
      this.setData({
        commodityData: [...this.data.commodityCopyData, ...res.data.message.goods],
        commodityCopyData: [...this.data.commodityCopyData, ...res.data.message.goods],
        total: res.data.message.total,
        isLoading : true
      })
    })
  }, onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  onLoad(options) {
    this.setData({
      options: options
    })
    this.init()
  }
})