const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/db.js');
const cors = require('cors');
const PORT = 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
  let productId = req.query.ID || 48;
  db.getAllItemInfo(productId, (err, itemInfo) => {
    if (err) {
      console.log('error getting info from db');
      res.send(err);
    }
    res.send(itemInfo);
  })
  //res.end();
});

app.get('/items', (req, res) => {
  console.log('items request received');
  let productId = req.query.ID || 48;
  db.getAllItemInfo(productId, (err, itemInfo) => {
    if (err) {
      console.log('we got an error');
    }
    res.send(itemInfo);
  });
 //res.end();
});

app.listen(PORT, () => {
  console.log(`yippie-kay-yay, now listening on port ${PORT}`);
})