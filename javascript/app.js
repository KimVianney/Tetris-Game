document.addEventListener("DOMContentLoaded", () => {
    let grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.querySelector('#start-button');
    let nextRandom = 0;
    let timerID;
    let score = 0;

    const width = 10;

    // Creating the Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2 + 1, width * 2],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2 + 1, width * 2]

    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [width + 2, 1, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [width, 1, width + 1, width * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],

    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]

    ];

    const rlTetromino = [
        [0, 1, width+1, width*2+1],
        [width, width+1, width+2, width*2],
        [0, width, width*2, width*2+1],
        [width, width+1, width+2, 2]

    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino, rlTetromino];


    // To draw the first rotation of the lTetromino
    let currentPosition = 4;
    let currentRotation = 0;

    //To access a random tetromino 
    let randomTetro = Math.floor(Math.random() * theTetrominoes.length);

    let current = theTetrominoes[randomTetro][currentRotation];

    //To draw the tetrominoes on the grid
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino");
        })


    }

    //To undraw the tetrominoes from the screen
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');

        })
    }

    //Timing each tetromino to Move Down

    //timerID = setInterval(moveDown, 1000);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }


    //Programming the controls
    document.addEventListener('keyup', controls);

    function controls(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }

    //Function to prevent the tetrominoes from dropping from the screen
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => {
                squares[currentPosition + index].classList.add('taken');
            })

            //Drop a new tetromino / a new falling
            randomTetro = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            currentPosition = 4;
            current = theTetrominoes[randomTetro][currentRotation];
            draw();
            displayTetro(); 
            displayScore();
            gameOver();
        }
    }

    //Function to move the tetromino towards the left edge
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if (!isAtLeftEdge) {
            currentPosition -= 1;

        }

        if (current.some(squares[currentPosition + index]).classList.contains('taken')) {
            currentPosition += 1;
        }

        draw();
    }

    // Function to allow the tetromino to move towards the right edge

    function moveRight(){
        undraw();

        const isAtRightEdge = current.some(index => (currentPosition + index)% width === width -1);

        if (!isAtRightEdge) {
            currentPosition += 1;
        }
        if(current.some(index => squares[currentPosition + index ].classList.contains('taken'))){
            current -=1;
        }
        draw();
    }

    // Function to rotate the tetromino 
    function rotate(){
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[randomTetro][currentRotation];
        draw();

    }

    //Creating a display grid for the next tetromino
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 1;

    
    const nextTetrominos = [
        //First rotations of the tetrominoes
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromnio
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
        [0, 1, displayWidth, displayWidth + 1], //oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
        [0, 1, displayWidth+1, displayWidth*2+1] // rlTetromino
    ];

    function displayTetro(){
        //Remove any trace of any tetro shape.
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
        })
        nextTetrominos[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
        })

    }


    // Adding functionality to the start-button;

    startBtn.addEventListener('click', () => {
            if (timerID) {
                clearInterval(timerID);
                timerID = null;
            } else {
                draw();
                timerID = setInterval(moveDown, 1000);
                nextRandom = Math.floor(Math.random() * theTetrominoes.length);
                displayTetro();
            }
    });

    // Activating the score functionality

    function displayScore(){
        for (let i = 0; i < 199; i += width){
            const row  = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
           
            if (row.every(index => squares[index].classList.contains('taken'))){
                score += 10;
                scoreDisplay.innerHTML = score;    
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                })

                const squaresRemoved = squares.splice(i, width);
                squares =  squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));

            }
            
        }
    }

    
    //Game over funtionality
    function gameOver(){
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = "Game Over";
            clearInterval(timerID);

           
        }

    }




    


   








});