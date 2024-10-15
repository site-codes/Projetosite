// Função para verificar se a data de término é válida
function isTokenValido(dataDeTermino) {
    const dataAtual = new Date();
    return new Date(dataDeTermino) > dataAtual; // Verifica se a data de término é maior que a data atual
}

// Array de usuários com níveis (0 = comum, 1 = adm) e IPs usados
const usuarios = [
    { nome: "11", token: "1111", dataDeTermino: "2024-11-01", nivel: 0, ipUsado: null }, // Usuário Comum
    { nome: "22", token: "2222", dataDeTermino: "2026-10-15", nivel: 0, ipUsado: null },// Usuário Comum
    { nome: "33", token: "3333", dataDeTermino: "2026-10-15", nivel: 0, ipUsado: null }, // Administrador
    { nome: "adm", token: "adm", dataDeTermino: "2024-12-31", nivel: 1, ipUsado: null }  // Usuário Comum
];

// Função para obter os valores de nome e token do usuário
function obterDadosDoUsuario() {
    const nomeInput = constUser.nomeInput; // Definido no HTML
    const tokenInput = constUser.tokenInput; // Definido no HTML
    return { nomeInput, tokenInput };
}

// Função para capturar o IP do usuário usando uma API pública
async function obterIpUsuario() {
    try {
        const resposta = await fetch('https://api.ipify.org?format=json');
        const dados = await resposta.json();
        return dados.ip;
    } catch (erro) {
        console.error("Erro ao obter o IP do usuário:", erro);
        return null;
    }
}

// Seleciona o elemento para exibir a mensagem
const statusElement = document.getElementById('status');

// Função para validar o usuário e exibir a mensagem no HTML
async function verificarUsuario() {
    const { nomeInput, tokenInput } = obterDadosDoUsuario();
    const ipUsuario = await obterIpUsuario();

    if (!ipUsuario) {
        statusElement.textContent = "Erro ao capturar o IP do usuário.";
        return;
    }

    // Procura o usuário com nome e token válidos
    const usuario = usuarios.find(usuario => 
        usuario.nome === nomeInput && 
        usuario.token === tokenInput &&
        isTokenValido(usuario.dataDeTermino)
    );

    // Se o usuário foi encontrado e o token é válido
    if (usuario) {
        // Verifica se o usuário é administrador
        if (usuario.nivel === 1) {
            // Administrador pode acessar de qualquer IP
            document.body.classList.add('border-red');
            statusElement.textContent = "Bem-vindo, Administrador!";
            
            // Salva o IP usado no usuário
            usuario.ipUsado = null; // Mantém como null, pois é admin
            localStorage.setItem(`token_${usuario.token}`, ipUsuario); // Salva o IP do admin no localStorage
            statusElement.textContent += ` Você está logado com o IP ${ipUsuario}!`;
        } else {
            // Usuário comum
            // Verifica se o token já está associado a outro IP
            const tokenEmUso = usuarios.find(u => u.token === tokenInput && u.ipUsado && u.ipUsado !== ipUsuario);
            if (tokenEmUso) {
                statusElement.textContent = "Este token já está em uso por outro IP!";
                document.body.classList.remove('border-red'); // Remove a borda vermelha, se estiver presente
                return;
            }

            // Se o IP do usuário é permitido
            if (usuario.ipUsado === null || usuario.ipUsado === ipUsuario) {
                document.body.classList.add('border-red');
                statusElement.textContent = "Bem-vindo, Usuário Comum!";

                // Salva o IP usado no usuário
                usuario.ipUsado = ipUsuario; // Armazena o IP do usuário comum
                localStorage.setItem(`token_${usuario.token}`, ipUsuario); // Salva o IP no localStorage
                statusElement.textContent += ` Você está logado com o IP ${ipUsuario}!`; // Adiciona o IP à mensagem
            } else {
                // IP não permitido
                statusElement.textContent = "IP não permitido para este token!";
                document.body.classList.remove('border-red'); // Remove a borda vermelha, se estiver presente
            }
        }
    } else {
        // Usuário inválido ou token expirado
        statusElement.textContent = "Usuário inválido ou token expirado! Verifique o nome e o token.";
        document.body.classList.remove('border-red'); // Remove a borda vermelha, se estiver presente
    }
}

// Chama a função para verificar o usuário ao carregar o script
verificarUsuario();
