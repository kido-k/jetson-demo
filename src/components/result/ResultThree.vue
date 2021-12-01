<template>
  <section class="web-gl">
    <canvas ref="canvas" class="web-gl__canvas"></canvas>
  </section>
</template>

<script>
import WebGL from '~/assets/gl/webGL'
import eventBus from '~/utils/event-bus'

export default {
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
    count: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      results: null,
    }
  },
  watch: {
    count() {
      this.update()
    },
  },
  mounted() {
    this.setWebGl()
  },
  destroyed() {
    eventBus.$emit('stop')
  },
  methods: {
    setWebGl() {
      if (!this.webGL) {
        this.webGL = new WebGL({
          $canvas: this.$refs.canvas,
          settings: this.settings,
          character: {
            number: 0,
          },
        })
      }
    },
    update() {
      eventBus.$emit('setCharacter', this.count)
    },
  },
}
</script>

<style>
.web-gl {
  width: 100%;
  height: 100%;
  background: #eaf2f5;
}
</style>
