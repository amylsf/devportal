let express = require('express');
let parser = require('body-parser');
let axios = require('axios');
let token = require('../config.js').API_TOKEN;
let port = 3000;
let app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.post('/news', (req, res) => {
  let query = req.body.term;
  axios.get(`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&sources=recode,hacker-news,the-verge,techcrunch&language=en&apiKey=${token}`)
  .then(({data}) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    console.log(err);
  })
})


