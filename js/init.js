window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/TicTacToe/sw.js', {
                scope: '/TicTacToe/'
            })
            .then(function (reg) {
                Notification.requestPermission();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    fetch("/TicTacToe/favicon.ico")
        .then(e => {
            console.log("online");
            document
                .getElementsByTagName("head")[0]
                .insertAdjacentHTML("beforeend", "<link rel='icon' href='/TicTacToe/favicon.ico'>");
        })
        .catch(e => {
            console.log(e);
            document
                .getElementsByTagName("head")[0]
                .insertAdjacentHTML("beforeend", "<link rel='icon' href='/TicTacToe/images/icons/icons-72x72.png'>");
            document.getElementById("onlinePlay").classList.add("disabled");
        })
}
