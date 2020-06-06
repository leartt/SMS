import axios from 'axios';

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
                const user = res.data.user;
                //Ruajtja e token ne localstorage
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = token;
                commit('AUTH_SUCCESS', token, user);
            }

            return res;
        }
        catch (err) {
            commit('AUTH_ERROR', err);
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
        this.$router.push('/login');
        return;
    },
};

const mutations = {
    AUTH_SUCCESS(state, token, user) {
        state.token = token;
        state.user = user;
        state.status = 'success';
        state.error_message = null;
    },
    AUTH_ERROR(state, err) {
        state.error_message = err.response.data.msg;
    },

    LOGOUT(state) {
        state.error = null;
        state.token = '';
        state.user = {};
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
