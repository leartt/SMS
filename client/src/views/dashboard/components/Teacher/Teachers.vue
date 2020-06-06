<template>
  <v-container>
    <v-alert v-if="success_message" color="success">{{success_message}}</v-alert>
    <v-alert v-if="error_message" color="error">{{error_message}}</v-alert>
    <v-card>
      <v-card-title class="my-3">
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        <router-link to="/teachers/register">
          <v-btn color="green" class="mx-2">Register New Teacher</v-btn>
        </router-link>
      </v-card-title>

      <v-data-table :headers="headers" :items="teachers" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEdit(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="openDelete(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-dialog v-if="editedUser" v-model="dialog" :retain-focus="false" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit teacher</span>
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
                  <v-text-field v-model="editedUser.email" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedUser.password"
                    type="password"
                    label="Password"
                    hint="At least 8 characters"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedUser.address" label="Address" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field v-model="editedUser.phone" label="Phone" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-date-picker v-model="editedUser.birthday" label="Birthday" required></v-date-picker>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false, editedUser = null">Close</v-btn>
            <v-btn color="blue darken-1" text @click="editTeacher(editedUser)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-if="deletedTeacher" v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >Delete Teacher {{deletedTeacher.name}} {{deletedTeacher.surname}}</v-card-title>

          <v-card-text>Are you sure you want to delete this teacher?</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" text @click="teacherDelete(deletedTeacher)">Yes, I am sure</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Teacher");

export default {
  name: "Teacher",
  data() {
    return {
      search: "",

      headers: [
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "Email", value: "email" },
        { text: "Address", value: "address" },
        { text: "Phone", value: "phone" },
        { text: "Birthday", value: "birthday" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      dialog: false,
      deleteDialog: false,
      editedUser: null,
      deletedTeacher: null
    };
  },
  computed: {
    ...mapGetters(["teachers", "success_message", "error_message"])
  },
  mounted() {
    this.getTeachers();
  },
  methods: {
    ...mapActions(["getTeachers", "updateTeacher", "deleteTeacher"]),
    openEdit(item) {
      this.editedUser = item;
      this.dialog = true;
    },
    editTeacher(teacher) {
      this.updateTeacher(teacher);
      this.dialog = false;
    },
    openDelete(teacher) {
      this.deletedTeacher = teacher;
      this.deleteDialog = true;
    },
    teacherDelete(teacher) {
      this.deleteTeacher(teacher.id);
      this.deleteDialog = false;
    }
  }
};
</script>

<style>
</style>