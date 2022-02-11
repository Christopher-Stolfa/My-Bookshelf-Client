import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Outlet } from "react-router-dom";

const SearchResultsPage = () => (
  <Container sx={{ padding: "25px" }}>
    <Box sx={{ textAlign: "center" }}>
      <SearchBar />
    </Box>
    <Outlet />
  </Container>
);

export default SearchResultsPage;
