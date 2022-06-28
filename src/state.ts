import {
  configureStore,
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

type Book = {
  id: string;
  name: string;
};

export type BookInitialState = {
  loading: boolean;
  books: Book[];
};

const booksAdapter = createEntityAdapter<Book>();

const initialState = booksAdapter.getInitialState({
  loading: false
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    loadBooks: (state) => {
      state.loading = true;
    },
    loadedBooks: (state, { payload }: PayloadAction<Book[]>) => {
      state.loading = false;
      booksAdapter.addMany(state, payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadedHistory.type,
      (state, { payload }: PayloadAction<Book[]>) => {
        booksAdapter.addMany(state, payload);
      }
    );
  }
});

export const { loadBooks, loadedBooks } = booksSlice.actions;
export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
  selectEntities: selectBookEntities
} = booksAdapter.getSelectors((state: State) => state.books);
export const selectIsLoading = (state: State) => state.books.loading;

export type HistoryInitialState = {
  loading: boolean;
  ids: string[];
};

const historyInitialState: HistoryInitialState = {
  loading: false,
  ids: []
};

const historySlice = createSlice({
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

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    history: historySlice.reducer
  }
});

export type State = ReturnType<typeof store.getState>;
