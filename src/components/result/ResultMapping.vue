<template>
  <section>
    <p class="result__title">Map</p>
    <div
      class="result__map"
      :style="{
        'background-color': baseColor,
        'background-image': `url(${backgroundImage})`,
        height: String(settings.base.height) + 'px',
        width: String(settings.base.width) + 'px',
      }"
    />
    <div
      v-if="count !== null"
      class="result__camera"
      :style="{
        'background-color': cameraColor,
        height: String(camera.height) + 'px',
        width: String(camera.width) + 'px',
        left: String(camera.left) + 'px',
        top: String(camera.top + 66) + 'px',
      }"
    >
      <div
        :style="{
          'margin-top': String(camera.height / 2 - 40) + 'px',
        }"
      >
        <v-icon size="40">mdi-account</v-icon>{{ count }}
      </div>
    </div>
  </section>
</template>

<script>
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
      camera: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      cameraColor: '',
    }
  },
  computed: {
    baseColor() {
      return this.settings.base?.color?.hexa || '#fff'
    },
    showCamera() {
      return this.$store.state.layout.showCamera
    },
    backgroundImage() {
      return this.settings.base?.image ? this.settings.base.image.url : ''
    },
  },
  watch: {
    count() {
      if (!this.count || this.count <= 10) {
        this.cameraColor = 'lime'
      } else if (this.count > 10 && this.count <= 20) {
        this.cameraColor = 'yellow'
      } else {
        this.cameraColor = 'red'
      }
    },
  },
  mounted() {
    this.setCameraAria()
  },
  methods: {
    setCameraAria() {
      const _settings = this.settings?.camera
      if (!_settings) return
      this.camera.left = _settings.left
      this.camera.top = _settings.top
      this.camera.width = _settings.width
      this.camera.height = _settings.height
    },
  },
}
</script>

<style scoped lang="scss">
.result {
  &__title {
    text-align: center;
    font-size: 52px;
    font-weight: bold;
    font-family: serif;
    margin: 30px 0 30px 0 !important;
  }
  &__map {
    background-size: cover;
  }
  &__camera {
    position: absolute;
    opacity: 0.6;
    border-radius: 12px;
    text-align: center;
    font-size: 40px;
  }
}
</style>
