var plotted = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    name,
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
        "playing": "X"
    };

const initGame = (player1Name, player2Name) => {
    if (player1Name != player2Name && player1Name != "" && player2Name != "") {
        $("#enterName").modal("close");
        //    window.localStorage.setItem("name", player1Name);
        //    window.localStorage.setItem("name2", player2Name);
        setName("player1Name", player1Name);
        setName("player2Name", player2Name);
        player1.name = player1Name;
        player2.name = player2Name;
    } else {
        alert("Enter Proper Info");
    }
}

const setName = (id, name) => {
    document.getElementById(id).innerHTML = name;
}

const plot = (point) => {
    if (plotted[point] == 0 && playable) {
        plotted[point] = charToPlot;
        document.getElementById(`box${point}`).innerHTML = charToPlot;
        charToPlot = (charToPlot == "X" ? "O" : "X");
        let winner = checkWin();
        if (winner != 0) {
            declareWinner(winner);
        } else {
            if (checkDraw()) {
                declareDraw();
            }
        }
    }
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
    playable = false;
    winner[0].forEach(box => {
        blink(`box${box}`, "green white-text");
    })
    if (winner == player1.playing) {
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
        console.log(`box${id}`);
        document.getElementById(`box${id}`).innerHTML = "";
        document.getElementById(`box${id}`).classList.remove("green", "red", "white-text");
        return 0;
    });
    document.getElementById("player1").classList.remove("green", "red", "yellow", "white-text");
    document.getElementById("player2").classList.remove("green", "red", "yellow", "white-text");
}

const resetBoard = () => {
    resetSquares();
    if (player1.playing == "X") {
        player1.playing = "O";
        player2.playing = "X";
    } else {
        player1.playing = "X";
        player2.playing = "O";
    }
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

$(document).ready(function () {
    $(".modal").modal({
        dismissible: false
    });
    $("#enterName").modal("open");
});
