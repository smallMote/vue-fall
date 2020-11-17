<template>
  <div>
    <ImageLayout :src="require('./assets/logo.png')"/>
    <button @click="cure()">Cure</button>
    <button @click="append()">Append</button>
    <WaterFall :size="images.length" v-if="true">
      <WaterFallItem
        v-for="(item, index) in images"
        :key="`water-item-${index}`">
        <!-- 你好 {{ index }} -->
        <img src="./assets/logo.png" alt="" />
      </WaterFallItem>
    </WaterFall>
  </div>
</template>

<script>
import { onBeforeUnmount, ref } from 'vue'
import WaterFall from './components/WaterFall'
import ImageLayout from './components/ImageLayout'
import WaterFallItem from './components/WaterFallItem'

export default {
  name: 'App',
  components: {
    WaterFall,
    ImageLayout,
    WaterFallItem 
  },
  setup() {
    let timer = null
    const images = ref([])

    const getImages = () => {
      timer = setTimeout(() => {
        images.value = new Array(20).fill('你好')
        clearTimeout(timer)
      }, 500)
    }
    getImages()

    const append = () => {
      images.value.push(5)
    }

    const cure = () => {
      images.value.shift()
    }


    onBeforeUnmount(() => {
      timer && clearTimeout(timer)
    })

    return {
      images,
      append,
      cure
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>