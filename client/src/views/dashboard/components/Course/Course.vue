<template></template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers('Course');
export default {
  name: "Course",
  data() {
    return {};
  },
  created() {
      getCourses();
  },
  computed: {
      ...mapGetters(['courses', 'success_message', 'error_message']),
      teachers() {
          return this.$store.state.Teacher.teachers;
      }
  },
  methods: {
      ...mapActions(['getCourses', 'deleteCourse', 'createCourse'])
  }
};
</script>

<style>
</style>