document.addEventListener("DOMContentLoaded", () => {
    listarTodos();
});

function listarTodos() {
    fetch("listar.php",
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuarios => inserirUsuarios(usuarios))
        .catch(error => console.log(error));
}

function inserirUsuarios(usuarios) {
    for (const usuario of usuarios) {
        inserirUsuario(usuario);
    }
}

function inserirUsuario(usuario) {
    let tbody = document.getElementById('usuarios');
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.innerHTML = usuario.id_usuario;
    let tdNome = document.createElement('td');
    tdNome.innerHTML = usuario.nome;
    let tdEmail = document.createElement('td');
    tdEmail.innerHTML = usuario.email;
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscaUsuario, false);
    btnAlterar.id_usuario = usuario.id_usuario;
    tdAlterar.appendChild(btnAlterar);
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    tbody.appendChild(tr);
}

function buscaUsuario(evt) {
    let id_usuario = evt.currentTarget.id_usuario;
    //console.log(id_usuario);
    fetch('buscaUsuario.php?id_usuario=' + id_usuario,
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuario => preencheForm(usuario))
        .catch(error => console.log(error));
}

function preencheForm(usuario) {
    let inputIDUsuario = document.getElementsByName("id_usuario")[0];
    inputIDUsuario.value = usuario.id_usuario;
    let inputNome = document.getElementsByName("nome")[0];
    inputNome.value = usuario.nome
    let inputEmail = document.getElementsByName("email")[0];
    inputEmail.value = usuario.email;
}

function salvarUsuario(event) {
    // parar o comportamento padrão do form
    event.preventDefault();
    // obtém o input id_usuario
    let inputIDUsuario = document.getElementsByName("id_usuario")[0];
    // pega o valor do input id_usuario
    let id_usuario = inputIDUsuario.value;

    let inputNome = document.getElementsByName("nome")[0];
    let nome = inputNome.value;
    let inputEmail = document.getElementsByName("email")[0];
    let email = inputEmail.value;
    let inputSenha = document.getElementsByName("senha")[0];
    let senha = inputSenha.value;

    fetch('inserir.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_usuario: id_usuario,
                nome: nome,
                email: email,
                senha: senha
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuario => inserirUsuario(usuario))
        .catch(error => console.log(error));
}