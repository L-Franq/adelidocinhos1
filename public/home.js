let indiceAtual = 0;
const imagens = document.querySelectorAll(".img-carrossel");
const dataAtual = new Date() ;
const anoAtual = dataAtual.getFullYear();
const copyright = document.getElementById("copyRodape");
const totalImagens = imagens.length;

function mostrarImagem(indice) {
  
  imagens.forEach((img) => img.classList.remove("ativa"));

  imagens[indice].classList.add("ativa");
}

function proximaImagem() {
  indiceAtual = (indiceAtual + 1) % totalImagens;
  mostrarImagem(indiceAtual);
}

mostrarImagem(indiceAtual);

setInterval(proximaImagem, 4000);

copyright.innerHTML = `<p id="copyright">&copy; Adelidocinhos ${anoAtual} - criado por Lopo Franqueira.</p>`;