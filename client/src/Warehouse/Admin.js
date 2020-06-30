import axios from "axios";

const state = {
    admins: [],
    admin: {},
    error_message: null,
    success_message: null
};


const getters = {
    admins: state => state.admins,
    admin: state => state.admin,
    error_message: state => state.error_message,
    success_message: state => state.success_message
};
/*  */
const actions = {
    // Get all students actions
    async getAdmins({ commit }) {
        const response = await axios.get("http://localhost:5000/admin");
        if (response.data.success) {
            commit("SET_ADMINS", response.data.admins);
        }
        return response;
    },

    async addAdmin({ commit }, admin) {
        try {
            let response = await axios.post("http://localhost:5000/admin", admin);

            if (response.data.success) {
                commit("SET_SUCCESS_MESSAGE", response.data.msg);
                setTimeout(() => {
                    commit("SET_SUCCESS_MESSAGE", null);
                }, 3000);
            }
            return response;

        } catch (err) {
            commit("SET_ERROR_MESSAGE", err.response.data.msg.errors[0].message || err.response.data.msg );
            setTimeout(() => {
                commit("SET_ERROR_MESSAGE", null);
            }, 3000);
        }
    },

    async updateAdmin({ commit }, admin) {
        try {
            let response = await axios.put(`http://localhost:5000/admin/${admin.id}`, admin)
            if (response.data.success) {
                commit("SET_SUCCESS_MESSAGE", response.data.msg);
                setTimeout(() => {
                    commit("SET_SUCCESS_MESSAGE", null);
                }, 3000);
            }
            return response;

        }
        catch (err) {
            commit("SET_ERROR_MESSAGE", err.response.data.msg);
            setTimeout(() => {
                commit("SET_ERROR_MESSAGE", null);
            }, 3000);
        }
    },

    async getAdminById({ commit }, id) {
        let response = await axios.get("http://localhost:5000/admin/" + id);
        if (response.data.success) {
            commit("SET_ADMIN");
        }
        return response;
    },

    async deleteAdmin({ commit }, id) {
        const response = await axios.delete(`http://localhost:5000/admin/${id}`);
        if (response.data.success) {
            commit("DELETE_ADMIN", id);
        }
        return response;
    }

};

const mutations = {
    SET_ADMINS(state, admins) {
        state.admins = admins;
    },
    SET_ADMIN(state, admin) {
        state.admin = admin;
    },
    DELETE_ADMIN(state, id) {
        state.admins = state.admins.filter(admin => {
            return admin.UserId != id;
        })
    },
    SET_SUCCESS_MESSAGE(state, msg) {
        state.success_message = msg;
    },
    SET_ERROR_MESSAGE(state, msg) {
        state.error_message = msg;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
