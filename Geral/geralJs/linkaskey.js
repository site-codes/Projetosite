        // Cria um novo elemento <script> para o primeiro script
        var linkScriptGeralSite = document.createElement('script');
        linkScriptGeralSite.type = 'text/javascript';
        linkScriptGeralSite.src = 'https://site-codes.github.io/Projetosite/Geral/geralJs/script03.js';

        // Adiciona o primeiro script ao <head> do documento
        document.head.appendChild(linkScriptGeralSite);

        // Opcional: Adiciona um evento onload para verificar se o primeiro script foi carregado
        linkScriptGeralSite.onload = function() {
            console.log('script03.js carregado com sucesso!');
        };

        // Cria um novo elemento <script> para o segundo script
        var linkScriptGeralSite02 = document.createElement('script');
        linkScriptGeralSite02.type = 'text/javascript';
        linkScriptGeralSite02.src = 'https://site-codes.github.io/Projetosite/Geral/geralJs/script01.js';

        // Adiciona o segundo script ao <head> do documento
        document.head.appendChild(linkScriptGeralSite02);

        // Opcional: Adiciona um evento onload para verificar se o segundo script foi carregado
        linkScriptGeralSite02.onload = function() {
            console.log('script02.js carregado com sucesso!');
        };
