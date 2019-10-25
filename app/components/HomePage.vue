<template>
  <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <ScrollView>
      <StackLayout class="container">
        <action-bar text="CoffeeTime" :back="false"/>

        <ScrollView style="height:100%">
          <StackLayout>

          </StackLayout>
        </ScrollView>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ActionBar from './ActionBar'

  export default {
    name: 'HomePage',
    components: {
      ActionBar,
    },
    data() {
      return {
        cafes: [],
      }
    },
    computed: {
      // ...mapState(['cafes'])
    },
    mounted() {
      // eslint-disable-next-line no-console
      console.log(this.$backendService.token)
      // this.fetchCafes()
      this.axios
        .post('/Cafe/GetAll', JSON.stringify(this.$backendService.token))
        .then(response => {
          this.cafes = response.data
          console.log(this.cafes)
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
      ...mapActions(['fetchCafes']),
    }

  }
</script>
