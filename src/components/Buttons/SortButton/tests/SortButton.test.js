import React from "react";
import { shallow } from "enzyme";
import SortButton from "../SortButton";
import { configureStore } from "@reduxjs/toolkit";
import { checkPropTypes } from "prop-types";

describe("Sort Button Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        items: [],
        type: "TEST_SORT_TYPE",
        setSortedItems: () => {},
      };
      const propsError = checkPropTypes(
        SortButton.propTypes,
        expectedProps,
        "props"
      );
    });
  });
});
