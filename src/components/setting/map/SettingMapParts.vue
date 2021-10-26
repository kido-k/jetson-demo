<template>
  <vue-drag-resize
    :isActive="objectKey === selectItemKey"
    :w="setting.width"
    :h="setting.depth"
    :x="setting.x"
    :y="setting.z"
    :gridX="grid"
    :gridY="grid"
    @resizing="setPartsSetting"
    @dragging="setPartsSetting"
    @clck="select"
  >
    <div
      class="map-parts__contents"
      :style="{ 'background-color': setting.color.hexa }"
    >
      {{ setting.name }}
    </div>
  </vue-drag-resize>
</template>

<script>
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
    selectItemKey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      grid: 20,
    }
  },
  computed: {},
  methods: {
    setPartsSetting(event) {
      if (!this.objectKey) return
      const _setting = Object.assign({}, this.setting)
      _setting.x = Math.floor(event.left)
      _setting.z = Math.floor(event.top)
      _setting.width = Math.floor(event.width)
      _setting.depth = Math.floor(event.height)
      const ref = this.$firebase
        .database()
        .ref(`setting/parts/${this.objectKey}`)
      ref.set(_setting)
    },
    select() {
      this.$emit('selectItem', this.objectKey)
    },
  },
}
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
}

.map-parts {
  position: fixed;
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
