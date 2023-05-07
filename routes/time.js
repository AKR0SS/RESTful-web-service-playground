const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  req.time = new Date().toString();
  next(); // Continues route execution
}, (req, res) => {
  res.json({ "time": req.time });
});

module.exports = router;