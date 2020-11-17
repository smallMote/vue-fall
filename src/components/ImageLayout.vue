<template>
  <img @load="load" :src="src" alt="" />
</template>
<script>
export default {
  name: 'ImageLayout',
  props: {
    src: String
  },
  methods: {
    load() {
      // console.log('e', e)
      // this.$emit('rendered')
    }
  }
}
</script>