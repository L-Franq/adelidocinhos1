const form = document.getElementById("formVisita");

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
    Swal.fire("Obrigado!", "Mensagem Enviada.", "success")
  } else {
    Swal.fire("Lamentamos!", json.erro, "error")
  }
};
