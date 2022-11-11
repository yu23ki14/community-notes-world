import { Line } from "react-chartjs-2";
import { note } from "../utils/types";
import getTimeSeries from "../utils/getTimeseries";
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
const StyledTabContent = styled(TabContent, {
  borderTop: "1px solid $gray6",
  padding: "2rem",
  '&[data-state="inactive"]': {
    display: "none",
  },
});
type props = {
  allNeedsMoreRatingsNotes: note[];
  allHelpfulNotes: note[];
  allNotHelpfulNotes: note[];
  allNotes: note[];
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

const NoteActivity = ({
  allHelpfulNotes,
  allNotes,
  allNotHelpfulNotes,
  allNeedsMoreRatingsNotes,
}: props) => {
  const helpfulNotesTimeSeries = getTimeSeries(allHelpfulNotes);
  const notHelpfulNotesTimeSeries = getTimeSeries(allNotHelpfulNotes);
  const needsMoreRatingsTimeSeries = getTimeSeries(allNeedsMoreRatingsNotes);
  const allTimeSeries = getTimeSeries(allNotes);
  const helpfulData = {
    labels: Object.keys(helpfulNotesTimeSeries),
    datasets: [
      {
        label: "Helpful Notes",
        borderColor: "green",
        data: helpfulNotesTimeSeries,
      },
    ],
  };
  const notHelpfulData = {
    labels: Object.keys(notHelpfulNotesTimeSeries),
    datasets: [
      {
        label: "Not Helpful Notes",
        borderColor: "red",
        data: notHelpfulNotesTimeSeries,
      },
    ],
  };
  const allNotesData = {
    labels: Object.keys(allTimeSeries),
    datasets: [
      {
        label: "Helpful Notes",
        borderColor: "green",
        data: helpfulNotesTimeSeries,
      },
      {
        label: "Not Helpful Notes",
        borderColor: "red",
        data: notHelpfulNotesTimeSeries,
      },
      {
        label: "Needs More Ratings Notes",
        borderColor: "gray",
        data: needsMoreRatingsTimeSeries,
      },
    ],
  };
  return (
    <Container>
      <ContainerHeader text="Note activity" />
      <TabRoot defaultValue="all" orientation="horizontal">
        <TabList aria-label="leaderboard">
          <TabTrigger value="all">All notes</TabTrigger>
          <TabTrigger value="helpful">Helpful </TabTrigger>
          <TabTrigger value="notHelpful">Not Helpful</TabTrigger>
        </TabList>
        <StyledTabContent value="all">
          <Line options={options} data={allNotesData} />
        </StyledTabContent>
        <StyledTabContent value="helpful">
          <Line options={options} data={helpfulData} />
        </StyledTabContent>
        <StyledTabContent value="notHelpful">
          <Line options={options} data={notHelpfulData} />
        </StyledTabContent>
      </TabRoot>
    </Container>
  );
};

export default NoteActivity;
