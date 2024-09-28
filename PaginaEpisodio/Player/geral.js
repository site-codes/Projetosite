// Template HTML
const htmlTemplate = `
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<main class="video-container">
  <span id="brilho"></span>
  <div class="controlsplayer">
    <button id="pOP" data-in="${inicioOP}" data-on="${finalOP}">Pular Opening</button>

    <div class="container">
      <div class="brilhop" id="brilhop">
        <span class="percentage" id="percentage">100%</span>
        <span class="icbr"></span>
        <div id="barbr"></div>
        <div id="handle"></div>
      </div>
    </div>

    <div class="volubar">
      <div class="vol" id="vol">
        <span id="volnumb">100%</span>
        <div id="barvol"></div>
        <div id="handlevol"></div>
        <h8 class="icvol"></h8>
      </div>
    </div>

    <span class="poster">
      <img class="capaposter"
        src="${capaPlayEp}"
      />
      <img class="capapause"
      src="${capaPauseEp}"
    /> 
    </span>
    <div class="viewmode">
      <div>
        <p>QUALIDADES</p>
        <main>
          <button class="quality 1080p" data-source="${link1080p}">1080p</button>
          <button class="quality 720p" data-source="${link720p}">720p</button>
          <button class="quality 480p" data-source="${link480p}">480p</button>
        </main>
        <main class="observation">
          <span data-source="TECLA ESPAÇO">Play/ Pausa</span>
          <span data-source="DUPLO CLIQUE/ SETA DIREITA">Avança 10s</span>
          <span data-source="DUPLO CLIQUE/ SETA ESQUERDA">Retrocede 10s</span>
          <span data-source="SETA CIMA/ SETA BAIXO">Mais/ Menos volume</span>
          <span data-source="1/ 0">Aumenta/ Diminui brilho</span>
          <span data-source="X">Printar</span>
          <span data-source="R">Reinicia video</span>
          <span data-source="M">Audio mudo</span>
          <span data-source="V">Velocidade</span>
          <span data-source="Z">Zoom</span>
          <span data-source="F">Tela cheia</span>
          <span data-source="B">Travar Tela</span>
          <span data-source="P/ D">Avançar/ Pular OP</span>
          <span data-source="O">Opções</span>
        </main>
      </div>
    </div>

    <span class="topp">
      <span class="logotl">
        <img
          src="${logoSite}"
        />
      </span>
      <span class="titleepplayer">
        <p>${TituloEp}</p>
      </span>
      

      <button id="pular"></button>
      <button class="more" id="more"></button>
      <button class="block"></button>
    </span>

    <span class="medp">
      <button class="lefttime" id="lefttime"></button>
      <button class="playpause" id="playpause"></button>
      <button class="righttime" id="righttime"></button>
    </span>

    <span class="endp timeline">
      <h2 class="current-time">00:00</h2>
      <div class="progress" id="progress">
        <div id="bar"></div>
        <div class="handletimeline" id="handletimeline"></div>
      </div>
      <h2 class="total-time"></h2>
    </span>

    <span class="progressline">
      <button class="download"></button>
      <button id="captureButton"></button>
      <canvas id="canvas"></canvas>
      <button id="reiniciar"></button>
      <button id="volume"></button>
      <button class="velocidade speed-btn">1x</button>
      <button id="zoom"></button>
      <button id="fullcontrols" class="full-screen-btn"></button>
    </span>
    
    <span id="block"></span>
    <span id="leftdd"></span>
    <span id="rightdd"></span>
  </div>

  <video id="video" preload="auto" class="1080p video" src=""></video>
</main>
`;

// Inserindo o HTML na div
document.querySelector("#player").innerHTML = htmlTemplate;

var video = document.getElementById("video");
var playpauseButton = document.getElementById("playpause");
var videoContainer = document.querySelector(".video-container");
var timeoutId = null;
var reiniciarButton = document.getElementById("reiniciar");
var lefttimeButton = document.getElementById("lefttime");
var righttimeButton = document.getElementById("righttime");
var fullScreenBtn = document.querySelector(".full-screen-btn");
var volumeButton = document.getElementById("volume");
var poster = document.querySelector(".poster");
var pularButton = document.getElementById("pular");
var buttons = document.querySelectorAll(".quality");
var currentSource = null;
var currentTimeBackup = 0;

