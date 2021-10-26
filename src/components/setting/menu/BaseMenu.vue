<template>
  <section v-if="baseSetting">
    <v-card class="base-menu__wrap" flat>
      <v-list-item>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header class="justify-between">
              <p class="ma-0">base</p>
              <v-layout>
                <v-btn icon @click.stop="openEditDialog()">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              v-for="baseItem in baseItems"
              :key="baseItem"
              class="pb-2"
            >
              <v-layout align-center justify-center>
                <v-flex xs4>
                  <p class="mt-1 mb-0 mr-4 pt-3">{{ baseItem }}:</p>
                </v-flex>
                <v-flex xs8 d-flex class="align-center">
                  <template v-if="baseItem === 'color'">
                    <div
                      class="color-pallet"
                      :style="{
                        'background-color': baseSetting[baseItem].hexa,
                      }"
                    />
                    <v-text-field
                      :value="baseSetting[baseItem].hexa"
                      hide-details="auto"
                      type="text"
                      readonly
                    />
                  </template>
                  <v-text-field
                    v-else
                    :value="baseSetting[baseItem]"
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
    <v-dialog v-model="dialog" width="400" persistent>
      <base-dialog :setting="baseSetting" @close="closeDialog" />
    </v-dialog>
  </section>
</template>

<script>
import BaseDialog from './BaseDialog.vue'

export default {
  components: {
    BaseDialog,
  },
  props: {
    baseSetting: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      baseItems: ['size', 'color'],
      dialog: false,
    }
  },
  computed: {},
  methods: {
    openEditDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
  },
}
</script>

<style scoped lang="scss">
.base-menu {
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
