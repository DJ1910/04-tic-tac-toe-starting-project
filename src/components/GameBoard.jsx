import { v4 } from "uuid";

export default function GameBoard({ handleGameBoardButtonClick, gameBoard, hasWinner }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={v4()}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={v4()}>
                <button
                  onClick={() => handleGameBoardButtonClick(rowIndex, colIndex)}
                  disabled={playerSymbol !== null || hasWinner}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
