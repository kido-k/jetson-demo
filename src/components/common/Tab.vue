<template>
  <v-tabs
    v-model="tab"
    background-color="deep-purple accent-4"
    centered
    dark
    icons-and-text
  >
    <v-tabs-slider></v-tabs-slider>
    <v-tab href="#setting" @click="toOtherPage('setting')">
      Layout
      <v-icon>mdi-map</v-icon>
    </v-tab>
    <v-tab href="#preview" @click="toOtherPage('preview')">
      Preview
      <v-icon>mdi-printer-3d</v-icon>
    </v-tab>
    <v-tab href="#monitor" @click="toOtherPage('monitor')">
      Monitor
      <v-icon>mdi-monitor</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      tab: 'setting',
    }
  },
  mounted() {
    const path = this.$route.path
    if (path.match(/setting/)) {
      this.tab = 'setting'
    } else if (path.match(/preview/)) {
      this.tab = 'preview'
    } else {
      this.tab = 'monitor'
    }
  },
  methods: {
    toOtherPage(page) {
      this.$router.push(page)
    },
  },
}
</script>
