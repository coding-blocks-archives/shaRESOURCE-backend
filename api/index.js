/**
 * Created by bhavyaagg on 7/10/17.
 */

const router = require('express').Router();

router.use('/locations', require('./locations'));
router.use('/users', require('./users'));
router.use('/timeresources', require('./timeResources'));
router.use('/quantityresources', require('./quantityResources'));
router.use('/billresources', require('./billResources'));
router.use('/locationtime', require('./locationtimeresource'));
router.use('/locationquantity', require('./locationquantityresource'));
router.use('/locationnbill', require('./locationbillresource'));
router.use('/usage', require('./usage'));
router.use('/blockchain', require('./blockchain'));

module.exports = router;