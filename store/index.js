import Vuex from 'vuex'
import { db } from '~/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { INIT_USER, INIT_BALANCE, SET_USERDATA, ADD_USER, REMOVE_USER } from './action-types'
import { DEFAULT_WALLET_AMOUNT } from './definition'

const usersRef = db.collection('users');
const balanceRef = db.collection('balanceData');

export default () =>
  new Vuex.Store({
    state: {
      user: null,
      users: [],
      balances: []
    },
    mutations: {
      ...vuexfireMutations,
      setUser(state, user){
        state.user = user;
      }
    },
    getters: {
      user: state => state.user,
      users: state => state.users,
      balances: state => state.balances
    },
    actions: {
      [INIT_USER]: firestoreAction(context => {
        return context.bindFirestoreRef('users',usersRef);
      }),
      [INIT_BALANCE]: firestoreAction(context => {
        return context.bindFirestoreRef('balances',balanceRef);
      }),
      [ADD_USER]: firestoreAction(async (context, userdata) => {
        try{
          await usersRef.doc(userdata.uId).set({

            userName: userdata.userName,
            
          });

          await balanceRef.doc(userdata.uId).set({

            balance: DEFAULT_WALLET_AMOUNT
            
          });
        }catch(e){
          alert(e);
        }
      }),
      [SET_USERDATA]:async ({commit}, uid) => {
        try{
          const nameData = await usersRef.doc(uid).get();
          const balanceData = await balanceRef.doc(uid).get();
          
          commit("setUser", {
            userName: nameData.data().userName,
            balance: balanceData.data().balance
          });
        }catch(e){
          console.log(e);
        }
      },
      [REMOVE_USER]: firestoreAction((context, key) => {
        usersRef.child(key).remove()
      })
    }
  })