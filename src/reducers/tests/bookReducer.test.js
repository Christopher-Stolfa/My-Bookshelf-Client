import { bookTypes } from "../../types/bookTypes";
import bookReducer from "../bookReducer";

describe("Book Reducer", () => {
  const defaultState = {
    selectedBook: {},
    notes: [],
    favorites: [],
    searchResultBooks: [],
  };
  it("Should return the default state", () => {
    const newState = bookReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });

  it("Should return new state if receiving type", () => {
    const favorites = [
      { id: "1", name: "test1" },
      { id: "2", name: "test2" },
      { id: "3", name: "test3" },
    ];
    const payload = { message: "Test message", favorites };
    const newState = bookReducer(undefined, {
      type: bookTypes.GET_FAVORITED_BOOKS_SUCCESS,
      payload,
    });
    const expectedState = { ...defaultState, favorites };
    expect(newState).toEqual(expectedState);
  });

  it("Should return new state if receiving type", () => {
    const favorite = { id: "1", name: "Test Item" };
    const payload = { message: "Test message", book: { ...favorite } };
    const newState = bookReducer(undefined, {
      type: bookTypes.GET_FAVORITED_BOOK_SUCCESS,
      payload,
    });
    const expectedState = { ...defaultState, selectedBook: { ...favorite } };
    expect(newState).toEqual(expectedState);
  });
});
