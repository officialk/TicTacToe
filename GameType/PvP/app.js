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

$(document).ready(function () {
    $(".modal").modal({
        dismissible: false
    });
    $("#enterName").modal("open");
});
