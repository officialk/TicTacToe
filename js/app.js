var plotted = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    playable = true,
    charToPlot = "X",
    player1 = {
        "name": "",
        "score": 0,
        "playing": "X"
    },
    player2 = {
        "name": "",
        "score": 0,
        "playing": "O"
    };

const initGame = (player1Name, player2Name) => {
    window.localStorage.setItem("name", player1Name);
    setName("player1Name", player1Name);
    setName("player2Name", player2Name);
    player1.name = player1Name;
    player2.name = player2Name;
}

const setName = (id, name) => {
    document.getElementById(id).innerHTML = name;
}

const checkWin = () => {
    var check = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
    for (var i = 0; i < check.length; i++) {
        if (plotted[check[i][0]] == plotted[check[i][1]] && plotted[check[i][1]] == plotted[check[i][2]] && plotted[check[i][0]] != 0) {
            var blocks = check[i];
            var winner = plotted[check[i][0]];
            return ([blocks, winner]);
        }
    }
    return 0;
}

const checkDraw = () => {
    for (var i = 0; i < 9; i++) {
        if (plotted[i] == 0) {
            return false;
        }
    }
    return true;
}

const declareWinner = winner => {
    console.log(winner);
    playable = false;
    winner[0].forEach(box => {
        blink(`box${box}`, "green white-text");
    })
    if (winner[1] == player1.playing) {
        blink("player1", "green white-text");
        blink("player2", "red white-text");
        player1.score++;
    } else {
        blink("player1", "red white-text");
        blink("player2", "green white-text");
        player2.score++;
    }
    refreshDisplay();
    showOptions(true);
}

const declareDraw = () => {
    playable = false;
    blink("player1", "yellow white-text");
    blink("player2", "yellow white-text");
    showOptions(true);
}

const blink = (id, className) => {
    document.getElementById(id).className += " " + className;
}

const refreshDisplay = () => {
    document.getElementById("player1Score").innerHTML = player1.score;
    document.getElementById("player2Score").innerHTML = player2.score;
}

const resetSquares = () => {
    playable = true;
    charToPlot = "X";
    showOptions(false);
    plotted = plotted.map((box, id) => {
        document.getElementById(`box${id}`).innerHTML = "";
        document.getElementById(`box${id}`).classList.remove("green", "red", "white-text");
        return 0;
    });
    document.getElementById("player1").classList.remove("green", "red", "yellow", "white-text", "noPlay");
    document.getElementById("player2").classList.remove("green", "red", "yellow", "white-text", "noPlay");
}

const resetGame = () => {
    player1.playing = "X";
    player2.playing = "O";
    player1.score = 0;
    player2.score = 0;
    resetSquares();
    refreshDisplay();
}

const showOptions = show => {
    document.getElementById("options").style.visibility = show ? "visible" : "hidden";
}
