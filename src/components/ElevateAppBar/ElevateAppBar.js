import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Navigation from "../Navigation/Navigation";

const ElevationScroll = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(<Navigation />, {
    elevation: trigger ? 4 : 0,
  });
};

const ElevateAppBar = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll />
      <Toolbar />
      {children}
    </React.Fragment>
  );
};

ElevateAppBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default ElevateAppBar;
