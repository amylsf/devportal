let express = require('express');
let parser = require('body-parser');
let axios = require('axios');
let token = require('../config.js');
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
  axios.get(`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&sources=recode,hacker-news,the-verge,techcrunch&language=en&apiKey=${token.NEWS_TOKEN}`)
  .then(({data}) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    console.log(err);
  })
})

app.post('/meetups', (req, res) => {
  let query = req.body.query
  axios.get(`https://api.meetup.com/find/upcoming_events?photo-host=public&page=20&text=${query}&sig_id=208321078&radius=20&order=best&sig=3abf5cf65cd8ca65d813e1c8401dc685e8aec4dc`)
  .then(({data}) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.log(err);
  })
})
