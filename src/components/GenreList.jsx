import { useMemo } from "react";
import GenreCard from "./GenreCard";

const quotes = [
  {
    text: "Um leitor vive mil vidas antes de morrer.",
    author: "George R. R. Martin",
  },

  {
    text: "Livros são um tipo único de magia portátil.",
    author: "Stephen King",
  },

  {
    text: "Até onde você consegue ir depende do quanto você acredita.",
    author: "J. K. Rowling",
  },

  {
    text: "Não existem amigos mais leais do que os livros.",
    author: "Ernest Hemingway",
  },

  {
    text: "Uma sala sem livros é como um corpo sem alma.",
    author: "Cícero",
  },

  {
    text: "Toda grande aventura começa com uma página virada.",
    author: "Desconhecido",
  },

  {
    text: "Há histórias que nos encontram exatamente quando precisamos delas.",
    author: "Desconhecido",
  },
];

function GenreList({ genres, onSelectGenre }) {
  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  return (
    <section className="genres-section">
      <div className="section-header">
        <span className="tag">Oráculo dos Livros</span>

        <h1>Descubra sua próxima leitura</h1>

        <div className="literary-quote">
          <p>“{randomQuote.text}”</p>

          <span>— {randomQuote.author}</span>
        </div>

        <p>
          Escolha um gênero e deixe o oráculo revelar qual livro está esperando
          por você.
        </p>
      </div>

      <div className="genres-grid">
        {genres.map((genre) => (
          <GenreCard key={genre} genre={genre} onClick={onSelectGenre} />
        ))}
      </div>
    </section>
  );
}

export default GenreList;