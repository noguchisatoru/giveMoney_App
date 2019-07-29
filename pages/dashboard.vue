<template>
    <section>
        <h1>dashboard</h1>
        <p>useruid:{{ useruid }}</p>
    </section>
    
</template>

<script>
import firebase from '~/plugins/firebase'
import AppLogo from '~/components/AppLogo.vue'
import { ADD_USER, REMOVE_USER, INIT_USER } from '../store/action-types';

export default {
  data() {
    return {
      useruid: firebase.auth().currentUser.uid
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