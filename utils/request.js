
const request = (config = {}) => {

  if (config.url.search(/^http/) === -1) {
    config.url = request.defaults.baseURL + config.url;
  }
  return new Promise((resolve, reject) => {

    wx.request({
      ...config,
      success(res) {
        resolve(res);
      },
      fail(res) {
        reject(res);
      },

      complete(res) {

        request.errors(res);
      }
    })
  })
}

request.defaults = {

  baseURL: ""
}

request.errors = () => { }


request.onError = (callback) => {

  if (typeof callback === "function") {

    request.errors = callback
  }
}


// 对外暴露
export default request;