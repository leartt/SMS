import axios from "axios";

const state = {
    feedbacks: [],
    feedback: {},
    error_message: null,
    success_message: null
};


const getters = {
    feedbacks: state => state.feedbacks,
    feedback: state => state.feedback,
    error_message: state => state.error_message,
    success_message: state => state.success_message
};
/*  */
const actions = {
    // Get all students actions
    async getFeedbacks({ commit }) {
        const response = await axios.get("http://localhost:5000/feedback");
        if (response.data.success) {
            commit("SET_FEEDBACKS", response.data.feedbacks);
        }
        return response;
    },

    async createFeedback({ commit }, feedback) {
        try {
            let response = await axios.post("http://localhost:5000/feedback", feedback);

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

    async getFeedbackById({ commit }, id) {
        let response = await axios.get("http://localhost:5000/feedback/" + id);
        if (response.data.success) {
            commit("SET_FEEDBACK");
        }
        return response;
    },

    async deleteFeedback({ commit }, id) {
        const response = await axios.delete(`http://localhost:5000/feedback/${id}`);
        if (response.data.success) {
            commit("DELETE_FEEDBACK", id);
        }
        return response;
    }

};

const mutations = {
    SET_FEEDBACKS(state, feedbacks) {
        state.feedbacks = feedbacks;
    },
    SET_FEEDBACK(state, feedback) {
        state.feedback = feedback;
    },
    DELETE_FEEDBACK(state, id) {
        state.feedbacks = state.feedbacks.filter(feedback => {
            return feedback.id != id;
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
