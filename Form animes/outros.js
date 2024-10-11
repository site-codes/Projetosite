// converter link

function convertToEmbed(url) {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    return '';
}

document.getElementById('animeTrailerLink').addEventListener('input', function() {
    const trailerLink = this.value;
    const embedLink = convertToEmbed(trailerLink);
    const linkConvertInput = document.getElementById('linkconvert');
    
    if (embedLink) {
        linkConvertInput.value = embedLink;
        linkConvertInput.classList.remove('input-error'); // Remove error styling
        linkConvertInput.placeholder = 'Link Convertido'; // Reset placeholder
    } else {
        linkConvertInput.value = '';
        linkConvertInput.classList.add('input-error'); // Add error stylin
        linkConvertInput.placeholder = 'Link inválido'; 
    }
});



// Seleciona todos os botões de rádio com o nome "option"
const radioButtons = document.querySelectorAll('input[name="option"]');
const subanimeInput = document.getElementById('animeDubbedOrSubbed');

// Adiciona um listener de evento 'change' a cada botão de rádio
radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            subanimeInput.value = this.value; // Define o valor do input de texto como o valor do rádio selecionado
            
            // Remove a classe .noinput e reseta o placeholder
            subanimeInput.classList.remove('noinput');
            subanimeInput.placeholder = ''; // Limpa o placeholder se necessário
        }
    });
});

const NotaSite = document.querySelectorAll('input[name="NotaSite"]');
const notaSiteInput = document.getElementById('NotaSite');

// Adiciona um listener de evento 'change' a cada botão de rádio
NotaSite.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            notaSiteInput.value = this.value; // Define o valor do input de texto como o valor do rádio selecionado
            
            // Remove a classe .noinput e reseta o placeholder
            notaSiteInput.classList.remove('noinput');
            notaSiteInput.placeholder = ''; // Limpa o placeholder se necessário
        }
    });
});


const input = document.getElementById('animeRating');
input.addEventListener('input', function() {
    let value = this.value;
    value = value.replace(/,/g, '.');
    value = value.replace(/[\/]/g, '');
    this.value = value;
});




