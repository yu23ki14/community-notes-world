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

const HelpfulNoteActivity = ({ helpfulNotesTimeSeries }: props) => {
  const timestamps = Object.keys(helpfulNotesTimeSeries);

  const helpfulData = {
    labels: timestamps,
    datasets: [
      {
        label: "Helpful Notes",
        borderColor: chartColors.green,
        data: helpfulNotesTimeSeries,
      },
    ],
  };

  const currentMonthCount: number =
    helpfulNotesTimeSeries[timestamps[timestamps.length - 1]];

  const previousMonthCount: number =
    helpfulNotesTimeSeries[timestamps[timestamps.length - 2]];

  return (
    <Container>
      <ContainerHeader text="Notes that reached a status of Helpful" />
      <StyledContent>
        <NumberRow>
          <Number number={currentMonthCount} label={"this month"} />
          <Number
            number={previousMonthCount}
            label="previous month"
            size="secondary"
          />
        </NumberRow>
        <Line options={chartConfig} data={helpfulData} />
      </StyledContent>
    </Container>
  );
};

export default HelpfulNoteActivity;
