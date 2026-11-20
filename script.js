// Cada palavra: resposta, linha, coluna, direção (H ou V) e pista.
const TAM = 17;
const palavras = [
  { r: "MICROCONTROLADOR", l: 9,  c: 0,  d: "H", p: "Chip único com processador, memória e portas de entrada e saída para uma tarefa específica." },
  { r: "REGISTRADORES",    l: 3,  c: 1,  d: "H", p: "Pequenas memórias dentro da CPU, as mais rápidas, que guardam os dados em uso imediato." },
  { r: "DATABUS",          l: 5,  c: 6,  d: "H", p: "Caminho por onde as informações trafegam entre CPU, memória e periféricos." },
  { r: "CACHE",            l: 7,  c: 12, d: "H", p: "Memória pequena e muito rápida que guarda dados muito usados perto da CPU." },
  { r: "FLASH",            l: 13, c: 10, d: "H", p: "Memória não volátil apagada em blocos, usada em pen drives e cartões SD." },
  { r: "MEMORIADEMASSA",   l: 16, c: 2,  d: "H", p: "Armazenamento de grande capacidade, como HD ou SSD, que guarda arquivos permanentemente." },
  { r: "ULA",              l: 8,  c: 11, d: "V", p: "Parte da CPU que faz as contas e as operações lógicas." },
  { r: "DMA",              l: 8,  c: 0,  d: "V", p: "Recurso que transfere dados entre memória e periféricos sem ocupar o processador." },
  { r: "DUALCORE",         l: 3,  c: 9,  d: "V", p: "Processador com dois núcleos de processamento no mesmo chip." },
  { r: "CPU",              l: 9,  c: 2,  d: "V", p: "Cérebro do computador, que executa as instruções dos programas." },
  { r: "ADDRESSBUS",       l: 7,  c: 13, d: "V", p: "Caminho por onde a CPU informa qual posição de memória quer acessar." },
  { r: "UC",               l: 5,  c: 11, d: "V", p: "Parte da CPU que coordena e dirige o trabalho dos outros componentes." },
  { r: "ROM",              l: 8,  c: 6,  d: "V", p: "Memória não volátil de conteúdo fixo, gravada na fabricação, que guarda firmware." },
  { r: "QUADCORE",         l: 0,  c: 16, d: "V", p: "Processador com quatro núcleos de processamento." },
  { r: "EEPROM",           l: 5,  c: 4,  d: "V", p: "Memória não volátil que pode ser apagada e regravada eletricamente, byte a byte." },
  { r: "RAM",              l: 9,  c: 15, d: "V", p: "Memória volátil onde ficam programas e dados em uso; perde tudo ao desligar." },
];

const tab = document.getElementById("tabuleiro");
const inputs = {};      // "l,c" -> input
const numeros = {};     // "l,c" -> número da pista
let ultimaDir = "H";

function celulasDe(w) {
  return [...w.r].map((_, i) => (w.d === "H" ? [w.l, w.c + i] : [w.l + i, w.c]));
}

// Numeração: ordem de leitura das casas iniciais (mesmo número para H e V na mesma casa)
function numerar() {
  const inicios = [...new Set(palavras.map(w => w.l + "," + w.c))]
    .sort((a, b) => { const [l1, c1] = a.split(",").map(Number), [l2, c2] = b.split(",").map(Number); return l1 - l2 || c1 - c2; });
  inicios.forEach((k, i) => (numeros[k] = i + 1));
  palavras.forEach(w => (w.n = numeros[w.l + "," + w.c]));
}

function montar() {
  numerar();
  const ativas = new Set();
  palavras.forEach(w => celulasDe(w).forEach(([l, c]) => ativas.add(l + "," + c)));
  tab.style.gridTemplateColumns = `repeat(${TAM}, 32px)`;
  for (let l = 0; l < TAM; l++) {
    for (let c = 0; c < TAM; c++) {
      const k = l + "," + c;
      const div = document.createElement("div");
      if (!ativas.has(k)) { div.className = "vazia"; tab.appendChild(div); continue; }
      div.className = "casa";
      const inp = document.createElement("input");
      inp.maxLength = 1;
      inp.dataset.l = l; inp.dataset.c = c;
      inp.addEventListener("input", aoDigitar);
      inp.addEventListener("keydown", aoTecla);
      inputs[k] = inp;
      div.appendChild(inp);
      if (numeros[k]) { const s = document.createElement("span"); s.className = "num"; s.textContent = numeros[k]; div.appendChild(s); }
      tab.appendChild(div);
    }
  }
  [...palavras].sort((a, b) => a.n - b.n).forEach(w => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${w.n}.</b> ${w.p}`;
    w.li = li;
    document.getElementById(w.d === "H" ? "pistasH" : "pistasV").appendChild(li);
  });
  atualizarContador(0);
}

function vizinha(inp, dl, dc) {
  return inputs[(+inp.dataset.l + dl) + "," + (+inp.dataset.c + dc)];
}

function aoDigitar(e) {
  const inp = e.target;
  inp.value = inp.value.normalize("NFD").replace(/[^a-zA-Z]/g, "").toUpperCase();
  limparMarcas();
  if (!inp.value) return;
  // avança na direção em que o jogador está digitando; se não houver, tenta a outra
  const prox = ultimaDir === "H" ? vizinha(inp, 0, 1) : vizinha(inp, 1, 0);
  if (prox) prox.focus();
}

function aoTecla(e) {
  const inp = e.currentTarget;
  const mapa = { ArrowRight: [0, 1, "H"], ArrowLeft: [0, -1, "H"], ArrowDown: [1, 0, "V"], ArrowUp: [-1, 0, "V"] };
  if (mapa[e.key]) {
    const [dl, dc, dir] = mapa[e.key];
    ultimaDir = dir;
    const v = vizinha(inp, dl, dc);
    if (v) v.focus();
    e.preventDefault();
  } else if (e.key === "Backspace" && !inp.value) {
    const v = ultimaDir === "H" ? vizinha(inp, 0, -1) : vizinha(inp, -1, 0);
    if (v) { v.focus(); v.value = ""; }
  }
}

function atualizarContador(n) {
  document.getElementById("contador").textContent = `${n} de ${palavras.length} palavras`;
}

function limparMarcas() {
  document.querySelectorAll(".certa, .errada").forEach(el => el.classList.remove("certa", "errada"));
}

function conferir() {
  limparMarcas();
  let acertos = 0;
  palavras.forEach(w => {
    const cels = celulasDe(w);
    const digitado = cels.map(([l, c]) => inputs[l + "," + c].value).join("");
    const ok = digitado === w.r;
    if (ok) acertos++;
    w.li.classList.add(ok ? "certa" : "errada");
    cels.forEach(([l, c]) => {
      const casa = inputs[l + "," + c].parentElement;
      if (ok) { casa.classList.remove("errada"); casa.classList.add("certa"); }
      else if (!casa.classList.contains("certa")) casa.classList.add("errada");
    });
  });
  atualizarContador(acertos);
}

function reiniciar() {
  Object.values(inputs).forEach(i => (i.value = ""));
  limparMarcas();
  atualizarContador(0);
}

document.getElementById("btnConferir").addEventListener("click", conferir);
document.getElementById("btnReiniciar").addEventListener("click", reiniciar);
montar();
