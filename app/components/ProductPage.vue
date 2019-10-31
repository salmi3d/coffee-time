<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <GridLayout class="container" rows="auto, *">

      <ActionBar row="0"/>

      <ScrollView row="1">

        <GridLayout rows="auto,auto,auto,*,auto" class="product-card">

          <Image row="0" :src="cafeProduct.imagesPath" class="product-card__image"/>

          <FlexboxLayout row="1" alignItems="center">
            <Label :text="cafeProduct.name" class="product-card__name"/>
            <Label class="fa product-card__favorite"
              :text="cafeProduct.favorite ? 'fa-heart' : 'fa-heart-o' | fonticon"
              :class="{ 'product-card__favorite_active': cafeProduct.favorite }"
            />
          </FlexboxLayout>

          <GridLayout row="2" rows="auto" columns="auto,auto,auto,auto,auto" class="product-card__ingredients-wrapper">

            <StackLayout col="0" class="product-card__ingredient">
              <Image src="~/assets/img/icon_milk.png" class="product-card__ingredient-icon"/>
              <Label text="15 ml" class="product-card__ingredient-text"/>
            </StackLayout>

            <StackLayout col="1" class="product-card__ingredient">
              <Image src="~/assets/img/icon_coffe.png" class="product-card__ingredient-icon"/>
              <Label text="25 %" class="product-card__ingredient-text"/>
            </StackLayout>

            <StackLayout col="2" class="product-card__ingredient">
              <Image src="~/assets/img/icon_water.png" class="product-card__ingredient-icon"/>
              <Label text="25 ml" class="product-card__ingredient-text"/>
            </StackLayout>

            <StackLayout col="3" class="product-card__ingredient">
              <Image src="~/assets/img/icon_temperature.png" class="product-card__ingredient-icon"/>
              <Label text="95 °C" class="product-card__ingredient-text"/>
            </StackLayout>

            <StackLayout col="4" class="product-card__ingredient">
              <Image src="~/assets/img/icon_pressure.png" class="product-card__ingredient-icon"/>
              <Label text="15 b" class="product-card__ingredient-text"/>
            </StackLayout>

          </GridLayout>

          <TextView row="3" class="product-card__description"
            editable="false"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error placeat ipsam suscipit vero, labore dignissimos praesentium."
          />

          <FlexboxLayout row="4" alignItems="center">
            <Label :text="cafeProduct.price" class="product-card__price"/>
            <Label :text="'fa-rub' | fonticon" class="fa product-card__price-sign"/>
            <Button class="product-card__order-button" text="ORDER NOW" @tap="onOrderButtonTap"/>
          </FlexboxLayout>

        </GridLayout>

      </ScrollView>

    </GridLayout>
  </Page>
</template>

<script>
import ActionBar from './ActionBar'
import alert from '../utils/alert'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductPage',
    components: {
      ActionBar,
    },
    data() {
      return {

      }
    },
    props: ['id'],
    watch: {
      'this.id': {
        handler(id) {
          this.$store.commit('setActiveCafeProduct', this.id)
        },
        immediate: true
      }
    },
    computed: {
      ...mapGetters(['cafeProduct']),
    },
    mounted() {
      // eslint-disable-next-line no-console
      console.log(`productId=${this.id}`)
      // this.fetchCafeProducts()
    },
    methods: {
      onOrderButtonTap() {
        alert(`${this.cafeProduct.name} was ordered!`)
      }
    },
}
</script>
