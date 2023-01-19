import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { chartColors } from "../utils/chartStyle";
import { styled } from "../utils/styles";
import Container from "./container";
import ContainerHeader from "./containerHeader";
import Number from "./number";

const StyledContent = styled("div", {
  padding: "1rem 2rem",
});

const NumberRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "end",
});
const ChartContainer = styled("div", {
  maxWidth: "300px",
  paddingBottom: "1rem",
});

type props = {
  userStates: {
    earned_in: number;
    earned_out: number;
    new_user: number;
  };
};

ChartJS.register(ArcElement, Tooltip, Legend);

const UserEnrollmentState = ({ userStates }: props) => {
  const data = {
    labels: [
      "New users, no writing ability",
      "Earned writing ability",
      "Lost writing ability",
    ],
    datasets: [
      {
        label: "User States",
        data: [
          userStates.new_user,
          userStates.earned_in,
          userStates.earned_out,
        ],
        backgroundColor: [chartColors.gray, chartColors.green, chartColors.red],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };
  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <Container>
      <ContainerHeader text="User enrollment state" />
      <StyledContent>
        <NumberRow>
          <Number dot="gray" number={userStates.new_user} label={"New user"} />
          <Number
            dot="green"
            number={userStates.earned_in}
            label="Earned writing ability"
          />
          <Number
            dot="red"
            number={userStates.earned_out}
            label="Lost writing ability"
          />
        </NumberRow>
        <ChartContainer>
          <Pie data={data} options={chartOptions} />
        </ChartContainer>
      </StyledContent>
    </Container>
  );
};

export default UserEnrollmentState;
