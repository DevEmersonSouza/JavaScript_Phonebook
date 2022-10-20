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


async function atualizarContatos() {
    let resposta = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3')
    let body = await resposta.json()
    contacts.innerHTML = "<div>"
    body.forEach(pessoa => {
        contacts.innerHTML += ` 
        <input type="text" value="${pessoa.nome}" id="nome${pessoa.id}" disabled="disabled">
        <input type="text" value="${pessoa.idade}" id="telefone${pessoa.id}" disabled="disabled">
        <button class="btn btn-outline-primary" onclick="editar()" id="editBtn">editar</button>
        <button class="btn btn-outline-primary" onclick="concluir()" id="concludeBtn">concluir</button>`

    });
    contacts.innerHTML += "</div>"
}
atualizarContatos();

async function editar() {
    let resposta = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3')
    let body = await resposta.json()
    console.log(body)
    body.forEach(pessoa => {
        let nome = document.getElementById("nome" + pessoa.id)
        let telefone = document.getElementById("telefone" + pessoa.id)
        nome.disabled = false;
        telefone.disabled = false;
        console.log("editando")
    });
}

async function concluir() {
    let resposta = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3')
    let body = await resposta.json()
    body.forEach(pessoa => {
        let nome = document.getElementById("nome" + pessoa.id)
        let telefone = document.getElementById("telefone" + pessoa.id)
        nome.disabled = true;
        telefone.disabled = true;
        console.log("concluindo")
    });
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



