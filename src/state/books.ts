import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { loadedCurrentBook } from "./current-book";
import { loadedHistory } from "./history";
import { loadedMainBooks } from "./main-books";
import { State } from "./store";

export type Book = {
  id: string;
  name: string;
};

const booksAdapter = createEntityAdapter<Book>();
const initialState = booksAdapter.getInitialState();
export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
  selectEntities: selectBookEntities
} = booksAdapter.getSelectors((state: State) => state.books);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadedHistory.type,
      (state, { payload }: PayloadAction<Book[]>) => {
        booksAdapter.addMany(state, payload);
      }
    );
    builder.addCase(
      loadedMainBooks.type,
      (state, { payload }: PayloadAction<Book[]>) => {
        booksAdapter.addMany(state, payload);
      }
    );
    builder.addCase(
      loadedCurrentBook.type,
      (state, { payload }: PayloadAction<Book>) => {
        booksAdapter.addOne(state, payload);
      }
    );
  }
});
