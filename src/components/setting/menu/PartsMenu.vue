<template>
  <section>
    <v-card class="setting-menu__wrap" flat>
      <v-list v-if="partsSettings" dense class="pb-8">
        <v-list-item class="justify-center">
          <v-btn color="primary" class="mt-4 mb-4" @click="dialog = true">
            add Parts
          </v-btn>
        </v-list-item>
        <v-list-item
          v-for="(key, index) in Object.keys(partsSettings)"
          :key="index"
        >
          <v-card class="item__card">
            <v-layout align-center justify-space-around>
              <p class="ma-0">{{ partsSettings[key].name }}</p>
              <div style="display: flex">
                <v-btn
                  icon
                  @click.stop="openEditDialog(key, partsSettings[key])"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click.stop="deleteParts(key)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon @click.stop="copyParts(partsSettings[key])">
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </div>
            </v-layout>
          </v-card>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog v-if="dialog" v-model="dialog" width="400" persistent>
      <parts-dialog
        :editItemKey="editItemKey"
        :editItem="editItem"
        @close="closeDialog"
      />
    </v-dialog>
  </section>
</template>

<script>
import PartsDialog from './PartsDialog.vue'

export default {
  components: {
    PartsDialog,
  },
  props: {
    partsSettings: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      partsItems: [
        'name',
        'type',
        'width',
        'depth',
        'height',
        'color',
        'x',
        'z',
      ],
      dialog: false,
      editItemKey: null,
      editItem: null,
    }
  },
  computed: {},
  methods: {
    openEditDialog(key, setting) {
      this.editItemKey = key
      this.editItem = setting
      this.dialog = true
    },
    closeDialog() {
      this.editItemKey = null
      this.editItem = null
      this.dialog = false
    },
    copyParts(setting) {
      const _setting = Object.assign({}, setting)
      _setting.name = _setting.name + ' copy'
      const ref = this.$firebase.database().ref('setting')
      ref
        .child('parts')
        .push(_setting)
        .then((doc) => {
          this.closeDialog()
        })
        .catch((error) => {
          this.closeDialog()
          throw error
        })
    },
    deleteParts(key) {
      this.$firebase.database().ref('setting/parts').child(key).remove()
    },
  },
}
</script>

<style scoped lang="scss">
.item {
  &__card {
    padding: 16px;
    width: 100%;
  }
}

.color-pallet {
  width: 24px;
  height: 20px;
  border-radius: 50%;
  margin: 20px 8px 0 0;
  border: thin solid #d2d2d2;
}
</style>
