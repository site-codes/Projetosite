if (validateLicense(userLicenseKey)) {
  const scriptJs = document.createElement('script');
    scriptJs.src = 'https://site-codes.github.io/Projetosite/PaginaEpisodio/Player/geral.js';
    document.body.appendChild(scriptJs);
    
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
    
} 

