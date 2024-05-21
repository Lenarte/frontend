import "./App.css"
import Header from "./Header";

function App() {
    return (
        <div>
            <Header />
            <nav>
                <ul>
                    <li>home</li>
                    <li>Pagina2</li>
                    <li>Pagina3</li>
                </ul>
            </nav>
            <aside>
                <ul>
                    <li>util</li>
                    <li>util</li>
                    <li>util</li>
                </ul>
            </aside>
            <main>
                <p>Conteudo principal da pagina</p>
            </main>
            <footer>
                <h3>Pagina principal do React</h3>
            </footer>  
        </div>
    );
}

export default App;