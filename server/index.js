let express = require('express');
let parser = require('body-parser');
let axios = require('axios');
let token = require('../config.js');
let port = 3000;
let app = express();
let db = require('../database/index.js');
let zipcodes = require('zipcodes');

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
  let location = zipcodes.lookup(req.body.location);
  axios.get(`https://api.meetup.com/find/upcoming_events?key=${token.MEETUP_TOKEN}&sign=true&photo-host=public&page=20&text=${query}&radius=20&lon=${location.longitude}&lat=${location.latitude}&order=best`)
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
  let location = req.body.location;
  axios.get(`https://jobs.github.com/positions.json?search=${query}&location=${location}&full_time=true`)
  .then(({data}) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.log(err);
  })
})

//save news article
app.post('/saveNews', (req, res) => {
  db.saveNews(req.body.article).then(() => {
    res.status(201).send('Saved article to Favorites');
  })
})


//delete news article
app.post('/deleteNews', (req, res) => {
  db.removeNews(req.body.article).then(() => {
    res.status(201).send('Article deleted from Favorites');
  })
})

//get favorite news articles
app.get('/favoriteNews', (req, res) => {
  let query = db.getFavoriteNews()
  .then((data) => {
    res.status(200).send(data);
  })
})

//save Meetup to favorites
app.post('/saveMeetup', (req, res) => {
  db.saveMeetup(req.body.meetup).then(() => {
    res.status(201).send('Saved Meetup to Favorites');
  })
})

//delete Meetup from favorites
app.post('/deleteMeetup', (req, res) => {
  db.removeMeetup(req.body.meetup).then(() => {
    res.status(201).send('Meetup deleted from favorites');
  })
})

//get favorite Meetups
app.get('/favoriteMeetups', (req, res) => {
  db.getFavoriteMeetups()
  .then((data) => {
    res.status(200).send(data);
  })
})

//save job to favorites
app.post('/saveJob', (req, res) => {
  db.saveJob(req.body.job).then(() => {
    res.status(201).send('Saved Job to Favorites');
  })
})

//delete job from favorites
app.post('/deleteJob', (req, res) => {
  db.removeJob(req.body.job).then(() => {
    res.status(201).send('Job deleted from favorites');
  })
})

//get favorite jobs
app.get('/favoriteJobs', (req, res) => {
  db.getFavoriteJobs()
  .then((data) => {
    res.status(200).send(data);
  })
})