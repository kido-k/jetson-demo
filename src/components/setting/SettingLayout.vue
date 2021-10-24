<template>
  <v-layout class="setting-layout__wrap">
    <template v-if="settings">
      <setting-map :settings="settings" />
      <setting-menu :settings="settings" />
    </template>
  </v-layout>
</template>

<script>
import SettingMap from './map/SettingMap.vue'
import SettingMenu from './menu/SettingMenu.vue'

export default {
  components: {
    SettingMap,
    SettingMenu,
  },
  data() {
    return {
      settings: null,
    }
  },
  computed: {},
  created() {
    this.setSettings()
  },
  methods: {
    setSettings() {
      const ref = this.$firebase.database().ref('setting')
      ref.on('value', (snapshot) => {
        if (!snapshot?.val()) return
        this.settings = snapshot.val()
      })
    },
  },
}
</script>

<style scoped lang="scss">
.setting-layout {
  &__wrap {
    height: 100%;
  }
}
</style>
