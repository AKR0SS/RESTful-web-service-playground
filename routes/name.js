const express = require('express');
const router = express.Router();

router.route('/')
  .get(nameReply)
  .post(nameReply)

// Secondary route within a route
router.get('/about', (req, res) => {
  res.send('The /routes/name endpoint sends back the first and last name you send in your request.');
});

function nameReply(req, res) {
  const method = req.method;

  // Reads from our form of whether the req was a GET or some other req
  //    which has to be POST from our other form button
  const firstName = method === 'GET' ? req.query.first : req.body.first;
  const lastName = method === 'GET' ? req.query.last : req.body.last;

  res.format({
    'text/plain': () => { // Can either be specified or when the specified accepted header is plain text
      res.send(`name: ${firstName} ${lastName}`);
    },
    'text/html': () => { // Specified accepted header returns a DOM
      let html = '<ul>';
      html += `<li>name: ${firstName} ${lastName}</li>`;
      html += '</ul>';
      res.send(html);
    },
    'application/json': () => { // Specified accepted header returns json
      res.json({ "name": `${firstName} ${lastName}` });
    },
    'default': () => {
      res.status(406).send('Not Acceptable'); // 406 - Type of req data is not acceptable
    }
  });
}

module.exports = router;