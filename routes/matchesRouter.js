var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/competitions/:shortName/matches', (req, res) => {
  const getMatchesForCompetitionQuery =
    'SELECT m.match_id as matchid, t.team_num as teamnum, m.match_num as matchnum FROM match m INNER JOIN comp_team_mapping mapping on mapping.mapping_id=m.mapping_id INNER JOIN team t ON t.team_id=mapping.team_id INNER JOIN competition c ON c.competition_id=mapping.competition_id WHERE c.short_name = $1';
  const getMatchesForCompetitionValues = [req.params.shortName];

  db.query(getMatchesForCompetitionQuery, getMatchesForCompetitionValues)
    .then(data => {
      res.json({
        matchList: data.rows
      });
    })
    .catch(e => console.error(e.stack));
});

router.post('/competitions/:id/matches', (req, res) => {
  console.log('POSTED');
  let params = req.body;
  console.log('params', params);
  const getMatchesForCompetitionIdQuery =
    'SELECT t.team_num as teamnum, m.match_num as matchnum, m.scout_name as scoutname, m.report_status as reportstatus FROM match m INNER JOIN comp_team_mapping mapping on mapping.mapping_id=m.mapping_id INNER JOIN team t ON t.team_id=mapping.team_id INNER JOIN competition c ON c.competition_id=mapping.competition_id WHERE c.short_name = $1';
  const getMatchesForCompetitionIdValues = [params.shortname];

  db.query(getMatchesForCompetitionIdQuery, getMatchesForCompetitionIdValues)
    .then(data => {
      res.json({
        matchList: data.rows
      });
    })
    .catch(e => console.error(e.stack));
});

//TODO: Fix this route to be restful
router.post('/match', (req, res) => {
  let params = req.body;

  const addMatchQuery =
    'INSERT INTO match (mapping_id, last_modified)' +
    'VALUES (' +
    '$1,' +
    '$2,' +
    'NOW()' +
    ') RETURNING *';
  const addMatchValues = [params.compTeamMappingId, params.matchNum];

  db.query(addMatchQuery, addMatchValues)
    .then(res => {
      console.log(res.rows[0]);
    })
    .catch(e => console.error(e.stack));

  res.json({
    message: `Saved`,
    params
  });
});

module.exports = router;
