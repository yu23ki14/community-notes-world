import { Line } from "react-chartjs-2";
import Container from "./container";
import ContainerHeader from "./containerHeader";
import { TabContent, TabList, TabTrigger, TabRoot } from "./tabs";
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
  // borderTop: "1px solid $slate6",
  padding: "2rem",
});

type props = {
  activeAuthorsTimeSeries: any;
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

const ActiveAuthors = ({ activeAuthorsTimeSeries }: props) => {
  const activeAuthorsData = {
    labels: Object.keys(activeAuthorsTimeSeries),
    datasets: [
      {
        label: "Active note writers",
        borderColor: "hsl(206, 100%, 50%)",
        data: activeAuthorsTimeSeries,
      },
    ],
  };
  return (
    <Container>
      <ContainerHeader text="Active note writers monthly" />
      <StyledContent>
        <Line options={options} data={activeAuthorsData} />
      </StyledContent>
    </Container>
  );
};

export default ActiveAuthors;
