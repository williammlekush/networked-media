const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const database = require('mime-db');

const app = express();
const urlencoderParser = bodyParser.urlencoded({ extendend: true });

const squares = new Datastore({filename: "squares.db", autoload: true});
app.use(express.static('public'));
app.use(urlencoderParser);

app.get(
   '/squares',
   (req, res) => {
      squares.find(
         {"_id": { $ne: "pos" } },
         (err, data) => {
            res.send(data);
         }
      )
   }
)

app.get(
   '/position',
   (req, res) => {
      squares.find(
         {"_id": "pos"},
         (err, data) => {
            res.send(data)
         }
      )
   }
)

app.get(
   '/newmove',
   (req, res) => {
      console.log(req.query);

      const data = {
         x: req.query.x,
         y: req.query.y
      };

      insertData({
         database: squares,
         data: data
      });

      squares.update({ "_id": "pos" }, { $set: { "x": req.query.x, "y": req.query.y } }, {}, function () {});
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

