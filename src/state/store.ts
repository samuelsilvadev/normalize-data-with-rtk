import { configureStore } from "@reduxjs/toolkit";
import { booksSlice } from "./books";
import { historySlice } from "./history";
import { mainBooksSlice } from "./main-books";
import { currentBookSlice } from "./current-book";

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    mainBooks: mainBooksSlice.reducer,
    history: historySlice.reducer,
    currentBook: currentBookSlice.reducer
  }
});

export type State = ReturnType<typeof store.getState>;
