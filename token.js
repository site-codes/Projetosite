// script.js

// Definindo os usuários com userIp
const users = [
    { 
        name: 'João', 
        token: 'abc123', 
        expirationDate: '2024-12-31',
        userIp: null // Pode ser null ou um IP específico
    },
    { 
        name: 'Maria', 
        token: 'xyz456', 
        expirationDate: '2024-12-31',
        userIp: null // Pode ser null ou um IP específico
    },
    {
        name: 'adm', 
        token: 'adm', 
        expirationDate: null, // Token de administrador não tem data de término
        userIp: null // Pode ser null ou um IP específico
    }
];

// Função para gerar o hash
function generateHash(name, token, ip) {
    const data = name + token + ip;
    return btoa(data); // Usando base64 como um exemplo simples de hashing
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

// Função para verificar o acesso usando o hash
async function verifyAccess(inputHash) {
    const userIP = await getUserIP(); // Obtendo o IP atual do usuário

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

            return { message: 'Acesso concedido!', hash: expectedHash, values: { userIP }, user };
        }
    }

    return { message: 'Acesso negado: Hash inválido.', values: { userIP } };
}

// Função principal para executar a verificação
async function main() {
    // Usando a constante inputHash do cliente
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
