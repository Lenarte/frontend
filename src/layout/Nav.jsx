import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/cadastros">Cadastro Clientes</NavLink></li>
                <li><NavLink to="/pagina2">Cadastro Funcionarios</NavLink></li>
                <li><NavLink to="/pagina3">Cadastro Produto</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;
