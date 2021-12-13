const express = require('express');
const { path } = require('express/lib/application');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  res.send(JSON.stringify({ x: 1, y: 4 }));
});

// app.use(express.static('build'));
// app.use('/static', express.static(__dirname + '/public'));
app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
