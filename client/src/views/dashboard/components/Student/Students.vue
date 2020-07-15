<template>
  <v-container>
    <v-alert v-if="success_message" color="success">{{success_message}}</v-alert>
    <v-alert v-if="error_message" color="error">{{error_message}}</v-alert>

    <p v-if="userRole === 'teacher'" color="blue">Your classroom is {{loggedInUser.Classroom.name}}</p>

    <v-card>
      <v-card-title class="my-3">
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        <router-link v-if="userRole === 'admin'" to="/students/register">
          <v-btn color="green" class="mx-2">Register New Student</v-btn>
        </router-link>
      </v-card-title>

      <v-data-table :headers="headers" :items="students" :search="search">
        <template v-if="userRole === 'admin'" v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEdit(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="openDelete(item)">mdi-delete</v-icon>
        </template>

        <template v-slot:item.avatars="{ item }">
          <v-avatar>
            <img :src="`http://localhost:5000/${item.photo_path}`" :alt="item.name" />
          </v-avatar>
        </template>

        <template v-slot:item.parent="{ item }">
          <p>{{item.Parent.name}} {{item.Parent.surname}}</p>
        </template>
      </v-data-table>

      <v-dialog v-if="editedUser" v-model="dialog" :retain-focus="false" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Student</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedUser.name" label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedUser.surname" label="Surname" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedUser.User.email" label="E-mail" required disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedUser.User.role" label="Role" required disabled></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="editedUser.address" label="Address" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="editedUser.phone" label="Phone" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-date-picker v-model="editedUser.birthday" label="Birthday" required></v-date-picker>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" text @click="editStudent(editedUser)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-if="deletedStudent" v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >Delete Student {{deletedStudent.name}} {{deletedStudent.surname}}</v-card-title>

          <v-card-text>Are you sure you want to delete this Student?</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" text @click="studentDelete(deletedStudent)">Yes, I am sure</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Student");

export default {
  name: "Student",
  data() {
    return {
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "Email", value: "User.email" },
        { text: "Address", value: "address" },
        { text: "Phone", value: "phone" },
        { text: "Birthday", value: "birthday" },
        { text: "Parent", value: "parent" },
        { text: "Classroom", value: "Classroom.name" },
        { text: "Image", value: "avatars", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ],
      dialog: false,
      deleteDialog: false,
      editedUser: null,
      deletedStudent: null
    };
  },
  computed: {
    ...mapGetters(["success_message", "error_message"]),
    parents() {
      return this.$store.state.Parent.parents;
    },
    userRole() {
      return this.$store.getters["Auth/user"].User.role;
    },
    loggedInUser() {
      return this.$store.getters["Auth/user"];
    },
    students() {
      if (this.userRole.toUpperCase() === "PARENT") {
        let stdClassroms = this.loggedInUser.Students.map( std => std.classroomId );
        return this.$store.state.Student.students.filter(s => {
          return stdClassroms.some(classroom => classroom == s.classroomId);
        });
      }   
      else if (this.userRole.toUpperCase() === "TEACHER") {
        return this.$store.state.Student.students.filter(s => {
          return s.classroomId === this.loggedInUser.classroomId;
        });
      }
      else if(this.userRole.toUpperCase() === 'STUDENT') {
        return this.$store.state.Student.students.filter(s => {
          return s.classroomId === this.loggedInUser.classroomId;
        })
      }
      else {
        return this.$store.state.Student.students;
      }
      return this.$store.state.Student.students;
    }
  },
  mounted() {
    this.getStudents();
    this.$store.dispatch("Parent/getParents");
  },
  methods: {
    ...mapActions(["getStudents", "updateStudent", "deleteStudent"]),
    openEdit(item) {
      this.editedUser = item;
      this.dialog = true;
    },
    editStudent(student) {
      this.updateStudent(student);
      this.dialog = false;
    },
    openDelete(student) {
      this.deletedStudent = student;
      this.deleteDialog = true;
    },
    studentDelete(student) {
      this.deleteStudent(student.UserId);
      this.deleteDialog = false;
    },
    closeDialog() {
      this.editedUser = null;
      this.dialog = false;
    }
  }
};
</script>

<style></style>
