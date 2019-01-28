$(document).ready(function () {
    $('.tooltipped').tooltip();
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
});

$(document).ready(function () {
    $("#start").modal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        opacity: 0.6, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '26%'
    });
    $("#start").modal("open");
    $("#winnerScreen").modal();
});
var ai, aiPlaysAfter, player, box, playing, play, pausePlay;
var initVars = function () {
    ai = false;
    aiPlaysAfter = 2;
    play = ['X', 'O'];
    player = [
    //player 1/AI
        {
            playing: play[0],
            score: 0,
            name: ""
    },
    //player 2/AI
        {
            playing: play[1],
            score: 0,
            name: ""
    }
];
    box = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    playing = 0;
    pausePlay = false;
}
var checkBox = function (index) {
    if (box[index] == 0 && !pausePlay) {
        if (playing == 0) {
            box[index] = play[playing];
            document.getElementsByClassName("box")[index].innerHTML = play[playing];
            playing = 1;
            if (ai == true && aiPlaysAfter == playing && checkDraw() == false && checkWinner() == false) {
                aiPlay();
            }
        } else {
            box[index] = play[playing];
            document.getElementsByClassName("box")[index].innerHTML = play[playing];
            playing = 0;
            if (ai == true && aiPlaysAfter == playing && checkDraw() == false && checkWinner() == false) {
                aiPlay();
            }
        }
        if (checkDraw() == true) {
            $("#winner").html("Winner:No One[DRAW]");
            $("#winnerScreen").modal("open");
            pausePlay = true;
        }
        if (checkWinner() == true) {
            pausePlay = true;
        }
    }
};
var checkWinner = function () {
    var winner = checkWin();
    if (winner.length == 2) {
        var ans = winner["0"];
        var win = winner["1"];
        $("#winner").html("Winner:" + win);
        player[(playing + 1) % 2].score += 1;
        document.getElementById("p" + (((playing + 1) % 2) + 1) + "Points").innerHTML = player[(playing + 1) % 2].score;
        $("#winnerScreen").modal("open");
        return true;
    }
    return false;
}
var initPlayer = function () {
    var player1 = $("#pl1Name").val();
    var player2 = $("#pl2Name").val();
    if (player1 != "" && player2 != "") {
        init(player1, player2);
    } else if (player1 != "") {
        init(player1, "AI");
        ai = true;
        aiPlaysAfter = 1;
    } else if (player2 != "") {
        init("AI", player2);
        ai = true;
        aiPlaysAfter = 0;
        aiPlay();
    } else {
        alert("Enter atleast one player name");
    }
};
var init = function (player1, player2) {
    initVars();
    player[0].name = player1;
    player[1].name = player2;
    $("#player1").html(player1);
    $("#player2").html(player2);
    $("#p1playing").html("X");
    $("#p2playing").html("O");
    $("#start").modal("close");
};
var checkWin = function () {
    var check = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
    for (var i = 0; i < check.length; i++) {
        if (box[check[i][0]] == box[check[i][1]] && box[check[i][1]] == box[check[i][2]] && box[check[i][0]] != 0) {
            var blocks = check[i];
            var winner = box[check[i][0]];
            return ([blocks, winner]);
        }
    }
    return 0;
};
var checkPlot = function () {
    var check = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
    //try winning
    for (var i = 0; i < check.length; i++) {
        var first = box[check[i][0]];
        var second = box[check[i][1]];
        var third = box[check[i][2]];
        if (first == second && (first == play[playing] && third == 0)) {
            return check[i][2];
        }
        if (third == second && (third == play[playing] && first == 0)) {
            return check[i][0];
        }
        if (first == third && (first == play[playing] && second == 0)) {
            return check[i][1];
        }
    }
    //try not losing
    for (var i = 0; i < check.length; i++) {
        var first = box[check[i][0]];
        var second = box[check[i][1]];
        var third = box[check[i][2]];
        if (first == second && (first != 0 && third == 0)) {
            return check[i][2];
        }
        if (third == second && (third != 0 && first == 0)) {
            return check[i][0];
        }
        if (first == third && (first != 0 && second == 0)) {
            return check[i][1];
        }
    }
    //if both failed
    return 9;
};
var aiPlay = function () {
    var plot = checkPlot();
    if (plot == 9) {
        plot = getRandom();
    }
    checkBox(plot);
}
var getRandom = function () {
    var plot = Math.floor(Math.random() * 10);
    if (box[plot] == 0) {
        return plot;
    } else {
        return getRandom();
    }
}
var checkDraw = function () {
    for (var i = 0; i < 9; i++) {
        if (box[i] == 0) {
            return false;
        }
    }
    return true;
}
var resetGame = function () {
    initPlayer();
    $("#winnerScreen").modal("close");
    for (var i = 0; i < 9; i++) {
        document.getElementsByClassName("box")[i].innerHTML = "";
    }
    document.getElementById("p1Points").innerHTML = 0;
    document.getElementById("p2Points").innerHTML = 0;
}
var nextMatch = function () {
    pausePlay = false;
    box = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    playing = (playing + 1) % 2;
    //    play = [play[1], play[0]];
    $("#p1playing").html(play[0]);
    $("#p2playing").html(play[1]);
    for (var i = 0; i < 9; i++) {
        document.getElementsByClassName("box")[i].innerHTML = "";
    }
    //    if (ai == true && (player[0].name == 'AI' && == player[0].playing == "X") || (player[1].name == 'AI' && == player[1].playing == "X")) {
    //        aiPlay();
    //    }
    $("#winnerScreen").modal("close");
}
