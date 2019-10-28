<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <GridLayout class="container" rows="auto, auto, *">

      <action-bar row="0"/>

      <GridLayout row="1" rows="*,auto,auto,auto,auto" class="cafe-info">

        <GridLayout rowSpan="5">
          <Image :src="cafe.images"/>
          <StackLayout class="cafe-info__gradient"/>
        </GridLayout>

        <StackLayout row="4">
          <Label :text="cafe.name" class="cafe-info__name"/>
          <Label :text="cafe.address" class="cafe-info__address"/>
        </StackLayout>

      </GridLayout>

    </GridLayout>
  </Page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ActionBar from './ActionBar'

export default {
  name: 'CafePage',
  components: {
    ActionBar,
  },
  props: ['id'],
  watch: {
    'this.id': {
      handler(id) {
        this.$store.commit('setActiveCafe', this.id)
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['cafe'])
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.id)
  },
  methods: {

  }
}
</script>

<style lang="scss">
.cafe-info {
  &__name,
  &__address {
    margin-left: 16;
  }
  &__name {
    font-family: Lobster-Regular;
    font-size: 28;
    color: #474747;
    line-height: 30;
  }
  &__address {
    font-family: SFUIText-Regular;
    font-size: 18;
    color: #717171;
  }
  &__gradient {
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,1));
  }
}

</style>
