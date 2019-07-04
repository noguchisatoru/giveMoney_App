<template>
  <section class="container">
    <div>
      <AppLogo/>
      <h1 class="title">
        ログイン画面
      </h1>
      <table>
        <tr><th>メールアドレス</th>
        <td><input type="email" v-model.trim="email"></td></tr>
        <tr><th>パスワード</th>
        <td><input type="password" v-model.trim="password"></td></tr>
      </table>
      <button v-on:click="doLogin">ログイン</button>
      <nuxt-link to="/sigup">新規登録はこちら</nuxt-link>      
    </div>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase'
import AppLogo from '~/components/AppLogo.vue'

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },

  components: {
    AppLogo
  },

  methods: {
    doLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push("/test")
        }).catch((error) => {
          alert(error)
        })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

