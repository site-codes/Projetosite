

// BUTTONS ROLAGEM HORIZONTAL ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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




// TITULO NAS PAGES ANIME, EP E FILME ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

// ANIMES E FILMES QUANTIDADE ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  var blogPts = document.querySelector('#Blog1 .blogPts');
  var totalaNime = document.getElementById('totalaNime');

  function atualizarContagemItens() {
    // Seleciona todos os elementos .animes e .filmes
    var animeItems = blogPts.querySelectorAll('.animes');
    var filmeItems = blogPts.querySelectorAll('.filmes');
    
    // Calcula a quantidade total de .animes e .filmes
    var quantidadeTotal = animeItems.length + filmeItems.length;

    // Conta quantos desses elementos têm a classe .noList
    var animeComNoList = blogPts.querySelectorAll('.animes.noList').length;
    var filmeComNoList = blogPts.querySelectorAll('.filmes.noList').length;

    // Calcula o valor final
    var quantidadeFinal = quantidadeTotal - (animeComNoList + filmeComNoList);

    // Atualiza o texto com o valor final
    totalaNime.textContent = '(' + quantidadeFinal + ')';
  }

  atualizarContagemItens();
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
const DURACAO_MENSAGEM = 10000; // Duração da mensagem em milissegundos (10 segundos)

function showNotification() {
    const notif = document.getElementById('notification');
    const notifText = document.getElementById('notifText');
    const closeBtn = document.getElementById('closeNotification');

    // Verifica se é mobile para usar o texto correto
    const isMobile = window.innerWidth <= 700;
    notifText.innerText = isMobile ? Notificacao[0].dataMobile : Notificacao[0].dataText;
    notif.style.background = Notificacao[0].background;

    // Verifica se a notificação deve ser exibida
    if (Notificacao[0].exibir === 'sim') {
        const lastShown = parseInt(localStorage.getItem('lastNotificationTime'), 10);
        const now = new Date().getTime();

        if (Notificacao[0].porPeriodo) {
            // Se não existe a data ou passou mais de 24 horas, mostra a notificação
            if (!lastShown || isNaN(lastShown) || (now - lastShown >= MILISSEGUNDOS_EM_24H)) {
                notif.style.display = 'flex';
                localStorage.setItem('lastNotificationTime', now);
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

    // Adiciona evento ao botão de fechar
    closeBtn.addEventListener('click', () => {
        notif.style.display = 'none';
    });
}

// Chama a função para mostrar a notificação
showNotification();
