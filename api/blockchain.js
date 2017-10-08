/**
 * Created by bhavyaagg on 8/10/17.
 */

const router = require('express').Router();
const db = require('./../db/models');

router.get('/', (req, res) => {
  db.models.BlockChain.findAll().then(blocks => {
    if (blocks.length !== 0) {
      res.status(200).send({
        success: true,
        data: blocks
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No blocks"
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send({
      success: false,
      error: "Internal server error"
    })
  })
});

module.exports = router;