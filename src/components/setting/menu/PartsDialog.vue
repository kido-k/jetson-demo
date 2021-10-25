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
      color: {},
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
      this.color = this.editItem.color
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
      const ref = this.$firebase.database().ref('setting')
      ref
        .child('parts')
        .push({
          x: this.x,
          z: this.z,
          name: this.name,
          type: this.type,
          width: this.width,
          height: this.height,
          color: this.color,
        })
        .then((doc) => {
          this.closeDialog()
        })
        .catch((error) => {
          this.closeDialog()
          throw error
        })
    },
    editParts() {
      const ref = this.$firebase
        .database()
        .ref(`setting/parts/${this.editItemKey}`)
      ref
        .set({
          x: this.x,
          z: this.z,
          name: this.name,
          type: this.type,
          width: this.width,
          height: this.height,
          color: this.color,
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
.setting-map {
  &__wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
