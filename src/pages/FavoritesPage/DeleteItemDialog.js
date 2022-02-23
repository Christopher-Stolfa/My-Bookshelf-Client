import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteItemDialog = ({ deleteItem }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteItem = () => {
    deleteItem();
    setOpen(false);
  };

  return (
    <Box
      sx={{
        float: "right",
        ml: 1,
      }}
    >
      <Fab
        size="small"
        color="primary"
        aria-label="delete"
        onClick={handleOpen}
      >
        <DeleteIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Button
              sx={{ mr: 1 }}
              onClick={handleDeleteItem}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
            <Button
              sx={{ ml: 1 }}
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

DeleteItemDialog.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};

export default DeleteItemDialog;
