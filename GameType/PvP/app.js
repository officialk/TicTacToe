const initPvP = (player1Name, player2Name) => {
    if (player1Name != player2Name && player1Name != "" && player2Name != "") {
        initGame(player1Name, player2Name);
        window.localStorage.setItem("name2", player2Name);
        $("#enterName").modal("close");
    } else {
        alert("Enter Proper Info");
    }
}

const plot = (point) => {
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
            }
        }
    }
}

const nextGame = () => {
    resetSquares();
    if (player1.playing == "X") {
        player1.playing = "O";
        player2.playing = "X";
    } else {
        player1.playing = "X";
        player2.playing = "O";
    }
}

$(document).ready(function () {
    $(".modal").modal({
        dismissible: false
    });
    $("#enterName").modal("open");
});
