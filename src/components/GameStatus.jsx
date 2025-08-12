function GameStatus({ status, onPlayAgain, score }) {
  if (status === 'playing') {
    return null;
  }

  const message = status === 'won'
    ? 'You Win! Excellent Memory!'
    : `Game Over! You scored ${score}.`;

  return (
    <div className="game-status-overlay">
      <div className="game-status-modal" data-status={status}>
        <h2>{message}</h2>
        <button onClick={onPlayAgain}>New Game</button>
      </div>
    </div>
  );
}

export default GameStatus;
