import { styled } from "../utils/styles";
type props = {
  text: string;
};
const ContainerHeader = ({ text }: props) => {
  const ModuleHeader = styled("h2", {
    width: "100%",
    textAlign: "left",
    padding: "1.75rem 2rem .75rem",
    marginBottom: "0",
    fontSize: "1rem",
    marginTop: "0",
    fontWeight: "600",
  });
  return <ModuleHeader>{text}</ModuleHeader>;
};

export default ContainerHeader;
