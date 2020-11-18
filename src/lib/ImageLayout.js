import { h } from 'vue'
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
  },
  render() {
    const load = this.load
    return h(
      'img',
      {
        src: this.src,
        alt: this.alt,
        draggable: this.draggable,
        onLoad() {
          load()
        }
      }
    )
  }
}