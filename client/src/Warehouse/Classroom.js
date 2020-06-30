import axios from "axios";

const state = {
    classrooms: [],
    classroom: {},
    error_message: null,
    success_message: null
};


const getters = {
    classrooms: state => state.classrooms,
    classroom: state => state.classroom,
    error_message: state => state.error_message,
    success_message: state => state.success_message
};

const actions = {
    async getClassrooms({ commit }) {
        const response = await axios.get("http://localhost:5000/classroom");
        if (response.data.success) {
            commit("SET_CLASSROOMS", response.data.classrooms);
        }
        return response;
    },

    async createClassroom({ commit }, classroom) {
        try {
            let response = await axios.post("http://localhost:5000/classroom", classroom);

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

    async getClassroomById({ commit }, id) {
        let response = await axios.get("http://localhost:5000/classroom/" + id);
        if (response.data.success) {
            commit("SET_CLASSROOM");
        }
        return response;
    },

    async deleteClassroom({ commit }, id) {
        const response = await axios.delete(`http://localhost:5000/classroom/${id}`);
        if (response.data.success) {
            commit("DELETE_CLASSROOM", id);
        }
        return response;
    }

};

const mutations = {
    SET_CLASSROOMS(state, classrooms) {
        state.classrooms = classrooms;
    },
    SET_CLASSROOM(state, classroom) {
        state.classroom = classroom;
    },
    DELETE_CLASSROOM(state, id) {
        state.classrooms = state.classrooms.filter(classroom => {
            return classroom.id != id;
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
