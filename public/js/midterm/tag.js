const app = {

   dot: $('.dot'),
   firstTag: $('.first-tag'),
   content: $('.content'),
   endButton: $('#end'),
   scoreSubmit: $('.score-submit'),

   hovers: 0,

   initialize: function() {
      app.dot.on('mouseenter', app.begin);
   },

   begin: function() {      
      app.firstTag.css('display', 'none');
      app.run();

      app.endButton.show();
      app.endButton.click(app.end);

      app.dot.off();
      app.dot.on('mouseenter', app.run);
   },

   end: function() {
      app.scoreSubmit.css('display', 'flex');
      app.dot.hide();
      app.endButton.hide();

      $('#score-val').text(app.hovers);
      $('.score').val(app.hovers);
   },

   run: function() {
      app.hovers += 1;

      app.addMsg(app.dot.css('top'), app.dot.css('left'));

      const dotTop = app.getRandomFloat(0, 100);
      const dotLeft = app.getRandomFloat(0, 100);
      app.moveDot(dotTop, dotLeft);
   },

   moveDot: function(top, left) {
      app.dot.css({'top': `${top}%`, 'left': `${left}%`});
   },

   addMsg: function(top, left) {
      const msg = $('<p></p>').text(app.getMsg()); 
      msg.css({'position':'absolute', 'top':`${top}`, 'left':`${left}`});
      msg.addClass('message');
      app.content.append(msg);
   },

   getMsg: function() {
      msgs = [
         "Can't catch me!",
         "Nice try!",
         "Missed me!",
         "Try again!",
         "Nope!",
         "Close, but not close enough!",
         "Close, no cigar!",
         "Too slow!",
         "One more try?",
         "They told me you were faster than that.",
         "I'm disappointed, can't you catch me?",
         "Wow! Good effort!"
      ];

      index = app.getRandomIndex(0, msgs.length);
      
      return msgs[index];
   },

   getRandomFloat: function(min, max) {
      return Math.random() * (max - min) + min;
   },

   getRandomIndex: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);    
   }
}

$(document).ready(app.initialize());