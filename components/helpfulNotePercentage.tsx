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
import { chartConfig, chartColors } from "../utils/chartStyle";
import { styled } from "../utils/styles";
import Container from "./container";
import ContainerHeader from "./containerHeader";

import Number from "./number";
const StyledContent = styled("div", {
  padding: "1rem 2rem",
});
const NumberRow = styled("div", {
  display: "flex",
  alignItems: "end",
});
type noteTimeSeries = { [key: string]: number };

type props = {
  helpfulNotesTimeSeries: noteTimeSeries;
  notHelpfulNotesTimeSeries: noteTimeSeries;
  needsMoreRatingsNotesTimeSeries: noteTimeSeries;
  allNotesTimeSeries: noteTimeSeries;
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

const HelpfulNotePercentage = ({
  notHelpfulNotesTimeSeries,
  needsMoreRatingsNotesTimeSeries,
  helpfulNotesTimeSeries,
  allNotesTimeSeries,
}: props) => {
  const percentageTimeSeries: { [key: string]: string } = {};
  Object.keys(allNotesTimeSeries).forEach((month) => {
    percentageTimeSeries[month] = (
      (helpfulNotesTimeSeries[month] /
        (notHelpfulNotesTimeSeries[month] +
          needsMoreRatingsNotesTimeSeries[month] +
          helpfulNotesTimeSeries[month])) *
      100
    ).toFixed(1);
  });
  const timestamps = Object.keys(helpfulNotesTimeSeries);
  const allNotesData = {
    labels: Object.keys(allNotesTimeSeries),
    datasets: [
      {
        label: "Helpful Notes",
        borderColor: chartColors.green,
        data: percentageTimeSeries,
      },
    ],
  };
  const currentMonthCount: string =
    percentageTimeSeries[timestamps[timestamps.length - 1]];

  const previousMonthCount: string =
    percentageTimeSeries[timestamps[timestamps.length - 2]];
  return (
    <Container>
      <ContainerHeader text="Percentage of notes that reached a status of Helpful" />
      <StyledContent>
        <NumberRow>
          <Number number={currentMonthCount + "%"} label={"this month"} />
          <Number
            number={previousMonthCount + "%"}
            label="previous month"
            color="gray"
          />
        </NumberRow>
        <Line options={chartConfig} data={allNotesData} />
      </StyledContent>
    </Container>
  );
};

export default HelpfulNotePercentage;
