import "./Cadastros.css"

import axios from "axios";
import { useState, useEffect } from "react";

function Cadastros() {

    const [cliente, setCliente] = useState(null);

    const [clientes, setClientes] = useState([]);

    function novoCliente(){
        setCliente(
            {
                nome: "",
                cpf: "",
                telefone: "",
                email: ""
            }
        );
    }

    function cancelar(){
        setCliente(null);
    }

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
                <button onClick={cancelar}>Cancelar</button>
            </form>
        );
    }

    function excluirCliente(id){
        axios.delete("http://localhost:5103/clientes/" + id).then(
            () => {
                getClientes();
            }
        );
    }


    function getLinha(cliente) {
        return (
            <tr>
                <td>{cliente.idCliente}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>
                    <button onClick={
                        ()=>{
                            excluirCliente(cliente.idCliente);
                        }
                    }>Excluir</button>
                    <button>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhas() {
        const linhasDaTabela = [];
        for (let i = 0; i < clientes.length; i++) {
            const cliente = clientes[i];
            linhasDaTabela[i] = getLinha(cliente);
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

    function refresh(){
        cancelar();
        getClientes();
    }

    function getConteudo(){
        if(cliente == null){

            return(
                <>
                <button onClick={novoCliente}>Novo</button>
                {getTabela()}
                </>
            )

        } else {
            return getFormulario();
        }
    }


    return (
        <div>
            <h1>Cadastro de clientes</h1>
            {getConteudo()}
        </div>

    );
}

export default Cadastros;


