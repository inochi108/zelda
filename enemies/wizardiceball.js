function WizardIceBall(game, x, y, iceBallDirection) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 40; 
    this.dy = 39;
    this.setBox(-37, -15, 37, 18);
    this.type = BULLET;

    this.radius = 100;
    this.direction = {x: 0, y: 0};
    this.direction.x = this.x;  //length
    this.direction.y = this.y;  //height 
    
    this.iceBallDirection = iceBallDirection;

    var speed = 2; //this bullet moves 2 pixels every tick
    var distance = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);

    this.direction.x = this.direction.x * speed / distance;
    this.direction.y = this.direction.y * speed / distance;
    
    this.elapsed = 1.3;
     
    this.iceBallRight = new Animation(ASSET_MANAGER.getAsset("./img/iceball.png"),
    this.game, 0, 0, 81, 68, 0.17, 3, true, true, false, this.dx, this.dy);
    
    this.iceBallLeft = new Animation(ASSET_MANAGER.getAsset("./img/iceballreflect.png"),
    this.game, 5, 0, 80, 68, 0.17, 3, true, true, false, this.dx, this.dy);
}

WizardIceBall.prototype = new Entity();
WizardIceBall.prototype.constructor = WizardIceBall;

WizardIceBall.prototype.update = function () {
    
    if (this.x <= 0 || this.x > this.game.maxX) {    
        this.removeFromWorld = true;
    }
    if (this.iceBallDirection === 1) {
        this.x += this.elapsed * this.direction.x;   
    } else {
        this.x -= this.elapsed * this.direction.x;
    }
    
    Entity.prototype.update.call(this);
}

WizardIceBall.prototype.draw = function (ctx) {
    
    if(this.iceBallDirection === 1) {
        this.iceBallRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else {
        this.iceBallLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
