<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <GridLayout class="container" rows="auto, *">

      <ActionBar row="0"/>

      <ScrollView row="1">

        <GridLayout rows="auto,auto,auto,*,auto" columns="*,*,4*" class="product-card">
          <Image row="0" colSpan="3" :src="cafeProduct.imagesPath" class="product-card__image"/>
          <Label row="1" colSpan="2" :text="cafeProduct.name" class="product-card__name"/>
          <Label row="1" col="2" class="fa product-card__favorite"
            :text="cafeProduct.favorite ? 'fa-heart' : 'fa-heart-o' | fonticon"
            :class="{ 'product-card__favorite_active': cafeProduct.favorite }"
          />

          <GridLayout row="2" colSpan="3" rows="auto" columns="auto,auto,auto,auto,auto">

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

          <TextView row="3" colSpan="3" class="product-card__description"
            editable="false"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error placeat ipsam suscipit vero, labore dignissimos praesentium."
          />
          <Label row="4" col="0" :text="cafeProduct.price" class="product-card__price"/>
          <Label row="4" col="1" :text="'fa-rub' | fonticon" class="fa product-card__price-sign"/>
          <Button row="4" col="2" class="product-card__order-button" text="ORDER NOW" @tap="onOrderButtonTap"/>
        </GridLayout>

      </ScrollView>

    </GridLayout>
  </Page>
</template>

<script>
import ActionBar from './ActionBar'
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
        alert(this.cafeProduct.name)
      }
    },
}
</script>

<style lang="scss">
.product-card {
  padding: 10;

  &__image {
    margin-bottom: 5;
  }

  &__name {
    font-family: Lobster-Regular;
    font-size: 24;
    color: #474747;
    margin-bottom: 10;
    // border-width: 1;
  }

  &__favorite {
    margin: 0 0 5 5;
    color: #ccc;
    font-size: 24;
    // border-width: 1;
    &_active {
      color: #ff4b55;
    }
  }

  &__ingredient {
    margin-right: 10;
  }

  &__ingredient-icon {
    width: 35;
    height: 35;
  }

  &__ingredient-text {
    font-family: SFUIText-Light;
    font-size: 8;
    color: #474747;
    horizontal-align: center;
  }

  &__description {
    font-family: SFUIText-Light;
    font-size: 16;
    color: #474747;
    min-height: auto;
    margin: 0 0 10 0;
    border-bottom-width: 1;
    border-bottom-color: #EAEAEA;
    padding: 20 0;
  }

  &__price,
  &__price-sign {
    font-size: 24;
    color: #717171;
  }

  &__price {
    font-family: SFUIText-Regular;
    vertical-align: middle;
    font-size: 28;
    horizontal-align: right;
    padding-left: 0;
  }

  &__price-sign {
    margin: 3 0 0 5;
  }

  &__order-button {
    background-color: #C8D9AF;
    font-family: SFUIText-Regular;
    font-size: 20;
    color: #FFF;
    // margin: 0;
    // padding: 0;
  }
}
</style>
