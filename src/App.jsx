import { useState } from 'react'
import './App.css'

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


  //Click handler
    //wrong guess
    
    //right guess


    //shuffle anyway


  return (
    <div className="App">
      <h1>Memory Card</h1>
    </div>
  )
}

export default App
