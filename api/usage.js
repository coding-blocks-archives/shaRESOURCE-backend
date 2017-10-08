/**
 * Created by bhavyaagg on 8/10/17.
 */

const BlockchainHandler = require('../blockchainHandler');

const router = require('express').Router();
const db = require('./../db/models');


router.post('/time', (req, res) => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  db.models.LocationTimeResource.findOne({
    where: {
      id: +req.body.locationtimeId
    },
    include: [db.models.TimeResource]
  }).then((locationTimeData) => {
    let slot = hours * 4 + Number.parseInt(minutes / 15) + 1;
    let amount = locationTimeData.timeresource.cost;
    db.models.Usage.create({
      userId: +req.body.userId,
      locationtimeresourceId: +req.body.locationtimeId,
      slot: slot,
      amount: amount
    }).then((usage) => {

      db.models.Usage.findOne({
        where: {id: usage.id},
        include: [db.models.Users]
      }).then((finalUsage) => {
        let result = BlockchainHandler.addTransaction({
          usageId: finalUsage.id,
          amount: finalUsage.amount,
          user: finalUsage.user.name
        });
        res.send({success: result.success, data: finalUsage.get()})
      }).catch((err) => {
        console.log('Internal Server Error');
        res.send("Error");
      });
    }).catch((err) => {
      console.log('Internal Server Error');
      res.send("Error");
    });

  }).catch((err) => {
    console.log('Internal Server Error');
    res.send("Error");
  })
});

router.post('/bill', (req, res) => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  db.models.LocationBillResource.findOne({
    where: {
      id: +req.body.locationBillId
    },
    include: [db.models.BillResource]
  }).then((locationBillData) => {
    db.models.Usage.create({
      userId: +req.body.userId,
      locationbillresourceId: +req.body.locationtimeId,
      amount: req.body.amount
    }).then((usage) => {
      console.log(usage);
      db.models.Usage.findOne({
        where: {id: usage.id},
        include: [db.models.Users]
      }).then((finalUsage) => {
        const result = BlockchainHandler.addTransaction({
          usageId: finalUsage.id,
          amount: finalUsage.amount,
          user: finalUsage.user.name
        });
        res.send({success: result.success, data: finalUsage.get()})

      }).catch((err) => {
        console.log('Internal Server Error');
        res.send("Error");
      });

    }).catch((err) => {
      console.log('Internal Server Error');
      res.send("Error");
    });

  }).catch((err) => {
    console.log('Internal Server Error');
    res.send("Error");
  })
});

router.post('/quantity', (req, res) => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  db.models.LocationQuantityResource.findOne({
    where: {
      id: +req.body.locationQuantityId
    },
    include: [db.models.QuantityResource]
  }).then((locationQuantityData) => {
    let amount = locationQuantityData.quantityresource.cost * req.body.quantity;
    db.models.Usage.create({
      userId: +req.body.userId,
      locationquantityresourceId: +req.body.locationquantityId,
      amount: amount
    }).then((usage) => {
      console.log(usage);

      db.models.Usage.findOne({
        where: {id: usage.id},
        include: [db.models.Users]
      }).then((finalUsage) => {
        const result = BlockchainHandler.addTransaction({
          usageId: finalUsage.id,
          amount: finalUsage.amount,
          user: finalUsage.user.name
        });
        res.send({success: result.success, data: finalUsage.get()})

      }).catch((err) => {
        console.log('Internal Server Error');
        res.send("Error");
      });

    }).catch((err) => {
      console.log('Internal Server Error');
      res.send("Error");
    });

  }).catch((err) => {
    console.log('Internal Server Error');
    res.send("Error");
  })
});

module.exports = router;