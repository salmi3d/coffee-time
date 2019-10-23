<template>
  <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <StackLayout class="container">
      <action-bar text="CoffeeTime" :back="false"/>

      <ScrollView style="height: 100%">
        <StackLayout>

        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ActionBar from "./ActionBar"

  export default {
    name: 'HomePage',
    components: {
      ActionBar,
    },
    computed: {
      ...mapState(['cafes'])
    },
    created() {
      this.fetchCafes();
    },
    methods: {
      ...mapActions(['fetchCafes']),
    }

  }
</script>
