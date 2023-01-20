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
export const chartColors = {
  blue: "#1D9BF0",
  green: "#00BA7C",
  red: "#F4212E",
  gray: "#829AAB",
  orange: "#FF7A00",
};
export const chartConfig = {
  scales: {
    x: {
      ticks: {
        callback: function (value: any, index: number, ticks: any): any {
          // @ts-ignore
          return months[Math.floor(this.getLabelForValue(value).slice(5)) - 1];
        },
        maxRotation: 0,
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        callback: function (value: any, index: number, ticks: any): any {
          // @ts-ignore
          let label = this.getLabelForValue(value);
          if (label.length >= 4) {
            let subLabel = label.slice(0, 3);
            if (subLabel[2] != 0) {
              return subLabel + "k";
            }
            return subLabel[0] + "k";
          }
          return label;
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
