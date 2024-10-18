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





// config banner ------------------

document.addEventListener('DOMContentLoaded', function() {


  // Função para atualizar data-anime, data-src e background-image
  function updateAnimeData() {
    const entries = document.querySelectorAll('#HTML2 .ntry');
    const buttons = document.querySelectorAll('#HTML2 .opEning');

    // Atribui data-text aos data-anime dos botões e configura data-src e background-image
    entries.forEach((entry, index) => {
      if (buttons[index]) {
        const animeValue = entry.getAttribute('data-text');
        buttons[index].setAttribute('data-anime', animeValue);

        // Busca o data-src e o background-image com base em uma correspondência parcial
        const matchingSrc = Object.keys(srcMap).find(key => animeValue.includes(key));
        if (matchingSrc) {
          buttons[index].setAttribute('data-src', srcMap[matchingSrc].videoSrc);
          const imgduElement = entry.querySelector('.imgdu');
          if (imgduElement) {
            imgduElement.style.backgroundImage = `url('${srcMap[matchingSrc].imageUrl}')`;

            // Verifica se o fundo é vazio e aplica o estilo desejado
            if (!srcMap[matchingSrc].imageUrl) {
              const imgElement = imgduElement.querySelector('img');
              if (imgElement) {
                imgElement.style.objectFit = 'cover';
                imgElement.style.display = 'unset';
              }
            }
          }
        } else {
          buttons[index].setAttribute('data-src', '');
        }
      }
    });
  }

  // Oculta os elementos caso ocultarOpening seja true
  if (ocultarOpening) {
    const videoOps = document.querySelectorAll('.videoOp');
    const btnBanners = document.querySelectorAll('.btnbanner');

    videoOps.forEach(videoOp => {
      videoOp.style.display = 'none';
      videoOp.style.setProperty('display', 'none', 'important');
    });

    btnBanners.forEach(btnBanner => {
      btnBanner.style.display = 'none';
      btnBanner.style.setProperty('display', 'none', 'important');
    });
  }

  // Configura o MutationObserver para observar mudanças no DOM
  const observer = new MutationObserver(function(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        
        updateAnimeData(); // Atualiza data-anime, data-src e background-image sempre que houver mudanças
      }
    }
  });

  // Inicia a observação no nó desejado
  const targetNode = document.getElementById('HTML2');
  if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
  }

  updateAnimeData(); // Atualiza os dados na carga inicial
});
