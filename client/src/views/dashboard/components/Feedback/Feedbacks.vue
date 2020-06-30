<template>
  <v-container>

    <v-alert v-if="feedbackSuccess" color="green">{{feedbackSuccess}}</v-alert>

    <router-link v-if="userRole === 'parent'" :to="{name: 'Create Feedback'}">Create a new Feedback</router-link>

    <v-card>
      <v-card-title>
        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="feedbacks" :search="search">
        <template v-slot:item.parent="{ item }">
          <p>{{item.Parent.name}} {{item.Parent.surname}}</p>
        </template>

        <template v-slot:item.teacher="{ item }">
          <p>{{item.Teacher.name}} {{item.Teacher.surname}}</p>
        </template>

        <template v-slot:item.dateCreated="{ item }">
          <p>{{item.createdAt.substring(0,10)}}</p>
        </template>
      </v-data-table>
    </v-card>

    
    <v-btn v-if="userRole === 'admin'" @click="generateReport()" color="warning">Generate Report</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Feedback");

export default {
  name: "Feedbacks",
  data() {
    return {
      search: "",
      feedbackSuccess: '',
      headers: [
        { text: "ID", value: "id" },
        { text: "Description", value: "description" },
        { text: "Created By", value: "parent" },
        { text: "Created For", value: "teacher" },
        { text: "Date Created", value: "dateCreated" }
      ]
    };
  },
  computed: {
    ...mapGetters(["feedbacks"]),
    feedbacks() {
      if(this.userRole === 'parent') {
          return this.$store.state.Feedback.feedbacks.filter(f => {
            return f.parentId == this.loggedInUser.id
          })
      }
      else if(this.userRole === 'teacher') {
          return this.$store.state.Feedback.feedbacks.filter(f => {
            return f.teacherId == this.loggedInUser.id
          })
      }
      else {
        return this.$store.state.Feedback.feedbacks;
      }
    },
    userRole() {
      return this.$store.getters['Auth/user'].User.role;
    },
    loggedInUser() {
      return this.$store.getters['Auth/user'];
    }
  },
  methods: {
    ...mapActions(["getFeedbacks"]),
    generateReport() {
      let feedbacks = this.$store.state.Feedback.feedbacks;
      
      axios.post('http://localhost:5000/feedback/report', feedbacks)
        .then(res => {
          if(res.data.success) {
            this.feedbackSuccess = 'Report has been generated successfully.'
            setTimeout(() => {
              this.feedbackSuccess = '';
            }, 3000)
          }
        })
        .catch(err => console.error(err));
    }
  },
  created() {
    this.getFeedbacks();
  }
};
</script>

<style>
</style>