<template>
  <v-container>
    <v-alert v-if="success_message" color="success">{{success_message}}</v-alert>
    <v-alert v-if="error_message" color="error">{{error_message}}</v-alert>

    <v-card>
      <v-card-title class="my-3">
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        <router-link v-if="userRole === 'admin'" :to="{ name: 'Add Course'}">
          <v-btn color="green" class="mx-2">Add New Course</v-btn>
        </router-link>
      </v-card-title>

      <v-data-table :headers="headers" :items="courses" :search="search">
        <template v-if="userRole === 'admin'" v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEdit(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="openDelete(item)">mdi-delete</v-icon>
        </template>

        <template v-slot:item.teacher="{ item }">{{item.teacher.name}} {{item.teacher.surname}}</template>
      </v-data-table>

      <v-dialog
        v-if="editedCourse"
        v-model="dialog"
        :retain-focus="false"
        persistent
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Edit Course</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedCourse.name"
                    label="Name"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="editedCourse.teacher"
                    :items="teachers"
                    item-text="name"
                    item-value="id"
                    :rules="teacherRules"
                    label="Choose a teacher"
                  >
                    <template v-slot:item="{ item, attrs, on }">
                      <v-list-item v-bind="attrs" v-on="on">
                        <v-list-item-avatar>
                          <img :src="`http://localhost:5000/${item.photo_path}`" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            :id="attrs['aria-labelledby']"
                            v-text="`${item.name} / ${item.surname}`"
                          ></v-list-item-title>
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
            <v-btn color="blue darken-1" text @click="closeDialog()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="editCourse(editedCourse)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-if="deletedCourse" v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >Delete Course {{deletedCourse.name}}</v-card-title>

          <v-card-text>Are you sure you want to delete this course?</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" text @click="courseDelete(deletedCourse)">Yes, I am sure</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("Course");
export default {
  name: "Course",
  data() {
    return {
      search: "",
      teacherId: '',
      headers: [
        { text: "Name", value: "name" },
        { text: "Teacher", value: "teacher" },
        { text: "Date Created", value: "date" },
        { text: "Actions", value: "actions", sortable: false }
      ],

      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length > 1) || "Name must be greater than 1 character"
      ],
      teacherRules: [v => !!v || "Teacher must be choosen"],

      deleteDialog: false,
      deletedCourse: null,
      editedCourse: null,
      dialog: false
    };
  },
  created() {
    this.getCourses();
    this.$store.dispatch("Teacher/getTeachers");
  },
  computed: {
    ...mapGetters(["courses", "success_message", "error_message"]),
    teachers() {
      return this.$store.state.Teacher.teachers;
    },
    userRole() {
      return this.$store.getters["Auth/user"].User.role;
    }
  },
  methods: {
    ...mapActions(["getCourses", "updateCourse", "deleteCourse"]),
    openDelete(item) {
      this.deletedCourse = item;
      this.deleteDialog = true;
    },
    openEdit(item) {
      this.editedCourse = item;
      this.dialog = true;
    },
    editCourse(course) {
      this.updateCourse(course);
      this.dialog = false;
    },
    courseDelete(course) {
      this.deleteDialog = false;
      this.deleteCourse(course._id);
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>