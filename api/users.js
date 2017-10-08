/**
 * Created by bhavyaagg on 7/10/17.
 */

const router = require('express').Router();
const db = require('./../db/models');

router.get('/', (req, res) => {
  db.models.Users.findAll().then(users => {
    if (users.length !== 0) {
      res.status(200).send({
        success: true,
        data: users
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No users"
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

router.get('/:id', (req, res) => {
  db.models.Users.find({
    where: {id: +id}
  }).then(user => {
    if (user) {
      res.status(200).send({
        success: true,
        data: user.get()
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No user with this id"
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

router.post('/', (req, res) => {
  db.models.Users.create({
    name: req.body.name,
    contact: req.body.contact
  }).then(user => {
    if (user) {
      res.status(201).send({
        success: true,
        data: user.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "User not created"
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

router.put('/:id', (req, res) => {
  db.models.Users.update({
      name: req.body.name,
      contact: req.body.contact,
      balance: req.body.balance
    },
    {where: {id: +req.params.id}, returning: true}).then(user => {
    if (user) {
      res.status(200).send({
        success: true,
        data: user.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "User not updated"
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

router.delete('/:id', (req, res) => {
  db.models.Users.destroy(
    {where: {id: +req.params.id}}).then(isDeleted => {
    if (isDeleted) {
      res.status(200).send({
        success: true
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "User not deleted"
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