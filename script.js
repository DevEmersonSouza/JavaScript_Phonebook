let inputNovoNome = document.getElementById("input_novo_nome")
let inputNovoNumero = document.getElementById("input_novo_numero")
let btnAddContato = document.getElementById("btnAddContato")
let btnMostrarFormContato = document.getElementById("mostrarFormContato")
let btnCancelarContato = document.getElementById("btnCancelarContato")
let ordenacao = localStorage.getItem("ordenacao")

$(window).on('load', function () {
    let login = localStorage.getItem("userLogin");
    let password = localStorage.getItem("userLogin");
    if (!login && !password) {
        $('#myModal').modal({ backdrop: 'static', keyboard: false });
        $('#myModal').modal('show');
    }
    else {
        $('#container').removeClass('container')
        $('#myModal').modal('hide');
    }
});

function login() {
    if (loginInput.value === "" || passwordInput.value === "") {
        alert("favor insira credenciais válidas")
        return
    }
    if (loginInput.value === "login" && passwordInput.value === "senha") {
        $('#myModal').modal('hide');
        console.log("loguei")
        localStorage.setItem("userLogin", loginInput.value)
        localStorage.setItem("userPassword", passwordInput.value)
    }
    else {
        alert("login inválido")
        return
    }
}
function logOut() {
    localStorage.clear()
    document.location.reload(true);
}

let trocarOrdenacaoAsc = () => {
    ordenacao = "asc"
    localStorage.setItem("ordenacao", ordenacao)
    atualizarContatos()
};

let trocarOrdenacaoDesc = () => {
    ordenacao = "desc"
    localStorage.setItem("ordenacao", ordenacao)
    atualizarContatos()
};


function mostrarFormContato() {
    inputNovoNome.style.display = "inline"
    inputNovoNumero.style.display = "inline"
    btnAddContato.style.display = "inline"
    btnCancelarContato.style.display = "inline"
    btnMostrarFormContato.style.display = "none"
}
function cancelarFormContato() {
    inputNovoNome.style.display = "none"
    inputNovoNumero.style.display = "none"
    btnAddContato.style.display = "none"
    btnCancelarContato.style.display = "none"
    btnMostrarFormContato.style.display = "inline"
    input_novo_nome.value = ""
    input_novo_numero.value = ""
}
async function addContato() {
    let nome = input_novo_nome.value
    let numero = input_novo_numero.value

    if (nome === "" || numero === "") {
        alert("por favor inserir as informacoes")
        return
    }
    let novoContato = await fetch('https://634df4bbb8ce95a1dd7c265e.mockapi.io/ListaTelefonica', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            idade: numero
        })
    })
    console.log(novoContato)
    if (novoContato.ok) {
        console.log('adicionei')
        atualizarContatos()
        input_novo_nome.value = ""
        input_novo_numero.value = ""
    }
    cancelarFormContato()
}




async function atualizarContatos() {
    let resposta = await fetch('https://634df4bbb8ce95a1dd7c265e.mockapi.io/ListaTelefonica')
    let body = await resposta.json()
    let contador = document.getElementById("contador")
    contador.value = "(" + body.length + ")"

        let listaSorted = body.sort((a, b) => a.nome.toLowerCase() < b.nome.toLowerCase() ? -1 : a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : 0);
    
    if (ordenacao === "desc") {
        listaSorted = body.sort((b, a) => a.nome.toLowerCase() < b.nome.toLowerCase() ? -1 : a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : 0);
        
    }
    
    contacts.innerHTML = `<div class="contacts">`
    listaSorted.forEach(pessoa => {
        contacts.innerHTML += `<div id="pessoa${pessoa.id}"><input type="text" value="${pessoa.nome}" id="nome${pessoa.id}" disabled="disabled">
        <input type="text" value="${pessoa.idade}" id="telefone${pessoa.id}" disabled="disabled"></div>
        <div id="botoes">
        <button class="btn btn-outline-primary" onclick="editar(${pessoa.id})" id="editBtn${pessoa.id}"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-outline-primary" onclick="concluirEdicao(${pessoa.id})" id="concludeBtn${pessoa.id}" style="display: none;"><i class="bi bi-check-circle-fill"></i></button>
        <button class="btn btn-outline-primary" onclick="deletar(${pessoa.id})" id="deleteBtn"><i class="bi bi-x-circle-fill"></i></button>
        <button id="favoritos${pessoa.id}" class="btn btn-outline-primary favorito"  onclick="favoritos(${pessoa.id})"><i class="bi bi-bookmark-star"></i></i></button>
        <button id="removerFavoritos${pessoa.id}" class="btn btn-outline-primary removerfavorito"  onclick="removeFavoritos(${pessoa.id})" style="display: none;"><i class="bi bi-bookmark-star-fill"></i></i></button></div>`
    });
    contacts.innerHTML += `</div>`
}
atualizarContatos();

