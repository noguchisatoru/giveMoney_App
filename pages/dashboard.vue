<template>
   <section class="container">
      <div>
        <AppLogo/>
        <p>{{ user.userName }} さんようこそ</p>
        <p>残高：{{ user.balance }}</p>
        <h1>ユーザ一覧</h1>
      </div>
    </section>
    
</template>

<script>
import { mapGetters } from 'vuex'
import { auth } from '~/plugins/firebase'
import AppLogo from '~/components/AppLogo.vue'
import { INIT_USER, INIT_BALANCE,SET_USERDATA, ADD_USER, REMOVE_USER}  from '../store/action-types';

export default {
  data() {
    return {
      useruid: auth.currentUser.uid
    }
  },

  components: {
    AppLogo
  },

 computed: {
    ...mapGetters(["user", "users", "balance"])
  },

  methods: {
    changeDisplay(){
      this.isActive = !this.isActive;
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