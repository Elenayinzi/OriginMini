Page({
    /**
     * 页面的初始数据
     */
    data: {
      mobile: wx.getStorageSync('user_info')?wx.getStorageSync('user_info').mobile:'',
      checkCode: '',
      openId: '',
      unionId: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getIdInfo()
    },
    //查询用户openid,unionid
    getIdInfo() {
      let _this = this
      wx.request({
          url: 'https://sso.hzqykeji.com/bind',
          method: 'GET',
          header: {
              'content-type': 'application/json;charset=UTF-8',
              'Authorization':'23dd69d17487bf8adf54b2fbbe9ed573',
              'X-Request-Token': wx.getStorageSync('token')
          },
          success(res){
              if(res.statusCode == 200){
                let data = res.data
                data.map(item=>{
                  if(item.type == 74){
                      _this.setData({
                          openId:item.accessToken,
                          unionId:item.identifier
                      })
                  }
                })
              }else{
  
              }
          },
          fail(e){
  
          }
      })
    },
    //获取验证码
    getCheckCode(){
      const { mobile } = this.data
      const param = {
        phone: mobile,
        type:'unbind',
        token: wx.getStorageSync('token')
      }
      wx.request({
          url: `https://sso.hzqykeji.com/captcha/${mobile}`,
          data: param,
          method: 'GET',
          header: {
            'content-type': 'application/json;charset=UTF-8',
            'Authorization':'23dd69d17487bf8adf54b2fbbe9ed573',
            'X-Request-Token': wx.getStorageSync('token')
          },
          success(res){
            wx.showToast({
              title:res.data
            })
          },
          fail(e){
  
          }
      })
    },
    //验证码输入
    changeInput(e) {
      this.setData({
        checkCode: e.detail.value
      })
    },
    //解绑
    unbindUserInfo() {
      const { checkCode, mobile, openId, unionId } = this.data
      if(!checkCode) {
              wx.showToast({
          title:'请先获取验证码！',
          icon: 'none'
        })
              return
          }
      let param = {
              mobile,
              identifier: unionId,
              accessToken: openId,
              captcha: checkCode
          }
      wx.request({
        url: 'https://sso.hzqykeji.com/unbind/mobile',
        data: param,
        method: 'POST',
        header: {
          'content-type': 'application/json;charset=UTF-8',
          'Authorization':'23dd69d17487bf8adf54b2fbbe9ed573',
          'X-Request-Token': wx.getStorageSync('token')
        },
        success(res){
          if(res.data == 'success'){
            wx.showToast({
              title: '解绑成功！',
              icon: 'success'
            })
            wx.setStorageSync('token','')
            wx.setStorageSync('user_info','')
            wx.reLaunch({
              url:'/pages/index/index'
            })
          }else{
            wx.showToast({
              title: '解绑失败！',
              icon: 'error'
            })
          }
        },
        fail(e){
  
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
  
    }
  })