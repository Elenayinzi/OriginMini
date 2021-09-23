Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    lesson: [
      {
        id: 1,
        image:"../../assets/tmp.png"
      },
      {
        id: 2,
        image:"../../assets/tmp.png"
      },
      {
        id: 3,
        image:"../../assets/tmp.png"
      }
    ],
    str:["../../assets/tmp.png","../../assets/tmp.png","../../assets/tmp.png"],
    info: {
      name:'elena'
    },
    user: {
      name:'bob'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //子组件传参数给父级页面
  onMyEvent(e) {
    console.log(e)
  },
  onTap(event) {
    console.log(event)
    //跳转到下个页面，不关闭当前页面，可以返回上个页面
    wx.navigateTo({
      url: '/pages/account/account?p=hello',
    })
  },
  onTap2(event) {
    console.log(event)
    //跳转到下个页面，关闭当前页面，不能返回上个页面
    wx.redirectTo({
      url: '/pages/account/account',
    })
  },
  getSwiper(){
    wx.request({
      url: 'url',
      data: '',
      header: {},
      method:'GET',
      dataType: 'json',
      response: 'text',
      success: (res) => {

      },
      fail: (res) => {

      },
      complete: (res) => {

      },
    })
  },
  //webview
  onH5(e){
    const url = e.target.dataset.url
    wx.navigateTo({
      url: `/pages/webView/webView?url=${encodeURIComponent(url)}`,
    })
  },
  //获取收货地址
  onChooseAddr() {
    wx.chooseAddress({
      success(res) {
        console.log(res)
      },
    })
  },
  //获取地理位置
  onChooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        console.log(res)
      },
    })
  },
  //获取实时位置并且打开地图
  onGetLocation() {
    wx.getLocation({
      success(res) {
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      token: wx.getStorageSync('token')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '首页',
      path: '/pages/index/index',
      imageUrl: '../../assets/tmp.png'
    }
  }
})