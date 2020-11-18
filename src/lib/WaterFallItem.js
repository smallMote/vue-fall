import { nextTick } from 'vue'

export default {
  name: 'WaterFallItem',
  setup(props, ctx) {
    // const loadLen = ref(0)
    // const childLen = ref(0)
    // const imgLoadLen = ref(0)
    
    nextTick(() => {
      console.log('ctx', ctx.root)
      
      // const children = this.$el.children
      // if (children && children.length) {
      //   const images = [...children].filter(item => item.nodeName === 'IMG')
      //   this.loadLen = images.length
      //   this.childLen = children.length
      //   if (this.loadLen === 0 && this.childLen > 0) {
      //     this.$parent.addItemModel()
      //   }
      // }
    })
  }
}