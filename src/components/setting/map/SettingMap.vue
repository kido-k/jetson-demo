<template>
  <section class="setting-map__wrap" :style="{ 'background-color': baseColor }">
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
  </section>
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
    width: calc(100% - 300px);
    height: 100%;
  }
  &__contents {
    width: 100%;
  }
}
</style>
