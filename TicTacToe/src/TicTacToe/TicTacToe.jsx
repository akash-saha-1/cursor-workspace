import {useState} from 'react';
import './TicTacToe.css';

function getWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

    for(const [a, b, c] of lines) {
        // same value in all three positions and not null
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return {winner: board[a], cells: [a, b, c]};
        }
    }

    return null;
}

const Square = ({value, onClick, highlight}) => {
    return (
        <button className={`square ${highlight ? 'square-win' : ''}`} onClick={onClick} disabled={value !== null} aria-label={value??'empty'}>
            {value}
        </button>
    )
}

export default function TicTacToe() {
    const [board, setBoard] = useState(new Array(9).fill(null));
    const [isX, setIsX] = useState(true);

    //Derived state
    const result = getWinner(board);
    const winner = result?.winner?? null;
    const winCells = result?.cells?? [];
    const isDraw = !winner && board.every(cell => cell !=null);
    const current = isX ? 'X' : 'O';

    function handleClick(index) {
        if(winner!=null || board[index] != null) return;

        const next = [ ...board];
        next[index] = current;
        setBoard(next);
        setIsX(!isX);
    }

    function reset() {
        setBoard(new Array(9).fill(null));
        setIsX(true);
    }

    const status = winner ? `🎉 ${winner} wins!` : isDraw ? `🤝 Draw!` : `Player ${current}'s turn`;

    return (
        <main className="ttt">
            <h1>Tic Tac Toe</h1>
            <p className="status" role="status">
                {status}
            </p>
            <div className="board">
                {board.map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        onClick={() => handleClick(index)}
                        highlight={winCells?.includes(index)}
                    />
                ))}
            </div>

            <button className="reset-btn" onClick={reset}>
                Reset Game
            </button>
        </main>
    )
}