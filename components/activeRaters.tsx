import { Line } from "react-chartjs-2";
import Container from "./container";
import ContainerHeader from "./containerHeader";
import Number from "./number";
import { styled } from "../utils/styles";
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

const StyledContent = styled("div", {
  padding: "1rem 2rem",
});

const NumberRow = styled("div", {
  display: "flex",
});

type props = {
  activeRatersTimeSeries: { [key: string]: number };
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
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const ActiveRaters = ({ activeRatersTimeSeries }: props) => {
  const activeRatersData = {
    labels: Object.keys(activeRatersTimeSeries),
    datasets: [
      {
        label: "Active note writers",
        borderColor: "hsl(206, 100%, 50%)",
        data: activeRatersTimeSeries,
      },
    ],
  };
  const currentMonthCount =
    activeRatersTimeSeries[
      Object.keys(activeRatersTimeSeries)[
        Object.keys(activeRatersTimeSeries).length - 1
      ]
    ];
  const previousMonthCount =
    activeRatersTimeSeries[
      Object.keys(activeRatersTimeSeries)[
        Object.keys(activeRatersTimeSeries).length - 2
      ]
    ];
  return (
    <Container>
      <ContainerHeader text="Active note raters monthly" />
      <StyledContent>
        <NumberRow>
          <Number number={currentMonthCount} label={"this month"} />
          <Number number={previousMonthCount} label={"previous month"} />
        </NumberRow>
        <Line options={options} data={activeRatersData} />
      </StyledContent>
    </Container>
  );
};

export default ActiveRaters;
