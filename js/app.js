$(document).ready(function () {
    $('.tooltipped').tooltip();
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
});
const plotted = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    name;
const setName = name => {
    window.localStorage.setItem("userName", name);
    name = {
        "name": name
    };
}

const plot = (point,char) => {
    if(plotted[point]==0){
        plotted[point]=char;
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
