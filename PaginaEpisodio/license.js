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
            script.src = 'https://site-codes.github.io/Projetosite/PaginaEpisodio/linkar.js';
            document.body.appendChild(script);

            const script2 = document.createElement('script');
            script2.src = 'https://site-codes.github.io/Projetosite/PaginaEpisodio/js/geral.js'; 
            document.body.appendChild(script2);
        } else {
            alert("Chave de licença inválida!");
        }
