<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add Parts</span>
    </v-card-title>
    <v-card-text class="pb-0">
      <v-container>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="mb-0 mr-4">name:</p>
          </v-flex>
          <v-flex xs9>
            <v-text-field v-model="name" hide-details="auto" type="text" />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="mb-0 mr-4">type:</p>
          </v-flex>
          <v-flex xs9>
            <v-select v-model="type" :items="types" hide-details="auto" />
          </v-flex>
        </v-layout>
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
            <p class="ma-0 mr-4">height:</p>
          </v-flex>
          <v-flex xs9>
            <v-text-field v-model="height" hide-details="auto" type="number" />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">depth:</p>
          </v-flex>
          <v-flex xs9>
            <v-text-field v-model="depth" hide-details="auto" type="number" />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">x:</p>
          </v-flex>
          <v-flex xs9>
            <v-text-field v-model="x" hide-details="auto" type="number" />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">z:</p>
          </v-flex>
          <v-flex xs9>
            <v-text-field v-model="z" hide-details="auto" type="number" />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">color:</p>
          </v-flex>
          <v-flex xs9>
            <v-color-picker
              v-model="color"
              dot-size="20"
              hide-canvas
              hide-mode-switch
              mode="hexa"
              swatches-max-height="180"
            />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">front image:</p>
          </v-flex>
          <v-flex xs9>
            <v-file-input
              v-model="frontImageFile"
              show-size
              label="front image"
              @change="uploadImage($event, 'front')"
            />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">back image:</p>
          </v-flex>
          <v-flex xs9>
            <v-file-input
              v-model="backImageFile"
              show-size
              label="back image"
              @change="uploadImage($event, 'back')"
            />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">right image:</p>
          </v-flex>
          <v-flex xs9>
            <v-file-input
              v-model="rightImageFile"
              show-size
              label="right image"
              @change="uploadImage($event, 'right')"
            />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">left image:</p>
          </v-flex>
          <v-flex xs9>
            <v-file-input
              v-model="leftImageFile"
              show-size
              label="left image"
              @change="uploadImage($event, 'left')"
            />
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center class="pa-4">
          <v-flex xs3>
            <p class="ma-0 mr-4">top image:</p>
          </v-flex>
          <v-flex xs9>
            <v-file-input
              v-model="topImageFile"
              show-size
              label="top image"
              @change="uploadImage($event, 'top')"
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
    editItemKey: {
      type: String,
      default: null,
    },
    editItem: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      type: 'box',
      name: null,
      width: 100,
      height: 100,
      depth: 100,
      color: {},
      frontImage: null,
      backImage: null,
      rightImage: null,
      leftImage: null,
      topImage: null,
      frontImageFile: null,
      backImageFile: null,
      rightImageFile: null,
      leftImageFile: null,
      topImageFile: null,
      x: 0,
      z: 0,
      types: ['box', 'circle'],
    }
  },
  mounted() {
    if (this.editItem) {
      this.setEditItem()
    }
  },
  methods: {
    setEditItem() {
      this.type = this.editItem.type
      this.name = this.editItem.name
      this.width = this.editItem.width
      this.height = this.editItem.height
      this.depth = this.editItem.depth
      this.color = this.editItem.color
      this.frontImage = this.editItem.frontImage
      this.backImage = this.editItem.backImage
      this.rightImage = this.editItem.rightImage
      this.leftImage = this.editItem.leftImage
      this.topImage = this.editItem.topImage
      this.frontImageFile = this.editItem.frontImage
      this.backImageFile = this.editItem.backImage
      this.rightImageFile = this.editItem.rightImage
      this.leftImageFile = this.editItem.leftImage
      this.topImageFile = this.editItem.topImage
      this.x = this.editItem.x
      this.z = this.editItem.z
    },
    saveParts() {
      if (this.editItemKey) {
        this.editParts()
      } else {
        this.addParts()
      }
    },
    addParts() {
      const projectId = this.$route.params.projectId
      const ref = this.$firebase.database().ref(`project/${projectId}/setting`)
      ref
        .child('parts')
        .push({
          x: this.x,
          z: this.z,
          name: this.name,
          type: this.type,
          width: this.width,
          height: this.height,
          depth: this.depth,
          color: this.color,
          frontImage: this.frontImage,
          backImage: this.backImage,
          rightImage: this.rightImage,
          leftImage: this.leftImage,
          topImage: this.topImage,
        })
        .then(() => {
          this.closeDialog()
        })
        .catch((error) => {
          this.closeDialog()
          throw error
        })
    },
    editParts() {
      const projectId = this.$route.params.projectId
      const editData = {
        x: this.x,
        z: this.z,
        name: this.name,
        type: this.type,
        width: this.width,
        height: this.height,
        depth: this.depth,
        color: this.color,
      }
      if (this.frontImage) editData.frontImage = this.frontImage
      if (this.backImage) editData.backImage = this.backImage
      if (this.rightImage) editData.rightImage = this.rightImage
      if (this.leftImage) editData.leftImage = this.leftImage
      if (this.topImage) editData.topImage = this.topImage
      const ref = this.$firebase
        .database()
        .ref(`project/${projectId}/setting/parts/${this.editItemKey}`)
      ref
        .set(editData)
        .then(() => {
          this.closeDialog()
        })
        .catch((error) => {
          this.closeDialog()
          throw error
        })
    },
    uploadImage(file, position) {
      const projectId = this.$route.params.projectId
      if (file) {
        const path = `project/${projectId}/setting/parts/${position}/image/${file.name}`
        const storageRef = this.$firebase.storage().ref(path)
        storageRef.put(file).then(() => {
          this.$firebase
            .storage()
            .ref(path)
            .getDownloadURL()
            .then((url) => {
              const image = {
                url,
                name: file.name,
                type: file.type,
                size: file.size,
              }
              if (position === 'front') {
                this.frontImage = image
              } else if (position === 'back') {
                this.backImage = image
              } else if (position === 'right') {
                this.rightImage = image
              } else if (position === 'left') {
                this.leftImage = image
              } else if (position === 'top') {
                this.topImage = image
              }
            })
            .catch((error) => {
              throw error
            })
        })
      } else {
        let fileName = ''
        if (position === 'front') {
          fileName = this.frontImage.name
          this.frontImage = null
          this.frontImageFile = null
        } else if (position === 'back') {
          fileName = this.backImage.name
          this.backImage = null
          this.backImageFile = null
        } else if (position === 'right') {
          fileName = this.rightImage.name
          this.rightImage = null
          this.rightImageFile = null
        } else if (position === 'left') {
          fileName = this.leftImage.name
          this.leftImage = null
          this.leftImageFile = null
        } else if (position === 'top') {
          fileName = this.topImage.name
          this.topImage = null
          this.topImageFile = null
        }
        const path = `project/${projectId}/setting/parts/${position}/image/${fileName}`
        const deleteRef = this.$firebase.storage().ref(path)
        deleteRef
          .delete()
          .then(() => {})
          .catch((error) => {
            throw error
          })
      }
    },
    closeDialog() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="scss">
.setting-map {
  &__wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
