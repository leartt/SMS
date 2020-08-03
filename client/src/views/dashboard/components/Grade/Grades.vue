<template>
  <v-container>
    <v-data-table :headers="headers" :items="grades" class="elevation-1"></v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Grades",
  data() {
    return {
      search: "",
      grades: [],
      headers: [
        { text: "Course", value: "course.name" },
        { text: "Grade", value: "grade" },
        { text: "Points", value: "points" }
      ]
    };
  },
  created() {
    this.getGradeDatas();
  },
  computed: {
    student() {
      return this.$store.getters["Auth/user"];
    }
  },
  methods: {
    async getGradeDatas() {
      try {
        let res = await axios.get("http://localhost:5000/grade");
        if (res.data.success) {
          this.grades = res.data.grades.filter(gr => {
              return gr.student.id == this.student.id
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>