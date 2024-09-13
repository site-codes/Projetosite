
//geral 01 js(outra parte aqui no blogger)


// TIPOS DE PAGE
document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  var path = window.location.pathname;

  if (path.includes("/search")) {
    body.classList.add("search-page");
  } else if (path.includes("/label")) {
    body.classList.add("label-page");
  } else if (path.includes("/p/")) {
    body.classList.add("static-page");
  }
});










// ANIMES QUANTIDADE 
document.addEventListener("DOMContentLoaded", function () {
  var blogPts = document.querySelector("#Blog1 .blogPts");
  var totalaNime = document.getElementById("totalaNime");

  function atualizarContagemNtry() {
    // Seleciona todos os elementos .ntry
    var ntryItems = blogPts.querySelectorAll(".ntry");
    // Calcula a quantidade total de .ntry
    var quantidadeTotal = ntryItems.length;

    // Conta quantos desses elementos têm a classe .noList
    var ntryComNoList = blogPts.querySelectorAll(".ntry.noList").length;

    // Calcula o valor final
    var quantidadeFinal = quantidadeTotal - ntryComNoList;

    // Atualiza o texto com o valor final
    totalaNime.textContent = "(" + quantidadeFinal + ")";
  }

  atualizarContagemNtry();
});





// ORDEM DECRESCENTE E CRESCENTE

document.addEventListener("DOMContentLoaded", function () {
  var botoes = document.querySelectorAll(".alfA span");

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      botoes.forEach(function (b) {
        b.classList.remove("ativoB");
      });

      this.classList.add("ativoB");

      if (this.id === "ordenarAlfabeticamente") {
        ordenarAlfabeticamente();
      } else if (this.id === "ordenarDecrescentemente") {
        ordenarDecrescentemente();
      } else if (this.id === "restaurarOrdemPadrao") {
        restaurarOrdemPadrao();
      }
    });
  });
});

