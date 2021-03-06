const router = require('express').Router();
const xml2js = require('xml2js');
const fs = require('fs');
const estimator = require('./estimator');


router.post('/', (req, res) => {
  res.status(200).send(estimator(req.body));
});

router.post('/:type', (req, res) => {
  if (req.params.type === 'xml') {
    // convert estimator(req.body) to xml
    const builder = new xml2js.Builder({
      rootName: 'estimate',
      trim: true
    });
    const myEstimate = builder.buildObject(estimator(req.body));
    res.type('application/xml');
    res.status(200).send(myEstimate);
  } else {
    // json
    res.status(200).send(estimator(req.body));
  }
});

router.get('/logs', (req, res) => {
  // Read server.log
  fs.readFile('logs.txt', 'utf8', (err, file) => {
    if (err) {
      // console.log(err)
    } else {
      // return contents of the file
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(file);
    }
  });
});

module.exports = router;
