import ActiveRaters from "../components/activeRaters";
import Layout from "../components/layout";
import RatingActivity from "../components/ratingActivity";
import getActiveRaters from "../utils/getActiveRaters";
import getAllRatings from "../utils/getAllRatings";
import getMonthlyTimeSeries from "../utils/getMonthlyTimeSeries";
import getMostRecentRatingTimestamp from "../utils/getMostRecentRatingTimestamp";
import { ratingTimeSeries } from "../utils/types";

export default function Home({
  activeRaters,
  helpfulRatingsTimeSeries,
  notHelpfulRatingsTimeSeries,
  somewhatHelpfulRatingsTimeSeries,
  lastUpdated,
}: {
  activeRaters: { [key: string]: number };
  helpfulRatingsTimeSeries: ratingTimeSeries;
  notHelpfulRatingsTimeSeries: ratingTimeSeries;
  somewhatHelpfulRatingsTimeSeries: ratingTimeSeries;
  lastUpdated: string;
}) {
  return (
    <Layout lastUpdated={lastUpdated}>
      <ActiveRaters activeRatersTimeSeries={activeRaters} />
      <RatingActivity
        helpfulRatingsTimeSeries={helpfulRatingsTimeSeries}
        notHelpfulRatingsTimeSeries={notHelpfulRatingsTimeSeries}
        somewhatHelpfulRatingsTimeSeries={somewhatHelpfulRatingsTimeSeries}
      />
    </Layout>
  );
}
export async function getStaticProps() {
  let { helpfulRatings, notHelpfulRatings, somewhatHelpfulRatings } =
    await getAllRatings();
  const helpfulRatingsTimeSeries = getMonthlyTimeSeries(helpfulRatings);
  const notHelpfulRatingsTimeSeries = getMonthlyTimeSeries(notHelpfulRatings);
  const somewhatHelpfulRatingsTimeSeries = getMonthlyTimeSeries(
    somewhatHelpfulRatings
  );
  let activeRaters = await getActiveRaters();
  let lastUpdated = getMostRecentRatingTimestamp(helpfulRatings);

  return {
    props: {
      activeRaters,
      helpfulRatingsTimeSeries,
      notHelpfulRatingsTimeSeries,
      somewhatHelpfulRatingsTimeSeries,
      lastUpdated,
    },
  };
}
