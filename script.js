// GET - pegar/trazer/listar
// POST - subir/adicionar/enviar/criar
// PUT - atualizar/alterar/
// DELETE - apagar/deletar/destruir/remover/aniquilar

async function addContato(){
    let dados = input_nova_tarefa.value.split(" ")
    let nome = dados[0]
    let idade = dados[1]
    let chuchu = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3',{
        method: "POST",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            idade: idade
        })
    })
    console.log(chuchu)
    if(chuchu.ok){
        console.log('adicionei')
        atualizarContatos()
    }
}

async function atualizar(identificador){
    let nomeNovo = prompt("nome?")
    let idadeNovo = prompt("idade?")

    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/' + identificador, {
        method: 'PUT',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeNovo,
            idade: idadeNovo
        })
    });
    if(res.ok){
        alert('Atualizou')
        atualizarContatos()
    }else{
        alert('Erro ao atualizar')
    }

}

atualizarContatos();

async function atualizarContatos(){
    let resposta = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3')
    let body = await resposta.json()
    tarefas.innerHTML = "<ul>"
    body.forEach(pessoa => {
        tarefas.innerHTML +=  ` 
        <li>${pessoa.nome} - ${pessoa.idade} 
            <button onclick="deletar(${pessoa.id})">Deletar</button>
            <button onclick="atualizar(${pessoa.id})">Atualizar</button>
        </li>`
    });
    tarefas.innerHTML +=  "</ul>"
}

async function deletar(identificador){
    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/' + identificador, {
        method: 'DELETE',
    });
    if(res.ok){
        atualizarContatos();
    } else{
        console.log(res.statusText)
    }
}

function editar() {
    teste.disabled = true;
    editBtn.style.display="none"
    concludeBtn.style.display="inline"
    teste.style.color = "#000000"
}

function concluir(){
    teste.disabled = false;
    teste.style.color = "#ff0000"
    editBtn.style.display="inline"
    concludeBtn.style.display="none"
}