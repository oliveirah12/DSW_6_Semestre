<template>
  <div class="chart-container">
    <chart-wrapper v-for="(chart, index) in charts" :key="index" :chart="chart" />
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import ChartWrapper from './ChartWrapper.vue';

export default {
  components: {
    ChartWrapper,
  },
  data() {
    return {
      charts: [
        {
          ref: 'temperatureChart',
          type: 'line',
          label: 'Temperatura',
          color: 'rgba(75, 192, 192, 1)',
          title: 'Temperatura (°C)',
        },
        {
          ref: 'humidityChart',
          type: 'bar',
          label: 'Umidade',
          color: 'rgba(255, 99, 132, 1)',
          title: 'Umidade (%)',
        },
      ],
    };
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await this.$axios.get('/grafico');
        const dados = response.data;

        this.charts.forEach((chart) => {
          chart.instance.data.labels = dados.timestamp;
          chart.instance.data.datasets[0].data = dados[chart.label.toLowerCase()];
          chart.instance.update();
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.charts.forEach((chart) => {
      chart.instance = new Chart(this.$refs[chart.ref].getContext('2d'), {
        type: chart.type,
        data: {
          labels: [],
          datasets: [
            {
              label: chart.label,
              data: [],
              borderColor: chart.color,
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
                text: chart.title,
              },
            },
          },
        },
      });
    });

    this.fetchChartData();
    setInterval(() => {
      this.fetchChartData();
    }, 300000);
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: space-between;
  max-width: 100vw;
}

.chart-wrapper {
  width: 40%;
  margin-right: 2%;
}
</style>
