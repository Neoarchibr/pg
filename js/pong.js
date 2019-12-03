console.log("código js"); // para achar o código js no browser

const canvas = document.getElementById ("mycanvas");
const ctx = canvas.getContext ("2d");

// x e y = coordenadas no canvas

var usuario = {
    x : 5,
    y : (canvas.height/2 - 100)/2,
    width : 20,
    height : 100,
    color : "white",
    score : 0
}

var computador = {
    x : canvas.width - 25,
    y : (canvas.height/2 - 100)/2,
    width : 20,
    height : 100,
    color : "white",
    score : 0
}

const bola = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    speed : 7,
    velocityX : 5,
    velocityY : 5,
    color : "white",
    score : 0
}

const rede = {
    x : (canvas.width - 2)/2,
    y : 0,
    width : 2,
    height : 10,
    color : "white"
}


function startGame(){ //executa tudo quando o botão for apertado

    function drawRect(x,y,w,h,color){
        // desenha retângulos
        ctx.fillStyle = color;
        ctx.fillRect(x,y,w,h); // (x,y,w,h)
    }
    
    function drawCircle(x,y,r,color){
        // parâmetros p/ desenhar a bola
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0,Math.PI*2, false); // (x,y,r,angle,cw/ccw) cw=clockwise cct=counterclockwise
        ctx.closePath();
        ctx.fill();
    }
    
    function drawText(text,x,y,color){
        //texto durr
        ctx.fillStyle = color;
        ctx.font = "45px fantasy";
        ctx.fillText(text,x,y)
    }
    
    function drawNet(){
        //desenha a rede no meio (basicamente um monte de retângulos)
        for(let i = 0; i <= canvas.height; i+=15){ //+= é variável = variável + valor
            drawRect(rede.x, rede.y + i, rede.width, rede.height, rede.color);
        }
    }
    
    
    
    function render(){
        //chama a função drawRect e limpa td (nesse caso)
        drawRect(0, 0, canvas.width, canvas.height, "black");
    
        drawNet();
    
        //escreve o texto
        drawText(usuario.score, canvas.width/4, canvas.height/5, "white");
        drawText(computador.score, 3*canvas.width/4, canvas.height/5, "white");
    
        //desenha a barra do usuario e do computador
        drawRect(usuario.x, usuario.y, usuario.width, usuario.height, usuario.color);
        drawRect(computador.x, computador.y, computador.width, computador.height, computador.color);
    
        //desenha a bola
        drawCircle(bola.x, bola.y, bola.radius, bola.color);
    }
    
    
    // controle da barra do usuario
    canvas.addEventListener("mousemove",moveBarra);
    
    function moveBarra(evt){
        let rect = canvas.getBoundingClientRect();
    
        usuario.y = evt.clientY - rect.top - usuario.height/2;
    }
    
    // detectar colisão
    function colisão(b,p){ //b é bola e p é player (jogador)
        b.top = b.y - b.radius;
        b.bottom = b.y + b.radius;
        b.left = b.x - b.radius;
        b.right = b.x + b.radius;
    
        p.top = p.y;
        p.bottom = p.y + p.height;
        p.left = p.x;
        p.right = p.x + p.width;
    
        return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
    }
    
    
    //reseta a bola
    function resetBola(){
        bola.x = canvas.width/2;
        bola.y = canvas.height/2;
    
        bola.speed = 7;
        bola.velocityX = -bola.velocityX;
    }
    
    // update = posição, movimento, pontos etc
    function update(){
        bola.x += bola.velocityX;
        bola.y += bola.velocityY;
    
        // AI simples p/ controlar a barra do computador
        let nivelComp = 0.1;
        computador.y += (bola.y - (computador.y + computador.height/2)) * nivelComp;
    
        if(bola.y - bola.radius < 0 || bola.y + bola.radius > canvas.height){
            bola.velocityY = -bola.velocityY;
        }
    
        let player = (bola.x + bola.radius < canvas.width/2) ? usuario : computador; // ? é um if numa linha única
    
        if(colisão(bola,player)){
            //onde a bola bate no player
            let pontoColisao = (bola.y - (player.y + player.height/2));
    
            //normalização
            pontoColisao = pontoColisao / (player.height/2);
    
            //calcula angulo em radianos
            let angleRad = pontoColisao * (Math.PI/4);
    
            //direção de x quando a bola bate
            let direção = (bola.x + bola.radius < canvas.width/2) ? 1 : -1;
    
            //muda velocidade x e y
            bola.velocityX = direção * bola.speed * Math.cos(angleRad);
            bola.velocityY = bola.speed * Math.sin(angleRad);
    
            //aumenta a aceleração quando bate na barra
            bola.speed += 0.5;
        }
    
        //atualiza o placar (score)
        if(bola.x - bola.radius < 0){
            // computador vence
            computador.score++; // ++ é igual a +1
            resetBola();
        }
        else if(bola.x + bola.radius > canvas.width){
            // usuario vence
            usuario.score++;
            resetBola();
        }
    
    }
    //início do jogo
    function game(){
        update();
        render();
    }
    
    //loop
    let framePerSecond = 50;
    let loop = setInterval(game,1000/framePerSecond);

    document.getElementById("start").style.visibility = "hidden"; //esconde o botão depois de apertado
}

document.getElementById("start").addEventListener("click", startGame); //faz com q quando o jogador clique no botão o jogo comece
