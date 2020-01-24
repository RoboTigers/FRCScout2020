var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/pitNav', (req, res) => {
  //   console.log(req);
  let returnData;
  //   let params = req.body;
  const getPitTableQuery =
    'SELECT t.num, t.name, p.status FROM pit p INNER JOIN team t ON t.team_id=p.team_id INNER JOIN competition c ON c.competition_id=p.competition_id WHERE c.name = $1;';
  const getPitTableValues = ['HVR'];

  db.query(getPitTableQuery, getPitTableValues)
    .then(res => {
      returnData = res;
    })
    .catch(e => console.error(e.stack));

  res.json({
    returnData
  });
});

module.exports = router;
