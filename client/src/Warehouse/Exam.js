import axios from "axios";

const state = {
    exams: [],
    exam: {},
    error_message: null,
    success_message: null
};


const getters = {
    exams: state => state.exams,
    exam: state => state.exam,
    error_message: state => state.error_message,
    success_message: state => state.success_message
};
/*  */
const actions = {
    // Get all courses actions
    async getExams({ commit }) {
        const response = await axios.get("http://localhost:5000/exam");
        if (response.data.success) {
            commit("SET_EXAMS", response.data.exams);
        }
        return response;
    },

    async createExam({ commit }, exam) {
        try {
            let response = await axios.post("http://localhost:5000/exam", exam);

            if (response.data.success) {
                commit("SET_SUCCESS_MESSAGE", response.data.msg);
                setTimeout(() => {
                    commit("SET_SUCCESS_MESSAGE", null);
                }, 3000);
            }
            return response;

        } catch (err) {
            commit("SET_ERROR_MESSAGE", err.response.data.msg );
            setTimeout(() => {
                commit("SET_ERROR_MESSAGE", null);
            }, 3000);
        }
    },

    async getExamById({ commit }, id) {
        let response = await axios.get("http://localhost:5000/exam/" + id);
        if (response.data.success) {
            commit("SET_EXAM");
        }
        return response;
    },

    async deleteExam({ commit }, id) {
        const response = await axios.delete(`http://localhost:5000/exam/${id}`);
        if (response.data.success) {
            commit("DELETE_EXAM", id);
        }
        return response;
    }

};

const mutations = {
    SET_EXAMS(state, exams) {
        state.exams = exams;
    },
    SET_EXAM(state, exam) {
        state.exam = exam;
    },
    DELETE_EXAM(state, id) {
        state.exams = state.exams.filter(exam => {
            return exam.id != id;
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
