<template>
  <v-container>
    <v-alert v-if="success_message" color="success">{{success_message}}</v-alert>
    <v-alert v-if="error_message" color="error">{{error_message}}</v-alert>

    <v-card>
      <v-card-title class="my-3">
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        <router-link v-if="userRole === 'admin'" :to="{name: 'Register Admin'}">
          <v-btn color="green" class="mx-2">Register New Admin</v-btn>
        </router-link>
      </v-card-title>

      <v-data-table :headers="headers" :items="admins" :search="search">
        <template v-if="userRole === 'admin'" v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEdit(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="openDelete(item)">mdi-delete</v-icon>
        </template>

        <template v-slot:item.avatars="{ item }">
          <v-avatar>
            <img :src="`http://localhost:5000/${item.photo_path}`" :alt="item.name" />
          </v-avatar>
        </template>

      </v-data-table>

      <v-dialog v-if="editedUser" v-model="dialog" :retain-focus="false" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Admin</span>
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
            <v-btn color="blue darken-1" text @click="editAdmin(editedUser)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-if="deletedAdmin" v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >Delete Admin {{deletedAdmin.name}} {{deletedAdmin.surname}}</v-card-title>

          <v-card-text>Are you sure you want to delete this Admin?</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" text @click="adminDelete(deletedAdmin)">Yes, I am sure</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Admin");

export default {
  name: "Admin",
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
        { text: "Image", value: "avatars" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      dialog: false,
      deleteDialog: false,
      editedUser: null,
      deletedAdmin: null
    };
  },
  computed: {
    ...mapGetters(["admins", "success_message", "error_message"]),
    userRole() {
      return this.$store.getters["Auth/user"].User.role;
    },
    loggedInUser() {
      return this.$store.getters["Auth/user"];
    }
  },
  mounted() {
    this.getAdmins();
  },
  methods: {
    ...mapActions(["getAdmins", "updateAdmin", "deleteAdmin"]),
    openEdit(item) {
      this.editedUser = item;
      this.dialog = true;
    },
    editAdmin(admin) {
      this.updateAdmin(admin);
      this.dialog = false;
    },
    openDelete(admin) {
      this.deletedAdmin = admin;
      this.deleteDialog = true;
    },
    adminDelete(admin) {
      if (this.loggedInUser.UserId === admin.UserId) {
        this.deleteAdmin(admin.UserId);
        this.$store.dispatch("Auth/logout");
      } else {
        this.deleteAdmin(admin.UserId);
      }
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
