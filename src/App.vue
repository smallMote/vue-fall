<template>
  <div>
<!--    <ImageLayout v-if="true" :src="require('./assets/logo.png')"/>-->
<!--    <img :src="require('./assets/logo.png')" alt="" />-->
    <button @click="cure()">Cure</button>
    <button @click="append()">Append</button>
    <WaterFall
      :size="images.length"
      :col-gap="10"
      :row-gap="30"
      v-if="true">
      <WaterFallItem
        v-for="(item, index) in images"
        :key="`water-item-${index}`">
        <!-- 你好 {{ index }} -->
        <ImageLayout :src="src"/>
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
  data() {
    return {
      src: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1a4uNc.img?h=174&w=300&m=6&q=60&u=t&o=t&l=f&f=jpg&x=1214&y=1268'
    }
  },
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
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.water-fall-item img {
  width: 100%;
  display: block;
}
</style>
