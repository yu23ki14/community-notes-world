import { Line } from "react-chartjs-2";
import { note } from "../utils/types";
import getMonthlyTimeSeries from "../utils/getMonthlyTimeSeries";
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
import { chartConfig, chartColors } from "../utils/chartStyle";
const StyledTabContent = styled(TabContent, {
  borderTop: "1px solid $slate6",
  padding: "2rem",
  '&[data-state="inactive"]': {
    display: "none",
  },
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

const NoteActivity = ({
  allNotesTimeSeries,
  helpfulNotesTimeSeries,
  notHelpfulNotesTimeSeries,
  needsMoreRatingsNotesTimeSeries,
}: props) => {
  const helpfulData = {
    labels: Object.keys(helpfulNotesTimeSeries),
    datasets: [
      {
        label: "Helpful Notes",
        borderColor: chartColors.green,
        data: helpfulNotesTimeSeries,
      },
    ],
  };
  const notHelpfulData = {
    labels: Object.keys(notHelpfulNotesTimeSeries),
    datasets: [
      {
        label: "Not Helpful Notes",
        borderColor: chartColors.red,
        data: notHelpfulNotesTimeSeries,
      },
    ],
  };
  const allNotesData = {
    labels: Object.keys(allNotesTimeSeries),
    datasets: [
      {
        label: "Helpful Notes",
        borderColor: chartColors.green,
        data: helpfulNotesTimeSeries,
      },
      {
        label: "Not Helpful Notes",
        borderColor: chartColors.red,
        data: notHelpfulNotesTimeSeries,
      },
      {
        label: "Needs More Ratings Notes",
        borderColor: chartColors.gray,
        data: needsMoreRatingsNotesTimeSeries,
      },
    ],
  };
  return (
    <Container>
      <ContainerHeader text="Notes written by current status" />
      <TabRoot defaultValue="all" orientation="horizontal">
        <TabList aria-label="leaderboard">
          <TabTrigger value="all">All notes</TabTrigger>
          <TabTrigger value="helpful">Helpful </TabTrigger>
          <TabTrigger value="notHelpful">Not Helpful</TabTrigger>
        </TabList>
        <StyledTabContent value="all">
          <Line options={chartConfig} data={allNotesData} />
        </StyledTabContent>
        <StyledTabContent value="helpful">
          <Line options={chartConfig} data={helpfulData} />
        </StyledTabContent>
        <StyledTabContent value="notHelpful">
          <Line options={chartConfig} data={notHelpfulData} />
        </StyledTabContent>
      </TabRoot>
    </Container>
  );
};

export default NoteActivity;
