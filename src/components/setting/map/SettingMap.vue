<template>
  <div
    class="setting-map__wrap"
    :style="{
      'background-color': baseColor,
      'background-image': `url(${backgroundImage})`,
      height: String(settings.base.height) + 'px',
      width: String(settings.base.width) + 'px',
    }"
  >
    <setting-map-camera v-show="showCamera" :setting="settings.camera" />
    <template v-if="settings.parts">
      <div
        v-for="(key, index) in Object.keys(settings.parts)"
        :key="index"
        class="setting-map__contents"
      >
        <setting-map-parts
          v-if="settings.parts[key]"
          :objectKey="key"
          :selectItemKey="selectItemKey"
          :setting="settings.parts[key]"
          @selectItem="setSelectItemKey"
        />
      </div>
    </template>
  </div>
</template>

<script>
import SettingMapCamera from './SettingMapCamera.vue'
import SettingMapParts from './SettingMapParts.vue'

export default {
  components: {
    SettingMapCamera,
    SettingMapParts,
  },
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selectItemKey: null,
    }
  },
  computed: {
    baseColor() {
      return this.settings.base?.color?.hexa || '#fff'
    },
    showCamera() {
      return this.$store.state.layout.showCamera
    },
    backgroundImage() {
      return this.settings.base?.image ? this.settings.base.image.url : ''
    },
  },
  methods: {
    setSelectItemKey(itemKey) {
      this.selectItemKey = itemKey
    },
  },
}
</script>

<style scoped lang="scss">
.setting-map {
  &__wrap {
    background-size: cover;
  }
}
</style>
