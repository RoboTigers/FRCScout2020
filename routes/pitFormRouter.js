var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/competitions/:shortName/team/:teamNum/pit', (req, res) => {
  const getPitDataQuery =
    'SELECT t.team_num, t.team_name, c.short_name, p.status, p.group_name, p.weight, p.height, p.drive_train, p.motors, p.wheels, p.drive_comments, p.code_language, p.auto_comments, p.abilities, p.working_comments, p.closing_comments FROM pit p RIGHT JOIN comp_team_mapping mapping on mapping.mapping_id=p.mapping_id INNER JOIN team t ON t.team_id=mapping.team_id INNER JOIN competition c ON c.competition_id=mapping.competition_id WHERE c.short_name = $1 AND t.team_num = $2';
  const getPitDataValues = [req.params.shortName, req.params.teamNum];

  db.query(getPitDataQuery, getPitDataValues)
    .then(data => {
      console.log(data.rows);
      res.json({
        pitFormData: data.rows
      });
    })
    .catch(e => console.error(e.stack));
});

router.post('/submitPitForm', (req, res) => {
  let params = req.body;
  const addPitQuery =
    'INSERT INTO pit (mapping_id, status, group_name, weight,' +
    'height, drive_train, motors, wheels, drive_comments,' +
    'code_language, auto_comments, abilities, working_comments,' +
    'closing_comments, last_modified)' +
    'VALUES (' +
    '(SELECT mapping_id FROM comp_team_mapping mapping INNER JOIN competition c ON c.competition_id=mapping.competition_id INNER JOIN team t ON t.team_id=mapping.team_id WHERE c.short_name = $1 AND t.team_num = $2),' +
    '$3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())';
  const addPitValues = [
    params.competition,
    params.teamNum,
    params.status,
    params.group_name,
    params.weight,
    params.height,
    params.drive_train,
    params.motors,
    params.wheels,
    params.drive_comments,
    params.code_language,
    params.auto_comments,
    params.abilities,
    params.working_comments,
    params.closing_comments
  ];

  db.query(addPitQuery, addPitValues)
    .then(data => {
      console.log(data);
    })
    .catch(e => console.error(e.stack));
});

module.exports = router;
