import "./Cadastros.css"

import axios from "axios";
import { useState, useEffect } from "react";

function Cadastros() {

    const [produto, setProduto] = useState(null);
    const [produtos, setProdutos] = useState([]);


    function getProdutos() {
        axios.get("http://localhost:5103/produtos")
            .then((resposta) => {
                setProdutos(resposta.data);
            });
    }

    useEffect(getProdutos, []);

    function novoProduto() {
        setProduto(
            {
                id: "",
                nome: "",
                validade: "",
                preco: "",
                descricao: ""
            }
        );
    }

    function refresh() {
        cancelar();
        getProdutos();
    }

    function cancelar() {
        setProduto(null);
    }

    function onChangeProduto(campo, valor, id) {
        produto[campo] = valor;
        setProduto({
            ...produto,
        });
    }

    function salvarProduto() {
        if (produto.idProduto) {
            axios.put("http://localhost:5103/produtos/" + produto.idProduto, produto)
                .then(() => {
                    refresh();
                });
        } else {
            axios.post("http://localhost:5103/produtos", produto)
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
                    value={produto.nome}
                    onChange={(e) => {
                        onChangeProduto(e.target.name, e.target.value, produto.idProduto);
                    }}
                />
                <label for="validade">Validade</label>
                <input type="text" id="validade" name="validade"
                    value={produto.validade}
                    onChange={(e) => {
                        onChangeProduto(e.target.name, e.target.value, produto.idProduto);
                    }}
                />
                <label for="preco">Preço</label>
                <input type="text" id="preco" name="preco"
                    value={produto.preco}
                    onChange={(e) => {
                        onChangeProduto(e.target.name, e.target.value, produto.idProduto);
                    }}
                />
                <label for="descricao">descricao</label>
                <input type="text" id="descricao" name="descricao"
                    value={produto.descricao}
                    onChange={(e) => {
                        onChangeProduto(e.target.name, e.target.value, produto.idProduto);
                    }}
                />
                <button onClick={() => { cancelar(); }}>Cancelar</button>
                <button onClick={() => { salvarProduto(); }} >Salvar</button>
            </form>
        );
    }

    function excluirProduto(id){
        axios.delete("http://localhost:5103/produtos/" + id).then(
            () => {
                getProdutos();
            }
        );
    }

    function editarProduto(produto) {
        setProduto(produto);
    }

    function getLinha(produto) {
        return (
            <tr>
                <td>{produto.idProduto}</td>
                <td>{produto.nome}</td>
                <td>{produto.validade}</td>
                <td>{produto.preco}</td>
                <td>{produto.descricao}</td>
                <td>
                    <button onClick={()=>{excluirProduto(produto.idProduto);}}>Excluir</button>
                    <button onClick={() => { editarProduto(produto); }}>Editar</button>
                </td>
            </tr>
        );
    }


    function getLinhas() {
        const linhasDaTabela = [];
        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];
            linhasDaTabela[i] = getLinha(produto);
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
                </tr>
                {getLinhas()}
            </table>
        );
    }

    function getConteudo() {
        if (produto == null) {
            return (
                <>
                    <button onClick={() => { novoProduto(); }}>Novo</button>
                    {getTabela()}
                </>
            );

        } else {
            return getFormulario();
        }
    }


    return (
        <div>
            <h1>CADASTRO DE PRODUTOS DO ESTOQUE</h1>
            {getConteudo()}
        </div>

    );
}

export default Cadastros;


