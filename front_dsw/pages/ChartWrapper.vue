<template>
    <div class="chart-wrapper">
      <canvas ref="chartCanvas" width="400" height="400"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    props: {
      chart: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        chartInstance: null,
      };
    },
    watch: {
      chart: 'updateChart',
    },
    methods: {
      updateChart() {
        this.chartInstance.data.labels = this.chart.instance.data.labels;
        this.chartInstance.data.datasets[0].data = this.chart.instance.data.datasets[0].data;
        this.chartInstance.update();
      },
    },
    mounted() {
      this.chartInstance = new Chart(this.$refs.chartCanvas.getContext('2d'), {
        type: this.chart.type,
        data: {
          labels: [],
          datasets: [
            {
              label: this.chart.label,
              data: [],
              borderColor: this.chart.color,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: this.chart.title,
              },
            },
          },
        },
      });
    },
  };
  </script>
  
  <style scoped>
  /* Certifique-se de que as regras CSS para .chart-wrapper estão corretas */
  .chart-wrapper {
    width: 40%;
    margin-right: 2%;
  }
  </style>
  