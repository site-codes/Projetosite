const users = [
    { name: 'user1', token: 'token123', expirationDate: '2024-12-31', userIp: null, emUso: 0 },
    { name: 'user2', token: 'token456', expirationDate: '2020-11-30', userIp: null, emUso: 1 },
];

        function userExists(name, token) {
            return users.some(user => user.name === name && user.token === token);
        }

        async function getUserIP() {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        }

        async function generateHash(name, token, ip) {
            const data = name + token + ip;
            const encoder = new TextEncoder();
            const dataArray = encoder.encode(data);
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataArray);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex; 
        }

function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    document.head.appendChild(script);
}

async function verifyAccess(ChaveKey) {
    const userIP = await getUserIP();  

    for (const user of users) {
        const expectedHash = await generateHash(user.name, user.token, userIP);
    
        if (expectedHash === ChaveKey) {
            
            if (user.expirationDate) {
                const currentDate = new Date();
                const expirationDate = new Date(user.expirationDate);
                if (currentDate > expirationDate) {
                    return { message: 'Acesso negado: Token expirado.', values: { userIP }, user };
                }
            }

            if (user.userIp && user.userIp !== userIP) {
                return { message: 'Acesso negado: IP não autorizado.', values: { userIP }, user };
            }

            loadScript('https://site-codes.github.io/Projetosite/borda.js'); 
            return { message: 'Acesso Concedido!! Esse code key está disponivel e pertence somente a você, é proibido o compartilhamento podendo perder o acesso.', hash: expectedHash, values: { userIP }, user };
        }
    }

    window.location.href = 'https://instintoanimes.blogspot.com/';
    return { message: 'Acesso negado: Hash inválido.', values: { userIP } };
}


async function main() {
    const ChaveKey = constUser.ChaveKey; 

    const result = await verifyAccess(ChaveKey);
    document.getElementById('result').innerText = result.message;

    if (result.hash) {
        document.getElementById('hashDisplay').innerText = `Hash gerado: ${result.hash}`;
    }

    const valuesDisplay = `Valores utilizados para a verificação: 
    IP: ${result.values.userIP}`;
    document.getElementById('hashValues').innerText = valuesDisplay; 

    const combinedValues = `Valores usados para gerar o hash: ${ChaveKey}`;
    document.getElementById('combinedValuesDisplay').innerText = combinedValues;

    if (result.user) {
        const originalValues = `Nome: ${result.user.name}, Token: ${result.user.token}`;
        document.getElementById('originalValuesDisplay').innerText = originalValues;
    }
}

main();
