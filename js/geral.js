    
     
  // Page episodio ====================================================================
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  // Formatar data no formato dd/mm/yyyy
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  // Função para calcular a diferença de tempo entre duas datas
  function calculateTimeRemaining(date1, date2) {
    const diffTime = date2 - date1;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);
    return { diffDays, diffHours, diffMinutes, diffSeconds };
  }
  
  // Atualizar contagem regressiva
  function updateCountdown() {
    // Obter a data de #datepost
    const datepost = document.getElementById('datepost').innerText.trim();
    const [day, month, year] = datepost.split('/').map(Number);
    const postDate = new Date(year, month - 1, day); // Criar objeto Date
  
    // Adicionar 7 dias
    const nextDate = addDays(postDate, 7);
  
    // Formatar a nova data
    const formattedNextDate = formatDate(nextDate);
  
    // Calcular o tempo restante
    const currentDate = new Date();
    const { diffDays, diffHours, diffMinutes, diffSeconds } = calculateTimeRemaining(currentDate, nextDate);
  
    // Atualizar data-next
    const h7Element = document.querySelector('h7[data-next]');
  
    if (nextDate < currentDate) {
      h7Element.setAttribute('data-next', '');
      h7Element.innerText = 'Próximo Episódio já disponível';
    } else {
      let timeRemainingString = '';
      if (diffDays > 0) {
        timeRemainingString += `${diffDays} dias, `;
      }
      timeRemainingString += `${diffHours} horas ${diffMinutes} minutos e ${diffSeconds}s`;
  
      h7Element.setAttribute('data-next', formattedNextDate);
  
      if (window.innerWidth < 700) {
        h7Element.innerText = `Próx. Ep. em ${timeRemainingString}`;
      } else {
        h7Element.innerText = `Próximo Episódio previsto para ${formattedNextDate} (${timeRemainingString})`;
      }
    }
  }
  
  // Atualizar a contagem regressiva a cada segundo
  setInterval(updateCountdown, 1000);
  
  // Inicializar a contagem regressiva
  updateCountdown();
  
  // Adicionar um listener para a mudança de tamanho da janela
  window.addEventListener('resize', updateCountdown);
  



    
    
    
    
    
    document.addEventListener('DOMContentLoaded', function() {
    const dateep = document.querySelector('.dateep').innerText;
    const nextepdateSpan = document.querySelector('.nextepdate span');
    const nextepdateDiv = document.querySelector('.nextepdate');
    const comentareppgDiv = document.querySelector('.comentareppg');
    const listepspgepDiv = document.querySelector('.listepspgep');
  
    // Função para adicionar dias a uma data
    function addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  
    // Função para formatar a data no formato DD/MM/YYYY
    function formatDate(date) {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  
    // Função para calcular a diferença em dias e horas
    function calculateTimeDifference(futureDate) {
      const now = new Date();
      const timeDiff = futureDate - now;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${days} dias e ${hours}h`;
    }
  
    // Função para verificar se a data atual é maior ou igual a uma data específica
    function isDatePastOrEqual(date) {
      const now = new Date();
      return now >= date;
    }
  
    // Converte a dataep para um objeto Date
    const initialDate = new Date(dateep.split('/').reverse().join('-'));
  
    // Calcula a nova data adicionando 7 dias
    const newDate = addDays(initialDate, 7);
    const formattedNewDate = formatDate(newDate);
  
    // Atualiza o conteúdo do nextepdateSpan
    nextepdateSpan.innerHTML = `${formattedNewDate} (<h8 class="cronometroepn">${calculateTimeDifference(newDate)}</h8>)`;
  
    // Verifica se a data atual é maior ou igual à data do nextepdateSpan
    if (isDatePastOrEqual(newDate)) {
      nextepdateDiv.classList.add('offdunger');
      comentareppgDiv.classList.add('offdunger');
      listepspgepDiv.classList.add('offdunger');
    }
  
    // Atualiza o cronômetro a cada hora
    setInterval(function() {
      document.querySelector('.cronometroepn').innerText = calculateTimeDifference(newDate);
      if (isDatePastOrEqual(newDate)) {
        nextepdateDiv.classList.add('offdunger');
        comentareppgDiv.classList.add('offdunger');
        listepspgepDiv.classList.add('offdunger');
      }
    }, 3600000); // 3600000 ms = 1 hora
  });

  


    // button expoandir
  document.querySelector('.expand').addEventListener('click', function() {
    const playerPage = document.getElementById('playerpage');
    playerPage.classList.toggle('expand');
    this.classList.toggle('expand');
  });
    
// button dos eps mobile
document.getElementById("push").addEventListener("click", function () {
    this.classList.toggle("push"); 
    const playerPage = document.getElementById('playerpage');
    playerPage.classList.toggle('push');
    document.getElementById("iframeeps").classList.toggle("push");

    // Verifica se #push recebeu a classe .push
    const comment = document.getElementById("comment");
    if (this.classList.contains("push")) {
        comment.style.display = "none";
    } else {
        comment.style.display = ""; 
    }
});



//iframe para oculpar todo espaço
function resizeIframe() {
    var iframe = document.getElementById('iframeeps');
    if (iframe) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    }
}

window.onload = resizeIframe;
window.onresize = resizeIframe;



let link = document.createElement('link');
link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'https://site-codes.github.io/Projetosite/pageEpisodio.css';

document.querySelector('head').appendChild(link);

