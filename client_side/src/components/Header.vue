<template>
  <div class="uk-container-expand">
    <div class="uk-card uk-card-default uk-card-body uk-card-default uk-text-left uk-flex-middle uk-flex" style="z-index: 980;" uk-sticky="offset: 0; bottom: #top">
      <svg width="28" height="34" viewBox="0 0 28 34" xmlns="http://www.w3.org/2000/svg" class="uk-margin-small-right uk-svg">
        <polygon fill="blue" points="19.1,4.1 13.75,1 8.17,4.45 13.6,7.44 "></polygon>
        <path fill="black" d="M21.67,5.43l-5.53,3.34l6.26,3.63v9.52l-8.44,4.76L5.6,21.93v-7.38L0,11.7v13.51l13.75,8.08L28,25.21V9.07 L21.67,5.43z"></path>
      </svg>
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
