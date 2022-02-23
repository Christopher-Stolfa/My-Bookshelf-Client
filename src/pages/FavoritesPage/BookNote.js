import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { bookActions } from "../../actions/bookActions";
import DeleteItemDialog from "./DeleteItemDialog";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { bookTypes } from "../../types/bookTypes";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const BookNote = ({ note, editNote, deleteNote, isLoading }) => {
  const handleDeleteNote = () => {
    if (!isLoading) {
      const inputData = {
        data: { noteId: note.noteId },
      };
      deleteNote(inputData);
    }
  };

  return (
    <Box>
      <DeleteItemDialog deleteItem={handleDeleteNote} />
      <Fab
        size="small"
        sx={{ float: "right", ml: 1 }}
        color="primary"
        aria-label="edit"
      >
        <EditIcon />
      </Fab>
      <Item>
        <Box>
          <Typography>
            Created at: {new Date(note.createdAt).toString()}
          </Typography>
        </Box>
        <Typography>{note.text}</Typography>
      </Item>
    </Box>
  );
};

BookNote.propTypes = {
  editNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  note: PropTypes.shape({
    noteId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  isLoading: checkIfLoading(state, bookTypes.DELETE_NOTE_FETCH),
});

const actionCreators = {
  editNote: bookActions.editNote,
  deleteNote: bookActions.deleteNote,
};

export default connect(mapStateToProps, actionCreators)(BookNote);
