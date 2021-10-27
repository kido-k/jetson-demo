<template>
  <section>
    <v-card class="setting-menu__wrap">
      <base-menu :baseSetting="settings.base" />
      <v-divider></v-divider>
      <camera-menu :cameraSetting="settings.camera" />
      <v-divider></v-divider>
      <parts-menu :partsSettings="settings.parts" />
      <v-divider></v-divider>
    </v-card>
  </section>
</template>

<script>
import BaseMenu from './BaseMenu.vue'
import CameraMenu from './CameraMenu.vue'
import PartsMenu from './PartsMenu.vue'

export default {
  components: {
    BaseMenu,
    CameraMenu,
    PartsMenu,
  },
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialog: false,
      editItemKey: null,
      editItem: null,
    }
  },
  computed: {},
  methods: {},
}
</script>

<style scoped lang="scss">
.setting-menu {
  &__wrap {
    width: 300px;
    height: 100%;
  }
}

.color-pallet {
  width: 24px;
  height: 20px;
  border-radius: 50%;
  margin: 20px 8px 0 0;
}
</style>
