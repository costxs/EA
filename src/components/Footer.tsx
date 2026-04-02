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
                        <a href="mailto:conectambiente2@gmail.com">conectambiente2@gmail.com</a>
                        <a href="mailto:easaberes2025@gmail.com">easaberes2025@gmail.com</a>
                        <a href="#">Universidade Federal do Pará</a>
                    </div>
                    <div className="link-column">
                        <span className="column-title">INSTAGRAM</span>
                        <a href="https://www.instagram.com/ea_ambiente/" target="_blank" rel="noopener noreferrer">Conectando-se com Ambiente</a>
                        <a href="https://www.instagram.com/ea_saberes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">EA Saberes</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 UFPA. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
