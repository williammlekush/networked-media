const app = {   

   position: {
      x: 800,
      y: 800,
   },

   sqW: 10,

   initialize: function() {
      app.fetchSquares();

      $("#submit-left").click(() => {
         app.getPos();
         app.position.x += app.sqW;
         app.sendSquare(app.position);
      });

      window.setInterval(app.fetchSquares, 100);
   },

   getPos: async function () {
      fetch ("/position")
      .then ( res => { return res.json() })
      .then ( data => { 
         app.position =  { x: parseInt(data[0].x), y: parseInt(data[0].y) } ;
         console.log("position", app.position);
      });  
   },

   fetchSquares: function() {
      fetch("/squares")
      .then( res => { 
         return res.json()
      })
      .then( data => { 
         data.forEach( square => {
            app.createSquare({x: square.x, y: square.y});
         })
      });  
   },

   sendSquare: async function({ x, y }) {
      const url = `/newmove?x=${x}&y=${y}`;

      fetch(url)
      .then(res => res.json())
      .then(data => console.log("send", data));
   },

   createSquare: function({x, y}){
      const newSq = $("<div></div>")
      .addClass('square')
      .css({"left": `${x}px`, "top": `${y}px`, "background": app.getRandomColor()});

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


jQuery(
   () => {
      app.initialize();
   }
)



