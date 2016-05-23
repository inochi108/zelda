function LizardFireball(game, x, y, fireBallDirection) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 46; 
    this.dy = 41;
    this.setBox(-40, -16, 40, 16);
    this.type = BULLET;

    this.radius = 100;
    this.direction = {x: 0, y: 0};
    this.direction.x = this.x;  //length
    this.direction.y = this.y - 100;  //height 
    
    this.fireBallDirection = fireBallDirection;

    var speed = 2; //this bullet moves 2 pixels every tick
    var distance = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);

    this.direction.x = this.direction.x * speed / distance;
    this.direction.y = this.direction.y * speed / distance;

    this.elapsed = 1.3;
    
    this.fireBallRight = new Animation(ASSET_MANAGER.getAsset("./img/fireball.png"),
    this.game, 0, 0, 85, 79, 0.17, 5, true, true, false, this.dx, this.dy);
    
    this.fireBallLeft = new Animation(ASSET_MANAGER.getAsset("./img/fireballflip.png"),
    this.game, 0, 0, 78, 79, 0.17, 5, true, true, false, this.dx, this.dy);
}

LizardFireball.prototype = new Entity();
LizardFireball.prototype.constructor = LizardFireball;

LizardFireball.prototype.update = function () {
    
    if (this.x <= 0 || this.x > this.game.maxX) {    
        this.removeFromWorld = true;
    }
    
    if (this.fireBallDirection === 1) {
        this.x += this.elapsed * this.direction.x;   
    } else {
        this.x -= this.elapsed * this.direction.x;
    }
    
    Entity.prototype.update.call(this);
}

LizardFireball.prototype.draw = function (ctx) {
    if(this.fireBallDirection === 1) {
        this.fireBallRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else {
        this.fireBallLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
