<template>
  <img @load="load" :src="src" alt="" :draggable="draggable"/>
</template>
<script>
export default {
  name: 'ImageLayout',
  props: {
    src: String,
    alt: String,
    draggable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    load() {
      this.$parent.addChild()
    }
  }
}
</script>
