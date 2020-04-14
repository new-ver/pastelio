
let myGamePiece;
let myObstacle;


let pieceCol = "#ff0500";
let obsCol = "#00ffA0";

function mixHexColor(c1, c2) {

  var newR = Math.round((parseInt(c1.slice(1,3),16)+(parseInt(c2.slice(1,3),16)))/2);
  var newG = Math.round((parseInt(c1.slice(3,5),16)+(parseInt(c2.slice(3,5),16)))/2);
  var newB = Math.round((parseInt(c1.slice(5,7),16)+(parseInt(c2.slice(5,7),16)))/2);

  return("#"+newR.toString(16)+newG.toString(16)+newB.toString(16))
}

//Starts Game
function startGame() {
    myGamePiece = new component(30, 30, pieceCol, 80, 75);
    myObstacle = new component(150, 30, obsCol, 40, 150);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
      clearInterval(this.interval);
  }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = pieceCol;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.obsUpdate = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
    this.changeColor = function(otherobj) {

      let mybottom = this.y + (this.height)
      let otherbottom = otherobj.y + (otherobj.height);
      console.log("my bottom is" + mybottom)
      console.log("other bottom is" + otherbottom)

      if(mybottom >= otherobj.y)
      {
        pieceCol = mixHexColor(pieceCol, obsCol);
        // pieceCol = obsCol;
        console.log("In changeColor if")
      }
      if(mybottom > 269)
      {
        myGameArea.stop();
        console.log("it stopped!")
      }

    }
}

function updateGameArea() {
    myGamePiece.changeColor(myObstacle);
    myGameArea.clear();
    myGamePiece.newPos();
    myObstacle.obsUpdate();
    myGamePiece.update();

}
