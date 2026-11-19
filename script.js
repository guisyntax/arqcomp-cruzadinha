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

