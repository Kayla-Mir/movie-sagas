const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// generic GET route for all genres
  // sends all from genres
  // or sends an error
router.get('/', (req, res) => {
  const sqlText = `
    SELECT * FROM "genres"
  `;
  pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows);
    }).catch((dbErr) => {
      console.log('error in get categories', dbErr);
      res.sendStatus(500);
    })
})

// specific GET route for genre based on movie id
  // sends single genre name
  // or sends an error
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