// zoom no video
const zoomButton = document.getElementById("zoom");

function checkWindowSize() {
  if (window.innerWidth < 1100) {
    zoomButton.classList.add("fill");
    video.classList.add("fill");
  } else {
    zoomButton.classList.remove("fill");
    video.classList.remove("fill");
  }
}

// Verifica o tamanho da janela ao carregar a página
document.addEventListener("DOMContentLoaded", checkWindowSize);

// Verifica o tamanho da janela quando a janela é redimensionada
window.addEventListener("resize", checkWindowSize);

zoomButton.addEventListener("click", function () {
  zoomButton.classList.toggle("fill");
  video.classList.toggle("fill");
});

// volume lateral
const vol = document.getElementById("vol");
const handlevol = document.getElementById("handlevol");
const volnumb = document.getElementById("volnumb");
const icvol = document.querySelector(".icvol");

const initialVolume = 100;
document.getElementById("barvol").style.height = `${initialVolume}%`;
handlevol.style.bottom = `${initialVolume}%`;
volnumb.textContent = `${initialVolume}%`;

function updateVideoVolume() {
  const currentHeight =
    parseFloat(document.getElementById("barvol").style.height) || 0;
  const percentage = currentHeight / 100;

  video.volume = percentage;

  if (percentage === 0) {
    icvol.classList.add("zerob");
    video.muted = true;
    volumeButton.classList.add("vol");
  } else {
    icvol.classList.remove("zerob");
    video.muted = false;
    volumeButton.classList.remove("vol");
  }
}

