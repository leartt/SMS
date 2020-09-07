<template>
  <v-container>
    <v-alert color="success" v-if="success_message">{{success_message}}</v-alert>
    <v-alert color="error" v-if="error_message">{{ error_message }}</v-alert>

    <router-link :to="{name: 'Feedback'}">Go back to Feedbacks</router-link>

    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12">
          <v-textarea
            solo
            v-model="description"
            label="Description"
            required
            :rules="descriptionRules"
          ></v-textarea>
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="teacherId"
            :items="teachers"
            item-text="name"
            item-value="id"
            :rules="teacherRules"
            label="Choose a teacher to give feedback to"
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-avatar>
                  <img :src="`http://localhost:5000/${item.photo_path}`" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    :id="attrs['aria-labelledby']"
                    v-text="`${item.name} ${item.surname}`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-btn color="primary" @click="submitForm">Register</v-btn>
          <v-btn color="gray" @click="resetForm">Reset form</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Feedback");

export default {
  name: "CreateFeedback",
  data() {
    return {
      valid: false,
      success: false,
      error: false,

      description: "",
      teacherId: 0,
      photo_path: null,

      descriptionRules: [
        v => !!v || "Description is required",
        v => (v && v.length > 1) || "Description must be greater than 1 character"
      ],
      teacherRules: [v => !!v || "Teacher must be selected"]
    };
  },
  created() {
    this.$store.dispatch("Teacher/getTeachers");
    this.$store.dispatch("Auth/getProfile");
  },
  computed: {
    ...mapGetters(["success_message", "error_message"]),
    teachers() {
      return this.$store.state.Teacher.teachers;
    },
  },
  methods: {
    ...mapActions(["createFeedback"]),
    submitForm(e) {
      e.preventDefault();

      this.$refs.form.validate();

      const feedback = {
        description: this.description,
        teacherId: this.teacherId,
        parentId: this.$store.state.Auth.user.id,
      };

      if (this.valid) {
        this.createFeedback(feedback)
          .then(res => {
            if (res.data.success) {
              this.$refs.form.reset();
            }
          })
          .catch(err => console.error(err));
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