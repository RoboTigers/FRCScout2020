var express = require('express');
var router = express.Router();
const db = require('../db');

router.post('pitForm', (req, res) => {
  let params = req.body;
  const addPitQuery =
    'INSERT INTO pit (competition_id, team_id, status, group_name, weight,' +
    'height, drive_train, motors, wheels, drive_comments,' +
    'code_language, auto_comments, abilities, working_comments,' +
    'closing_comments, last_modified)' +
    'VALUES (' +
    '(select competition_id from competition where short_name=$1),' +
    '(select team_id from team where team_num=$2),' +
    '$3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())' +
    'RETURNING *';
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
    .then(res => {
      console.log(res.rows[0]);
    })
    .catch(e => console.error(e.stack));

  res.json({
    message: `We saved team ${params.teamNum} pit for ${params.competition}`,
    params
  });
});

module.exports = router;
