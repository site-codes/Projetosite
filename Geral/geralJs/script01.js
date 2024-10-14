

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
   
