let express = require('express');
let parser = require('body-parser');
let axios = require('axios');
let token = require('../config.js');
let port = 3000;
let app = express();
let db = require('../database/index.js');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


//news api request
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

//meetup API request
app.post('/meetups', (req, res) => {
  let query = req.body.query;
  axios.get(`https://api.meetup.com/find/upcoming_events?key=${token.MEETUP_TOKEN}&sign=true&photo-host=public&page=20&text=${query}&radius=20&order=best`)
  .then(({data}) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.log(err);
  })
})

//Github jobs API request
app.post('/jobs', (req, res) => {
  let query = req.body.query;
  let location = '10012';
  axios.get(`https://jobs.github.com/positions.json?search=${query}&location=${location}&full_time=true`)
  .then(({data}) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.log(err);
  })
})

//save news article
app.post('/save', (req, res) => {
  db.save(req.body.article).then(() => {
    res.status(201).send('Saved article to Favorites');
  })
})


//delete news article
app.post('/delete', (req, res) => {
  db.remove(req.body.article).then(() => {
    res.status(201).send('Article deleted from Favorites');
  })
})

//get favorite news articles
app.get('/favorites', (req, res) => {
  db.News.find({})
  .then((data) => {
    res.status(200).send(data);
  })
})