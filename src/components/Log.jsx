import { v4 } from "uuid";

export default function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((gameTurn) => (
        <li key={v4()}>
          {gameTurn.player} selected {gameTurn.row},{gameTurn.col}
        </li>
      ))}
    </ol>
  );
}
