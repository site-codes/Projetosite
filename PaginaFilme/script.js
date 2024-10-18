  
  // DISPLAY NONE AO ADM CASO VALOR VAZIO
function checkAndHideAdm() {
const h8 = document.querySelector('span.adm h8'); 
const admSpan = document.querySelector('span.adm');

if (!h8 || h8.textContent.trim() === '') {
  admSpan.style.display = 'none';
} else {
  admSpan.style.display = 'flex'; 
}
}

checkAndHideAdm();

    
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



// TRAILER
document.addEventListener("DOMContentLoaded", function () {
  const youtubeContainer = document.querySelector(".youtubeContainer");
  const trailerVideo = document.getElementById("trailerVideo");
  const trailerLink = document.querySelector(".trailer");

  const embedLink = youtubeContainer.getAttribute("data-link-embed");

  // Verifica se o embedLink está vazio ou não contém a estrutura "https://www.youtube.com/embed/"
  if (!embedLink || !embedLink.startsWith("https://www.youtube.com/embed/")) {
    // Adiciona display: none à classe .trailer
    trailerLink.style.display = "none";
  } else {
    // Define o link de incorporação se o embedLink for válido
    trailerVideo.src = embedLink;
  }
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

  trailerLink?.addEventListener("click", function (event) {
    event.preventDefault();
    toggleActive();
  });

  trailerContent?.addEventListener("click", function () {
    toggleActive();
  });
});
  
  
 
// ADD DISPLAY NONE AO TRAILER
  // Função para verificar o link do embed e ocultar o trailer se estiver vazio
  function checkTrailerLink() {
    const youtubeContainer = document.querySelector('.youtubeContainer');
    const trailerLink = document.querySelector('.trailer');
    const linkEmbed = youtubeContainer.getAttribute('data-link-embed');

    if (!linkEmbed) {
      trailerLink.style.display = 'none'; // Oculta o link se estiver vazio
    } else {
      trailerLink.style.display = 'block'; // Mostra o link caso contrário
    }
  }

  // Chama a função ao carregar a página ou ao exibir a seção
  checkTrailerLink();
