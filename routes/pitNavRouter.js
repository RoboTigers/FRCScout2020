var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/competitions/:shortname/pits', (req, res) => {
  const { competition } = req.query;
  console.log(competition);
  const getPitTableQuery =
    'SELECT t.team_num, t.team_name, p.status FROM pit p INNER JOIN team t ON t.team_id=p.team_id INNER JOIN competition c ON c.competition_id=p.competition_id WHERE c.short_name = $1';
  const getPitTableValues = [competition];

  db.query(getPitTableQuery, getPitTableValues)
    .then(data => {
      res.json({
        pitData: data.rows
      });
    })
    .catch(e => console.error(e.stack));
});

router.get('/currentCompetition', (req, res) => {
  const getCurrentCompetitionQuery =
    'SELECT short_name FROM competition WHERE is_current = TRUE';
  db.query(getCurrentCompetitionQuery)
    .then(data => {
      res.json({
        competition: data.rows[0].short_name
      });
    })
    .catch(e => console.error(e.stack));
});

module.exports = router;