function ordenarAlfabeticamente() {
  var blogPts = document.querySelector(".blogPts");
  var ntryItems = Array.from(blogPts.querySelectorAll(".ntry"));

  ntryItems.sort(function (a, b) {
    var titleA = a.querySelector(".titlePos").textContent.trim().toLowerCase();
    var titleB = b.querySelector(".titlePos").textContent.trim().toLowerCase();
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
  var blogPts = document.querySelector(".blogPts");
  var ntryItems = Array.from(blogPts.querySelectorAll(".ntry"));

  ntryItems.sort(function (a, b) {
    var titleA = a.querySelector(".titlePos").textContent.trim().toLowerCase();
    var titleB = b.querySelector(".titlePos").textContent.trim().toLowerCase();
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

document.addEventListener("DOMContentLoaded", function () {
  var blogPts = document.querySelector(".blogPts");
  ordemOriginal = Array.from(blogPts.querySelectorAll(".ntry"));
});

function restaurarOrdemPadrao() {
  var blogPts = document.querySelector(".blogPts");
  blogPts.innerHTML = "";

  ordemOriginal.forEach(function (item) {
    blogPts.appendChild(item);
  });
}

// LISTA DE A - Z
document.addEventListener("DOMContentLoaded", function () {
  var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
  var listaLetras = document.querySelector(".listaLetras");
  var ntryItems = document.querySelectorAll("#Blog1 .blogPts .ntry");
  var searchText = document.getElementById("searchText");
  var noResultsMessage = document.getElementById("noResultsMessage");

  letras.split("").forEach(function (letra) {
    var button = document.createElement("button");
    button.textContent = letra;
    button.classList.add("letra");
    button.setAttribute("data-letra", letra);
    listaLetras.appendChild(button);

    button.addEventListener("click", function () {
      var letraSelecionada = this.getAttribute("data-letra");

      if (this.classList.contains("letterS")) {
        this.classList.remove("letterS");

        ntryItems.forEach(function (item) {
          item.style.display = "block";
        });

        searchText.style.pointerEvents = "auto";

        verificarResultados();
      } else {
        document
          .querySelectorAll(".listaLetras .letra")
          .forEach(function (btn) {
            btn.classList.remove("letterS");
          });

        this.classList.add("letterS");

        ntryItems.forEach(function (item) {
          var primeiraLetra = item
            .querySelector(".titlePos")
            .textContent.trim()
            .charAt(0)
            .toUpperCase();
          if (letraSelecionada === "#" && !isNaN(primeiraLetra)) {
            item.style.display = "block";
          } else if (primeiraLetra === letraSelecionada) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });

        searchText.style.pointerEvents = "none";

        verificarResultados();
      }
    });
  });
  document.getElementById("searchText").addEventListener("input", function () {
    var searchTerm = this.value.trim().toLowerCase();
    var letraSelecionada = document.querySelector(
      ".listaLetras .letra.letterS"
    );

    ntryItems.forEach(function (item) {
      var titlePos = item
        .querySelector(".titlePos")
        .textContent.trim()
        .toLowerCase();
      var primeiraLetra = item
        .querySelector(".titlePos")
        .textContent.trim()
        .charAt(0)
        .toUpperCase();

      if (letraSelecionada) {
        if (letraSelecionada.textContent === "#" && !isNaN(primeiraLetra)) {
          if (titlePos.includes(searchTerm)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        } else if (primeiraLetra === letraSelecionada.textContent) {
          if (titlePos.includes(searchTerm)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        } else {
          item.style.display = "none";
        }
      } else {
        if (titlePos.includes(searchTerm)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }
    });
    verificarResultados();
  });

  function verificarResultados() {
    var hasResults = false;
    ntryItems.forEach(function (item) {
      if (item.style.display !== "none") {
        hasResults = true;
      }
    });

    if (hasResults) {
      noResultsMessage.style.display = "none";
    } else {
      noResultsMessage.style.display = "flex";
    }
  }
});






// cronograma ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const days = document.querySelectorAll(".g-sem span");
  const today = new Date();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  function getDateStr(date) {
    return `${date.getDate()} de ${monthNames[date.getMonth()]}`;
  }

  function showContent(dayIndex) {
    document.querySelectorAll('div[id^="HTML"]').forEach((content) => {
      content.classList.remove("active");
    });

    const targetContent = document.getElementById(`HTML${dayIndex + 7}`);
    if (targetContent) {
      targetContent.classList.add("active");
    }
    days.forEach((day) => {
      day.classList.remove("active");
    });
    days[dayIndex].classList.add("active");
  }

  days.forEach((day, index) => {
    const currentDay = new Date(today);
    currentDay.setDate(today.getDate() - today.getDay() + index);
    day.setAttribute("data-date", getDateStr(currentDay));
  });

  const todayIndex = today.getDay();
  showContent(todayIndex);

  days.forEach((day, index) => {
    day.addEventListener("click", function () {
      showContent(index);
    });
  });

  function updateDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedTime = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;

    document.getElementById("current-date-time").textContent = formattedTime;
  }

  updateDateTime();

  setInterval(updateDateTime, 1000);
});

// Simulcast ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const stations = document.querySelectorAll(".simulcastdiv span");

  function getSeason(date) {
    const month = date.getMonth();
    const day = date.getDate();

    if (month === 0 || month === 1 || month === 2) {
      return "inverno";
    }
    if (month === 3 || month === 4 || month === 5) {
      return "primavera";
    }
    if (month === 6 || month === 7 || month === 8) {
      return "verao";
    }
    if (month === 9 || month === 10 || month === 11) {
      return "outono";
    }
  }

  function showLabel(station) {
    document.querySelectorAll('div[id^="Label"]').forEach((label) => {
      label.classList.remove("active");
    });

    const targetLabel = document.getElementById(
      station.getAttribute("data-target")
    );
    if (targetLabel) {
      targetLabel.classList.add("active");
    }

    stations.forEach((station) => {
      station.classList.remove("active");
    });
    station.classList.add("active");
  }

  stations.forEach((station) => {
    station.addEventListener("click", function () {
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

document.addEventListener("DOMContentLoaded", function () {
  const periods = document.querySelectorAll(".days span");

  function showLabel(period) {
    document.querySelectorAll('div[id^="PopularPosts"]').forEach((label) => {
      label.classList.remove("active");
    });

    const targetLabel = document.getElementById(
      period.getAttribute("data-target")
    );
    if (targetLabel) {
      targetLabel.classList.add("active");
    }

    periods.forEach((period) => {
      period.classList.remove("active");
    });
    period.classList.add("active");
  }

  periods.forEach((period) => {
    period.addEventListener("click", function () {
      showLabel(period);
    });
  });

  const defaultPeriod = document.getElementById("semana");
  if (defaultPeriod) {
    showLabel(defaultPeriod);
  }
});















// Header durante rolagem ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("scroll", function () {
  var bodyScrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  var headerElement = document.getElementById("header");

  if (headerElement) {
    if (bodyScrollTop >= 100) {
      headerElement.classList.add("fundo");
    } else {
      headerElement.classList.remove("fundo");
    }
  }
});


// Abrir link header ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  var dropdownLinks = document.querySelectorAll(".dropdown-content a");

  dropdownLinks.forEach(function (link) {
    var originalHref = link.getAttribute("href");
    var href = "/search/label" + originalHref;
    link.setAttribute("href", href);
  });
});

// Foto de perfil ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const fotos = document.querySelectorAll(".fotos img");
const perfilImgs = document.querySelectorAll(".perfilimg img");

function updateProfileImages(src) {
  perfilImgs.forEach((img) => {
    img.src = src;
  });
  localStorage.setItem("perfilImgSrc", src);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedSrc = localStorage.getItem("perfilImgSrc");
  if (savedSrc) {
    perfilImgs.forEach((img) => {
      img.src = savedSrc;
    });
  }
});

fotos.forEach((img) => {
  img.addEventListener("click", () => {
    updateProfileImages(img.src);
  });
});

// Name usuario ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const usernameInput = document.getElementById("username");
const usernameDisplay = document.querySelector(".username");

document.addEventListener("DOMContentLoaded", () => {
  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    usernameInput.value = savedUsername;
    usernameDisplay.textContent = savedUsername;
  }
});

usernameInput.addEventListener("input", () => {
  const username = usernameInput.value;
  usernameDisplay.textContent = username;
  localStorage.setItem("username", username); // Salva o valor no localStorage
});

// Dados perfil ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let seconds = parseInt(localStorage.getItem("timeOnSite")) || 0;
const timerElement = document.getElementById("time");

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0 ? `${h}h ${m} minutos e ${s}s` : `${m} minutos e ${s}s`;
}

function updateTimer() {
  seconds++;
  timerElement.textContent = formatTime(seconds);
  localStorage.setItem("timeOnSite", seconds);
}

setInterval(updateTimer, 1000);
timerElement.textContent = formatTime(seconds);

let clickedEntriesBlog1 = new Set(
  JSON.parse(localStorage.getItem("clickedEntriesBlog1")) || []
);
const clickCountElementBlog1 = document.getElementById("clickCountBlog1");
const entriesBlog1 = document.querySelectorAll("#Blog1 .ntry");

function updateClickCountBlog1() {
  clickCountElementBlog1.textContent = clickedEntriesBlog1.size;
}

entriesBlog1.forEach((entry, index) => {
  entry.addEventListener("click", () => {
    clickedEntriesBlog1.add(index);
    localStorage.setItem(
      "clickedEntriesBlog1",
      JSON.stringify(Array.from(clickedEntriesBlog1))
    );
    updateClickCountBlog1();
  });
});

updateClickCountBlog1();

document.querySelectorAll(".navbar-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    let dropdownContent = this.nextElementSibling;
    let allDropdownContents = document.querySelectorAll(".dropdown-content");
    let allNavbarItems = document.querySelectorAll(".navbar-item");

    allDropdownContents.forEach((navbar) => {
      if (navbar !== dropdownContent) {
        navbar.style.display = "none";
      }
    });

    allNavbarItems.forEach((navItem) => {
      navItem.classList.remove("active");
    });
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";

    this.classList.toggle("active", dropdownContent.style.display === "block");
  });
});
document.addEventListener("click", function (e) {
  let isClickInside = e.target.closest(".navbar");
  if (!isClickInside) {
    document
      .querySelectorAll(".dropdown-content")
      .forEach((dropdownContent) => {
        dropdownContent.style.display = "none";
      });

    document.querySelectorAll(".navbar-item").forEach((navItem) => {
      navItem.classList.remove("active");
    });
  }
});

