

      
      // O CONST DE IMAGENS ESTA NA POSTAGEM DO ANIME
  // GALERIA DE IMAGENS DUPLICADAS E WALLPAPER ALTERNANDO
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se `imagescontainer` foi carregado
  if (typeof imagescontainer === "undefined") {
    console.error("A variável imagescontainer não foi definida.");
    return;
  }

  const images = document.querySelectorAll("#postBody img");
  const listImagens = document.querySelector(".listimagens");
  const wid01 = document.querySelector(".wid01");

  const addedImageUrls = new Set();

  function addImages(imagesArray) {
    imagesArray.forEach((imgUrl) => {
      if (!addedImageUrls.has(imgUrl)) {
        addedImageUrls.add(imgUrl);
        const imgElement = document.createElement("img");
        imgElement.src = imgUrl;
        imgElement.alt = "Imagem";
        listImagens.appendChild(imgElement);
      }
    });
  }

  images.forEach((img) => {
    const imgUrl = img.src;
    if (!addedImageUrls.has(imgUrl)) {
      addedImageUrls.add(imgUrl);
      const clonedImg = img.cloneNode(true);
      listImagens.appendChild(clonedImg);
    }
  });

  addImages(imagescontainer);

  let currentIndex = 0;

  function changeBackgroundImage() {
    wid01.style.backgroundImage = `url('${imagescontainer[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % imagescontainer.length;
  }

  changeBackgroundImage();

  setInterval(changeBackgroundImage, 5000);

  function createModal() {
    const modal = document.createElement("div");
    modal.id = "modal";
    const modalImg = document.createElement("img");
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    return { modal, modalImg };
  }

  const { modal, modalImg } = createModal();

  listImagens.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
      modalImg.src = event.target.src;
      modal.style.display = "flex";
    }
  });
});



  
  
  
// CASO A PAGINA FIQUE DENTRO DA PAGE EPISODODIO
if (window.self !== window.top) {
  const paginaAnime = document.querySelector(".pageanime");
  const paginaAnimeep = document.querySelector(".pageanimeep");
  if (paginaAnime) {
    paginaAnime.classList.add("iframepg");
  }
  if (paginaAnimeep) {
    paginaAnimeep.classList.add("iframepg");

    document.body.classList.add("iframepg");
  }
}

// HISTORICO DE ASSSISTIDOS
document.addEventListener("DOMContentLoaded", function () {
  const primeiroEpisodio = document.querySelector(".items");

  const playLink = document.querySelector(".Play");

  const nextviewep = document.getElementById("nextviewep");

  const seasonN = primeiroEpisodio.querySelector(".seasonN").textContent.trim();
  const epNN = primeiroEpisodio.querySelector(".epNN").textContent.trim();
  const href = primeiroEpisodio.querySelector(".linkep").getAttribute("href");

  nextviewep.textContent = `Assistir Temporada ${seasonN} - Episódio ${epNN}`;
  playLink.setAttribute("href", href);
});
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".items");
  const nextviewep = document.getElementById("nextviewep");
  const lastepview = document.getElementById("lastepview");

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
  function loadFromLocalStorage(key) {
    return localStorage.getItem(key);
  }

  const savedNextviewep = loadFromLocalStorage("nextviewep");
  const savedLastepview = loadFromLocalStorage("lastepview");

  if (savedNextviewep) {
    nextviewep.textContent = savedNextviewep;
  }

  if (savedLastepview) {
    lastepview.textContent = savedLastepview;
  }

  items.forEach(function (item, index) {
    item.addEventListener("click", function () {
      const seasonN = item.querySelector(".seasonN").textContent.trim();
      const epNN = item.querySelector(".epNN").textContent.trim();
      const href = item.querySelector(".linkep").getAttribute("href");

      lastepview.textContent = `Temporada ${seasonN} - Episódio ${epNN}`;
      saveToLocalStorage("lastepview", lastepview.textContent);

      const isWideScreen = window.matchMedia("(min-width: 1100px)").matches;

      if (isWideScreen) {
        if (index < items.length - 1) {
          const nextItem = items[index + 1];
          const nextSeason = nextItem
            .querySelector(".seasonN")
            .textContent.trim();
          const nextEp = nextItem.querySelector(".epNN").textContent.trim();
          nextviewep.textContent = `Assistir Temporada ${nextSeason} - Episódio ${nextEp}`;
        } else {
          const primeiroEpisodio = items[0];
          const primeiroSeason = primeiroEpisodio
            .querySelector(".seasonN")
            .textContent.trim();
          const primeiroEp = primeiroEpisodio
            .querySelector(".epNN")
            .textContent.trim();
          nextviewep.textContent = `Reassistir Anime - T${primeiroSeason} Episódio ${primeiroEp}`;
        }
      } else {
        if (index < items.length - 1) {
          const nextItem = items[index + 1];
          const nextSeason = nextItem
            .querySelector(".seasonN")
            .textContent.trim();
          const nextEp = nextItem.querySelector(".epNN").textContent.trim();
          nextviewep.textContent = `Assistir T${nextSeason} Ep${nextEp}`;
        } else {
          const primeiroEpisodio = items[0];
          const primeiroSeason = primeiroEpisodio
            .querySelector(".seasonN")
            .textContent.trim();
          const primeiroEp = primeiroEpisodio
            .querySelector(".epNN")
            .textContent.trim();
          nextviewep.textContent = `Reassistir Anime`;
        }
      }

      saveToLocalStorage("nextviewep", nextviewep.textContent);

      const playLink = document.querySelector(".Play");
      playLink.setAttribute("href", href);
    });
  });
});

// CAPA EM TELA CHEIA
document.addEventListener("DOMContentLoaded", function () {
  var imagemCapa = document.querySelector(".imagem-capa");
  var modal = document.createElement("div");
  modal.id = "modal";
  var imagemModal = document.createElement("img");
  imagemModal.src = imagemCapa.src;
  modal.appendChild(imagemModal);
  document.body.appendChild(modal);

  imagemCapa.addEventListener("click", function () {
    modal.style.display = "block";
  });

  modal.addEventListener("click", function () {
    modal.style.display = "none";
  });
});

// LISTA DE EPISODIOS
document.addEventListener("DOMContentLoaded", function () {
  var totalCounts = document.querySelectorAll(".total-count");

  totalCounts.forEach(function (totalCount) {
    var count = document.querySelectorAll(".vieweP").length;
    totalCount.textContent = count;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var containers = document.querySelectorAll(".container");

  containers.forEach(function (container) {
    var containerId = container.getAttribute("data-id");
    var buttons = document.querySelectorAll(".vieweP");
    var progressBar = container.querySelector(".progress-fill");
    var secepButton = container.querySelector("#secep");
    var progressText = container.querySelector(".porceps h3");
    var markedCountText = container.querySelector(".marked-count");
    var totalCountText = container.querySelector(".total-count");

    totalCountText.textContent = buttons.length;

    function loadButtonState() {
      buttons.forEach(function (button) {
        var buttonId = button.getAttribute("data-id");
        var state = localStorage.getItem(containerId + "-" + buttonId);
        if (state === "visto") {
          button.classList.add("visto");
        }
      });
      updateProgressBar();
    }
    function saveButtonState(button) {
      var buttonId = button.getAttribute("data-id");
      if (button.classList.contains("visto")) {
        localStorage.setItem(containerId + "-" + buttonId, "visto");
      } else {
        localStorage.removeItem(containerId + "-" + buttonId);
      }
    }

    function updateProgressBar() {
      var total = buttons.length;
      var marked = document.querySelectorAll(".vieweP.visto").length;
      var percentage = (marked / total) * 100;
      progressBar.style.width = percentage + "%";
      progressText.textContent = "Assistido " + Math.round(percentage) + "%";
      markedCountText.textContent = marked;

      if (marked === total) {
        secepButton.classList.add("studo");
      } else {
        secepButton.classList.remove("studo");
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        button.classList.toggle("visto");
        saveButtonState(button);
        updateProgressBar();
      });
    });

    secepButton.addEventListener("click", function () {
      var allMarked = Array.from(buttons).every((button) =>
        button.classList.contains("visto")
      );
      if (secepButton.classList.contains("studo") && allMarked) {
        buttons.forEach(function (button) {
          button.classList.remove("visto");
          saveButtonState(button);
        });
        secepButton.classList.remove("studo");
      } else {
        buttons.forEach(function (button) {
          button.classList.add("visto");
          saveButtonState(button);
        });
        secepButton.classList.add("studo");
      }
      updateProgressBar();
    });

    loadButtonState();
  });
});

// IMAGENS
document.addEventListener("DOMContentLoaded", function () {
  var imgCs = document.querySelectorAll(".imgC");

  imgCs.forEach(function (imgC) {
    if (imgC.getAttribute("src") === "") {
      imgC.setAttribute(
        "src",
        document.querySelector(".capa img").getAttribute("src")
      );
    }
  });
});

// TEMPORADAS
document.addEventListener("DOMContentLoaded", function () {
  const spans = document.querySelectorAll(".listtemporadas span");
  const listeps = document.querySelectorAll(".listeps");

  spans.forEach((span) => {
    span.addEventListener("click", function () {
      spans.forEach((s) => s.classList.remove("clicked"));

      span.classList.add("clicked");

      listeps.forEach((list) => list.classList.remove("active"));

      const seasonId = `season-${span.getAttribute("data-season")}`;
      const seasonElement = document.getElementById(seasonId);
      if (seasonElement) {
        seasonElement.classList.add("active");
      }
    });
  });

  document.getElementById("season-01").classList.add("active");

  listeps.forEach((list) => {
    const seasonNumber = list.id.split("-")[1];
    const episodes = list.querySelectorAll(".episodio .seasonN");
    episodes.forEach((episode) => {
      episode.textContent = `${seasonNumber}`;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollLeftButton = document.getElementById("scrollLeft");
  const scrollRightButton = document.getElementById("scrollRight");
  const listTemporadas = document.querySelector(".listtemporadas div");

  scrollLeftButton.addEventListener("click", function () {
    listTemporadas.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  });

  scrollRightButton.addEventListener("click", function () {
    listTemporadas.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.querySelector(".search-bar");
  const episodios = document.querySelectorAll(".episodio");

  searchBar.addEventListener("input", function () {
    const searchTerm = searchBar.value.trim().toLowerCase();

    episodios.forEach((episodio) => {
      const epNN = episodio
        .querySelector(".epNN")
        .textContent.trim()
        .toLowerCase();

      if (epNN.includes(searchTerm)) {
        episodio.style.display = "flex";
      } else {
        episodio.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const seasonN = document.getElementById("seasonN");
  const listtemporadas = document.querySelector(".listtemporadas");
  const spanCount = listtemporadas.querySelectorAll("span").length;

  const finalValue = spanCount - 1;

  seasonN.textContent = finalValue;
});

  
  
  // STATUS ANIME
document.addEventListener("DOMContentLoaded", function () {
  const statusElement = document.getElementById("status");
  const statusText = statusElement.textContent.trim();

  if (statusText === "Completo") {
    statusElement.classList.add("completo");
    statusElement.classList.remove("pausa"); // Remove .pausa caso esteja presente
  } else if (statusText === "Em Pausa") {
    statusElement.classList.add("pausa");
    statusElement.classList.remove("completo"); // Remove .completo caso esteja presente
  } else {
    statusElement.classList.remove("completo");
    statusElement.classList.remove("pausa"); // Remove ambas as classes se o status não for "Completo" ou "Em Pausa"
  }
});

// TRAILER
document.addEventListener("DOMContentLoaded", function () {
  const youtubeContainer = document.querySelector(".youtubeContainer");
  const trailerVideo = document.getElementById("trailerVideo");

  const embedLink = youtubeContainer.getAttribute("data-link-embed");

  trailerVideo.src = embedLink;
});

document.addEventListener("DOMContentLoaded", function () {
  const trailerLink = document.querySelector(".trailer");
  const trailerContent = document.querySelector(".trailerA");
  const trailerVideo = document.getElementById("trailerVideo");
  const originalSrc = trailerVideo.src;

  function toggleActive() {
    trailerContent.classList.toggle("ativo");

    if (!trailerContent.classList.contains("ativo")) {
      trailerVideo.src = "";
      setTimeout(() => {
        trailerVideo.src = originalSrc;
      }, 0);
    }
  }

  trailerLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleActive();
  });

  trailerContent.addEventListener("click", function () {
    toggleActive();
  });
});

    
  
