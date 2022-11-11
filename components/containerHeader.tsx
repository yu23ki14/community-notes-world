import { styled } from "../utils/styles";
type props = {
  text: string;
};
const ContainerHeader = ({ text }: props) => {
  const ModuleHeader = styled("h2", {
    width: "100%",
    textAlign: "left",
    padding: "1rem",
    marginBottom: "0",
    fontSize: "1rem",
    marginTop: "0",
  });
  return <ModuleHeader>{text}</ModuleHeader>;
};

export default ContainerHeader;
