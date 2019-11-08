$(document).ready(function() {

    // DEFINE GLOBAL VARIABLES       
    var newWord = "";
    var guessedLetters = [];
    var guessingWord = [];
    var wordString = "";
    var maxGuesses;
    var numGuess;
    var wins = 0;
    var loses = 0;
    var pauseGame = false;

    // DEFINE THE MAIN OBJECT       
        var hangman = {
            wordsArray : ["cabernet sauvignon", 
                            "Merlot", 
                            "Pinot Noir", 
                            "Albariño", 
                            "Verdejo", 
                            "Pais", 
                            "Petit Verdot",                         
                            "Chardonnay", 
                            "Pinot Grigio", 
                            "Corvina", 
                            "Molinara", 
                            "Rondinella", 
                            "Carmenere", 
                            "Sauvignon Blanc",
                            "Syrah", 
                            "Petit Sirah",
                            "Tempranillo", 
                            "Mencia", 
                            "Monastrel", 
                            "Nebiolo",
                            "Barbera", 
                            "Malbec", 
                            "Bobal", 
                            "Cabernet Franc", 
                            "Viura"
                        ],
            wordToGuess : function() {
                let i = Math.floor(Math.random() * this.wordsArray.length) + 1;    
                return this.wordsArray[i];
            },
            rightSound : "assets/sounds/right.mp3",
            wrongSound : "assets/sounds/wrong.mp3;"
        }

    // EVENT LISTENERS
    addEventListener("click", function() {
        resetGame();
        newWord = hangman.wordToGuess();   
        console.log("New word:", newWord);
        // SET HOW MANY CHANCES WE HAVE
        maxGuesses = newWord.length;
        // RENDER WORD TEMPLATE
        renderWordTemplate(newWord.length);
        // DISPLAY UPDATED STATS
        updateGameData();
    });

    addEventListener("keyup", function(e) {
        let k = e.key.toUpperCase();
        if (isAlpha(k) && !pauseGame) {
            letterInWord(k);
        }
    });

    // CHECK IF KEY PRESSED IS BETWEEN A-Z
    function isAlpha(k) {
        return /^[A-Z]$/i.test(k);
    }
    
    function renderWordTemplate(wordSize) {
        for (var i=0, j=wordSize; i < j; i++){
            if (newWord[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push("_")
            }
        }
    }

    // RESET GAME
    function resetGame() {
        //numGuess = maxGuesses;
        pauseGame = false;

        guessedLetters = [];
        guessingWord = [];
    }
    
    // CHECK & RENDER GUESSED LETTERS
    function letterInWord(letter) {
        let j = newWord.length;
        let found = false;
        for (var i=0; i<j; i++) {  
             if (letter === newWord[i]) {
                console.log("j: ", j,"i: ",i,newWord[i]);
                found = true;
                guessingWord[i] = letter; 
                rightLetter = true;
                console.log(guessingWord.join(), i, letter, found);
                let sound = new Audio('assets/sounds/right.mp3');
                sound.play();
                if (guessingWord.join("") === newWord) {
                    wins++;
                    pauseGame = true;
                    updateGameData();
                    setTimeout(resetGame,5000);
                }
            }
        }
        if (!found) {
            let sound = new Audio('assets/sounds/wrong.mp3');
            sound.play();
            // Check if inccorrect guess is already on the list
            if (!guessedLetters.includes(letter)) {
                // Add it if not
                guessedLetters.push(letter);
                console.log(guessedLetters);
                // Decrement the number of remaining guesses
                maxGuesses--;
                console.log(maxGuesses);
                }
                // Check if done with the guesses
                if (numGuess === 0) {
                    guessingWord = newWord.split()
                    pauseGame = true;
                    setTimeout(resetGame, 5000);
                }
            }
            updateGameData();
        }

        function updateGameData() {
            document.getElementById("Wins").innerHTML = "<h3>" + "Wins: " + wins + "</h3>";
            document.getElementById("wordToGuess").innerHTML = "<h3>" + guessingWord.join("") + "</h3>";
            document.getElementById("leftChances").innerHTML = "<h3>" + maxGuesses + "</h3>";
            document.getElementById("lettersGuessed").innerHTML = "<h3>" + guessedLetters.join("") + "</h3>";
        }     
})