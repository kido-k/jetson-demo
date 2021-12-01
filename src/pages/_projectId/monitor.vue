<template>
  <section>
    <tab />
    <result-layout />
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
