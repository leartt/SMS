import axios from "axios";

const state = {
    students: [],
    student: {},
    error_message: null,
    success_message: null,
};

const getters = {
    students: state => state.students,
    student: state => state.student,
    error_message: state => state.error_message,
    success_message: state => state.success_message
};
/*  */
const actions = {
    // Get all students actions
    async getStudents({ commit }) {
        const response = await axios.get("http://localhost:5000/student");
        if (response.data.success) {
            commit("SET_STUDENTS", response.data.students);
        }
        return response;
    },

    async addStudent({ commit }, student) {
        try {
            let response = await axios.post("http://localhost:5000/student", student);

            if (response.data.success) {
                commit("SET_SUCCESS_MESSAGE", response.data.msg);
                setTimeout(() => {
                    commit("SET_SUCCESS_MESSAGE", null);
                }, 3000);
            }

            return response;
        } catch (err) {
            commit("SET_ERROR_MESSAGE", err.response.data.msg || err.response.data.msg.errors[0].message);
            setTimeout(() => {
                commit("SET_ERROR_MESSAGE", null);
            }, 3000);
        }
    },

    async getStudentById({ commit }, id) {
        let response = await axios.get("http://localhost:5000/student/" + id);
        if (response.data.success) {
            commit("SET_STUDENT", response.data.student);
        }
        return response;
    },

    async updateStudent({ commit }, student) {
        try {
            let response = await axios.put(`http://localhost:5000/student/${student.id}`, student)
            if (response.data.success) {
                commit("SET_SUCCESS_MESSAGE", response.data.msg);
                setTimeout(() => {
                    commit("SET_SUCCESS_MESSAGE", null);
                }, 3000);
            }
            return response;

        } catch (err) {
            commit("SET_ERROR_MESSAGE", err.response.data.msg);
            setTimeout(() => {
                commit("SET_ERROR_MESSAGE", null);
            }, 3000);
        }
    },

    async deleteStudent({ commit }, id) {
        const response = await axios.delete(`http://localhost:5000/student/${id}`);
        if (response.data.success) {
            commit("DELETE_STUDENT", id);
        }
        return response;
    }

};

const mutations = {
    SET_STUDENTS(state, students) {
        state.students = students;
    },
    SET_STUDENT(state, student) {
        state.student = student;
    },
    DELETE_STUDENT(state, id) {
        state.students = state.students.filter(s => {
            return s.UserId != id;
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
