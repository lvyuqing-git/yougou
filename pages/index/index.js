import request from '../../utils/request.js'

Page({
  data : {
    swiperList : [],
    navmenuList : [],
    floorList : [],

  },
  onShow(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onLoad: function () {
    // 轮播图
    request({
      url: '/api/public/v1/home/swiperdata'
    }).then((res)=>{
      this.setData({
        swiperList: res.data.message
      })
    })
    // 导航菜单
    request({
      url: '/api/public/v1/home/catitems'
    }).then((res) => {
      this.setData({
        navmenuList: res.data.message
      })
    })
    //商品楼层
    request({
      url: '/api/public/v1/home/floordata'
    }).then((res)=>{
      this.setData({
        floorList: res.data.message
      })
    })

  },

})
