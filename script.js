// GET - pegar/trazer/listar
// POST - subir/adicionar/enviar/criar
// PUT - atualizar/alterar/
// DELETE - apagar/deletar/destruir/remover/aniquilar
$(window).on('load', function () {
    $('#myModal').modal('show');
});

async function addContato() {
    let dados = input_nova_tarefa.value.split(" ")
    let nome = dados[0]
    let idade = dados[1]
    let chuchu = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            idade: idade
        })
    })
    console.log(chuchu)
    if (chuchu.ok) {
        console.log('adicionei')
        atualizarContatos()
    }
}

async function atualizar(identificador) {
    let nomeNovo = prompt("nome?")
    let idadeNovo = prompt("idade?")

    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3' + identificador, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeNovo,
            idade: idadeNovo
        })
    });
    if (res.ok) {
        alert('Atualizou')
        atualizarContatos()
    } else {
        alert('Erro ao atualizar')
    }

}

atualizarContatos();
let nrm = 1
function cont() {
    nrm++
}
async function atualizarContatos() {
    let resposta = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3')
    let body = await resposta.json()
    contacts.innerHTML = "<div>"
    body.forEach(pessoa => {
        contacts.innerHTML += ` 
        <input type="text" value="${pessoa.nome}" id="nome` + nrm + `">
        <input type="text" value="${pessoa.idade}" id="telefone` + nrm + `">
        <button class="btn btn-outline-primary" onclick="editar()" id="editBtn">editar</button>
        <button class="btn btn-outline-primary" onclick="concluir()" id=concludeBtn style="display:none">concluir</button>`
        cont()
    });
    contacts.innerHTML += "</div>"
}

async function deletar(identificador) {
    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3' + identificador, {
        method: 'DELETE',
    });
    if (res.ok) {
        atualizarContatos();
    } else {
        console.log(res.statusText)
    }
}

function editar(nrm) {
    nome(nrm).disabled = true;
    telefone(nrm).disabled = true;
    editBtn.style.display = "none"
    concludeBtn.style.display = "inline"
    console.log("apertei")
}

function concluir(nrm) {
    nome(nrm).disabled = true;
    telefone(nrm).disabled = true;
    editBtn.style.display = "inline"
    concludeBtn.style.display = "none"
}