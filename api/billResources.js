/**
 * Created by bhavyaagg on 7/10/17.
 */

const router = require('express').Router();
const db = require('./../db/models');

router.get('/', (req, res) => {
  db.models.BillResource.findAll().then(billResources => {
    if (billResources.length !== 0) {
      res.status(200).send({
        success: true,
        data: billResources
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No billResources"
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
  db.models.BillResource.find({
    where: {id: +id}
  }).then(billResource => {
    if (billResource) {
      res.status(200).send({
        success: true,
        data: billResource.get()
      })
    }
    else {
      res.status(404).send({
        success: false,
        error: "No billResource with this id"
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
  db.models.BillResource.create({
    name: req.body.name
  }).then(billResource => {
    if (billResource) {
      res.status(201).send({
        success: true,
        data: billResource.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "billResource not created"
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
  db.models.BillResource.update({
      name: req.body.name
    },
    {where: {id: +req.params.id}, returning: true}).then(billResource => {
    if (billResource) {
      res.status(200).send({
        success: true,
        data: billResource.get()
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "billResource not updated"
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
  db.models.BillResource.destroy(
    {where: {id: +req.params.id}}).then(isDeleted => {
    if (isDeleted) {
      res.status(200).send({
        success: true
      })
    }
    else {
      res.status(401).send({
        success: false,
        error: "billResource not deleted"
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