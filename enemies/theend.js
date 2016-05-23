function TheEnd(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 23;
    this.dy = 23;
    this.setBox(-15, -7, 17, 11);
    this.type = LIVE;

    this.direction = 0;
    this.radius = 100;
    this.attack = false;
    this.appear = new Animation(ASSET_MANAGER.getAsset("./img/theend.png"), this.game, 0, 0, 400, 100, 0.5, 6, true, true, false, this.dx, this.dy);
    this.end = new Animation(ASSET_MANAGER.getAsset("./img/theend.png"), this.game, 2000, 0, 400, 100, 0.5, 1, true, true, false, this.dx, this.dy);
}

TheEnd.prototype = new Entity();
TheEnd.prototype.constructor = TheEnd;

TheEnd.prototype.update = function () {

    Entity.prototype.update.call(this);
}

TheEnd.prototype.draw = function (ctx) {
    
    this.appear.drawFrame(this.game.clockTick, ctx, this.x - 180, this.y + 40);
    Entity.prototype.draw.call(this);
}