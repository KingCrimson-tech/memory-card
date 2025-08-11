import { useEffect, useState } from 'react';
import './App.css';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';
import GameStatus from './components/GameStatus';

const TOTAL_CARDS = 12;

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'

  const shuffleCards = (array) => array.sort(() => Math.random() - 0.5);

  const fetchAndSetCards = async () => {
    setIsLoading(true);
    try {
      const pokemonIds = new Set();
      while(pokemonIds.size < TOTAL_CARDS) {
        pokemonIds.add(Math.floor(Math.random() * 151) + 1);
      }
      const cardPromises = Array.from(pokemonIds).map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
          imageUrl: data.sprites.front_default,
        };
      });
      const fetchedCards = await Promise.all(cardPromises);
      setCards(shuffleCards(fetchedCards));
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      // Handle fetch error, maybe show an error message to the user
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAndSetCards();
  }, []);

  const handleCardClick = (id) => {
    if (gameState !== 'playing') return;

    if (clickedCards.includes(id)) {
      setGameState('lost');
      if (score > bestScore) {
        setBestScore(score);
      }
      return;
    }

    const newClickedCards = [...clickedCards, id];
    setClickedCards(newClickedCards);

    const newScore = score + 1;
    setScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    if (newClickedCards.length === TOTAL_CARDS) {
      setGameState('won');
    } else {
      setCards(shuffleCards([...cards]));
    }
  };

  const handlePlayAgain = () => {
    setGameState('playing');
    setScore(0);
    setClickedCards([]);
    fetchAndSetCards();
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Pokémon Memory Game</h1>
        <Scoreboard score={score} bestScore={bestScore} />
      </header>
      <main>
        {isLoading ? (
          <p>Loading Cards...</p>
        ) : (
          <>
            <GameStatus
              status={gameState}
              onPlayAgain={handlePlayAgain}
              score={score}
            />
            <CardGrid cards={cards} onCardClick={handleCardClick} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
