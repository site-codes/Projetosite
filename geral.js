// ANIMES CLICADODS

document.addEventListener("DOMContentLoaded", function () {
    var blogPts = document.querySelector("#Blog1 .blogPts");
    var totalaNime = document.getElementById("totalaNime");
  
    function atualizarContagemNtry() {
      var ntryItems = blogPts.querySelectorAll(".ntry");
      var quantidade = ntryItems.length;
      totalaNime.textContent = "(" + quantidade + ")";
    }
  
    atualizarContagemNtry();
  });
  // BANNER

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
    playCurrentButtonVideo();
    restartAutoChange();
  } else if (event.key === "ArrowLeft") {
    previousEntry();
    playCurrentButtonVideo();
    restartAutoChange();
  }
});

window.addEventListener("DOMContentLoaded", initialize);

document.querySelectorAll("button.opEning").forEach((button) => {
  button.addEventListener("click", function () {
    const src = this.getAttribute("data-src");
    playVideo(src);
    handleVideoPlayback();
    restartAutoChange();
  });
});





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
  
  // Title Pagina anime ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  document.addEventListener("DOMContentLoaded", function () {
    const titleAnimeElement = document.querySelector(".titleanime");
    const titleAnimeSpan = document.getElementById("titleanime");
  
    if (titleAnimeElement && titleAnimeSpan) {
      titleAnimeSpan.textContent = titleAnimeElement.textContent;
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
  
  // imagens dos comentarios
  const imageUrls = [
    "https://animangeek.com/wp-content/uploads/2023/08/Os-10-protagonistas-de-anime-mais-gentis-que-estao-sempre-alegres.webp",
    "https://sm.ign.com/t/ign_br/screenshot/default/imagem-2023-12-15-163503393_5d5p.960.jpg",
    "https://sm.ign.com/t/ign_br/screenshot/default/imagem-2023-12-15-163612387_sch3.960.jpg",
    "https://sm.ign.com/t/ign_br/screenshot/default/imagem-2023-12-15-163554237_tmjq.960.jpg",
  ];
  
  const listItems = document.querySelectorAll(".cmHl li");
  
  const style = document.createElement("style");
  style.type = "text/css";
  let cssRules = "";
  
  listItems.forEach((item, index) => {
    const imageIndex = index % imageUrls.length;
    const rule = `.cmHl li:nth-child(${
      index + 1
    }) .cmAv .im { background-image: url(${
      imageUrls[imageIndex]
    }) !important; }\n`;
    cssRules += rule;
  });
  
  style.innerHTML = cssRules;
  document.head.appendChild(style);
  
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
  
  // Editar os itens em cada tipo de page
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
  
