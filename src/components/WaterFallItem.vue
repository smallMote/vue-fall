<template>
  <div class="water-fall-item">
    <slot></slot>
  </div>
</template>

<script>
import { } from 'vue'

export default {
  name: 'WaterFallItem',
  created() {
    this.$nextTick(() => {
      this.$parent.addItemModel()
    })
  }
}
</script>