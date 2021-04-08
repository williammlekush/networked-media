const app = {

   scoreSubmit: $('.score-submit'),

   prompt: $('.prompt'),

   wordInputLabel: $('.label-word-in'),
   wordInput: $('#word-in'),

   words: $('.word'),

   wordsArr: [],

   buttons: {
      newWord: $('#new-word'),
      end: $('#end'),
      restart: $('#restart'),
   },

   initialize: function() {
      app.buttons.end.hide();
      app.scoreSubmit.hide();
      app.buttons.restart.hide();
      
      app.buttons.newWord.click(app.newWord);
      app.buttons.end.click(app.end);

      $(document).keypress(function(event){
         var keycode = (event.keyCode ? event.keyCode : event.which);
         if(keycode == '13'){
            app.buttons.newWord.click();
         }
     });
   },

   newWord: function() {
      const word = app.wordInput.val();

      app.updatePrompt(word);

      if (app.wordsArr.length > 0) {
         position = app.getNewPosition();

         app.addWord({
            word: app.wordsArr[app.wordsArr.length - 1],
            top: position.top,
            left: position.left
         })
      } else {
         app.buttons.end.show();
      }

      app.wordsArr.push(word);
      app.wordInput.val('');

      if (app.wordsArr.length === 1) {
         app.buttons.restart.show();
         app.buttons.restart.click(app.restart);
      }
   },

   end: function() {
      app.buttons.newWord.hide();
      app.buttons.end.hide();
      app.wordInput.hide();
      app.wordInputLabel.hide();

      app.updatePrompt(`Words Added: ${app.wordsArr.length}`);
      app.prompt.css('font-size', '1.5em');

      app.buttons.restart.show();
      app.scoreSubmit.show();

      $('.score').val(app.wordsArr.length);
   },

   restart: function() {
      app.buttons.newWord.show();
      app.wordInput.show();
      app.wordInputLabel.show();

      app.updatePrompt('');
      app.prompt.css('font-size', '1em');

      app.buttons.restart.hide();
      app.buttons.end.hide();
      app.scoreSubmit.hide();

      $('.word').remove();
      app.wordsArr = [];
   },

   updatePrompt: function(newPrompt) {
      app.prompt.text(newPrompt);
   },

   addWord: function({word, top, left}) {
      const wordElem = $('<p></p>').text((word)); 
      wordElem.css({'top':`${top}px`, 'left':`${left}px`});
      wordElem.addClass('word');
      $('body').append(wordElem);
   },

   getNewPosition() {
      topNew = app.getRandomInt(50, window.innerHeight - 50);
      leftNew = app.getRandomInt(50, window.innerWidth - 50);      

      if ($('.word').length > 0) {
         $('.word').each(
            (index, word) => {
               top = $(word).css('top');
               left = $(word).css('left');

               if (`${topNew}px` === top && `${leftNew}px` === left) {
                  app.getNewPosition;
               }
            }
         );
      };

      return { top: topNew, left: leftNew }
   },
   
   getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
   },
   
}
$(document).ready(app.initialize());