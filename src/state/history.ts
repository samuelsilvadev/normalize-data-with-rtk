import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "./books";
import { State } from "./store";

export type HistoryInitialState = {
  loading: boolean;
  ids: string[];
};

const historyInitialState: HistoryInitialState = {
  loading: false,
  ids: []
};

export const historySlice = createSlice({
  name: "history",
  initialState: historyInitialState,
  reducers: {
    loadHistory: (state) => {
      state.loading = true;
    },
    loadedHistory: (state, { payload }: PayloadAction<Book[]>) => {
      state.loading = false;

      const ids = payload.map((book) => book.id);

      state.ids = ids;
    }
  }
});

export const { loadHistory, loadedHistory } = historySlice.actions;
export const selectIsHistoryLoading = (state: State) => state.history.loading;
export const selectHistoryBooksIds = (state: State) => state.history.ids;
