const router = require('express').Router();
const xml2js = require('xml2js');
const fs = require('fs');
const estimator = require('./estimator');

const startTime = null;
const endTime = null;

router.post('/', (req, res) => {
  res.status(200).send(estimator(req.body));
});

router.post('/:type', (req, res) => {
  let myEstimate = estimator(req.body);

  if (req.params.type === 'xml') {
    const builder = new xml2js.Builder({
      rootName: 'estimate',
      trim: true
    });
    myEstimate = builder.buildObject(myEstimate);
    res.type(​'​application/xml​'​);
    res.status(200).send(myEstimate);
  } else {
    // json
    res.status(200).send(myEstimate);
  }
});

router.get('/logs', (req, res) => {
  // Read server.log
  fs.readFile('server.log', 'utf8', (err, file) => {
    if (err) {
      // show the error
    } else {
      res​.​type​(​'​text/plain​'​);
      res.status(200).send(file);
    }
  });
});

module.exports = router;
