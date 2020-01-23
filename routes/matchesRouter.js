var express = require('express');
var router = express.Router();
const db = require('../db')

router.get('/matches', (req, res) => {
  res.json({message: 'received'}) /* TODO: Return list of matches for specified competition for display with EDIT/DELETE and NEW buttons */
})

router.post('/matches', (req, res) => {
  let params = req.body
  const values = [ 1, 1, params.matchNum ]; 

  const addMatchQuery = 'INSERT INTO match (competition_id, team_id, match_num, last_modified)  VALUES ($1, $2, $3, NOW()) RETURNING *'
  const addMatchValues = [1, 1, params.matchNum ]

  const selectMatchesQuery = 'SELECT competition_id, is_current FROM competition where name = $1'
  const selectMatchesValues = [ 'Hudson' ]

  db
    .query(addMatchQuery, addMatchValues)
    .then(res => {
      console.log(res.rows[0])
    })
    .catch(e => console.error(e.stack))
  
  res.json(
    { 
      message: `We saved team ${params.teamNum} match ${params.matchNum} for ${params.competition}`,
      params
    }
  )
})

module.exports = router;
