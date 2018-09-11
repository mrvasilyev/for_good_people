<template>
  <div class="uk-container-expand">
    <div class="uk-card uk-card-default uk-card-body uk-card-default uk-text-left" style="z-index: 980;" uk-sticky="offset: 0; bottom: #top">
      <a class="uk-link-reset uk-text-uppercase" @click="navigateTo({name: 'root'})"><span>Сервис для хороших людей 1.0</span></a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
