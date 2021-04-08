// const https = require("https");
// const fs = require("fs");

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const nedb = require('nedb');

const app = express();
const urlencoderParser = bodyParser.urlencoded({ extendend: true });
const scoredb = new nedb({filename: 'databases/score-data.db', autoload: true});
const quotedb = new nedb({filename: 'databases/quote-data.db', autoload: true});
const midtermScores = new nedb({filename: 'databases/midterm-scores.db', autoload: true});
// const credentials = {}

app.use(express.static('public'));
app.use(urlencoderParser);

// set the view engine to use ejs for templating
app.set('view engine', ejs);

app.get(
   '/',
   (req, res) => {
      res.render('index.ejs')
   }   
)

app.get(
   '/go',
   (req, res) => {
      res.render('go.ejs');
   }
)

app.post(
   '/go-scores', 
   (req, res) => {
      const dataToStore = {
         username: req.body.username,
         score: req.body.score
      }
      if (dataToStore.username.length <= 0) {
         res.render('go.ejs');
      } else {
         insertData(
            {  database: scoredb,
               data: dataToStore
            }
         ).then(
            () => {
               renderPageWithData(
                  {  database: scoredb,
                     template: 'go-scores.ejs',
                     response: res,
                     persist: true,
                  }
               );
            }
         ); 
      }        
   }
)


app.get(
   '/tag',
   (req, res) => {
      res.render('tag.ejs')
   }
)

app.get(
   '/favorite-quotes',
   (req, res) => {
      renderPageWithData(
         {  database: quotedb,
            template: 'favorite-quotes.ejs',
            response: res,
            persist: false,
         }
      );
   }
)  

app.post(
   '/favorite-quotes', 
   (req, res) => {

      const dataToStore = {
         quote: req.body.quote,
         author: req.body.author,
      }

      console.log(dataToStore);

      if (dataToStore.quote.length <= 0 || dataToStore.author.length <= 0) {
         console.log('ERROR: NO DATA');
      } else {
         insertData(
            {  database: quotedb,
               data: dataToStore,
            }
         );   
      }
      
      renderPageWithData(
         {
            database: quotedb,
            template: 'favorite-quotes.ejs',
            response: res,
            persist: true
         }
      );
   }
);

// MARK: Midterm

app.get(
   '/games-no',
   (req, res) => {
      res.render('midterm/index.ejs')
   }   
)

app.get(
   '/midterm-go',
   (req, res) => {
      res.render('midterm/go.ejs');
   }
)

app.get(
   '/midterm-tag',
   (req, res) => {
      res.render('midterm/tag.ejs')
   }
)

app.get(
   '/midterm-quiz',
   (req, res) => {
      res.render('midterm/quiz.ejs')
   }
)

app.get(
   '/midterm-word',
   (req, res) => {
      res.render('midterm/word.ejs')
   }
)

app.get(
   '/midterm-pattern',
   (req, res) => {
      res.render('midterm/pattern.ejs')
   }
)

app.get(
   '/midterm-scores',
   (req, res) => {
      renderPageWithData(
         {
            database: midtermScores,
            template: 'midterm/scores.ejs',
            response: res
         }
      )
   }
)

app.post(
   '/scores',
   (req, res) => {
      const dataToStore = {
         score: req.body.score,
         username: req.body.username
      };

      pushScore(
         {  databaseId: req.body.database,
            data: dataToStore
         }
      ).then(
         renderPageWithData(
            {  database: scores,
               template: 'scores.ejs',
               response: res,
            }
         )
      ); 
   }
)


app.listen(80, function () {
  console.log('Example app listening on port 80!')
});

// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(443);

async function renderPageWithData({database, template, response, persist}) {
   database.find({}, 
      function(err, data) {
         if (data.length <= 0 && persist) {
            renderPageWithData(
               {
                  database: database,
                  template: template,
                  response: response,
                  persist: true,
               }
            );
         } else {
            const dataWrapper = {
               data: data
            }
            response.render(template, dataWrapper);
         }
      }
   )
}

async function insertData({database, data}) {
   database.insert(data, function(err) {
      console.log(err);
   });
}

