var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/pitTable', (req, res) => {
  const { competition } = req.query;
  console.log(competition);
  const getPitTableQuery =
    'SELECT t.num, t.name, p.status FROM pit p INNER JOIN team t ON t.team_id=p.team_id INNER JOIN competition c ON c.competition_id=p.competition_id WHERE c.name = $1';
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
    'SELECT name FROM competition WHERE is_current = TRUE';
  db.query(getCurrentCompetitionQuery)
    .then(data => {
      res.json({
        competition: data.rows[0].name
      });
    })
    .catch(e => console.error(e.stack));
});

module.exports = router;
