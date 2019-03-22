/*let indiceAtual = 0;
const imagens = document.querySelectorAll(".img-carrossel");
const totalImagens = imagens.length;

function mostrarImagem(indice) {
  imagens.forEach((img) => (img.style.display = "none")); // Esconde todas
  imagens[indice].style.display = "block"; // Mostra a atual
}

function proximaImagem() {
  indiceAtual = (indiceAtual + 1) % totalImagens;
  mostrarImagem(indiceAtual);
}

// Inicia o carrossel
mostrarImagem(indiceAtual);

// Para trocar a cada 3 segundos (exemplo):
setInterval(proximaImagem, 3000);*/

let indiceAtual = 0;
const imagens = document.querySelectorAll(".img-carrossel");
const totalImagens = imagens.length;

function mostrarImagem(indice) {
  // Remove a classe 'ativa' de todas as imagens
  imagens.forEach((img) => img.classList.remove("ativa"));

  // Adiciona a classe 'ativa' apenas na imagem atual
  imagens[indice].classList.add("ativa");
}

function proximaImagem() {
  indiceAtual = (indiceAtual + 1) % totalImagens;
  mostrarImagem(indiceAtual);
}

// Inicia o carrossel
mostrarImagem(indiceAtual);

// Troca a cada 4 segundos (tempo maior para apreciar a suavidade)
setInterval(proximaImagem, 4000);
