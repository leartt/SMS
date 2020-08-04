<template>
  <v-container>
    <v-alert color="error" v-if="errorMessage">{{ errorMessage }}</v-alert>
    <v-alert color="green" v-if="successMessage">{{ successMessage }}</v-alert>
    <v-form ref="form" v-model="valid" v-if="userRole === 'admin' || userRole === 'teacher'">
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="course"
            :items="courses"
            item-text="name"
            item-value="_id"
            :rules="courseRules"
            label="Choose an course"
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-content>
                  <v-list-item-title
                    :id="attrs['aria-labelledby']"
                    v-text="`${item.name} - ${item.teacher.name} ${item.teacher.surname}`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="studentId"
            :items="students"
            item-text="name"
            item-value="id"
            :rules="studentRules"
            label="Choose a student"
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-content>
                  <v-list-item-title
                    :id="attrs['aria-labelledby']"
                    v-text="`${item.name} ${item.surname} / ${item.Classroom.name}`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select v-model="grade" :items="grades" label="Choose a grade" :rules="gradeRules"></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="points" label="Enter points" :rules="pointRules"></v-text-field>
        </v-col>

        <v-col cols="12" class="my-3">
          <v-btn color="primary" type="submit" @click="submitForm">Submit</v-btn>
          <v-btn color="gray" @click="resetForm">Reset Form</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterGrade",
  data() {
    return {
      studentId: "",
      course: "",
      grades: [1,2,3,4,5],
      grade: 0,
      points: 0,
      successMessage: "",
      errorMessage: "",

      studentRules: [v => !!v || "Student is required"],
      courseRules: [v => !!v || "Course is required"],
      gradeRules: [v => !!v || "Grade is required"],
      pointRules: [v => !!v || "Points are required"],
      valid: false
    };
  },
  created() {
    this.$store.dispatch("Course/getCourses");
    this.$store.dispatch("Student/getStudents");
  },
  computed: {
    userRole() {
      return this.$store.getters["Auth/user"].User.role;
    },
    loggedInUser() {
      return this.$store.getters["Auth/user"];
    },
    students() {
      return this.$store.state.Student.students;
    },
    courses() {
      if(this.loggedInUser.User.role.toLowerCase() === 'admin') {
        return this.$store.state.Course.courses;
      }
      else if(this.loggedInUser.User.role.toLowerCase() === 'teacher') {
        return this.$store.state.Course.courses.filter(course => {
          return course.teacher.id === this.loggedInUser.id
      });
      }
    }
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();
      const grade = {
        studentId: this.studentId,
        course: this.course,
        grade: this.grade,
        points: this.points
      };

      this.$refs.form.validate();
      if (this.valid) {
        scroll(0, 0);
        try {
          const res = await axios.post("http://localhost:5000/grade", grade);
          if (res.data.success) {
            this.successMessage = "Grade has been added successfully";
            setTimeout(() => {
              this.successMessage = "";
            }, 3000);
            this.$refs.form.reset();
          } else {
            this.errorMessage = res.data.msg;
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },
  }
};
</script>

<style scoped>
</style>
