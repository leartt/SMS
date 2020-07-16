import axios from "axios";

const state = {
    courses: [],
    course: {},
    error_message: null,
    success_message: null
};


const getters = {
    courses: state => state.courses,
    course: state => state.course,
    error_message: state => state.error_message,
    success_message: state => state.success_message
};
/*  */
const actions = {
    // Get all courses actions
    async getCourses({ commit }) {
        const response = await axios.get("http://localhost:5000/course");
        if (response.data.success) {
            commit("SET_COURSES", response.data.courses);
        }
        return response;
    },

    async createCourse({ commit }, course) {
        try {
            let response = await axios.post("http://localhost:5000/course", course);

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

    async getCourseById({ commit }, id) {
        let response = await axios.get("http://localhost:5000/course/" + id);
        if (response.data.success) {
            commit("SET_COURSE");
        }
        return response;
    },

    async deleteCourse({ commit }, id) {
        const response = await axios.delete(`http://localhost:5000/course/${id}`);
        if (response.data.success) {
            commit("DELETE_COURSE", id);
        }
        return response;
    }

};

const mutations = {
    SET_COURSES(state, courses) {
        state.courses = courses;
    },
    SET_COURSE(state, course) {
        state.course = course;
    },
    DELETE_COURSE(state, id) {
        state.courses = state.courses.filter(course => {
            return course._id != id;
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
