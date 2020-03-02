// pages/search/index.js
import request from '../../utils/request.js'
Page({
  data : {
    inputSearchList : { },//搜索数据列表
    isShow : true, //是否显示搜索历史
    searchHistoryList : ['小米'],//搜索历史列表
    value : '',//搜素框的值
  },
  init(){

  },
  //点击历史搜索
  clickHistory(e){
    let { value } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../goods_list/index?query=' + value
    })
  },
  // 离开页面
  onHide(){
    this.setData({
      value : ''
    })
  },
  // 点击搜索
  searchHistory(){
      let arr = [...this.data.searchHistoryList]
    arr.push(this.data.value)
    this.setData({
      searchHistoryList: arr
    })
    wx.navigateTo({
      url: '../goods_list/index?query='+ this.data.value
    })
  },
  //输入框监听函数
  inputSerach(e){
    let { value } = e.detail
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