import React from "react";
import { Container, Typography, Box, Link, styled } from "@mui/material";
const headerImageSrc = `${process.env.PUBLIC_URL}/keyboard-cat.jpg`;

const HeaderImage = styled("img")(({ theme }) => ({
  minHeight: "200px",
  width: "200px",
  borderRadius: "5px",
}));

const Icon = styled("img")(({ theme }) => ({
  height: "25px",
  width: "25px",
}));

const AboutPage = (props) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <HeaderImage src={headerImageSrc} />
        <Typography
          align="left"
          variant="caption"
          color="text.secondary"
          gutterBottom
        >
          Paired programming with Mr. Meowgi.
        </Typography>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            align="left"
            variant="body1"
            paragraph={true}
            gutterBottom
            sx={{ textIndent: "1em" }}
          >
            My name is Chris Stolfa and I’m a software engineer from Queens, New
            York, now based in Arizona. I have previously attended Flatiron
            School's full stack development bootcamp, took part in the Wayfair
            Labs onboarding program, and I’m currently enrolled in Queens
            College as a computer science major.
          </Typography>
          <Typography
            variant="body1"
            paragraph={true}
            gutterBottom
            sx={{ textIndent: "1em" }}
          >
            <strong>My Library</strong> is an application that lets you search
            for books by title, category, author, or publisher. You can create
            an account and save books you're interested in or currently reading
            to a list of favorites. Once a book is saved to your favorites, you
            can toggle whether or not you are currently reading the book, track
            your progress, and save notes on the page of your favorited book.
            This project is an MVP, still in its early stages, and I continously
            work on it on my spare time.
          </Typography>
          <Typography
            variant="body1"
            paragraph={true}
            gutterBottom
            sx={{ textIndent: "1em" }}
          >
            I am an avid reader and enjoy all kinds of material ranging from
            fantasy novels, new york times best sellers, and especially books
            that teach me new skills. Inspired by websites such as
            goodreads.com, I decided to build <strong>My Library</strong> as a
            tool to keep track of all the books that I'm currently reading, and
            to sharpen my skills as a developer.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography textAlign="center" gutterBottom>
              If you wish to check out the code for this project, check out the
              repos below.
            </Typography>
          </Box>
          <Box>
            <Box display="flex" flexDirection="row">
              <Box alignSelf="center">
                <Icon src={`${process.env.PUBLIC_URL}/github.svg`} />
              </Box>
              <Box ml="5px" alignSelf="center">
                <Link
                  href="https://github.com/Christopher-Stolfa/My-Bookshelf-Api"
                  color="inherit"
                >
                  My Bookshelf API
                </Link>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row">
              <Box alignSelf="center">
                <Icon src={`${process.env.PUBLIC_URL}/github.svg`} />
              </Box>
              <Box ml="5px" alignSelf="center">
                <Link
                  href="https://github.com/Christopher-Stolfa/My-Bookshelf-Client"
                  color="inherit"
                >
                  My Bookshelf Client
                </Link>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row">
              <Box alignSelf="center">
                <Icon src={`${process.env.PUBLIC_URL}/linkedIn.svg`} />
              </Box>
              <Box ml="5px" alignSelf="center">
                <Link
                  href="https://www.linkedin.com/in/christopher-stolfa-49a4a0178/"
                  color="inherit"
                >
                  LinkedIn
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage;
