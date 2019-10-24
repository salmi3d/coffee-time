<template>
  <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <FlexboxLayout class="login" flexDirection="column" justifyContent="center">
      <StackLayout>
        <Label class="main-label" text="CoffeeTime"/>
        <StackLayout>

          <FlexboxLayout alignItems="center" class="border-bottom">
            <Image src="~/assets/img/icon_user.png" width="16" height="16" class="icon-margin" />
            <TextField
              hint="Email Address"
              keyboardType="email"
              returnKeyType="next"
              @returnPress="focusPassword()"
              v-model="user.email"
              :iEnabled="!isAuthenticating"
              autocorrect="false"
              autocapitalizationType="none"
              row="0"
              class="form-input"
            />
          </FlexboxLayout>

          <FlexboxLayout alignItems="center" class="border-bottom">
            <Image src="~/assets/img/icon_lock.png" width="16" height="16" class="icon-margin" />
            <TextField
              ref="password"
              hint="Password"
              secure="true"
              returnKeyType="done"
              @returnPress="submit()"
              v-model="user.password"
              :isEnabled="!isAuthenticating"
              row="1"
              class="form-input"
            />
          </FlexboxLayout>

          <ActivityIndicator :busy="isAuthenticating" rowSpan="2"/>
        </StackLayout>

        <Button
          :text="isLoggingIn ? 'Login' : 'Sign up'"
          :isEnabled="!isAuthenticating"
          class="submit-button"
          @tap="submit()"
        />

      </StackLayout>

      <Button :text="isLoggingIn ? 'Sign up here' : 'Back to login'"
        class="sign-up-stack"
        @tap="toggleDisplay()"
      />

    </FlexboxLayout>
  </Page>
</template>

<script>
  import User from '../models/User'
  import alert from '../utils/alert'

  export default {
    mounted() {
      // eslint-disable-next-line no-console
      console.log('LoginPage mounted')
    },
    data() {
      return {
        isLoggingIn: true,
        isAuthenticating: false,
        user: new User()
      }
    },
    methods: {
      toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
      },
      focusPassword() {
        this.$refs.password.nativeView.focus();
      },
      submit() {
        this.isAuthenticating = true;
        if (this.isLoggingIn) {
          this.login();
        } else {
          this.signUp();
        }
      },
      login() {

      },
      signUp() {

      },
    },
  }
</script>
