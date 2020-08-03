<template>
  <v-container>
    <v-alert color="success" v-if="success_message">{{success_message}}</v-alert>
    <v-alert color="error" v-if="error_message">{{ error_message }}</v-alert>

    <router-link :to="{name: 'Courses'}">Go back to Courses</router-link>

    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="name" label="Name" :rules="nameRules"></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="teacher"
            :items="teachers"
            item-text="name"
            item-value="id"
            :rules="teacherRules"
            label="Choose lecturer(teacher)"
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
          <v-btn color="gray" @click="resetForm()">Reset form</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Course");

export default {
  name: "AddCourse",
  data() {
    return {
      valid: false,
      success: false,
      error: false,

      name: "",
      teacher: '',

      nameRules: [v => !!v || "Name is required"],
      teacherRules: [v => !!v || "Teacher must be selected"]
    };
  },
  created() {
    this.$store.dispatch("Teacher/getTeachers");
  },
  computed: {
    ...mapGetters(["success_message", "error_message"]),
    teachers() {
      return this.$store.state.Teacher.teachers;
    }
  },
  methods: {
    ...mapActions(["createCourse"]),
    submitForm(e) {
      e.preventDefault();

      this.$refs.form.validate();

      const course = {
        name: this.name,
        teacher: this.teacher
      };

      if (this.valid) {
        this.createCourse(course)
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