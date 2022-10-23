// GET - pegar/trazer/listar
// POST - subir/adicionar/enviar/criar
// PUT - atualizar/alterar/
// DELETE - apagar/deletar/destruir/remover/aniquilar
let inputNovoNome = document.getElementById("input_novo_nome")
let inputNovoNumero = document.getElementById("input_novo_numero")
let btnAddContato = document.getElementById("btnAddContato")
let btnMostrarFormContato = document.getElementById("mostrarFormContato")
let btnCancelarContato = document.getElementById("btnCancelarContato")
$(window).on('load', function () {
    $('#myModal').modal('show');
});

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
}
async function addContato() {
    let nome = input_novo_nome.value
    let numero = input_novo_numero.value

    if (nome === "" || numero === "") {
        alert("por favor inserir as informacoes")
        return
    }
    let novoContato = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3', {
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
    let resposta = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3')
    let body = await resposta.json()
    let contador = document.getElementById("numeros")
    contador.value = "("  + body.length + ")"
    contacts.innerHTML = `<div class="contacts">`
    body.forEach(pessoa => {
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

    let adicionarNumero = await fetch(`https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/` + id, {
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
    let deletar = await fetch(`https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/` + id, {
        method: 'DELETE',
    });
    if (deletar.ok) {
        console.log("deletei")
        atualizarContatos();
    } else {
        console.log(res.statusText)
    }
}




