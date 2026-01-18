const userName = document.getElementById("userName");

fetch("/user/userDados")
.then(res => res.json())
.then(user =>{
  userName.innerText = user.nome;
})
.catch(()=>{
  userName.innerText = "ERRO";
});