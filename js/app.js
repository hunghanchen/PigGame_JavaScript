/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var score, roundScore, activePlayer, gamePlaying, dicePrevious;
init();
var dicePrevious = 0;




document.querySelector('.btn-roll').addEventListener('click', function () {
    //Do something here 

    if (gamePlaying) {//1.Random number
        var dice_1 = Math.floor(Math.random() * 6) + 1;
        var dice_2 = Math.floor(Math.random() * 6) + 1;

        //2.Display the result
        var diceDOM_1 = document.querySelector('.dice_1');
        diceDOM_1.style.display = 'block';
        diceDOM_1.src = 'image/dice-' + dice_1 + '.png';
        var diceDOM_2 = document.querySelector('.dice_2');
        diceDOM_2.style.display = 'block';
        diceDOM_2.src = 'image/dice-' + dice_2 + '.png';
        //3.Update the round score IF the rolled number was NOT a 1
        if (dice_1 !== 1 && dice_2 !== 1) {
            //Add score
            roundScore += (dice_1 + dice_2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            var diceHistory = [dicePrevious, dice];
            dicePrevious = dice;
            console.log('dicePrevious  ' + diceHistory);
            if (diceHistory[0] == 6 && diceHistory[1] == 6) {
                document.querySelector('#score-' + activePlayer).textContent = 0;
                nextPlayer();
                dicePrevious, dice = 0;
            }
        } else if (dice_1 !== 1 || dice_2 !== 1) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        }
        else {
            //Next player
            dicePrevious, dice = 0;
            nextPlayer();
        }
    }


});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {//Add CURRENT score to GLOBAL score
        score[activePlayer] += roundScore;
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
        var setScore = document.querySelector('.set-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED  to false
        //Anything else id coerced to tue
        if (setScore) {
            winningScore = setScore;
        } else {
            winningScore = 100;
        }

        //Check if player won the game
        if (score[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }



});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // if(activePlayer === 1 ){
    //     document.querySelector('.player-0-panel').classList.remove('active');
    //     document.querySelector('.player-1-panel').classList.add('active');
    // }else{
    //     document.querySelector('.player-1-panel').classList.remove('active');
    //     document.querySelector('.player-0-panel').classList.add('active'); 
    // }

    document.querySelector('.dice_1').style.display = 'none';
    document.querySelector('.dice_2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice_1').style.display = 'none';
    document.querySelector('.dice_2').style.display = 'none';
    //getElementById: we dont have to add # in the front
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');





}