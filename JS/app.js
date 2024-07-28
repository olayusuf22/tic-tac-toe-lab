/*-------------------------------- Constants --------------------------------*/

const colors = {
    'null': 'white',
    '1': 'lightblue',  // Player 'X'
    '-1': 'lightcoral' // Player 'O'
  };
  
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  /*---------------------------- Variables (state) ----------------------------*/
  
  let board, turn, winner;
  
  /*------------------------ Cached Element References ------------------------*/
  
  const squares = Array.from(document.querySelectorAll('.sqr'));
  const messageEl = document.getElementById('message');
  const replayBtn = document.getElementById('replay');
  
  /*-------------------------------- Functions --------------------------------*/
  
  function init() {
    board = Array(9).fill(null);
    turn = 1; // Player 'X'
    winner = null;
    render();
  }
  
  function render() {
    board.forEach((mark, idx) => {
      squares[idx].style.backgroundColor = colors[mark];
    });
    if (winner === 'T') {
      messageEl.textContent = "It's a tie!";
    } else if (winner) {
      messageEl.textContent = `Player ${colors[winner].toUpperCase()} Wins!`;
    } else {
      messageEl.textContent = `Player ${colors[turn].toUpperCase()}'s Turn`;
    }
  }
  
  function handleClick(evt) {
    const idx = squares.indexOf(evt.target);
    if (board[idx] !== null || winner !== null) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
  }
  
  function getWinner() {
    for (let combo of winningCombos) {
      const total = Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]);
      if (total === 3) return board[combo[0]];
    }
    if (board.every(mark => mark !== null)) return 'T';
    return null;
  }
  
  /*----------------------------- Event Listeners -----------------------------*/
  
  squares.forEach(sqr => sqr.addEventListener('click', handleClick));
  replayBtn.addEventListener('click', init);
  
  /*-------------------------------- Initialize --------------------------------*/
  
  init();
  