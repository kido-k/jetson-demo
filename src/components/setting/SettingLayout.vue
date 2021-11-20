<template>
  <section>
    <v-layout class="setting-layout__wrap">
      <div style="width: 100%">
        <p class="pa-4 ma-0 project-name">
          {{ projectName }}
        </p>
        <setting-map v-if="settings" :settings="settings" />
      </div>
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
    </v-layout>
  </section>
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
      projectName: null,
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
      const projectId = this.$route.params.projectId
      const ref = this.$firebase.database().ref(`project/${projectId}`)
      ref.on('value', (snapshot) => {
        if (!snapshot?.val()) return
        const project = snapshot.val()
        this.projectName = project.name
        this.settings = project.setting
      })
    },
  },
}
</script>

<style scoped lang="scss">
.project-name {
  font-size: 20px;
  height: 60px;
}
.setting-layout {
  &__wrap {
    height: 100%;
    width: 100%;
  }
  &__menu {
    position: fixed;
    right: 0;
    height: calc(100% - 72px);
    overflow: auto;
  }
}
</style>
