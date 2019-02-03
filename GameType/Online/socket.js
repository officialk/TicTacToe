const server = "http://192.168.137.1:9090";

var socket, roomId, oppId, timer;

const startConnection = playerName => {
    socket = io(server);
    socket.on("joined", data => {
        resetGame();
        clearTimeout(timer);
        roomId = data[1];
        let greeting = {
            name: localStorage.getItem("name"),
            room: roomId,
            id: socket.id
        };
        if (data[0].indexOf(socket.id) == 0) {
            oppId = data[0][1];
            greeting.playing = "X";
        } else {
            oppId = data[0][0];
            greeting.playing = "O";
        }
        socket.emit("greet", greeting);
    });
    socket.on("greetings", data => {
        if (data.playing == "X") {
            player1.id = data.id;
            player2.id = socket.id;
            initGame(data.name, localStorage.getItem("name"));
            playable = false;
        } else {
            player1.id = socket.id;
            player2.id = data.id;
            initGame(localStorage.getItem("name"), data.name);
            playable = true;
        }
    });
    socket.on("played", point => {
        playable = true;
        plot(point, true);
        //        timer = setTimeout(() => {
        //            aiPlays();
        //        }, 10000);
    });
    socket.on("opponentLeft", () => {
        alert("Opponent Left Game");
        initPvOnline(localStorage.getItem("name"));
    });
    socket.on("nextGame", () => {
        if (confirm("Play Again?")) {
            exchangePlayer();
            refreshDisplay();
            resetSquares();
            playable = ((player1.playing == "X" && player1.id == socket.id) || (player2.id == socket.id && player2.playing == "X"));
        } else {
            socket.emit("newGame", oppId);
            initPvOnline(localStorage.getItem("name"));
        }
    });
}
