// URL Base64 codificada até "https://site-codes.github.io/Projetosite/PaginaAnime/"
const InstintoPlay = 'aHR0cHM6Ly9zaXRlLWNvZGVzLmdpdGh1Yi5pby9Qcm9qZXRvc2l0ZS9QYWdpbmFBbmltZS8=';

// Função para decodificar Base64
function decodeBase64(base64Str) {
    return atob(base64Str);
}

// Decodifica a URL base
const baseURL = decodeBase64(InstintoPlay);

// Cria e adiciona o link para o CSS
var link = document.createElement('link');
link.href = baseURL + 'style.css';  // Adiciona o estilo ao caminho decodificado
link.rel = 'stylesheet';
document.head.appendChild(link);

// Cria e adiciona o script para o JavaScript
var script = document.createElement('script');
script.src = baseURL + 'script.js';  // Adiciona o script ao caminho decodificado
document.head.appendChild(script);

   // senha *Matheus2*
     
   
