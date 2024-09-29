
        if (checkLicense(userLicenseKey)) {
          
            const script1 = document.createElement('script');
            script1.src = 'https://site-codes.github.io/Projetosite/PaginaEpisodio/linkar.js';
            document.body.appendChild(script1);

        
            const script2 = document.createElement('script');
            script2.src = 'https://site-codes.github.io/Projetosite/PaginaEpisodio/js/geral.js'; 
            document.body.appendChild(script2);
        } else {
            alert("Chave de licença inválida!");
        }
