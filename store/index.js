import Vuex from 'vuex'
import { db } from '~/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { INIT_USER, INIT_BALANCE, SET_USERDATA, ADD_USER, REMOVE_USER } from './action-types'

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
            
          });

          await balanceRef.add({

            userId: newData.id,
            balance: 1000
            
          });
        }catch(e){
          alert(e);
        }
      }),

      [REMOVE_USER]: firestoreAction((context, key) => {
        usersRef.child(key).remove()
      })
    }
  })