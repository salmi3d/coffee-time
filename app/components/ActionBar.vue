<template>
  <GridLayout class="actionbar" columns="20,*,20">
    <Label v-if="back" col="0" class="fa" @tap="$navigator.back" :text="'fa-chevron-left' | fonticon"/>
    <Label col="1" class="actionbar__title" :text="text"/>
    <Label col="2" class="fa" @tap="$authService.logout" :text="'fa-sign-out' | fonticon"/>
  </GridLayout>
</template>

<script>
  export default {
    name: 'action-bar',
    props: {
      text: {
        type: String,
        default: 'CoffeeTime'
      },
      back: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
