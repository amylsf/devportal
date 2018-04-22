const pg = require('pg');

let connection = {
  host: 'localhost',
  port: 3000,
  database: 'devPortal',
  user: '',
  password: ''
}

let db = new pg.Pool(connection);

module.exports.saveNews = (article) => {
  let queryText = `INSERT INTO news(title, author, source.name, urlToImage, description, publishedAt) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT (title) DO NOTHING`;
  let values = [article.title, article.author, article.source.name, article.urlToImage, article.description, article.publishedAt];
  return db.query(queryText, values)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.removeNews = (article) => {
  let queryText = `DELETE FROM news WHERE title=($1)`;
  let values = [article.title];
  return db.query(queryText, values)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.getFavoriteNews = () => {
  let queryText = `SELECT * FROM news`;
  return db.query(queryText)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.saveMeetup = (meetup) => {
  let queryText = `INSERT INTO meetups(id, name, group.name, link, local_date) VALUES($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING`;
  let values = [meetup.id, meetup.name, meetup.group.name, meetup.link, meetup.local_date];
  return db.query(queryText, values)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.removeMeetup = (meetup) => {
  let queryText = `DELETE FROM meetups WHERE id=($1)`;
  let values = [meetup.id];
  return db.query(queryText, values)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.getFavoriteMeetups = () => {
  let queryText = `SELECT * FROM meetups`;
  return db.query(queryText)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}