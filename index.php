<html>

<head>
    <!--    importing game character styles,etc-->
    <link href="css/main.css" type="text/css" rel="stylesheet">
    <!--    importing materialize for style[optional]-->
    <link rel="stylesheet" href="css/material.css" type="text/css">
    <!--replace with actual link-->
    <!--    importing material-icons for materialize[optional]-->
    <link rel="stylesheet" href="css/app.css" type="text/css">
    <!--replace with actual link-->
    <!--    importing jquery-->
    <script src="js/jquery.js"></script>
    <!--replace with actual link-->
    <!--    importing jquery for materialize[optional]-->
    <script src="js/material.js"></script>
    <!--replace with actual link-->
    <!--    importing logic for the game-->
    <script src="js/app.js"></script>
</head>

<body>
    <nav class="blue white-text hide-on-small-only">
        <div class="nav-wrapper">
            <ul class="left">
                <li>
                    <h4 class="btn-flat" id="p1Points">0</h4>
                </li>
                <li class="flow-text truncate" id="player1">

                </li>
                <li class="flow-text">&nbsp;Playing:&nbsp;</li>
                <li class="flow-text" id="p1playing">
                    X
                </li>
            </ul>
            <ul class="brand-logo center hide-on-med-only" id="banner">
                <i class="material-icons">clear & panorama_fish_eye</i>TicTacToe
            </ul>
            <ul class="right">
                <li class="flow-text" id="p2playing">
                    O
                </li>
                <li class="flow-text">&nbsp;:Playing&nbsp;</li>
                <li class="flow-text truncate" id="player2">
                </li>
                <li>
                    <h4 class="btn-flat" id="p2Points">0</h4>
                </li>
            </ul>
        </div>
    </nav>
    <div class="show-on-small hide-on-med-and-up">
        <h4 class="card blue center">
            TicTacToe
        </h4>
        <div class="row card center blue">
            <div class="col s1" id="p1Points">0</div>
            <div class="col s5 truncate" id="player1"></div>
            <div class="col s3">Playing:</div>
            <div class="col s3" id="p1playing">X</div>

            <div class="col s1" id="p2Points">0</div>
            <div class="col s5 truncate" id="player2"></div>
            <div class="col s3">Playing:</div>
            <div class="col s3" id="p2playing">X</div>
        </div>
    </div>
    <br>
    <br>
    <br>
    <div class="row">
        <div class="col m3 l4"></div>
        <div class="col s12 m8 l4 card blue">
            <div class="row">
                <h1 class="col s4 m4 l4 valign-wrapper center blue-text card box" onclick="checkBox(0)"></h1>
                <h1 class="col s4 m4 l4 valign-wrapper center blue-text card box" onclick="checkBox(1)"></h1>
                <h1 class="col s4 m4 l4 valign-wrapper center blue-text card box" onclick="checkBox(2)"></h1>
            </div>
            <div class="row">
                <h1 class="col s4 m4 l4 valign-wrapper center blue-text card box" onclick="checkBox(3)"></h1>
                <h1 class="col s4 m4 l4 valign-wrapper center blue-text card box" onclick="checkBox(4)"></h1>
                <h1 class="col s4 m4 l4 valign-wrapper center blue-text card box" onclick="checkBox(5)"></h1>
            </div>
            <div class="row">
                <h1 class="col s4 m4 l4 valign-wrapper center blue-text card box" onclick="checkBox(6)"></h1>
                <h1 class="col s4 m4 l4 valign-wrapper center blue-text card box" onclick="checkBox(7)"></h1>
                <h1 class="col s4 m4 l4 valign-wrapper center blue-text card box" onclick="checkBox(8)"></h1>
            </div>
        </div>
        <div class="col m3 l4">
        </div>
    </div>
    <div id="winnerScreen" class="modal">
        <div class="modal-content container">
            <center>
                <h1 id="winner"></h1>
            </center>
        </div>
        <div class="modal-footer row container">
            <button class="blue btn left" onclick="resetGame()">Restart<i class="material-icons">update</i></button>
            <button class="blue btn right" onclick="nextMatch()">Next Match<i class="material-icons">send</i></button>
        </div>
    </div>
    <div class="modal" id="start">
        <div class="modal-content">
            <center>
                <h2><i class="material-icons medium">clear & panorama_fish_eye</i></h2>
            </center>
            <div class="row container">
                <div class="input-field col s12 m6 l6">
                    <input type="text" id="pl1Name">
                    <label for="pl1Name">Player1 Name</label>
                </div>
                <div class="input-field col s12 m6 l6">
                    <input type="text" id="pl2Name">
                    <label for="pl2Name" class="truncate">Player2 Name[leave blank For AI opponent]</label>
                </div>
                <button class="btn blue col s12 m12 l12 left" onclick="initPlayer()">Next</button>
            </div>
        </div>
    </div>
    <audio id="audioPlayer" autoplay loop>
        <source src="music1.mp3" type="audio/mpeg">
    </audio>
</body>

</html>
