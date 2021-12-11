const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  const sqlText = `
    SELECT "name" FROM "genres"
      JOIN "movies_genres"
        ON "genres"."id"="movies_genres"."genre_id"
      WHERE "movies_genres"."movie_id"=$1;
  `;
  pool.query(sqlText, [req.params.id])
    .then((dbRes) => {
      res.send(dbRes.rows);
    }).catch(err => {
      console.log('ERROR: Get by id categories', err);
      res.sendStatus(500)
    })
});

module.exports = router;