// Buttons rolagem ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var scrollButtons = document.querySelectorAll(".scrollButtons");

scrollButtons.forEach(function (button) {
var doubleClickTimestamp = 0;

button.addEventListener("click", function (event) {
 var currentTime = new Date().getTime();
 var direction = button.getAttribute("data-direction");
 var currentSection = button.closest("[id^='HTML']");
 var blogPtsElement = currentSection.querySelector(".blogPts");

 if (currentTime - doubleClickTimestamp < 500) {
   if (direction === "left") {
     blogPtsElement.scrollLeft = 0;
   } else if (direction === "right") {
     blogPtsElement.scrollLeft = blogPtsElement.scrollWidth;
   }
   doubleClickTimestamp = 0;
 } else {
   doubleClickTimestamp = currentTime;
   if (direction === "left") {
     blogPtsElement.scrollLeft -= 1000;
   } else if (direction === "right") {
     blogPtsElement.scrollLeft += 1000;
   }
 }
});
});




// Title Pagina anime ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
const titleAnimeElement = document.querySelector(".titleanime");
const titleAnimeSpan = document.getElementById("titleanime");

if (titleAnimeElement && titleAnimeSpan) {
 titleAnimeSpan.textContent = titleAnimeElement.textContent;
}
});



// MENU MOBILE BUTTONS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const scriptString = `
 const mM = document.getElementById('mM');
 const menuMobile = document.querySelector('#MenuMobile');
 const htmlS = document.querySelector('.htmlS');

 mM.onclick = function() {
     // Alterna a classe 'mM' em #MenuMobile, #mM e .htmlS
     menuMobile.classList.toggle('mM');
     mM.classList.toggle('mM');
     htmlS.classList.toggle('mM');
 };

 function toggleOpenClass(element) {
     // Remove a classe .open de todos os divs dentro de #MenuMobile
     const allDivs = menuMobile.querySelectorAll('div');
     allDivs.forEach(div => {
         div.classList.remove('open');
     });

     // Adiciona a classe .open ao div clicado
     element.classList.add('open');

     // Remove todas as classes m01, m02, m03, m04, m05 de .htmlS
     htmlS.classList.remove('m01', 'm02', 'm03', 'm04', 'm05');
     
     // Adiciona a classe correspondente com base no ID do elemento clicado
     if (element.id === 'm01') {
         htmlS.classList.add('m01');
     } else if (element.id === 'm02') {
         htmlS.classList.add('m02');
     } else if (element.id === 'm03') {
         htmlS.classList.add('m03');
     } else if (element.id === 'm04') {
         htmlS.classList.add('m04');
     } else if (element.id === 'm05') {
         htmlS.classList.add('m05');
     }
 }
