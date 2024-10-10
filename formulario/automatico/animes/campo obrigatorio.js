
  
  // Função para exibir a mensagem de preenchimento obrigatório
  function showRequiredMessage() {
    const respostaMessage = document.querySelector('.resposta');
    respostaMessage.style.display = 'flex'; // Exibe a mensagem
  
    // Oculta a mensagem após 2 segundos
    setTimeout(() => {
      respostaMessage.style.display = 'none';
    }, 2000);
  }
  
  // VER CODE
  function viewCode() {
    if (areAllRequiredInputsFilled()) {
      const modalCode = document.querySelector('.modalCode');
      
      if (modalCode.style.display === 'none' || modalCode.style.display === '') {
        modalCode.style.display = 'flex'; 
        addModeClass(); 
      } else {
        modalCode.style.display = 'none'; 
      }
    } else {
      showRequiredMessage(); // Exibe a mensagem de preenchimento obrigatório
    }
  }
  
  // COPIAR CÓDIGO
  function copyCode() {
    if (areAllRequiredInputsFilled()) {
      const seasonContent = document.getElementById('seasonContent');
      const mensagem = document.querySelector('.mensagem');
  
      // Cria um elemento de textarea temporário para usar o método `execCommand`
      const textarea = document.createElement('textarea');
      textarea.value = seasonContent.textContent;
      document.body.appendChild(textarea);
      textarea.select(); // Seleciona o texto no textarea
  
      // Copia o texto selecionado para a área de transferência
      document.execCommand('copy');
  
      // Remove o elemento textarea após a cópia
      document.body.removeChild(textarea);
  
      // Mostra a mensagem de sucesso
      mensagem.style.display = 'flex';
  
      // Oculta a mensagem após 1 segundo
      setTimeout(() => {
          mensagem.style.display = 'none';
      }, 1000);
  
      viewCode();
    } else {
      showRequiredMessage(); // Exibe a mensagem de preenchimento obrigatório
    }
  }
  
  // Adiciona ouvintes para todos os inputs obrigatórios
  const requiredInputs = document.querySelectorAll('input[required]');
  requiredInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.classList.remove('noinput'); // Remove a classe .noinput se estiver preenchido
        input.placeholder = ''; // Reseta o placeholder para o valor original
      }
    });
  });
  