<template>
  <div class="d-flex justify-content-center align-items-center flex-column font-color-darkblue" style="height: 100vh">
    <h1>404</h1>
    <h3>Page not found</h3>
    <button type="button" class="btn btn-secondary text-capitalize mt-3" @click="goHome">home page</button>
  </div>
</template>

<script>
export default {
  name: 'pageNotFound',
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
