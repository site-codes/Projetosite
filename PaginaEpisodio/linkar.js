   const validLicenseKeysBase64 = [
            "Q3JpYWRvIFBvciBJbnN0aW50byBQbGF5"
        ]; 

        function decodeBase64Keys(keys) {
            return keys.map(key => atob(key)); 
        }

        function validateLicense(key) {
            const validLicenseKeys = decodeBase64Keys(validLicenseKeysBase64);
            return validLicenseKeys.includes(key);
        }

  
 // Verifica a chave
        if (validateLicense(userLicenseKey)) {
            const script = document.createElement('script');
            script.src = 'https://site-codes.github.io/Projetosite/PaginaEpisodio/Player/geral.js';
            document.body.appendChild(script);

            const script2 = document.createElement('script');
            script2.src = 'https://site-codes.github.io/Projetosite/PaginaEpisodio/js/geral.js'; 
            document.body.appendChild(script2);
        } else {
            alert("Chave de licença inválida!");
        }



const stylesheets = [
    'https://site-codes.github.io/Projetosite/PaginaEpisodio/Player/geral.css',
    'https://site-codes.github.io/Projetosite/PaginaEpisodio/css/geral.css',
    'https://site-codes.github.io/Projetosite/PaginaEpisodio/css/outros.css',
    'https://site-codes.github.io/Projetosite/PaginaEpisodio/css/responsive.css'
];

stylesheets.forEach(href => {
    const style = document.createElement('link');
    style.href = href;
    style.rel = 'stylesheet';
    document.head.appendChild(style);
});




  
       
