<template>
  <section>
    <monitor-layout class="monitor-layout" />
  </section>
</template>

<script>
import MonitorLayout from '~/components/monitor/MonitorLayout.vue'

export default {
  components: {
    MonitorLayout,
  },
}
</script>

<style lang="scss">
.monitor-layout {
  width: 100%;
}
</style>
