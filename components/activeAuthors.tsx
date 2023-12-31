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
import { chartConfig } from "../utils/chartStyle";

const StyledContent = styled("div", {
  padding: "1rem 2rem",
});

const NumberRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "end",
});

type props = {
  activeAuthorsTimeSeries: { [key: string]: number };
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
  const currentMonthCount =
    activeAuthorsTimeSeries[
      Object.keys(activeAuthorsTimeSeries)[
        Object.keys(activeAuthorsTimeSeries).length - 1
      ]
    ];
  const previousMonthCount =
    activeAuthorsTimeSeries[
      Object.keys(activeAuthorsTimeSeries)[
        Object.keys(activeAuthorsTimeSeries).length - 2
      ]
    ];
  return (
    <Container>
      <ContainerHeader text="Active note writers monthly" />
      <StyledContent>
        <NumberRow>
          <Number number={currentMonthCount} label={"this month"} />
          <Number
            number={previousMonthCount}
            label="previous month"
            color="gray"
          />
        </NumberRow>
        <Line options={chartConfig} data={activeAuthorsData} />
      </StyledContent>
    </Container>
  );
};

export default ActiveAuthors;
