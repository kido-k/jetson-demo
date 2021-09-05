<template>
  <div class="person">
    <span class="person__number">
      {{ personNumber }}
    </span>
    <span class="person__sub">人</span>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      personNumber: 0,
    }
  },
  computed: {},
  watch: {
    results: {
      handler() {
        this.setPersonNumber()
      },
      deep: true,
    },
  },
  mounted() {
    this.setPersonNumber()
  },
  methods: {
    setPersonNumber() {
      const ref = this.$firebase.database().ref(`results/current`)
      ref.on('value', (snapshot) => {
        if (!snapshot?.val()) return
        this.personNumber = Number(snapshot.val().person)
      })
    },
  },
}
</script>

<style lang="scss">
.person {
  text-align: center;
  margin: 120px 0 0 0;
  &__number {
    font-size: 80px;
    font-weight: bold;
    font-family: serif;
    font-style: italic;
    margin: 0 0 0 20px;
  }
  &__sub {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.3);
    font-weight: bold;
    font-family: serif;
    font-style: italic;
  }
}
</style>
