<template>
  <section class="wrap">
    <tab />
    <preview-layout />
  </section>
</template>

<script>
import Tab from '~/components/common/Tab.vue'
import PreviewLayout from '~/components/preview/PreviewLayout.vue'

export default {
  components: {
    Tab,
    PreviewLayout,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style scoped>
.wrap {
  height: 100%;
}
</style>
