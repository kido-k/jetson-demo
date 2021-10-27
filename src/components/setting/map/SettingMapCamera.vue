<template>
  <vue-drag-resize
    :isActive="objectKey === selectItemKey"
    :w="setting.width"
    :h="setting.height"
    :x="setting.left"
    :y="setting.top"
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
    setting: {
      type: Object,
      default: () => ({}),
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
      const _setting = Object.assign({}, this.setting)
      _setting.left = Math.floor(event.left)
      _setting.top = Math.floor(event.top)
      _setting.width = Math.floor(event.width)
      _setting.height = Math.floor(event.height)
      const ref = this.$firebase.database().ref(`setting/camera`)
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
