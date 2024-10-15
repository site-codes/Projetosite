const usuarios = [
    { nome: "111", token: "1111", dataDeTermino: "2024-11-01", userType: 0 },
    { nome: "22", token: "2222", dataDeTermino: "2026-10-15", userType: 0 },
    { nome: "33", token: "3333", dataDeTermino: "2026-10-15", userType: 0 },
    { nome: "adm", token: "adm", dataDeTermino: "2024-12-31", userType: 1 }
];

// Função para obter o IP do usuário usando uma API
async function obterIpUsuario() {
    try {
        const response = await fetch('https://api.ipify.org?format=json'); // API para obter o IP
        const data = await response.json();
        return data.ip; // Retorna o IP
    } catch (error) {
        console.error('Erro ao obter IP:', error);
        return null; // Retorna null em caso de erro
    }
}

// Função para verificar se a data de término é válida
function isTokenValido(dataDeTermino) {
    const dataAtual = new Date();
    return new Date(dataDeTermino) > dataAtual; // Verifica se a data de término é maior que a data atual
}

// Função para verificar se o token está na lista de usuários
function tokenEstaNaLista(token) {
    return usuarios.some(usuario => usuario.token === token);
}

// Função para verificar se um token já está sendo usado por outro IP
function tokenJaUsadoPorOutroIP(token, ipUsuario) {
    const tokenUsadoPorIp = localStorage.getItem(`tokenUsadoPorIp_${token}`);
    return tokenUsadoPorIp && tokenUsadoPorIp !== ipUsuario;
}

// Função para salvar o IP do usuário que usou o token
function salvarTokenUsadoPorIP(token, ipUsuario) {
    localStorage.setItem(`tokenUsadoPorIp_${token}`, ipUsuario);
}

async function validarUsuario() {
    const ipUsuario = await obterIpUsuario(); // Obtendo o IP do usuário
    if (!ipUsuario) {
        document.getElementById('status').textContent = "Não foi possível obter o IP do usuário.";
        return;
    }

    // Obtenha os valores do usuário a partir de constUser
    const nomeInput = constUser.nomeInput; 
    const tokenInput = constUser.tokenInput;

    // Verifica se o usuário já usou um token pessoal
    const tokenPessoalUsado = localStorage.getItem(`tokenPessoal_${ipUsuario}`);
    const tokenAdmUsado = localStorage.getItem(`tokenAdm_${ipUsuario}`);

    const usuarioAtual = usuarios.find(usuario => usuario.nome === nomeInput && usuario.token === tokenInput);

    if (usuarioAtual) {
        // Se o usuário for do tipo ADM, ele pode logar independentemente do IP
        if (usuarioAtual.userType === 1) {
            // Verifica se o administrador já usou o token de administrador
            if (tokenAdmUsado && tokenAdmUsado !== tokenInput) {
                document.getElementById('status').textContent = "Você já usou o token de administrador.";
                return;
            }

            // Valida o token de administrador
            if (isTokenValido(usuarioAtual.dataDeTermino)) {
                document.body.classList.add('border-red');
                document.getElementById('status').textContent = "Usuário ADM válido! Borda vermelha adicionada.";
                localStorage.setItem(`tokenAdm_${ipUsuario}`, tokenInput); // Armazena o token de adm usado
            } else {
                document.getElementById('status').textContent = "Token ADM expirado!";
                document.body.classList.remove('border-red');
            }
            return;
        }

        // Verifica se o token já está sendo usado por outro IP
        if (tokenJaUsadoPorOutroIP(tokenInput, ipUsuario)) {
            const ipEmUso = localStorage.getItem(`tokenUsadoPorIp_${tokenInput}`);
            document.getElementById('status').textContent = `Este token já está sendo usado em outro IP: ${ipEmUso}`;
            document.body.classList.remove('border-red');
            return;
        }

        // Verifica se o token pessoal anterior está na lista de usuários
        if (tokenPessoalUsado && !tokenEstaNaLista(tokenPessoalUsado)) {
            localStorage.removeItem(`tokenPessoal_${ipUsuario}`);
            document.getElementById('status').textContent = "Token anterior foi removido. Você pode usar um novo token.";
        } else if (tokenPessoalUsado && tokenPessoalUsado !== tokenInput) {
            document.getElementById('status').textContent = "Você já usou um token pessoal! Apenas um token pode ser utilizado por IP.";
            document.body.classList.remove('border-red');
            return;
        }

        // Verifica se o token é válido
        if (isTokenValido(usuarioAtual.dataDeTermino)) {
            document.body.classList.add('border-red');
            document.getElementById('status').textContent = "Usuário válido! Borda vermelha adicionada.";
            localStorage.setItem(`tokenPessoal_${ipUsuario}`, tokenInput); // Armazena o token pessoal usado
            salvarTokenUsadoPorIP(tokenInput, ipUsuario); // Salva o IP que está usando o token
        } else {
            document.getElementById('status').textContent = "Token pessoal expirado!";
            document.body.classList.remove('border-red');
        }
    } else {
        document.body.classList.remove('border-red');
        document.getElementById('status').textContent = "Usuário inválido! Verifique o nome e o token.";
    }
}

// Chama a função de validação ao carregar a página
validarUsuario();
