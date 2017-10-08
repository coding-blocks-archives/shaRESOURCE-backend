/**
 * Created by bhavyaagg on 7/10/17.
 */

const router = require('express').Router();
const db = require('./../db/models');

router.get('/', (req, res) => {
  db.models.LocationQuantityResource.findAll().then(locationQuantities => {
    if (locationQuantities.length !== 0) {
      res.status(200).send({
        success: true,
        data: locationQuantities
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No Location-Quantities"
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
  db.models.LocationQuantityResource.find({
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
        error: "No Location-Quantities with this id"
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
  db.models.LocationQuantityResource.create({
    locationId: req.body.locationId,
    quantityResourceId: req.body.quantityResourceId
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
        error: "Location-Quantity not created"
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
  db.models.LocationQuantityResource.update({
      locationId: req.body.locationId,
      quantityResourceId: req.body.quantityResourceId
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
        error: "Location-Quantity not updated"
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
  db.models.LocationQuantityResource.destroy(
    {where: {id: +req.params.id}}).then(isDeleted => {
    if (isDeleted) {
      res.status(200).send({
        success: true
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "Location-Quantity not deleted"
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