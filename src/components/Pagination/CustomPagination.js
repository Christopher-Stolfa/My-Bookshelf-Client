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
      console.log("Setting undefined page route to 1");
      navigate("1", { replace: true });
    } else if (pageRoute < 1) {
      console.log("Page route less than 1, set it to 1");
      navigate("1", { replace: true });
    } else if (pageRoute > totalPages) {
      console.log(
        `Page route: ${pageNum} is greater than the max page: ${totalPages}`
      );
      navigate(String(totalPages), { replace: true });
    } else if (pageRoute !== page) {
      console.log(
        `Page route: ${pageNum} is not equal to ${page}, now setting page state.`
      );
      setPage(pageRoute);
    }
  }, [pageNum]);

  useEffect(() => {
    console.log("in totalItems useEffect");
    let num = Math.floor(totalItems / pageSize);
    if (num < totalItems / pageSize) {
      num = Math.ceil(totalItems / pageSize);
    }
    if (num === 0) num = 1;
    setTotalPages(num);
  }, [totalItems]);

  useEffect(() => {
    const pageRoute = parseInt(pageNum);
    console.log("In totalPages effect");
    if (pageRoute < pageNum) {
      console.log(
        `Page num: ${pageNum} is higher than totalPages ${totalPages}. Navigating to ${totalPages}`
      );
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
