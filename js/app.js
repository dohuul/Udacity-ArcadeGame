// An entity
// This section defines what will be different between the instances
var Entity = function(x, y, sprite){
   this.x = x;
   this.y = y;
   this.sprite = sprite;

};

// This section defines the similarity accross instances
Entity.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Calculate the image coordinate excluding white space around it
Entity.prototype.calculateXCoordTop = function(){
    return this.x + 20;
};

// Calculate the image coordinate excluding white space around it
Entity.prototype.calculateXCoordBot = function(){
    return this.x + 80;
};

// Calculate the image coordinate excluding white space around it
Entity.prototype.calculateYCoordTop = function(){
    return this.y + 80;
};

// Calculate the image coordinate excluding white space around it
Entity.prototype.calculateYCoordBot = function(){
    return this.y + 130;
};

// Gems our player love
var Heart = function() {
    Entity.call(this, 402, 160, 'images/Heart.png');
};

Heart.prototype = Object.create(Entity.prototype);
Heart.prototype.constructor = Heart;
Heart.prototype.removeFromGame = function(){
    this.x = -200;
    this.y = -200;
};

Heart.prototype.addToGame = function() {
    this.x = 402;
    this.y = 160;
}


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get startedy
    Entity.call(this, 0, this.locationHolder[getRandomInteger(0, this.locationHolder.length)], 'images/enemy-bug.png');
    this.speed = this.locationHolder[getRandomInteger(0, this.locationHolder.length)];
};
// Correct Enemy prototype and Enemy prototype.constructor
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.locationHolder = [60, 143, 226];
Enemy.prototype.speedHolder = [100, 200, 300];

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);

    // Reset Enemy X location and speed
    if(this.x > ctx.canvas.width){
        this.x = 0;
        this.y = this.locationHolder[getRandomInteger(0, this.locationHolder.length)];
        this.speed = this.locationHolder[getRandomInteger(0, this.locationHolder.length)]
    }

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Entity.call(this, this.xLocationStart, this.yLocationStart, 'images/char-boy.png');
    this.didPlayerWin = false;
    this.didPlayerLose = false;
};

// set up Player prototype chain
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.xLocationStart = 200;
Player.prototype.yLocationStart = 375;

// handler for keyboard events
Player.prototype.handleInput = function(keyValue) {
     // save reference to previous location
     var previousX = this.x;
     var xPixel = 100;
     var yPixel = 80;
     var xLimit = 400;
     var yLimit = 415;

    // set player location based on keyboard value
    switch(keyValue)
    {
        case 'left':
            this.x = this.x - xPixel;
            break;
         case 'right':
            this.x = this.x + xPixel;
            break;
         case 'up':
            this.y = this.y - yPixel;
            break;
         case 'down':
            this.y = this.y + yPixel;
            break;
         default:
            //we already filter out the allowed key in document.addEventListener
            break;
    }

    // set to previous location if current location is not within canvas dimension
    if(this.x < 0 || this.x > xLimit){
        this.x = previousX;
    }
    if(this.y > yLimit){
        this.y = this.yLocationStart;
    }
    if(this.y < 0){
        this.didPlayerWin = true;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
var enemy = new Enemy();
var enemyTwo = new Enemy();
var enemyThree = new Enemy();
allEnemies.push(enemy,enemyTwo,enemyThree);
var heart = new Heart();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
