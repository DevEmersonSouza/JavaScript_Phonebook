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



async function atualizarContatos() {
    let resposta = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3')
    let body = await resposta.json()
    contacts.innerHTML = `<div class="contacts">`
    body.forEach(pessoa => {
        contacts.innerHTML += `<div><input type="text" value="${pessoa.nome}" id="nome${pessoa.id}" disabled="disabled">
        <input type="text" value="${pessoa.idade}" id="telefone${pessoa.id}" disabled="disabled">
        <button class="btn btn-outline-primary" onclick="editar(${pessoa.id})" id="editBtn">editar</button>
        <button class="btn btn-outline-primary" onclick="concluir(${pessoa.id})" id="concludeBtn">concluir</button></div>`
        
    });
    contacts.innerHTML += `</div>`
}
atualizarContatos();

async function editar(id) {
    let nomeNovo = document.getElementById("nome" + id)
    let telefoneNovo = document.getElementById("telefone" + id)
    nomeNovo.disabled = false;
    telefoneNovo.disabled = false;
    console.log("editando")
    
}

async function concluir(id) {
    
    let nomeNovo = document.getElementById("nome" + id).value
    let telefoneNovo = document.getElementById("telefone" + id).value
    nomeNovo.disabled = true;
    telefoneNovo.disabled = true;
    console.log(nomeNovo)

    let res = await fetch(`https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/`+ id, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeNovo,
            idade: telefoneNovo
        })
    });
    if (res.ok) {
        alert('Atualizou')
        atualizarContatos()
    } else {
        alert('Erro ao atualizar')
    }
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




