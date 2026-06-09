function GenreCard({ genre, onClick }) {
  return (
    <button className="genre-card" onClick={() => onClick(genre)}>
      <span className="genre-icon">📚</span>
      <h3>{genre}</h3>
      <p>Descubra sua próxima leitura</p>
    </button>
  );
}

export default GenreCard;