<template>
  <section>
    <v-card class="setting-menu__wrap">
      <v-select
        v-model="character"
        :items="characterItems"
        label="character"
        outlined
        hide-details
        class="setting-menu__selector"
      />
      <v-divider></v-divider>
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
      characterItems: ['human', 'robot'],
      character: null,
    }
  },
  computed: {},
  mounted() {
    this.character = this.settings.character || 'human'
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.setting-menu {
  &__wrap {
    width: 300px;
    height: 100%;
  }
  &__selector {
    padding: 16px 24px;
  }
}

.color-pallet {
  width: 24px;
  height: 20px;
  border-radius: 50%;
  margin: 20px 8px 0 0;
}
</style>
