var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/competitions/:shortName/pits', (req, res) => {
  const getPitTableQuery =
    "SELECT t.team_num, t.team_name, COALESCE(p.status, 'Not Started') FROM comp_team_mapping mapping LEFT JOIN pit p ON p.mapping_id=mapping.mapping_id INNER JOIN team t ON t.team_id=mapping.team_id INNER JOIN competition c ON c.competition_id=mapping.competition_id WHERE c.short_name = $1";
  const getPitTableValues = [req.params.shortName];

  db.query(getPitTableQuery, getPitTableValues)
    .then(data => {
      console.log(data.rows);
      res.json({
        pitData: data.rows
      });
    })
    .catch(e => console.error(e.stack));
});

module.exports = router;
