import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";

const CustomPagination = ({ totalItems }) => {
  const pageSize = 10;
  const navigate = useNavigate();
  const { pageNum } = useParams();
  const [page, setPage] = useState(pageNum ? parseInt(pageNum) : 1);
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
    navigate(`${value}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    console.log("Setting page to the page num " + pageNum);
    if (!pageNum) {
      navigate("1");
    } else {
      setPage(parseInt(pageNum));
    }
  }, [pageNum]);

  useEffect(() => {
    let num = Math.floor(totalItems / pageSize);
    if (num < totalItems / pageSize) num = Math.ceil(totalItems / pageSize);
    setTotalPages(num);
  }, [totalItems]);

  return (
    <Stack style={{ alignItems: "center" }} spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
};

CustomPagination.propTypes = {
  totalItems: PropTypes.number
};

export default CustomPagination;
