import { base_url } from './config'

class HTTP {
    request({
        url,
        data = {},
        header = {
            'content-type': 'application/json;charset=UTF-8',
            'Authorization':'23dd69d17487bf8adf54b2fbbe9ed573',
            'X-Request-Token': wx.getStorageSync('token')
        },
        method = "GET",
        success = () => {},
        fail = () => {}
    }){
        return new Promise((resolve,reject)=>{
            this._request(url,data,header,method,resolve,reject)
        })
    }
    _request(url,data,header,method,resolve,reject) {
        wx.request({
          url: base_url + url,
          data: data,
          header: header,
          method: method,
          success: (res) => {
            const data = res.data
            if(res.statusCode == 200){
                resolve(data)
            }else{
                reject()
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
          fail: (err) => {
            reject()
            wx.showToast({
                title: '接口请求失败', //7个字长度
                icon: 'none',
                duration: 30000
            })
          },
          complete: (res)=>{
            console.log(2)
          }
        })
    }
}
export {HTTP}