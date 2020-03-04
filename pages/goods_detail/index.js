import request from '../../utils/request.js'
Page({
  data: {
    commodityInfo : {},
    urls : [],
    id : ''
  },
  previewImage(e){
    let { index } = e.currentTarget.dataset
    
    wx.previewImage({
      current: this.data.urls[index], // 当前显示图片的http链接
      urls: this.data.urls // 需要预览的图片http链接列表
    })
  },
  addCar(){
    wx.switchTab({
      url: '../cart/index?goods_id='+this.data.id
    })
  },
  onLoad: function (options) {
    this.setData({
      id: options.goods_id
    })
    request({
      url: '/api/public/v1/goods/detail',
      data : {
        goods_id: options.goods_id
      }
    }).then((res)=>{
      console.log(res)
      const { message } = res.data
      let arr = message.pics.map((item)=>{
        return item.pics_big
      })
      this.setData({
        commodityInfo: message,
        urls: arr
      })
    })
  }

})