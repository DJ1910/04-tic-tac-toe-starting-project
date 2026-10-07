import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = { X: "Player 1", O: "Player 2" };

function deriveGameBoard(gameTurnData) {
  const gameBoard = INITIAL_GAME_BOARD.map((nestedArray) => [...nestedArray]);

  for (const turn of gameTurnData) {
    const { row, col, player } = turn;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveActivePlayer(gameTurnData) {
  let currActivePlayer = "X";

  if (gameTurnData.length > 0 && gameTurnData[0].player === "X") {
    currActivePlayer = "O";
  }

  return currActivePlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [gameTurnData, setGameTurnData] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurnData);
  const gameBoard = deriveGameBoard(gameTurnData);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurnData.length === 9 && !winner;

  function handleGameBoardButtonClick(rowIndex, colIndex) {
    setGameTurnData((prevTurn) => {
      const currActivePlayer = deriveActivePlayer(prevTurn);

      const currentGameTurn = [
        { row: rowIndex, col: colIndex, player: currActivePlayer },
        ...prevTurn,
      ];

      return currentGameTurn;
    });
  }

  function handleRestart() {
    setGameTurnData([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newName }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onSave={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onSave={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} rematch={handleRestart} />
        )}
        <GameBoard
          handleGameBoardButtonClick={handleGameBoardButtonClick}
          gameBoard={gameBoard}
          hasWinner={winner}
        />
      </div>
      <Log gameTurns={gameTurnData} />
    </main>
  );
}

export default App;