document
  .querySelector(".navbar-calendar")
  .addEventListener("click", function (e) {
    document
      .querySelectorAll(".dropdown-content")
      .forEach((dropdownContent) => {
        dropdownContent.style.display = "none";
      });

    document.querySelectorAll(".navbar-item").forEach((navItem) => {
      navItem.classList.remove("active");
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".cmHl");
  const items = Array.from(container.querySelectorAll("li"));

  items.reverse().forEach((item) => container.appendChild(item));

  items.forEach((item, index) => {
    item.setAttribute("data-counter", items.length - index);
  });
});
// abrir perfil e minilista ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function togglePerfilAndItemsE() {
  const itemsE = document.getElementById("itemsE");
  const htmlS = document.querySelector(".htmlS");

  itemsE.classList.toggle("at");
  htmlS.classList.toggle("at");
}

function toggleSearchAndHTML14() {
  const HTML14 = document.getElementById("HTML14");
  const htmlS = document.querySelector(".htmlS");

  HTML14.classList.toggle("atS");
  htmlS.classList.toggle("atS");
}

// Pesquisar na minilista ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const searchInput = document.getElementById("search-input");

function verificarResultados(
  numResultadosVisiveis,
  noResultsMessages,
  contexto
) {
  const hasResults = numResultadosVisiveis > 0;

  noResultsMessages.forEach(function (message) {
    if (message.closest(contexto)) {
      message.style.display = hasResults ? "none" : "flex";
    }
  });
}

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.trim().toLowerCase();
  const ntryItems = document.querySelectorAll("#HTML14 .blogPts .ntry");
  const noResultsMessages = document.querySelectorAll(
    "#HTML14 .noResultsMessage"
  );
  const scrollButtons = document.querySelectorAll("#HTML14 .scrollButtons");

  const visibleNtryItems = Array.from(ntryItems).filter(function (item) {
    const titlePos = item
      .querySelector(".titlePos")
      .textContent.trim()
      .toLowerCase();
    return titlePos.includes(searchTerm);
  });

  visibleNtryItems.forEach(function (item) {
    item.style.display = "flex";
  });

  ntryItems.forEach(function (item) {
    if (!visibleNtryItems.includes(item)) {
      item.style.display = "none";
    }
  });

  verificarResultados(visibleNtryItems.length, noResultsMessages, "#HTML14");

  scrollButtons.forEach(function (button) {
    if (visibleNtryItems.length === 0) {
      button.classList.add("hidden");
    } else {
      button.classList.remove("hidden");
    }
  });
});




// Sons de click ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const audio1 = new Audio("https://abre.ai/clickbutton");
const audio2 = new Audio("https://abre.ai/clickbutton2");
const audio3 = new Audio("https://abre.ai/clickbutton");

audio1.preload = "auto";
audio2.preload = "auto";
audio3.preload = "auto";

let audioEnabled =
  localStorage.getItem("audioEnabled") === "false" ? false : true;

function updateToggleButton() {
  const button = document.getElementById("toggleAudioButton");
  button.textContent = audioEnabled ? "Desativar Áudio" : "Ativar Áudio";
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

function toggleAudio() {
  audioEnabled = !audioEnabled;
  localStorage.setItem("audioEnabled", audioEnabled);
  updateToggleButton();
}

document.addEventListener("DOMContentLoaded", updateToggleButton);
