<template>
  <section class="setting-map__wrap" :style="{ 'background-color': baseColor }">
    <template
      v-for="(key, index) in Object.keys(settings.parts)"
      class="setting-map__contents"
    >
      <setting-map-parts
        v-if="settings.parts[key]"
        :key="index"
        :objectKey="key"
        :setting="settings.parts[key]"
      />
    </template>
  </section>
</template>

<script>
import SettingMapParts from './SettingMapParts.vue'

export default {
  components: {
    SettingMapParts,
  },
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  computed: {
    baseColor() {
      return this.settings.base.color?.hexa
    },
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.setting-map {
  &__wrap {
    width: 100%;
    height: 100%;
  }
  &__contents {
    width: 100%;
  }
}
</style>
