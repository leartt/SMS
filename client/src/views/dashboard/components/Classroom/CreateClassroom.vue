<template>
  <v-container>
    <v-alert color="success" v-if="success_message">{{success_message}}</v-alert>
    <v-alert color="error" v-if="error_message">{{ error_message }}</v-alert>

    <div class="my-5">
      <router-link :to="{name: 'Classroom'}">Go back to Classrooms</router-link>
    </div>

    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="name" label="Classroom name" :rules="nameRules" required></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-subheader class="pl-2">Please choose classroom capacity</v-subheader>

          <v-slider min="10" max="35" v-model="capacity" thumb-label="always"></v-slider>
        </v-col>

        <v-col cols="12" md="6">
          <v-btn color="primary" @click="submitForm">Submit</v-btn>
          <v-btn color="gray" @click="resetForm">Reset form</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Classroom");
export default {
  name: "CreateClassroom",
  data() {
    return {
      valid: false,
      success: false,
      error: false,

      name: "",
      capacity: 30,

      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length > 1) || "Name must be greater than 1 character"
      ]
    };
  },
  computed: {
    ...mapGetters(["error_message", "success_message"])
  },
  methods: {
    ...mapActions(["createClassroom"]),
    submitForm(e) {
      e.preventDefault();

      const classroom = {
        name: this.name,
        capacity: this.capacity
      };

      this.$refs.form.validate();
      if (this.valid) {
        this.createClassroom(classroom).then(res => {
          if (res.data.success) {
            this.$refs.form.reset();
          }
        });

        scroll(0, 0);
      }
    },
    resetForm() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
</style>