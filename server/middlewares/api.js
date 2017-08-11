const low = require('lowdb');
const bodyParser = require('body-parser');
const uuid = require('uuid');

function setupDb() {
  const db = low();

  db.defaults({ topics: [], links: [] })
    .value();

  const topic1 = {
    name: 'React',
    description: 'Resources for React',
  };

  const topic2 = {
    name: 'Redux',
    description: 'Resources for Redux',
  };

  const topic3 = {
    name: 'Other Resources',
    description: 'Other Libraries that we use',
  };
  const topic4 = {
    name: 'Demos',
    description: 'Demo examples',
  };

  db.get('topics').push(topic1).value();
  db.get('topics').push(topic2).value();
  db.get('topics').push(topic3).value();
  db.get('topics').push(topic4).value();

  db.get('links').push({
    description: 'React Website',
    url: 'https://facebook.github.io/react/',
    topicName: topic1.name,
    id: uuid(),
    voteCount: 0,
    voters: [],
  }).value();
  db.get('links').push({
    description: 'Boilerplate for creating react apps',
    url: 'https://github.com/facebookincubator/create-react-app',
    topicName: topic1.name,
    id: uuid(),
    voteCount: 0,
    voters: [],
  }).value();
  db.get('links').push({
    description: 'Redux Website',
    url: 'redux.js.org',
    topicName: topic2.name,
    id: uuid(),
    voteCount: 0,
    voters: [],
  }).value();
  return db;
}

module.exports = (app) => {
  const db = setupDb();

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.json());

  app.get('/api/topics', (req, res) => {
    res.send(db.get('topics').toArray().value());
  });

  app.get('/api/topics/:name/links', (req, res) => {
    const links = db.get('links').filter((l) =>
      l.topicName === req.params.name
    ).value();
    res.send(links);
  });

  app.post('/api/topics/:name/links', (req, res) => {
    const existingLink = db.get('links').find({ url: req.body.url }).value();
    if (existingLink) {
      return res.send(403);
    }

    const link = Object.assign({}, req.body, {
      id: uuid(),
      voteCount: 0,
      voters: [],
    });
    db.get('links').push(link).value();
    return res.send(link);
  });

  app.post('/api/links/:id/vote', (req, res) => {
    const link = db.get('links').find({ id: req.params.id }).value();
    if (link.voters && link.voters.indexOf(req.body.email) > -1) {
      return res.send(403);
    }

    link.voters.push(req.body.email);
    link.voteCount += req.body.increment;
    return res.send(link);
  });
};