handlevol.addEventListener("mousedown", function (e) {
  isDragging = true;
  e.preventDefault();
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

document.addEventListener("keydown", function (e) {
  if (isDragging) return;

  let currentHeight =
    parseFloat(document.getElementById("barvol").style.height) || 0;

  switch (e.key) {
    case "ArrowUp":
      currentHeight = Math.min(100, currentHeight + 25);
      break;
    case "ArrowDown":
      currentHeight = Math.max(0, currentHeight - 25);
      break;
    default:
      return;
  }

  document.getElementById("barvol").style.height = `${currentHeight}%`;
  handlevol.style.bottom = `${currentHeight}%`;

  volnumb.textContent = `${Math.round(currentHeight)}%`;

  updateVideoVolume();
});
handlevol.addEventListener("touchstart", function (e) {
  isDragging = true;
  e.preventDefault();
});

document.addEventListener("touchend", function () {
  isDragging = false;
});

vol.addEventListener("touchmove", function (e) {
  if (isDragging) {
    const posY = e.touches[0].clientY - vol.getBoundingClientRect().top;
    let volHeight = vol.clientHeight;
    let percentage = ((volHeight - posY) / volHeight) * 100;

    percentage = Math.max(0, Math.min(100, percentage));

    document.getElementById("barvol").style.height = `${percentage}%`;
    handlevol.style.bottom = `${percentage}%`;

    volnumb.textContent = `${Math.round(percentage)}%`;

    updateVideoVolume();
  }
});

vol.addEventListener("mousemove", function (e) {
  if (isDragging) {
    const posY = e.clientY - vol.getBoundingClientRect().top;
    let volHeight = vol.clientHeight;
    let percentage = ((volHeight - posY) / volHeight) * 100;

    percentage = Math.max(0, Math.min(100, percentage));

    document.getElementById("barvol").style.height = `${percentage}%`;
    handlevol.style.bottom = `${percentage}%`;

    volnumb.textContent = `${Math.round(percentage)}%`;

    updateVideoVolume();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  updateVideoVolume();
});

// brilho

const brilhop = document.getElementById("brilhop");
const handle = document.getElementById("handle");
const barbr = document.getElementById("barbr");
const brilho = document.getElementById("brilho");

let isDraggingBrilho = false;

const initialBrilho = 100; // Opacidade inicial invertida
barbr.style.height = `${initialBrilho}%`;
handle.style.bottom = `${initialBrilho}%`;
brilho.style.opacity = 1 - initialBrilho / 100; // Define opacidade inicial invertida

function updateBrilho() {
  const currentHeight = parseFloat(barbr.style.height) || 0;
  const percentage = currentHeight / 100;

  brilho.style.opacity = 1 - percentage; // Atualiza a opacidade do span de forma invertida
  document.getElementById("percentage").textContent = `${Math.round(
    currentHeight
  )}%`;
}

handle.addEventListener("mousedown", function (e) {
  isDraggingBrilho = true;
  e.preventDefault();
});

document.addEventListener("mouseup", function () {
  isDraggingBrilho = false;
});

brilhop.addEventListener("mousemove", function (e) {
  if (isDraggingBrilho) {
    const posY = e.clientY - brilhop.getBoundingClientRect().top;
    const brilhopHeight = brilhop.clientHeight;
    let percentage = ((brilhopHeight - posY) / brilhopHeight) * 100;

    percentage = Math.max(0, Math.min(100, percentage));

    barbr.style.height = `${percentage}%`;
    handle.style.bottom = `${percentage}%`;

    updateBrilho();
  }
});

// Controle de brilho com teclas 1 e 0
document.addEventListener("keydown", function (e) {
  if (isDraggingBrilho) return;

  let currentHeight = parseFloat(barbr.style.height) || 0;

  switch (e.key) {
    case "1": // Aumenta o brilho
      currentHeight = Math.min(100, currentHeight + 25);
      break;
    case "0": // Diminui o brilho
      currentHeight = Math.max(0, currentHeight - 25);
      break;
    default:
      return;
  }

  barbr.style.height = `${currentHeight}%`;
  handle.style.bottom = `${currentHeight}%`;

  updateBrilho();
});

handle.addEventListener("touchstart", function (e) {
  isDraggingBrilho = true;
  e.preventDefault();
});

document.addEventListener("touchend", function () {
  isDraggingBrilho = false;
});

brilhop.addEventListener("touchmove", function (e) {
  if (isDraggingBrilho) {
    const posY = e.touches[0].clientY - brilhop.getBoundingClientRect().top;
    const brilhopHeight = brilhop.clientHeight;
    let percentage = ((brilhopHeight - posY) / brilhopHeight) * 100;

    percentage = Math.max(0, Math.min(100, percentage));

    barbr.style.height = `${percentage}%`;
    handle.style.bottom = `${percentage}%`;

    updateBrilho();
  }
});

// Inicializa brilho na carga da página
document.addEventListener("DOMContentLoaded", function () {
  updateBrilho();
});

// timeline
const progressBar = document.getElementById("progress");
const handletimeline = document.getElementById("handletimeline");
const currentTimeElem = document.querySelector(".current-time");
const totalTimeElem = document.querySelector(".total-time");
let isDragging = false;

let initialWidth = 0;
document.getElementById("bar").style.width = `${initialWidth}%`;
handletimeline.style.left = `${initialWidth}%`;

handletimeline.addEventListener("mousedown", function (e) {
  isDragging = true;
  e.preventDefault();
});

handletimeline.addEventListener("touchstart", function (e) {
  isDragging = true;
  e.preventDefault();
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

document.addEventListener("touchend", function () {
  isDragging = false;
});

// Adiciona um evento de clique à barra de progresso
progressBar.addEventListener("click", function (e) {
  const posX = e.clientX - progressBar.getBoundingClientRect().left;
  let progressWidth = progressBar.clientWidth;
  let percentage = (posX / progressWidth) * 100;

  percentage = Math.max(0, Math.min(100, percentage));

  updateProgress(percentage);
});

progressBar.addEventListener("mousemove", function (e) {
  if (isDragging) {
    updateProgressFromMouse(e);
  }
});

progressBar.addEventListener("touchmove", function (e) {
  if (isDragging) {
    const touch = e.touches[0];
    const posX = touch.clientX - progressBar.getBoundingClientRect().left;
    let progressWidth = progressBar.clientWidth;
    let percentage = (posX / progressWidth) * 100;

    percentage = Math.max(0, Math.min(100, percentage));

    updateProgress(percentage);
  }
});

function updateProgressFromMouse(e) {
  const posX = e.clientX - progressBar.getBoundingClientRect().left;
  let progressWidth = progressBar.clientWidth;
  let percentage = (posX / progressWidth) * 100;

  percentage = Math.max(0, Math.min(100, percentage));

  updateProgress(percentage);
}

function updateProgress(percentage) {
  document.getElementById("bar").style.width = `${percentage}%`;
  handletimeline.style.left = `${percentage}%`;

  const newTime = (percentage / 100) * video.duration;
  video.currentTime = newTime;
}

video.addEventListener("timeupdate", function () {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const progressPercentage = (currentTime / duration) * 100;

  document.getElementById("bar").style.width = `${progressPercentage}%`;
  handletimeline.style.left = `${progressPercentage}%`;

  currentTimeElem.textContent = formatarTempo(currentTime);
  if (!isNaN(duration) && isFinite(duration) && duration > 0) {
    totalTimeElem.textContent = formatDuration(duration);
  }
});

video.addEventListener("loadedmetadata", function () {
  const duration = video.duration;
  const progressPercentage = (video.currentTime / duration) * 100;

  document.getElementById("bar").style.width = `${progressPercentage}%`;
  handletimeline.style.left = `${progressPercentage}%`;

  if (!isNaN(duration) && isFinite(duration) && duration > 0) {
    totalTimeElem.textContent = formatDuration(duration);
  }
});

function formatarTempo(tempo) {
  const minutos = Math.floor(tempo / 60);
  const segundos = Math.floor(tempo % 60);
  const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
  const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
  return `${minutosFormatados}:${segundosFormatados}`;
}

function formatDuration(time) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  } else {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }
}

// printar imagem
const captureButton = document.getElementById("captureButton");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

captureButton.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageDataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imageDataUrl;
  link.download = "captured-frame.png";

  link.click();

  canvas.classList.add("print");

  // Set a timeout to clear the canvas and remove the .print class after 2 seconds
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.classList.remove("print");
  }, 2000);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "x" || e.key === "X") {
    captureButton.click();
  }
});

