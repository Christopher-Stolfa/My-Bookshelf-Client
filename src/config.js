// Local storage key
export const LOCAL_STORAGE_KEY = "user-data";

// API controller names
export const controllers = {
  users: "users",
  books: "books",
  quotes: "quotes",
};

// API endpoints
export const endPoints = {
  signIn: "sign-in",
  signUp: "sign-up",
  signOut: "sign-out",
  checkSession: "check-session",
  searchBook: "search-book",
  searchBookById: "search-book-by-id",
  saveFavoritedBook: "save-favorited-book",
  removeFavoritedBook: "remove-favorited-book",
  getFavoritedBooks: "get-favorited-books",
  getFavoritedBook: "get-favorited-book",
  toggleReadingBook: "toggle-reading-book",
  setBookProgress: "set-book-progress",
  getRandomQuote: "get-random-quote",
  forgotPassword: "forgot-password",
  checkResetToken: "check-reset-token",
  updatePasswordWithToken: "update-password-with-token",
  saveNote: "save-note",
  editNote: "edit-note",
  deleteNote: "delete-note",
  getNotes: "get-notes",
};

// Routes
export const routes = {
  home: "/home",
  signIn: "/sign-in",
  signUp: "/sign-up",
  signOut: "/sign-out",
  searchResults: "/search-results",
  favorites: "/favorites",
  forgotPassword: "/forgot-password",
  reset: "/reset",
};

// Nested routes
export const routeIds = {
  bookId: ":bookId",
  searchQuery: ":searchQuery",
  pageNum: ":pageNum",
  token: ":token",
};

// Navigation
export const navigationItems = [
  {
    name: "Home Page",
    icon: "home",
    route: "/",
  },
  {
    name: "Sign In",
    icon: "sign-in",
    route: routes.signIn,
  },
  {
    name: "Sign Up",
    icon: "sign-up",
    route: routes.signUp,
  },
  {
    name: "Sign Out",
    icon: "sign-out",
    route: routes.signOut,
  },
];