`;

eval(scriptString);


// THEME MODELO ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 function applyTheme(theme) {
     const root = document.documentElement;
     const themeOptions = document.querySelectorAll('.theme-option');
     const htmlS = document.querySelector('.htmlS'); // Seleciona o elemento .htmlS

     // Remove a classe .selected de todos os temas
     themeOptions.forEach(option => option.classList.remove('selected'));

     // Adiciona a classe .selected ao tema selecionado
     document.getElementById(theme).classList.add('selected');
     
     // Remove classes de tema anteriores do elemento .htmlS
     htmlS.classList.remove('tema1', 'tema2', 'tema3');

     // Adiciona a classe correspondente ao tema selecionado
     if (theme === "tema1") {
         root.style.removeProperty("--headC");
         root.style.removeProperty("--bodyD");
         root.style.removeProperty("--bodyB");
         root.style.removeProperty("--linkC");
         root.style.removeProperty("--linkB");
         root.style.removeProperty("--linkA");
         root.style.removeProperty("--linkD");
         root.style.removeProperty("--cor1");
         root.style.removeProperty("--cor2");
         root.style.removeProperty("--corB1");
         root.style.removeProperty("--corB2");
         root.style.removeProperty("--corB3");
         root.style.removeProperty("--mobileM");
         root.style.removeProperty("--mobileC");
         root.style.removeProperty("--mobileD");
         root.style.removeProperty("--contentB");
     } else if (theme === "tema2") {
         root.style.setProperty("--headC", "var(--headCTema2)");
         root.style.setProperty("--bodyD", "var(--bodyDTema2)");
         root.style.setProperty("--bodyB", "var(--bodyBTema2)");
         root.style.setProperty("--linkC", "var(--linkCTema2)");
         root.style.setProperty("--linkB", "var(--linkBTema2)");
         root.style.setProperty("--linkA", "var(--linkATema2)");
         root.style.setProperty("--linkD", "var(--linkDTema2)");
         root.style.setProperty("--cor1", "var(--cor1Tema2)");
         root.style.setProperty("--cor2", "var(--cor2Tema2)");
         root.style.setProperty("--corB1", "var(--corB1Tema2)");
         root.style.setProperty("--corB2", "var(--corB2Tema2)");
         root.style.setProperty("--corB3", "var(--corB3Tema2)");
         root.style.setProperty("--mobileM", "var(--mobileMTema2)");
         root.style.setProperty("--mobileC", "var(--mobileCTema2)");
         root.style.setProperty("--mobileD", "var(--mobileDTema2)");
         root.style.setProperty("--contentB", "var(--contentBTema2)");
         htmlS.classList.add('tema2');
     } else if (theme === "tema3") {
         root.style.setProperty("--headC", "var(--headCTema3)");
         root.style.setProperty("--bodyD", "var(--bodyDTema3)");
         root.style.setProperty("--bodyB", "var(--bodyBTema3)");
         root.style.setProperty("--linkC", "var(--linkCTema3)");
         root.style.setProperty("--linkB", "var(--linkBTema3)");
         root.style.setProperty("--linkA", "var(--linkATema3)");
         root.style.setProperty("--linkD", "var(--linkDTema3)");
         root.style.setProperty("--cor1", "var(--cor1Tema3)");
         root.style.setProperty("--cor2", "var(--cor2Tema3)");
         root.style.setProperty("--corB1", "var(--corB1Tema3)");
         root.style.setProperty("--corB2", "var(--corB2Tema3)");
         root.style.setProperty("--corB3", "var(--corB3Tema3)");
         root.style.setProperty("--mobileM", "var(--mobileMTema3)");
         root.style.setProperty("--mobileC", "var(--mobileCTema3)");
         root.style.setProperty("--mobileD", "var(--mobileDTema3)");
         root.style.setProperty("--contentB", "var(--contentBTema3)");
         htmlS.classList.add('tema3');
     }
     
     // Salva a escolha do tema no localStorage
     localStorage.setItem('selectedTheme', theme);
 }

 // Aplica o tema salvo ao carregar a página
 document.addEventListener("DOMContentLoaded", () => {
     const savedTheme = localStorage.getItem('selectedTheme');
     if (savedTheme) {
         applyTheme(savedTheme);
     } else {
         applyTheme('tema1'); // Aplica o tema padrão se nenhum tema estiver salvo
     }
 });

// TIPOS DE PAGE ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
var body = document.body;
var path = window.location.pathname;

if (path.includes('/search')) {
 body.classList.add('search-page');
} else if (path.includes('/label')) {
 body.classList.add('label-page');
} else if (path.includes('/p/')) {
 body.classList.add('static-page');
}
});


// ANIMES QUANTIDADE ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
var blogPts = document.querySelector('#Blog1 .blogPts');
var totalaNime = document.getElementById('totalaNime');

function atualizarContagemNtry() {
 // Seleciona todos os elementos .ntry
 var ntryItems = blogPts.querySelectorAll('.ntry');
 // Calcula a quantidade total de .ntry
 var quantidadeTotal = ntryItems.length;

 // Conta quantos desses elementos têm a classe .noList
 var ntryComNoList = blogPts.querySelectorAll('.ntry.noList').length;

 // Calcula o valor final
 var quantidadeFinal = quantidadeTotal - ntryComNoList;

 // Atualiza o texto com o valor final
 totalaNime.textContent = '(' + quantidadeFinal + ')';
}

atualizarContagemNtry();
});


// ORDEM DECRESCENTE E CRESCENTE ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
var botoes = document.querySelectorAll('.alfA span');

botoes.forEach(function (botao) {
 botao.addEventListener('click', function () {
   botoes.forEach(function (b) {
     b.classList.remove('ativoB');
   });

   this.classList.add('ativoB');

   if (this.id === 'ordenarAlfabeticamente') {
     ordenarAlfabeticamente();
   } else if (this.id === 'ordenarDecrescentemente') {
     ordenarDecrescentemente();
   } else if (this.id === 'restaurarOrdemPadrao') {
     restaurarOrdemPadrao();
   }
 });
});
});

function ordenarAlfabeticamente() {
var blogPts = document.querySelector('.blogPts');
var ntryItems = Array.from(blogPts.querySelectorAll('.ntry'));

ntryItems.sort(function (a, b) {
 var titleA = a.querySelector('.titlePos').textContent.trim().toLowerCase();
 var titleB = b.querySelector('.titlePos').textContent.trim().toLowerCase();
 if (titleA < titleB) {
   return -1;
 }
 if (titleA > titleB) {
   return 1;
 }
 return 0;
});

ntryItems.forEach(function (item) {
 blogPts.appendChild(item);
});
}

function ordenarDecrescentemente() {
var blogPts = document.querySelector('.blogPts');
var ntryItems = Array.from(blogPts.querySelectorAll('.ntry'));

ntryItems.sort(function (a, b) {
 var titleA = a.querySelector('.titlePos').textContent.trim().toLowerCase();
 var titleB = b.querySelector('.titlePos').textContent.trim().toLowerCase();
 if (titleA > titleB) {
   return -1;
 }
 if (titleA < titleB) {
   return 1;
 }
 return 0;
});

ntryItems.forEach(function (item) {
 blogPts.appendChild(item);
});
}

var ordemOriginal = [];

document.addEventListener('DOMContentLoaded', function () {
var blogPts = document.querySelector('.blogPts');
ordemOriginal = Array.from(blogPts.querySelectorAll('.ntry'));
});

function restaurarOrdemPadrao() {
var blogPts = document.querySelector('.blogPts');
blogPts.innerHTML = '';

ordemOriginal.forEach(function (item) {
 blogPts.appendChild(item);
});
}




// cronograma ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
 const days = document.querySelectorAll('.g-sem span');
 const today = new Date();

 const monthNames = [
     'Janeiro',
     'Fevereiro',
     'Março',
     'Abril',
     'Maio',
     'Junho',
     'Julho',
     'Agosto',
     'Setembro',
     'Outubro',
     'Novembro',
     'Dezembro',
 ];

 function getDateStr(date) {
     return `${date.getDate()} de ${monthNames[date.getMonth()]}`;
 }

 function showContent(dayIndex) {
     document.querySelectorAll('div[id^="HTML"]').forEach((content) => {
         content.classList.remove('active');
     });

     const targetContent = document.getElementById(`HTML${dayIndex + 7}`);
     if (targetContent) {
         targetContent.classList.add('active');
     }
     days.forEach((day) => {
         day.classList.remove('active');
     });
     days[dayIndex].classList.add('active');

     reorderDays(dayIndex);
 }

 function reorderDays(activeIndex) {
     if (window.innerWidth < 800) {
         const activeDay = days[activeIndex];
         const remainingDays = Array.from(days).filter((_, index) => index !== activeIndex);

         // Constrói a nova ordem começando pelo dia ativo
         const newOrder = [activeDay];

         // Adiciona os dias que vêm após o dia ativo
         for (let i = activeIndex + 1; i < days.length; i++) {
             newOrder.push(days[i]);
         }
         // Adiciona os dias que vêm antes do dia ativo
         for (let i = 0; i < activeIndex; i++) {
             newOrder.push(days[i]);
         }

         const container = document.querySelector('.g-sem');

         // Limpa os elementos existentes e os adiciona na nova ordem
         container.innerHTML = '';
         newOrder.forEach((day) => {
             container.appendChild(day);
         });
     }
 }

 days.forEach((day, index) => {
     const currentDay = new Date(today);
     currentDay.setDate(today.getDate() - today.getDay() + index);
     day.setAttribute('data-date', getDateStr(currentDay));
 });

 const todayIndex = today.getDay();
 showContent(todayIndex);

 days.forEach((day, index) => {
     day.addEventListener('click', function () {
         showContent(index);
     });
 });

 function updateDateTime() {
     const now = new Date();
     const day = String(now.getDate()).padStart(2, '0');
     const month = String(now.getMonth() + 1).padStart(2, '0');
     const year = now.getFullYear();

     const hours = String(now.getHours()).padStart(2, '0');
     const minutes = String(now.getMinutes()).padStart(2, '0');
     const seconds = String(now.getSeconds()).padStart(2, '0');

     const formattedTime = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;

     document.getElementById('current-date-time').textContent = formattedTime;
 }

 updateDateTime();
 setInterval(updateDateTime, 1000);
});


// Simulcast ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
const stations = document.querySelectorAll('.simulcastdiv span');

function getSeason(date) {
 const month = date.getMonth();
 const day = date.getDate();

 if (month === 0 || month === 1 || month === 2) {
   return 'inverno';
 }
 if (month === 3 || month === 4 || month === 5) {
   return 'primavera';
 }
 if (month === 6 || month === 7 || month === 8) {
   return 'verao';
 }
 if (month === 9 || month === 10 || month === 11) {
   return 'outono';
 }
}

function showLabel(station) {
 document.querySelectorAll('div[id^="Label"]').forEach((label) => {
   label.classList.remove('active');
 });

 const targetLabel = document.getElementById(station.getAttribute('data-target'));
 if (targetLabel) {
   targetLabel.classList.add('active');
 }

 stations.forEach((station) => {
   station.classList.remove('active');
 });
 station.classList.add('active');
}

stations.forEach((station) => {
 station.addEventListener('click', function () {
   showLabel(station);
 });
});
const currentDate = new Date();
const currentSeason = getSeason(currentDate);
const currentStation = document.getElementById(currentSeason);
if (currentStation) {
 showLabel(currentStation);
}
});

// Ranking ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
const periods = document.querySelectorAll('.days span');

function showLabel(period) {
 document.querySelectorAll('div[id^="PopularPosts"]').forEach((label) => {
   label.classList.remove('active');
 });

 const targetLabel = document.getElementById(period.getAttribute('data-target'));
 if (targetLabel) {
   targetLabel.classList.add('active');
 }

 periods.forEach((period) => {
   period.classList.remove('active');
 });
 period.classList.add('active');
}

periods.forEach((period) => {
 period.addEventListener('click', function () {
   showLabel(period);
 });
});

const defaultPeriod = document.getElementById('semana');
if (defaultPeriod) {
 showLabel(defaultPeriod);
}
});


// Header durante rolagem ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('scroll', function () {
var bodyScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
var headerElement = document.getElementById('header');

if (headerElement) {
 if (bodyScrollTop >= 100) {
   headerElement.classList.add('fundo');
 } else {
   headerElement.classList.remove('fundo');
 }
}
});

// Abrir link header ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
var dropdownLinks = document.querySelectorAll('.dropdown-content a');

dropdownLinks.forEach(function (link) {
 var originalHref = link.getAttribute('href');
 var href = '/search/label' + originalHref;
 link.setAttribute('href', href);
});
});

// Foto de perfil ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const fotos = document.querySelectorAll('.fotos img');
const perfilImgs = document.querySelectorAll('.perfilimg img');

function updateProfileImages(src) {
perfilImgs.forEach((img) => {
 img.src = src;
});
localStorage.setItem('perfilImgSrc', src);
}

document.addEventListener('DOMContentLoaded', () => {
const savedSrc = localStorage.getItem('perfilImgSrc');
if (savedSrc) {
 perfilImgs.forEach((img) => {
   img.src = savedSrc;
 });
}
});

fotos.forEach((img) => {
img.addEventListener('click', () => {
 updateProfileImages(img.src);
});
});


// Name usuario ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const usernameInput = document.getElementById('username');
const usernameDisplay = document.querySelector('.username');

document.addEventListener('DOMContentLoaded', () => {
const savedUsername = localStorage.getItem('username');
if (savedUsername) {
 usernameInput.value = savedUsername;
 usernameDisplay.textContent = savedUsername;
}
});

usernameInput.addEventListener('input', () => {
const username = usernameInput.value;
usernameDisplay.textContent = username;
localStorage.setItem('username', username); // Salva o valor no localStorage
});


// Dados perfil ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let clickedEntriesBlog1 = new Set(JSON.parse(localStorage.getItem('clickedEntriesBlog1')) || []);
const clickCountElementBlog1 = document.getElementById('clickCountBlog1');
const entriesBlog1 = document.querySelectorAll('#Blog1 .ntry');

function updateClickCountBlog1() {
clickCountElementBlog1.textContent = clickedEntriesBlog1.size;
}

entriesBlog1.forEach((entry, index) => {
entry.addEventListener('click', () => {
 clickedEntriesBlog1.add(index);
 localStorage.setItem('clickedEntriesBlog1', JSON.stringify(Array.from(clickedEntriesBlog1)));
 updateClickCountBlog1();
});
});

updateClickCountBlog1();

document.querySelectorAll('.navbar-item').forEach((item) => {
item.addEventListener('click', function (e) {
 e.preventDefault();

 let dropdownContent = this.nextElementSibling;
 let allDropdownContents = document.querySelectorAll('.dropdown-content');
 let allNavbarItems = document.querySelectorAll('.navbar-item');

 allDropdownContents.forEach((navbar) => {
   if (navbar !== dropdownContent) {
     navbar.style.display = 'none';
   }
 });

 allNavbarItems.forEach((navItem) => {
   navItem.classList.remove('active');
 });
 dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';

 this.classList.toggle('active', dropdownContent.style.display === 'block');
});
});
document.addEventListener('click', function (e) {
let isClickInside = e.target.closest('.navbar');
if (!isClickInside) {
 document.querySelectorAll('.dropdown-content').forEach((dropdownContent) => {
   dropdownContent.style.display = 'none';
 });

 document.querySelectorAll('.navbar-item').forEach((navItem) => {
   navItem.classList.remove('active');
 });
}
});

document.querySelector('.navbar-calendar').addEventListener('click', function (e) {
document.querySelectorAll('.dropdown-content').forEach((dropdownContent) => {
 dropdownContent.style.display = 'none';
});

document.querySelectorAll('.navbar-item').forEach((navItem) => {
 navItem.classList.remove('active');
});
});

document.addEventListener('DOMContentLoaded', () => {
const container = document.querySelector('.cmHl');
const items = Array.from(container.querySelectorAll('li'));

items.reverse().forEach((item) => container.appendChild(item));

items.forEach((item, index) => {
 item.setAttribute('data-counter', items.length - index);
});
});

 
// abrir perfil e minilista ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function togglePerfilAndItemsE() {
const itemsE = document.getElementById('itemsE');
const htmlS = document.querySelector('.htmlS');

itemsE.classList.toggle('at');
htmlS.classList.toggle('at');
}

function toggleSearchAndHTML14() {
const HTML14 = document.getElementById('HTML14');
const htmlS = document.querySelector('.htmlS');

HTML14.classList.toggle('atS');
htmlS.classList.toggle('atS');
}


// Pesquisar na minilista ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const searchInput = document.getElementById('search-input');

function verificarResultados(numResultadosVisiveis, noResultsMessages, contexto) {
const hasResults = numResultadosVisiveis > 0;

noResultsMessages.forEach(function (message) {
 if (message.closest(contexto)) {
   message.style.display = hasResults ? 'none' : 'flex';
 }
});
}

searchInput.addEventListener('input', function () {
const searchTerm = this.value.trim().toLowerCase();
const ntryItems = document.querySelectorAll('#HTML14 .blogPts .ntry');
const noResultsMessages = document.querySelectorAll('#HTML14 .noResultsMessage');
const scrollButtons = document.querySelectorAll('#HTML14 .scrollButtons');

const visibleNtryItems = Array.from(ntryItems).filter(function (item) {
 const titlePos = item.querySelector('.titlePos').textContent.trim().toLowerCase();
 return titlePos.includes(searchTerm);
});

visibleNtryItems.forEach(function (item) {
 item.style.display = 'flex';
});

ntryItems.forEach(function (item) {
 if (!visibleNtryItems.includes(item)) {
   item.style.display = 'none';
 }
});

verificarResultados(visibleNtryItems.length, noResultsMessages, '#HTML14');

scrollButtons.forEach(function (button) {
 if (visibleNtryItems.length === 0) {
   button.classList.add('hidden');
 } else {
   button.classList.remove('hidden');
 }
});
});

// Sons de click ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const audio1 = new Audio('https://site-codes.github.io/Projetosite/Sons/som1.mp3');
const audio2 = new Audio('https://site-codes.github.io/Projetosite/Sons/som1.mp3');
const audio3 = new Audio('https://site-codes.github.io/Projetosite/Sons/som7.mp3');
const audio4 = new Audio('https://site-codes.github.io/Projetosite/Sons/som6.mp3');

audio1.preload = 'auto';
audio2.preload = 'auto';
audio3.preload = 'auto';
audio4.preload = 'auto';

let audioEnabled = localStorage.getItem('audioEnabled') === 'false' ? false : true;

function updateToggleButton() {
const button = document.getElementById('toggleAudioButton');
button.textContent = audioEnabled ? 'Desativar Áudio' : 'Ativar Áudio';
}

function playSoundAndScroll() {
if (audioEnabled) {
 audio1.pause();
 audio1.currentTime = 0;
 audio1.play();
}
window.scrollTo({ top: 0 });
}

function playSoundSec() {
if (audioEnabled) {
 audio2.pause();
 audio2.currentTime = 0;
 audio2.play();
}
}

function playSound() {
if (audioEnabled) {
 audio3.pause();
 audio3.currentTime = 0;
 audio3.play();
}
}

function playSoundFour() {
if (audioEnabled) {
 audio4.pause();
 audio4.currentTime = 0;
 audio4.play();
}

}
function toggleAudio() {
audioEnabled = !audioEnabled;
localStorage.setItem('audioEnabled', audioEnabled);
updateToggleButton();
}

document.addEventListener('DOMContentLoaded', updateToggleButton);



// FILTROS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

     function toggleSpan(labelId, element) {
         // Esconde todos os labels
         var labels = ['Label2', 'Label3', 'Label4', 'Label5', 'Label6', 'Label7'];
         for (var i = 0; i < labels.length; i++) {
             if (labels[i] !== labelId) {
                 document.getElementById(labels[i]).style.display = 'none';
             }
         }
         
         // Alterna a visibilidade do label clicado
         var label = document.getElementById(labelId);
         if (label.style.display === "none" || label.style.display === "") {
             label.style.display = "block";
         } else {
             label.style.display = "none";
         }

         // Remove a classe 'active' de todos os spans
         var spans = document.querySelectorAll('.filtros span');
         spans.forEach(function(span) {
             span.classList.remove('active');
         });

         // Adiciona a classe 'active' ao span clicado se o label está visível
         if (label.style.display === "block") {
             element.classList.add('active');
         }
     }  


function toggleFilter() {
         const filtros = document.getElementById('filtros');
         const buttonfilter = document.querySelector('.buttonfilter');
         
         // Verifica se os elementos foram encontrados antes de tentar modificar as classes
         if (filtros && buttonfilter) {
             filtros.classList.toggle('filter');
             buttonfilter.classList.toggle('filter');
         } else {
             console.error('Elementos não encontrados');
         }
     }


// NOTIFICAÇÃO ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Constantes globais
     const MILISSEGUNDOS_EM_24H = 86400000; // 24 horas em milissegundos
     const DURACAO_MENSAGEM = 10000; // Duração da mensagem em milissegundos (2,5 segundos)


     function showNotification() {
         const notif = document.getElementById('notification');
         const notifText = document.getElementById('notifText');
         const closeBtn = document.getElementById('closeNotification');

         // Usando os dados do array Notificacao para alterar os atributos
         notifText.innerText = Notificacao[0].dataText; // Exibe o texto da notificação
         notif.style.background = Notificacao[0].background; // Define o background

         // Verifica se a notificação deve ser exibida
         if (Notificacao[0].exibir === 'sim') {
             const lastShown = localStorage.getItem('lastNotificationTime');
             const now = new Date().getTime();

             if (Notificacao[0].porPeriodo) {
                 // Se não existe a data, mostra a notificação e atualiza o localStorage
                 if (!lastShown) {
                     notif.style.display = 'flex';
                     localStorage.setItem('lastNotificationTime', now); // Marca o tempo atual
                 } else {
                     // Verifica se já passaram 24 horas
                     if (now - lastShown >= MILISSEGUNDOS_EM_24H) {
                         notif.style.display = 'flex';
                         localStorage.setItem('lastNotificationTime', now); // Atualiza o tempo
                     }
                 }
             } else {
                 // Se porPeriodo for false, sempre exibe a notificação
                 notif.style.display = 'flex';
             }

             // Oculta a notificação após a duração definida
             setTimeout(() => {
                 notif.style.display = 'none';
             }, DURACAO_MENSAGEM);
         }

         closeBtn.addEventListener('click', () => {
             notif.style.display = 'none';
         });
     }

     // Chama a função para mostrar a notificação
     showNotification();


// REDES SOCIAIS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function insertSvg(svgName, targetElement) {
const target = document.querySelector(targetElement);
const linkInfo = links[svgName];

if (target && linkInfo) {
target.innerHTML = svgs[svgName] || '';
target.setAttribute('href', linkInfo.url); // Adiciona o href correspondente
target.setAttribute('target', '_blank'); // Faz com que o link abra em uma nova aba
target.style.display = linkInfo.display ? 'flex' : 'none'; // Aplica o display
}
}


document.addEventListener('DOMContentLoaded', () => {
insertSvg('facebook', '.icon-facebook');
insertSvg('reddit', '.icon-reddit');
insertSvg('tiktok', '.icon-tiktok');
insertSvg('youtube', '.icon-youtube');
insertSvg('instagram', '.icon-instagram');
insertSvg('discord', '.icon-discord');
insertSvg('telegram', '.icon-telegram');
});


const svgs = {
facebook: `<svg viewBox='0 0 64 64'><path d='M20.1,36h3.4c0.3,0,0.6,0.3,0.6,0.6V58c0,1.1,0.9,2,2,2h7.8c1.1,0,2-0.9,2-2V36.6c0-0.3,0.3-0.6,0.6-0.6h5.6 c1,0,1.9-0.7,2-1.7l1.3-7.8c0.2-1.2-0.8-2.4-2-2.4h-6.6c-0.5,0-0.9-0.4-0.9-0.9v-5c0-1.3,0.7-2,2-2h5.9c1.1,0,2-0.9,2-2V6.2 c0-1.1-0.9-2-2-2h-7.1c-13,0-12.7,10.5-12.7,12v7.3c0,0.3-0.3,0.6-0.6,0.6h-3.4c-1.1,0-2,0.9-2,2v7.8C18.1,35.1,19,36,20.1,36z'/></svg>`,
reddit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256L37.1 512c-13.7 0-20.5-16.5-10.9-26.2L75 437C28.7 390.7 0 326.7 0 256zM349.6 153.6c23.6 0 42.7-19.1 42.7-42.7s-19.1-42.7-42.7-42.7c-20.6 0-37.8 14.6-41.8 34c-34.5 3.7-61.4 33-61.4 68.4l0 .2c-37.5 1.6-71.8 12.3-99 29.1c-10.1-7.8-22.8-12.5-36.5-12.5c-33 0-59.8 26.8-59.8 59.8c0 24 14.1 44.6 34.4 54.1c2 69.4 77.6 125.2 170.6 125.2s168.7-55.9 170.6-125.3c20.2-9.6 34.1-30.2 34.1-54c0-33-26.8-59.8-59.8-59.8c-13.7 0-26.3 4.6-36.4 12.4c-27.4-17-62.1-27.7-100-29.1l0-.2c0-25.4 18.9-46.5 43.4-49.9l0 0c4.4 18.8 21.3 32.8 41.5 32.8zM177.1 246.9c16.7 0 29.5 17.6 28.5 39.3s-13.5 29.6-30.3 29.6s-31.4-8.8-30.4-30.5s15.4-38.3 32.1-38.3zm190.1 38.3c1 21.7-13.7 30.5-30.4 30.5s-29.3-7.9-30.3-29.6c-1-21.7 11.8-39.3 28.5-39.3s31.2 16.6 32.1 38.3zm-48.1 56.7c-10.3 24.6-34.6 41.9-63 41.9s-52.7-17.3-63-41.9c-1.2-2.9 .8-6.2 3.9-6.5c18.4-1.9 38.3-2.9 59.1-2.9s40.7 1 59.1 2.9c3.1 .3 5.1 3.6 3.9 6.5z"/></svg>`,
tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>`,
youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>`,
instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>`,
discord: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg>`,
telegram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>`
};


