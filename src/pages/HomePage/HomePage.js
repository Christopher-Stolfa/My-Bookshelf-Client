import React from "react";
import { styled, alpha } from "@mui/material/styles";

const Background = styled("div")(({ theme }) => ({
  position: "absolute",
  backgroundImage: `url(${process.env.PUBLIC_URL}/library.svg)`,
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  height: "100%",
  width: "100%",
  overflow: "hidden",
  bottom: "0px",
  left: "0px",
  right: "0px"
}));

const HomePage = (props) => {
  return <Background />;
};

export default HomePage;
