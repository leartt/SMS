<template>
  <v-container>
    <v-alert color="success" v-if="success_message">{{success_message}}</v-alert>
    <v-alert color="error" v-if="error_message">{{ error_message }}</v-alert>

    <router-link :to="{name: 'Parent'}">Go back to Parents</router-link>

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
            hint="At least 6 characters"
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
          <v-file-input
            v-model="photo_path"
            type="file"
            placeholder="Choose image"
            :rules="photoRules"
            required
          ></v-file-input>
        </v-col>

        <v-col cols="12" class="my-3">
          <v-btn color="primary" type="submit" @click="submitForm">Register</v-btn>
          <v-btn color="gray" @click="resetForm">Reset Form</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Parent");

export default {
  name: "RegisterParent",
  data: () => ({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "parent",
    address: "",
    phone: "",
    birthday: null,
    photo_path: null,

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
      v => (v && v.length > 5) || "Password must be at least 6 characters"
    ],
    addressRules: [v => !!v || "Address is required"],
    phoneRules: [
      v => !!v || "Phone is required",
      v => (v && v.length > 5) || "Phone number must be at least 6 characters"
    ],
    birthdayRules: [v => !!v || "Birthday is required"],
    photoRules: [v => !!v || "Photo is required"],
    valid: false
  }),
  computed: {
    ...mapGetters(["success_message", "error_message"])
  },
  methods: {
    ...mapActions(["addParent"]),
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
        formData.append("photo_path", this.photo_path, this.photo_path.name);
        scroll(0, 0);
        this.addParent(formData)
          .then(res => {
            if (res.data.success) {
              this.$refs.form.reset();
            }
          })
          .catch(err => console.log(err));
      }
    },
    resetForm() {
      this.$refs.form.reset();
    }
  }
};
</script>