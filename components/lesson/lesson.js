// components/lesson/lesson.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      this.setData({
        user: this.dataset.user
      })
      let detail = {
        name: 'vue'
      }
      this.triggerEvent("myEvent",detail,{})
    },
  }
})
