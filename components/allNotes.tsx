import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { styled } from "../utils/styles";
import { numberWithCommas } from "../utils/math";
import Container from "./container";
import ContainerHeader from "./containerHeader";
import Number from "./number";

type noteTimeSeries = { [key: string]: number };

type props = {
  allNotesTimeSeries: noteTimeSeries;
};
const StyledContent = styled("div", {
  padding: "1rem 2rem",
});
const NumberRow = styled("div", {
  display: "flex",
  alignItems: "end",
});
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

const AllNotes = ({ allNotesTimeSeries }: props) => {
  const data = {
    labels: Object.keys(allNotesTimeSeries),
    datasets: [
      {
        label: "Notes written",
        borderColor: "hsl(206, 100%, 50%)",
        data: allNotesTimeSeries,
      },
    ],
  };
  let count: number = 0;
  Object.keys(allNotesTimeSeries).forEach((month) => {
    count = count + allNotesTimeSeries[month];
  });
  return (
    <Container>
      <ContainerHeader text="All notes written by contributors" />
      <StyledContent>
        <NumberRow>
          <Number number={numberWithCommas(count)} label={"all time"} />
        </NumberRow>
        <Line options={options} data={data} />
      </StyledContent>
    </Container>
  );
};

export default AllNotes;
