import Particles from 'node_modules/particlesjs/dist/particles.min.js';
var particles = Particles.init({
	selector: '.background',
    color: ['#03045E','#023E8A','#0077B6','#0096C7','#00B4D8','#48CAE4','#90E0EF','#ADE8F4','#CAF0F8'],
    connectParticles: false,
    maxParticles: 450,
    speed: 0.75
});

const qouteContainer = document.getElementById('quote-container');
const qouteText= document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Get Quotes from an API
let quotesArray = [];

// Loading Information
const loading = (val) => {
    loader.hidden = val;
    qouteContainer.hidden = !val;
}

// Get a random quote from the quotesArray
const newQuote = () => {
    loading(false);
    const quote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
    //Check if Author field is blank
    authorText.textContent = (!quote.author)?'Anonymous':quote.author;
    //Check quote length and change styling
    (quote.text.length>120)? qouteText.classList.add('.long-quote'):qouteText.classList.remove('.long-quote');
    qouteText.textContent = quote.text;
    loading(true);
}

const getQuote = async () => {
    loading(false);
    const fetchQuoteURL = 'https://type.fit/api/quotes';
    try{
        quotesArray = await fetch(fetchQuoteURL).then(resp => resp.json());
        newQuote();
    }catch(error){
        alert("There was an error fetching the quote! Try again!")
    }
}

//Tweet Quote
const tweetQuote = () =>{
    const twitterURL = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank')
}

// EventListeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuote();