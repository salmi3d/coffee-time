<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <GridLayout class="container" rows="auto, *">

      <ActionBar row="0"/>

      <PullToRefresh row="1" @refresh="refreshPage">
        <ScrollView>
          <StackLayout>

            <GridLayout rows="*,auto" class="cafe-card">

              <GridLayout row="0" rowSpan="2">
                <Image :src="cafe.images"/>
                <StackLayout class="cafe-card__gradient"/>
              </GridLayout>

              <StackLayout row="1" class="cafe-card__info">
                <Label :text="cafe.name" class="cafe-card__name"/>
                <GridLayout columns="*,auto">
                  <Label col="0" :text="cafe.address" class="cafe-card__address"/>
                  <Label col="1" class="fa cafe-card__favorite-filter"
                    :text="filterFavoriteProducts ? 'fa-heart' : 'fa-heart-o' | fonticon"
                    @tap="onFavoriteFilterTap"
                    :class="{ 'cafe-card__favorite-filter_active': filterFavoriteProducts }"
                  />
                </GridLayout>
              </StackLayout>

            </GridLayout>

            <WrapLayout class="products-wrapper">

              <WrapLayout width="50%"
                v-for="product in cafeProducts"
                :key="product.id"
                v-show="(filterFavoriteProducts && product.favorite) || !filterFavoriteProducts"
                @tap="onCafeProductTap(product.id)"
              >

                <GridLayout class="product-info" columns="auto,auto,*" rows="auto,auto,*,auto">
                  <Label row="0" colSpan="3" :text="product.name" class="product-info__name"/>
                  <Label row="1" colSpan="3" text="coffee drink" class="product-info__subname"/>
                  <Image row="2" colSpan="3" :src="product.imagesPath" class="product-info__thumb"/>
                  <Label row="3" col="0" :text="`${product.price} `" class="product-info__price"/>
                  <Label row="3" col="1" :text="'fa-rub' | fonticon" class="fa product-info__price-sign"/>
                  <Label row="3" col="2" class="fa product-info__favorite"
                    :text="product.favorite ? 'fa-heart' : 'fa-heart-o' | fonticon"
                    :class="{ 'product-info__favorite_active': product.favorite }"
                    @tap="onProductFavoriteTap(product)"
                    :ref="`favorite_${product.id}`"
                  />
                </GridLayout>

              </WrapLayout>

            </WrapLayout>

          </StackLayout>
        </ScrollView>
      </PullToRefresh>

    </GridLayout>
  </Page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ActionBar from './ActionBar'
import animations from '../utils/animations'

export default {
  name: 'CafePage',
  components: {
    ActionBar,
  },
  data() {
    return {
      ignoreTap: false,
    }
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
    ...mapState(['cafeProducts', 'filterFavoriteProducts']),
    ...mapGetters(['cafe']),
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(`cafeId=${this.id}`)
    this.fetchCafeProducts()
  },
  mixins: [ animations.Heartbeat ],
  methods: {
    ...mapActions(['fetchCafeProducts']),
    onCafeProductTap(id) {
      if (this.ignoreTap) {
        this.ignoreTap = false
        return
      }
      this.$navigator.navigate('/product', {
        props: { id }
      })
    },
    onProductFavoriteTap(product) {
      this.ignoreTap = true
      this.$store.dispatch('toggleCafeProductFavorite', product).then(() => {
        if(!product.favorite) {
          return
        }
        this.playHeartbeatAnimation(this.$refs[`favorite_${product.id}`][0])
      })
    },
    onFavoriteFilterTap() {
      this.$store.commit('toggleFilterFavoriteProducts')
    },
    refreshPage(args) {
      var pullRefresh = args.object
      this.fetchCafeProducts().then(() => {
        setTimeout(() => pullRefresh.refreshing = false, 100)
      })
    }
  }
}
</script>
