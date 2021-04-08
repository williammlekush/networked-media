const app = {
  scoreSubmit: $('.score-submit'),
  endButton: $('.end'),

  newClr: {},
  size: 0,
  scalar: 0.86062,
  position: {
    x: 0,
    y: 0
  },
  xToggle: false,
  xChange: 0,
  gridSides: {},
  shapes: [[],[],[]],
  sideIndex: 0,
  shapeIndex: 0,
  griset: false,
  clicks: 0,

  initialize: function() {
    app.endButton.click(app.end);
  },

  setup: function() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    smooth();
  
    app.newClr = app.getRndClr();
  
    app.size = windowWidth/10;
    app.xChange = 2 * app.size * app.scalar;
  
    app.gridSides = app.getGridSides();
    
    noLoop();
  },

  drawNextSide: function() {
    app.clicks += 1;

    if (!app.gridSet) {
      app.drawGridTile({});

      app.position.x = app.increasingLimitGuard(app.position.x + app.xChange, 0, windowWidth);

      if (app.position.x === 0) {
        app.sideIndex = app.increasingLimitGuard(app.sideIndex + 1, 0, 2)

        if (app.xToggle) {
            app.position.x -= app.xChange/2;
        }

        if(app.sideIndex === 0) {
          app.position.y = app.increasingLimitGuard(app.position.y + 1.5 * app.size, 0, windowHeight);

          if (app.position.y === 0) {
            app.gridSet = true;
          }

        } else if (app.sideIndex === 2) {
          app.xToggle = !app.xToggle;
        }  
      }
    } else {

      app.changeTileColor({});
      
      app.sideIndex = app.increasingLimitGuard(app.sideIndex + 1, 0, shape.length - 1);

      if (app.sideIndex === 0) {
        app.shapeIndex = app.increasingLimitGuard(app.shapeIndex + 1, 0, app.shapes.length - 1);
        app.newClr = app.getRndClr();
      }
    }
  },

  resetCanvas: function() {
    resizeCanvas(windowWidth, windowHeight);
    app.resetGlobals;       
    app.gridSides = app.getGridSides();
  },

  end: function() {
    app.endButton.hide();
    app.scoreSubmit.show();
    $('footer').show();
    $('.score').val(app.clicks - 1);
    $('#score-val').text(str(app.clicks - 1));
    loop();
  },

  drawGridTile: function({
    shapesArr = app.shapes,
    gridArr = app.gridSides,
    sideIndex = app.sideIndex,
  }) {
    let side = gridArr[sideIndex];

    side.position = app.setPosition({sideId: sideIndex});

    side = app.drawSide(side);

    shapesArr[sideIndex].push(side);
  },

  changeTileColor: function({
    shapesArr = app.shapes,
    shapeIndex = app.shapeIndex,
    sideIndex = app.sideIndex,
    newClr = app.newClr
  }) {
    shape = shapesArr[shapeIndex]
    side = shape[sideIndex]
    side.clr = newClr;

    shape.splice(sideIndex, 1, side);

    app.drawSide(side);
  },

  getGridSides: function() {
    return app.getSides({
      colorTop: color(200),
      colorLeft: color(100),
      colorRight: color(150),
    })
  },

  setPosition({ sideId, position = app.position }) {
    if (sideId != 2) {
      return position;
    } else {
      return app.getRightPosition({});
    }
  },

  getRightPosition({
    position = app.position,
    size = app.size, 
    scalar = app.scalar,
  }) {
    return {
      x: position.x + size * scalar,
      y: position.y + size/2
    }
  },
  
  getSides: function({
    colorTop,
    colorLeft,
    colorRight,
  }) {    
    return [
      {
        clr: colorTop,
        shearDegrees: 30,
      },
      {
        clr: colorLeft,
        rotDegrees: 30,
        shearDegrees: 30,
      },
      {
        position: app.getRightPosition({}),
        clr: colorRight,
      }
    ]
  },

  drawSide: function({
    clr,
    position = app.position,
    rotDegrees = 330,
    shearDegrees = 330,
    sideSize = app.size,
    sideScalar = app.scalar
  }) {
    fill(clr);
    noStroke();
    push();
    translate(position.x, position.y);
    rotate(radians(rotDegrees));
    shearX(radians(shearDegrees));
    scale(1, sideScalar);
    square(0, 0, sideSize);  
    pop();
  
    return {
      clr: clr,
      position: {
        x: position.x,
        y: position.y,
      },
      rotDegrees: rotDegrees,
      shearDegrees: shearDegrees
    }
  },

  increasingLimitGuard: function(num, lower, upper) {
    if (num > upper) {
      return lower;
    } else {
      return num;
    }
  },
  
  getRndClr: function() {
    const r = random(0, 255);
    const g = random(0, 255);
    const b = random(0, 255);
    return color(r, g, b);
  },

  resetGlobals: function() {
    app.position = {
      x: 0,
      y: 0
    }
    app.xToggle = false;

    app.shapes = [[],[],[]];
    app.gridset = false;
    app.sideIndex = 0;
    app.shapeIndex = 0;
  },  
}

$(document).ready(app.initialize());

setup = function() {
  app.setup();
}

mouseClicked = function() {
  app.drawNextSide();
}

draw = function() {
  mouseClicked();
}

windowResized = function() {
  app.resetCanvas();
}





