const socket = require('socket.io')(9090);

var paired = [];

socket.on("connection", client => {
    let waiting = true;

    paired.forEach((pair, id) => {
        if (pair.length === 1) {
            waiting = false;
            pair.push(client.id);
            client.join(`room${id}`);
            socket.in(`room${id}`).emit("joined", [pair, `room${id}`]);
        }
    });

    if (waiting) {
        paired.push([client.id]);
        client.join("room" + (paired.length - 1));
    }

    client.on("greet", data => {
        client.in(data.room).emit("greetings", data);
    });

    client.on("played", data => {
        socket.to(data.oppId).emit("played", data.point);
    });

    client.on("nextGame", data => {
        socket.to(data).emit("nextGame");
    });

    client.on("newGame", data => {
        socket.to(data).emit("opponentLeft");
    });

    client.on("disconnecting", data => {
        paired.forEach((pair, id) => {
            let index = pair.indexOf(client.id);
            if (index != -1) {
                pair.splice(index, 1);
                socket.to(pair[0]).emit("opponentLeft");
                paired.splice(id, 1);
                client.leave("room" + id);
            }
        });
    });
});
