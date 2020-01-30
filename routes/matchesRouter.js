var express = require('express');
var router = express.Router();
const db = require('../db');


router.get('/competitions/:shortName/matches', (req, res) => {
  const getMatchesForCompetitionQuery =
  'SELECT t.team_num, m.match_num FROM match m INNER JOIN team t ON t.team_id=m.team_id INNER JOIN competition c ON c.competition_id=m.competition_id WHERE c.short_name = $1';
  const getMatchesForCompetitionValues = [ req.params.shortName ];
  
  db.query(getMatchesForCompetitionQuery, getMatchesForCompetitionValues)
  .then(data => {
    res.json({
      matchList: data.rows
    });
  })
  .catch(e => console.error(e.stack));
})

router.post('/competitions/:id/matches', (req, res) => {
  console.log('POSTED')
  let params = req.body;
  console.log("params",params);
  const getMatchesForCompetitionQuery =
    'SELECT t.team_num, m.match_num FROM match m INNER JOIN team t ON t.team_id=m.team_id INNER JOIN competition c ON c.competition_id=m.competition_id WHERE c.short_name = $1';
  const getMatchesForCompetitionValues = [ params.shortname ];

  db.query(getMatchesForCompetitionQuery, getMatchesForCompetitionValues)
    .then(data => {
      res.json({
        matchList: data.rows
      });
    })
    .catch(e => console.error(e.stack));
});

router.post('/match', (req, res) => {
  let params = req.body;

  const addMatchQuery =
    'INSERT INTO match (competition_id, team_id, match_num, last_modified)' +
    'VALUES (' +
    '(select competition_id from competition where short_name=$1),' +
    '(select team_id from team where team_num=$2),' +
    '$3,' +
    'NOW()' +
    ') RETURNING *';
  const addMatchValues = [params.competition, params.teamNum, params.matchNum];

  db.query(addMatchQuery, addMatchValues)
    .then(res => {
      console.log(res.rows[0]);
    })
    .catch(e => console.error(e.stack));

  res.json({
    message: `We saved team ${params.teamNum} match ${params.matchNum} for ${params.competition}`,
    params
  });
});

module.exports = router;
