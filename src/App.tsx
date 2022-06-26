import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadBooks, selectAllBooks, selectBookById, State } from "./state";
import { Routes, Route } from "react-router-dom";
import "./styles.css";

function useLoadBooks() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(
      loadBooks([
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
  }, [dispath]);
}

function Books() {
  useLoadBooks();

  const books = useSelector(selectAllBooks);

  return (
    <div className="App">
      <h1>Books</h1>
      <ul>
        {books.map(({ id, name }) => (
          <li key={id}>
            {id} - {name}
            <Link to={`/books/${id}`}>details</Link>
          </li>
        ))}
      </ul>
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
      <Link to="/">Back</Link>
      <h1>{book?.id}</h1>
      <h2>{book?.name}</h2>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/:id" element={<Book />} />
      </Routes>
    </div>
  );
}
