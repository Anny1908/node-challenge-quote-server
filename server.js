// server.js
// This is where your node app starts
//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
//load the quotes JSON
const quotes = require("./quotes.json");
const quotesId = require("./quotes-with-id.json");
let cors = require("cors");
//const { request, response } = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');


app.use(cors());
app.use(bodyParser.json())

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
app.get("/", function(request, response) {
    response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});
//START OF YOUR CODE...
//ENDPOINTS
//   /quotes            - Should return all quotes (json)
app.get("/quotes", (request, response) => {
        response.json(quotes);
    })
    //   /quotes/random     - Should return ONE quote (json)
app.get("/quotes/random", (request, response) => {
    response.json(pickFromArray(quotes));
})
app.get("/quotes/search", (request, response) => {
    let word = request.query.word;
    response.send(findQuotesMatching(quotes, word));
})

//...END OF YOUR CODE
//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const findQuotesMatching = (quotes, searchTerm) => {
    return quotes.filter(elem => elem.quote.includes(searchTerm))
}

// Obtener un ID...........

app.get("/quotes/:id", (req, res) => {
    const id = req.params.id;
    const quote = quotesId.filter(el => el.id === Number(id));
    res.json(quote);
});

app.post("/quotes/addquotes", (req, res) => {
    const data = req.body;
    console.log(data);
    data.id = quotesId[quotesId.length - 1].id + 1;
    let newQuotesJson = quotesId;
    newQuotesJson.push(data);
    fs.writeFile("./quotes-with-id.json", JSON.stringify(newQuotesJson), () => {});
    //  console.log(newQuotesJson);
    console.log(data);
    res.send("POST your qoute");
});

app.delete("/quotes/:id", (req, res) => {
    const id = req.params.id;
    const quote = quotesId.filter(el => el.id === Number(id));
    let newQuotesJson = quotesId;
    let index = newQuotesJson.indexOf(quote[0]);
    newQuotesJson.splice(index, 1);
    fs.writeFile("./quotes-with-id.json", JSON.stringify(newQuotesJson), () => {});
    res.send("DELETE your quote!");
});


//Start our server so that it listens for HTTP requests!
const listener = app.listen(3009, function() {
    console.log("Your app is listening on port " + listener.address().port);
});