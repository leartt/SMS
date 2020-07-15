<template>
  <v-container>
    <v-alert color="success" v-if="success_message">{{success_message}}</v-alert>
    <v-alert color="error" v-if="error_message">{{ error_message }}</v-alert>

    <router-link :to="{name: 'Exams'}">Go back to Exams</router-link>

    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="name" label="Name" :rules="nameRules" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-date-picker v-model="date" color="warning"></v-date-picker>
        </v-col>

        <v-col cols="12" md="6">
          <v-time-picker v-model="time" color="warning" format="24hr"></v-time-picker>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="classroom"
            :items="classrooms"
            item-text="name"
            item-value="id"
            :rules="classroomRules"
            label="Choose a classroom"
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-content>
                  <v-list-item-title
                    :id="attrs['aria-labelledby']"
                    v-text="`${item.name} / ${item.capacity}`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="course"
            :items="courses"
            item-text="name"
            item-value="_id"
            :rules="courseRules"
            label="Choose a Course"
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-content>
                  <v-list-item-title :id="attrs['aria-labelledby']" v-text="`${item.name}`"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" class="my-3">
          <v-btn color="primary" type="submit" @click="submitForm">Register</v-btn>
          <v-btn color="gray" @click="resetForm">Reset Form</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Exam");

export default {
  name: "RegisterExam",
  data() {
    return {
      name: "",
      date: "",
      time: "",
      classroom: "",
      course: "",

      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length > 1) || "Name must be greater than 1 character"
      ],
      dateRules: [v => !!v || "Date is required"],
      timeRules: [v => !!v || "Time is required"],
      classroomRules: [v => !!v || "Classroom must be selected"],
      courseRules: [v => !!v || "Course must be selected"],
      valid: false
    };
  },
  created() {
    this.getDropdownData();
  },
  computed: {
    ...mapGetters(['success_message', 'error_message']),
    classrooms() {
      return this.$store.state.Classroom.classrooms;
    },
    courses() {
      return this.$store.state.Course.courses;
    }
  },
  methods: {
    ...mapActions(["createExam"]),
    submitForm(e) {
      e.preventDefault();
      const exam = {
        name: this.name,
        date: this.date,
        time: this.time,
        classroom: this.classroom,
        course: this.course,
      }

      
      this.$refs.form.validate();
      if (this.valid) { 
        scroll(0, 0);
        this.createExam(exam).then(res => {
          if (res.data.success) {
            this.$refs.form.reset();
          }
        });
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },

    getDropdownData() {
      this.$store.dispatch("Classroom/getClassrooms");
      this.$store.dispatch("Course/getCourses");
    }
  }
};
</script>

<style>
</style>