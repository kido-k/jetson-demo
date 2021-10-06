<template>
  <section class="web-gl">
    <v-btn @click="test">test</v-btn>
    <canvas ref="canvas" class="web-gl__canvas"></canvas>
  </section>
</template>

<script>
import WebGL from '~/assets/gl/webGL'
import eventBus from '~/utils/event-bus'

export default {
  data() {
    return {
      count: 0,
      interval: null,
      base: {
        size: { x: 10000, y: 10, z: 10000 },
        color: 0x8a8a8a,
      },
      positions: [
        [{ x: 0, y: 10, z: 300 }],
        [{ x: 50, y: 10, z: 340 }],
        [{ x: 100, y: 10, z: 380 }],
        [{ x: 150, y: 10, z: 400 }],
        [{ x: 250, y: 10, z: 400 }],
        [{ x: 350, y: 10, z: 350 }],
        [{ x: 200, y: 10, z: 300 }],
        [{ x: 50, y: 10, z: 300 }],
        [{ x: 0, y: 10, z: 280 }],
        [{ x: 0, y: 10, z: 200 }],
        [{ x: -150, y: 10, z: 270 }],
        [{ x: -320, y: 10, z: 200 }],
        [{ x: -200, y: 10, z: 200 }],
        [{ x: -400, y: 10, z: 200 }],
        [],
      ],
    }
  },
  mounted() {
    if (!this.webGL) {
      this.webGL = new WebGL({
        $canvas: this.$refs.canvas,
        base: this.base,
      })
    }
  },
  destroyed() {},
  methods: {
    test() {
      eventBus.$emit('setCoordinate', this.positions[this.count])
      this.interval = setInterval(() => {
        if (this.positions[this.count]) {
          eventBus.$emit('setCoordinate', this.positions[this.count])
          this.count += 1
        } else {
          clearInterval(this.interval)
        }
      }, 1000)
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
