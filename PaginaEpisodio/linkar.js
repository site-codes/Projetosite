// URL Base64 codificada
const base64Encoded = 'aHR0cHM6Ly9zaXRlLWNvZGVzLmdpdGh1Yi5pby9Qcm9qZXRvc2l0ZS9QYWdpbmFFcGlzb2Rpby8=';

// Função para decodificar Base64
function decodeBase64(base64Str) {
    return atob(base64Str);
}

// Decodifica a URL base
const base = decodeBase64(base64Encoded);

// Chaves de licença válidas codificadas em Base64
const validLicenseKeysBase64 = [
    "Q3JpYWRvIFBvciBJbnN0aW50byBQbGF5"
]; 

function decodeBase64Keys(keys) {
    return keys.map(key => atob(key)); 
}

function validateLicense(key) {
    const validLicenseKeys = decodeBase64Keys(validLicenseKeysBase64);
    return validLicenseKeys.includes(key);
}


// Verifica a chave
if (validateLicense(userLicenseKey)) {
    // Usando document.write() para adicionar o script
    document.write(`<script src="${base}js/geral.js"><\/script>`);

    // Usando document.write() com a variável base
    document.write(`<script src="${base}Player/geral.js"><\/script>`);
} else {
    alert("Chave de licença inválida!");
}

const stylesheets = [
    `${base}Player/geral.css`,
    `${base}css/geral.css`,
    `${base}css/outros.css`,
    `${base}css/responsive.css`
];

stylesheets.forEach(href => {
    const style = document.createElement('link');
    style.href = href;
    style.rel = 'stylesheet';
    document.head.appendChild(style);
});
