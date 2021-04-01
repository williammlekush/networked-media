const app = {   

   sqW: 10,

   initialize: async function() {
      $("#submit-left").click(() => {
         app.getPos()
         .then(position => { 
            position.x += app.sqW;
            return position;
         })
         .then(pos => {

            rdmColor = app.getRandomColor();
            console.log(rdmColor);
            const sq = {
               x: pos.x,
               y: pos.y,
               color: rdmColor
            }
            console.log(sq);
            app.sendSquare(sq);
         })
      });

      window.setInterval(app.fetchSquares, 1000);
   },

   getPos: async function () {
      return $.get("/position")
      .then ( data => { 
         return { x: parseInt(data.x), y: parseInt(data.y) }
      });  
   },

   fetchSquares: function() {    
      $.get("/squares")
      .then( data => { 
         data.forEach( square => 
            app.createSquare({ x: square.x, y: square.y, color: square.color })
         )
      });  
   },

   sendSquare: async function({ x, y, color }) {
      const url = `/newmove?x=${x}&y=${y}&color=${encodeURIComponent(color)}`;

      $.get(url)
      .then(data => console.log("send", data));
   },

   createSquare: function({x, y, color}){
      const newSq = $("<div></div>")
      .addClass('square')
      .css({"left": `${x}px`, "top": `${y}px`, "background": color});

      $("body").append(newSq);
   },

   getRandomColor: function() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
   },
}

$(
   () => {
      app.initialize();
   }
)



