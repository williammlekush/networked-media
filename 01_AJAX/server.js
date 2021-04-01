const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');

const app = express();
const urlencoderParser = bodyParser.urlencoded({ extendend: true });

const squares = new Datastore({filename: "squares.db", autoload: true});
app.use(express.static('public'));
app.use(urlencoderParser);

let position = { x: 300, y: 300 };

app.get(
   '/squares',
   (req, res) => {
      squares.find(
         {},
         (err, data) => {
            res.send(data);
         }
      )
   }
)

app.get(
   '/position',
   (req, res) => {
      res.send(position);
   }
)

app.get(
   '/newmove',
   async (req, res) => {
      console.log("query", req.query);

      const data = {
         x: req.query.x,
         y: req.query.y,
         color: req.query.color
      };

      await insertData({
         database: squares,
         data: data
      });

      position = { x: data.x, y: data.y };
   }
)

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});

async function insertData({database, data}) {
   database.insert(data, function(err) {
      console.log(err);
   });
}

async function pushSquare({databaseId, data}) {
   scores.update(
      { dbId: databaseId },
      { $push: { scores: data } },
      {},
      (err) => {
         console.log(err);
      }
   );
}

