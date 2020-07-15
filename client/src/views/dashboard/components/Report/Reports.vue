<template>
  <v-col cols="12">
    <v-card>
      <v-subheader>Generated reports</v-subheader>

      <v-list>
        <template v-for="(item, index) in reports">
          <v-list-item :key="item._id">
            <v-list-item-action>
              <img class="pdf-icon" src="../../../../assets/pdf.svg" alt="pdf icon" />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                <a
                  class="reports-links"
                  :href="`http://localhost:5000/${item.filePath}`"
                  target="_blank"
                >
                  <h5>{{item.name}} - {{item.date.split('T')[0]}} {{item.date.split('T')[1].split('.')[0]}}</h5>
                </a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-col>

  <!-- <v-container>
    <div class="reports-section">
      <a
        class="reports-links"
        v-for="report in reports"
        :key="report._id"
        :href="`http://localhost:5000/${report.filePath}`"
        target="_blank"
      >
        <h5>{{report.name}} - {{report.date.split('T')[0]}}</h5>
        <img class="pdf-icon" src="../../../../assets/pdf.svg" alt="pdf icon" />
      </a>
    </div>
  </v-container>-->
</template>

<script>
import axios from "axios";
export default {
  name: "Reports",
  data() {
    return {
      reports: null
    };
  },
  methods: {
    async getReports() {
      const res = await axios.get("http://localhost:5000/reports");
      this.reports = res.data.reports.reverse();
    }
  },
  mounted() {
    this.getReports();
  }
};
</script>

<style>
.reports-links {
  display: block;
  margin: 10px 0;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.reports-links h5 {
  padding: 0 10px;
  font-size: 1em;
  color: rgb(172, 25, 25);
}

.pdf-icon {
  width: 35px;
  height: 35px;
}

.reports-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>