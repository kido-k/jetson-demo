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
    <template
      v-for="(key, index) in Object.keys(settings.parts)"
      class="setting-map__contents"
    >
      <setting-map-parts
        v-if="settings.parts[key]"
        :key="index"
        :objectKey="key"
        :selectItemKey="selectItemKey"
        :setting="settings.parts[key]"
        @selectItem="setSelectItemKey"
      />
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
      return this.settings.base.color?.hexa
    },
    showCamera() {
      return this.$store.state.layout.showCamera
    },
    backgroundImage() {
      return this.settings.base.image ? this.settings.base.image.url : ''
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
