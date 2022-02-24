import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { bookActions } from "../../actions/bookActions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getSelectedBookSelector,
  getNotesSelector,
} from "../../selectors/bookSelector";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { bookTypes } from "../../types/bookTypes";
import BookNote from "./BookNote";

const FormContainer = styled("form")(({ theme }) => ({
  marginTop: 20,
  marginBottom: 20,
  width: "100%",
}));

const FavoriteBookNotes = ({
  isLoading,
  notes,
  setInitialState,
  getNotes,
  saveNote,
  selectedBook: { googleBooksId },
}) => {
  useEffect(() => {
    const inputData = { data: JSON.stringify({ googleBooksId }) };

    getNotes(inputData);
    return () => {
      setInitialState();
    };
  }, []);

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!isLoading) {
      const formData = new FormData(e.currentTarget);
      const inputData = {
        data: JSON.stringify({
          googleBooksId,
          noteText: formData.get("create-note-text"),
        }),
      };
      saveNote(inputData);
      e.currentTarget.reset();
    }
  };

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormContainer onSubmit={handleSaveNote} noValidate>
        <TextField
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "#fff",
            boxShadow: "0 8px 20px 0 rgb(0 0 0 / 5%)",
            fontSize: "18px",
            fontWeight: 400,
          }}
          id="create-note-text"
          name="create-note-text"
          label="Write a note..."
          multiline
          rows="4"
          fullWidth
        />
        <Button type="submit">Submit</Button>
      </FormContainer>

      <Stack spacing={2}>
        {notes.map((note, i) => (
          <BookNote note={note} key={`${note.noteId}-${i}`} />
        ))}
      </Stack>
    </Box>
  );
};

FavoriteBookNotes.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setInitialState: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      noteId: PropTypes.number,
      text: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    })
  ).isRequired,
  selectedBook: PropTypes.shape({
    googleBooksId: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  selectedBook: getSelectedBookSelector(state),
  notes: getNotesSelector(state),
  isLoading:
    checkIfLoading(state, bookTypes.GET_NOTES_FETCH) ||
    checkIfLoading(state, bookTypes.DELETE_NOTE_FETCH) ||
    checkIfLoading(state, bookTypes.SAVE_NOTE_FETCH) ||
    checkIfLoading(state, bookTypes.EDIT_NOTE_FETCH),
});

const actionCreators = {
  getNotes: bookActions.getNotes,
  saveNote: bookActions.saveNote,
  setInitialState: bookActions.setInitialNotesState,
};

export default connect(mapStateToProps, actionCreators)(FavoriteBookNotes);
