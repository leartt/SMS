<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">My Profile</div>

            <div class="subtitle-1 font-weight-light">Information about my account</div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="First Name" class="purple-input" :value="user.name" disabled/>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Last Name" class="purple-input" :value="user.surname" disabled/>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Email Address" class="purple-input" disabled />
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Adress" class="purple-input" :value="user.address" disabled/>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Phone" class="purple-input" :value="user.phone" disabled/>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Birthday" class="purple-input" :value="user.birthday" disabled/>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <base-material-card
          class="v-card-profile"
          :avatar="`http://localhost:5000/${user.photo_path}`"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              <!-- {{user.}} -->
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">{{user.name}} {{user.surname}}</h4>

            <p
              class="font-weight-light grey--text"
            >Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>

            <v-btn color="success" rounded class="mr-0">Follow</v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserProfile",
  computed: {
    user() {
      return this.$store.state.Auth.user;
    }
  },
  created() {
    this.$store.dispatch("Auth/getProfile");
  }
};
</script>
