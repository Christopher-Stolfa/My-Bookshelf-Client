import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { getResultsTotalSelector } from "../../selectors/searchSelector";

const SearchResultPagination = ({ totalItems }) => {
  const pageSize = 10;
  const navigate = useNavigate();
  const { pageNum } = useParams();
  const [page, setPage] = useState(Number(pageNum) || 1);
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    navigate(`${page}`);
    window.scrollTo(0, 0);
  }, [page]);

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

SearchResultPagination.propTypes = {
  totalItems: PropTypes.number
};

const mapStateToProps = state => ({
  totalItems: getResultsTotalSelector(state)
});

export default connect(mapStateToProps)(SearchResultPagination);
