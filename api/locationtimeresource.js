/**
 * Created by bhavyaagg on 7/10/17.
 */

const router = require('express').Router();
const db = require('./../db/models');

router.get('/', (req, res) => {
  db.models.LocationTimeResource.findAll().then(locationTimes => {
    if (locationTimes.length !== 0) {
      res.status(200).send({
        success: true,
        data: locationTimes
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No Location-Times"
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
  db.models.LocationTimeResource.find({
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
        error: "No Location-Times with this id"
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
  db.models.LocationTimeResource.create({
    locationId: req.body.locationId,
    timeresourceId: req.body.timeresourceId
  }).then(resource => {
    if (resource) {
      res.status(201).send({
        success: true,
        data: resource.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "Location-Time not created"
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
  db.models.LocationTimeResource.update({
      locationId: req.body.locationId,
      timeresourceId: req.body.timeresourceId
    },
    {where: {id: +req.params.id}, returning: true}).then(resource => {
    if (resource) {
      res.status(200).send({
        success: true,
        data: resource.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "ocation not updated"
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
  db.models.LocationTimeResource.destroy(
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