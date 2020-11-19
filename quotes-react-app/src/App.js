import React,{useState, useEffect}from 'react'; 
import './App.css';
import QuotesButton from './QuotesButton';

function App() {
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3009/quotes/random`) 
      .then(res => res.json())
      .then(data => {
        setQuote(data);
      });
  }, []);

  const clickButton = () =>{
    window.location.reload();
    console.log(quote);

  }
  
  return (
    <div className="App">
      <h1>Quotes</h1>
      <h3>{quote.quote}</h3>
      <h5>{quote.author}</h5>
      <QuotesButton clickMe={clickButton}/>
    </div>
  );
}

export default App;
