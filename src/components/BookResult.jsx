function BookResult({ book }) {
  if (!book) return null;

  return (
    <div className="book-result">
      <div className="book-cover-box">
        <img src={book.cover_url} alt={book.title} />
      </div>

      <div className="book-info">
        <span className="success-text">Parabéns!</span>

        <h2>Essa é a sua próxima leitura</h2>

        <h3>{book.title}</h3>

        <p className="author">por {book.author}</p>

        <span className="genre-pill">{book.genre}</span>

        {book.description && (
          <p className="description">{book.description}</p>
        )}

        {book.previewLink && (
          <a
            className="preview-link"
            href={book.previewLink}
            target="_blank"
            rel="noreferrer"
          >
            Ver no Google Books
          </a>
        )}
      </div>
    </div>
  );
}

export default BookResult;