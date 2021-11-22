<template>
  <vue-drag-resize
    :isActive="objectKey === selectItemKey"
    :w="setting.width"
    :h="setting.depth"
    :x="setting.x + 60"
    :y="setting.z + 60"
    :gridX="grid"
    :gridY="grid"
    @resizing="setPartsSetting"
    @dragging="setPartsSetting"
    @click.native="selectParts"
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
      grid: 100,
    }
  },
  computed: {},
  methods: {
    setPartsSetting(event) {
      const projectId = this.$route.params.projectId
      if (!this.objectKey) return
      const _setting = Object.assign({}, this.setting)
      _setting.x = Math.floor(event.left) - 60
      _setting.z = Math.floor(event.top) - 60
      _setting.width = Math.floor(event.width)
      _setting.depth = Math.floor(event.height)
      const ref = this.$firebase
        .database()
        .ref(`project/${projectId}/setting/parts/${this.objectKey}`)
      ref.set(_setting)
    },
    selectParts() {
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
