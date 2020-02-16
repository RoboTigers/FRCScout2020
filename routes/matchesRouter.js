var express = require('express');
var router = express.Router();
const db = require('../db');
const ensureAdmin = require('../middlewares/ensure_admin');

router.get('/competitions/:shortName/matches', (req, res) => {
  const getMatchesForCompetitionQuery =
    'SELECT m.match_id as matchid, t.team_num as teamnum, m.match_num as matchnum, m.scout_name as scoutname, m.report_status as reportstatus FROM match m INNER JOIN comp_team_mapping mapping on mapping.mapping_id=m.mapping_id INNER JOIN team t ON t.team_id=mapping.team_id INNER JOIN competition c ON c.competition_id=mapping.competition_id WHERE c.short_name = $1';
  const getMatchesForCompetitionValues = [req.params.shortName];

  db.query(getMatchesForCompetitionQuery, getMatchesForCompetitionValues)
    .then(data => {
      res.json({
        matchList: data.rows
      });
    })
    .catch(e => console.error(e.stack));
});

router.get(
  '/competitions/:shortName/team/:teamNum/matchNum/:matchNum/match',
  (req, res) => {
    const getPitDataQuery =
      'SELECT t.team_num, c.short_name, m.match_num, m.scout_name, m.report_status, m.alliance_station, m.auto_team, m.auto_power_cells, m.starting_position, m.cross_line, m.auto_scored, m.auto_comments, m.teleop_scored, m.rotation_control, m.rotation_timer, m.position_control, m.position_timer, m.end_game, m.end_game_timer, m.climb, m.level, m.level_position, m.communication, m.break, m.negatives, m.reflection_comments FROM match m RIGHT JOIN comp_team_mapping mapping on mapping.mapping_id=m.mapping_id INNER JOIN team t ON t.team_id=mapping.team_id INNER JOIN competition c ON c.competition_id=mapping.competition_id WHERE c.short_name = $1 AND t.team_num = $2 AND m.match_num = $3';
    const getPitDataValues = [
      req.params.shortName,
      req.params.teamNum,
      req.params.matchNum
    ];

    db.query(getPitDataQuery, getPitDataValues)
      .then(data => {
        console.log(data.rows);
        res.json({
          matchFormData: data.rows
        });
      })
      .catch(e => console.error(e.stack));
  }
);

router.post('/submitMatchForm', ensureAdmin, (req, res) => {
  let params = req.body;

  const addMatchQuery =
    'INSERT INTO match (mapping_id, match_num, scout_name, report_status,' +
    'alliance_station, auto_team, auto_power_cells, starting_position,' +
    'cross_line, auto_scored, auto_comments, teleop_scored, rotation_control,' +
    'rotation_timer, position_control, position_timer, end_game, end_game_timer,' +
    'climb, level, level_position, communication, break, negatives,' +
    'reflection_comments, last_modified)' +
    'VALUES (' +
    '(SELECT mapping_id FROM comp_team_mapping mapping INNER JOIN competition c ON c.competition_id=mapping.competition_id INNER JOIN team t ON t.team_id=mapping.team_id WHERE c.short_name = $1 AND t.team_num = $2),' +
    '$3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,' +
    '$17, $18, $19, $20, $21, $22, $23, $24, $25, $26, NOW())' +
    'ON CONFLICT (mapping_id, match_num) DO UPDATE SET match_num = EXCLUDED.match_num,' +
    'scout_name = EXCLUDED.scout_name, report_status = EXCLUDED.report_status,' +
    'alliance_station = EXCLUDED.alliance_station, auto_team = EXCLUDED.auto_team,' +
    'auto_power_cells = EXCLUDED.auto_power_cells, starting_position = EXCLUDED.starting_position,' +
    'cross_line = EXCLUDED.cross_line, auto_scored = EXCLUDED.auto_scored, auto_comments = EXCLUDED.auto_comments,' +
    'teleop_scored = EXCLUDED.teleop_scored, rotation_control = EXCLUDED.rotation_control,' +
    'rotation_timer = EXCLUDED.rotation_timer, position_control = EXCLUDED.position_control,' +
    'position_timer = EXCLUDED.position_timer, end_game = EXCLUDED.end_game, end_game_timer = EXCLUDED.end_game_timer,' +
    'climb = EXCLUDED.climb, level = EXCLUDED.level, level_position = EXCLUDED.level_position,' +
    'communication = EXCLUDED.communication, break = EXCLUDED.break, negatives = EXCLUDED.negatives,' +
    'reflection_comments = EXCLUDED.reflection_comments, last_modified = NOW()';
  const addMatchValues = [
    params.competition,
    params.teamNum,
    params.matchNum,
    params.scoutName,
    params.reportStatus,
    params.allianceStation,
    params.autoTeam,
    params.autoPowerCells,
    params.startingPosition,
    params.crossLine,
    params.autoScored,
    params.autoComments,
    params.teleopScored,
    params.rotationControl,
    params.rotationTimer,
    params.positionControl,
    params.positionTimer,
    params.endGame,
    params.endGameTimer,
    params.climb,
    params.level,
    params.levelPosition,
    params.communication,
    params.break,
    params.negatives,
    params.reflectionComments
  ];

  db.query(addMatchQuery, addMatchValues)
    .then(data => {
      console.log(data);
    })
    .catch(e => console.error(e.stack));
});
module.exports = router;
