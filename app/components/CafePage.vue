<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <GridLayout class="container" rows="auto, *">

      <ActionBar row="0"/>

      <ScrollView row="1">
        <StackLayout>

          <GridLayout rows="*,auto" class="cafe-card">

            <GridLayout rowSpan="2">
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

          <GridLayout columns="*,*" :rows="rows" class="products-wrapper">
            <!-- v-show="(filterFavoriteProducts && product.favorite) || !filterFavoriteProducts" -->
            <GridLayout class="product-info" columns="auto,auto,*" rows="auto,auto,*,auto"
              v-for="(product, index) in filteredCafeProducts"
              :key="product.id"
              :row="Math.floor(index / 2)"
              :col="index % 2"
              @tap="onCafeProductTap(product.id)"
            >
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

          </GridLayout>

        </StackLayout>
      </ScrollView>

    </GridLayout>
  </Page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ActionBar from './ActionBar'
import * as enums from 'ui/enums'

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
    rows() {
      const rows = [];
      for (let i = 0; i < this.filteredCafeProducts.length / 2; i++) {
          rows.push('auto');
      }
      return rows.join(',');
    },
    filteredCafeProducts() {
      return this.cafeProducts.filter(product => {
        if(this.filterFavoriteProducts) {
          return product.favorite === true
        }
        return true
      })
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(`cafeId=${this.id}`)
    this.fetchCafeProducts()
  },
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
      product.favorite = !product.favorite
      if(!product.favorite) {
        return
      }
      let view = this.$refs[`favorite_${product.id}`][0]
      view.nativeView
        .animate({
          scale: { x: 1.8, y: 1.8 },
          duration: 100,
          curve: enums.AnimationCurve.easeIn
        })
        .then(() => {
          view.nativeView.animate({
            scale: { x: 1, y: 1 },
            duration: 100,
            curve: enums.AnimationCurve.easeOut
          })
        })
    },
    onFavoriteFilterTap() {
      this.$store.commit('toggleFilterFavoriteProducts')
    }
  }
}
</script>