// Qualidades
var moreButton = document.getElementById("more");
var viewModeElement = document.querySelector(".viewmode");

moreButton.addEventListener("click", function () {
  viewModeElement.classList.add("m");
});

viewModeElement.addEventListener("click", function (event) {
  if (event.target === viewModeElement) {
    viewModeElement.classList.remove("m");
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "o" || event.key === "O") {
    viewModeElement.classList.toggle("m");
  }
});

// volume
volumeButton.addEventListener("click", function () {
  if (video.muted) {
    video.muted = false;
    volumeButton.classList.remove("vol");
  } else {
    video.muted = true;
    volumeButton.classList.add("vol");
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "m" || event.key === "m") {
    volumeButton.classList.toggle("vol");
    volumeButton.click();
  }
});

// reiniciar video
reiniciarButton.addEventListener("click", function () {
  video.currentTime = 0;
  video.pause();
  video.play();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "r") {
    reiniciarButton.click();
  }
});

// velocidade do video
const speedBtn = document.querySelector(".speed-btn");
speedBtn.addEventListener("click", changePlaybackSpeed);
function changePlaybackSpeed() {
  let newPlaybackRate = video.playbackRate + 0.25;
  if (newPlaybackRate > 2) newPlaybackRate = 0.25;
  video.playbackRate = newPlaybackRate;
  speedBtn.textContent = `${newPlaybackRate}x`;
}
document.addEventListener("keydown", (e) => {
  if (e.key === "v" || e.key === "v") {
    speedBtn.click();
  }
});

// Controle de tela cheia via botão
fullScreenBtn.addEventListener("click", toggleFullScreenMode);

document.addEventListener("keydown", function (event) {
  if (event.key === "f" || event.key === "F") {
    toggleFullScreenMode();
  }
});

function toggleFullScreenMode() {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    videoContainer.classList.add("full-screen");
    videoContainer.style.width = "100vw";
    videoContainer.style.height = "100vh";
  } else {
    videoContainer.classList.remove("full-screen");
    videoContainer.style.width = null;
    videoContainer.style.height = null;
  }
});

// Pular tempo button superior
pularButton.addEventListener("click", function () {
  pularButton.classList.add("p");
  setTimeout(function () {
    pularButton.classList.remove("p");
  }, 300);
  pular();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "p" || event.key === "P") {
    pularButton.classList.add("p");
    setTimeout(function () {
      pularButton.classList.remove("p");
    }, 300);
    pular();
  }
});

function pular() {
  var currentTime = video.currentTime;
  var novoTempo = currentTime + 85;

  if (novoTempo <= video.duration) {
    video.currentTime = novoTempo;
  } else {
    video.currentTime = video.duration;
  }

  seconds = Math.max(0, seconds - 85);
}

