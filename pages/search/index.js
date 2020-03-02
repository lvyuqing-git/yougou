// pages/search/index.js
import request from '../../utils/request.js'
Page({
  data : {
    inputSearchList : { },//搜索数据列表
    isShow : true, //是否显示搜索历史
    searchHistoryList : [],//搜索历史列表
    value : '',//搜素框的值
  },
  inputSerach(e){
    let { value } = e.detail
    // let arr = []
    // arr.push(value)
    // this.setData({
    //   searchHistoryList: arr
    // })
    request({
      url: '/api/public/v1/goods/qsearch',
      data : {
        query: value
      }
    }).then((res)=>{
      let { message} = res.data
      console.log(message)
      this.setData({
        inputSearchList: message,
        value 
      })
      if(message ){
        this.setData({
          isShow : false
        })
      }
    })
  }
})