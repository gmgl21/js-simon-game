$(document).ready(function(){
let sound = {
    "green": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    "red": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    "blue": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    "yellow": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };
let strict = false;
let count = 0;
let playerArray = [];
let currentGame = [];
let tiles = [0,1,2,3];

$('#strictBtn').click(function(){
  if(strict === false){
    strict = true;
    $('#strictBtn').css("background-color", "green");
  } else {
    $('#strictBtn').css("background-color", "yellow");
    strict = false;
  }
});

$('#green').click(function(){
  addToPlayer(0);
  green();
});
$('#red').click(function(){
  addToPlayer(1);
  red();
});
$('#blue').click(function(){
  addToPlayer(2);
  blue();
});
$('#yellow').click(function(){
  addToPlayer(3);
  yellow();
});

function green(){
  $('#green').css("background-color", "green");
  setTimeout(function(){
    sound.green.play();
  }, 150);
  $('#green').addClass('lit');
  setTimeout(function(){
    $('#green').removeClass('lit');
  }, 500);
}

function red(){
  $('#red').css("background-color", "red");
  setTimeout(function(){
    sound.red.play();
  }, 150);
  $('#red').addClass('lit');
  setTimeout(function(){
    $('#red').removeClass('lit');
  }, 500);
}

function blue(){
  $('#blue').css("background-color", "blue");
  setTimeout(function(){
    sound.blue.play();
  }, 150);
  $('#blue').addClass('lit');
  setTimeout(function(){
    $('#blue').removeClass('lit');
  }, 500);
}

function yellow(){
  $('#yellow').css("background-color", "yellow");
  setTimeout(function(){
    sound.yellow.play();
  }, 150);
  $('#yellow').addClass('lit');
  setTimeout(function(){
    $('#yellow').removeClass('lit');
  }, 500);
}

$('#start').click(newGame);

function newGame(){
  resetGame();
}
$('#resetBtn').click(resetGame);
function resetGame(){
  currentGame = [];
  count = 0;
  addCount();
}

function addCount(){
    count++;
    if(currentGame.length < 10) {
      $('#displayText').text('0' + count);
      makePattern();
    } else {
      $('#displayText').text(count);
      makePattern();
    }
}

function makePattern(){
  currentGame.push(tiles[(Math.floor(Math.random()*4))]);
  showPattern();
}

function showPattern(){
  resetPlayer();
  let i = 0;
  let moves = setInterval(function(){
    playGame(currentGame[i]);
    i++;
    if(i >= currentGame.length){
      clearInterval(moves);
    }
  }, 1000)
}

function playGame(tile){
  switch(tile){
    case 0:
      green();
      break;
    case 1:
      red();
      break;
    case 2:
      blue();
      break;
    case 3:
      yellow();
      break;
  }
}


function resetPlayer(){
  playerArray = [];
}

function addToPlayer(id){
    playerArray.push(id);
    playerMove(id);
}

function playerMove(id){
  if(playerArray[playerArray.length-1] !== currentGame[playerArray.length-1]){
    if(strict === true){
      alert("WRONG! Game Over...New Game");
      newGame();
    } else{
      alert("WRONG! Try Again");
      showPattern();
      }
   }else{
    console.log("GOOD MOVE");
    switch (id){
      case 0:
        green();
        break;
      case 1:
        red();
        break;
      case 2:
        blue();
        break;
      case 3:
        yellow();
        break;
    }
    let check = playerArray.length === currentGame.length;
    if(check){
      if(count===20){
        alert("CONGRATS! YOU WIN!");
      } else{
        alert('Next round!');
        addCount();
      }
    }
  }
}
});
