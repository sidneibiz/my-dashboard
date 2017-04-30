const _ = require('lodash');
const BillingCycle = require('../billing-cycle/billing-cycle');

// new middleware
const getSummary = (req, res) => {
  // documentation: https://docs.mongodb.com/manual/reference/operator/aggregation/
  BillingCycle.aggregate({
    $project: {
      credit: { $sum: '$credits.value' },
      debt: { $sum: '$debts.value' }
    }
  },
    {
      $group: {
        _id: null,
        credit: { $sum: '$credit' },
        debt: { $sum: '$debt' }
      }
    },
    {
      $project: {
        _id: 0,
        credit: 1,
        debt: 1
      }
    },
    response = (err, result) => {
      if (err) res.status(500).json({ errors: [err] });
      else res.json(_.defaults(result[0], {
        credit: 0,
        debt: 0
      }));
    });
};

module.exports = { getSummary };