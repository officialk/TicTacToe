const initPvC = (playerName) => {
    if (playerName != "computer" && playerName != "") {
        localStorage.setItem("name", playerName);
        initGame(playerName, "Computer");
        $("#enterName").modal("close");
    } else {
        alert("Enter Proper Info");
    }
}

const plot = (point, pcPlay = false) => {
    if (plotted[point] == 0 && playable) {
        plotted[point] = charToPlot;
        document.getElementById(`box${point}`).innerHTML = charToPlot;
        document.getElementById(`box${point}`).className += " noPlay";
        charToPlot = (charToPlot == "X" ? "O" : "X");
        let winner = checkWin();
        if (winner != 0) {
            declareWinner(winner);
        } else {
            if (checkDraw()) {
                declareDraw();
            } else {
                if (!pcPlay) {
                    aiPlays();
                }
            }
        }
    }
}

const aiPlays = () => {
    playable = false;
    let probabilities = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
    probabilities.forEach(probability => {
        if (!playable) {
            let first = plotted[probability[0]];
            let second = plotted[probability[1]];
            let third = plotted[probability[2]];
            if (third == second && (third != 0 && first == 0)) {
                playable = true;
                plot(probability[0], true);
            } else if (first == third && (first != 0 && second == 0)) {
                playable = true;
                plot(probability[1], true);
            } else if (first == second && first != 0 && third == 0) {
                playable = true;
                plot(probability[2], true);
            }
        }
    });
    if (!playable) {
        let copy_array = [];
        plotted.forEach((data, index) => {
            if (data == 0) {
                copy_array.push(index);
            }
        });
        let index = Math.round(Math.random() * (copy_array.length - 1));
        playable = true;
        pcPlay = false;
        plot(copy_array[index], true);
    }
}

const nextGame = () => {
    resetSquares();
    if (player1.playing == "X") {
        player1.playing = "O";
        player2.playing = "X";
        aiPlays();
    } else {
        player1.playing = "X";
        player2.playing = "O";
    }
}

$(document).ready(function () {
    $(".modal").modal({
        dismissible: false
    });
    if (localStorage.getItem("name") == null) {
        $("#enterName").modal("open");
    } else {
        initPvC(localStorage.getItem("name"));
    }
});
