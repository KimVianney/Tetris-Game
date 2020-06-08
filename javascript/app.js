document.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.getElementById('score');
    const StartBtn = document.querySelector('#start-button');
    
    const width = 10;

    
    // Creating the Tetrominoes
    const lTetromino  = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]       
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2+1, width*2],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2+1, width*2]

    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [width+2, 1, width+1, width*2+1],
        [width, width+1, width+2, width*2+1],
        [width, 1, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],

    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width+1, width+2, width+3, width+4],
        [1, width+1, width*2+1, width*3+1],
        [width+1, width+2, width+3, width+4]

    ]

    






} );