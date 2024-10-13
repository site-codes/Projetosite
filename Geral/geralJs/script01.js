

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
    const rule = `.cmHl li:nth-child(${
      index + 1
    }) .cmAv .im { background-image: url(${
      imageUrls[imageIndex]
    }) !important; }\n`;
    cssRules += rule;
   });
   
   style.innerHTML = cssRules;
   document.head.appendChild(style);
   
   
   
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
   
