const express = require('express');
const router = express.Router();

router.route('/')
  .get(echoAll)
  .post(echoAll)
  .put(echoAll);

function echoAll(req, res) {
  const method = req.method;
  const data = method === 'GET' ? req.query : req.body; // req.body applies to both post and put

  res.format({
    'text/plain': () => {
      res.send(data);
    },
    'text/html': () => {
      let html = '<ul>';
      for (key in data) {
        html += `<li>${key}: ${data[key]}</li>`;
      }
      html += '</ul>';
      res.send(html);
    },
    'application/json': () => {
      res.json(data);
    },
    'defualt': () => {
      res.status(406).send('Not Acceptable'); // 406 - Type of req data is not acceptable
    }
  });
}

module.exports = router;