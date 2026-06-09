import perfil from "../assets/IMG_0092.png";

export default function Footer() {
  return (
    <footer className="oracle-footer">
      <div className="oracle-footer-card">
        <img
          src={perfil}
          alt="Assinatura Maria Eduarda"
          className="oracle-footer-avatar"
        />

        <div className="oracle-footer-info">
          <h4>Maria Eduarda</h4>

          <p>Desenvolvedora Front-end</p>

          <span>Construindo soluções simples e eficientes 🚀</span>

          <div className="oracle-footer-links">
            <a
              href="https://linkedin.com/in/seu-perfil"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}