function ZombieFire(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);
    this.myX = x;
    this.myY = y;
    this.dx = 18; 
    this.dy = 44;
    this.setBox(-18, -25, 18, 0);
    this.type = BULLET;

    this.radius = 100;
    
    this.fireRoad = new Animation(ASSET_MANAGER.getAsset("./img/zombiefire.png"),
    this.game, 0, 0, 36, 50, 0.15, 16, false, true, false, this.dx, this.dy);
}

ZombieFire.prototype = new Entity();
ZombieFire.prototype.constructor = ZombieFire;

ZombieFire.prototype.update = function () {
    if(this.fireRoad.isDone()) {
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
}

ZombieFire.prototype.draw = function (ctx) {
    
    this.fireRoad.drawFrame(this.game.clockTick, ctx, this.myX, this.myY);
    Entity.prototype.draw.call(this);
}
