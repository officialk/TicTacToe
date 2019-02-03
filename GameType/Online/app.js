const initPvOnline = (playerName) => {
    if (playerName != "computer" && playerName != "") {
        $("#enterName").modal("close");
        document.getElementById("player2Name").innerHTML = 'Waiting For Player To Join....<div class="progress"><div class="indeterminate"></div></div>';
        document.getElementById("player1Name").innerHTML = `${playerName}::Ready`;
        localStorage.setItem("name", playerName);
        startConnection(playerName);
    } else {
        alert("Enter Proper Info");
    }
}

const plot = (point, opp = false) => {
    if (plotted[point] == 0 && playable) {
        if (!opp) {
            socket.emit("played", {
                oppId: oppId,
                point: point
            });
            playable = false;
            //clearTimeout(timer);
        }
        plotted[point] = charToPlot;
        document.getElementById(`box${point}`).innerHTML = charToPlot;
        document.getElementById(`box${point}`).className += " noPlay";
        charToPlot = (charToPlot == "X" ? "O" : "X");
        let winner = checkWin();
        if (winner != 0) {
            declareWinner(winner);
            //clearTimeout(timer);
        } else {
            if (checkDraw()) {
                //clearTimeout(timer);
                declareDraw();
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
        plot(copy_array[index]);
    }
}

const nextGame = () => {
    exchangePlayer();
    refreshDisplay();
    resetSquares();
    socket.emit("nextGame", oppId);
    playable = ((player1.playing == "X" && player1.id == socket.id) || (player2.id == socket.id && player2.playing == "X"));
}

const exchangePlayer = () => {
    if (player1.playing == "X") {
        player1.playing = "O";
        player2.playing = "X";
    } else {
        player1.playing = "X";
        player2.playing = "O";
    }
}

const leaveGame = () => {
    socket.emit("newGame", oppId);
    initPvOnline(localStorage.getItem('name'));
}

$(document).ready(function () {
    $(".modal").modal({
        dismissible: false
    });
    if (localStorage.getItem("name") == null) {
        $("#enterName").modal("open");
    } else {
        initPvOnline(localStorage.getItem("name"));
    }
});
