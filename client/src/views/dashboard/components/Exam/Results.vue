<template>
  <v-container>
    <v-alert color="error" v-if="errorMessage">{{errorMessage}}</v-alert>
    <v-alert color="green" v-if="successMessage">{{successMessage}}</v-alert>
    <v-form ref="form" v-model="valid" v-if="userRole === 'admin' || userRole === 'teacher'">
      <p style="font-size: 1.6rem">Upload exam results in Excel or PDF File</p>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" label="Name" :rules="nameRules" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-file-input
            type="file"
            v-model="filePath"
            :rules="fileRules"
            placeholder="Choose an excel or pdf file"
            required
          ></v-file-input>
        </v-col>

        <v-col cols="12" class="my-3">
          <v-btn color="primary" type="submit" @click="submitForm">Submit</v-btn>
          <v-btn color="gray" @click="resetForm">Reset Form</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-col cols="12">
      <v-card>
        <v-subheader>Generated Exam Results</v-subheader>

        <v-list>
          <template v-for="(item, index) in examResults">
            <v-list-item :key="item._id">
              <v-list-item-action>
                <img
                  class="icon"
                  :src="(/xlsx*/).test(item.filePath.split('.')[1]) ?
                     require('@/assets/msexcel.svg') : require('@/assets/pdf.svg')"
                  alt="icon"
                />
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title style="overflow-x: auto">
                  <a
                    class="exam-results-links"
                    :href="`http://localhost:5000/${item.filePath}`"
                    target="_blank"
                  >
                    <h5>{{item.name}} - {{item.date.split('T')[0]}} {{item.date.split('T')[1].split('.')[0]}}</h5>
                  </a>
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action v-if="userRole === 'admin'">
                <v-btn @click="deleteExamResult(item)" color="error">Delete</v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "ExamResults",
  data() {
    return {
      name: "",
      filePath: null,
      results: [],
      successMessage: "",
      errorMessage: "",

      nameRules: [v => !!v || "Name is required"],
      fileRules: [v => !!v || "File is required"],
      valid: false
    };
  },
  created() {
    this.getExamResults();
  },
  computed: {
    userRole() {
      return this.$store.getters["Auth/user"].User.role;
    },
    examResults: {
        get() {
          return this.results;
        },
        set(value) {
          this.results = value;
        }
    }
  },
  methods: {
    async getExamResults() {
      const response = await axios.get("http://localhost:5000/result/exam");
      this.results = response.data.examsResult;
    },
    async submitForm(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.set("name", this.name);
      formData.append("filePath", this.filePath, this.filePath.name);

      this.$refs.form.validate();
      if (this.valid) {
        scroll(0, 0);
        try {
          const res = await axios.post(
            "http://localhost:5000/result/exam",
            formData
          );
          if (res.data.success) {
            this.successMessage = "File uploaded successfully";
            this.getExamResults();
            setTimeout(() => {
              this.successMessage = "";
            }, 3000);
            this.$refs.form.reset();
          } else {
            this.errorMessage = res.data.msg;
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },
    async deleteExamResult(item) {
      try {
        const res = await axios.delete(`http://localhost:5000/result/exam/${item._id}`);
        if (res.data.success) {
          this.successMessage = res.data.msg;
          this.examResults = this.results.filter(examFile => {
            return examFile._id != item._id; 
          })
          setTimeout(() => {
            this.successMessage = "";
          }, 3000);
        }
      } catch (err) {
        this.errorMessage = err;
      }
    }
  }
};
</script>

<style scoped>
.exam-results-links {
  display: block;
  margin: 10px 0;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.exam-results-links h5 {
  padding: 0 10px;
  font-size: 1em;
  color: black;
}

.icon {
  width: 35px;
  height: 35px;
}

.exam-result-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>