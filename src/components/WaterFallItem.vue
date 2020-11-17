<template>
  <div ref="container" class="water-fall-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WaterFallItem',
  data() {
    return {
      imgLoadLen: 0, // img 已加载长度
      loadLen: 0, // img 节点长度
      childLen: 0 // 一级子节点长度
    }
  },
  created() {
    this.$nextTick(() => {
      const children = this.$el.children
      if (children && children.length) {
        const images = [...children].filter(item => item.nodeName === 'IMG')
        this.loadLen = images.length
        this.childLen = children.length
        if (this.loadLen === 0 && this.childLen > 0) {
          this.$parent.addItemModel()
        }
      }
    })
  },
  methods: {
    addChild() {
      this.imgLoadLen++
    }
  },
  watch: {
    imgLoadLen: {
      handler: function (val) {
        if (val === 0) {
          return
        }
        if (val === this.loadLen) {
          this.$parent.addItemModel()
        }
      },
      immediate: true
    }
  }
}
</script>
