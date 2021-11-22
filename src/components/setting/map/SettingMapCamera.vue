<template>
  <vue-drag-resize
    :isActive="true"
    :w="setting.width"
    :h="setting.height"
    :x="setting.left"
    :y="setting.top"
    :gridX="grid"
    :gridY="grid"
    class="map-camera"
    @resizing="setPartsSetting"
    @dragging="setPartsSetting"
  >
    <div class="map-camera__contents">camera range</div>
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
      grid: 50,
    }
  },
  computed: {},
  methods: {
    setPartsSetting(event) {
      const projectId = this.$route.params.projectId
      const _setting = Object.assign({}, this.setting)
      _setting.left = Math.floor(event.left)
      _setting.top = Math.floor(event.top)
      _setting.width = Math.floor(event.width)
      _setting.height = Math.floor(event.height)
      const ref = this.$firebase
        .database()
        .ref(`project/${projectId}/setting/camera`)
      ref.set(_setting)
    },
  },
}
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
}

.map-camera {
  border: 4px solid rgb(255, 0, 0, 0.8);
  border-radius: 8px;
  &__contents {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    padding: 4px;
    background-color: rgb(255, 0, 0, 0.1);
  }
}
</style>
