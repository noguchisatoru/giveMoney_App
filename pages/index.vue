<template>
  <section class="container">
    <div>
      <AppLogo/>
      <h1 class="title" v-if="isActive">
        ログイン画面
      </h1>
      <h1 class="title" v-else>
        新規登録
      </h1>
      <table>
        <tr v-show="!isActive"><th>ユーザ名</th>
        <td><input type="text" v-model.trim="username"></td></tr>
        <tr><th>メールアドレス</th>
        <td><input type="email" v-model.trim="email"></td></tr>
        <tr><th>パスワード</th>
        <td><input type="password" v-model.trim="password"></td></tr>
      </table>
      <div v-if="isActive">
        <button v-on:click="doLogin">ログイン</button>
        <br>
        <a href="#" @click.prevent.stop="changeDisplay">新規登録はこちら</a> 
      </div>
      <div v-else>
        <button v-on:click="addUser">新規登録</button>
        <br>
        <a href="#" @click.prevent.stop="changeDisplay">ログインはこちら</a>
      </div>
      <small>&copy; 2019 〇〇</small>
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
      username: "",
      email: "",
      password: "",

      isActive: true
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

    async addUser(){
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        var user = firebase.auth().currentUser;
        this.$store.dispatch(ADD_USER, {userName: this.username, uId: user.uid});
        alert("登録完了"+user.email);
        this.$router.push("/dashboard")
      })
      .catch(error =>{
        alert(error);
      })
    },

    changeDisplay(){
      this.isActive = !this.isActive;
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