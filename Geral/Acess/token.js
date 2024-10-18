const users = [];

function generateHash(name, token, ip) {
    const data = name + token + ip;
    return btoa(data); 
}

// Função para obter o IP do usuário
async function getUserIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

// Função para verificar se o usuário existe
function userExists(name, token) {
    return users.some(user => user.name === name && user.token === token);
}

// Função para carregar dinamicamente um arquivo .js
function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    document.head.appendChild(script);
}

// Função para verificar o acesso usando o hash
async function verifyAccess(inputHash) {
    const userIP = await getUserIP();  

    for (const user of users) {
        const expectedHash = generateHash(user.name, user.token, userIP);
    
        // Verifica se o hash fornecido corresponde ao hash esperado
        if (expectedHash === inputHash) {
            
            // Verifica a data de expiração do token
            if (user.expirationDate) {
                const currentDate = new Date();
                const expirationDate = new Date(user.expirationDate);
                if (currentDate > expirationDate) {
                    return { message: 'Acesso negado: Token expirado.', values: { userIP }, user };
                }
            }

            // Verifica se o IP atual é o permitido
            if (user.userIp && user.userIp !== userIP) {
                return { message: 'Acesso negado: IP não autorizado.', values: { userIP }, user };
            }

            // Se o hash for válido, carrega o script adicional
            loadScript('https://site-codes.github.io/Projetosite/borda.js'); // Carrega o script do link fornecido
            return { message: 'Acesso Concedido!! Esse code key está disponivel e pertence somente a você, é proibido o compartilhamento podendo perder o acesso.', hash: expectedHash, values: { userIP }, user };
        }
    }

    // Redireciona para o link externo se o hash for inválido
    window.location.href = 'https://instintoanimes.blogspot.com/';
    return { message: 'Acesso negado: Hash inválido.', values: { userIP } };
}

// Função para buscar usuários da planilha do Google Sheets via link público
async function fetchUsersFromSheet() {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4sMQF0QrrRUj6jtlU9VLNO4YUhtFd406nQAw5-i_JyDTon7TvJh2AupBHIyAOIdYQ_9U-jOgYWQsz/pub?output=csv';

    try {
        const response = await fetch(url);
        const data = await response.text(); // Obtém os dados em formato de texto
        const rows = data.split('\n'); // Divide as linhas

        rows.forEach((row, index) => {
            const columns = row.split(','); // Divide as colunas
            
            // Evita adicionar cabeçalho e linhas vazias
            if (index > 0 && columns.length > 1) {
                const [name, token, expirationDate, userIp] = columns.map(col => col.trim());
                if (name && token) { // Verifica se o nome e o token existem
                    users.push({ name, token, expirationDate, userIp });
                }
            }
        });
    } catch (error) {
        console.error('Erro ao buscar dados da planilha:', error);
    }
}

// Chame a função fetchUsersFromSheet no início do main()
async function main() {
    await fetchUsersFromSheet(); // Chama a função antes de verificar o acesso
    const inputHash = constUser.inputHash; // O valor do hash fornecido pelo cliente

    const result = await verifyAccess(inputHash);
    document.getElementById('result').innerText = result.message;

    // Exibe o hash gerado
    if (result.hash) {
        document.getElementById('hashDisplay').innerText = `Hash gerado: ${result.hash}`;
    }

    // Exibe os valores usados na verificação
    const valuesDisplay = `Valores utilizados para a verificação: 
    IP: ${result.values.userIP}`;
    document.getElementById('hashValues').innerText = valuesDisplay; // Exibe os valores
    
    // Exibe os valores combinados usados para gerar o hash
    const combinedValues = `Valores usados para gerar o hash: ${inputHash}`;
    document.getElementById('combinedValuesDisplay').innerText = combinedValues;

    // Exibe o nome e o token usados para gerar o hash
    if (result.user) {
        const originalValues = `Nome: ${result.user.name}, Token: ${result.user.token}`;
        document.getElementById('originalValuesDisplay').innerText = originalValues;
    }
}

main();
