<template>
  <Navigator :defaultRoute="true ? '/home' : '/login'"/>
</template>
<script lang="ts">
  import { Vue } from 'vue-property-decorator'

  const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

  export default class App extends Vue {
    private msg: string = `Mode=${VUE_APP_MODE} and Platform=${VUE_APP_PLATFORM}`;

  }
</script>
