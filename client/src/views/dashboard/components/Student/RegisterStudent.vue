<template>
  <v-container>
    <v-alert color="success" v-if="success_message">{{success_message}}</v-alert>
    <v-alert color="error" v-if="error_message">{{ error_message }}</v-alert>

    <router-link :to="{name: 'Student'}">Go back to Students</router-link>

    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" label="Name" :rules="nameRules" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="surname" label="Surname" :rules="surnameRules" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            :rules="passwordRules"
            hint="At least 8 characters"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="address" label="Address" :rules="addressRules" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="phone" label="Phone" :rules="phoneRules" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-date-picker v-model="birthday" label="Birthday" :rules="birthdayRules" required></v-date-picker>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="parentId"
            :items="parents"
            item-text="name"
            item-value="id"
            :rules="parentRules"
            label="Choose a parent"
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

        <v-col cols="12">
          <v-file-input
            type="file"
            v-model="photo_path"
            :rules="photoRules"
            placeholder="Choose a photo"
            required
          ></v-file-input>
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
const { mapGetters, mapActions } = createNamespacedHelpers("Student");

export default {
  name: "Students",
  data: () => ({
    valid: false,
    success: false,
    error: false,

    email: "",
    role: "student",
    password: "",
    name: "",
    surname: "",
    address: "",
    phone: "",
    birthday: null,
    parentId: "",
    photo_path: null,
    parentsList: null,

    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length > 1) || "Name must be greater than 1 character"
    ],
    surnameRules: [
      v => !!v || "Surname is required",
      v => (v && v.length > 1) || "Surname must be greater than 1 character"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length > 5) || "Password must be greater than 5 characters"
    ],
    addressRules: [v => !!v || "Address is required"],
    phoneRules: [
      v => !!v || "Phone is required",
      v => (v && v.length > 5) || "Phone number must be at least 6 characters"
    ],
    birthdayRules: [v => !!v || "Birthday is required"],
    photoRules: [v => !!v || "Photo is required"],
    parentRules: [v => !!v || "Parent must be selected"]
  }),
  mounted() {
    this.$store.dispatch("Parent/getParents");
  },
  computed: {
    ...mapGetters(["success_message", "error_message"]),
    parents() {
      return this.$store.state.Parent.parents;
    }
  },
  methods: {
    ...mapActions(["addStudent", "getStudentById"]),

    onFileSelected(e) {
      this.photo_path = e.target.files[0];
    },

    submitForm(e) {
      e.preventDefault();

      this.$refs.form.validate();
      if (this.valid) {
        const formData = new FormData();
        formData.set("email", this.email);
        formData.set("password", this.password);
        formData.set("role", this.role);
        formData.set("name", this.name);
        formData.set("surname", this.surname);
        formData.set("address", this.address);
        formData.set("phone", this.phone);
        formData.set("birthday", this.birthday);
        formData.set("parentId", this.parentId);
        formData.append("photo_path", this.photo_path, this.photo_path.name);

        scroll(0, 0);

        this.addStudent(formData)
          .then(res => {
            if (res.data.success) {
              this.$refs.form.reset()
            }
          })
          .catch(err => console.log(err));
      }
    },
    resetForm() {
      this.$refs.form.reset()
    }
  } 
};
</script>

<style></style>
