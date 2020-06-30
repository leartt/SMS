<template>
  <v-container>
    <v-alert v-if="success_message" color="success">{{success_message}}</v-alert>
    <v-alert v-if="error_message" color="error">{{error_message}}</v-alert>

    <v-card>
      <v-card-title class="my-3">
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        <router-link v-if="userRole === 'admin'" to="classrooms/create">
          <v-btn color="green" class="mx-2">Create new Classroom</v-btn>
        </router-link>
      </v-card-title>

      <v-data-table :headers="headers" :items="classrooms" :search="search">
        <template v-if="userRole === 'admin'" v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEdit(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="openDelete(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-dialog v-if="editedClassroom" v-model="dialog" :retain-focus="false" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Classroom</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedClassroom.name" label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-col cols="12">
                    <v-subheader class="pl-2">Capacity</v-subheader>
                    <v-slider
                      min="10"
                      max="35"
                      v-model="editedClassroom.capacity"
                      thumb-label="always"
                    ></v-slider>
                  </v-col>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" text @click="editClassroom(editedClassroom)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-if="deletedClassroom" v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >Delete Classroom {{deletedClassroom.name}}</v-card-title>

          <v-card-text>Are you sure you want to delete this Classroom?</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" text @click="classroomDelete(deletedClassroom)">Yes, I am sure</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Classroom");
export default {
  name: "Classroom",
  data() {
    return {
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Capacity", value: "capacity" },
        { text: "Date Created", value: "createdAt" },
        { text: "Actions", value: "actions", sortable: false }
      ],

      dialog: false,
      deleteDialog: false,
      editedClassroom: null,
      deletedClassroom: null
    };
  },
  created() {
    this.getClassrooms();
  },
  computed: {
    ...mapGetters(["classrooms", "success_message", "error_message"]),
    userRole() {
      return this.$store.getters["Auth/user"].User.role;
    },
    loggedInUser() {
      return this.$store.getters["Auth/user"];
    }
  },
  methods: {
    ...mapActions(["getClassrooms", "deleteClassroom"]),
    openEdit(item) {
      this.editedClassroom = item;
      this.dialog = true;
    },
    editClassroom(classroom) {
      this.dialog = false;
    },
    openDelete(classroom) {
      this.deletedClassroom = classroom;
      this.deleteDialog = true;
    },
    classroomDelete(classroom) {
      this.deleteClassroom(classroom.id);
      this.deleteDialog = false;
    },
    closeDialog() {
      this.editedClassroom = null;
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>