// Button "Pular OP"
const button = document.getElementById("pOP");
function convertTimeToSeconds(time) {
  const parts = time.split(/m|s/);
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

// Show button at the specified time
function checkVideoTime() {
  const dataIn = button.getAttribute("data-in");
  const secondsIn = convertTimeToSeconds(dataIn);
  const dataOn = button.getAttribute("data-on");
  const secondsOn = convertTimeToSeconds(dataOn);

  // Show button
  if (video.currentTime >= secondsIn && !button.classList.contains("show")) {
    button.classList.add("show");
  }

  // Remove button when reaching data-on time
  if (video.currentTime >= secondsOn && button.classList.contains("show")) {
    button.classList.remove("show");
  }
}

// Jump to the specified time when the button is clicked
button.addEventListener("click", () => {
  const dataOn = button.getAttribute("data-on");
  const jumpTo = convertTimeToSeconds(dataOn);
  video.currentTime = jumpTo;
  button.classList.remove("show"); // Hide button after click
});
document.addEventListener("keydown", (event) => {
  if (event.key === "d" || event.key === "d") {
    button.click();
  }
});
// Check the video time every second
video.addEventListener("timeupdate", checkVideoTime);

// Buttons para avançar/retornar tempo
var leftdd = document.getElementById("leftdd");
var rightdd = document.getElementById("rightdd");

righttimeButton.addEventListener("click", function () {
  video.currentTime += 10;
  rightdd.classList.add("dd");
  setTimeout(function () {
    rightdd.classList.remove("dd");
  }, 300);
});

lefttimeButton.addEventListener("click", function () {
  video.currentTime -= 10;
  leftdd.classList.add("dd");
  setTimeout(function () {
    leftdd.classList.remove("dd");
  }, 300);
});

leftdd.addEventListener("dblclick", function () {
  lefttimeButton.click();
  leftdd.classList.add("dd");
  rightdd.classList.remove("dd");
  setTimeout(() => {
    leftdd.classList.remove("dd");
  }, 300);
});

rightdd.addEventListener("dblclick", function () {
  righttimeButton.click();
  rightdd.classList.add("dd");
  leftdd.classList.remove("dd");
  setTimeout(() => {
    rightdd.classList.remove("dd");
  }, 300);
});

document.addEventListener("keydown", function (event) {
  if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
    if (event.keyCode === 37) {
      video.currentTime -= 10;
      leftdd.classList.add("dd");
      setTimeout(function () {
        leftdd.classList.remove("dd");
      }, 300);
    } else if (event.keyCode === 39) {
      video.currentTime += 10;
      rightdd.classList.add("dd");
      setTimeout(function () {
        rightdd.classList.remove("dd");
      }, 300);
    }
  }
});

// travar tela
var blockElement = document.getElementById("block");

blockElement.addEventListener("click", function () {
  if (!blockElement.classList.contains("unlock")) {
    blockElement.classList.add("unlock");
    document
      .querySelectorAll(
        ".titleepplayer, .logotl, #pular, #leftdd, #rightdd, .medp, .endp, .volubar, .container, .more, #block, .block, .progressline"
      )
      .forEach(function (element) {
        element.classList.add("unlock");
      });
  } else {
    blockElement.classList.remove("unlock");
    document
      .querySelectorAll(
        ".titleepplayer, .logotl, #pular, #leftdd, #rightdd, .medp, .endp, .volubar, .container, .more, #block, .block, .progressline"
      )
      .forEach(function (element) {
        element.classList.remove("unlock");
      });
  }
});

