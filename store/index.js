import Vuex from 'vuex'
import { db } from '~/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { INIT_USER, INIT_BALANCE, SET_USERDATA, ADD_USER, SELECT_USERDATA, LOGOUT_USER, SEND_WALLET } from './action-types'
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
      },
      logoutUser(state){
        state.user = null;
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

          const selectUserdata = {
            uId: uid,
            userName: selectdata[0].data().userName,
            balance: selectdata[1].data().balance
          }
          
          return selectUserdata;
        }catch(e){
          console.log(e);
        }
      },

      [SEND_WALLET]:firestoreAction(async (context, {wallet, uid}) => {
        try{
          const recieverId = context.state.user.uId;
          const senderId = uid;

          if(recieverId !== senderId){
            const getIdData = await Promise.all([
              balanceRef.doc(recieverId).get(),
              balanceRef.doc(senderId).get()
            ]);
            
            const recieverBalance = getIdData[0].data().balance;
            const senderBalance = getIdData[1].data().balance;
  
            await Promise.all([
              balanceRef.doc(recieverId).set({
                balance: recieverBalance - Number(wallet)
              }),
              balanceRef.doc(senderId).set({
                balance: senderBalance + Number(wallet)              
              })
            ]);
          }else{
            alert("自分自身に送ることはできません！");
          }
          
        }catch(e){
          console.log(e);
        }
      }),
      [LOGOUT_USER]: ({commit}) => {
        commit("logoutUser");
      }
    }
  })