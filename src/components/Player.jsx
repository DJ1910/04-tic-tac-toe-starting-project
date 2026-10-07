import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {

    if(isEditing && playerName === '') {
      alert('Player name cannot be empty');
      return;
    }

    setIsEditing((isEditing) => !isEditing);

    if (isEditing) {
      onSave(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value.toUpperCase());
  }

  let displayPlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    displayPlayerName = (
      <input
        name="playerNameInput"
        type="text"
        value={playerName}
        onChange={handleChange}
        required
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {displayPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
