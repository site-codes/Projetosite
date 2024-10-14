     
             // URL codificada
        const encodedBaseUrl = 'aHR0cHM6Ly9zaXRlLWNvZGVzLmdpdGh1Yi5pby9Qcm9qZXRvc2l0ZS8=';

        // Função para decodificar a URL
        function decodeUrl(encodedStr) {
            return atob(encodedStr);
        }

        // Decodifica a URL base
        const linkBase = decodeUrl(encodedBaseUrl);

var linkScriptGeralSite = document.createElement('script');
        linkScriptGeralSite.type = 'text/javascript';
        linkScriptGeralSite.src = linkBase + 'Geral/geralJs/script03.js';
        document.head.appendChild(linkScriptGeralSite);

        var linkScriptGeralSite02 = document.createElement('script');
        linkScriptGeralSite02.type = 'text/javascript';
        linkScriptGeralSite02.src = linkBase + 'Geral/geralJs/script02.js';
        document.head.appendChild(linkScriptGeralSite02);
