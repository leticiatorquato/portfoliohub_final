//variável da música ambiente
const musica= document.getElementById("musica_ambiente");

//variáveis do pulmão e da borda
const pulmao= document.getElementById("pulmao");    
const borda= document.getElementById("borda");

//inicia a música ao clicar na página
document.addEventListener("click", function() {
    musica.volume=0.2;
    musica.play();
}, { once: true } //faz com que o evento seja disparado apenas uma vez
);

//variáveis do temporizador
let tempototal;
let temporestante;
let intervalo;
let segundo;
let minuto;

//função que formata o tempo em mm:ss
function formatartempo(segundo){
    minuto= Math.floor(segundo/60);
    segundo= segundo % 60;
    return String(minuto).padStart(2,'0') + ':' + String(segundo).padStart(2,'0');
}

//função do botão iniciar
function iniciar() {
    //define o tempo que deve aparecer no temporizador ao clicar no botão iniciar
    if (!intervalo){ 
        if (temporestante === undefined){
            minuto= parseInt(document.getElementById("input_minuto").value) || 0;
            segundo= parseInt(document.getElementById("input_segundo").value) || 0;
            tempototal=minuto*60+segundo;
            temporestante=tempototal;
            
        }

        //inicializa as animações do pulmão e da borda ao clicar no botão de iniciar
        pulmao.style.animationPlayState = 'running';
        borda.style.animationPlayState = 'running';

        //atualiza o tempo do temporizador
        intervalo= setInterval(() => {
            document.getElementById('temporizador').textContent= formatartempo(temporestante);
             temporestante--;
            
            //para o temporizador quando acaba o tempo
             if(temporestante<=0) {
                clearInterval(intervalo);
                intervalo=null;
                pulmao.style.animationPlayState = 'paused';
                borda.style.animationPlayState = 'paused';
                document.getElementById('temporizador').textContent= 'Ciclo encerrado 😮‍💨🍃';
             }
        }, 1000);
    }
}

//função que pausa a animação e o temporizador ao clicar no botão de pausar
function pausar() {
    clearInterval(intervalo);

    pulmao.style.animationPlayState = 'paused';
    borda.style.animationPlayState = 'paused';
}

//função que para a animação e o temporizador e os reinicia
function resetar() {
  clearInterval(intervalo);
  intervalo = null;

  //atualiza o temporizador com o valor do input atual
  minuto= parseInt(document.getElementById("input_minuto").value) || 0;
  segundo= parseInt(document.getElementById("input_segundo").value) || 0;
  tempototal=minuto*60+segundo;
  temporestante=tempototal;

  document.getElementById('temporizador').textContent = formatartempo(temporestante);

  //pausa as animações do pulmão e da borda
  pulmao.style.animation = 'none';
  borda.style.animation = 'none';
  
  //reinicia as animações do pulmão e da borda
  //setTimeout garante que o navegador leia primeiro a pausa das animações para depois reiniciá-las
  setTimeout(() => {
    pulmao.style.animation = 'pulsar 16s infinite';
    borda.style.animation = 'carregarborda 16s infinite';
    pulmao.style.animationPlayState = 'paused';
    borda.style.animationPlayState = 'paused';
    }, 10);
    
  //assegura que na próxima vez que o iniciar for executado, o temporizador pegue o tempo atual
  temporestante= undefined;
}
    

    

