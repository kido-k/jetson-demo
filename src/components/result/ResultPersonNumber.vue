<template>
  <div class="person">
    <p class="person__title">Counter</p>
    <span class="person__number">
      {{ count || '-' }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
.person {
  text-align: center;
  margin: 60px 0 0 0;
  &__title {
    text-align: center;
    font-size: 52px;
    font-weight: bold;
    font-family: serif;
    margin: 0 0 60px 0 !important;
  }
  &__number {
    font-size: 80px;
    font-weight: bold;
    font-family: serif;
    font-style: italic;
    margin: 0 20px 0 0;
  }
}
</style>
