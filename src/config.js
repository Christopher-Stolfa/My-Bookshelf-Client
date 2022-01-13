// Local storage key
export const LOCAL_STORAGE_KEY = "user-data";

// API controller names
export const controllers = {
  users: "users",
  books: "books"
};

// API endpoints
export const endPoints = {
  signIn: "sign-in",
  signUp: "sign-up",
  signOut: "sign-out",
  checkSession: "check-session",
  searchBook: "search-book"
};

// Routes
export const routes = {
  home: "/home",
  signIn: "/sign-in",
  signUp: "/sign-up",
  signOut: "/sign-out",
  searchResults: "/search-results"
};
// Navigation
export const navigationItems = [
  {
    name: "Home Page",
    icon: "home",
    route: "/"
  },
  {
    name: "Sign In",
    icon: "sign-in",
    route: routes.signIn
  },
  {
    name: "Sign Up",
    icon: "sign-up",
    route: routes.signUp
  },
  {
    name: "Sign Out",
    icon: "sign-out",
    route: routes.signOut
  }
];
