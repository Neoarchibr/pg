// elemento de par�grafo para exibi��o de mensagem 
var msgP = document.getElementById("msgP");
// elemento de canvas - �rea onde ser� desenhado o jogo 
var canvas = document.getElementById("myCanvas");
// para desenhar no canvas utilizamos o contexto de desenho do canvas
// todos os comandos de desenho devem ser feitos sobre o contexto
// (estamos dando o nome ctx para o contexto deste canvas para facilitar o acesso
var ctx = canvas.getContext("2d");

//vari�veis que representam a nossa bolinha...
var bolaX, bolaY, velBolaX, velBolaY;
//valores iniciais para nossa bolinha
bolaX = 25; // lado esquerdo da tela 
bolaY = canvas.height/2;  //centro da tela na vertical
velBolaX = 1; //inicia andando para a direita.
// por enquanto nossa bola somente se mexe na dire��o X. Como seria para mover no Y???
velBolaY = 1;

//vari�veis que representam nosso jogador...
var jogador1X, jogador1Y;
//valores iniciais para nosso jogador:
jogador1X = 5;  //  jogador � direita da tela... 
jogador1Y = canvas.height/2;


//vari�veis para armazenar a posi��o do mouse
//estes valores ser�o atualizados em uma fun��o para tratar eventos...
var mouseX, mouseY;


//esta instru��o faz com que a fun��o para atuliza��o do rel�gio seja chamada 60 vezes por segundo,
//ou seja, devemos executar a fun��o de desenho a cada 60/1000 milisegundos
setInterval(loop, 60/1000);

canvas.addEventListener('mousemove', atualizaPosMouse);

// esta � a fun��o que faz a atualiza��o da tela
// soemnte ser� executada atrav�s do setInterval definido acima...
function loop()
{
	// escreve a posi��o do mouse na �rea de mensagens
	msgP.innerHTML = "Mouse - (" + mouseX + "," + mouseY + ")";
   
   // precisamos apagar o fundo todas as vezes...
   ctx.fillStyle = "black";
   ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// e depois desenhar a bolinha...
	ctx.fillStyle = "white";
	ctx.fillRect(bolaX, bolaY, 20, 20);

	//atualiza a posi��o do jogador
   jogador1Y = mouseY;
   
	// agora desenhamos o jogador...
	ctx.fillStyle = "white";
	ctx.fillRect(jogador1X, jogador1Y, 20, 70);
   
   //calcula a pr�xima posi��o da bolinha...
	bolaX += velBolaX;
	bolaY += velBolaY;
   
   var colisao = false;

   if(bolaX == 25){
      if( bolaY >= jogador1Y && (bolaY + 20) <= (jogador1Y + 70)){
         colisao = true;
      }  
   }

   //testa se a bolinha bateu na parede vertical.
   //Note que a bolinha entra pela parede direita, mas n�o pela esquerda... Por que?
   if(((bolaX + 20) >= canvas.width && velBolaX > 0) || colisao){ 
      velBolaX = -velBolaX; //faz a vel da bola ficar negativa para q ela volte
   }
   
   if(bolaX <= 0 && velBolaX < 0){ //faz a velocidade da bola ficar positiva novamente
      velBolaX = -velBolaX;
   }

   if((bolaY + 20) >= canvas.height && velBolaY > 0){ 
      velBolaY = -velBolaY; //faz a vel da bola ficar negativa para q ela volte
   }
   
   if(bolaY <= 0 && velBolaY < 0){ //faz a velocidade da bola ficar positiva novamente
      velBolaY = -velBolaY;
   }

}//termino da fun��o loop

function atualizaPosMouse(evento){
	
	// atualiza a posi��o do mouse em rela��o ao canvas...
    var rect = canvas.getBoundingClientRect();
	 mouseX = Math.round(evento.clientX - rect.left);
    mouseY = Math.round(evento.clientY - rect.top);
}

