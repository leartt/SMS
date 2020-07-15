<template>
  <v-container>
    <v-alert v-if="success_message" color="success">{{success_message}}</v-alert>
    <v-alert v-if="error_message" color="error">{{error_message}}</v-alert>
    <v-card>
      <v-card-title class="my-3">
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        <router-link v-if="userRole === 'admin'" :to="{ name: 'Register Exam'}">
          <v-btn color="green" class="mx-2">Register New Exam</v-btn>
        </router-link>
      </v-card-title>

      <v-data-table :headers="headers" :items="exams" :search="search">
        <template v-if="userRole === 'admin'" v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEdit(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="openDelete(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-dialog
        v-if="editedExam"
        v-model="dialog"
        :retain-focus="false"
        persistent
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Edit Exam</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editedExam.name" label="Name" :rules="nameRules" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-date-picker v-model="editedExam.date" color="warning" :rules="dateRules"></v-date-picker>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-time-picker v-model="editedExam.time" color="warning" format="24hr" :rules="timeRules"></v-time-picker>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="editedExam.classroom.id"
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
                    v-model="editedExam.course"
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
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" text @click="editParent(editedUser)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-if="deletedExam" v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >Delete Exam {{deletedExam.name}}</v-card-title>

          <v-card-text>Are you sure you want to delete this exam?</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" text @click="examDelete(deletedExam)">Yes, I am sure</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Exam");
export default {
  name: "Exam",
  data() {
    return {
      search: "",

      headers: [
        { text: "Name", value: "name" },
        { text: "Course", value: "course.name" },
        { text: "Date of Exam", value: "date" },
        { text: "Time of Exam", value: "time" },
        { text: "Classroom", value: "classroom.name" },
        { text: "Actions", value: "actions", sortable: false }
      ],

      dialog: false,
      deleteDialog: false,
      editedExam: null,
      deletedExam: null,

      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length > 1) || "Name must be greater than 1 character"
      ],
      dateRules: [v => !!v || "Date is required"],
      timeRules: [v => !!v || "Time is required"],
      classroomRules: [v => !!v || "Classroom must be selected"],
      courseRules: [v => !!v || "Course must be selected"],
    };
  },
  created() {
    this.getExams();
    this.getDropdownData();
  },
  computed: {
    ...mapGetters(["exams", "success_message", "error_message"]),
    userRole() {
      return this.$store.getters["Auth/user"].User.role;
    },
    classrooms() {
      this.$store.state.Classroom.classrooms;
    },
    courses() {
      this.$store.state.Course.courses;
    }
  },
  methods: {
    ...mapActions(["getExams", "deleteExam"]),
    getDropdownData() {
      this.$store.dispatch("Classroom/getClassrooms");
      this.$store.dispatch("Course/getCourses");
    },
    openEdit(item) {
      this.editedExam = item;
      this.dialog = true;
    },
    editExam(exam) {
      this.dialog = false;
    },
    openDelete(exam) {
      this.deletedExam = exam;
      this.deleteDialog = true;
    },
    examDelete(exam) {
      this.deleteExam(exam._id);
      this.deleteDialog = false;
    },
    closeDialog() {
      this.editedExam = null;
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>