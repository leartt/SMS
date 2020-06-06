import Vue from 'vue'
import Vuex from 'vuex'
import Student from './Warehouse/Student';
import Parent from './Warehouse/Parent';
import Auth from './Warehouse/Auth';
import Teacher from './Warehouse/Teacher';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Student,
    Parent,
    Teacher,
  },
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {

  },
})
