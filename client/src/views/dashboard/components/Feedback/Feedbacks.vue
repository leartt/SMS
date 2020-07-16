<template>
  <v-container>
    <v-alert v-if="feedbackSuccess" color="green">{{feedbackSuccess}}</v-alert>

    <router-link v-if="userRole === 'parent'" :to="{ name: 'Create Feedback' }">Create a new Feedback</router-link>

    <v-card>
      <v-card-title>
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="feedbacks" :search="search">
        <template
          v-if="userRole === 'admin' || userRole === 'parent'"
          v-slot:item.actions="{ item }"
        >
          <v-icon small class="mr-2" @click="openDelete(item)">mdi-delete</v-icon>
        </template>

        <template v-slot:item.parent="{ item }">
          <p>{{ item.Parent.name }} {{ item.Parent.surname }}</p>
        </template>

        <template v-slot:item.teacher="{ item }">
          <p>{{ item.Teacher.name }} {{ item.Teacher.surname }}</p>
        </template>

        <template v-slot:item.dateCreated="{ item }">
          <p>{{ item.createdAt.substring(0, 10) }}</p>
        </template>
      </v-data-table>

      <v-dialog v-if="deleteFeedback" v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Delete</v-card-title>

          <v-card-text>Are you sure you want to delete this Feedback?</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="deleteDialog = false">No</v-btn>
            <v-btn color="primary" text @click="feedbackDelete(deletedFeedback)">Yes, I am sure</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>

    <v-btn v-if="userRole === 'admin'" @click="generateReport()" color="warning">Generate Report</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Feedback");

export default {
  name: "Feedbacks",
  data() {
    return {
      search: "",
      feedbackSuccess: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Description", value: "description" },
        { text: "Created By", value: "parent" },
        { text: "Created For", value: "teacher" },
        { text: "Date Created", value: "dateCreated" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      deleteDialog: false,
      deletedFeedback: null
    };
  },
  computed: {
    ...mapGetters(["feedbacks"]),
    feedbacks() {
      if (this.userRole === "parent") {
        return this.$store.state.Feedback.feedbacks.filter(f => {
          return f.parentId == this.loggedInUser.id;
        });
      } else if (this.userRole === "teacher") {
        return this.$store.state.Feedback.feedbacks.filter(f => {
          return f.teacherId == this.loggedInUser.id;
        });
      } else {
        return this.$store.state.Feedback.feedbacks;
      }
    },
    userRole() {
      return this.$store.getters["Auth/user"].User.role;
    },
    loggedInUser() {
      return this.$store.getters["Auth/user"];
    }
  },
  methods: {
    ...mapActions(["getFeedbacks", "deleteFeedback"]),
    generateReport() {
      let feedbacks = this.$store.state.Feedback.feedbacks;

      axios
        .post("http://localhost:5000/feedback/report", feedbacks)
        .then(res => {
          if (res.data.success) {
            this.feedbackSuccess = "Report has been generated successfully.";
            setTimeout(() => {
              this.feedbackSuccess = "";
            }, 3000);
          }
        })
        .catch(err => console.error(err));
    },
    openDelete(item) {
      this.deletedFeedback = item;
      this.deleteDialog = true;
    },
    feedbackDelete(feedback) {
      this.deleteDialog = false;
      this.deleteFeedback(feedback.id);
    }
  },
  created() {
    this.getFeedbacks();
  }
};
</script>

<style></style>
