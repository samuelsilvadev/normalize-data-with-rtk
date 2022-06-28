import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "./books";
import { State } from "./store";

export type MainBooksInitialState = {
  loading: boolean;
  ids: string[];
};

const mainBooksInitialState: MainBooksInitialState = {
  loading: false,
  ids: []
};

export const mainBooksSlice = createSlice({
  name: "mainBooks",
  initialState: mainBooksInitialState,
  reducers: {
    loadMainBooks: (state) => {
      state.loading = true;
    },
    loadedMainBooks: (state, { payload }: PayloadAction<Book[]>) => {
      state.loading = false;

      const ids = payload.map((book) => book.id);

      state.ids = ids;
    }
  }
});

export const { loadMainBooks, loadedMainBooks } = mainBooksSlice.actions;
export const selectIsLoading = (state: State) => state.mainBooks.loading;
export const selectMainBooksIds = (state: State) => state.mainBooks.ids;
