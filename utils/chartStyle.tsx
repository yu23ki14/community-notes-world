const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dez",
];
export const chartConfig = {
  scales: {
    x: {
      ticks: {
        callback: function (value: any, index: number, ticks: any): any {
          return months[Math.floor(this.getLabelForValue(value).slice(5)) - 1];
        },
        maxRotation: 0,
      },
    },
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 8,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};
