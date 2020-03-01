import request from '../../utils/request.js'
Page({
  data: {

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
      console.log(res)
    })
  }

})