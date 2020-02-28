import request from '../../utils/request.js'
Page({
  data : {
    columnList : [],
    current : 0
  },
    onLoad(){
      request({
        url: '/api/public/v1/categories'
      }).then((res)=>{
        console.log(res)
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