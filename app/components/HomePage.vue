<template>
  <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <GridLayout class="container" rows="auto, *">

      <action-bar row="0" text="CoffeeTime" :back="false"/>

      <ListView row="1" for="cafe in cafes" @itemTap="onCafeTap" class="cafe-list-item">
        <v-template>
          <GridLayout columns="120,*">
            <Image v-show="cafe.images.length > 0" :src="cafe.images" class="cafe-list-item__thumb"/>
            <StackLayout col="1" row="0" rowSpan="2">
              <Label :text="cafe.name" class="cafe-list-item__name"/>
              <Label text="address:" class="cafe-list-item__laddress"/>
              <Label :text="cafe.address" class="cafe-list-item__address"/>
              <Label text="more details  >" class="cafe-list-item__details"/>
            </StackLayout>
          </GridLayout>
        </v-template>
      </ListView>

    </GridLayout>
  </Page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ActionBar from './ActionBar'

export default {
  name: 'HomePage',
  components: {
    ActionBar,
  },
  computed: {
    ...mapState(['cafes'])
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.$backendService.token)
    this.fetchCafes()
  },
  methods: {
    ...mapActions(['fetchCafes']),
    onCafeTap(args) {
      alert(args.item.id)
    },
  }
}
</script>
