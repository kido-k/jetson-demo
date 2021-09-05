<template>
  <div class="button-group">
    <div>
      <v-btn
        fab
        depressed
        :color="!showGraph ? 'indigo' : 'gray'"
        @click="changeShowGraph(false)"
      >
        <v-icon :color="!showGraph ? 'white' : 'black'">mdi-account</v-icon>
      </v-btn>
    </div>
    <div>
      <v-btn
        fab
        depressed
        :color="showGraph ? 'indigo' : 'gray'"
        @click="changeShowGraph(true)"
      >
        <v-icon :color="showGraph ? 'white' : 'black'">mdi-chart-bar</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showGraph: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    changeShowGraph(showGraph) {
      this.$emit('setShowGraph', showGraph)
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
