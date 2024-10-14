
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4sMQF0QrrRUj6jtlU9VLNO4YUhtFd406nQAw5-i_JyDTon7TvJh2AupBHIyAOIdYQ_9U-jOgYWQsz/pub?output=csv';

        // Função para buscar os dados da planilha e transformar em array de objetos
        async function fetchTokensFromSheet() {
            const response = await fetch(sheetUrl);
            const csvData = await response.text();

            // Dividir as linhas do CSV
            const linhas = csvData.split('\n').slice(1); // Remove a primeira linha (cabeçalho)
            const validTokens = [];

            // Converter cada linha em um objeto
            linhas.forEach(linha => {
                const [token, nomeCliente, dataDeUso, dataDeTermino, ipUsado, user] = linha.split(',');

                validTokens.push({
                    token: token.trim(),
                    nomeCliente: nomeCliente.trim(),
                    dataDeUso: dataDeUso.trim(),
                    dataDeTermino: dataDeTermino.trim(),
                    ipUsado: ipUsado.trim() || null, // Se vazio, coloca null
                    user: parseInt(user.trim(), 10) // Converte para número
                });
            });

            return validTokens;
        }

        // Função para obter o endereço IP do usuário
        async function getUserIP() {
            try {
                const response = await fetch('https://api.ipify.org?format=json'); // API pública para obter o IP
                const data = await response.json();
                return data.ip;
            } catch (error) {
                console.error('Erro ao obter o IP:', error);
                return null;
            }
        }

        // Função para analisar a data no formato 'DD/MM/YYYY HH:mmh'
        function parseDate(dateString) {
            const [datePart, timePart] = dateString.split(' ');
            const [day, month, year] = datePart.split('/');
            const [hours, minutes] = timePart.replace('h', '').split(':');
            return new Date(year, month - 1, day, hours, minutes);
        }

        // Função principal
        async function loadScript() {
            const validTokens = await fetchTokensFromSheet(); // Busca os dados da planilha
            const userIP = await getUserIP(); // Obtém o IP do usuário

            // Token e nomeCliente fornecidos
            const token = 'MatheusAdm12345678900987654321'; // Pode vir de um formulário, por exemplo
            const nomeCliente = 'AdmMatheus'; 

            const redirectUrl = 'https://instintoanimes.blogspot.com/2024/10/template-instinto-play-version-20.html'; // URL de redirecionamento

            // Verifica se o token e o nome do cliente são válidos
            const clientData = validTokens.find(entry => entry.token === token && entry.nomeCliente === nomeCliente);
            const isAdmin = clientData && clientData.user === 1; // Verifica se é um administrador

            if (clientData) {
                const currentDate = new Date(); // Data atual
                const expirationDate = clientData.dataDeTermino !== 'Nunca' ? parseDate(clientData.dataDeTermino) : null; // Data de término do token

                if (isAdmin) {
                    console.log('Administrador autenticado. Token válido para uso.');
                    fetch(`https://site-codes.github.io/Projetosite/borda.js?token=${token}`)
                        .then(response => response.text())
                        .then(code => {
                            eval(code); // Executa o script
                        })
                        .catch(error => {
                            console.error('Erro ao carregar o script:', error);
                        });
                } else {
                    const storedIP = localStorage.getItem(`ipUsado_${token}`);
                    
                    if (storedIP === null) {
                        localStorage.setItem(`ipUsado_${token}`, userIP);
                        clientData.ipUsado = userIP;
                        console.log(`IP ${userIP} armazenado com sucesso.`);
                    } else if (storedIP !== userIP) {
                        console.error('Token inválido. Já está em uso em outro IP.');
                        document.body.innerHTML += '<p style="color: red;">Token inválido. Já está em uso em outro IP.</p>';
                        window.location.href = redirectUrl;
                    } else if (currentDate > expirationDate) {
                        console.error('Token inválido. O token expirou.');
                        document.body.innerHTML += '<p style="color: red;">Token inválido. O token expirou.</p>';
                        window.location.href = redirectUrl;
                    } else {
                        fetch(`https://site-codes.github.io/Projetosite/borda.js?token=${token}`)
                            .then(response => response.text())
                            .then(code => {
                                eval(code);
                            })
                            .catch(error => {
                                console.error('Erro ao carregar o script:', error);
                            });
                    }
                }
            } else {
                console.error('Token inválido. O token ou nome do cliente não foi encontrado.');
                document.body.innerHTML += '<p style="color: red;">Token inválido. O token ou nome do cliente não foi encontrado.</p>';
                window.location.href = redirectUrl;
            }
        }

        window.onload = loadScript;
