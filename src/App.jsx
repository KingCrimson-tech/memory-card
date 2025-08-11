import { useEffect, useState } from 'react'
import './App.css'
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';
import Card from './components/Card';

function App() {
  const [cards, setcards] = useState([]);
  const [clickedCards, setclickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  //Card shuffling
  const shuffleCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  //API stuff(use useEffect)
  useEffect(() => {
    //side effect function
    const fetchCards = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=120");
      const fetched = res.data.results.map((item, index) => ({
        id: index,
        name: item.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      }));
      setcards(shuffleCards(fetched));
    };
    //cleanup
    fetchCards();
  }, []); //dependency array


  //Click handler
  const handleCardClick = (id) => {
    //wrong guess
    if (clickedCards.includes(id)){
      setclickedCards([]);
      setScore(0);
    }//correct guess
    else{
      const newScore = score + 1;
      setScore(newScore);
      setclickedCards([...clickedCards, id]);
      if (newScore > bestScore) setBestScore(newScore);
    }
    //shuffle anyways
    setcards(shuffleCards([...cards]));
  }

  return (
    <div className="App">
      <h1>Memory Card</h1>
      <Scoreboard score={score} bestScore={bestScore}/>
      <CardGrid cards={cards} onCardClick={handleCardClick}/>
    </div>
  )
}

export default App
