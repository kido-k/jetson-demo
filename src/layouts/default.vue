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
  max-width: unset;
}
</style>
