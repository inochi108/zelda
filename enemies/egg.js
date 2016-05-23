function Egg(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 10;
    this.dy = 13;
    this.setBox(-9, -12, 10, 7);  
    this.type = BULLET;

    this.fall = new Animation(ASSET_MANAGER.getAsset("./img/egg.png"), this.game, 0, 0, 22, 22, 0.02, 1, true, true, false, this.dx, this.dy);
};

Egg.prototype = new Entity();
Egg.prototype.constructor = Egg;

Egg.prototype.update = function () {
    this.y += 1;
    if (this.y >= this.game.maxY) {
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
    //console.log("(" + this.x + ", " + this.y + ")");
};

Egg.prototype.draw = function (ctx) {
    this.fall.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};