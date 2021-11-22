<template>
  <section>
    <v-layout class="project-top" align-center>
      <v-btn icon @click="backHome">
        <v-icon color="#fff">mdi-home</v-icon>
      </v-btn>
      <p class="project-top__name">
        {{ projectName }}
      </p>
    </v-layout>
    <v-layout v-if="settings" class="setting-layout__wrap">
      <div style="width: 100%; padding: 60px">
        <setting-map :settings="settings" />
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
    backHome() {
      this.$router.push('/')
    },
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
.project-top {
  position: fixed;
  top: 12px;
  left: 8px;
  &__name {
    padding: 8px 20px;
    margin: 0 0 0 20px;
    border: 2px solid #fff;
    border-radius: 8px;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
  }
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
    overflow-y: scroll;
  }
}
</style>
