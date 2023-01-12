import { Line } from "react-chartjs-2";
import { ratingTimeSeries } from "../utils/types";
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
  borderTop: "1px solid $slate6",
  padding: "2rem",
  '&[data-state="inactive"]': {
    display: "none",
  },
});

type props = {
  helpfulRatingsTimeSeries: ratingTimeSeries;
  notHelpfulRatingsTimeSeries: ratingTimeSeries;
  somewhatHelpfulRatingsTimeSeries: ratingTimeSeries;
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

const RatingActivity = ({
  helpfulRatingsTimeSeries,
  notHelpfulRatingsTimeSeries,
  somewhatHelpfulRatingsTimeSeries,
}: props) => {
  const helpfulData = {
    labels: Object.keys(helpfulRatingsTimeSeries),
    datasets: [
      {
        label: "Helpful Ratings",
        borderColor: "green",
        data: helpfulRatingsTimeSeries,
      },
    ],
  };
  const notHelpfulData = {
    labels: Object.keys(notHelpfulRatingsTimeSeries),
    datasets: [
      {
        label: "Not Helpful Ratings",
        borderColor: "red",
        data: notHelpfulRatingsTimeSeries,
      },
    ],
  };
  const somewhatHelpfulData = {
    labels: Object.keys(somewhatHelpfulRatingsTimeSeries),
    datasets: [
      {
        label: "Somewhat Helpful Ratings",
        borderColor: "gray",
        data: somewhatHelpfulRatingsTimeSeries,
      },
    ],
  };
  const allData = {
    labels: Object.keys(helpfulRatingsTimeSeries),
    datasets: [
      {
        label: "Helpful Ratings",
        borderColor: "green",
        data: helpfulRatingsTimeSeries,
      },
      {
        label: "Not Helpful Ratings",
        borderColor: "red",
        data: notHelpfulRatingsTimeSeries,
      },
      {
        label: "Somewhat Helpful Ratings",
        borderColor: "gray",
        data: somewhatHelpfulRatingsTimeSeries,
      },
    ],
  };
  return (
    <Container>
      <ContainerHeader text="Rating activity" />
      <TabRoot defaultValue="all" orientation="horizontal">
        <TabList aria-label="leaderboard">
          <TabTrigger value="all">All</TabTrigger>
          <TabTrigger value="helpful">Helpful</TabTrigger>
          <TabTrigger value="somewhat">Somewhat Helpful </TabTrigger>
          <TabTrigger value="notHelpful">Not Helpful</TabTrigger>
        </TabList>
        <StyledTabContent value="all">
          <Line options={options} data={allData} />
        </StyledTabContent>
        <StyledTabContent value="helpful">
          <Line options={options} data={helpfulData} />
        </StyledTabContent>
        <StyledTabContent value="somewhat">
          <Line options={options} data={somewhatHelpfulData} />
        </StyledTabContent>
        <StyledTabContent value="notHelpful">
          <Line options={options} data={notHelpfulData} />
        </StyledTabContent>
      </TabRoot>
    </Container>
  );
};

export default RatingActivity;
