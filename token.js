// Função para verificar se a data de término é válida
function isTokenValido(dataDeTermino) {
    const dataAtual = new Date();
    return new Date(dataDeTermino) > dataAtual; // Verifica se a data de término é maior que a data atual
}

// Array de usuários com níveis (0 = comum, 1 = adm) e IPs usados
const usuarios = [
    { nome: "11", token: "1111", dataDeTermino: "2024-11-01", nivel: 0, ipUsado: null }, // Usuário Comum
    { nome: "22", token: "2222", dataDeTermino: "2026-10-15", nivel: 1, ipUsado: null }, // Administrador
    { nome: "33", token: "3333", dataDeTermino: "2024-12-31", nivel: 0, ipUsado: null }  // Usuário Comum
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

// Função para salvar o token e o IP no localStorage
function salvarTokenEIP(token, ip) {
    localStorage.setItem(`token_${token}`, ip);
}

// Função para verificar se o token e IP já estão salvos no localStorage
function obterTokenEIP(token) {
    return localStorage.getItem(`token_${token}`);
}

// Função para validar o usuário e exibir a mensagem no HTML
async function verificarUsuario() {
    const { nomeInput, tokenInput } = obterDadosDoUsuario();
    const ipUsuario = await obterIpUsuario();

    if (!ipUsuario) {
        statusElement.textContent = "Erro ao capturar o IP do usuário.";
        return;
    }

    // Verifica se o token já tem um IP salvo no localStorage
    const ipSalvo = obterTokenEIP(tokenInput);

    // Procura o usuário com nome e token válidos
    const usuario = usuarios.find(usuario => 
        usuario.nome === nomeInput && 
        usuario.token === tokenInput &&
        isTokenValido(usuario.dataDeTermino)
    );

    if (usuario) {
        // Se o token já está associado a um IP diferente
        if (ipSalvo && ipSalvo !== ipUsuario && usuario.nivel === 0) {
            statusElement.textContent = "Este token já está em uso por outro IP!";
            document.body.classList.remove('border-red');
            return;
        }

        // Administrador pode acessar de qualquer IP
        if (usuario.nivel === 1) {
            document.body.classList.add('border-red');
            statusElement.textContent = "Bem-vindo, Administrador!";
            
            // Salva o IP no localStorage (mesmo para administradores, por consistência)
            salvarTokenEIP(usuario.token, ipUsuario);
            statusElement.textContent += ` Você está logado com o IP ${ipUsuario}!`;
        } else {
            // Usuário comum
            if (!ipSalvo || ipSalvo === ipUsuario) {
                document.body.classList.add('border-red');
                statusElement.textContent = "Bem-vindo, Usuário Comum!";
                
                // Associa o token ao IP atual se ainda não houver um IP salvo
                usuario.ipUsado = ipUsuario;
                salvarTokenEIP(usuario.token, ipUsuario);
                statusElement.textContent += ` Você está logado com o IP ${ipUsuario}!`;
            } else {
                // Caso o token já esteja em uso por outro IP
                statusElement.textContent = "Este token já está em uso por outro IP!";
                document.body.classList.remove('border-red');
            }
        }
    } else {
        statusElement.textContent = "Usuário inválido ou token expirado! Verifique o nome e o token.";
        document.body.classList.remove('border-red');
    }
}

// Chama a função para verificar o usuário ao carregar o script
verificarUsuario();
