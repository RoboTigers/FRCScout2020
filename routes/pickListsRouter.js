var express = require('express');
var router = express.Router();

const db = require('../db');

router.get('/competitions/:competitionName/pickLists/teams', (req, res) => {
  const getTeamsForCompetitionPickListQuery = 'SELECT m.auto_scored, m.teleop_scored, m.negatives, t.team_id, t.team_num, t.team_name FROM match m INNER JOIN comp_team_mapping ctm ON ctm.mapping_id = m.mapping_id INNER JOIN team t on t.team_id = ctm.team_id INNER JOIN competition c ON c.competition_id = ctm.competition_id WHERE c.is_current = true';
  const getTeamsForCompetitionPickListParams = [];

  db.query(getTeamsForCompetitionPickListQuery, getTeamsForCompetitionPickListParams)
    .then((data) => {
      const mappedRows = data.rows.map((row) => {
        return {
          teamId: row.team_id,
          teamDescriptor: `${row.team_num}: ${row.team_name}`,
          autoScoredBottom: row.auto_scored.find(score => score.label == 'Bottom').value,
          autoScoredOuter: row.auto_scored.find(score => score.label == 'Outer').value,
          autoScoredInner: row.auto_scored.find(score => score.label == 'Inner').value,
          teleopScoredBottom: row.teleop_scored.find(score => score.label == 'Bottom').value,
          teleopScoredOuter: row.teleop_scored.find(score => score.label == 'Outer').value,
          teleopScoredInner: row.teleop_scored.find(score => score.label == 'Inner').value,
          penalties: row.negatives.find(negative => negative.label == 'Penalties').value,
          yellowCard: row.negatives.find(negative => negative.label == 'Yellow Card').value,
          redCard: row.negatives.find(negative => negative.label == 'Red Card').value
        }
      });
      res.json(mappedRows);
    })
    .catch((e) => {
      console.error(e.stack)
    });
});

module.exports = router;
