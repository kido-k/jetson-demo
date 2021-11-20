<template>
  <section class="wrap">
    <tab />
    <setting-layout />
  </section>
</template>

<script>
import Tab from '~/components/common/Tab.vue'
import SettingLayout from '@/components/setting/SettingLayout.vue'

export default {
  components: {
    Tab,
    SettingLayout,
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
  background-color: #ececec;
}
</style>
