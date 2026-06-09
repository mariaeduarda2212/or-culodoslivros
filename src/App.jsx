import { useEffect, useState } from "react";
import GenreList from "./components/GenreList";
import DrawScreen from "./components/DrawScreen";
import VisitCounter from "./components/VisitCounter";
import Footer from "./components/Footer";
import "./styles.css";

const genres = [
  "Terror",
  "Terror Psicológico",
  "Horror Cósmico",
  "Romance",
  "Dark Romance",
  "Fantasia",
  "Fantasia Medieval",
  "Mistério",
  "Thriller",
  "Suspense Psicológico",
  "Ação",
  "Aventura",
  "Ficção Científica",
  "Cyberpunk",
  "Distopia",
  "Pós-apocalíptico",
  "Comédia",
  "Drama",
  "Clássicos",
  "Mitologia",
  "Vampiros",
  "Zumbis",
  "True Crime",
  "Investigação",
  "Filosofia",
  "Desenvolvimento Pessoal",
  "Espiritualidade",
  "Mangá",
  "HQs",
  "Young Adult",
  "Steampunk",
  "Piratas",
  "Escolar",
  "Slice of Life",
  "LGBTQIA+",
  "Cozy Books",
  "Livros Tristes",
  "Livros Leves",
];

function App() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("oracle-theme") || "dark";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("oracle-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <main className="app">
      <div className="top-controls">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Modo Claro" : "🌙 Dark Mode"}
        </button>

        <VisitCounter />
      </div>

      <div className="page-content">
        {!selectedGenre ? (
          <GenreList genres={genres} onSelectGenre={setSelectedGenre} />
        ) : (
          <DrawScreen
            genre={selectedGenre}
            onBack={() => setSelectedGenre(null)}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}

export default App;