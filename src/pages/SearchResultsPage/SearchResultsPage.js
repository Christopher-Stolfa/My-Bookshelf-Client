import React from "react";
import Box from "@mui/material/Box";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Outlet } from "react-router-dom";

const SearchResultsPage = () => (
  <Box>
    <Box sx={{ textAlign: "center" }}>
      <SearchBar />
    </Box>
    <Outlet />
  </Box>
);

export default SearchResultsPage;
