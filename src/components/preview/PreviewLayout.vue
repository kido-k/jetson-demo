<template>
  <section class="web-gl">
    <v-layout justify-end align-center>
      <!-- <v-btn @click="test">test</v-btn> -->
      <v-btn @click="stop">stop</v-btn>
    </v-layout>
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
      settings: null,
      interval: null,
      positions: [
        [
          { x: 0, y: 10, z: 300 },
          { x: 0, y: 10, z: 350 },
          { x: 0, y: 10, z: 400 },
          { x: 0, y: 10, z: 450 },
          { x: 0, y: 10, z: 500 },
          { x: 0, y: 10, z: 550 },
        ],
        [
          { x: 50, y: 10, z: 300 },
          { x: 50, y: 10, z: 350 },
          { x: 50, y: 10, z: 400 },
          { x: 50, y: 10, z: 450 },
          { x: 50, y: 10, z: 500 },
          { x: 50, y: 10, z: 550 },
        ],
        [
          { x: 100, y: 10, z: 300 },
          { x: 100, y: 10, z: 350 },
          { x: 100, y: 10, z: 400 },
          { x: 100, y: 10, z: 450 },
          { x: 100, y: 10, z: 500 },
          { x: 100, y: 10, z: 550 },
        ],
        [
          { x: 150, y: 10, z: 300 },
          { x: 150, y: 10, z: 350 },
          { x: 150, y: 10, z: 400 },
          { x: 150, y: 10, z: 450 },
          { x: 150, y: 10, z: 500 },
          { x: 150, y: 10, z: 550 },
        ],
        [
          { x: 200, y: 10, z: 300 },
          { x: 200, y: 10, z: 350 },
          { x: 200, y: 10, z: 400 },
          { x: 200, y: 10, z: 450 },
          { x: 200, y: 10, z: 500 },
          { x: 200, y: 10, z: 550 },
        ],
        [
          { x: 250, y: 10, z: 300 },
          { x: 250, y: 10, z: 350 },
          { x: 250, y: 10, z: 400 },
          { x: 250, y: 10, z: 450 },
          { x: 250, y: 10, z: 500 },
          { x: 250, y: 10, z: 550 },
        ],
        [
          { x: 300, y: 10, z: 100 },
          { x: 300, y: 10, z: 150 },
          { x: 300, y: 10, z: 200 },
          { x: 300, y: 10, z: 250 },
          { x: 300, y: 10, z: 300 },
          { x: 300, y: 10, z: 350 },
        ],
        [
          { x: 350, y: 10, z: 100 },
          { x: 350, y: 10, z: 150 },
          { x: 350, y: 10, z: 200 },
          { x: 350, y: 10, z: 250 },
          { x: 350, y: 10, z: 300 },
          { x: 350, y: 10, z: 350 },
        ],
        [
          { x: 400, y: 10, z: 100 },
          { x: 400, y: 10, z: 150 },
          { x: 400, y: 10, z: 200 },
          { x: 400, y: 10, z: 250 },
          { x: 400, y: 10, z: 300 },
          { x: 400, y: 10, z: 350 },
        ],
        [
          { x: 450, y: 10, z: 100 },
          { x: 450, y: 10, z: 150 },
          { x: 450, y: 10, z: 200 },
          { x: 450, y: 10, z: 250 },
          { x: 450, y: 10, z: 300 },
          { x: 450, y: 10, z: 350 },
        ],
        [
          { x: 500, y: 10, z: 100 },
          { x: 500, y: 10, z: 150 },
          { x: 500, y: 10, z: 200 },
          { x: 500, y: 10, z: 250 },
          { x: 500, y: 10, z: 300 },
          { x: 500, y: 10, z: 350 },
        ],
        [
          { x: 550, y: 10, z: 100 },
          { x: 550, y: 10, z: 150 },
          { x: 550, y: 10, z: 200 },
          { x: 550, y: 10, z: 250 },
          { x: 550, y: 10, z: 300 },
          { x: 550, y: 10, z: 350 },
        ],
        [
          { x: 600, y: 10, z: 100 },
          { x: 600, y: 10, z: 150 },
          { x: 600, y: 10, z: 200 },
          { x: 600, y: 10, z: 250 },
          { x: 600, y: 10, z: 300 },
          { x: 600, y: 10, z: 350 },
        ],
        [
          { x: 650, y: 10, z: 100 },
          { x: 650, y: 10, z: 150 },
          { x: 650, y: 10, z: 200 },
          { x: 650, y: 10, z: 250 },
          { x: 650, y: 10, z: 300 },
          { x: 650, y: 10, z: 350 },
        ],
        [
          { x: 700, y: 10, z: 100 },
          { x: 700, y: 10, z: 150 },
          { x: 700, y: 10, z: 200 },
          { x: 700, y: 10, z: 250 },
          { x: 700, y: 10, z: 300 },
          { x: 700, y: 10, z: 350 },
        ],
        [
          { x: 750, y: 10, z: 100 },
          { x: 750, y: 10, z: 150 },
          { x: 750, y: 10, z: 200 },
          { x: 750, y: 10, z: 250 },
          { x: 750, y: 10, z: 300 },
          { x: 750, y: 10, z: 350 },
        ],
        [
          { x: 800, y: 10, z: 100 },
          { x: 800, y: 10, z: 150 },
          { x: 800, y: 10, z: 200 },
          { x: 800, y: 10, z: 250 },
          { x: 800, y: 10, z: 300 },
          { x: 800, y: 10, z: 350 },
        ],
        [
          { x: 850, y: 10, z: 100 },
          { x: 850, y: 10, z: 150 },
          { x: 850, y: 10, z: 200 },
          { x: 850, y: 10, z: 250 },
          { x: 850, y: 10, z: 300 },
          { x: 850, y: 10, z: 350 },
        ],
        [
          { x: 900, y: 10, z: 100 },
          { x: 900, y: 10, z: 150 },
          { x: 900, y: 10, z: 200 },
          { x: 900, y: 10, z: 250 },
          { x: 900, y: 10, z: 300 },
          { x: 900, y: 10, z: 350 },
        ],
        [
          { x: 950, y: 10, z: 100 },
          { x: 950, y: 10, z: 150 },
          { x: 950, y: 10, z: 200 },
          { x: 950, y: 10, z: 250 },
          { x: 950, y: 10, z: 300 },
          { x: 950, y: 10, z: 350 },
        ],
        [
          { x: 1000, y: 10, z: 100 },
          { x: 1000, y: 10, z: 150 },
          { x: 1000, y: 10, z: 200 },
          { x: 1000, y: 10, z: 250 },
          { x: 1000, y: 10, z: 300 },
          { x: 1000, y: 10, z: 350 },
        ],
        [],
      ],
    }
  },
  mounted() {
    this.setSettings()
  },
  methods: {
    setSettings() {
      const ref = this.$firebase.database().ref('setting')
      ref.on('value', (snapshot) => {
        if (!snapshot?.val()) return
        this.settings = snapshot.val()
        this.setWebGl()
      })
    },
    setWebGl() {
      if (!this.webGL) {
        this.webGL = new WebGL({
          $canvas: this.$refs.canvas,
          settings: this.settings,
          character: {
            number: 30,
            minX: 100,
            maxX: 1300,
            minZ: 250,
            maxZ: 450,
            maxV: 50,
            minV: -50,
          },
        })
      }
    },
    // test() {
    //   eventBus.$emit('setCoordinate', this.positions[this.count])
    //   this.interval = setInterval(() => {
    //     if (this.positions[this.count]) {
    //       eventBus.$emit('setCoordinate', this.positions[this.count])
    //       this.count += 1
    //     } else {
    //       clearInterval(this.interval)
    //     }
    //   }, 1000)
    // },
    stop() {
      eventBus.$emit('stop')
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
