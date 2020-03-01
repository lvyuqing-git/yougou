import request from '../../utils/request.js'
Page({
  data: {
    commodityInfo : {}
  },
  onLoad: function (options) {
    console.log(options)
    request({
      url: '/api/public/v1/goods/detail',
      data : {
        // goods_id: options.goods_id
        goods_id: 43983
      }
    }).then((res)=>{
      // console.log(res)
      this.setData({
        commodityInfo: res.data.message
      })
    })
  }

})