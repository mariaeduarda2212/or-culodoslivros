import { useState } from "react";
import BookResult from "./BookResult";

const genreQueries = {
  Terror: ["horror", "terror", "ghost"],
  "Terror Psicológico": ["psychological horror", "mind horror"],
  "Horror Cósmico": ["lovecraft", "cosmic horror"],
  Romance: ["romance", "love"],
  "Dark Romance": ["dark romance", "obsessive love"],
  Fantasia: ["fantasy", "magic"],
  "Fantasia Medieval": ["medieval fantasy", "kingdom"],
  Mistério: ["mystery", "detective"],
  Thriller: ["thriller", "crime"],
  "Suspense Psicológico": ["psychological thriller"],
  Ação: ["action", "war"],
  Aventura: ["adventure", "journey"],
  "Ficção Científica": ["science fiction", "sci-fi"],
  Cyberpunk: ["cyberpunk", "future dystopia"],
  Distopia: ["dystopia", "oppression"],
  "Pós-apocalíptico": ["post apocalyptic", "survival"],
  Comédia: ["comedy", "humor"],
  Drama: ["drama", "family"],
  Clássicos: ["classic literature"],
  Mitologia: ["mythology", "greek gods"],
  Vampiros: ["vampire"],
  Zumbis: ["zombie apocalypse"],
  "True Crime": ["true crime"],
  Investigação: ["investigation", "crime solving"],
  Filosofia: ["philosophy"],
  "Desenvolvimento Pessoal": ["self help", "personal growth"],
  Espiritualidade: ["spirituality", "meditation"],
  Mangá: ["manga"],
  HQs: ["comics", "graphic novel"],
  "Young Adult": ["young adult", "ya fiction"],
  Steampunk: ["steampunk"],
  Piratas: ["pirates", "sea adventure"],
  Escolar: ["school life"],
  "Slice of Life": ["slice of life"],
  "LGBTQIA+": ["lgbt fiction", "queer romance"],
  "Cozy Books": ["cozy mystery", "comfort books"],
  "Livros Tristes": ["sad novels", "emotional books"],
  "Livros Leves": ["lighthearted books", "feel good novels"],
};

function DrawScreen({ genre, onBack }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState("");
  const [rouletteBooks, setRouletteBooks] = useState([]);

  async function preloadImages(books) {
    return Promise.all(
      books.map((book) => {
        return new Promise((resolve) => {
          const img = new Image();

          img.src = book.cover_url;

          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      })
    );
  }

  async function drawBook() {
    setIsDrawing(true);
    setSelectedBook(null);
    setError("");
    setRouletteBooks([]);

    try {
      const queries = genreQueries[genre] || [genre];

      const randomQuery =
        queries[Math.floor(Math.random() * queries.length)];

      const page = Math.floor(Math.random() * 5) + 1;

      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
        randomQuery
      )}&limit=40&page=${page}`;

      const response = await fetch(url);

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setError("Não encontrei livros para esse gênero.");
        setIsDrawing(false);
        return;
      }

      const books = data.docs
        .filter((item) => item.title && item.author_name)
        .map((item) => {
          const coverId = item.cover_i;

          return {
            id: item.key,

            title: item.title,

            author:
              item.author_name?.join(", ") || "Autor desconhecido",

            genre,

            cover_url: coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
              : "https://placehold.co/300x450/111827/ff4fa3?text=Sem+Capa",

            description:
              item.first_sentence?.[0] ||
              "Este livro foi encontrado pela Open Library.",

            previewLink: `https://openlibrary.org${item.key}`,
          };
        });

      const rouletteList = books.slice(0, 14);

      await preloadImages(rouletteList);

      setRouletteBooks(rouletteList);

      const randomIndex = Math.floor(Math.random() * books.length);

      const randomBook = books[randomIndex];

      setTimeout(() => {
        setSelectedBook(randomBook);
        setIsDrawing(false);
      }, 4200);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);

      setError("Erro ao buscar livros. Tente novamente.");

      setIsDrawing(false);
    }
  }

  return (
    <section className="draw-section">
      <button className="back-button" onClick={onBack}>
        ← Voltar
      </button>

      <div className="draw-card">
        <span className="tag">{genre}</span>

        <h1>O Oráculo dos Livros está consultando seu destino...</h1>

        <p>
          Clique em sortear e veja as capas passarem até uma história ser
          escolhida para você.
        </p>

        <button
          className="draw-button"
          onClick={drawBook}
          disabled={isDrawing}
        >
          {isDrawing
            ? "Consultando o oráculo..."
            : "Sortear"}
        </button>

        {isDrawing && rouletteBooks.length > 0 && (
          <div className="book-roulette">
            <div className="roulette-track">
              {[...rouletteBooks, ...rouletteBooks].map(
                (book, index) => (
                  <img
                    key={`${book.id}-${index}`}
                    src={book.cover_url}
                    alt={book.title}
                    loading="eager"
                  />
                )
              )}
            </div>
          </div>
        )}

        {error && (
          <p className="empty-message">
            {error}
          </p>
        )}

        <BookResult book={selectedBook} />
      </div>
    </section>
  );
}

export default DrawScreen;