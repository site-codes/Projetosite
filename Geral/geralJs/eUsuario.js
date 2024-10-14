let shouldLoadScript = false; // Inicializa como false até a validação

// Validação para garantir que todas as constantes estão presentes

const redirectUrl = 'https://instintoanimes.blogspot.com/2024/10/template-instinto-play-version-20.html';

// Se qualquer uma das variáveis estiver ausente, o script não continua
if (token && nomeCliente && redirectUrl) {
    shouldLoadScript = true; // Só ativa se todos os valores estiverem definidos
} else {
    console.error('Token, nomeCliente ou redirectUrl não está definido.');
}

// Carregar as informações da planilha
const base64sheet = btoa('https://docs.google.com/spreadsheets/d/e/');
const sheetId = '2PACX-1vR4sMQF0QrrRUj6jtlU9VLNO4YUhtFd406nQAw5-i_JyDTon7TvJh2AupBHIyAOIdYQ_9U-jOgYWQsz';
const sheetUrl = `${atob(base64sheet)}${sheetId}/pub?output=csv`;

async function fetchTokensFromSheet() {
    const response = await fetch(sheetUrl);
    const csvData = await response.text();

    const linhas = csvData.split('\n').slice(1);
    const validTokens = [];

    linhas.forEach(linha => {
        const [token, nomeCliente, dataDeUso, dataDeTermino, ipUsado, user] = linha.split(',');

        validTokens.push({
            token: token.trim(),
            nomeCliente: nomeCliente.trim(),
            dataDeUso: dataDeUso.trim(),
            dataDeTermino: dataDeTermino.trim(),
            ipUsado: ipUsado.trim() || null,
            user: parseInt(user.trim(), 10)
        });
    });

    return validTokens;
}

async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Erro ao obter o IP:', error);
        return null;
    }
}

function parseDate(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.replace('h', '').split(':');
    return new Date(year, month - 1, day, hours, minutes);
}

async function loadScript() {
    if (!shouldLoadScript) return; // Se não estiver habilitado, não faz nada

    const validTokens = await fetchTokensFromSheet();
    const userIP = await getUserIP();

    const clientData = validTokens.find(entry => entry.token === token && entry.nomeCliente === nomeCliente);
    const isAdmin = clientData && clientData.user === 1; 

    if (clientData) {
        const currentDate = new Date();
        const expirationDate = clientData.dataDeTermino !== 'Nunca' ? parseDate(clientData.dataDeTermino) : null; 

        if (isAdmin) {
            // Lógica do Admin
        } else {
            const storedIP = localStorage.getItem(`ipUsado_${token}`);
            
            if (storedIP === null) {
                localStorage.setItem(`ipUsado_${token}`, userIP);
                clientData.ipUsado = userIP;
            } else if (storedIP !== userIP) {
                window.location.href = redirectUrl;
            } else if (currentDate > expirationDate) {
                window.location.href = redirectUrl;
            } 
        }
    } else {
        window.location.href = redirectUrl;
    }
}

window.onload = loadScript;

if (shouldLoadScript) {
    document.write('<script src="https://site-codes.github.io/Projetosite/Geral/geralJs/linksKey.js"><\/script>');
}

