<template>
  <div class="button-group">
    <div>
      <v-btn
        fab
        depressed
        :color="type === 'number' ? 'indigo' : 'gray'"
        @click="changeType('number')"
      >
        <v-icon :color="type === 'number' ? 'white' : 'black'">
          mdi-account
        </v-icon>
      </v-btn>
    </div>
    <div>
      <v-btn
        fab
        depressed
        :color="type === 'graph' ? 'indigo' : 'gray'"
        @click="changeType('graph')"
      >
        <v-icon :color="type === 'graph' ? 'white' : 'black'">
          mdi-chart-bar
        </v-icon>
      </v-btn>
    </div>
    <div>
      <v-btn
        fab
        depressed
        :color="type === 'mapping' ? 'indigo' : 'gray'"
        @click="changeType('mapping')"
      >
        <v-icon :color="type === 'mapping' ? 'white' : 'black'">
          mdi-map-marker-multiple
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'number',
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    changeType(type) {
      this.$emit('setType', type)
    },
  },
}
</script>

<style lang="scss">
.button-group {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
