import { useEffect, useState } from "react";

function VisitCounter() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    async function loadViews() {
      try {
        const response = await fetch("/.netlify/functions/page-views");
        const data = await response.json();

        setViews(data.views);
      } catch (error) {
        console.error("Erro ao carregar visitas:", error);
      }
    }

    loadViews();
  }, []);

  return (
    <div className="visit-counter">
      🔮 {views === null ? "Carregando visitas..." : `${views} visitas`}
    </div>
  );
}

export default VisitCounter;