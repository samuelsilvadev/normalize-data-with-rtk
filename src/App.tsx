import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { State } from "./state/store";
import {
  loadedHistory,
  loadHistory,
  selectHistoryBooksIds,
  selectIsHistoryLoading
} from "./state/history";
import {
  loadedMainBooks,
  loadMainBooks,
  selectIsLoading,
  selectMainBooksIds
} from "./state/main-books";
import { selectBookById, selectBookEntities } from "./state/books";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import { loadCurrentBook, loadedCurrentBook } from "./state/current-book";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Main books</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function useLoadCurrentBook() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(loadCurrentBook());

    setTimeout(() => {
      dispath(
        loadedCurrentBook({
          id: "6",
          name: "Hidden fortress"
        })
      );
    }, 1000);
  }, [dispath]);
}

function Footer() {
  useLoadCurrentBook();

  return (
    <footer>
      <h3>Current Read: None</h3>
      <button>ramdonly select a book to read next</button>
    </footer>
  );
}

function useLoadBooks() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(loadMainBooks());

    setTimeout(() => {
      dispath(
        loadedMainBooks([
          {
            id: "1",
            name: "Da vinci's code"
          },
          {
            id: "2",
            name: "Angels and demons"
          }
        ])
      );
    }, 1000);
  }, [dispath]);
}

function Books() {
  useLoadBooks();

  const allBooksMap = useSelector(selectBookEntities);
  const mainBooksIds = useSelector(selectMainBooksIds);
  const books = mainBooksIds.map((id) => allBooksMap[id]);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className="App">
      <h1>Books</h1>
      {isLoading ? (
        "...Loading..."
      ) : (
        <ul>
          {books.map(({ id, name }) => (
            <li key={id}>
              {id} - {name} - <Link to={`/books/${id}`}>details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Book() {
  useLoadBooks();

  const { id } = useParams<{ id: string }>();
  const book = useSelector((state: State) =>
    id ? selectBookById(state, id) : null
  );

  return (
    <>
      <h1>Details</h1>
      <hr />
      <h2>{book?.id}</h2>
      <h3>{book?.name}</h3>
    </>
  );
}

function useLoadHistory() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(loadHistory());

    setTimeout(() => {
      dispath(
        loadedHistory([
          {
            id: "3",
            name: "The lost symbol"
          },
          {
            id: "4",
            name: "inferno"
          }
        ])
      );
    }, 1000);
  }, [dispath]);
}

function History() {
  useLoadHistory();

  const isLoading = useSelector(selectIsHistoryLoading);
  const allBooksMap = useSelector(selectBookEntities);
  const historyBooksIds = useSelector(selectHistoryBooksIds);
  const books = historyBooksIds.map((id) => allBooksMap[id]).filter(Boolean);

  return (
    <>
      <h1>History</h1>
      {isLoading ? (
        "...Loading..."
      ) : (
        <ul>
          {books.map(({ id, name }) => (
            <li key={id}>
              {id} - {name} - <Link to={`/books/${id}`}>details</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </div>
  );
}
