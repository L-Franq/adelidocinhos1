const form = document.getElementById("formVisita");
const mostrarAlerta = (titulo, texto, icone) => {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: icone,
    background: '#132640', // Cor do seu sistema
    color: '#9f86a6',      // Cor do seu texto
    confirmButtonColor: '#fc80db', // Cor do seu botão
    iconColor: icone === 'success' ? '#fc80db' : '#f2aee0'
  });
};

form.onsubmit = async (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    assunto: document.getElementById("assunto").value,
  };

  const res = await fetch("/visitas", {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(dados),
  });

  form.reset();
  const json = await res.json();

  if (json.sucesso) {
    mostrarAlerta("Obrigado!", "Mensagem Enviada", "sucess");
  } else {
    mostrarAlerta("Lamentamos!", json.erro, "error");
  }
};