document.querySelectorAll(".block").forEach(function (element) {
  element.addEventListener("click", function () {
    blockElement.click();
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "b" || e.key === "B") {
    var blockElement = document.getElementById("block");
    blockElement.click();
  }
});

// postyer
var video = document.querySelector("video");
var capaposter = document.querySelector(".capaposter");
var poster = document.querySelector(".poster");

// Seleciona os elementos a serem revelados
var elementsToReveal = document.querySelectorAll(
  ".container, .volubar, .topp, .lefttime, .righttime, .endp, .progressline"
);

// Função para remover os estilos de opacity e pointer-events
function revealElements() {
  elementsToReveal.forEach(function (element) {
    element.style.opacity = "1";
    element.style.pointerEvents = "auto";
  });
}

// Função para esconder o capaposter
function hideCapaposter() {
  capaposter.style.display = "none";
}

// Função para exibir o capaposter
function showCapaposter() {
  capaposter.style.display = "block";
}

// Evento de reprodução do vídeo
video.addEventListener("play", function () {
  playpauseButton.classList.add("pause");
  poster.classList.remove("pause");
  hideCapaposter(); // Esconde a capaposter ao iniciar o vídeo

  if (!video.hasPlayed) {
    revealElements();
    video.hasPlayed = true; // Marca que o vídeo já foi reproduzido
  }
});
// Evento de pausa do vídeo
video.addEventListener("pause", function () {
  playpauseButton.classList.remove("pause");
  poster.classList.add("pause");
});

// Evento de finalização do vídeo
video.addEventListener("ended", function () {
  showCapaposter(); // Exibe a capaposter quando o vídeo termina
  poster.classList.remove("pause");
});

// Adiciona a funcionalidade de play/pause usando a tecla Space
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 32) {
    // Tecla Space
    event.preventDefault(); // Previne a ação padrão da tecla (ex: scroll down)
    togglePlayPause();
  }
});

// Função para alternar entre play e pause
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playpauseButton.classList.add("pause");
    poster.classList.remove("pause");
    hideCapaposter(); // Esconde a capaposter ao iniciar o vídeo
  } else {
    video.pause();
    playpauseButton.classList.remove("pause");
    poster.classList.add("pause");
  }
}

playpauseButton.addEventListener("click", togglePlayPause);

// Seleciona elementos relevantes
var video = document.getElementById("video");
var buttons = document.querySelectorAll(".quality");
var downloadLink = document.querySelector(".download");
var currentSource = null;
var currentTimeBackup = 0;

// Função para carregar o vídeo com o data-source especificado
function loadVideo(sourceUrl) {
  if (!sourceUrl) {
    // Se o data-source estiver vazio, tenta encontrar o próximo botão com data-source
    var nextButton = findNextButtonWithSource();
    if (nextButton) {
      sourceUrl = nextButton.getAttribute("data-source");
    }
  }

  if (currentSource && currentSource !== sourceUrl) {
    currentTimeBackup = video.currentTime;
  }

  video.src = sourceUrl;
  currentSource = sourceUrl;

  buttons.forEach((button) => {
    if (button.getAttribute("data-source") === sourceUrl) {
      button.classList.add("p");
      // Remove classes p1, p2, p3 da .download antes de adicionar a nova classe
      downloadLink.classList.remove("p1", "p2", "p3");

      // Adiciona a classe específica de qualidade ao link de download
      var qualityClass = button.classList[1]; // Assume que a segunda classe é a classe de qualidade (1080p, 720p, 480p)
    } else {
      button.classList.remove("p");
    }

    // Oculta o botão se não tiver data-source
    if (button.getAttribute("data-source") === "") {
      button.style.display = "none";
    } else {
      button.style.display = "inline-block"; // Garante que os botões visíveis tenham display correto
    }
  });

  if (Hls.isSupported() && sourceUrl.endsWith(".m3u8")) {
    var hls = new Hls();
    hls.loadSource(sourceUrl);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      if (currentTimeBackup > 0) {
        video.currentTime = currentTimeBackup;
        currentTimeBackup = 0;
        video.play();
      }
    });
  } else {
    video.addEventListener("loadedmetadata", function () {
      if (currentTimeBackup > 0) {
        video.currentTime = currentTimeBackup;
        currentTimeBackup = 0;
      }
      video.play();
    });
  }
}

// Função para encontrar o próximo botão com data-source
function findNextButtonWithSource() {
  var foundNext = false;
  for (var i = 0; i < buttons.length - 1; i++) {
    if (
      buttons[i].getAttribute("data-source") === "" &&
      buttons[i + 1].getAttribute("data-source") !== ""
    ) {
      foundNext = true;
      return buttons[i + 1];
    }
  }
  return null;
}

// Verifica se há botões para inicializar o vídeo
if (buttons.length > 0) {
  var firstButton = buttons[0];
  var sourceUrl = firstButton.getAttribute("data-source");
  loadVideo(sourceUrl);
}

// Adiciona eventos de clique aos botões
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    var sourceUrl = this.getAttribute("data-source");
    loadVideo(sourceUrl);
  });
});
