<template>
  <div class="uk-container">
    <div class="uk-section uk-flex uk-flex-center@m uk-flex-middle" uk-height-viewport="offset-top: true">
      <div uk-grid>
        <div class="uk-width-1-1@m uk-text-center">
          <img src="../../images/bacteria-logo.png" width="80" height="80">
        </div>
        <div class="uk-width-1-1@m">
          <h1 class="uk-text-center">Этот веб-организм придуман хорошими людьми для хороших людей</h1>
        </div>
        <div class="uk-width-1-1@m uk-align-center">
          <button class="uk-button uk-button-default uk-align-center" @click="navigateTo({name:'check'})">ПОПРОБОВАТЬ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style>
</style>
