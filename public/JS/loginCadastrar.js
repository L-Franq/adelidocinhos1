function mostarCadastro() {
    document.getElementById("formLogin").classList.add("hidden");

    document.getElementById("formCadastro").classList.remove("hidden");

    document.getElementById("titulo").innerText="Cadastro";
}

function mostrarLogin(){
   
    document.getElementById("formCadastro").classList.add("hidden");

        document.getElementById("formLogin").classList.remove("hidden");

    document.getElementById("titulo").innerText="Login";
}
