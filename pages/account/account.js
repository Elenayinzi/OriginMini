const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
      mobile: wx.getStorageSync('user_info')?wx.getStorageSync('user_info').mobile:'',
      checkCode: '',
      openId: '',
      unionId: '',
      isDisabled: false,
      message: '发送验证码',
      time: 60
    },
    //查询用户openid,unionid
    getIdInfo() {
      let _this = this
      wx.request({
          url: app.baseUrl+'/bind',
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
              // wx.showToast({
              //   title: '接口请求失败', //7个字长度
              //   icon: 'none',
              //   duration: 30000
              // })
              wx.showModal({
                title: '错误信息',
                content: '错误信息',
                success(res){
                  if(res.confirm){
                    console.log('用户点击确认')
                  }else if(res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          },
          fail(e){
            console.log(1)
          },
          complete(res){
            console.log(2)
          }
      })
    },
    //获取验证码
    getCheckCode(){
      let { mobile, time } = this.data
      const param = {
        phone: mobile,
        type:'unbind',
        token: wx.getStorageSync('token')
      }
      let _this = this
      wx.request({
          url: app.baseUrl+`/captcha/${mobile}`,
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
            _this.setData({
              isDisabled: true
            })
          },
          fail(e){}
      })
      let timer = setInterval(()=>{
        time--
        if(time <= 0) {
          this.setData({
            isDisabled: false,
            time: 60
          })
          clearInterval(timer)
        }else{
          this.setData({
            time: time
          })
        }
      }, 1000)
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
        url: app.baseUrl+'/unbind/mobile',
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
        fail(e){}
      })

    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
      console.log("onLoad")
      this.getIdInfo()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      console.log("onReady")
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      console.log("onShow")
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      console.log("onHide")
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
  
    }
  })