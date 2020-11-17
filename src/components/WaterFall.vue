<template>
  <div class="water-fall">
    <div ref="container" class="water-fall-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, ref, watch } from 'vue'

const WaterFall = defineComponent({
  name: 'WaterFall',
  props: { // 子组件个数
    size: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0
      }
    },
    colGap: { // 列间距
      type: Number,
      default: 10
    },
    rowGap: { // 行间距
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const readySize = ref(0)
    const container = ref()

    const addItemModel = () => {
      readySize.value++
      if(readySize.value === props.size) {
        //  这时候所有的子组件已加载完成
        console.log('所有子组件已经加载完成')
      } 
    }

    watch(() => readySize.value, (val) => {
      if (val === props.size && container.value) {
        waterFall(container.value)
      }
    }, { immediate: true })

    watch(() => props.size, (val) => {
      if (val < readySize.value) {
        readySize.value = val
      }
    })

    onBeforeUnmount(() => {
      readySize.value = 0
    })
    return {
      container,
      addItemModel
    }
  }
})

export default WaterFall

// 瀑布流布局
function waterFall (dom) {
  const box = dom || document.querySelector('.water-fall-container')
  if (!box) return
  const items = box.children
  // 定义每一列之间的间隙 为10像素
  const gap = 10
  // 1- 确定列数  = 页面的宽度 / 图片的宽度
  // var pageWidth = getClient().width
  const pageWidth = box.clientWidth
  const itemWidth = items[0].offsetWidth
  const columns = parseInt(pageWidth / (itemWidth + gap))
  const arr = []
  for (let i = 0; i < items.length; i++) {
    if (i < columns) {
      // 2- 确定第一行
      // items[i].style.top = 0
      items[i].style.top = 24 // padding
      items[i].style.left = (itemWidth + gap) * i + 24 + 'px' // 24 padding-left：24px
      arr.push(items[i].offsetHeight)
    } else {
      // 其他行
      // 3- 找到数组中最小高度  和 它的索引
      let minHeight = arr[0]
      let index = 0
      for (let j = 0; j < arr.length; j++) {
        if (minHeight > arr[j]) {
          minHeight = arr[j]
          index = j
        }
      }
      // 4- 设置下一行的第一个盒子位置
      // top值就是最小列的高度 + gap
      items[i].style.top = arr[index] + gap + 'px'
      // left值就是最小列距离左边的距离
      items[i].style.left = items[index].offsetLeft + 'px'

      // 5- 修改最小列的高度
      // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
      arr[index] = arr[index] + items[i].offsetHeight + gap
    }
  }
}
</script>

<style scoped>
.water-fall-container {
  width: 100%;
  position: relative;
}
.water-fall-item {
  position: absolute;
  width: 200px;
  border: 1px solid seagreen;
  box-sizing: border-box;
}
</style>
