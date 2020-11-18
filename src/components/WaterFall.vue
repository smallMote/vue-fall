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
    columns: { // 列数
      type:Number,
      default: 4
    },
    colGap: { // 列间距
      type: Number,
      default: 10
    },
    rowGap: { // 行间距
      type: Number,
      default: 10
    },
    isRender: Boolean // 自定义渲染时机
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
      if ((val === props.size && container.value) || props.isRender) {
        waterFall(container.value, props.columns, props.colGap, props.rowGap)
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
function waterFall (dom, columns = 4, colGap = 10, rowGap = 10) {
  const box = dom || document.querySelector('.water-fall-container')
  if (!box) return
  const items = box.children
  // 1- 确定列数  = 页面的宽度 / 图片的宽度
  const pageWidth = box.clientWidth
  const itemWidth = pageWidth / columns
  const arr = []
  let boxHeight = 0
  const gap = (columns - 1) * colGap / columns
  const nitherGap = colGap - gap
  function render(pw = pageWidth, iw = itemWidth) {
    for (let i = 0; i < items.length; i++) {
      // 设置宽度
      items[i].style.width = pw / columns - gap + 'px'
      if (i < columns) {
        // 2- 确定第一行
        items[i].style.top = 0 + 'px'
        items[i].style.left = (iw + nitherGap) * i + 'px'
        arr.push(items[i].offsetHeight)
        boxHeight = items[i].offsetHeight
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
        // top值就是最小列的高度 + rowGap
        items[i].style.top = arr[index] + rowGap + 'px'
        // left值就是最小列距离左边的距离
        let colIndex = i % columns
        if (colIndex > columns - 1) {
          colIndex = 0
        }
        items[i].style.left = (iw + nitherGap) * colIndex + 'px'

        // 5- 修改最小列的高度
        // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
        arr[index] = arr[index] + items[i].offsetHeight + rowGap
        // 设置父容器的高度 避免造成 BFC
        if (i === items.length - 1) {
          boxHeight = arr[index]
        }
      }
      
      // 设置第一列的left offset
      if ((i + 1) % columns === 1) {
        items[i].style.left = 0 + 'px'
      }
    }
    box.style.height = boxHeight + 'px'
  }
  render()
  
  // 内容溢出，出现滚动条处理
  const newPageWidth = box.clientWidth
  if (newPageWidth < pageWidth) {
    // 重绘
    const timer = setTimeout(() => {
      render(newPageWidth, newPageWidth / columns)
      clearTimeout(timer)
    }, 20)
  }
}
</script>

<style scoped>
.water-fall-container {
  width: 100%;
  position: relative;
  min-height: 100px;
  background-color: #2c3e50;
}
.water-fall-item {
  position: absolute;
  /*width: 200px;*/
  /*border: 1px solid seagreen;*/
  box-sizing: border-box;
  box-shadow: 0 0 1px 1px #2c3e50;
}
</style>
