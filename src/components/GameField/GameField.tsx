import React , {useMemo} from 'react';
import './GameField.css';
import { useEffect, useState } from 'react';

interface GameFieldProps {
    numOfEmojis: number; // Expect a number as a prop
  }

const GameField = ({ numOfEmojis } : GameFieldProps) => {

    const [emojis, setEmojis] = useState(Array(numOfEmojis).fill('\u{1F525}'));
    // const fontSize = 50 - numOfEmojis; // Decrease font size as numOfEmojis increases
    const fontSize = useMemo(() => {
      return 50 - numOfEmojis;
  }, [numOfEmojis]);

  useEffect(() => {
    setEmojis(Array(numOfEmojis).fill('\u{1F525}'));
}, [numOfEmojis]);

  return (
    <div>
        <div className='GameField'>
            {emojis.map((emoji, index) => (
            <p key={index} className="GameField-emoji" style={{fontSize:`${fontSize}px`}}>
            {emoji}
            </p>
        ))}
        </div>
    </div>
  );
}

export default GameField;