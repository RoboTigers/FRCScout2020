var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/competitions', (req, res) => {
  const getAllCompetitionsQuery = 'SELECT short_name as shortname, competition_id as competitionid FROM competition';

  db.query(getAllCompetitionsQuery)
    .then(data => {
      let competitions = data.rows
      res.json({
        competitions
      });
    })
    .catch(e => console.error(e.stack));
});

module.exports = router;