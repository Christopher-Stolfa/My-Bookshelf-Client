import React from "react";
import { Container, Typography } from "@mui/material";

const Error404Page = () => (
  <Container maxWidth="sm" sx={{ marginTop: 8, textAlign: "center" }}>
    <Typography
      component="h1"
      variant="h3"
      sx={{ textShadow: "1px 1px 2px gray" }}
    >
      Error 404 - Page does not exist
    </Typography>
  </Container>
);

export default Error404Page;
