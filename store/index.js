import Vuex from 'vuex'
import firebase from '../plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { ADD_USER, REMOVE_USER, INIT_USER } from './action-types'

const db = firebase.firestore()
const usersRef = db.collection('users')

export default () =>
  new Vuex.Store({
    state: {
      users: []
    },
    mutations: {
      ...vuexfireMutations
    },
    actions: {
      [INIT_USER]: firebaseAction(({ bindFirebaseRef }) => {
        bindFirebaseRef('users', usersRef, { wait: true })
      }),
      [ADD_USER]: firebaseAction((context, text) => {
        usersRef.add({
            name: text,
            test: "test"
        }).then(function(docRef){
            console.log("yes",docRef.id);
        }).catch(function(error){
            console.error("no",error);
        });
      }),
      [REMOVE_USER]: firebaseAction((context, key) => {
        usersRef.child(key).remove()
      })
    },
    getters: {
      getUsers: state => state.users
    }
  })