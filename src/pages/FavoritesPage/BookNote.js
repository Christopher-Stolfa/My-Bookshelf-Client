import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import { bookActions } from "../../actions/bookActions";
import DeleteItemDialog from "./DeleteItemDialog";
import { checkIfLoading } from "../../selectors/uiSelectors";
import { bookTypes } from "../../types/bookTypes";

const FormContainer = styled("form")(({ theme }) => ({
  marginTop: 20,
  width: "100%",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  whiteSpace: "pre-line",
}));

const BookNote = ({ note, editNote, deleteNote, isLoading }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [noteText, setNoteText] = useState(note.text);

  const handleOnChange = ({ target: { value } }) => setNoteText(value);

  const handleToggleEdit = () => setToggleEdit((prevState) => !prevState);

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
        onClick={handleToggleEdit}
      >
        {toggleEdit ? <CancelIcon /> : <EditIcon />}
      </Fab>
      <Item>
        <Typography>
          Created at: {new Date(note.createdAt).toString()}
        </Typography>
        {toggleEdit ? (
          <FormContainer noValidate>
            <TextField
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "#fff",
                boxShadow: "0 8px 20px 0 rgb(0 0 0 / 5%)",
                fontSize: "18px",
                fontWeight: 400,
              }}
              onChange={handleOnChange}
              value={noteText}
              id="edit-note-text"
              name="edit-note-text"
              label="Edit note..."
              multiline
              maxRows={4}
              fullWidth
            />
            <Button type="submit">Save</Button>
          </FormContainer>
        ) : (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {noteText}
          </Typography>
        )}
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
