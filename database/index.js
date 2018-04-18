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

let News = mongoose.model('News', newsSchema);

let save = (article) => {
  return News.create(article)
  .catch((err) => {
    console.log(err);
  })
}

let remove = (article) => {
  return News.remove({title: article.title}, function(err) {
    if (err) {
      console.log(err);
    }
  })
}

module.exports.save = save;
module.exports.remove = remove;
module.exports.News = News;
