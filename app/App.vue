<template>
  <Navigator :defaultRoute="backendService.isLoggedIn() ? '/home' : '/login'"/>
</template>
<script lang="ts">
  import { Vue } from 'vue-property-decorator'
  import { backendService } from "./main"

  const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

  export default class App extends Vue {
    private msg: string = `Mode=${VUE_APP_MODE} and Platform=${VUE_APP_PLATFORM}`;
    private backendService: object = backendService;

  }
</script>
