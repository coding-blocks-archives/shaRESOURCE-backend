/**
 * Created by bhavyaagg on 7/10/17.
 */

const router = require('express').Router();
const db = require('./../db/models');

router.get('/', (req, res) => {
  db.models.Locations.findAll().then(locations => {
    if (locations.length !== 0) {
      res.status(200).send({
        success: true,
        data: locations
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No locations"
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
  db.models.Locations.find({
    where: {id: +id}
  }).then(location => {
    if (location) {
      res.status(200).send({
        success: true,
        data: location.get()
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No location with this id"
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
  db.models.Locations.create({
    name: req.body.name
  }).then(location => {
    if (location) {
      res.status(201).send({
        success: true,
        data: location.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "location not created"
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
  db.models.Locations.update({
      name: req.body.name
    },
    {where: {id: +req.params.id}, returning: true}).then(location => {
    if (location) {
      res.status(200).send({
        success: true,
        data: location.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "location not updated"
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
  db.models.Locations.destroy(
    {where: {id: +req.params.id}}).then(isDeleted => {
    if (isDeleted) {
      res.status(200).send({
        success: true
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "location not deleted"
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