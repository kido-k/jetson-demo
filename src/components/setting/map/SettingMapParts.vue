<template>
  <interact
    draggable
    resizable
    class="map-parts"
    :dragOption="dragOption"
    :resizeOption="resizeOption"
    :style="style"
    @dragmove="dragmove"
    @resizemove="resizemove"
  >
    <div
      class="map-parts__contents"
      :style="{ 'background-color': setting.color.hexa }"
    >
      {{ setting.name }}
    </div>
  </interact>
</template>

<script>
import interact from 'interactjs'

export default {
  props: {
    objectKey: {
      type: String,
      default: '',
    },
    setting: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    resizeOption: {
      edges: { left: true, right: true, bottom: true, top: true },
    },
    dragOption: {
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],
    },
  }),
  computed: {
    style() {
      return {
        height: `${this.setting.width}px`,
        width: `${this.setting.width}px`,
        transform: `translate(${this.setting.x}px, ${this.setting.y}px)`,
        border: `4px solid ${this.setting.color.hexa}`,
      }
    },
  },
  methods: {
    dragmove(event) {
      if (!this.objectKey) return
      const _setting = Object.assign({}, this.setting)
      _setting.x += Math.floor(event.dx)
      _setting.y += Math.floor(event.dy)

      const ref = this.$firebase
        .database()
        .ref(`setting/parts/${this.objectKey}`)
      ref.set(_setting)
    },
    resizemove(event) {
      if (!this.objectKey) return
      const _setting = Object.assign({}, this.setting)
      _setting.width = Math.floor(event.rect.width)
      _setting.height = Math.floor(event.rect.height)
      _setting.x += Math.floor(event.deltaRect.left)
      _setting.y += Math.floor(event.deltaRect.top)

      const ref = this.$firebase
        .database()
        .ref(`setting/parts/${this.objectKey}`)
      ref.set(_setting)
    },
  },
}
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
}

.map-parts {
  box-sizing: border-box;
  user-select: none;
  -ms-touch-action: none;
  touch-action: none;
  border-radius: 8px;
  &__contents {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    padding: 4px;
    opacity: 0.6;
  }
}
</style>
