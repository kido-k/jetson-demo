<template>
  <section class="web-gl">
    <canvas ref="canvas" class="web-gl__canvas"></canvas>
  </section>
</template>

<script>
import WebGL from '~/assets/gl/webGL'
// import eventBus from '~/utils/event-bus'

export default {
  data() {
    return {}
  },
  mounted() {
    if (!this.webGL) {
      this.webGL = new WebGL({
        $canvas: this.$refs.canvas,
      })
    }
    // eventBus.$emit('TRANSITION', this.selectModel)
  },
  methods: {},
}
</script>
<style>
.web-gl {
  width: 100%;
  height: 100%;
  background: #eaf2f5;
}
</style>
