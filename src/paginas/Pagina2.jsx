import "./Cadastros.css"

import axios from "axios";
import { useState, useEffect } from "react";

function Cadastros() {

    const [funcionarios, setFuncionarios] = useState([]);

    function getFuncionarios() {
        axios.get("http://localhost:5103/funcionarios")
            .then((resposta) => {
                setFuncionarios(resposta.data);
            });
    }

    useEffect(getFuncionarios, []);


    function getFormulario() {
        return (
            <form>
                <label for="name">Matricula Funcionario</label>
                <input type="text" id="matricula" name="matricula" />
                <label for="cpf">Nome</label>
                <input type="text" id="nome" name="nome" multiple />
                <label for="telefone">CPF</label>
                <input type="text" id="cpf" name="cpf" />
                <label for="email">Cargo</label>
                <input type="text" id="cargo" name="cargo" />
                <label for="email">Telefone</label>
                <input type="text" id="telefone" name="telefone" />
                <button>Salvar</button>
            </form>
        );
    }

    function getLinha(idFuncionario, nome, cpf, cargo, telefone, dataAdmissao) {
        return (
            <tr>
                <td>{idFuncionario}</td>
                <td>{nome}</td>
                <td>{cpf}</td>
                <td>{cargo}</td>
                <td>{telefone}</td>
                <td>{dataAdmissao}</td>
                <td>
                    <button>Excluir</button>
                    <button>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhas() {
        const linhasDaTabela = [];
        for (let i = 0; i < funcionarios.length; i++) {
            const funcionario = funcionarios[i];
            linhasDaTabela[i] = getLinha(funcionario.idFuncionario, funcionario.nome, funcionario.cpf, funcionario.cargo, funcionario.telefone, funcionario.dataAdmissao);
        }
        return linhasDaTabela;
    }

    function getTabela() {
        return (
            <table>
                <tr>
                    <th>MATRICULA</th>
                    <th>NOME</th>
                    <th>CPF</th>
                    <th>CARGO</th>
                    <th>TELEFONE</th>
                    <th>DATA ADMISSAO / HORA</th>
                    <th>Ações</th>
                </tr>
                {getLinhas()}
            </table>
        );
    }



    return (
        <div>
            <h1>Formulário cadastro de Funcionarios</h1>
            {getFormulario()}
            {getTabela()}
        </div>

    );
}

export default Cadastros;


