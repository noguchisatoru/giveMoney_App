import Vuex from 'vuex'
import { db } from '~/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { INIT_USER, INIT_BALANCE, SET_USERDATA, ADD_USER, SELECT_USERDATA, REMOVE_USER, SEND_WALLET } from './action-types'
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
          const userdata = await Promise.all([
            usersRef.doc(uid).get(),
            balanceRef.doc(uid).get()
          ]);
          commit("setUser", {
            uId: uid,
            userName: userdata[0].data().userName,
            balance: userdata[1].data().balance
          });
        }catch(e){
          console.log(e);
        }
      },

      [SELECT_USERDATA]:async({commit},uid) => {
        try{
          const selectdata = await Promise.all([
            usersRef.doc(uid).get(),
            balanceRef.doc(uid).get()
          ]);
          return [uid, selectdata[0].data().userName, selectdata[1].data().balance]
        }catch(e){
          console.log(e);
        }
      },

      [SEND_WALLET]:firestoreAction(async (context, {wallet, uid}) => {
        try{
          const preData = await Promise.all([
            balanceRef.doc(context.state.user.uId).get(),
            balanceRef.doc(uid).get()
          ]);
          
          await Promise.all([
            balanceRef.doc(context.state.user.uId).set({
              balance: preData[0].data().balance - Number(wallet)
            }),
            balanceRef.doc(uid).set({
              balance: preData[1].data().balance + Number(wallet)              
            })
          ]);
        }catch(e){
          console.log(e);
        }
      }),
      [REMOVE_USER]: firestoreAction((context, key) => {
        usersRef.child(key).remove()
      })
    }
  })