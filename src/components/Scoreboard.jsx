function Scoreboard({ score, bestScore, onResetBestScore }) {
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
      <button onClick={onResetBestScore} className="reset-score-btn">
        Reset Best Score
      </button>
    </div>
  );
}

export default Scoreboard;
