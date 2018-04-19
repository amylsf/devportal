let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/devPortal');

let newsSchema = mongoose.Schema({
  title: {type: String, unique: true},
  author: String,
  url: String,
  "source.name": String,
  urlToImage: String,
  description: String,
  publishedAt: String
})

let meetupSchema = mongoose.Schema({
  id: String,
  name: String,
  "group.name": String,
  link: String,
  local_date: String
})

let News = mongoose.model('News', newsSchema);
let Meetups = mongoose.model('Meetups', meetupSchema);

module.exports.saveNews = (article) => {
  return News.create(article)
  .catch((err) => {
    console.log(err);
  })
}

module.exports.removeNews = (article) => {
  return News.remove({title: article.title}, function(err) {
    if (err) {
      console.log(err);
    }
  })
}

module.exports.saveMeetup = (meetup) => {
  return Meetups.create(meetup)
  .catch((err) => {
    console.log(err);
  })
}

module.exports.removeMeetup = (meetup) => {
  return Meetups.remove({id: meetup.id}, function(err) {
    if (err) {
      console.log(err);
    }
  })
}

module.exports.News = News;
module.exports.Meetups = Meetups;