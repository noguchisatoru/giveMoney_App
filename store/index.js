import Vuex from 'vuex'
import firebase from '../plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
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
      [INIT_USER]: firestoreAction(context => {
        return context.bindFirestoreRef('users',usersRef);
      }),
      [ADD_USER]: firestoreAction(async (context, userdata) => {
        try{
          const newData = await usersRef.add({

            userName: userdata.userName,
            uId: userdata.uId,
            balance: 1000
            
          });
          console.log("yes", newData.id);
        }catch(e){
          alert(e);
        }
      }),

      [REMOVE_USER]: firestoreAction((context, key) => {
        usersRef.child(key).remove()
      })
    },
    getters: {
      getUsers: state => state.users
    }
  })