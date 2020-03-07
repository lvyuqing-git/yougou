import request from '../../utils/request.js'
Page({
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  commodityClick(e){
    let cid = e.currentTarget.dataset.itemdata.cat_id
    let query = e.currentTarget.dataset.itemdata.cat_name
    wx.navigateTo({
      url: `../goods_list/index?id=${cid}&query=${query}`
    })
  },
  
  data : {
    columnList : [],
    current : 0
  },
    onLoad(){
      request({
        url: '/api/public/v1/categories'
      }).then((res)=>{
        this.setData({
          columnList : res.data.message
        })
      })
    },
  columnClick(e){
    this.setData({
      current : e.currentTarget.dataset.index
    })
  }
})