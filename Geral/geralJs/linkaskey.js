
        // Cria um novo elemento <script> para o primeiro script
        var linkScriptGeralSite = document.createElement('script');
        linkScriptGeralSite.type = 'text/javascript';
        linkScriptGeralSite.src = linkBase + 'Geral/geralJs/script03.js';

        document.head.appendChild(linkScriptGeralSite);


        // Cria um novo elemento <script> para o segundo script
        var linkScriptGeralSite02 = document.createElement('script');
        linkScriptGeralSite02.type = 'text/javascript';
        linkScriptGeralSite02.src = linkBase + 'Geral/geralJs/script02.js';

        document.head.appendChild(linkScriptGeralSite02);
