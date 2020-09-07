<template>
  <v-container>
    <v-data-table :headers="headers" :items="grades" class="elevation-1"></v-data-table>
    <v-btn v-if="userRole === 'student'" @click="generateGradeTranscript()" class="my-2 primary">Generate Transcript</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Grades",
  data() {
    return {
      search: "",
      grades: [],
      headers: [
        { text: "Course", value: "course.name" },
        { text: "Grade", value: "grade" },
        { text: "Points", value: "points" },
      ],
    };
  },
  created() {
    this.getGradeDatas();
  },
  computed: {
    student() {
      return this.$store.getters["Auth/user"];
    },
    userRole() {
      return this.$store.getters["Auth/user"].User.role;
    },
  },
  methods: {
    async generateGradeTranscript() {
      let reader = new FileReader();
      axios
        .post("http://localhost:5000/grade/transcript", this.grades)
          .then((res) => {
            const arrayBuffer = this.base64ToArrayBuffer(res.data);
            this.createAndDownloadBlobFile(arrayBuffer, "GradesTranscript");
          })
          .catch((err) => console.log(err));
    },
    base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      return bytes.map((byte, i) => binaryString.charCodeAt(i));
    },
    createAndDownloadBlobFile(body, filename, extension = "pdf") {
      const blob = new Blob([body]);
      console.log(blob);
      const fileName = `${filename}.${extension}`;
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, fileName);
      } else {
        const link = document.createElement("a");
        // Browsers that support HTML5 download attribute
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", fileName);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    async getGradeDatas() {
      try {
        let res = await axios.get("http://localhost:5000/grade");
        if (res.data.success) {
          this.grades = res.data.grades.filter((gr) => {
            return gr.student.id == this.student.id;
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>