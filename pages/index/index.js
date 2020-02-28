import request from '../../utils/request.js'

Page({
  data : {
    swiperList : [],
    navmenuList : []
  },
  onLoad: function () {
    request({
      url: '/api/public/v1/home/swiperdata'
    }).then((res)=>{
      this.setData({
        swiperList: res.data.message
      })
    })
    request({
      url: '/api/public/v1/home/catitems'
    }).then((res) => {
      console.log(res)
      this.setData({
        navmenuList: res.data.message
      })
    })

  },

})
