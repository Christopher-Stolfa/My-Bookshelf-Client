import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bookActions } from "../../actions/bookActions";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";

// To make this component reusable, the parent component will pass its items as the prop "items"
// The type of items of the parent are also passed down
const SortButton = ({ items, type }) => {
  return (
    <IconButton>
      <SortIcon />
    </IconButton>
  );
};

SortButton.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  setSortedItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const actionCreators = {
  setSortedItems: bookActions.setSortedItems,
};

export default connect(mapStateToProps, actionCreators)(SortButton);
