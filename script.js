let inputNovoNome = document.getElementById("input_novo_nome");
let inputNovoNumero = document.getElementById("input_novo_numero");
let btnAddContato = document.getElementById("btnAddContato");
let btnMostrarFormContato = document.getElementById("mostrarFormContato");
let btnCancelarContato = document.getElementById("btnCancelarContato");
let ordenacao = localStorage.getItem("ordenacao");

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

let trocarOrdenacaoAsc = () => {;
    ordenacao = "asc"
    localStorage.setItem("ordenacao", ordenacao)
    atualizarContatos()
};

let trocarOrdenacaoDesc = () => {;
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

function mascaraTelefone(event) {
    let tecla = event.key;;
    let telefone = event.target.value.replace(/\D+/g, "");;

    if (/^[0-9]$/i.test(tecla)) {
        telefone = telefone + tecla;
        let tamanho = telefone.length;;

        if (tamanho >= 12) {
            return false;
        }

        if (tamanho > 10) {
            telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (tamanho > 5) {
            telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (tamanho > 2) {
            telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            telefone = telefone.replace(/^(\d*)/, "($1");
        }

        event.target.value = telefone;
    }

    if (!["Backspace", "Delete"].includes(tecla)) {
        return false;
    }
}

async function addContato() {
    let nome = input_novo_nome.value;
    let numero = input_novo_numero.value;


    if (numero.length < 15) {
        alert("por favor, inserir informações válidas")
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
    let resposta = await fetch('https://634df4bbb8ce95a1dd7c265e.mockapi.io/ListaTelefonica');
    let body = await resposta.json();
    let contador = document.getElementById("contador");
    contador.value = "(" + body.length + ")"

    let listaSorted = body.sort((a, b) => a.nome.toLowerCase() < b.nome.toLowerCase() ? -1 : a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : 0);;

    if (ordenacao === "desc") {
        listaSorted = body.sort((b, a) => a.nome.toLowerCase() < b.nome.toLowerCase() ? -1 : a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : 0);

    }
    contacts.innerHTML = `<div class="contacts ">`
    listaSorted.forEach(pessoa => {
        contacts.innerHTML += `<div class="pessoas">
            <div id="pessoa${pessoa.id}">
                <input type="text" class="contact-input" value="${pessoa.nome}" id="nome${pessoa.id}" disabled="disabled" maxlength="21"><input type="text" value="${pessoa.idade}" class="contact-input " id="telefone${pessoa.id}" disabled="disabled" onkeydown="return mascaraTelefone(event)"></div>
                    <div id="botoes${pessoa.id}" class = "buttons-row">
                    <button class="btn btn-outline-primary" onclick="editar(${pessoa.id})" id="editBtn${pessoa.id}"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-outline-primary" onclick="concluirEdicao(${pessoa.id})" id="concludeBtn${pessoa.id}" style="display: none;"><i class="bi bi-check-circle-fill"></i></button>
                    <button id="favoritos${pessoa.id}" class="btn btn-outline-primary favorito" onclick="favoritos(${pessoa.id})"><i class="bi bi-bookmark-star"></i></i></button>
                    <button class="btn btn-outline-primary" onclick="deletar(${pessoa.id})" id="deleteBtn"><i class="bi bi-x-circle-fill"></i></button>
                    </div></div>`
                    // <button id="removerFavoritos${pessoa.id}" class="btn btn-outline-primary removerfavorito" onclick="removeFavoritos(${pessoa.id})" style="display: none;"><i class="bi bi-bookmark-star-fill"></i></i></button>
    });
    contacts.innerHTML += `</div>`
}
atualizarContatos();
let arrayTeste;

if (localStorage.getItem("contatofavorito")) {
    arrayTeste = JSON.parse(localStorage.getItem("contatofavorito"))

} else {
    arrayTeste = []
}


function favoritos(id) {
    let favoriteButton = document.getElementById("favoritos" + id);;
    let nome = document.getElementById("nome" + id).value;
    let telefone = document.getElementById("telefone" + id).value;
    favoriteButton.disabled = "disabled"
    arrayTeste.push({ nome: nome, telefone: telefone, id: id })
    localStorage.setItem("contatofavorito", JSON.stringify(arrayTeste))
    manterFavorito()
}

manterFavorito()

function manterFavorito(id) {
    favoriteContacts.innerHTML = ""
    arrayTeste.forEach((element) => {
        
        favoriteContacts.innerHTML += `<div class="favorites-row"><div class="nameNumber"><div class="favorite-name">` + element.nome + `</div>` + `<div class="favorite-number">` + element.telefone + `</div></div><button class="btn btn-danger btn-info" onclick="removeFavoritos(${element.id})" deleteFavButton"><i class="bi bi-trash"></i></button></div>` + `<hr>`
        
    });
}

function removeFavoritos(index) {
    let favoriteButton = document.getElementById("favoritos" + index);
    if (favoriteButton === null)
    {
        arrayTeste = arrayTeste.filter(contato => contato.id !== index)
        localStorage.setItem("contatofavorito", JSON.stringify(arrayTeste))
        manterFavorito()
        return
    }
    favoriteButton.disabled = ""
    arrayTeste = arrayTeste.filter(contato => contato.id !== index)
    localStorage.setItem("contatofavorito", JSON.stringify(arrayTeste))
    manterFavorito()
}

async function editar(id) {
    let nomeNovo = document.getElementById("nome" + id);
    let telefoneNovo = document.getElementById("telefone" + id);
    let editBtn = document.getElementById("editBtn" + id);
    let concludeBtn = document.getElementById("concludeBtn" + id);
    nomeNovo.disabled = false;
    telefoneNovo.disabled = false;
    console.log("editando")
    editBtn.style.display = "none"
    concludeBtn.style.display = "inline"
    $("#nome" + id).addClass('editing-inputs')
    $("#telefone" + id).addClass('editing-inputs')

}

async function concluirEdicao(id) {
    let nomeNovo = document.getElementById("nome" + id).value;
    let telefoneNovo = document.getElementById("telefone" + id).value;
    let editBtn = document.getElementById("editBtn" + id);
    let concludeBtn = document.getElementById("concludeBtn" + id);
    editBtn.style.display = "inline"
    concludeBtn.style.display = "none"
    nomeNovo.disabled = true;
    telefoneNovo.disabled = true;
    removeFavoritos(id)
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
    if (telefoneNovo.length < 15) {
        alert('Apenas números com 9 digitos')
        editBtn.style.display = "none"
        concludeBtn.style.display = "inline"
        return
    }
    if (adicionarNumero.ok) {
        alert('Atualizou')
        favoritos(id)
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
        alert('Contato Deletado')
        console.log("deletei")
        atualizarContatos();
    } else {
        console.log(res.statusText)
    }
}

function Mudarestado(el) {
    let display = document.getElementById(el).style.display;;
    if (display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}

function search() {
    Mudarestado("listaFav")
    let inputSearch = document.getElementById("searchInput");;
    let container = document.getElementById("contacts");
    if (inputSearch.style.display == "none") {
        inputSearch.style.display = 'block'
    }
    else {
        inputSearch.style.display = 'none'
        atualizarContatos();
    }

    inputSearch.addEventListener('keyup', () => {

        let valor = inputSearch.value.toLowerCase();;
        let inputs = container.getElementsByTagName('div');
        if (valor.length === 2) {
            return
        }
        for (let posicao in inputs) {;
            if (true === isNaN(posicao)) {
                continue;
            }
            let conteudoDoInput = inputs[posicao].innerHTML.toLowerCase();;
            if (true === conteudoDoInput.includes(valor)) {
                inputs[posicao].style.display = ""
            }
            else {
                inputs[posicao].style.display = "none"
            }
        }
    })
}