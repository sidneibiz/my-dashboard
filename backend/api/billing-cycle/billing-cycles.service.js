const BillingCycle = require('./billing-cycle');
const _ = require('lodash');

BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({
  new: true, // quando alterado ele retorna o novo regitro e nao o antigo
  runValidators: true // valida para que quando alterarmos ele valide nosso registro
});

const parseErrors = (nodeRestfulErrors) => {
  const errors = [];
  _.forIn(nodeRestfulErrors, error => errors.push(error.message));
  return errors;
};

const sendErrorsOrNext = (req, res, next) => {
  const bundle = res.locals.bundle;

  if (bundle.errors) {
    var errors = parseErrors(bundle.errors);
    res.status(500).json({ errors });
  } else next();
};

BillingCycle.after('post', sendErrorsOrNext)
  .after('put', sendErrorsOrNext);

BillingCycle.route('count', (req, res, next) => {
  BillingCycle.count((err, value) => {
    if (err) res.status(500).json({ errors: [err] });
    else res.json({ value });
  });
});

module.exports = BillingCycle;