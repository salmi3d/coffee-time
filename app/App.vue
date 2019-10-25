<template>
  <Navigator :defaultRoute="$backendService.isLoggedIn() ? '/home' : '/login'"/>
</template>
<script>
  import Vue from 'nativescript-vue'

  const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env

  export default {

    data() {
      return {
        msg: `Mode=${VUE_APP_MODE} and Platform=${VUE_APP_PLATFORM}`,
      }
    }

  }
</script>
