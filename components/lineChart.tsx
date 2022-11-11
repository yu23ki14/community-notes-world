import { Line } from "react-chartjs-2";
import { note } from "../utils/types";
import getTimeSeries from "../utils/getTimeseries";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

type props = {
  allHelpfulNotes: note[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const LineChart = ({ allHelpfulNotes }: props) => {
  const timeSeries = getTimeSeries(allHelpfulNotes);
  const data = {
    labels: timeSeries.labels,
    datasets: [
      {
        label: "my numbers",
        data: timeSeries.counts,
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