function favoritos(id) {
    let favoriteButton = document.getElementById("favoritos" + id);
    let removerFavoriteButton = document.getElementById("removerFavoritos" + id);
    let contato = document.getElementById("nome" + id).value
    removerFavoriteButton.style.display = ""
    favoriteButton.style.display = "none"
    localStorage.setItem("contatofavorito"+id, contato)
    
    if (localStorage.getItem("contatofavorito"+id, contato)){
        contatoFavorito = document.getElementById("pessoa" +id)
        favoriteContacts.innerHTML += `<div id="cttfav${id}">` + contatoFavorito.innerHTML + `<div>`
    }
}
function removeFavoritos(id) {
    let favoriteButton = document.getElementById("favoritos" + id);
    let removerFavoriteButton = document.getElementById("removerFavoritos" + id);
    let contato = document.getElementById("nome" + id).value
    localStorage.removeItem("contatofavorito"+id, contato)
    removerFavoriteButton.style.display = "none"
    favoriteButton.style.display ="inline"
    
    if (contato){
        contatoFavorito = document.getElementById("cttfav" +id)
        contatoFavorito.remove()
        console.log("passei")
    }
}

async function editar(id) {
    let nomeNovo = document.getElementById("nome" + id)
    let telefoneNovo = document.getElementById("telefone" + id)
    let editBtn = document.getElementById("editBtn" + id)
    let concludeBtn = document.getElementById("concludeBtn" + id)
    editBtn.style.display = "none"
    concludeBtn.style.display = "inline"
    nomeNovo.disabled = false;
    telefoneNovo.disabled = false;
    console.log("editando")

}

async function concluirEdicao(id) {
    let nomeNovo = document.getElementById("nome" + id).value
    let telefoneNovo = document.getElementById("telefone" + id).value
    let editBtn = document.getElementById("editBtn" + id)
    let concludeBtn = document.getElementById("concludeBtn" + id)
    editBtn.style.display = "inline"
    concludeBtn.style.display = "none"
    nomeNovo.disabled = true;
    telefoneNovo.disabled = true;
    console.log(nomeNovo)

    let adicionarNumero = await fetch(`https://634df4bbb8ce95a1dd7c265e.mockapi.io/ListaTelefonica/` + id, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeNovo,
            idade: telefoneNovo
        })
    });
    if (adicionarNumero.ok) {
        alert('Atualizou')
        atualizarContatos()
    } else {
        alert('Erro ao atualizar')
    }
}

async function deletar(id) {
    let deletar = await fetch(`https://634df4bbb8ce95a1dd7c265e.mockapi.io/ListaTelefonica/` + id, {
        method: 'DELETE',
    });
    if (deletar.ok) {
        console.log("deletei")
        atualizarContatos();
    } else {
        console.log(res.statusText)
    }
}

function search() {
    let inputSearch = document.getElementById("searchInput");
    let container = document.getElementById("contacts")
    searchInput.style.display = "inline"

    inputSearch.addEventListener('keyup', () => {

        let valor = inputSearch.value.toLowerCase();
        let inputs = container.getElementsByTagName('div')
        if (valor.length === 1) {
            return
        }
        for (let posicao in inputs) {
            if (true === isNaN(posicao)) {
                continue;
            }
            let conteudoDoInput = inputs[posicao].innerHTML.toLowerCase();
            if (true === conteudoDoInput.includes(valor)) {
                inputs[posicao].style.display = ""
            }
            else {
                inputs[posicao].style.display = "none"
            }
        }
    })
}




