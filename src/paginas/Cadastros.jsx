import "./Cadastros.css"

import axios from "axios";
import { useState, useEffect } from "react";

function Cadastros() {

    const [clientes, setClientes] = useState([]);

    function getClientes() {
        axios.get("http://localhost:5103/clientes")
            .then((resposta) => {
                setClientes(resposta.data);
            });
    }

    useEffect(getClientes, []);


    function getFormulario() {
        return (
            <form>
                <label for="name">Nome</label>
                <input type="text" id="name" name="name" />
                <label for="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf" multiple />
                <label for="telefone">Telefone</label>
                <input type="text" id="telefone" name="telefone" />
                <label for="email">E-mail</label>
                <input type="text" id="email" name="email" />
                <button>Salvar</button>
            </form>
        );
    }

    function getLinha(id, nome, cpf, telefone, email) {
        return (
            <tr>
                <td>{id}</td>
                <td>{nome}</td>
                <td>{cpf}</td>
                <td>{telefone}</td>
                <td>{email}</td>
                <td>
                    <button>Excluir</button>
                    <button>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhas() {
        const linhasDaTabela = [];
        for (let i = 0; i < clientes.length; i++) {
            const cliente = clientes[i];
            linhasDaTabela[i] = getLinha(cliente.idCliente, cliente.nome, cliente.cpf, cliente.telefone, cliente.email);
        }
        return linhasDaTabela;
    }

    function getTabela() {
        return (
            <table>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>CPF</th>
                    <th>TELEFONE</th>
                    <th>EMAIL</th>
                    <th>Ações</th>
                </tr>
                {getLinhas()}
            </table>
        );
    }



    return (
        <div>
            <h1>Cadastro de clientes</h1>
            {getFormulario()}
            {getTabela()}
        </div>

    );
}

export default Cadastros;


