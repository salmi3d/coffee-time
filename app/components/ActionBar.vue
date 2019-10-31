<template>
  <FlexboxLayout class="actionbar" alignItems="center">
    <Label class="fa actionbar__left" :text="'fa-chevron-left' | fonticon" @tap="goBack" :class="{ 'actionbar__left_hidden': !back }"/>
    <Label class="actionbar__center" :text="text"/>
    <Label class="fa actionbar__right" @tap="$authService.logout" :text="'fa-sign-out' | fonticon"/>
  </FlexboxLayout>
</template>

<script>
  export default {
    name: 'ActionBar',
    props: {
      text: {
        type: String,
        default: 'CoffeeTime'
      },
      back: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      goBack() {
        if(!this.back) {
          return
        }
        this.$navigator.back()
      }
    }
  }
</script>
