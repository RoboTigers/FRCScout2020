var express = require('express');
var router = express.Router();

const db = require('../db');

router.get('/competitions/:competitionName/pickLists/teams', (req, res) => {
  const getTeamsForCompetitionPickListQuery = 'SELECT m.auto_scored, m.teleop_scored, m.negatives, t.team_id, t.team_num, t.team_name FROM match m INNER JOIN comp_team_mapping ctm ON ctm.mapping_id = m.mapping_id INNER JOIN team t on t.team_id = ctm.team_id INNER JOIN competition c ON c.competition_id = ctm.competition_id WHERE c.is_current = true';
  const getTeamsForCompetitionPickListParams = [];
  const numericFields = ['autoScoredBottom', 'autoScoredOuter', 'autoScoredInner', 'teleopScoredBottom', 'teleopScoredOuter', 'teleopScoredInner', 'penalties', 'yellowCard', 'redCard'];

  db.query(getTeamsForCompetitionPickListQuery, getTeamsForCompetitionPickListParams)
    .then((data) => {
      // Massage the data
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

      // Group the data by team id
      const groupedRows = mappedRows.reduce((acc, value) => {
        acc[value.teamId] = acc[value.teamId] || [];
        acc[value.teamId].push(value)

        return acc;
      }, {});

      // Aggregate the team data for all matches
      const aggregatedRows = Object.keys(groupedRows).map((teamId) => {
        return groupedRows[teamId].reduce((acc, value) => {
          acc.teamId = value.teamId;
          acc.teamDescriptor = value.teamDescriptor;

          numericFields.forEach((field) => {
            acc[field] = (acc[field] || 0) + value[field]
          });

          return acc;
        }, {});
      });

      res.json(aggregatedRows);
    })
    .catch((e) => {
      console.error(e.stack)
    });
});

module.exports = router;
