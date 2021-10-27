<template>
  <section v-if="cameraSetting">
    <v-card class="camera-menu__wrap" flat>
      <v-list-item>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header class="justify-between">
              <p class="ma-0">camera</p>
              <v-layout>
                <v-btn v-show="showCamera" icon @click.stop="switchCamera">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn v-show="!showCamera" icon @click.stop="switchCamera">
                  <v-icon>mdi-eye-off</v-icon>
                </v-btn>
              </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              v-for="cameraItem in cameraItems"
              :key="cameraItem"
              class="pb-2"
            >
              <v-layout align-center justify-center>
                <v-flex xs4>
                  <p class="mt-1 mb-0 mr-4 pt-3">{{ cameraItem }}:</p>
                </v-flex>
                <v-flex xs8 d-flex class="align-center">
                  <v-text-field
                    :value="cameraSetting[cameraItem]"
                    hide-details="auto"
                    type="text"
                    readonly
                  />
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list-item>
    </v-card>
  </section>
</template>

<script>
export default {
  props: {
    cameraSetting: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      cameraItems: ['top', 'left', 'width', 'height'],
      showArea: false,
    }
  },
  computed: {
    showCamera() {
      return this.$store.state.layout.showCamera
    },
  },
  methods: {
    openEditDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    switchCamera() {
      this.$store.commit('layout/switchCamera')
    },
  },
}
</script>

<style scoped lang="scss">
.camera-menu {
  &__wrap {
    padding: 24px 0;
  }
}

.color-pallet {
  width: 26px;
  height: 20px;
  border-radius: 50%;
  border: thin solid #d2d2d2;
  margin: 20px 8px 0 0;
}
</style>
