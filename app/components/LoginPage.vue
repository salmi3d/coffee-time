<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <ScrollView>
      <FlexboxLayout class="login" flexDirection="column" justifyContent="center">
        <StackLayout>
          <Label class="login__main-label" text="CoffeeTime"/>
          <StackLayout>

            <FlexboxLayout alignItems="center" class="login__input-wrapper">
              <Label class="fa login__icon" :text="'fa-user' | fonticon"/>
              <TextField flexGrow="0"
                hint="Email Address"
                keyboardType="email"
                returnKeyType="next"
                @returnPress="focusPassword"
                v-model="user.email"
                :iEnabled="!isAuthenticating"
                autocorrect="false"
                autocapitalizationType="none"
                class="login__form-input"
              />
            </FlexboxLayout>

            <FlexboxLayout alignItems="center" class="login__input-wrapper">
              <Label class="fa login__icon" :text="'fa-lock' | fonticon"/>
              <TextField
                ref="password"
                hint="Password"
                secure="true"
                returnKeyType="done"
                @returnPress="submit"
                v-model="user.password"
                :isEnabled="!isAuthenticating"
                class="login__form-input"
              />
            </FlexboxLayout>

            <ActivityIndicator :busy="isAuthenticating" rowSpan="2"/>
          </StackLayout>

          <Button
            :text="isLoggingIn ? 'Login' : 'Sign up'"
            :isEnabled="!isAuthenticating"
            class="login__submit"
            @tap="submit"
          />

        </StackLayout>

        <Button :text="isLoggingIn ? 'Sign up here' : 'Back to login'"
          class="login__sign-up-stack"
          @tap="toggleDisplay"
        />

      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
  import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'
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
        this.isLoggingIn = !this.isLoggingIn
      },
      focusPassword() {
        this.$refs.password.nativeView.focus()
      },
      submit() {
        this.isAuthenticating = true
        if (this.isLoggingIn) {
          this.login()
        } else {
          this.signUp()
        }
      },
      login() {
        if (getConnectionType() === connectionType.none) {
          alert("CoffeeTime requires an internet connection to log in.")
          return
        }
        this.$authService
          .login(this.user)
          .then(() => {
            this.isAuthenticating = false
            this.$navigator.navigate('/home', { clearHistory: true })
          })
          .catch(error => {
            this.isAuthenticating = false
            alert(error)
          })
      },
      signUp() {
        if (getConnectionType() === connectionType.none) {
          alert("CoffeeTime requires an internet connection to register.")
          return
        }
        this.$authService
          .register(this.user)
          .then(() => {
            alert("Your account was successfully created.")
            this.isAuthenticating = false
            this.toggleDisplay()
          })
          .catch(error => {
            this.isAuthenticating = false
            alert(error)
          })
      },
    },
  }
</script>
