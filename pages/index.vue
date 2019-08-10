<template>
  <section class="container">
    <div>
      <AppLogo/>
      <h1 class="title" v-if="isActive">ログイン画面</h1>
      <h1 class="title" v-else>新規登録</h1>
      <table>
        <tr v-show="!isActive">
          <th>ユーザ名</th>
          <td><input type="text" v-model.trim="username"></td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td><input type="email" v-model.trim="email"></td>
        </tr>
        <tr>
          <th>パスワード</th>
          <td><input type="password" v-model.trim="password"></td>
        </tr>
      </table>
      <div v-if="isActive">
        <button v-on:click="doLogin">ログイン</button>
        <button v-on:click="changeDisplay">新規登録はこちら</button> 
      </div>
      <div v-else>
        <button v-on:click="addUser">新規登録</button>
        <button v-on:click="changeDisplay">ログインはこちら</button>
      </div>
      <Footer/>
    </div>
  </section>
</template>

<script>
import { auth } from '~/plugins/firebase'
import AppLogo from '~/components/AppLogo.vue'
import Footer from '~/components/Footer.vue'
import {INIT_USER, SET_USERDATA, ADD_USER, REMOVE_USER} from '../store/action-types';

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
    AppLogo,
    Footer
  },

  methods: {
    async doLogin() {
      try{
        const user = await auth.signInWithEmailAndPassword(this.email, this.password);
          if(user){
            await this.$store.dispatch(SET_USERDATA, auth.currentUser.uid);
            this.$router.push("/dashboard");
          }
      } catch (e) {
          alert(e);
        }
      },

    async addUser(){
      try{
        const user = await auth.createUserWithEmailAndPassword(this.email, this.password);
          if(user){
            const userdata = auth.currentUser;
            this.$store.dispatch(ADD_USER, {userName: this.username, uId: userdata.uid});
            await this.$store.dispatch(SET_USERDATA, userdata.uid);
            alert("登録完了" + userdata.email);
            this.$router.push("/dashboard")
          }
      } catch (e) {
        alert(e);
      }
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