<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <GridLayout class="container" rows="auto, *">

      <action-bar row="0"/>

      <ScrollView row="1">
        <StackLayout>

          <GridLayout rows="*,auto" class="cafe-info">

            <GridLayout rowSpan="2">
              <Image :src="cafe.images"/>
              <StackLayout class="cafe-info__gradient"/>
            </GridLayout>

            <StackLayout row="1" verticalAlignment="bottom">
              <Label :text="cafe.name" class="cafe-info__name"/>
              <Label :text="cafe.address" class="cafe-info__address"/>
            </StackLayout>

          </GridLayout>

          <GridLayout columns="*,*" :rows="rows" class="products-wrapper">

            <GridLayout class="product-info" columns="auto,auto,*" rows="auto,auto,*,auto"
              v-for="(product, index) in cafeProducts"
              :key="index"
              :row="index / 2"
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
    ...mapState(['cafeProducts']),
    ...mapGetters(['cafe']),
    rows() {
      const rows = [];
      for (let i = 0; i < this.cafeProducts.length / 2; i++) {
          rows.push('auto');
      }
      return rows.join(',');
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
      alert(id)
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
  }
}
</script>
