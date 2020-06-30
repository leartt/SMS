import axios from "axios";

const state = {
    teachers: [],
    teacher: {},
    error_message: null,
    success_message: null
};

const getters = {
    teachers: state => state.teachers,
    teacher: state => state.teacher,
    error_message: state => state.error_message,
    success_message: state => state.success_message
};
/*  */
const actions = {
    // Get all teachers actions
    async getTeachers({ commit }) {
        const response = await axios.get("http://localhost:5000/teacher");
        if (response.data.success) {
            commit("SET_TEACHERS", response.data.teachers);
        }
        return response;
    },

    async addTeacher({ commit }, teacher) {
        try {
            let response = await axios.post("http://localhost:5000/teacher", teacher);

            if (response.data.success) {
                commit("SET_SUCCESS_MESSAGE", response.data.msg);
                setTimeout(() => {
                    commit("SET_SUCCESS_MESSAGE", null);
                }, 3000);
            }
            return response;

        } catch (err) {
            commit("SET_ERROR_MESSAGE", err.response.data.msg.errors[0].message);
            setTimeout(() => {
                commit("SET_ERROR_MESSAGE", null);
            }, 3000);
        }
    },

    async updateTeacher({ commit }, teacher) {
        try {
            let response = await axios.put(`http://localhost:5000/teacher/${teacher.id}`, teacher)
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

    async getTeacherById({ commit }, id) {
        let response = await axios.get("http://localhost:5000/teacher/" + id);
        if (response.data.success) {
            commit("SET_TEACHER");
        }
        return response;
    },

    async deleteTeacher({ commit }, id) {
        const response = await axios.delete(`http://localhost:5000/teacher/${id}`);
        if (response.data.success) {
            commit("DELETE_TEACHER", id);
        }
        return response;
    }

};

const mutations = {
    SET_TEACHERS(state, teachers) {
        state.teachers = teachers;
    },
    SET_TEACHER(state, teacher) {
        state.teacher = teacher;
    },
    DELETE_TEACHER(state, id) {
        state.teachers = state.teachers.filter(t => {
            return t.UserId != id;
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
