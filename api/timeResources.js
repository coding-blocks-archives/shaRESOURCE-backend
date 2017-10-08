/**
 * Created by bhavyaagg on 7/10/17.
 */

const router = require('express').Router();
const db = require('./../db/models');

router.get('/', (req, res) => {
  db.models.TimeResource.findAll().then(timeResources => {
    if (timeResources.length !== 0) {
      res.status(200).send({
        success: true,
        data: timeResources
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No timeResources"
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
  db.models.TimeResource.find({
    where: {id: +id}
  }).then(timeResource => {
    if (timeResource) {
      res.status(200).send({
        success: true,
        data: timeResource.get()
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No timeResource with this id"
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
  db.models.TimeResource.create({
    name: req.body.name,
    cost: req.body.cost
  }).then(timeResource => {
    if (timeResource) {
      res.status(201).send({
        success: true,
        data: timeResource.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "timeResource not created"
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
  db.models.TimeResource.update({
      name: req.body.name,
      cost: req.body.cost
    },
    {where: {id: +req.params.id}, returning: true}).then(timeResource => {
    if (timeResource) {
      res.status(200).send({
        success: true,
        data: timeResource.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "timeResource not updated"
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
  db.models.TimeResource.destroy(
    {where: {id: +req.params.id}}).then(isDeleted => {
    if (isDeleted) {
      res.status(200).send({
        success: true
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "timeResource not deleted"
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