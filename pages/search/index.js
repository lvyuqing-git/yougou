// pages/search/index.js
import request from '../../utils/request.js'
Page({
  data : {
    inputSearchList : { },
    isShow : true,
  },
  inputSerach(e){
    let { value } = e.detail
    request({
      url: '/api/public/v1/goods/qsearch',
      data : {
        query: value
      }
    }).then((res)=>{
      let { message} = res.data
      this.setData({
        inputSearchList: {}
      })
      if(message.length > 0){
        console.log('aaaaaaaaaaa')
        this.setData({
          isShow : false
        })
      }
    })
  }
})