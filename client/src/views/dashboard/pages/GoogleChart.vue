<template>
    <GChart
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
    />
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  components: {
    GChart
  },
  data() {
    return {
      chartData: [
        ["Month", "Exams"],
        ["Jan", 10] ,
        ["Feb", 5],
        ["March", 15],
        ["April", 10],
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      }
    }
  },
  computed: {

  }
};
</script>

<style>
</style>