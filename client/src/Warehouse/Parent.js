import axios from "axios";

const state = {
    parents: [],
    parent: {},
    error_message: null,
    success_message: null
};


const getters = {
    parents: state => state.parents,
    parent: state => state.parent,
    error_message: state => state.error_message,
    success_message: state => state.success_message
};
/*  */
const actions = {
    // Get all students actions
    async getParents({ commit }) {
        const response = await axios.get("http://localhost:5000/parent");
        if (response.data.success) {
            commit("SET_PARENTS", response.data.parents);
        }
        return response;
    },

    async addParent({ commit }, parent) {
        try {
            let response = await axios.post("http://localhost:5000/parent", parent);

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

    async updateParent({ commit }, parent) {
        try {
            let response = await axios.put(`http://localhost:5000/parent/${parent.id}`, parent)
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

    async getParentById({ commit }, id) {
        let response = await axios.get("http://localhost:5000/parent/" + id);
        if (response.data.success) {
            commit("SET_PARENT");
        }
        return response;
    },

    async deleteParent({ commit }, id) {
        const response = await axios.delete(`http://localhost:5000/parent/${id}`);
        if (response.data.success) {
            commit("DELETE_PARENT", id);
        }
        return response;
    }

};

const mutations = {
    SET_PARENTS(state, parents) {
        state.parents = parents;
    },
    SET_PARENT(state, parent) {
        state.parent = parent;
    },
    DELETE_PARENT(state, id) {
        state.parents = state.parents.filter(p => {
            return p.UserId != id;
        });
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
