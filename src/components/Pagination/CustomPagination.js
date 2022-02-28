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
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
    navigate(String(value));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const pageRoute = parseInt(pageNum);
    if (!pageNum) {
      navigate("1", { replace: true });
    } else if (pageRoute < 1) {
      navigate("1", { replace: true });
    } else if (pageRoute > totalPages) {

      navigate(String(totalPages), { replace: true });
    } else if (pageRoute !== page) {

      setPage(pageRoute);
    }
  }, [pageNum]);

  useEffect(() => {
    let num = Math.floor(totalItems / pageSize);
    if (num < totalItems / pageSize) {
      num = Math.ceil(totalItems / pageSize);
    }
    if (num === 0) num = 1;
    setTotalPages(num);
  }, [totalItems]);

  useEffect(() => {
    const pageRoute = parseInt(pageNum);
    if (pageRoute < pageNum) {
      navigate(String(totalPages));
    }
  }, [totalPages]);

  return (
    <Stack style={{ alignItems: "center" }} spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
};

CustomPagination.propTypes = {
  totalItems: PropTypes.number,
};

export default CustomPagination;
