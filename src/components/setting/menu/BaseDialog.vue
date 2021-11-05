<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Edit Base</span>
    </v-card-title>
    <v-card-text class="pb-0">
      <v-container>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0">size:</p>
          </v-flex>
          <v-flex xs9>
            <v-text-field
              v-model="size"
              width="250"
              hide-details="auto"
              type="number"
            />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">color:</p>
          </v-flex>
          <v-flex xs9>
            <v-color-picker
              v-model="baseColor"
              dot-size="20"
              hide-canvas
              hide-mode-switch
              mode="hexa"
              swatches-max-height="180"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="saveParts"> Save </v-btn>
      <v-btn text @click="closeDialog"> Close </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    setting: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      size: 10000,
      baseColor: {},
    }
  },
  mounted() {
    if (this.setting) {
      this.setEditItem()
    }
  },
  methods: {
    setEditItem() {
      this.size = this.setting.size
      this.baseColor = this.setting.color
    },
    saveParts() {
      const ref = this.$firebase.database().ref(`setting/base/`)
      ref
        .set({
          width: this.width,
          color: this.baseColor,
        })
        .then((doc) => {
          this.closeDialog()
        })
        .catch((error) => {
          this.closeDialog()
          throw error
        })
    },
    closeDialog() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="scss">
.setting-base {
  &__wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
