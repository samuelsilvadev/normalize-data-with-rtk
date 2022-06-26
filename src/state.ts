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
    loadBooks: (state, { payload }: PayloadAction<Book[]>) => {
      state.loading = true;
      booksAdapter.addMany(state, payload);
    }
  }
});

export const { loadBooks } = booksSlice.actions;
export const {
  selectAll: selectAllBooks,
  selectById: selectBookById
} = booksAdapter.getSelectors((state: State) => state.books);

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer
  }
});

export type State = ReturnType<typeof store.getState>;
