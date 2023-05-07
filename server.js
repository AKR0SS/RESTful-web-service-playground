const express = require("express");
const cors = require("cors");

/** Middleware **/
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.options("*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', '*GET, PUT, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');

  res.send(200);
});

// Handling Json Requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next(); // Continue route execution 
});

/** Routes **/

// Static routes
app.use(express.static('public'));
app.use(express.static('css'));

// Page Routes
const timeRoutes = require('./routes/time.js');
const nameRoutes = require('./routes/name.js');
const jsonRoutes = require('./routes/json.js');
const echoAllRoutes = require('./routes/echo-all');

app.use('/routes/time', timeRoutes);
app.use('/routes/name', nameRoutes);
app.use('/routes/json', jsonRoutes);
app.use('/routes/echo-all', echoAllRoutes);

// HTML routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/views/form.html');
});

// Json routes
app.get('/:word/echo', (req, res) => {
  res.json({ "echo": req.params.word });
});



// Default route
app.all("*", (req, res) => {
  res.send("Invalid route");
});

// Stays at the bottom of file
app.listen(PORT, () => console.log(`Listening on ${PORT}`));