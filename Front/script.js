//Codigo de consulta do CEP nos formularios

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('complemento').value = ("");
    document.getElementById('numero').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
       // limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

// Função para o callback no modal
function meu_callback_modal(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('ruamodal').value = (conteudo.logradouro);
        document.getElementById('bairromodal').value = (conteudo.bairro);
        document.getElementById('cidademodal').value = (conteudo.localidade);
        document.getElementById('ufmodal').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
       // limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}

// Função para fazer a consulta da edição de cadastro no modal
function pesquisacepmodal(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('ruamodal').value = "...";
            document.getElementById('bairromodal').value = "...";
            document.getElementById('cidademodal').value = "...";
            document.getElementById('ufmodal').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback_modal';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getList = async () => {
    let url = 'http://127.0.0.1:5000/clientes';
    fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            data.clientes.forEach(item => insertList(item.id, item.nome, item.email, item.uf, item.data))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getListId = async (cliente) => {
    let url = 'http://127.0.0.1:5000/cliente?id=' + cliente;
    
    const dados = await fetch (url, {method: 'get',});
    const clientedados = await dados.json();
    console.log(clientedados)
    preencheModal(clientedados)
}

const preencheModal = (dataCliente) => {    

    document.getElementById("idmodal").value = (dataCliente.id);
    document.getElementById("nomemodal").value = (dataCliente.nome);
    document.getElementById("emailmodal").value = (dataCliente.email);
    document.getElementById("cepmodal").value = (dataCliente.cep);
    document.getElementById("ruamodal").value = (dataCliente.rua);
    document.getElementById("complementomodal").value = (dataCliente.complemento);
    document.getElementById("numeromodal").value = (dataCliente.numero);
    document.getElementById("bairromodal").value = (dataCliente.bairro);
    document.getElementById("cidademodal").value = (dataCliente.cidade);
    document.getElementById("ufmodal").value = (dataCliente.uf);

}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
--------------------------------------------------------------------------------------
Função para inserir cliente na lista apresentada
--------------------------------------------------------------------------------------
*/
const insertList = (idcliente, nomecliente, emailcliente, ufcliente, datacliente) => {
    
    //console.log(new Intl.DateTimeFormat('pt-br').format(datacliente))
    console.log(datacliente)
    var item = [idcliente, nomecliente, emailcliente, ufcliente]
    var table = document.getElementById('listaClientes');
    var row = table.insertRow();

    for (var i = 0; i < item.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    removeElement()
    chamaClienteModal()
}


/*
  --------------------------------------------------------------------------------------
  Função para colocar um cliente na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (nome, email, cep, rua, complemento, numero, bairro, cidade, uf) => {
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('cep', cep);
    formData.append('rua', rua);
    formData.append('complemento', complemento);
    formData.append('numero', numero);
    formData.append('bairro', bairro);
    formData.append('cidade', cidade);
    formData.append('uf', uf);

    let url = 'http://127.0.0.1:5000/cliente';
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo cliente
  --------------------------------------------------------------------------------------
*/
const novoCliente = () => {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cep = document.getElementById("cep").value;
    let rua = document.getElementById("rua").value;
    let complemento = document.getElementById("complemento").value;
    let numero = document.getElementById("numero").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let uf = document.getElementById("uf").value;


    if (nome === '') {
        alert("Escreva um nome!");
    } else {
        //insertList(nome, email, uf)
        postItem(nome, email, cep, rua, complemento, numero, bairro, cidade, uf)
        alert("Cliente cadastrado!")
        getList()
    }
}

/*
  --------------------------------------------------------------------------------------
  Função para editar um cliente na lista do servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const editarItem = async (id, nome, email, cep, rua, complemento, numero, bairro, cidade, uf) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('cep', cep);
    formData.append('rua', rua);
    formData.append('complemento', complemento);
    formData.append('numero', numero);
    formData.append('bairro', bairro);
    formData.append('cidade', cidade);
    formData.append('uf', uf);

    let url = 'http://127.0.0.1:5000/cliente?id=' + id;
    fetch(url, {
        method: 'PUT',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}

/*
  --------------------------------------------------------------------------------------
  Função para editar cliente
  --------------------------------------------------------------------------------------
*/
const editarCliente = () => {
    let id = document.getElementById("idmodal").value;
    let nome = document.getElementById("nomemodal").value;
    let email = document.getElementById("emailmodal").value;
    let cep = document.getElementById("cepmodal").value;
    let rua = document.getElementById("ruamodal").value;
    let complemento = document.getElementById("complementomodal").value;
    let numero = document.getElementById("numeromodal").value;
    let bairro = document.getElementById("bairromodal").value;
    let cidade = document.getElementById("cidademodal").value;
    let uf = document.getElementById("ufmodal").value;


    if (nome === '') {
        alert("Escreva um nome!");
    } else {
        //insertList(nome, email, uf)
        editarItem(id, nome, email, cep, rua, complemento, numero, bairro, cidade, uf)
        alert("Cliente editado com sucesso!")
        location.reload()
    }
}

/*
  --------------------------------------------------------------------------------------
  Função para chamar o cliente selecionado para carregar no modal
  --------------------------------------------------------------------------------------
*/
const chamaClienteModal = () => {

    let editar = document.getElementsByClassName("btn btn-info btn-sm font-weight-bold");
    for (i = 0; i < editar.length; i++) {
        editar[i].onclick = function () {
          let div = this.parentElement.parentElement;
          const cliente = div.getElementsByTagName('td')[0].innerHTML        
            getListId(cliente)
          }
        }
    }

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão alterar e excluir para cada cliente da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
    let btnUpdate = document.createElement("a");
    let txtUpdate = document.createTextNode("Alterar");
    btnUpdate.className = "btn btn-info btn-sm font-weight-bold";
    btnUpdate.setAttribute("data-toggle", "modal")
    btnUpdate.setAttribute("data-target", "#modalEditar")
    btnUpdate.setAttribute("id", "editar")
    btnUpdate.appendChild(txtUpdate);
    parent.appendChild(btnUpdate);

    let span = document.createElement("span");
    span.className = "p-1";
    parent.appendChild(span);
    
    let btnDel = document.createElement("a");
    let txtDel = document.createTextNode("Excluir");
    btnDel.className = "btn btn-danger btn-sm font-weight-bold";
    btnDel.setAttribute("onclick", "removeElement()")
    btnDel.appendChild(txtDel);
    parent.appendChild(btnDel);

}

/*
  --------------------------------------------------------------------------------------
  Função para remover um cliente da lista de acordo com o click no botão excluir
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
    let excluir = document.getElementsByClassName("btn btn-danger btn-sm font-weight-bold");
    //let i;
    for (i = 0; i < excluir.length; i++) {
      excluir[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const cliente = div.getElementsByTagName('td')[0].innerHTML
        console.log(cliente)
        if (confirm("Deseja excluir o cliente?")) {
          div.remove()
          deleteItem(cliente)
          alert("Cliente excluido!")
        }
      }
    }
  }

/*
  --------------------------------------------------------------------------------------
  Função para deletar um cliente da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (cliente) => {
    console.log(cliente)
    let url = 'http://127.0.0.1:5000/cliente?id=' + cliente;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }