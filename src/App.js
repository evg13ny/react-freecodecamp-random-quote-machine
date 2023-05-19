import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // generate random quote
  const [quote, setQuote] = useState({});

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    fetch("https://dummyjson.com/quotes/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuote({
          text: data.quote,
          author: data.author
        });
      });
  };

  // generate random color
  const rainbow = [
    '#ff0000',
    '#ffa500',
    '#ffff00',
    '#008000',
    '#0000ff',
    '#4b0082',
    '#ee82ee'
  ];

  const randomColorGenerator = () => {
    return rainbow[Math.floor(Math.random() * rainbow.length)];
  }

  const [color, setColor] = useState(randomColorGenerator());

  // unite random quote and random color in the button
  const handleClick = () => {
    setColor(randomColorGenerator());
    getQuote();
  }

  return (
    <div style={{ backgroundColor: color }} className="App">
      <div id='quote-box'>
        <p style={{ color: color }} id='text'>{quote.text}</p>
        <p style={{ color: color }} id='author'>{quote.author}</p>
        <div className='quote__footer'>
          <a id='tweet-quote' href={'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURI('"' + quote.text + '" ' + quote.author)} target='_blank' rel='noreferrer'>
            <i style={{ color: color }} class="fa-brands fa-square-twitter"></i>
          </a>
          <button style={{ backgroundColor: color }} id='new-quote' onClick={handleClick}>New Quote</button>
        </div>
      </div>
    </div>
  );
}

export default App;