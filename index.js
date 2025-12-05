const express = require('express');
const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());

// Reaction game skills
const reactionStart = require('./reaction/start');
const reactionPress = require('./reaction/press');

app.post('/api/reaction/start', reactionStart);
app.post('/api/reaction/press', reactionPress);

app.listen(3000, () => {
  console.log('SneakBot Skill Server running on port 3000!');
});