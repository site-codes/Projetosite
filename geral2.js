
// Title Pagina anime ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const titleAnimeElement = document.querySelector(".titleanime");
  const titleAnimeSpan = document.getElementById("titleanime");

  if (titleAnimeElement && titleAnimeSpan) {
    titleAnimeSpan.textContent = titleAnimeElement.textContent;
  }
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
