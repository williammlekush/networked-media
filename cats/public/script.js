const app = { 

   questions: [],

   questionCounter: 0,

   initialize: function() {
      
      
      app.fetchQuestions()
      .then( () => {
         app.setQuestion(app.questionCounter);
         app.questionCounter ++;

         $(".choice").click( () => {
            app.setQuestion(app.questionCounter);
            app.questionCounter ++;

            if (app.questionCounter == 9) {
               app.end();
            };
         });

         $(".btn-get-cat").click();
      });
   },

   end: function() {
      $(".choice").off();
      $(".choice").click(() => {
         $(".btns-choice").hide();
         $(".lead").hide();
         app.fetchCat();
         $(".question").text("Congratulations, you are this type of cat!")
      });
   },

   fetchQuestions: async function() {
      const url = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'
      await $.get(url)
      .then( data => {
         app.questions = data.results;
         console.log(data.results);
      });
   },

   setQuestion: function(questionIndex) {
      const question = app.questions[questionIndex];
      question.incorrect_answers.push(question.correct_answer);

      const rdmAnswers = question.incorrect_answers.sort(
         (a, b) => {
            return 0.5 - Math.random();
         }
      );

      $(".question").text(String(question.question));
      $(".choice-1").text(String(rdmAnswers[0]));
      $(".choice-2").text(String(rdmAnswers[1]));
      $(".choice-3").text(String(rdmAnswers[2]));
      $(".choice-4").text(String(rdmAnswers[3]));
   },

   fetchCat: function() {
      const url = 'https://api.thecatapi.com/v1/images/search?api_key='
      const params = { limit: 1, size: "full" }

      $.get(url, params)
      .then( data => { 
         console.log(data);
         app.displayCat(data[0].url);
      });

   },

   displayCat: function(srcUrl) {
      const bg = `url(${srcUrl})`
      $(".frame-cat-pic").css("background-image", bg);
   },  
}


jQuery(
   () => {
      app.initialize();
   }
)



