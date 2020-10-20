const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const noQuote = document.getElementById('no-quote');
// Infinite loop counter
let counter = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
  noQuote.hidden = true;
}

function removeLoadingSpinner() {
  if(!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function showUnableToGetQuoteMessage() {
  if(!loader.hidden){
    loader.hidden = true;
    noQuote.hidden = false;
  }
}
// Get Quote from API
async function getQuote() {
  showLoadingSpinner();

  // Fetch quote
  const proxyUrl = 'https://still-harbor-89661.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // Add 'Unknown Author' in case author is blank
    if(data.quoteAuthor === '') {
      authorText.innerText = 'Unknown Author';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if(data.quoteText.length > 120 ){
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;

    // throw new Error('oops');
    removeLoadingSpinner();
    
  } catch (error) {
    counter++;
    if(counter<10){
      console.log(counter);
      getQuote();
    } else {
      showUnableToGetQuoteMessage();
    }    
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuote();
