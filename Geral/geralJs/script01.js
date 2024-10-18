  //PERFIL COMENTARIOS BLOGGER ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const imageUrls = [
    "https://animangeek.com/wp-content/uploads/2023/08/Os-10-protagonistas-de-anime-mais-gentis-que-estao-sempre-alegres.webp",
    "https://sm.ign.com/t/ign_br/screenshot/default/imagem-2023-12-15-163503393_5d5p.960.jpg",
    "https://sm.ign.com/t/ign_br/screenshot/default/imagem-2023-12-15-163612387_sch3.960.jpg",
    "https://sm.ign.com/t/ign_br/screenshot/default/imagem-2023-12-15-163554237_tmjq.960.jpg",
    "https://conteudo.imguol.com.br/c/entretenimento/be/2024/04/09/cena-do-anime-wind-breaker-1712689874349_v2_900x506.png.webp",
    "https://s2-g1.glbimg.com/I4BAAwl--JXhtl6h6A4qDnRw6Vk=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/C/4/9EhaAnTGOvbBj66iUBSQ/chainsaw3.jpg",
    "https://s2-techtudo.glbimg.com/0CuxZpaH6Mg_0864-mQCEPpj_h4=/0x0:1200x700/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/2/D/bVe5uMQYWpxlLaBY9oCA/chainsaw-man-2.jpg",
    "https://a.storyblok.com/f/178900/1200x675/a658f30530/you-are-ms-servant.jpg/m/1200x0/filters:quality(95)format(webp)",
    "https://imgix.ranker.com/list_img_v2/14711/2814711/original/anime-characters-died-multiple-times?auto=format&q=50&fit=crop&fm=pjpg&dpr=2&crop=faces&h=356.020942408377&w=680",
];

const listItems = document.querySelectorAll(".cmHl li");

const style = document.createElement("style");
style.type = "text/css";
let cssRules = "";

listItems.forEach((item, index) => {
    const imageIndex = index % imageUrls.length; 
    const rule = `.cmHl li:nth-child(${index + 1}) .cmAv .im:before { 
        content: ""; 
        background-image: url(${imageUrls[imageIndex]}); 
        background-repeat: no-repeat; 
        background-position: center; 
        background-size: cover; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        position: absolute; 
    }\n`;
    cssRules += rule; 
});

style.innerHTML = cssRules;
document.head.appendChild(style);



// LABELS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function addBorders() {
  document.querySelectorAll('.ntry').forEach(function(element) {
     
      const hasAnimesLink = element.querySelector('a[data-text="Animes"], span[data-text="Animes"]');
 
      if (hasAnimesLink) {  
          element.classList.add('animes');         
      } else {             
          element.classList.remove('animes');    
      }
 
      element.querySelectorAll('a[data-text="Anime Legendado"], span[data-text="Anime Legendado"], a[data-text="Anime Dublado"], span[data-text="Anime Dublado"]').forEach(function(link) {
          if (link.getAttribute('data-text') === "Anime Legendado") {
              link.classList.add('sub');            
              link.setAttribute('data-text', 'Anime Legendado');  
              link.textContent = 'Leg';                
          } else if (link.getAttribute('data-text') === "Anime Dublado") {
              link.setAttribute('data-text', 'Anime Dublado');     
              link.textContent = 'Dub';                  
          }
      });
 
      element.querySelectorAll('a[data-text="Filme Legendado"], span[data-text="Filme Legendado"], a[data-text="Filme Dublado"], span[data-text="Filme Dublado"]').forEach(function(link) {
          if (link.getAttribute('data-text') === "Filme Legendado") {
              link.classList.add('sub');               
              link.setAttribute('data-text', 'Filme Legendado');   
              link.textContent = 'Leg';                 
          } else if (link.getAttribute('data-text') === "Filme Dublado") {
              link.setAttribute('data-text', 'Filme Dublado');      
              link.textContent = 'Dub';                   
          }
      });
 
      element.querySelectorAll('a[data-text="Filmes"], span[data-text="Filmes"]').forEach(function(link) {
          link.classList.add('labelFilmes');          
          link.textContent = 'Filme';    
          element.classList.add('filmes');             
      });
 
      element.querySelectorAll('a[data-text], span[data-text]').forEach(function(link) {
          const notaMatch = link.getAttribute('data-text').match(/Nota\s+([\d]+(\.[\d]+)?)/);
          if (notaMatch) {
              link.classList.add('labelNota');          
              link.textContent = notaMatch[1];        
          }
 
          const temporadasMatch = link.getAttribute('data-text').match(/(\d+)\s+Temporadas/);
          if (temporadasMatch) {
              link.classList.add('labelT');   
              const numeroTemporadas = String(temporadasMatch[1]).padStart(2, '0');
              link.textContent = numeroTemporadas;   
          }
 
          const episodiosMatch = link.getAttribute('data-text').match(/(\d+)\s+Episodios/);
          if (episodiosMatch) {
              link.classList.add('labelE');                
              link.textContent = episodiosMatch[1];     
          }
      });
  });
 }
 
 addBorders();
 
 const observer = new MutationObserver(function(mutationsList, observer) {
  addBorders();  
 });
 
 observer.observe(document.body, {
  childList: true, 
  subtree: true 
 });

 
