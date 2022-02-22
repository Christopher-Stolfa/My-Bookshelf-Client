import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { bookActions } from "../../actions/bookActions";
import {
  getSelectedBookSelector,
  getNotesSelector,
} from "../../selectors/bookSelector";

const FormContainer = styled("form")(({ theme }) => ({
  marginTop: 20,
  marginBottom: 20,
  width: "100%",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const FavoriteBookNotes = ({
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

    const formData = new FormData(e.currentTarget);
    const inputData = {
      data: JSON.stringify({
        googleBooksId,
        noteText: formData.get("create-note-text"),
      }),
    };
    saveNote(inputData);
    e.currentTarget.reset();
  };

  return (
    <Box>
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
          <Box key={`${note.noteId}-${i}`}>
            <Item>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ float: "right" }}>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Box>
              </Box>
              <Typography>{note.text}</Typography>
            </Item>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

FavoriteBookNotes.propTypes = {
  setInitialState: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      noteId: PropTypes.number,
      text: PropTypes.string,
      createdAt: PropTypes.any,
      updatedAt: PropTypes.any,
    })
  ).isRequired,
  selectedBook: PropTypes.shape({
    googleBooksId: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  selectedBook: getSelectedBookSelector(state),
  notes: getNotesSelector(state),
});

const actionCreators = {
  getNotes: bookActions.getNotes,
  saveNote: bookActions.saveNote,
  setInitialState: bookActions.setInitialNotesState,
};

export default connect(mapStateToProps, actionCreators)(FavoriteBookNotes);
