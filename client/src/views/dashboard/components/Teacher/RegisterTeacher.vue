<template>
  <v-container>
      
    <v-alert color="success" v-if="success_message">{{success_message}}</v-alert>
    <v-alert color="error" v-if="error_message">{{ error_message }}</v-alert>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" label="Name" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="surname" label="Surname" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="password"
            type="password"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="address" label="Address" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="phone" label="Phone" required></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-date-picker v-model="birthday" label="Birthday" required></v-date-picker>
        </v-col>

        <v-btn color="primary" @click.prevent="submitForm">Register</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Teacher");

export default {
  name: "RegisterTeacher",
  data: () => ({
    name: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    birthday: null,
   
  }),
  computed: {
    ...mapGetters(["success_message", "error_message"])
  },
  methods: {
    ...mapActions(["addTeacher"]),
    async submitForm() {
      const teacher = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        address: this.address,
        phone: this.phone,
        birthday: this.birthday
      };
      scroll(0, 0);
      this.addTeacher(teacher).then(res => {
        if (res.data.success) {
          this.name = "";
          this.surname = "";
          this.email = "";
          this.password = "";
          this.address = "";
          this.phone = "";
          this.birthday = null;
        }
      });
    }
  }
};
</script>