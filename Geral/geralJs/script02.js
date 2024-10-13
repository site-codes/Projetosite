// BANNER ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let currentIndex = 0;
let currentVideoButton = null;
let videoOp = document.getElementById("videoOp");

function stopVideo() {
videoOp.pause();
videoOp.currentTime = 0;
document
.querySelectorAll(".imgdu")
.forEach((img) => img.classList.remove("playing"));
}

function updateDisplay() {
const entries = document.querySelectorAll("#HTML2 .ntry");
const buttons = document.querySelectorAll(".opEning");
const dots = document.querySelectorAll(".dot");

entries.forEach((entry, index) => {
entry.classList.toggle("on", index === currentIndex);
if (index === currentIndex) {
 buttons[index].classList.add("on");
 if (videoOp.classList.contains("playing")) {
   buttons[index].classList.add("playing");
 } else {
   buttons[index].classList.remove("playing");
 }
} else {
 buttons[index].classList.remove("on");
 buttons[index].classList.remove("playing");
}
});

dots.forEach((dot, index) => {
dot.classList.toggle("on", index === currentIndex);
if (index === currentIndex && videoOp.classList.contains("playing")) {
 dot.classList.add("playing");
} else {
 dot.classList.remove("playing");
}
});

const isAnyElementActive = Array.from(entries)
.slice(1)
.some((entry) => entry.classList.contains("on"));

if (entries.length > 0) {
if (isAnyElementActive) {
 entries[0].classList.add("hidden");
} else {
 entries[0].classList.remove("hidden");
}
}
}

const animationDuration = 10000;

function updateAnimationDuration(duration) {
document.documentElement.style.setProperty(
"--animation-duration",
`${duration}ms`
);
}

function startAutoChange() {
updateAnimationDuration(animationDuration);

intervalId = setInterval(() => {
const entries = document.querySelectorAll("#HTML2 .ntry");
const isAnyEntryHovered = Array.from(entries).some((entry) =>
 entry.matches(":hover")
);

const isVideoPlaying = videoOp.classList.contains("playing");

if (!isAnyEntryHovered && !isVideoPlaying) {
 currentIndex = (currentIndex + 1) % entries.length;
 updateDisplay();
}
}, animationDuration);
}

function restartAutoChange() {
clearInterval(intervalId);
startAutoChange();
}

function stopAutoChange() {
if (intervalId) {
clearInterval(intervalId);
}
}

function initialize() {
const entries = document.querySelectorAll("#HTML2 .ntry");
const dots = document.querySelectorAll(".dot");

if (entries.length > 0) {
currentIndex = 0;
} else {
const activeDot = document.querySelector(".dot.active");
if (activeDot) {
 currentIndex = Array.from(dots).indexOf(activeDot);
}
}

dots.forEach((dot, index) => {
dot.classList.toggle("on", index === currentIndex);
});

updateDisplay();

startAutoChange();
}

document.querySelectorAll("#HTML2 .ntry").forEach((entry) => {
entry.addEventListener("mouseover", () => {
stopAutoChange();
});
entry.addEventListener("mouseout", () => {
if (!videoOp.classList.contains("playing")) {
 restartAutoChange();
}
});
});

function moveToDot(index) {
if (index >= 0 && index < document.querySelectorAll(".dot").length) {
currentIndex = index;
updateDisplay();
handleVideoPlayback();
restartAutoChange();
}
}

function previousEntry() {
currentIndex =
(currentIndex - 1 + document.querySelectorAll(".dot").length) %
document.querySelectorAll(".dot").length;
updateDisplay();
handleVideoPlayback();
restartAutoChange();
}

function nextEntry() {
currentIndex = (currentIndex + 1) % document.querySelectorAll(".dot").length;
updateDisplay();
handleVideoPlayback();
restartAutoChange();
}

