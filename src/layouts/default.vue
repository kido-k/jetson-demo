<template>
  <v-app>
    <nuxt class="application" />
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
::v-deep .v-application--wrap {
  width: 100%;
  max-width: unset;
}
body {
  width: 100%;
}
.application {
  width: 100%;
}
</style>
