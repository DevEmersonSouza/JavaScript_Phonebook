let inputNovoNome = document.getElementById("input_novo_nome")
let inputNovoNumero = document.getElementById("input_novo_numero")
let btnAddContato = document.getElementById("btnAddContato")
let btnMostrarFormContato = document.getElementById("mostrarFormContato")
let btnCancelarContato = document.getElementById("btnCancelarContato")
let ordenacao = localStorage.getItem("ordenacao")


function userExibitionName() {
    $('#welcomeModal').modal('hide');
    $('#container').removeClass('container')
    localStorage.setItem("userExibitonName", userWelcomeName.value)
}

userNameEx.value = "Olá," + localStorage.getItem("userExibitonName")

function login() {
    if (loginInput.value === "" || passwordInput.value === "") {
        alert("favor insira credenciais válidas")
        return
    }
    if (loginInput.value === "login" && passwordInput.value === "senha") {
        localStorage.setItem("userLogin", loginInput.value)
        localStorage.setItem("userPassword", passwordInput.value)
        $('#myModal').modal('hide');
        $('#welcomeModal').modal('show');
        console.log("loguei")
    }
    else {
        alert("login inválido")
    }
}
function logOut() {
    localStorage.removeItem("userLogin")
    localStorage.removeItem("userPassword")
    document.location.reload(true);
}

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

function search() {
    let inputSearch = document.getElementById("searchInput")
    let container = document.getElementById("contacts")

    inputSearch.addEventListener('keyup', () => {
        let valor = inputSearch.value;
        console.log(valor)
        let inputs = container.getElementsByTagName('input')

        for(let posicao in inputs) {
            if(true === isNaN(posicao)) {
                continue;
            }
            let conteudoDoInput = inputs[posicao].innerHTML;

            if(true === conteudoDoInput.includes(valor)){
                inputs[posicao].style.display = ""
            }
            else{
                inputs[posicao].style.display = "none"
            }
        }
    })
}

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

    contacts.innerHTML = `<div class="contacts">`
    let listaSorted = body.sort((a,b) => a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0);
    
    if (ordenacao === "desc") {
        listaSorted = body.sort((b,a) => a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0);
        
    }

    listaSorted.forEach(pessoa => {
        contacts.innerHTML += `<div><input type="text" value="${pessoa.nome}" id="nome${pessoa.id}" disabled="disabled">
        <input type="text" value="${pessoa.idade}" id="telefone${pessoa.id}" disabled="disabled">
        <button class="btn btn-outline-primary" onclick="editar(${pessoa.id})" id="editBtn${pessoa.id}"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-outline-primary" onclick="concluir(${pessoa.id})" id="concludeBtn${pessoa.id}" style="display: none;"><i class="bi bi-check-circle-fill"></i></button>
        <button class="btn btn-outline-primary" onclick="deletar(${pessoa.id})" id="deleteBtn"><i class="bi bi-x-circle-fill"></i></button>
        <button id="favoritos${pessoa.id}" class="btn btn-outline-primary"  onclick="favoritos(${pessoa.id})"><i class="bi bi-bookmark-star-fill"></i></button>
        <button id="removerfavoritos${pessoa.id}" class="btn btn-outline-primary"  onclick="favoritos(${pessoa.id})" style="display: none;"><i class="bi bi-bookmark-x-fill"></i></button></div>`


    });
    contacts.innerHTML += `</div>`
}
atualizarContatos();

function favoritos(id) {
    favoriteButton = document.getElementById("favoritos" + id);
    removerFavoriteButton = document.getElementById("removerfavoritos" + id);
    removerFavoriteButton.style.display = "inline"
    removerFavoriteButton.style.color = "black";
    removerFavoriteButton.style.backgroundColor = "yellow";
    removerFavoriteButton.style.border = "1px solid black";
    favoriteButton.style.display = "none"
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

async function concluir(id) {
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