function handleVideoPlayback() {
const entries = document.querySelectorAll("#HTML2 .ntry");
const buttons = document.querySelectorAll(".opEning");
const dots = document.querySelectorAll(".dot");

if (entries[currentIndex].classList.contains("on")) {
const button = buttons[currentIndex];
const src = button.getAttribute("data-src");

if (currentVideoButton && currentVideoButton !== button) {
 stopVideo();
}

if (button !== currentVideoButton) {
 currentVideoButton = button;
}

if (videoOp.classList.contains("playing")) {
 button.classList.add("playing");
} else {
 button.classList.remove("playing");
}

if (videoOp.classList.contains("playing")) {
 dots[currentIndex].classList.add("playing");
}
} else {
stopVideo();
currentVideoButton = null;

dots.forEach((dot) => dot.classList.remove("playing"));
buttons.forEach((button) => button.classList.remove("playing"));
}
}

function playVideo(url) {
if (Hls.isSupported() && url.endsWith(".m3u8")) {
const hls = new Hls();
hls.loadSource(url);
hls.attachMedia(videoOp);
hls.on(Hls.Events.MANIFEST_PARSED, function () {
 videoOp.play();
 document
   .querySelectorAll(".imgdu")
   .forEach((img) => img.classList.add("playing"));
});
} else {
videoOp.src = url;
videoOp.addEventListener("loadedmetadata", function () {
 videoOp.play();
 document
   .querySelectorAll(".imgdu")
   .forEach((img) => img.classList.add("playing"));
});
}
}

videoOp.addEventListener("play", function () {
videoOp.classList.add("playing");
document
.querySelectorAll(".imgdu")
.forEach((img) => img.classList.add("playing"));
updateDisplay();
});

videoOp.addEventListener("pause", function () {
videoOp.classList.remove("playing");
document
.querySelectorAll(".imgdu")
.forEach((img) => img.classList.remove("playing"));
updateDisplay();
});

function playCurrentButtonVideo() {
const buttons = document.querySelectorAll(".opEning");
const button = buttons[currentIndex];
const src = button.getAttribute("data-src");
if (src) {
playVideo(src);
}
}

document.addEventListener("keydown", function (event) {
if (event.key === "ArrowRight") {
nextEntry();
if (exibirVideos) {
 playCurrentButtonVideo();
 restartAutoChange();
}
} else if (event.key === "ArrowLeft") {
previousEntry();
if (exibirVideos) {
 playCurrentButtonVideo();
 restartAutoChange();
}
}
});;

window.addEventListener("DOMContentLoaded", initialize);

document.querySelectorAll("button.opEning").forEach((button) => {
button.addEventListener("click", function () {
const src = this.getAttribute("data-src");
playVideo(src);
handleVideoPlayback();
restartAutoChange();
});
});


// EXIBIR VIDEO NO BANNER SIM OU NAO
function toggleVideoDisplay() {
const videoElement = document.getElementById("videoOp");
const btnBannerElement = document.querySelector(".btnbanner"); // Seleciona o botão .btnbanner

if (!exibirVideos) {
videoElement.style.display = "none"; // Oculta o vídeo se exibirVideos for false
btnBannerElement.style.display = "none"; // Oculta o botão se exibirVideos for false
} else {
videoElement.style.display = ""; // Exibe o vídeo se exibirVideos for true
btnBannerElement.style.display = ""; // Exibe o botão se exibirVideos for true
}
}
toggleVideoDisplay();



 // ADD HOVER AO DOTTS - BANNER
 document.addEventListener('DOMContentLoaded', () => {
   const ctgry = document.querySelector('#HTML2 .ctgry');
   const dots = document.querySelector('#HTML2 .dots');

   if (ctgry && dots) {
       ctgry.addEventListener('mouseenter', () => {
           dots.classList.add('hover');
       });

       ctgry.addEventListener('mouseleave', () => {
           dots.classList.remove('hover');
       });
   }
});

// CONST DAS IMAGENS E VIDEOS BANNER
const buttons = document.querySelectorAll('.opEning');

// Itera sobre os botões e preenche os atributos data-src e estilo do banner
buttons.forEach((button, index) => {
const videoKey = `banner0${index + 1}`; // Cria a chave do objeto
if (videosBanners[videoKey]) { // Verifica se a chave existe no objeto
button.setAttribute('data-src', videosBanners[videoKey].link); // Define o atributo data-src
document.documentElement.style.setProperty(`--${videoKey}`, `url('${videosBanners[videoKey].gif}')`); // Define o estilo do banner
}
});
