import {
  configureStore,
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

const booksAdapter = createEntityAdapter<Book>();
const initialState = booksAdapter.getInitialState();
export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
  selectEntities: selectBookEntities
} = booksAdapter.getSelectors((state: State) => state.books);

type Book = {
  id: string;
  name: string;
};

export type BookInitialState = {
  loading: boolean;
  books: Book[];
};

const booksSlice = createSlice({
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
  }
});

export type MainBooksInitialState = {
  loading: boolean;
  ids: string[];
};

const mainBooksInitialState: MainBooksInitialState = {
  loading: false,
  ids: []
};

const mainBooksSlice = createSlice({
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
    mainBooks: mainBooksSlice.reducer,
    history: historySlice.reducer
  }
});

export type State = ReturnType<typeof store.getState>;
