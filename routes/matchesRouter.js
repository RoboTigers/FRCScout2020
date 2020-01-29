var express = require('express');
var router = express.Router();
const db = require('../db');

// router.get('/matches', (req, res) => {
//   res.json({
//     message: 'received'
//   }); /* TODO: Return list of matches for specified competition for display with EDIT/DELETE and NEW buttons */
// });

router.get('/match', (req, res) => {
  let params = req.body;
  // TODO: Rename to singular and add param for matchId (and add another route for /competition/:sn/match for all competiton matches)
  const getMatchesQuery =
    'SELECT c.short_name, t.team_num, m.match_num FROM match m INNER JOIN team t ON t.team_id=m.team_id INNER JOIN competition c ON c.competition_id=m.competition_id';

  db.query(getMatchesQuery, null)
    .then(data => {
      res.json({
        matchData: data.rows
      });
    })
    .catch(e => console.error(e.stack));
});

// HELP - api/matches does not work, /matches works.. something not right in express app
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
