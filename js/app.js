const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");
const botaoAvancarTempo = document.getElementById("botao-avancar-tempo");
const valoresContador = document.querySelectorAll(".contador-valor");

let dataBase = new Date();
let dataDiaDosNamorados = criarDataDiaDosNamorados(dataBase);
let diferencaSimulada = 0;
let contagemFinalizada = false;

function criarDataDiaDosNamorados(dataAtual) {
  const anoAtual = dataAtual.getFullYear();
  const diaDosNamorados = new Date(anoAtual, 5, 12, 0, 0, 0);

  if (dataAtual > diaDosNamorados) {
    return new Date(anoAtual + 1, 5, 12, 0, 0, 0);
  }

  return diaDosNamorados;
}

function pintarContadorFinalizado(tempoRestante) {
  valoresContador.forEach(function (elemento) {
    elemento.classList.toggle("bg-dark", tempoRestante > 0);
    elemento.classList.toggle("bg-success", tempoRestante <= 0);
  });
}

function atualizarContador() {
  const dataAtual = new Date(Date.now() + diferencaSimulada);
  const tempoRestante = dataDiaDosNamorados.getTime() - dataAtual.getTime();
  const totalSegundos = Math.max(0, Math.floor(tempoRestante / 1000));

  dias.textContent = Math.floor(totalSegundos / 86400);
  horas.textContent = Math.floor((totalSegundos % 86400) / 3600);
  minutos.textContent = Math.floor((totalSegundos % 3600) / 60);
  segundos.textContent = totalSegundos % 60;

  pintarContadorFinalizado(tempoRestante);

  if (tempoRestante <= 0 && !contagemFinalizada) {
    contagemFinalizada = true;
    setTimeout(function () {
      alert("A contagem acabou!");
      window.location.reload();
    }, 1000);
  }
}

function avancarTempo() {
  diferencaSimulada = dataDiaDosNamorados.getTime() - Date.now() - 10000;
  contagemFinalizada = false;
  console.log("Tempo avancado. Faltam 10 segundos para o dia dos namorados.");
  atualizarContador();
}

console.log("Inicio da requisicao");

fetch("http://localhost:3000/users", {
  method: "GET",
})
  .then(function (response) {
    console.log("Resposta recebida", response);
    return response.json();
  })
  .then(function (json) {
    console.log("JSON", json);

    dataBase = new Date(json["Data atual"]);
    dataDiaDosNamorados = new Date(json["Data dia dos namorados"]);

    atualizarContador();
    setInterval(atualizarContador, 1000);
  })
  .catch(function () {
    console.log("Erro na requisicao. Usando data local.");
    dataBase = new Date();
    dataDiaDosNamorados = criarDataDiaDosNamorados(dataBase);
    atualizarContador();
    setInterval(atualizarContador, 1000);
  });

console.log("Fim da requisicao");

botaoAvancarTempo.addEventListener("click", avancarTempo);
