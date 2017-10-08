/**
 * Created by bhavyaagg on 7/10/17.
 */

const router = require('express').Router();
const db = require('./../db/models');

router.get('/', (req, res) => {
  db.models.QuantityResource.findAll().then(quantityResources => {
    if (quantityResources.length !== 0) {
      res.status(200).send({
        success: true,
        data: quantityResources
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No quantityResources"
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
  db.models.QuantityResource.find({
    where: {id: +id}
  }).then(quantityResource => {
    if (quantityResource) {
      res.status(200).send({
        success: true,
        data: quantityResource.get()
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No quantityResource with this id"
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
  db.models.QuantityResource.create({
    name: req.body.name,
    cost: req.body.cost
  }).then(quantityResource => {
    if (quantityResource) {
      res.status(201).send({
        success: true,
        data: quantityResource.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "quantityResource not created"
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
  db.models.QuantityResource.update({
      name: req.body.name,
      cost: req.body.cost
    },
    {where: {id: +req.params.id}, returning: true}).then(quantityResource => {
    if (quantityResource) {
      res.status(200).send({
        success: true,
        data: quantityResource.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "quantityResource not updated"
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
  db.models.QuantityResource.destroy(
    {where: {id: +req.params.id}}).then(isDeleted => {
    if (isDeleted) {
      res.status(200).send({
        success: true
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "quantityResource not deleted"
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