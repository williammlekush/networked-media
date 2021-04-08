const app = {
   promptArr: [
      'Welcome! You made it! There\'s a prize waiting for you ahead! Choose wisely.',
      'You are nothing. Choose again.',
      'Finally, you can start being useful. Don\'t forget about the prize!',
      'Keep going. The prize is waiting for you!',
      'Congratulations! You can keep choosing!',
      'You\'re almost there! We love your choices so far! Keep going!',
      'Congratulations! You\'re one of us!',
      'We\'ve left another prize for you up ahead. Don\'t stop now!',
      'Congratulations! Are you ready for the next one?',
      'There\'s an even better prize waiting for you!',
      'Just one more step, keep going!',
      'You\'re almost there!',
      'Wow, you\'re still here. Well, the prize is right in front of you!',
      'Thank you for another one to take on this journey! Here\'s another prize. Keep going for the next one!',
      'This one might take a while to reach, but hang in there!',
      'Ah, finally, you can relax. We\'re so proud of you. You\'re close to the last prize. Good luck.',
      'Can you see it, yet? It\'s up ahead. Just keep going!',
      'You weren\'t supposed to come this far. The rest is up to you.'
   ],

   newSentenceIndices: [0, 1, 5, 6, 14, 15, 18, 19, 22, 23, 24, 25, 30, 31, 32, 65, 66, 80, 81],

   endPrompt: 'We\'d be sad to see you go, but you\'ll come back. You always do.',

   counter: 0,

   timer: 0,

   initialize: function() {
      app.getCounter();
      app.getNextSentence();
      app.startTimer();
   },

   updateData: function() {
      app.increaseCounter();
      app.getNextSentence();
      app.resetTimer();
   },

   updateSentence: function() {
      $('#prompt').text(app.promptArr.shift());
   },

   getNextSentence: function() {
      let nextSentenceIndex = app.newSentenceIndices[0];
      if (app.counter === nextSentenceIndex && app.newSentenceIndices.length > 0) {
         app.updateSentence();
         nextSentenceIndex = app.newSentenceIndices.shift();
      };
   },

   increaseCounter: function() {
      app.counter += 1;
      $('#counter').text(app.counter);
   },

   getCounter: function() {
      $('#counter').text(app.counter);
   },

   end: function() { 
      $('#prompt').text(app.endPrompt);
      $('.link-style').hide();
      $('#loader').hide();
      $('#timer').hide();
      $('.score-submit').css('display', 'flex');
      $('.score').val(app.counter);
      $('.author-link').show();
      $('.home-link').show();
      clearInterval(app.timer);
   },

   resetTimer: function() {
      clearInterval(app.timer);
      this.startTimer();

      $('#loader-bar').css({
         '-webkit-animation': 'none',
         '-moz-animation': 'none',
         '-o-animation': 'none',
         'animation': 'none'
      });

      setTimeout(function() {
         $('#loader-bar').css({'-webkit-animation': '',
         '-moz-animation': '',
         '-o-animation': '',
         'animation': ''});
      }, 1);
 
   },

   startTimer: function() {
      let seconds = 10;

      $('#timer').text(seconds);

      app.timer = setInterval(function () {  
          seconds = seconds > 0 ? seconds - 1 : seconds;
  
          $('#timer').text(seconds);

          if(seconds === 0) {
             app.updateData();
          };

      }, 1000);
   },  
}

