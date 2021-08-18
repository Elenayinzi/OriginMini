Page({
    data: {
        isLogin: false,
        mobile: wx.getStorageSync('user_info')?wx.getStorageSync('user_info').mobile:'',
        checkCode: '',
        openId: '',
        unionId: '',
        isShow: false,
        token:''
    },
    onLoad: function(options){
        this.hasLogin()
    },
    //查询是否授权过
    hasLogin() {
        wx.login({
            timeout:10000,
            success: (result) => {
              let _this = this
              let param = {code:result.code,type:5}
              wx.request({
                  url: 'https://sso.hzqykeji.com/miniapp-oauth-callback',
                  data: param,
                  method: 'GET',
                  header: {
                      'content-type': 'application/json;charset=UTF-8',
                      'Authorization':'23dd69d17487bf8adf54b2fbbe9ed573',
                      'X-Request-Token': wx.getStorageSync('token')
                  },
                  success(res){
                      if(res.statusCode == 200) {
                          wx.setStorageSync('token',res.data.token)
                          wx.setStorageSync('user_info',res.data.user)
                          _this.setData({
                            isLogin: true
                          })
                          setTimeout(() => {
                              wx.navigateBack()
                          }, 1000)
                      }else if(res.statusCode == 201) {
                          _this.setData({
                            isLogin: false,
                            isShow: true,
                            token: res.data
                          })
                      }else{
                          _this.setData({
                            isShow: false
                          })
                      }
                  },
                  fail(e){
                      console.log(e)
                  }
              })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    //点击授权
    onGetUserInfo(e) {
        if(e.detail.errMsg === "getUserInfo:ok"){
            wx.login().then( res => {
                let _this = this
                let param = {
                    encryData: e.detail.encryptedData,
                    ivStr: e.detail.iv,
                    code: res.code,
                    type: 5
                }
                wx.request({
                    url: 'https://sso.hzqykeji.com/miniapp-oauth2-callback',
                    data: param,
                    method: 'POST',
                    header: {
                        'content-type': 'application/json;charset=UTF-8',
                        'Authorization':'23dd69d17487bf8adf54b2fbbe9ed573',
                        'X-Request-Token': wx.getStorageSync('token')
                    },
                    success(res) {
                        if(res.statusCode === 200){
                            wx.setStorageSync('token',res.data.token)
                            wx.setStorageSync('user_info',res.data.user)
                            setTimeout(() => {
                                wx.navigateBack()
                            }, 1000)
                        }else if(res.statusCode === 201){
                            _this.setData({
                                isLogin: false,
                                isShow: true,
                                token: res.data
                              })
                        }else{
                            wx.showToast(res.data,'none')
                        }
                    }
                })
            })
        }else{
            wx.navigateBack()
        }
    },
    //取消授权
    onCancelLogin() {
        wx.navigateBack()
    },
    //绑定手机号码
    onBindPhone(e) {
        const { token } = this.data
        if(e.detail.errMsg === 'getPhoneNumber:ok'){
            wx.showLoading({title:'授权中...'})
            wx.login().then( res => {
                let _this = this
                let param = {
                    encryData: e.detail.encryptedData,
                    ivStr: e.detail.iv,
                    code: res.code,
                    type: 5,
                    token: token
                }
                wx.request({
                    url: 'https://sso.hzqykeji.com/miniappBindMobile',
                    data: param,
                    method: 'POST',
                    header: {
                        'content-type': 'application/json;charset=UTF-8',
                        'Authorization':'23dd69d17487bf8adf54b2fbbe9ed573',
                        'X-Request-Token': wx.getStorageSync('token')
                    },
                    success(res) {
                        if(res.statusCode === 200){
                            wx.setStorageSync('token',res.data.token)
                            wx.setStorageSync('user_info',res.data.user)
                            _this.setData({
                                isShow: 2
                            })
                            setTimeout(() => {
                                wx.navigateBack()
                            }, 1000)
                        }else{
                            wx.showToast(res.data,'none')
                        }
                    }
                })
            })
        }else{
            wx.navigateBack()
        }
    },
    onReady: function(){
        
    },
    onShow: function(){
        
    },
    onHide: function(){

    },
    onUnload: function(){

    },
    onPullDownRefresh: function(){

    },
    onReachBottom: function(){

    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    },
    onTabItemTap:function(item){

    }
});