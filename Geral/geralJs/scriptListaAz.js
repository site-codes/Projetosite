
// LISTA DE A - Z ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#';
var listaLetras = document.querySelector('.listaLetras');
var ntryItems = document.querySelectorAll('#Blog1 .blogPts .ntry');
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

     ntryItems.forEach(function (item) {
       item.style.display = 'block';
     });

     searchText.style.pointerEvents = 'auto';

     verificarResultados();
   } else {
     document.querySelectorAll('.listaLetras .letra').forEach(function (btn) {
       btn.classList.remove('letterS');
     });

     this.classList.add('letterS');

     ntryItems.forEach(function (item) {
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

 ntryItems.forEach(function (item) {
   var titlePos = item.querySelector('.titlePos').textContent.trim().toLowerCase();
   var primeiraLetra = item.querySelector('.titlePos').textContent.trim().charAt(0).toUpperCase();

   if (letraSelecionada) {
     if (letraSelecionada.textContent === '#' && !isNaN(primeiraLetra)) {
       if (titlePos.includes(searchTerm)) {
         item.style.display = 'block';
       } else {
         item.style.display = 'none';
       }
     } else if (primeiraLetra === letraSelecionada.textContent) {
       if (titlePos.includes(searchTerm)) {
         item.style.display = 'block';
       } else {
         item.style.display = 'none';
       }
     } else {
       item.style.display = 'none';
     }
   } else {
     if (titlePos.includes(searchTerm)) {
       item.style.display = 'block';
     } else {
       item.style.display = 'none';
     }
   }
 });
 verificarResultados();
});

function verificarResultados() {
 var hasResults = false;
 ntryItems.forEach(function (item) {
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
