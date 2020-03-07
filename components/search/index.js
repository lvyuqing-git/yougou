// component /search/search.js
Component({

  data: {

  },

  methods: {

  },
  attached(){
    let number = (wx.getStorageSync('commodityData') || []).length
    console.log(number)
  }
})
