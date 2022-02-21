import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const FormContainer = styled("div")(({ theme }) => ({
  marginTop: 20,
  marginBottom: 20,
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const FavoriteBookActivity = (props) => {
  const [note, setNote] = useState("");

  const handleChange = ({ target: { value } }) => {
    setNote(value);
  };

  return (
    <Box>
      <FormContainer>
        <TextField
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            backgroundColor: "#fff",
            boxShadow: "0 8px 20px 0 rgb(0 0 0 / 5%)",
            fontSize: "18px",
            fontWeight: 400,
          }}
          multiline
          maxRows={4}
          value={note}
          onChange={handleChange}
        />
        <Button>Submit</Button>
      </FormContainer>
      <Stack spacing={2}>
        {Array.from(
          { length: 10 },
          () => new Date().getTime() + Math.random()
        ).map((key, i) => (
          <Box key={`${key}-${i}`}>
            <Item>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography>Page: 0</Typography>
                <Box sx={{ float: "right" }}>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Box>
              </Box>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Item>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default FavoriteBookActivity;
