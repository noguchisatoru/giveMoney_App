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
      <nuxt-link to="/signup">新規登録はこちら</nuxt-link> 
    </div>
    <div>
      <button v-on:click="add">データベースに追加</button>
    </div>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase'
import AppLogo from '~/components/AppLogo.vue'
import { ADD_USER, REMOVE_USER, INIT_USER } from '../store/action-types';

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

  computed: {
    users () {
      return this.$store.getters.getUsers;
    },
  },

  methods: {
    async doLogin() {
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push("/dashboard")
        }).catch((error) => {
          alert(error)
        })
    },

    add(){
      this.$store.dispatch(ADD_USER, "abc");
      firebase.firestore().collection('users').get().then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return doc.data();
        })
      })
    }
  },

  created (){
    this.$store.dispatch(INIT_USER);
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