// LISTA DE A - Z ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#';
  var listaLetras = document.querySelector('.listaLetras');
  var animeItems = document.querySelectorAll('#Blog1 .blogPts .animes');
  var filmeItems = document.querySelectorAll('#Blog1 .blogPts .filmes');
  var searchText = document.getElementById('searchText');
  var noResultsMessage = document.getElementById('noResultsMessage');

  letras.split('').forEach(function (letra) {
    var button = document.createElement('button');
    button.textContent = letra;
    button.classList.add('letra');
    button.setAttribute('data-letra', letra);
    listaLetras.appendChild(button);

    button.addEventListener('click', function () {
      var letraSelecionada = this.getAttribute('data-letra');

      if (this.classList.contains('letterS')) {
        this.classList.remove('letterS');

        animeItems.forEach(function (item) {
          item.style.display = 'block';
        });
        filmeItems.forEach(function (item) {
          item.style.display = 'block';
        });

        searchText.style.pointerEvents = 'auto';

        verificarResultados();
      } else {
        document.querySelectorAll('.listaLetras .letra').forEach(function (btn) {
          btn.classList.remove('letterS');
        });

        this.classList.add('letterS');

        animeItems.forEach(function (item) {
          var primeiraLetra = item.querySelector('.titlePos').textContent.trim().charAt(0).toUpperCase();
          if (letraSelecionada === '#' && !isNaN(primeiraLetra)) {
            item.style.display = 'block';
          } else if (primeiraLetra === letraSelecionada) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });

        filmeItems.forEach(function (item) {
          var primeiraLetra = item.querySelector('.titlePos').textContent.trim().charAt(0).toUpperCase();
          if (letraSelecionada === '#' && !isNaN(primeiraLetra)) {
            item.style.display = 'block';
          } else if (primeiraLetra === letraSelecionada) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });

        searchText.style.pointerEvents = 'none';

        verificarResultados();
      }
    });
  });

  document.getElementById('searchText').addEventListener('input', function () {
    var searchTerm = this.value.trim().toLowerCase();
    var letraSelecionada = document.querySelector('.listaLetras .letra.letterS');

    animeItems.forEach(function (item) {
      var titlePos = item.querySelector('.titlePos').textContent.trim().toLowerCase();
      var primeiraLetra = item.querySelector('.titlePos').textContent.trim().charAt(0).toUpperCase();

      if (letraSelecionada) {
        if (letraSelecionada.textContent === '#' && !isNaN(primeiraLetra)) {
          if (titlePos.includes(searchTerm)) {
            item.style.display = 'unset';
          } else {
            item.style.display = 'none';
          }
        } else if (primeiraLetra === letraSelecionada.textContent) {
          if (titlePos.includes(searchTerm)) {
            item.style.display = 'unset';
          } else {
            item.style.display = 'none';
          }
        } else {
          item.style.display = 'none';
        }
      } else {
        if (titlePos.includes(searchTerm)) {
          item.style.display = 'unset';
        } else {
          item.style.display = 'none';
        }
      }
    });

    filmeItems.forEach(function (item) {
      var titlePos = item.querySelector('.titlePos').textContent.trim().toLowerCase();
      var primeiraLetra = item.querySelector('.titlePos').textContent.trim().charAt(0).toUpperCase();

      if (letraSelecionada) {
        if (letraSelecionada.textContent === '#' && !isNaN(primeiraLetra)) {
          if (titlePos.includes(searchTerm)) {
            item.style.display = 'unset';
          } else {
            item.style.display = 'none';
          }
        } else if (primeiraLetra === letraSelecionada.textContent) {
          if (titlePos.includes(searchTerm)) {
            item.style.display = 'unset';
          } else {
            item.style.display = 'none';
          }
        } else {
          item.style.display = 'none';
        }
      } else {
        if (titlePos.includes(searchTerm)) {
          item.style.display = 'unset';
        } else {
          item.style.display = 'none';
        }
      }
    });

    verificarResultados();
  });

  function verificarResultados() {
    var hasResults = false;

    animeItems.forEach(function (item) {
      if (item.style.display !== 'none') {
        hasResults = true;
      }
    });

    filmeItems.forEach(function (item) {
      if (item.style.display !== 'none') {
        hasResults = true;
      }
    });

    if (hasResults) {
      noResultsMessage.style.display = 'none';
    } else {
      noResultsMessage.style.display = 'flex';
    }
  }
});


// CALENDARIO ABRIR  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const navbarCalendar = document.querySelector('.navbar-calendar');
    const htmlS = document.querySelector('.htmlS');
   
    if (navbarCalendar && htmlS) {
      navbarCalendar.addEventListener('click', function() {
        htmlS.classList.toggle('cal');
      });
    }
   });
   


// BLOG1 EM LABEL DE TEMPORADAS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      // 
      var searchElement = document.querySelector('.srch');
      
      // Verifica o texto dentro do elemento
      var searchText = searchElement.textContent.trim();
      
      // Expressão regular para verificar se o texto contém um número seguido de "Temporadas"
      var matchTemporadas = searchText.match(/^(\d+)\s*Temporadas$/i);
      
      // Se o padrão for encontrado, adiciona a classe .seasonslist
      if (matchTemporadas) {
          searchElement.classList.add('seasonslist');
      }

