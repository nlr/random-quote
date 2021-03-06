import React from 'react';
import './App.scss';

interface IQuote {
  text: string;
  author: string;
}

const url = 'https://type.fit/api/quotes';

function App() {
  const [quotes, setQuotes] = React.useState<IQuote[]>([]);
  const [quote, setQuote] = React.useState<IQuote>({ text: '', author: '' });

  const loadQuotes = React.useCallback(async () => {
    const response = await fetch(url);
    const data: IQuote[] = await response.json();
    setQuotes(data);
    setQuote(data[Math.floor(Math.random() * data.length)]);
  }, []);

  const getRandomQuote = React.useCallback(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [quotes]);

  React.useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  return (
    <div id="wrapper">
      <div id="quote-box">
        <div className="quote-text">
          <i className="fa fa-quote-left"> </i>
          <span id="text">{quote.text}</span>
        </div>
        <div className="quote-author">
          - <span id="author">{quote.author}</span>
        </div>
        <div className="buttons">
          <a
            href={encodeURI(
              `https://twitter.com/intent/tweet?hashtags=quotes&text="${quote.text}" - ${quote.author}`,
            )}
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_top">
            <i className="fa fa-twitter"></i>
          </a>
          <button
            onClick={() => {
              getRandomQuote();
            }}
            className="button"
            id="new-quote">
            New quote
          </button>
        </div>
      </div>
      <div className="footer">
        by <a href="https://github.com/nlr">nlr</a>
      </div>
    </div>
  );
}

export default App;
