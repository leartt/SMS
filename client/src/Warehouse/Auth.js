import axios from 'axios';
import router from '../router'

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    success_message: null,
    error_message: null,
    status: '',
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    success_message: state => state.success_message,
    error_message: state => state.error_message
};

const actions = {
    //Login action
    async login({ commit }, user) {
        try {
            let res = await axios.post(`http://localhost:5000/user/login`, user);

            if (res.data.success) {
                const token = res.data.token;
                //Ruajtja e token ne localstorage
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = token;
                commit('AUTH_SUCCESS', token);
            }

            return res;
        }
        catch (err) {
            commit('AUTH_ERROR', err.response.data.msg);
            setTimeout(() => {
                commit("AUTH_ERROR", null);
            }, 3000);
        }
    },

    async getProfile({ commit }) {
        let res = await axios.get('http://localhost:5000/user/profile');
        commit('USER_PROFILE', res.data.user);
        return res;
    },

    async logout({ commit }) {
        localStorage.removeItem('token');
        commit('LOGOUT');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return;
    },
};

const mutations = {
    AUTH_SUCCESS(state, token) {
        state.token = token;
        state.status = 'success';
        state.error_message = null;
    },
    AUTH_ERROR(state, error) {
        state.error_message = error;
    },

    LOGOUT(state) {
        state.error = null;
        state.token = '';
        state.status = '';
    },
    USER_PROFILE(state, user) {
        state.user = user;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations

}
