import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bookActions } from "../../../actions/bookActions";
import SortIcon from "@mui/icons-material/Sort";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

// To make this component reusable, the parent component will pass its items as the prop "items"
// The type of items of the parent are also passed down
const SortButton = ({ items, type, setSortedItems }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleSortDateAddedNewest = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
    const sortedItems = items.sort(
      (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
    );
    const inputData = { sortedItems };
    setSortedItems(inputData, type);
  };

  const handleSortDateAddedOldest = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
    const sortedItems = items.sort(
      (a, b) => new Date(a.publishedDate) - new Date(b.publishedDate)
    );
    const inputData = { sortedItems };
    setSortedItems(inputData, type);
  };

  const handleSortMostPopular = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
    const sortedItems = items.sort((a, b) => b.ratingsCount - a.ratingsCount);
    const inputData = { sortedItems };
    setSortedItems(inputData, type);
  };

  const handleSortByRating = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
    const sortedItems = items.sort((a, b) => b.averageRating - a.averageRating);
    const inputData = { sortedItems };
    setSortedItems(inputData, type);
  };

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          sx={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.87)" }}
          variant="text"
          startIcon={<SortIcon />}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          SORT
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{ zIndex: 1 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleSortMostPopular}>
                      Most popular
                    </MenuItem>
                    <MenuItem onClick={handleSortByRating}>
                      Highest rating
                    </MenuItem>
                    <MenuItem onClick={handleSortDateAddedNewest}>
                      Date published (newest)
                    </MenuItem>
                    <MenuItem onClick={handleSortDateAddedOldest}>
                      Date published (oldest)
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
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
