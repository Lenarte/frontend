import "./Cadastros.css"

import axios from "axios";
import { useState, useEffect } from "react";

function Cadastros() {

    const [funcionario, setFuncionario] = useState(null);
    const [funcionarios, setFuncionarios] = useState([]);


    function getFuncionarios() {
        axios.get("http://localhost:5103/funcionarios")
            .then((resposta) => {
                setFuncionarios(resposta.data);
            });
    }

    useEffect(getFuncionarios, []);

    function novoFuncionario() {
        setFuncionario(
            {
                matricula: "",
                nome: "",
                cpf: "",
                telefone: "",
                cargo: ""
            }
        );
    }

    function refresh() {
        cancelar();
        getFuncionarios();
    }

    function cancelar() {
        setFuncionario(null);
    }

    function onChangeFuncionario(campo, valor, id) {
        funcionario[campo] = valor;
        setFuncionario({
            ...funcionario,
        });
    }

    function salvarFuncionario() {
        if (funcionario.idFuncionario) {
            axios.put("http://localhost:5103/funcionarios/" + funcionario.idFuncionario, funcionario)
                .then(() => {
                    refresh();
                });
        } else {
            axios.post("http://localhost:5103/funcionarios", funcionario)
                .then(() => {
                    refresh();
                });
        }
    }

    function getFormulario() {
        return (
            <form>
                <label for="nome">Nome</label>
                <input type="text" id="nome" name="nome"
                    value={funcionario.nome}
                    onChange={(e) => {
                        onChangeFuncionario(e.target.name, e.target.value, funcionario.idFuncionario);
                    }}
                />
                <label for="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf"
                    value={funcionario.cpf}
                    onChange={(e) => {
                        onChangeFuncionario(e.target.name, e.target.value, funcionario.idFuncionario);
                    }}
                />
                <label for="telefone">Telefone</label>
                <input type="text" id="telefone" name="telefone"
                    value={funcionario.telefone}
                    onChange={(e) => {
                        onChangeFuncionario(e.target.name, e.target.value, funcionario.idFuncionario);
                    }}
                />
                <label for="cargo">Cargo</label>
                <input type="text" id="cargo" name="cargo"
                    value={funcionario.cargo}
                    onChange={(e) => {
                        onChangeFuncionario(e.target.name, e.target.value, funcionario.idFuncionario);
                    }}
                />
                <button onClick={() => { cancelar(); }}>Cancelar</button>
                <button onClick={() => { salvarFuncionario(); }} >Salvar</button>
            </form>
        );
    }

    function excluirFuncionario(id){
        axios.delete("http://localhost:5103/funcionarios/" + id).then(
            () => {
                getFuncionarios();
            }
        );
    }

    function editarFuncionario(funcionario) {
        setFuncionario(funcionario);
    }

    function getLinha(funcionario) {
        return (
            <tr>
                <td>{funcionario.idFuncionario}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cpf}</td>
                <td>{funcionario.telefone}</td>
                <td>{funcionario.cargo}</td>
                <td>
                    <button onClick={()=>{excluirFuncionario(funcionario.idFuncionario);}}>Excluir</button>
                    <button onClick={() => { editarFuncionario(funcionario); }}>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhas() {
        const linhasDaTabela = [];
        for (let i = 0; i < funcionarios.length; i++) {
            const funcionario = funcionarios[i];
            linhasDaTabela[i] = getLinha(funcionario);
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


    function getConteudo() {
        if (funcionario == null) {
            return (
                <>
                    <button onClick={() => { novoFuncionario(); }}>Novo</button>
                    {getTabela()}
                </>
            );

        } else {
            return getFormulario();
        }
    }

    return (
        <div>
            <h1>Formulário cadastro de Funcionarios</h1>
            {getConteudo()}
        </div>

    );

}

export default Cadastros;


