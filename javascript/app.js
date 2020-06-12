document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.getElementById('score');
    const StartBtn = document.querySelector('#start-button');

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

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];


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

    let timerID = setInterval(moveDown, 1000);

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

            //Drop a new tetromino
            randomTetro = Math.floor(Math.random() * theTetrominoes.length);
            currentPosition = 4;
            current = theTetrominoes[randomTetro][currentRotation];
            draw();
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



   








});