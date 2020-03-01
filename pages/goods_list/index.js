import request from '../../utils/request.js'
Page({
  data: {
    listNumber: 0,
    //商品列表
    commodityData: {},
    //复制数据
    commodityCopyData: {},
    isMax: true,
    list: ['综合', '销量', '价格']
  },
  //点击商品
  clickGoods(e){
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
    const query = wx.createSelectorQuery()
    console.log(query.select('.triangle').boundingClientRect())
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
  onLoad(options) {
    request({
      url: '/api/public/v1/goods/search',
      data: {
        query: options.query,
        cid: options.id,
        // query: "啤酒",
        // cid: 363,
        pagenum: 0,   //页码
        pagesize: 10 //页数量
      }
    }).then((res) => {
      this.setData({
        commodityData: res.data.message.goods,
        commodityCopyData: [...res.data.message.goods]
      })

    })
  }
})