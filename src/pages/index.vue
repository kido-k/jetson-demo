<template>
  <section class="wrap">
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#setting">
        Setting
        <v-icon>mdi-cog</v-icon>
      </v-tab>
      <v-tab href="#preview">
        Preview
        <v-icon>mdi-file-find</v-icon>
      </v-tab>
    </v-tabs>
    <setting-layout v-if="tab === 'setting'" />
    <preview-layout v-else />
  </section>
</template>

<script>
import SettingLayout from '@/components/setting/SettingLayout.vue'
import PreviewLayout from '~/components/preview/PreviewLayout.vue'

export default {
  components: {
    SettingLayout,
    PreviewLayout,
  },
  data() {
    return {
      tab: 'setting',
    }
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
