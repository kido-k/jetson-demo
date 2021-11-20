<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Edit Base</span>
    </v-card-title>
    <v-card-text class="pb-0">
      <v-container>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0">width:</p>
          </v-flex>
          <v-flex xs9>
            <v-text-field
              v-model="width"
              width="250"
              hide-details="auto"
              type="number"
            />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0">height:</p>
          </v-flex>
          <v-flex xs9>
            <v-text-field
              v-model="height"
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
        <v-file-input
          v-model="inputFile"
          show-size
          label="File input"
          @change="uploadImage"
        />
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
      width: 16000,
      height: 9000,
      inputFile: null,
      image: null,
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
      this.width = this.setting.width
      this.height = this.setting.height
      this.baseColor = this.setting.color
      this.image = this.setting.image
      this.inputFile = this.image
    },
    uploadImage(file) {
      if (file) {
        const storageRef = this.$firebase
          .storage()
          .ref(`setting/base/image/${file.name}`)
        storageRef.put(file).then(() => {
          this.$firebase
            .storage()
            .ref(`setting/base/image/${file.name}`)
            .getDownloadURL()
            .then((url) => {
              this.image = {
                url,
                name: file.name,
                type: file.type,
                size: file.size,
              }
            })
            .catch((error) => {
              throw error
            })
        })
      } else {
        const deleteRef = this.$firebase
          .storage()
          .ref(`setting/base/image/${this.image.name}`)
        deleteRef
          .delete()
          .then(() => {
            this.image = null
            this.inputFile = null
          })
          .catch((error) => {
            throw error
          })
      }
    },
    saveParts() {
      const ref = this.$firebase.database().ref(`setting/base/`)
      ref
        .set({
          width: this.width,
          height: this.height,
          color: this.baseColor,
          image: this.image,
        })
        .then(() => {
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
