const app = {
   prompts: [
      "Welcome. You will be presented with a series of statements. Indicate to what extent you agree. You will not be able to return, so choose carefully. Good luck.",
      "I am the life of the party.",
      "I feel little concern for others.",
      "I am always prepared.",
      "I get stressed out easily.",
      "I have a rich vocabulary.",
      "I don't talk a lot.",
      "I am interested in people.",
      "I leave my belongings around.",
      "I am relaxed most of the time.",
      "I have difficulty understanding abstract ideas.",
      "I insult people.",
      "I pay attention to details.",
      "I worry about things.",
      "I have a vivid imagination.",
      "I keep in the background.",
      "I sympathize with others' feelings.",
      "I make a mess of things.",
      "I seldom feel blue.",
      "I am not interested in abstract ideas.",
      "I start conversations.",
      "I am not interested in other people's problems.",
      "I get chores done right away.",
      "I am easily disturbed.",
      "I have excellent ideas.",
      "I have little to say.",
      "I have a soft heart.",
      "I often forget to put things back in their proper place.",
      "I get upset easily.",
      "I do not have a good imagination.",
      "I talk to a lot of different people at parties.",
      "I am not really interested in others.",
      "I like order.",
      "I change my mood a lot.",
      "I am quick to understand things.",
      "I don't like to draw attention to myself.",
      "I take time out for others.",
      "I shirk my duties.",
      "I have frequent mood swings.",
      "I use difficult words.",
      "I don't mind being the center of attention.",
      "I feel others' emotions.",
      "I follow a schedule.",
      "I get irritated easily.",
      "I spend time reflecting on things.",
      "I am quiet around strangers.",
      "I make people feel at ease.",
      "I am exacting in my work.",
      "I often feel blue.",
      "I am full of ideas."
   ],

   responses: [
      $('#1'),
      $('#2'),
      $('#3'),
      $('#4'),
      $('#5'),
   ],

   buttons: {
      next: $('#next'),
      restart: $('#restart'),
      meaning: $('#meaning'),
      end: $('#end'),
   },

   scale: $('.scale'),

   prompt: $('.prompt'),

   submitScore: $('.score-submit'),

   promptIndex: 0,

   initialize: function() {
      app.updatePrompt();
      app.buttons.next.click(app.begin);

      app.buttons.restart.hide();
      app.buttons.meaning.hide();
      app.buttons.end.hide();
      app.submitScore.hide();
      app.scale.hide();
   },

   begin: function() {
      app.scale.show();
      app.next();

      app.responses.forEach(
         button => {
            button.click(app.enableNext);
         }
      );

      app.buttons.next.off();
      app.buttons.next.click(app.next);
      
      app.buttons.end.show();
      app.buttons.end.click(app.end);
   },

   next: function() {
      app.clearChoices();
      app.disableNext();
      app.updateNextButtonText();

      app.nextPrompt();
      app.updatePrompt();

      if (app.promptIndex === app.prompts.length - 1) {
         app.end();
      };
   },

   end: function() {
      finalScore = app.getScore();
      app.prompt.text(finalScore);
      app.prompt.css({'text-align': 'center', 'font-size': '1.5em'})
      $('.score').val(finalScore);

      app.scale.hide();

      app.buttons.next.hide();
      app.buttons.end.hide();

      app.buttons.meaning.show();
      app.buttons.restart.show();

      app.buttons.restart.click(app.restart);
      app.buttons.meaning.click(app.nothing);

      app.submitScore.show();
   },

   restart: function() {
      app.promptIndex = 0;
      app.updatePrompt();
      app.prompt.css({'text-align': 'left', 'font-size': '1em'})

      app.submitScore.hide();
      app.buttons.restart.hide();

      app.buttons.meaning.text('What does this mean?');
      app.buttons.meaning.addClass('link-style');
      app.buttons.meaning.click(app.nothing);
      app.buttons.meaning.hide();

      app.buttons.next.show();
      app.buttons.next.text('begin');
      app.enableNext();

      app.buttons.next.off();
      app.buttons.next.click(app.begin);

   },

   nothing: function() {
      app.buttons.meaning.text('nothing.');
      app.buttons.meaning.removeClass('link-style');
      app.buttons.meaning.off();
   },

   updateNextButtonText: function() {
      if (app.promptIndex === 0) {
         app.buttons.next.text('next');
      } else if (app.promptIndex === app.prompts.length - 1) {
         app.buttons.next.text('end this madness');
      }
   },

   enableNext: function() {
      app.buttons.next.prop("disabled", false);
      app.buttons.next.addClass("link-style");
      app.buttons.next.removeClass("disabled");
   },

   disableNext: function() {
      app.buttons.next.prop("disabled", true);
      app.buttons.next.removeClass("link-style");
      app.buttons.next.addClass("disabled");
   },

   updatePrompt: function() {
      app.prompt.text(app.prompts[app.promptIndex])
   },

   nextPrompt: function() {
      app.promptIndex += 1;
   },

   getScore: function() {
      return Math.floor(Math.random() * 100000);
   },

   clearChoices: function() {
      app.responses.forEach(
         button => {
            button.prop("checked", false);
         }
      )
   }

}

$(document).ready(app.initialize());
