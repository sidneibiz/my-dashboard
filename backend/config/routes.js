const express = require('express');

module.exports = (server) => {

  //API routes
  const router = express.Router();
  server.use('/api', router);

  // my routes
  const billingCyclesService = require('../api/billing-cycle/billing-cycles.service');
  billingCyclesService.register(router, '/billingCycles');

  const billingSummaryService = require('../api/billing-summary/billing-sumarry.service');
  router.route('/billingSummary').get(billingSummaryService.getSummary);

};