export default function Footer() {
    return (
        <footer id="contato" className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2 className="logo large-logo">Educação Ambiental<span>.</span></h2>
                </div>
                <div className="footer-links">
                    <div className="link-column">
                        <span className="column-title">NAVEGAÇÃO</span>
                        <a href="#sobre">Sobre o Projeto</a>
                        <a href="#parceiros">Nossos Parceiros</a>
                    </div>
                    <div className="link-column">
                        <span className="column-title">CONTATO</span>
                        <a href="mailto:ola@conectandose.com">ola@conectandose.com</a>
                        <a href="#">Universidade Federal do Pará</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 UFPA. Todos os direitos reservados.</p>
            
            </div>
        </footer>
    );
}
