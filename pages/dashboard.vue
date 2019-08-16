<template>
   <section class="container">
      <div>
        <AppLogo/>
        <p>{{ user.userName }} さんようこそ</p>
        <button @click="logout()">ログアウト</button>
        <p>残高：{{ user.balance }}</p>
        <h1>ユーザ一覧</h1>
        <table>
          <thead>
            <tr>
              <th>ユーザ名</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="username in users" :key="username.userName">
              <th>{{ username.userName }}</th>
              <th><button @click="confirmWallet(username.id)">walletを見る</button></th>
              <th><button @click="sendWallet(username.id)">送る</button></th>
            </tr>  
          </tbody>
        </table>
        <ConfirmModal v-if="showConfirmModal" @close="showConfirmModal = false" :selectdata="selectUser"></ConfirmModal>
        <SendModal v-if="showSendModal" @close="showSendModal = false" :selectdata="selectUser"></SendModal>
        <Footer/>
      </div>
    </section>
    
</template>

<script>
import { mapGetters } from 'vuex'
import { auth } from '~/plugins/firebase'
import AppLogo from '~/components/AppLogo.vue'
import Footer from '~/components/Footer.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import SendModal from '~/components/SendModal.vue'
import { INIT_USER, INIT_BALANCE, SET_USERDATA, ADD_USER, SELECT_USERDATA, LOGOUT_USER}  from '../store/action-types';

export default {
  middleware: 'authenticated',

  data() {
    return {
      showConfirmModal: false,
      showSendModal: false,
      selectUser: []
    }
  },

  components: {
    AppLogo,
    Footer,
    ConfirmModal,
    SendModal
  },

 computed: {
    ...mapGetters(["user", "users", "balances"])
  },

  methods: {
    async confirmWallet(uid){
      this.selectUser = await this.$store.dispatch(SELECT_USERDATA, uid);
      this.showConfirmModal = true;
    },
    
    async sendWallet(uid){
      this.selectUser = await this.$store.dispatch(SELECT_USERDATA, uid);
      this.showSendModal = true;
    },

    async logout(){
      this.$router.push("/");
      await auth.signOut();
      this.$store.dispatch(LOGOUT_USER);
    }
  },

   mounted(){
    this.$store.dispatch(INIT_USER);
    this.$store.dispatch(INIT_BALANCE);
  }
}
</script>

<style>
.container {
  min-height: 50vh;
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