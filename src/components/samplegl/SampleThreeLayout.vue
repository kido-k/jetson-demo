<template>
  <section class="artwork">
    <div>
      <ul v-for="model in models" :key="model">
        <li @click="setSelectModel(model)">{{ model }}</li>
      </ul>
    </div>
    <canvas ref="canvas" class="artwork__canvas"></canvas>
  </section>
</template>

<script>
import WebGL from '~/assets/sample_gl/webGL'
import eventBus from '~/utils/event-bus'

export default {
  name: 'Artwork',
  data() {
    return {
      selectModel: null,
      models: ['sphere', 'twist', 'donuts'],
    }
  },
  watch: {
    selectModel() {
      eventBus.$emit('TRANSITION', this.selectModel)
    },
  },
  mounted() {
    if (!this.webGL) {
      this.webGL = new WebGL({
        $canvas: this.$refs.canvas,
      })
    }
    eventBus.$emit('TRANSITION', this.selectModel)
  },
  methods: {
    setSelectModel(model) {
      this.selectModel = model
    },
  },
}
</script>
<style>
.artwork {
  width: 100%;
  height: 100%;
  background: #eaf2f5;
}
</style>
