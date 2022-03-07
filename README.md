<div id="top"></div>

[![Issues][issues-shield]][issues-url]
[![GNU-V3 License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://my-bookshelf-app.site/">
    <img src="images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">My Bookshelf</h3>

  <p align="center">
    Inspired by websites such as goodreads.com, I decided to build <strong>My Bookshelf</strong> as a tool to keep track of all the books that I'm currently reading, and to sharpen my skills as a developer and showcase them.
    <br />
    <br />
    <a href="https://my-bookshelf-app.site/">View Demo</a>
    ·
    <a href="https://github.com/Christopher-Stolfa/My-Bookshelf-Client/issues/">Report Bug</a>
    ·
    <a href="https://github.com/Christopher-Stolfa/My-Bookshelf-Client/issues/">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#results">Results</a></li>
        <li><a href="#favorites">Favorites</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

My Bookshelf is an application that lets you search for books by title, category, author, or publisher. You can create an account and save books you're interested in or currently reading to a list of favorites. Once a book is saved to your favorites, you can toggle whether or not you are currently reading the book, track your progress, and save notes on the page of your favorited book.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React.js](https://reactjs.org/)
- [Redux.js](https://redux.js.org/)
- [Material](https://mui.com/)
- [Express](https://expressjs.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Features

Here is a list of features including screenshots.

<p align="right">(<a href="#top">back to top</a>)</p>

### Home

![Home Page Screen Shot][home-screenshot]

From the home page, you can use the search bar to search for a book. Every time a user visits the home page, a random inspirational quote is rendered.

<p align="right">(<a href="#top">back to top</a>)</p>

### Results

![Results Page Screen Shot][results-screenshot]

From the results page, you can scroll through a list of books relating to your search term. If you have an account and are logged in, you can press the heart icon to add or a remove the book to or from your favorites list.

<p align="right">(<a href="#top">back to top</a>)</p>

### Favorites

From the results page, you can scroll through a list of books relating to your search term. If you are signed in, you can press the heart icon to add or remove a book to or from your favorites list.

![Favorite Page Screen Shot][editnotes-screenshot]

Selecting a book from your favorites list will bring you to a page where you can set its reading status and progress. You can also write, edit, and delete notes that are associated with the book, which are sorted in descending order by date.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add Readme
- [x] Add Changelog
- [x] Add Auth system alongside the ability to reset password via email
- [x] Work on minor bug fixes - continuous
- [ ] Add Privacy policy link in footer
- [ ] Add Wider variety of data for book results
- [ ] Add More advanced filters and sorting options
- [ ] Add Search bar for skimming down search/favorites results
- [ ] Add More options with account page
- [ ] Transition to a social platform where users can interact with each other
- [ ] TBD

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GNU-V3 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

LinkedIn - [@Chris Stolfa](https://www.linkedin.com/in/christopher-stolfa-49a4a0178/) - xcstolfax@gmail.com

Frontend - [https://github.com/Christopher-Stolfa/My-Bookshelf-Client](https://github.com/Christopher-Stolfa/My-Bookshelf-Client)
Backend - [https://github.com/Christopher-Stolfa/My-Bookshelf-Api](https://github.com/Christopher-Stolfa/My-Bookshelf-Api)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[issues-url]: https://github.com/Christopher-Stolfa/My-Bookshelf-Client/issues
[issues-shield]: https://img.shields.io/github/issues/Christopher-Stolfa/My-Bookshelf-Client
[license-url]: https://github.com/Christopher-Stolfa/My-Bookshelf-Client/blob/main/LICENSE
[license-shield]: https://img.shields.io/github/license/Christopher-Stolfa/My-Bookshelf-Client
[home-screenshot]: images/home-screenshot.png
[results-screenshot]: images/results-screenshot.png
[signin-screenshot]: images/signin-screenshot.png
[favorites-screenshot]: images/favorites-screenshot.png
[signup-screenshot]: images/signup-screenshot.png
[resetpass-screenshot]: images/resetpass-screenshot.png
[editnotes-screenshot]: images/editnotes-screenshot.png
