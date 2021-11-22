<template>
  <section class="wrap">
    <p class="project__title">JETSON DEMO</p>
    <div class="project__list">
      <v-list v-for="(key, index) in Object.keys(projects)" :key="index">
        <v-list-item style="justify-content: center">
          <v-card class="project__card" @click="toSettingPage(key)">
            {{ getProjectName(projects[key]) }}
          </v-card>
        </v-list-item>
      </v-list>
      <v-btn class="mt-10" outlined @click="dialog = true">
        Add New Project
      </v-btn>
    </div>
    <v-dialog
      v-if="dialog"
      v-model="dialog"
      width="600"
      class="project__dialog"
    >
      <v-card class="pa-10">
        <v-text-field
          v-model="name"
          label="project name"
          outlined
          hide-details="auto"
          class="mb-10"
        />
        <v-layout justify-space-between align-center>
          <v-btn width="200" color="primary" @click="addNewProject">SAVE</v-btn>
          <v-btn width="200" color="primary" outlined @click="dialog = false"
            >CANCEL</v-btn
          >
        </v-layout>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      projects: {},
      name: '',
      dialog: false,
    }
  },
  computed: {},
  mounted() {
    this.setProjects()
  },
  methods: {
    setProjects() {
      const ref = this.$firebase.database().ref('project')
      ref.get().then((snapshot) => {
        if (!snapshot?.val()) return
        this.projects = snapshot.val()
      })
    },
    getProjectName(project) {
      if (!project) return ''
      return project.name
    },
    addNewProject() {
      const ref = this.$firebase.database().ref('project')
      ref
        .push({
          name: this.name,
          setting: {
            base: {
              color: { hexa: '#FFFFFFFF' },
              image: {},
              height: '1000',
              width: '1000',
            },
          },
        })
        .then(() => {
          this.dialog = false
          this.setProjects()
        })
        .catch((error) => {
          this.dialog = false
          throw error
        })
    },
    toSettingPage(key) {
      this.$router.push(`${key}/setting`)
    },
  },
}
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
}

.project {
  &__title {
    max-width: 1080px;
    margin: 40px auto;
    font-size: 40px;
    text-align: center;
    font-style: italic;
  }
  &__dialog {
    max-width: 600px;
  }
  &__list {
    max-width: 1080px;
    margin: auto;
    border: solid 2px indigo;
    border-radius: 12px;
    padding: 40px;
    text-align: center;
  }
  &__card {
    padding: 10px 40px;
    min-width: 600px;
    background-color: #6200ea !important;
    border-color: #6200ea !important;
    color: #fff;
    font-weight: bold;
  }
}
</style>
