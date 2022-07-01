import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "./books";
import { State } from "./store";

export type CurrentBookInitialState = {
  loading: boolean;
  id: string | null;
};

const currentBookInitialState: CurrentBookInitialState = {
  loading: false,
  id: null
};

export const currentBookSlice = createSlice({
  name: "currentBook",
  initialState: currentBookInitialState,
  reducers: {
    loadCurrentBook: (state) => {
      state.loading = true;
    },
    loadedCurrentBook: (state, { payload }: PayloadAction<Book>) => {
      state.loading = false;
      state.id = payload.id;
    }
  }
});

export const { loadCurrentBook, loadedCurrentBook } = currentBookSlice.actions;
export const selectIsCurrentBookLoading = (state: State) =>
  state.currentBook.loading;
export const selectCurrentBookId = (state: State) => state.currentBook.id;
