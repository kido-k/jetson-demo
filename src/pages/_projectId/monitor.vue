<template>
  <section>
    <tab />
    <result-layout class="result-layout" />
  </section>
</template>

<script>
import Tab from '~/components/common/Tab.vue'
import ResultLayout from '~/components/result/ResultLayout.vue'

export default {
  components: {
    Tab,
    ResultLayout,
  },
}
</script>

<style lang="scss">
.result-layout {
  width: 100%;
}
</style>
