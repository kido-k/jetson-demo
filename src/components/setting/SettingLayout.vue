<template>
  <v-layout class="setting-layout__wrap">
    <template v-if="settings">
      <setting-map :settings="settings" />
      <v-layout v-if="showMenu" class="setting-layout__menu">
        <v-btn text icon @click="showMenu = false">
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>
        <setting-menu :settings="settings" />
      </v-layout>
      <template v-else>
        <v-btn text icon @click="showMenu = true">
          <v-icon>mdi-chevron-double-left</v-icon>
        </v-btn>
      </template>
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
      showMenu: true,
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
    background-color: #ececec;
  }
  &__menu {
    position: fixed;
    right: 0;
  }
}
</style>
