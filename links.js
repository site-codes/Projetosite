
   // Adicionar o arquivo JS
    let jsLink = document.createElement('script');
    jsLink.type = 'text/javascript';
    jsLink.src = 'https://site-codes.github.io/Projetosite/pageanime.js';
    document.querySelector('head').appendChild(jsLink);
  
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar o arquivo CSS
    let cssLink = document.createElement('link');
    cssLink.type = 'text/css';
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://site-codes.github.io/Projetosite/pageanime.css';
    document.querySelector('head').appendChild(cssLink);

});
  

      // SUBSTITUIR TERMOS
const sinopseElements = document.querySelectorAll('.sinopseN');
const description = document.getElementById('description');

if (description) {
  sinopseElements.forEach(sinopse => {
    if (sinopse.innerHTML.trim() === '') {
      sinopse.innerHTML = description.innerHTML;
    }
  });
}
 
      const tituloElements = document.querySelectorAll('.tituloN');

tituloElements.forEach(titulo => {
  if (!titulo.getAttribute('data-name').trim()) {
    titulo.setAttribute('data-name', 'Ep sem Título');
  }
});
  
