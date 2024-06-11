import "./Cadastros.css"

import axios from "axios";
import { useState, useEffect } from "react";

function Cadastros() {

    const [produtos, setProdutos] = useState([]);

    function getFuncionarios() {
        axios.get("http://localhost:5103/produtos")
            .then((resposta) => {
                setProdutos(resposta.data);
            });
    }

    useEffect(getFuncionarios, []);


function getFormulario() {
    return (
        <form>
            <label for="name">Id Produto</label>
            <input type="text" id="Idproduto" name="IdProduto" />
            <label for="name">Nome</label>
            <input type="text" id="nome" name="nome" multiple />
            <label for="telefone">Validade</label>
            <input type="text" id="validade" name="validade" />
            <label for="email">preco</label>
            <input type="text" id="preco" name="preco" />
            <label for="email">Descricao</label>
            <input type="text" id="descricao" name="descricao" />
            <button>Salvar</button>
        </form>
    );
}


    function getLinha(idProdutos, nome, validade, preco, descricao) {
        return (
            <tr>
                <td>{idProdutos}</td>
                <td>{nome}</td>
                <td>{validade}</td>
                <td>{preco}</td>
                <td>{descricao}</td>
                <td>
                    <button>Excluir</button>
                    <button>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhas() {
        const linhasDaTabela = [];
        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];
            linhasDaTabela[i] = getLinha(produto.idProduto, produto.nome, produto.validade, produto.preco, produto.descricao);
        }
        return linhasDaTabela;
    }

    function getTabela() {
        return (
            <table>
                <tr>
                    <th>ID PRODUTOS</th>
                    <th>NOME</th>
                    <th>VALIDADE EM DIAS</th>
                    <th>PREÇO</th>
                    <th>DESCRICAO</th>
                    <th>Ações</th>
                </tr>
                {getLinhas()}
            </table>
        );
    }




    return (
        <div>
            <h1>CADASTRO DE PRODUTOS DO ESTOQUE</h1>
            {getFormulario()}
            {getTabela()}
        </div>

    );
}

export default Cadastros;


