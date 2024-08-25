  
    const script = document.createElement("script");
    script.src = "https://site-codes.github.io/IframePage-EpPlayer/iframe.js";
    document.body.appendChild(script);
    
    
    // Adiciona o primeiro arquivo CSS
let link1 = document.createElement('link');
link1.type = 'text/css';
link1.rel = 'stylesheet';
link1.href = 'https://site-codes.github.io/Projetosite/pageepisodio.css';
document.querySelector('head').appendChild(link1);

// Adiciona o segundo arquivo CSS
let link2 = document.createElement('link');
link2.type = 'text/css';
link2.rel = 'stylesheet';
link2.href = 'https://site-codes.github.io/IframePage-EpPlayer/style.css';
document.querySelector('head').appendChild(link2);
