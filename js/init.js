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

}
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});
